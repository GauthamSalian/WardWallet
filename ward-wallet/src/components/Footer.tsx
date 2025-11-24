"use client";

export default function Footer() {
  return (
    <footer className="mt-20 py-10 text-center text-gray-400 border-t border-white/6">
      <div className="max-w-6xl mx-auto px-6">
        <p>© {new Date().getFullYear()} Ward Wallet — Transparent ward governance.</p>
      </div>
    </footer>
  );
}
