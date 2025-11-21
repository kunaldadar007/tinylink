"use client";
import React, { useState } from "react";

export default function LinkForm() {
  const [longUrl, setLongUrl] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    setLoading(true);
    try {
      const res = await fetch("/api/links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ longUrl: longUrl.trim(), customCode: code.trim() || undefined }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setMessage(data?.error || `Server error: ${res.status}`);
      } else {
        setMessage("Link created: " + (data?.code ?? ""));
        setLongUrl("");
        setCode("");
        window.dispatchEvent(new CustomEvent("link:created", { detail: data }));
      }
    } catch (err: any) {
      setMessage("Network error: " + (err?.message ?? "Failed to fetch"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="panel">
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label>Long URL</label>
          <input className="neon-input" value={longUrl} onChange={(e) => setLongUrl(e.target.value)} placeholder="https://..." required />
        </div>
        <div className="form-row">
          <label>Custom code (optional)</label>
          <input className="neon-input" value={code} onChange={(e) => setCode(e.target.value)} placeholder="6-8 chars (A-Za-z0-9)" />
        </div>
        <div className="row">
          <button className="neon-btn" type="submit" disabled={loading}>
            {loading ? "Creating…" : "Create"}
          </button>
          {message && <div style={{ color: "#cfeff6", fontSize: 13 }}>{message}</div>}
        </div>
      </form>
    </div>
  );
}