export const runtime = "nodejs";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function GET() {
  try {
    const data = await resend.emails.send({
      from: "JBBC <email@example.com>",  // must be a verified sender domain in Resend
      to: ["tashdidhassan27@gmail.com"], // use your own email for test
      subject: "Test email from JBBC",
      html: "<p>Hello! This is a test email from the JBBC project.</p>",
    });

    return NextResponse.json({ ok: true, data });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}
