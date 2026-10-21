import fs from "fs";
import path from "path";
import type { Plugin, ResolvedConfig } from "vite";

/*
  Trang báo giá riêng là SPA: Zalo, Facebook, Messenger không chạy JS nên chỉ đọc
  được thẻ meta có sẵn trong HTML. Sau khi build, plugin này sinh
  dist/bao-gia-kh/<ma-link>.html cho mỗi file public/kh-data/<ma-link>.json
  có khối "seo", với title / description / ảnh chia sẻ riêng và robots noindex.
  Vercel (cleanUrls) phục vụ /bao-gia-kh/<ma-link> từ file .html đó trước khi áp dụng rewrite,
  nên link vẫn chạy app như thường; mã không có file thì rơi về index.html.
*/

const SITE = "https://ducduyweb.vn";
const ROUTE = "bao-gia-kh";

interface QuoteSeo {
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  icon?: string;
  iconLarge?: string;
  favicon?: string;
  appTitle?: string;
}

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const abs = (u: string) => (/^https?:\/\//.test(u) ? u : `${SITE}${u.startsWith("/") ? "" : "/"}${u}`);

function setMeta(html: string, attr: "name" | "property", key: string, value: string) {
  const re = new RegExp(`<meta\\s+${attr}="${key.replace(/[.:]/g, "\\$&")}"[^>]*>`, "i");
  const tag = `<meta ${attr}="${key}" content="${esc(value)}" />`;
  return re.test(html) ? html.replace(re, tag) : html.replace("</head>", `    ${tag}\n  </head>`);
}

export function renderQuoteHtml(base: string, slug: string, seo: QuoteSeo) {
  const url = `${SITE}/${ROUTE}/${slug}`;
  let html = base.replace(/<title>[\s\S]*?<\/title>/i, `<title>${esc(seo.title)}</title>`);
  html = html.replace(/\s*<meta\s+name="keywords"[^>]*>/i, "");
  html = html.replace(/<link\s+rel="canonical"[^>]*>/i, `<link rel="canonical" href="${url}" />`);

  const metas: [("name" | "property"), string, string | undefined][] = [
    ["name", "description", seo.description],
    ["name", "robots", "noindex, nofollow, noarchive"],
    ["property", "og:type", "website"],
    ["property", "og:site_name", "Đức Duy Web"],
    ["property", "og:locale", "vi_VN"],
    ["property", "og:url", url],
    ["property", "og:title", seo.title],
    ["property", "og:description", seo.description],
    ["property", "og:image", seo.image && abs(seo.image)],
    ["property", "og:image:width", seo.image && "1200"],
    ["property", "og:image:height", seo.image && "630"],
    ["property", "og:image:alt", seo.image && (seo.imageAlt || seo.title)],
    ["name", "twitter:card", "summary_large_image"],
    ["name", "twitter:url", url],
    ["name", "twitter:title", seo.title],
    ["name", "twitter:description", seo.description],
    ["name", "twitter:image", seo.image && abs(seo.image)],
  ];
  for (const [attr, key, value] of metas) if (value) html = setMeta(html, attr, key, value);

  // Icon khi lưu ra màn hình chính: iOS chỉ đọc apple-touch-icon có sẵn trong HTML
  if (seo.appTitle) {
    html = setMeta(html, "name", "apple-mobile-web-app-title", seo.appTitle);
    html = setMeta(html, "name", "application-name", seo.appTitle);
  }
  const links: string[] = [];
  if (seo.favicon) links.push(`<link rel="icon" type="image/png" sizes="32x32" href="${esc(seo.favicon)}" />`);
  if (seo.iconLarge) links.push(`<link rel="icon" type="image/png" sizes="512x512" href="${esc(seo.iconLarge)}" />`);
  if (seo.icon) links.push(`<link rel="apple-touch-icon" sizes="180x180" href="${esc(seo.icon)}" />`);
  if (links.length) {
    // Bỏ cả manifest của trang chủ, để Android không lấy icon Duy Web cho báo giá
    html = html.replace(/\s*<link\s+rel="(?:icon|shortcut icon|apple-touch-icon|manifest)"[^>]*>/gi, "");
    html = html.replace("</head>", `    ${links.join("\n    ")}\n  </head>`);
  }
  return html;
}

export default function privateQuoteMeta(): Plugin {
  let config: ResolvedConfig;
  return {
    name: "private-quote-meta",
    apply: "build",
    configResolved(c) {
      config = c;
    },
    closeBundle() {
      const outDir = path.resolve(config.root, config.build.outDir);
      const dataDir = path.resolve(config.root, "public/kh-data");
      const indexPath = path.join(outDir, "index.html");
      if (!fs.existsSync(indexPath) || !fs.existsSync(dataDir)) return;
      const base = fs.readFileSync(indexPath, "utf-8");

      for (const file of fs.readdirSync(dataDir)) {
        if (!file.endsWith(".json")) continue;
        const slug = file.slice(0, -5);
        let data: { seo?: QuoteSeo; pricing?: unknown };
        try {
          data = JSON.parse(fs.readFileSync(path.join(dataDir, file), "utf-8"));
        } catch (e) {
          this.warn(`kh-data/${file}: JSON lỗi, bỏ qua (${(e as Error).message})`);
          continue;
        }
        // Chỉ file báo giá (có pricing) và đã khai báo seo
        if (!data.pricing || !data.seo?.title || !data.seo.description) continue;

        const dir = path.join(outDir, ROUTE);
        fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(path.join(dir, `${slug}.html`), renderQuoteHtml(base, slug, data.seo));
        config.logger.info(`  báo giá riêng: /${ROUTE}/${slug}`);
      }
    },
  };
}
