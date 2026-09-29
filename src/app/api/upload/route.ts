import { NextResponse } from "next/server";
import sharp from "sharp";
import { requireAdmin } from "@/server/auth";
import { db } from "@/server/db";
import { uploadImage } from "@/server/storage";

const allowed = new Set(["image/jpeg", "image/png", "image/webp", "image/avif"]);
const MAX_BYTES = 12 * 1024 * 1024;
const MAX_WIDTH = 2000;

/**
 * Admin image upload. The file is resized to at most 2000px wide and
 * re-encoded as WebP before it goes to the CDN, so no 7000px originals
 * ever reach the site again.
 */
export async function POST(req: Request) {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const form = await req.formData().catch(() => null);
  const file = form?.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "no_file" }, { status: 400 });
  }
  if (!allowed.has(file.type)) {
    return NextResponse.json({ error: "unsupported_type" }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "too_large" }, { status: 400 });
  }

  try {
    const input = Buffer.from(await file.arrayBuffer());
    const output = await sharp(input)
      .rotate()
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toBuffer();

    const base = file.name.replace(/\.[^.]+$/, "").slice(0, 60) || "image";
    const url = await uploadImage(output, `${base}.webp`, "image/webp");

    await db.uploadedImage.create({
      data: {
        filename: url.split("/").pop() ?? `${base}.webp`,
        mimeType: "image/webp",
        url,
        size: output.length,
      },
    });

    return NextResponse.json({ url }, { status: 201 });
  } catch (err) {
    console.error("Upload failed:", err);
    return NextResponse.json({ error: "upload_failed" }, { status: 500 });
  }
}
