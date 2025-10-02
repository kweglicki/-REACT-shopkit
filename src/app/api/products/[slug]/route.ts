import { NextResponse } from 'next/server';
import data from '@/data/products.json';
import { productSchema, type Product } from '@/lib/zod';

export const revalidate = 60;

export async function GET(_: Request, ctx: { params: { slug: string } }) {
  const all = (data as { products: Product[] }).products;
  const found = all.find((p) => p.slug === ctx.params.slug);
  if (!found) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  const parsed = productSchema.safeParse(found);
  if (!parsed.success) return NextResponse.json({ error: 'Invalid data' }, { status: 500 });
  return NextResponse.json(parsed.data, { status: 200 });
}
