import { dateToJstInput } from "@/lib/dates";
import { Field } from "@/components/admin/field";
import { Input } from "@/components/ui/input";

/** Editable publish date so content added late still shows the right date. */
export function PublishedAtField({
  defaultValue,
  error,
  hint = "サイトに表示される日付。空欄なら保存時の日時になります",
}: {
  defaultValue?: Date | string | null;
  error?: string;
  hint?: string;
}) {
  return (
    <Field label="公開日時（日本時間）" error={error} hint={hint}>
      <Input type="datetime-local" name="publishedAt" defaultValue={dateToJstInput(defaultValue)} />
    </Field>
  );
}
