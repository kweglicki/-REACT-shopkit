'use client';

import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { productQuery } from '@/lib/queries';
import { Price } from './Price';
import Link from 'next/link';

export function ProductDetailsClient({ slug }: { slug: string }) {
  const { data, isLoading, isError } = useQuery(productQuery(slug));
  if (isLoading) return <p>Ładowanie…</p>;
  if (isError || !data) return <p>Nie znaleziono produktu.</p>;

  return (
    <div className="product">
      <div className="product-images">
        <Image src={data.images[0]} alt={data.title} width={640} height={640} />
      </div>
      <div className="product-info">
        <h1>{data.title}</h1>
        <p><Link className="badge" href={`/?category=${encodeURIComponent(data.category)}`}>
          {data.category}
        </Link></p>
        <Price amount={data.price} currency={data.currency} />
        <p>{data.description}</p>
        <div className="muted">⭐ {data.rating} · Stan: {data.stock} szt.</div>
      </div>
    </div>
  );
}
