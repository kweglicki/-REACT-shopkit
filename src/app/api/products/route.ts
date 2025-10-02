import { NextResponse } from 'next/server';
import { productsSchema, type Product } from '@/lib/zod';
import data from '@/data/products.json';

export const revalidate = 60;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get('q') ?? '').toLowerCase();
  const category = (searchParams.get('category') ?? '').toLowerCase();

  const all = (data as { products: Product[] }).products;
  let products = all;

  if (q) {
    products = products.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        (p.description ?? '').toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q),
    );
  }
  if (category) {
    products = products.filter((p) => p.category.toLowerCase() === category);
  }

  const parsed = productsSchema.safeParse({ products });
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid data' }, { status: 500 });
  }
  return NextResponse.json(parsed.data, { status: 200 });
}
