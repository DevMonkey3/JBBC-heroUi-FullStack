import { pageMetadata } from "@/config/seo";
import { Container } from "@/components/site/container";
import { company } from "@/content/company";

export const metadata = pageMetadata("company");

const rows: { label: string; value: readonly string[] | string }[] = [
  { label: "会社名", value: [company.name, company.nameJa] },
  { label: "設立", value: company.founded },
  { label: "本社所在地", value: company.address },
  { label: "資本金", value: company.capital },
  { label: "代表取締役", value: company.ceo },
  { label: "会長", value: company.chairman },
  { label: "事業内容", value: company.business },
  { label: "加盟団体", value: company.memberships },
  { label: "電話 & FAX", value: company.phones },
  { label: "関連会社", value: company.related },
  { label: "Eメール", value: company.email },
];

export default function CompanyPage() {
  return (
    <Container className="py-12">
      <h1 className="mb-8 text-3xl font-bold md:text-4xl">会社概要</h1>
      <dl className="divide-border divide-y overflow-hidden rounded-lg border shadow-sm">
        {rows.map((row) => (
          <div key={row.label} className="grid grid-cols-1 md:grid-cols-[200px_1fr]">
            <dt className="bg-muted p-4 font-medium">{row.label}</dt>
            <dd className="space-y-1 p-4">
              {Array.isArray(row.value) ? (
                row.value.map((line) => <p key={line}>{line}</p>)
              ) : (
                <p>{row.value}</p>
              )}
            </dd>
          </div>
        ))}
      </dl>
    </Container>
  );
}
