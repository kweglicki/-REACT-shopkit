import { z } from 'zod';

export const productSchema = z.object({
  id: z.number().int().positive(),
  slug: z.string().min(1),
  title: z.string().min(1),
  description: z.string().optional().default(''),
  price: z.number().nonnegative(),
  currency: z.enum(['PLN', 'USD', 'EUR']).default('USD'),
  images: z.array(z.string().min(1)).min(1),
  category: z.string().min(1),
  rating: z.number().min(0).max(5).default(4),
  stock: z.number().int().nonnegative().default(0),
});
export const productsSchema = z.object({ products: z.array(productSchema) });

export type Product = z.infer<typeof productSchema>;
export type ProductsResponse = z.infer<typeof productsSchema>;
