import type { Metadata } from 'next';
import './globals.css';
import Providers from './providers';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

export const metadata: Metadata = {
  title: 'ShopKit',
  description: 'Headless e-commerce storefront (Next.js + React Query + Zod)',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl">
      <body>
        <Providers>
          <Header />
          <main className="container">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
