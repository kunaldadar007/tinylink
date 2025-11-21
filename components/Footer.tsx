import React from "react";

export default function Footer() {
  return (
    <footer className="footer site">
      © {new Date().getFullYear()} TinyLink — built with neon vibes
    </footer>
  );
}