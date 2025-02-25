// app/api/checkSolution/route.ts
import { NextResponse } from 'next/server';
import { google } from 'googleapis';

export async function POST(request: Request) {
  try {
    const { row, role, grid, time, moves } = await request.json();

    if (!row || !role || grid === undefined || time === undefined || moves === undefined) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const rowNumber = parseInt(row, 10);
    if (isNaN(rowNumber) || rowNumber < 2) {
      return NextResponse.json({ error: 'Invalid row number' }, { status: 400 });
    }

    // Serialize grid state to JSON
    const serializedGrid = JSON.stringify(grid);

    const serviceAccountKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
    if (!serviceAccountKey) {
      return NextResponse.json({ error: 'Service account key not provided' }, { status: 500 });
    }
    const decodedKey = JSON.parse(
      Buffer.from(serviceAccountKey, 'base64').toString('utf8')
    );

    // Set up authentication with write access
    const auth = new google.auth.GoogleAuth({
      credentials: decodedKey,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
    if (!spreadsheetId) {
      return NextResponse.json({ error: 'Spreadsheet ID not provided' }, { status: 500 });
    }

    // Prepare the ranges to update based on the role.
    // For StudentA, update: TimeA (C), MovesA (E), and SolutionA (G)
    // For StudentB, update: TimeB (D), MovesB (F), and SolutionB (H)
    let ranges;
    if (role === 'StudentA') {
      ranges = [
        { range: `Data!C${rowNumber}`, values: [[time]] },
        { range: `Data!E${rowNumber}`, values: [[moves]] },
        { range: `Data!G${rowNumber}`, values: [[serializedGrid]] },
      ];
    } else if (role === 'StudentB') {
      ranges = [
        { range: `Data!D${rowNumber}`, values: [[time]] },
        { range: `Data!F${rowNumber}`, values: [[moves]] },
        { range: `Data!H${rowNumber}`, values: [[serializedGrid]] },
      ];
    } else {
      return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
    }

    // Batch update the specified ranges.
    const result = await sheets.spreadsheets.values.batchUpdate({
      spreadsheetId,
      requestBody: {
        valueInputOption: 'RAW',
        data: ranges,
      },
    });

    return NextResponse.json({ success: true, result: result.data });
  } catch (error) {
    console.error('Error updating Google Sheets:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
