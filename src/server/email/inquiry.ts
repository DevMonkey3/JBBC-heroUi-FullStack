import "server-only";
import { siteConfig } from "@/config/site";
import { downloadMaterial } from "@/content/download";
import type { ContactInput, DownloadRequestInput } from "@/lib/validation";
import { prefectureName } from "@/lib/prefectures";
import { sendEmail, emailDefaults, escapeHtml } from "@/server/email/resend";
import { layout, button, infoBox, paragraphs } from "@/server/email/templates";

const contactRows = (v: ContactInput): [string, string][] => [
  ["区分", v.type],
  ["種別", v.inquiryType.join("、")],
  ...(v.type === "法人" ? ([["会社名", v.companyName || "―"]] as [string, string][]) : []),
  ["お名前", v.name],
  ["メール", v.email],
  ["電話", v.phone],
  ["住所", `〒${v.postalCode} ${prefectureName(v.prefecture)}${v.address}`],
  ...(v.type === "法人" ? ([["事業内容", v.businessContent || "―"]] as [string, string][]) : []),
];

/** To the JBBC inquiry inbox. Reply goes straight to the sender. */
export function sendInquiryNotice(v: ContactInput) {
  const body =
    `<p>ウェブサイトから新しいお問い合わせがありました。</p>` +
    infoBox(contactRows(v)) +
    `<p style="margin:16px 0 4px;font-weight:bold;">お問い合わせ内容</p>` +
    paragraphs(v.inquiryContent) +
    `<p style="color:#666;font-size:13px;">このメールに返信すると ${escapeHtml(v.email)} 宛に送信されます。</p>`;
  return sendEmail({
    to: emailDefaults.inquiryTo,
    replyTo: v.email,
    subject: `【お問い合わせ】${v.name} 様（${v.type}・${v.inquiryType.join("、")}）`,
    html: layout("お問い合わせ通知", body),
  });
}

/** To the person who sent the inquiry. */
export function sendInquiryAcknowledgement(v: ContactInput) {
  const body =
    `<p>${escapeHtml(v.name)} 様</p>` +
    `<p>この度は、${escapeHtml(siteConfig.legalNameJa)}へお問い合わせいただき誠にありがとうございます。以下の内容で受け付けました。担当者より折り返しご連絡させていただきますので、今しばらくお待ちください。</p>` +
    infoBox(contactRows(v)) +
    `<p style="margin:16px 0 4px;font-weight:bold;">お問い合わせ内容</p>` +
    paragraphs(v.inquiryContent) +
    `<p>お急ぎの場合は、お電話（${siteConfig.contact.phoneJp}、平日9:00〜17:00）でもご相談いただけます。</p>` +
    `<p style="color:#666;font-size:13px;">このメールは自動送信です。心当たりがない場合は、お手数ですが破棄してください。</p>`;
  return sendEmail({
    to: v.email,
    subject: "【JBBC】お問い合わせを受け付けました",
    html: layout("お問い合わせありがとうございます", body),
  });
}

/** To the JBBC inquiry inbox: someone asked for the material. */
export function sendDownloadNotice(v: DownloadRequestInput) {
  const body =
    `<p>資料請求フォームから新しいリクエストがありました。</p>` +
    infoBox([
      ["資料", downloadMaterial.title],
      ["お名前", v.name],
      ["メール", v.email],
      ["電話", v.phone],
    ]) +
    (downloadMaterial.file
      ? `<p>資料のリンクは自動で送信済みです。</p>`
      : `<p>資料はまだ自動送付されていません。担当者よりお送りください。</p>`);
  return sendEmail({
    to: emailDefaults.inquiryTo,
    replyTo: v.email,
    subject: `【資料請求】${v.name} 様`,
    html: layout("資料請求通知", body),
  });
}

/** To the requester. Includes the file link once one is configured. */
export function sendDownloadAcknowledgement(v: DownloadRequestInput) {
  const body =
    `<p>${escapeHtml(v.name)} 様</p>` +
    `<p>この度は、${escapeHtml(siteConfig.legalNameJa)}の資料をご請求いただき誠にありがとうございます。</p>` +
    (downloadMaterial.file
      ? `<p>下記より資料をダウンロードいただけます。</p>` +
        button(downloadMaterial.file, downloadMaterial.fileLabel)
      : `<p>担当者より資料をお送りいたしますので、今しばらくお待ちください。</p>`) +
    `<p>ご不明な点がございましたら、お気軽にお問い合わせください。</p>` +
    button(`${siteConfig.url}/contact`, "お問い合わせはこちら") +
    `<p style="color:#666;font-size:13px;">このメールは自動送信です。心当たりがない場合は、お手数ですが破棄してください。</p>`;
  return sendEmail({
    to: v.email,
    subject: "【JBBC】資料請求を受け付けました",
    html: layout("資料請求ありがとうございます", body),
  });
}
