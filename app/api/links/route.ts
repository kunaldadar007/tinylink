import { NextResponse } from 'next/server';
import { createLink, getLinks } from '../../../lib/db';

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const longUrl = body.longUrl ?? body.url ?? body.long_url ?? '';
  const customCode = body.customCode ?? body.code ?? body.custom_code;

  if (!longUrl || String(longUrl).trim() === '') {
    return NextResponse.json({ error: 'Long URL is required' }, { status: 400 });
  }

  try {
    const link = await createLink({ url: longUrl, code: customCode });
    return NextResponse.json(link, { status: 201 });
  } catch (err: any) {
    if (err.message === 'CODE_EXISTS') {
      return NextResponse.json({ error: 'Code already exists' }, { status: 409 });
    }
    if (err.message === 'INVALID_URL' || err.message === 'INVALID_CODE') {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function GET() {
  const links = await getLinks();
  return NextResponse.json(links);
}