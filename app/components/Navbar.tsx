'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Accueil' },
    { href: '/comparateur', label: 'Comparateur' },
    { href: '/blacklist', label: 'Blacklist & Alertes' },
    { href: '/guide', label: 'Guide' },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-[#1f1f1f] bg-[#0a0a0a]/95 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#22c55e] flex items-center justify-center">
              <span className="text-[#0a0a0a] font-bold text-xl tracking-[-1px]">PR</span>
            </div>
            <div>
              <div className="font-semibold text-xl tracking-[-0.5px]">PropRadar</div>
              <div className="text-[10px] text-[#a1a1aa] -mt-1">DONNÉES • VÉRITÉ • RÉSULTATS</div>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-1">
          {links.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link ${isActive ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <Link 
            href="/comparateur" 
            className="btn btn-primary btn-sm hidden md:flex"
          >
            Lancer le comparateur
          </Link>
          <div className="text-xs px-3 py-1 rounded-full border border-[#1f1f1f] text-[#a1a1aa]">
            Mise à jour • 28 juin 2026
          </div>
        </div>
      </div>
    </nav>
  );
}
