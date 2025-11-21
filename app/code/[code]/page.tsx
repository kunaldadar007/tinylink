import React from "react";
import { getLinkByCode } from "../../../lib/db";

type Props = { params: { code: string } };

export default async function CodePage({ params }: Props) {
  const code = params.code;
  const link = await getLinkByCode(code);

  if (!link) {
    return (
      <div className="panel">
        <h2>Not found</h2>
        <p>Link "{code}" not found.</p>
      </div>
    );
  }

  return (
    <div className="panel">
      <h2 style={{ marginBottom: 8 }}>{link.code}</h2>
      <div style={{ marginBottom: 8 }}>
        <strong>Target:</strong>{" "}
        <a href={link.url} target="_blank" rel="noreferrer" style={{ color: "var(--neon)" }}>
          {link.url}
        </a>
      </div>
      <div style={{ marginBottom: 8 }}>
        <strong>Total clicks:</strong> {link.clicks ?? 0}
      </div>
      <div>
        <strong>Last clicked:</strong> {link.lastClicked ? new Date(link.lastClicked).toLocaleString() : "never"}
      </div>
    </div>
  );
}