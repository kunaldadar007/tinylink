import { NextResponse } from "next/server";
import { getLinkByCode, deleteLink } from "../../../../lib/db";

export async function GET(request: Request, { params }: { params: any }) {
  const { code } = await params; // <- unwrap Promise
  if (!code) return NextResponse.json({ error: "Missing code" }, { status: 400 });

  const link = await getLinkByCode(code);
  if (!link) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json(link);
}

export async function DELETE(request: Request, { params }: { params: any }) {
  const { code } = await params; // <- unwrap Promise
  if (!code) return NextResponse.json({ error: "Missing code" }, { status: 400 });

  try {
    const existing = await getLinkByCode(code);
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

    await deleteLink(code);
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("DELETE /api/links/:code error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}