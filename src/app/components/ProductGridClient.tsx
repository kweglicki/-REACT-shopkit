'use client';

import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { productsQuery } from '@/lib/queries';
import { ProductCard } from './ProductCard';

export function ProductGridClient() {
  const sp = useSearchParams();
  const q = sp.get('q') ?? '';
  const category = sp.get('category') ?? '';

  const { data, isLoading, isError } = useQuery(productsQuery({ q, category }));
  if (isLoading) return <div className="grid">{Array.from({ length: 8 }).map((_, i) => <div key={i} className="skeleton" />)}</div>;
  if (isError || !data) return <p>Coś poszło nie tak.</p>;

  return (
    <>
      <p className="muted">Znaleziono: {data.products.length}</p>
      <div className="grid">
        {data.products.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </>
  );
}
