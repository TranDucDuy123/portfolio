// Dựng trang bằng React phía máy chủ lúc build (scripts/prerender.mjs gọi), để mỗi trang có HTML riêng
// mà Google, Zalo, Facebook, bot AI đọc được ngay. Trình duyệt vẫn dùng src/main.tsx như cũ.
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { AppShell } from "./App";
import { resetSsrStore } from "./lib/ssr";
import { caseStudies } from "./data/caseStudies";
import { industrySolutions } from "./data/solutions";

// Các trang cần HTML riêng. Bài Blog, Cafe Số, cẩm nang đã do vite-plugins/staticPages.ts sinh.
export const routes = [
  "/",
  "/about",
  "/services",
  "/bao-gia",
  "/resources",
  "/videos",
  "/projects",
  "/connect",
  "/case-study",
  ...caseStudies.map((c) => `/case-study/${c.slug}`),
  "/solutions",
  ...industrySolutions.map((s) => `/solutions/${s.slug}`),
];

export const notFoundRoute = "/__khong-tim-thay__";

export function render(url: string) {
  const store = resetSsrStore();
  const html = renderToString(
    <StaticRouter location={url}>
      <AppShell />
    </StaticRouter>,
  );
  return { html, meta: store.meta, schemas: [...store.schemas] };
}
