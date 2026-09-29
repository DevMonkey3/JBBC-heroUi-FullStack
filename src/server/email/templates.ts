import "server-only";
import { siteConfig } from "@/config/site";
import { escapeHtml } from "@/server/email/resend";

const brand = "#1aa4dd";
const accent = "#ee6629";

/** Shared wrapper: simple, inline-styled, renders the same in every mail client. */
export function layout(title: string, body: string): string {
  return `<!doctype html><html lang="ja"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>
<body style="margin:0;background:#f4f7f9;font-family:-apple-system,'Hiragino Sans','Yu Gothic',Meiryo,sans-serif;color:#222;">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0"><tr><td align="center" style="padding:24px 12px;">
<table role="presentation" width="600" style="max-width:600px;width:100%;background:#fff;border-radius:12px;overflow:hidden;">
<tr><td style="background:${brand};color:#fff;padding:20px 24px;font-size:18px;font-weight:bold;">${escapeHtml(title)}</td></tr>
<tr><td style="padding:24px;font-size:15px;line-height:1.8;">${body}</td></tr>
<tr><td style="padding:16px 24px;background:#f4f7f9;color:#666;font-size:12px;line-height:1.6;">
${escapeHtml(siteConfig.legalNameJa)}<br>
TEL ${siteConfig.contact.phoneJp} / ${siteConfig.contact.email}<br>
<a href="${siteConfig.url}" style="color:${brand};">${siteConfig.url}</a>
</td></tr></table></td></tr></table></body></html>`;
}

export function button(href: string, label: string): string {
  return `<p style="margin:24px 0;"><a href="${href}" style="display:inline-block;background:${accent};color:#fff;text-decoration:none;padding:12px 24px;border-radius:999px;font-weight:bold;">${escapeHtml(label)}</a></p>`;
}

export function infoBox(rows: [string, string][]): string {
  const lines = rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 0;color:#666;white-space:nowrap;vertical-align:top;width:6em;">${escapeHtml(k)}</td><td style="padding:6px 0 6px 12px;">${escapeHtml(v)}</td></tr>`,
    )
    .join("");
  return `<table role="presentation" style="width:100%;background:#eef7fb;border-radius:8px;padding:12px 16px;margin:16px 0;"><tbody>${lines}</tbody></table>`;
}

export function paragraphs(text: string): string {
  return text
    .split(/\n{2,}/)
    .map((p) => `<p style="margin:0 0 12px;">${escapeHtml(p).replace(/\n/g, "<br>")}</p>`)
    .join("");
}
