/**
 * One-time cleanup of blog posts imported from jbbra.com.
 *   npm run posts:clean          dry run, prints what would change
 *   npm run posts:clean -- --apply
 *
 * Each imported post carries its own <style> block, a wrapper <div>, inline
 * styles and classes. This strips all of that so every post renders with the
 * site's one stylesheet. The original HTML is kept in `contentBackup`, and a
 * post is only cleaned once. Titles that contain HTML tags are unwrapped.
 */
import { PrismaClient } from "@prisma/client";
import sanitizeHtml from "sanitize-html";

const db = new PrismaClient();
const apply = process.argv.includes("--apply");

function clean(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: [
      "h2",
      "h3",
      "h4",
      "p",
      "br",
      "strong",
      "b",
      "em",
      "i",
      "u",
      "s",
      "a",
      "ul",
      "ol",
      "li",
      "blockquote",
      "hr",
      "img",
      "figure",
      "figcaption",
      "table",
      "thead",
      "tbody",
      "tr",
      "th",
      "td",
      "code",
      "pre",
    ],
    allowedAttributes: {
      a: ["href", "target", "rel"],
      img: ["src", "alt", "width", "height"],
      th: ["colspan", "rowspan"],
      td: ["colspan", "rowspan"],
    },
    allowedSchemes: ["https", "http", "mailto", "tel"],
    transformTags: { h1: "h2" },
    exclusiveFilter: (f) => f.tag === "p" && !f.text.trim() && !f.mediaChildren.length,
  }).trim();
}

const stripTags = (s: string) => s.replace(/<[^>]+>/g, "").trim();

async function main() {
  const posts = await db.blogPost.findMany({
    select: {
      id: true,
      slug: true,
      title: true,
      content: true,
      contentBackup: true,
      excerpt: true,
    },
  });
  let changed = 0;
  for (const p of posts) {
    if (p.contentBackup) {
      console.log(`skip   ${p.slug} (already cleaned)`);
      continue;
    }
    const content = clean(p.content);
    const title = stripTags(p.title);
    const excerpt = p.excerpt && /<[a-z][^>]*>/i.test(p.excerpt) ? stripTags(p.excerpt) : p.excerpt;
    const delta = p.content.length - content.length;
    console.log(
      `${apply ? "clean " : "would "} ${p.slug}: ${p.content.length} -> ${content.length} chars (-${delta})${title !== p.title ? ", title fixed" : ""}`,
    );
    if (apply) {
      await db.blogPost.update({
        where: { id: p.id },
        data: { contentBackup: p.content, content, title, excerpt },
      });
    }
    changed++;
  }
  console.log(
    `\n${apply ? "cleaned" : "would clean"} ${changed} of ${posts.length} posts${apply ? "" : ". Run with --apply to write."}`,
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(() => db.$disconnect());
