import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      seminarId,
      seminarTitle,
      name,
      companyName,
      phone,
      prefecture,
      email,
      consentPI,
    } = body;

    // Validate required fields
    if (!seminarId || !name || !phone || !prefecture || !email || !consentPI) {
      return NextResponse.json(
        { error: "必須項目を入力してください" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "有効なメールアドレスを入力してください" },
        { status: 400 }
      );
    }

    // Validate phone format (Japanese phone numbers)
    const phoneRegex = /^[\d-]+$/;
    if (!phoneRegex.test(phone)) {
      return NextResponse.json(
        { error: "有効な電話番号を入力してください" },
        { status: 400 }
      );
    }

    // Set up Google Sheets API
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(
          /\\n/g,
          "\n"
        ),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    // Seminar registration spreadsheet ID
    const spreadsheetId = "1YPq8wXaPwVyJfmmtQo2FTLGyV1t1YVsaYqGMOgCJjqo";

    // Add timestamp
    const timestamp = new Date().toLocaleString("ja-JP", {
      timeZone: "Asia/Tokyo",
    });

    // Prepare row data
    const rowData = [
      timestamp,
      seminarTitle || "",
      seminarId,
      name,
      companyName || "",
      phone,
      prefecture,
      email,
      consentPI ? "同意" : "未同意",
    ];

    // Append data to the sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Sheet1!A:I", // Adjust sheet name if different
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [rowData],
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error submitting to Google Sheets:", error);
    return NextResponse.json(
      { error: "送信に失敗しました" },
      { status: 500 }
    );
  }
}
