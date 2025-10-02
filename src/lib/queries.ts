import { zfetch } from './fetch';
import { productsSchema, productSchema, type ProductsResponse, type Product } from './zod';

export function productsQuery(params: { q?: string; category?: string }) {
  const search = new URLSearchParams();
  if (params.q) search.set('q', params.q);
  if (params.category) search.set('category', params.category);
  const url = `/api/products${search.toString() ? `?${search.toString()}` : ''}`;
  return {
    queryKey: ['products', params] as const,
    queryFn: () => zfetch<ProductsResponse>(url, productsSchema),
    staleTime: 30_000,
  };
}

export function productQuery(slug: string) {
  const url = `/api/products/${encodeURIComponent(slug)}`;
  return {
    queryKey: ['product', slug] as const,
    queryFn: () => zfetch<Product>(url, productSchema),
    staleTime: 60_000,
  };
}
