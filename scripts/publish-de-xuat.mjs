// Đưa báo giá kiểu mới (dựng bằng skill duyweb-bao-gia) lên site tại /de-xuat/<ma-link>.
//
//   npm run de-xuat                       → đưa lên mọi file bao-gia-xuat/*.html
//   npm run de-xuat -- xe-dien-phuc-an-k7m2q9   → chỉ một báo giá
//
// Nguồn:  bao-gia-xuat/<ma-link>.html
//         + tuỳ chọn bao-gia-xuat/<ma-link>-og.jpg (1200×630, ảnh khi gửi link)
//         + tuỳ chọn bao-gia-xuat/<ma-link>-icon.png|jpg (ảnh vuông, icon khi lưu ra màn hình chính).
//           Không có ảnh icon thì tự tạo icon chữ viết tắt tên khách trên màu chủ đạo của trang.
// Đích:   public/de-xuat/<ma-link>.html (+ og/<ma-link>.jpg, icon/<ma-link>-*.png, icon/<ma-link>.webmanifest)
// Báo giá cũ (React, /bao-gia-kh/) giữ nguyên — hai kiểu chạy song song để so sánh.
import { spawnSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const SITE = "https://duyweb.info.vn";
const ROUTE = "de-xuat";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const srcDir = path.join(root, "bao-gia-xuat");
const outDir = path.join(root, "public", ROUTE);

const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;");

function upsertHead(html, re, tag) {
  return re.test(html) ? html.replace(re, tag) : html.replace("</head>", `${tag}\n</head>`);
}

function readQuote(slug) {
  try {
    return JSON.parse(fs.readFileSync(path.join(srcDir, `${slug}.json`), "utf-8"));
  } catch {
    return {};
  }
}

// Tên ngắn của khách: lấy từ <ma-link>.json (meta.client_short), không có thì từ <title>
function shortName(slug, html) {
  const short = readQuote(slug).meta?.client_short;
  if (short) return short;
  const title = (html.match(/<title>([^<]*)<\/title>/i)?.[1] || slug).replace(/&amp;/g, "&");
  const parts = title.split(/\s[·×–-]\s/).map((p) => p.trim()).filter(Boolean);
  return (title.includes(" · ") ? parts[1] : parts[0]) || parts[0];
}

const initials = (name) =>
  name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toLocaleUpperCase("vi");

function python() {
  for (const cmd of ["python", "python3", "py"]) {
    if (spawnSync(cmd, ["--version"]).status === 0) return cmd;
  }
  return null;
}

// Icon "Thêm vào màn hình chính" (iPhone + Android) và tên hiện dưới icon
function addHomeIcon(slug, html) {
  const name = shortName(slug, html);
  // Màu khách trong <ma-link>.json (theme.accent) đè màu mặc định của template
  const accent = readQuote(slug).theme?.accent || html.match(/--accent:\s*(#[0-9a-f]{6})/i)?.[1] || "#1E293B";
  const ext = ["png", "jpg", "jpeg", "webp"].find((e) => fs.existsSync(path.join(srcDir, `${slug}-icon.${e}`)));
  const py = python();
  if (!py) {
    console.warn(`  ! Không có Python, bỏ qua icon cho ${slug}`);
    return html;
  }
  const iconDir = path.join(outDir, "icon");
  const args = [path.join(root, "scripts", "make-icons.py"), path.join(iconDir, slug), "--bg", ext ? "#FFFFFF" : accent];
  if (ext) args.push("--src", path.join(srcDir, `${slug}-icon.${ext}`));
  else args.push("--text", initials(name));
  const r = spawnSync(py, args, { stdio: "inherit" });
  if (r.status !== 0) {
    console.warn(`  ! Tạo icon lỗi, bỏ qua icon cho ${slug}`);
    return html;
  }

  const base = `/${ROUTE}/icon/${slug}`;
  const manifest = {
    name,
    short_name: name,
    start_url: `/${ROUTE}/${slug}`,
    scope: `/${ROUTE}/${slug}`,
    display: "standalone",
    background_color: "#FFFFFF",
    theme_color: accent,
    icons: [192, 512].map((s) => ({ src: `${base}-${s}.png`, sizes: `${s}x${s}`, type: "image/png", purpose: "any" })),
  };
  fs.writeFileSync(path.join(iconDir, `${slug}.webmanifest`), JSON.stringify(manifest, null, 2));

  html = html.replace(/\s*<link\s+rel="(?:icon|shortcut icon|apple-touch-icon|manifest)"[^>]*>/gi, "");
  html = upsertHead(html, /<meta\s+name="apple-mobile-web-app-title"[^>]*>/i, `<meta name="apple-mobile-web-app-title" content="${esc(name)}">`);
  html = upsertHead(html, /<meta\s+name="application-name"[^>]*>/i, `<meta name="application-name" content="${esc(name)}">`);
  html = html.replace(
    "</head>",
    [
      `<link rel="icon" type="image/png" sizes="32x32" href="${base}-32.png">`,
      `<link rel="apple-touch-icon" sizes="180x180" href="${base}-180.png">`,
      `<link rel="manifest" href="${base}.webmanifest">`,
      "</head>",
    ].join("\n"),
  );
  console.log(`  icon: ${ext ? `từ ảnh ${slug}-icon.${ext}` : `chữ "${initials(name)}" trên ${accent}`} · tên "${name}"`);
  return html;
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

  html = addHomeIcon(slug, html);

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
