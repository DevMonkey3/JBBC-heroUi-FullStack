/**
 * The material offered on /download.
 *
 * TODO: once the PDF is ready, upload it to the CDN and set `file` to its URL.
 * Until then the page works as a lead form: the request is recorded and the
 * staff send the material by hand. When `file` is set, the thank-you screen
 * and the acknowledgement email both link to it automatically.
 */
export const downloadMaterial = {
  title: "JBBC サービス資料",
  description:
    "バングラデシュ人材の採用をご検討中の企業様向けに、特定技能・技能実習・高度人材の制度概要、JBBCのサポート内容、採用の流れをまとめた資料です。",
  file: null as string | null,
  fileLabel: "資料をダウンロード（PDF）",
};
