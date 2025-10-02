'use client';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState, useTransition } from 'react';
import { CategoriesClient } from './CategoriesClient';

export function Header() {
  const sp = useSearchParams();
  const [q, setQ] = useState(sp.get('q') ?? '');
  const router = useRouter();
  const pathname = usePathname();
  const [pending, start] = useTransition();

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams(sp.toString());
    if (q) params.set('q', q);
    else params.delete('q');
    start(() => router.push(`${pathname}?${params.toString()}`));
  }

  return (
    <header className="header">
      <div className="container header-row">
        <Link href="/" className="logo">ShopKit</Link>
        <form onSubmit={submit} className="search">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Szukaj produktów…"
            aria-label="Szukaj"
          />
          <button disabled={pending}>Szukaj</button>
        </form>
        <CategoriesClient />
      </div>
    </header>
  );
}
