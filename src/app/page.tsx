import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { productsQuery } from '../lib/queries';
import { ProductGridClient } from './components/ProductGridClient';

export const dynamic = 'force-static';
export default async function Home({ searchParams }: { searchParams: Record<string, string | string[] | undefined> }) {
  const q = new URLSearchParams();
  if (searchParams.q) q.set('q', String(searchParams.q));
  if (searchParams.category) q.set('category', String(searchParams.category));

  const qc = new QueryClient();
  await qc.prefetchQuery(productsQuery({ q: q.get('q') ?? '', category: q.get('category') ?? '' }));

  return (
    <HydrationBoundary state={dehydrate(qc)}>
      <ProductGridClient />
    </HydrationBoundary>
  );
}
