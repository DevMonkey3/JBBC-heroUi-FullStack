import "server-only";
import sanitizeHtml from "sanitize-html";

/**
 * Whitelist for editor output before it is stored. Strips scripts, inline
 * styles, event handlers and unknown tags so stored HTML is safe to render.
 */
export function sanitizeContent(html: string): string {
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
    transformTags: {
      a: (tag, attrs) => ({
        tagName: "a",
        attribs: {
          ...attrs,
          ...(attrs.href?.startsWith("http")
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {}),
        },
      }),
      h1: "h2",
    },
    exclusiveFilter: (frame) =>
      frame.tag === "p" && !frame.text.trim() && !frame.mediaChildren.length,
  });
}

/** Plain-text excerpt from HTML, for cards and meta descriptions. */
export function textExcerpt(html: string, max = 160): string {
  const text = sanitizeHtml(html, { allowedTags: [], allowedAttributes: {} })
    .replace(/\s+/g, " ")
    .trim();
  return text.length > max ? `${text.slice(0, max - 1)}…` : text;
}
