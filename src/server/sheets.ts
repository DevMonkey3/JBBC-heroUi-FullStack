import "server-only";
import { google } from "googleapis";
import { env } from "@/config/env";

type SheetTarget = "inquiry" | "seminar" | "download";

const sheetIds: Record<SheetTarget, string | undefined> = {
  inquiry: env.GOOGLE_SHEET_ID_INQUIRY,
  seminar: env.GOOGLE_SHEET_ID_SEMINAR,
  download: env.GOOGLE_SHEET_ID_DOWNLOAD,
};

function getSheetsClient() {
  if (!env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY) {
    throw new Error("Google service account credentials are not set");
  }
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  return google.sheets({ version: "v4", auth });
}

/** Append one row to the configured sheet. Values are written as entered. */
export async function appendRow(target: SheetTarget, row: (string | number)[]) {
  const spreadsheetId = sheetIds[target];
  if (!spreadsheetId) throw new Error(`Sheet id for "${target}" is not set`);

  const sheets = getSheetsClient();
  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: "Sheet1!A:Z",
    valueInputOption: "USER_ENTERED",
    requestBody: { values: [row] },
  });
}

export function tokyoTimestamp(date: Date = new Date()): string {
  return date.toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" });
}
