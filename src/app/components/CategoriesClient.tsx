'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const CATS = ['all', 'electronics', 'fashion', 'home', 'toys', 'beauty'] as const;

export function CategoriesClient() {
  const sp = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const active = (sp.get('category') ?? 'all').toLowerCase();

  function setCat(cat: string) {
    const params = new URLSearchParams(sp.toString());
    if (cat === 'all') params.delete('category');
    else params.set('category', cat);
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <nav className="cats">
      {CATS.map((c) => (
        <button
          key={c}
          className={`chip ${active === c ? 'chip--active' : ''}`}
          onClick={() => setCat(c)}
        >
          {c}
        </button>
      ))}
    </nav>
  );
}
