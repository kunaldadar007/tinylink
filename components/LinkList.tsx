"use client";
import React, { useEffect, useState } from "react";

type LinkItem = {
  id?: number;
  code: string;
  url: string;
  clicks?: number;
  lastClicked?: string | null;
  createdAt?: string;
};

export default function LinkList() {
  const [links, setLinks] = useState<LinkItem[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      try {
        const res = await fetch("/api/links");
        const data = await res.json();
        if (mounted) setLinks(Array.isArray(data) ? data : []);
      } catch {
        if (mounted) setLinks([]);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();

    function onCreated(e: Event) {
      const evt = e as CustomEvent;
      const newLink = evt.detail as LinkItem | undefined;
      if (!newLink) return;
      setLinks((prev) => (prev ? [newLink, ...prev] : [newLink]));
      showToast("Link added");
    }
    window.addEventListener("link:created", onCreated as EventListener);
    return () => {
      mounted = false;
      window.removeEventListener("link:created", onCreated as EventListener);
    };
  }, []);

  function showToast(msg: string) {
    setToast(msg);
    window.setTimeout(() => setToast(null), 3000);
  }

  async function handleCopy(l: LinkItem) {
    try {
      const full = window.location.origin + "/" + l.code;
      await navigator.clipboard.writeText(full);
      showToast("Copied: " + l.code);
    } catch {
      showToast("Copy failed");
    }
  }

  async function handleDelete(code: string) {
    if (!confirm(`Delete link "${code}"?`)) return;
    try {
      const res = await fetch(`/api/links/${encodeURIComponent(code)}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setLinks((prev) => (prev ? prev.filter((p) => p.code !== code) : []));
      showToast("Deleted: " + code);
    } catch {
      showToast("Delete failed");
    }
  }

  if (loading) return <div className="panel">Loading links…</div>;
  const items = links ?? [];
  if (items.length === 0) return <div className="panel">No links yet. Use the form to create a link.</div>;

  return (
    <>
      <div className="list">
        {items.map((l) => (
          <div key={l.code} className="card">
            <div className="row" style={{ alignItems: "center", justifyContent: "space-between" }}>
              <div className="code">{l.code}</div>
              <div style={{ display: "flex", gap: 8 }}>
                <button className="action-btn" onClick={() => handleCopy(l)}>Copy</button>
                <button className="delete-btn" onClick={() => handleDelete(l.code)}>Delete</button>
              </div>
            </div>

            <div className="target" title={l.url}>{l.url}</div>

            <div className="meta">
              <div>{l.clicks ?? 0} clicks</div>
              <div style={{ marginLeft: "auto", color: "var(--muted)", fontSize: 12 }}>
                {l.lastClicked ?? "never"}
              </div>
            </div>
          </div>
        ))}
      </div>

      {toast && <div className={`toast show`}>{toast}</div>}
    </>
  );
}