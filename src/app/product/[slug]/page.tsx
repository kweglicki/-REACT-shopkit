import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { productQuery } from '@/lib/queries';
import { ProductDetailsClient } from '@/components/ProductDetailsClient';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  // SSG kilku top produktów (opcjonalnie): puste → fallback on-demand
  return [];
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const qc = new QueryClient();
  const q = productQuery(params.slug);
  await qc.prefetchQuery(q);
  const state = dehydrate(qc);
  // jeśli fetch nie znajdzie produktu, queryFn rzuci → przechwycimy w kliencie; tu opcjonalnie 404
  return (
    <HydrationBoundary state={state}>
      <ProductDetailsClient slug={params.slug} />
    </HydrationBoundary>
  );
}
