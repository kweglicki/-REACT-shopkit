import Link from 'next/link';
import Image from 'next/image';
import { Price } from './Price';
import type { Product } from '@/lib/zod';

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="card">
      <Link href={`/product/${product.slug}`} className="card-img">
        <Image 
          src={product.images[0]} 
          alt={product.title} 
          width={400} 
          height={300} 
        />
      </Link>
      <div className="card-body">
        <h3 className="card-title">
          <Link href={`/product/${product.slug}`}>{product.title}</Link>
        </h3>
        <p className="card-desc">{product.description}</p>
        <div className="card-footer">
          <Price amount={product.price} currency={product.currency} />
          <span className="badge">{product.category}</span>
        </div>
      </div>
    </article>
  );
}
