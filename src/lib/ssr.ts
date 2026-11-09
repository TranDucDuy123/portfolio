// Khi build dựng trang bằng React phía máy chủ (src/entry-server.tsx), Meta và Schema không chạy
// useEffect được. Chúng ghi tiêu đề, mô tả, JSON-LD vào đây để scripts/prerender.mjs đặt vào <head>.

export interface SsrMeta {
  title: string;
  description: string;
  keywords: string[];
  ogImage: string;
  canonical: string;
  noindex?: boolean;
}

export const isServer = typeof window === "undefined";

export const ssrStore: { meta: SsrMeta | null; schemas: object[] } = { meta: null, schemas: [] };

export function resetSsrStore() {
  ssrStore.meta = null;
  ssrStore.schemas = [];
  return ssrStore;
}
