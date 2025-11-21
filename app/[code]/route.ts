import { NextResponse } from "next/server";
import { getLinkByCode, incrementClick } from "../../lib/db";

export async function GET(request: Request, { params }: { params: any }) {
  const { code } = await params; // <- unwrap Promise
  if (!code) return NextResponse.json({ error: "Missing code" }, { status: 400 });

  const link = await getLinkByCode(code);
  if (!link) return new NextResponse("Not found", { status: 404 });

  // increment clicks asynchronously (do not block redirect)
  incrementClick(code).catch((err) => console.error("incrementClick error:", err));

  return NextResponse.redirect(link.url, 302);
}