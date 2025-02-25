// app/api/auth/route.ts

import { NextResponse } from 'next/server';
import { google } from 'googleapis';

export async function POST(request: Request) {
  try {
    // Expecting the request body to contain a "row" property,
    // which is the row number (as a string or number) from the sheet.
    const { row } = await request.json();

    if (!row) {
      return NextResponse.json({ error: 'No row provided' }, { status: 400 });
    }

    const rowNumber = parseInt(row, 10);
    // Assuming the first row is a header, valid row numbers start at 2.
    if (isNaN(rowNumber) || rowNumber < 2) {
      return NextResponse.json({ error: 'Invalid row number' }, { status: 400 });
    }

    // Retrieve the base64-encoded service account key from the environment.
    const serviceAccountKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
    if (!serviceAccountKey) {
      return NextResponse.json({ error: 'Service account key not provided' }, { status: 500 });
    }

    const decodedKey = JSON.parse(
      Buffer.from(serviceAccountKey, 'base64').toString('utf8')
    );

    // Initialize Google Auth with the required scope for reading the sheet.
    const auth = new google.auth.GoogleAuth({
      credentials: decodedKey,
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
    if (!spreadsheetId) {
      return NextResponse.json({ error: 'Spreadsheet ID not provided' }, { status: 500 });
    }

    // Fetch data from the "Data" sheet.
    // This sheet is expected to have the following header structure:
    // StudentA | StudentB | TimeA | TimeB | MovesA | MovesB
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Data!A:F',
    });

    const rows = res.data.values;
    if (!rows || rows.length === 0) {
      return NextResponse.json({ error: 'No data found in the Data sheet' }, { status: 500 });
    }

    // The first row is the header; valid data rows start at index 1.
    const dataIndex = rowNumber - 1;
    if (dataIndex >= rows.length) {
      return NextResponse.json({ error: 'Row number out of range' }, { status: 400 });
    }

    const headerRow = rows[0];
    const studentAIndex = headerRow.indexOf('StudentA');
    const studentBIndex = headerRow.indexOf('StudentB');
    const timeAIndex = headerRow.indexOf('TimeA');
    const timeBIndex = headerRow.indexOf('TimeB');
    const movesAIndex = headerRow.indexOf('MovesA');
    const movesBIndex = headerRow.indexOf('MovesB');

    // Ensure that the required columns exist.
    if (studentAIndex === -1 || studentBIndex === -1) {
      return NextResponse.json({ error: 'Required columns not found in the Data sheet' }, { status: 500 });
    }

    const rowData = rows[dataIndex];

    // Retrieve data from the row. We assume that StudentA and StudentB hold the email addresses.
    const studentAEmail = rowData[studentAIndex] || '';
    const studentBEmail = rowData[studentBIndex] || '';
    const timeA = rowData[timeAIndex] || '';
    const timeB = rowData[timeBIndex] || '';
    const movesA = rowData[movesAIndex] || '';
    const movesB = rowData[movesBIndex] || '';

    // Return the available role options along with each student's email.
    return NextResponse.json({
      roleOptions: ['StudentA', 'StudentB'],
      studentAEmail,
      studentBEmail,
      timeA,
      timeB,
      movesA,
      movesB,
    });
  } catch (error) {
    console.error('Error accessing Google Sheets:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
