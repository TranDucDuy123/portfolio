// Đưa báo giá kiểu mới (dựng bằng skill duyweb-bao-gia) lên site tại /de-xuat/<ma-link>.
//
//   npm run de-xuat                       → đưa lên mọi file bao-gia-xuat/*.html
//   npm run de-xuat -- xe-dien-phuc-an-k7m2q9   → chỉ một báo giá
//
// Nguồn:  bao-gia-xuat/<ma-link>.html  (+ tuỳ chọn bao-gia-xuat/<ma-link>-og.jpg, 1200×630)
// Đích:   public/de-xuat/<ma-link>.html (+ public/de-xuat/og/<ma-link>.jpg)
// Báo giá cũ (React, /bao-gia-kh/) giữ nguyên — hai kiểu chạy song song để so sánh.
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const SITE = "https://ducduyweb.vn";
const ROUTE = "de-xuat";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const srcDir = path.join(root, "bao-gia-xuat");
const outDir = path.join(root, "public", ROUTE);

const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;");

function upsertHead(html, re, tag) {
  return re.test(html) ? html.replace(re, tag) : html.replace("</head>", `${tag}\n</head>`);
}

function publish(slug) {
  if (!/^[a-z0-9-]{4,80}$/.test(slug)) throw new Error(`Mã link không hợp lệ: ${slug}`);
  const src = path.join(srcDir, `${slug}.html`);
  if (!fs.existsSync(src)) throw new Error(`Không thấy ${path.relative(root, src)}`);
  let html = fs.readFileSync(src, "utf-8");
  const url = `${SITE}/${ROUTE}/${slug}`;

  html = upsertHead(html, /<meta\s+name="robots"[^>]*>/i, `<meta name="robots" content="noindex, nofollow, noarchive">`);
  html = upsertHead(html, /<link\s+rel="canonical"[^>]*>/i, `<link rel="canonical" href="${url}">`);
  html = upsertHead(html, /<meta\s+property="og:url"[^>]*>/i, `<meta property="og:url" content="${url}">`);

  const og = path.join(srcDir, `${slug}-og.jpg`);
  if (fs.existsSync(og)) {
    fs.mkdirSync(path.join(outDir, "og"), { recursive: true });
    fs.copyFileSync(og, path.join(outDir, "og", `${slug}.jpg`));
    const img = `${SITE}/${ROUTE}/og/${slug}.jpg`;
    html = upsertHead(html, /<meta\s+property="og:image"[^>]*>/i, `<meta property="og:image" content="${esc(img)}">`);
    html = upsertHead(html, /<meta\s+name="twitter:card"[^>]*>/i, `<meta name="twitter:card" content="summary_large_image">`);
  }

  if (!html.includes("/quote-track.js")) {
    html = html.replace("</body>", `<script src="/quote-track.js" data-version="v2" defer></script>\n</body>`);
  }

  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, `${slug}.html`), html);
  console.log(`✓ ${url}`);
}

const args = process.argv.slice(2);
const slugs = args.length
  ? args
  : fs.readdirSync(srcDir).filter((f) => f.endsWith(".html")).map((f) => f.slice(0, -5));
if (!slugs.length) console.log("Không có báo giá nào trong bao-gia-xuat/");
for (const s of slugs) publish(s);
