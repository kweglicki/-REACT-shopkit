export function Price({ amount, currency }: { amount: number; currency: 'PLN' | 'USD' | 'EUR' }) {
  return <strong>{new Intl.NumberFormat('pl-PL', { style: 'currency', currency }).format(amount)}</strong>;
}
