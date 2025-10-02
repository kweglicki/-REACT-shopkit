import { ZodTypeAny } from 'zod';

export async function zfetch<T>(input: RequestInfo | URL, schema: ZodTypeAny, init?: RequestInit): Promise<T> {
  const res = await fetch(input, init);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = await res.json();
  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    console.error(parsed.error);
    throw new Error('Invalid response shape');
  }
  return parsed.data as T;
}
