import "server-only";
import { siteConfig } from "@/config/site";
import { formatDateWeekday, formatTime } from "@/lib/dates";
import { prefectureName } from "@/lib/prefectures";
import { sendEmail, emailDefaults, escapeHtml } from "@/server/email/resend";
import { layout, button, infoBox, paragraphs } from "@/server/email/templates";

type SeminarInfo = {
  title: string;
  slug: string;
  location: string;
  startsAt: Date | string;
  endsAt: Date | string;
  description?: string;
};

type Registrant = {
  name: string;
  email: string;
  companyName?: string | null;
  phone: string;
  prefecture: string;
};

const when = (s: SeminarInfo) =>
  `${formatDateWeekday(s.startsAt)} ${formatTime(s.startsAt)}〜${formatTime(s.endsAt)}`;

const seminarUrl = (s: SeminarInfo) => `${siteConfig.url}/seminar/${encodeURIComponent(s.slug)}`;

/** To the person who registered. */
export function sendRegistrationConfirmation(s: SeminarInfo, r: Registrant) {
  const body =
    `<p>${escapeHtml(r.name)} 様</p>` +
    `<p>この度は、JBBCのセミナーへお申し込みいただき誠にありがとうございます。以下の内容で受け付けました。</p>` +
    infoBox([
      ["セミナー", s.title],
      ["日時", when(s)],
      ["場所", s.location],
    ]) +
    `<p>担当者より順次ご連絡させていただきます。当日お会いできることを楽しみにしております。</p>` +
    button(seminarUrl(s), "セミナー詳細を見る") +
    `<p style="color:#666;font-size:13px;">このメールに心当たりがない場合は、お手数ですが破棄してください。</p>`;
  return sendEmail({
    to: r.email,
    subject: `【JBBC】セミナーお申し込み受付：${s.title}`,
    html: layout("お申し込みありがとうございます", body),
  });
}

/** To the JBBC inquiry inbox. */
export function sendRegistrationNotice(s: SeminarInfo, r: Registrant) {
  const body =
    `<p>セミナーに新しいお申し込みがありました。</p>` +
    infoBox([
      ["セミナー", s.title],
      ["日時", when(s)],
      ["お名前", r.name],
      ["会社名", r.companyName || "―"],
      ["電話", r.phone],
      ["都道府県", prefectureName(r.prefecture)],
      ["メール", r.email],
    ]);
  return sendEmail({
    to: emailDefaults.inquiryTo,
    replyTo: r.email,
    subject: `【セミナー申込】${r.name} 様 – ${s.title}`,
    html: layout("セミナーお申し込み通知", body),
  });
}

/** Announcement to one subscriber. */
export function sendSeminarAnnouncement(s: SeminarInfo, to: string) {
  const body =
    `<h2 style="margin:0 0 12px;font-size:20px;">${escapeHtml(s.title)}</h2>` +
    infoBox([
      ["日時", when(s)],
      ["場所", s.location],
    ]) +
    (s.description ? paragraphs(s.description.slice(0, 600)) : "") +
    button(seminarUrl(s), "詳細を見る・申し込む") +
    `<p style="color:#666;font-size:12px;">配信停止は <a href="${siteConfig.url}/unsubscribe?email=${encodeURIComponent(to)}" style="color:#666;">こちら</a></p>`;
  return sendEmail({
    to,
    subject: `【JBBC】新しいセミナーのお知らせ：${s.title}`,
    html: layout("新しいセミナーのお知らせ", body),
  });
}
