import Link from 'next/link';
import { MessageSquareDashed } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Kiri */}
          <div className="flex-shrink-0 font-bold text-xl flex items-center gap-2 text-yellow-400">
            <MessageSquareDashed size={24} />
            <span>48MESSAGE</span>
          </div>
          
          {/* Link Kanan (Desktop) */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8 font-medium">
              <Link href="/" className="text-yellow-400 px-3 py-2 rounded-md text-sm transition-colors">Beranda</Link>
              <Link href="/klasemen" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm transition-colors">Klasemen</Link>
              <Link href="/toko" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm transition-colors">Pasar Malam</Link>
              <Link href="#" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm transition-colors">Tentang</Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}