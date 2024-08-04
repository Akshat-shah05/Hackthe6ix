// app/api/data/route.js
import fs from 'fs';
import path from 'path';

export async function GET(req: any) {
  const filePath = path.join(process.cwd(), 'app', 'message.txt');

  try {
    const data = await fs.promises.readFile(filePath, 'utf8'); // Read the file asynchronously
    const jsonData = JSON.parse(data); // Parse the text data as JSON
    return new Response(JSON.stringify(jsonData), { status: 200 });
  } catch (err) {
    console.error('Error reading data:', err);
    return new Response(JSON.stringify({ error: 'Failed to read data' }), { status: 500 });
  }
}
