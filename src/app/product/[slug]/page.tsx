import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { productQuery } from '@/lib/queries';
import { ProductDetailsClient } from '../../components/ProductDetailsClient';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  // SSG kilku top produktów (opcjonalnie): puste → fallback on-demand
  return [];
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const qc = new QueryClient();
  const { slug } = await params;
  const q = productQuery(slug);
  await qc.prefetchQuery(q);
  const state = dehydrate(qc);
  return (
    <HydrationBoundary state={state}>
      <ProductDetailsClient slug={slug} />
    </HydrationBoundary>
  );
}
