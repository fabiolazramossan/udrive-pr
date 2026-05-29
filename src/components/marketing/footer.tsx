import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <span className="text-white font-bold text-lg tracking-tight">Ü DRIVE</span>
          <span className="text-white/20">·</span>
          <span className="text-white/40 text-sm">Puerto Rico</span>
        </div>
        <div className="flex items-center gap-6 text-sm text-white/40">
          <Link href="#fleet" className="hover:text-white transition-colors">Fleet</Link>
          <Link href="#how-it-works" className="hover:text-white transition-colors">How It Works</Link>
          <Link href="#delivery" className="hover:text-white transition-colors">Delivery</Link>
          <a href="mailto:udrivepr@gmail.com" className="hover:text-white transition-colors">Contact</a>
        </div>
        <p className="text-white/20 text-sm">© 2026 Ü Drive PR. All rights reserved.</p>
      </div>
    </footer>
  );
}
