// Sinh HTML riêng cho các trang chính (trang chủ, dịch vụ, giới thiệu, bảng giá, case study, giải pháp…)
// bằng chính giao diện React, dựng phía máy chủ lúc build. Chạy sau `vite build` và bản dựng SSR:
//
//   vite build && vite build --ssr src/entry-server.tsx --outDir node_modules/.ssr-build && node scripts/prerender.mjs
//
// Mỗi trang có title, mô tả, canonical, ảnh chia sẻ, JSON-LD và toàn bộ nội dung trong #root.
// Trình duyệt vẫn chạy React như cũ (createRoot thay nội dung #root).
// Thêm dist/404.html (noindex): Vercel trả trang này kèm mã 404 cho link không tồn tại.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const ssrEntry = path.join(root, "node_modules/.ssr-build/entry-server.js");
const SITE = "https://duyweb.info.vn";

const { render, routes, notFoundRoute } = await import(pathToFileURL(ssrEntry).href);
const shell = fs.readFileSync(path.join(dist, "index.html"), "utf-8");

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function setMeta(html, attr, key, value) {
  const re = new RegExp(`<meta\\s+${attr}="${key.replace(/[.:]/g, "\\$&")}"[^>]*>`, "i");
  const tag = `<meta ${attr}="${key}" content="${esc(value)}" />`;
  return re.test(html) ? html.replace(re, tag) : html.replace("</head>", `    ${tag}\n  </head>`);
}

function page(route, { html, meta, schemas }, { noindex = false } = {}) {
  let out = shell;
  if (meta) {
    const url = noindex ? "" : meta.canonical || `${SITE}${route === "/" ? "/" : route}`;
    out = out.replace(/<title>[\s\S]*?<\/title>/i, `<title>${esc(meta.title)}</title>`);
    out = setMeta(out, "name", "description", meta.description);
    if (meta.keywords?.length) out = setMeta(out, "name", "keywords", meta.keywords.join(", "));
    for (const [k, v] of [["og:title", meta.title], ["og:description", meta.description], ["og:image", meta.ogImage], ["twitter:title", meta.title], ["twitter:description", meta.description], ["twitter:image", meta.ogImage]]) {
      out = setMeta(out, k.startsWith("og:") ? "property" : "name", k, v);
    }
    if (url) {
      out = out.replace(/<link\s+rel="canonical"[^>]*>/i, `<link rel="canonical" href="${url}" />`);
      out = setMeta(out, "property", "og:url", url);
      out = setMeta(out, "name", "twitter:url", url);
    }
  } else {
    console.warn(`  ! ${route}: trang không khai báo Meta, giữ title/mô tả mặc định`);
  }
  if (noindex || meta?.noindex) {
    out = setMeta(out, "name", "robots", "noindex, follow");
    out = out.replace(/\s*<link\s+rel="canonical"[^>]*>/i, "");
  }

  // JSON-LD của trang. Bỏ ProfessionalService vì index.html đã có một bản cho toàn site, tránh hai thực thể lệch nhau
  const seen = new Set();
  const ld = schemas
    .filter((o) => o && o["@type"] && o["@type"] !== "ProfessionalService")
    .map((o) => JSON.stringify(o))
    .filter((s) => !seen.has(s) && seen.add(s))
    .map((s) => `    <script type="application/ld+json">${s.replace(/</g, "\\u003c")}</script>`);
  if (ld.length) out = out.replace("</head>", `${ld.join("\n")}\n  </head>`);

  return out.replace(/<div id="root">\s*<\/div>/, `<div id="root">${html}</div>`);
}

let count = 0;
for (const route of routes) {
  let result;
  try {
    result = render(route);
  } catch (e) {
    console.warn(`  ! ${route}: dựng lỗi, giữ HTML mặc định (${e.message})`);
    continue;
  }
  const file = route === "/" ? path.join(dist, "index.html") : path.join(dist, `${route.slice(1)}.html`);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, page(route, result));
  count++;
}

fs.writeFileSync(path.join(dist, "404.html"), page(notFoundRoute, render(notFoundRoute), { noindex: true }));
console.log(`  trang chính dựng sẵn: ${count}/${routes.length} trang + 404.html`);
