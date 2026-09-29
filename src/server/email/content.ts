import "server-only";
import { siteConfig } from "@/config/site";
import { sendEmail, escapeHtml } from "@/server/email/resend";
import { layout, button } from "@/server/email/templates";
import { sanitizeContent } from "@/server/sanitize";

const unsubscribe = (to: string) =>
  `<p style="color:#666;font-size:12px;margin-top:24px;">配信停止は <a href="${siteConfig.url}/unsubscribe?email=${encodeURIComponent(to)}" style="color:#666;">こちら</a></p>`;

/** New blog post: title, excerpt, cover and a button. */
export function sendBlogAnnouncement(
  post: { title: string; slug: string; excerpt: string | null; coverImage: string | null },
  to: string,
) {
  const url = `${siteConfig.url}/blog/${encodeURIComponent(post.slug)}`;
  const body =
    (post.coverImage
      ? `<img src="${post.coverImage}" alt="" style="width:100%;border-radius:8px;margin-bottom:16px;">`
      : "") +
    `<h2 style="margin:0 0 12px;font-size:20px;">${escapeHtml(post.title)}</h2>` +
    (post.excerpt ? `<p style="margin:0 0 8px;">${escapeHtml(post.excerpt)}</p>` : "") +
    button(url, "記事を読む") +
    unsubscribe(to);
  return sendEmail({
    to,
    subject: `【JBBC ブログ】${post.title}`,
    html: layout("新しい記事を公開しました", body),
  });
}

/** Announcement: excerpt plus a link to the notice page. */
export function sendAnnouncementEmail(
  item: { title: string; slug: string; excerpt: string | null; body: string },
  to: string,
) {
  const url = `${siteConfig.url}/notices/${encodeURIComponent(item.slug)}`;
  const body =
    `<h2 style="margin:0 0 12px;font-size:20px;">${escapeHtml(item.title)}</h2>` +
    (item.excerpt ? `<p style="margin:0 0 8px;">${escapeHtml(item.excerpt)}</p>` : "") +
    button(url, "詳細を見る") +
    unsubscribe(to);
  return sendEmail({
    to,
    subject: `【JBBC お知らせ】${item.title}`,
    html: layout("お知らせ", body),
  });
}

/** Newsletter: the full body goes in the email. */
export function sendNewsletterEmail(
  item: { title: string; slug: string; excerpt: string | null; body: string },
  to: string,
) {
  const url = `${siteConfig.url}/notices/${encodeURIComponent(item.slug)}`;
  const body =
    `<h2 style="margin:0 0 12px;font-size:20px;">${escapeHtml(item.title)}</h2>` +
    `<div style="line-height:1.8;">${sanitizeContent(item.body)}</div>` +
    button(url, "ウェブで見る") +
    unsubscribe(to);
  return sendEmail({
    to,
    subject: `【JBBC ニュースレター】${item.title}`,
    html: layout("JBBC ニュースレター", body),
  });
}
