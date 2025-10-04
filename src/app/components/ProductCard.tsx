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
          fill
          sizes="(max-width: 900px) 50vw, 25vw"
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
      </Link>
      <div className="card-body">
        <h3 className="card-title">
          <Link href={`/product/${product.slug}`}>{product.title}</Link>
        </h3>
        <p className="card-desc">{product.description}</p>
        <div className="card-footer">
          <Price amount={product.price} currency={product.currency} />
          <Link className="badge" href={`/?category=${encodeURIComponent(product.category)}`}>
            {product.category}
          </Link>
        </div>
      </div>
    </article>
  );
}
