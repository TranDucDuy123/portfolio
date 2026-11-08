import fs from "fs";
import path from "path";
import type { Plugin, ResolvedConfig } from "vite";
import { buildBlog, buildCafeSo, type BlogEntry, type CafeSoEntry } from "../src/lib/content";
import { inline, markdownToHtml } from "../src/lib/markdown";
import { guides } from "../src/data/guides";
import type { Guide } from "../src/data/guideTypes";

/*
  Site là SPA: không có bước này, mọi link bài viết trả về cùng một HTML của trang chủ
  (cùng title, mô tả, ảnh), nội dung chỉ hiện sau khi JavaScript chạy. Google phải tự chạy JS,
  còn Zalo, Facebook, Bing và các bot AI thường chỉ thấy trang chủ.

  Sau khi build, plugin sinh sẵn mỗi trang bài viết một file HTML có đủ title, mô tả, canonical,
  ảnh chia sẻ, dữ liệu có cấu trúc (JSON-LD) và toàn bộ nội dung bài nằm trong #root.
  React vẫn chạy như cũ: createRoot thay nội dung #root bằng giao diện đầy đủ.
  Vercel (cleanUrls) phục vụ /blog/<slug> từ dist/blog/<slug>.html trước khi áp dụng rewrite về "/".

  Trang sinh ra: /blog, /blog/<slug>, /cafe-so, /cafe-so/<slug>, /kien-thuc, /kien-thuc/<slug>.
  Kèm dist/sitemap.xml: các trang tĩnh khác lấy từ public/sitemap.xml, các bài viết tự thêm.
*/

const SITE = "https://duyweb.info.vn";
const BRAND = "Đức Duy Web";
const DEFAULT_IMAGE = "/og-image.jpg";

interface PageSpec {
  route: string; // vd "blog/seo-la-gi"; "" là trang chủ
  title: string;
  description: string;
  keywords?: string[];
  type: "article" | "website";
  image?: string;
  published?: string; // YYYY-MM-DD
  modified?: string;
  body: string; // HTML đặt trong #root
  jsonLd: object[];
}

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const abs = (u: string) => (/^https?:\/\//.test(u) ? u : `${SITE}${u.startsWith("/") ? "" : "/"}${u}`);
const fullTitle = (t: string) => (t.includes(BRAND) ? t : `${t} | ${BRAND}`);
const isoDate = (d?: string) => (d && /^\d{4}-\d{2}-\d{2}/.test(d) ? d.slice(0, 10) : undefined);
const viDate = (d?: string) => (isoDate(d) ? isoDate(d)!.split("-").reverse().join("/") : "");

function setMeta(html: string, attr: "name" | "property", key: string, value: string) {
  const re = new RegExp(`<meta\\s+${attr}="${key.replace(/[.:]/g, "\\$&")}"[^>]*>`, "i");
  const tag = `<meta ${attr}="${key}" content="${esc(value)}" />`;
  return re.test(html) ? html.replace(re, tag) : html.replace("</head>", `    ${tag}\n  </head>`);
}

function renderPage(base: string, p: PageSpec) {
  const url = `${SITE}/${p.route}`;
  const title = fullTitle(p.title);
  const image = abs(p.image || DEFAULT_IMAGE);
  let html = base.replace(/<title>[\s\S]*?<\/title>/i, `<title>${esc(title)}</title>`);
  html = html.replace(/<link\s+rel="canonical"[^>]*>/i, `<link rel="canonical" href="${url}" />`);

  const metas: ["name" | "property", string, string | undefined][] = [
    ["name", "description", p.description],
    ["name", "keywords", p.keywords?.length ? p.keywords.join(", ") : undefined],
    ["property", "og:type", p.type],
    ["property", "og:site_name", BRAND],
    ["property", "og:locale", "vi_VN"],
    ["property", "og:url", url],
    ["property", "og:title", title],
    ["property", "og:description", p.description],
    ["property", "og:image", image],
    ["property", "og:image:alt", p.title],
    ["property", "article:published_time", p.type === "article" ? isoDate(p.published) : undefined],
    ["property", "article:modified_time", p.type === "article" ? isoDate(p.modified || p.published) : undefined],
    ["name", "twitter:card", "summary_large_image"],
    ["name", "twitter:url", url],
    ["name", "twitter:title", title],
    ["name", "twitter:description", p.description],
    ["name", "twitter:image", image],
  ];
  for (const [attr, key, value] of metas) if (value) html = setMeta(html, attr, key, value);
  // Ảnh riêng của bài không phải 1200×630 thì bỏ kích thước khai báo sẵn của ảnh trang chủ
  if (p.image) html = html.replace(/\s*<meta\s+property="og:image:(?:width|height)"[^>]*>/gi, "");

  const ld = p.jsonLd.map((o) => `    <script type="application/ld+json">${JSON.stringify(o).replace(/</g, "\\u003c")}</script>`).join("\n");
  if (ld) html = html.replace("</head>", `${ld}\n  </head>`);

  return html.replace(/<div id="root">\s*<\/div>/, `<div id="root">${p.body}</div>`);
}

/* ---------- khung HTML trong #root (tối giản, dùng chung lớp CSS của site) ---------- */

function crumbs(items: { name: string; href?: string }[]) {
  const links = items.map((c) => (c.href ? `<a href="${c.href}">${esc(c.name)}</a>` : `<span>${esc(c.name)}</span>`));
  return `<nav aria-label="Breadcrumb" class="text-sm text-gray-500">${links.join(" › ")}</nav>`;
}

const shell = (inner: string) =>
  `<main class="prerender" style="max-width:780px;margin:0 auto;padding:32px 16px 64px">${inner}</main>`;

function crumbLd(items: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: `${SITE}${c.href}` })),
  };
}

function articleLd(p: { title: string; description: string; route: string; published?: string; modified?: string; image?: string; tags?: string[] }) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: p.title,
    description: p.description,
    image: abs(p.image || DEFAULT_IMAGE),
    datePublished: isoDate(p.published),
    dateModified: isoDate(p.modified || p.published),
    inLanguage: "vi-VN",
    keywords: p.tags?.join(", "),
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}/${p.route}` },
    author: { "@type": "Person", name: "Đức Duy", url: `${SITE}/about` },
    publisher: { "@type": "Organization", name: BRAND, logo: { "@type": "ImageObject", url: `${SITE}/brand/duyweb-logo-1024.png` } },
  };
}

function relatedList(title: string, items: { href: string; title: string; summary: string }[]) {
  if (!items.length) return "";
  return `<aside style="margin-top:48px"><h2 class="font-display font-bold text-lg">${esc(title)}</h2><ul>${items
    .map((i) => `<li style="margin-top:12px"><a href="${i.href}"><strong>${esc(i.title)}</strong></a><br /><span class="text-sm text-gray-500">${esc(i.summary)}</span></li>`)
    .join("")}</ul></aside>`;
}

/* ---------- từng loại trang ---------- */

function blogPage(post: BlogEntry, all: BlogEntry[]): PageSpec {
  const route = `blog/${post.slug}`;
  const meta = [post.category, viDate(post.date), `${post.readingTime} đọc`].filter(Boolean).join(" · ");
  const related = all.filter((p) => p.slug !== post.slug).slice(0, 4).map((p) => ({ href: `/blog/${p.slug}`, title: p.title, summary: p.summary }));
  const trail = [{ name: "Trang chủ", href: "/" }, { name: "Blog", href: "/blog" }, { name: post.title, href: `/${route}` }];
  return {
    route,
    title: post.title,
    description: post.summary,
    keywords: post.tags,
    type: "article",
    image: post.image,
    published: post.date,
    modified: post.updated,
    jsonLd: [articleLd({ ...post, description: post.summary, route, published: post.date, modified: post.updated }), crumbLd(trail)],
    body: shell(
      crumbs([trail[0], trail[1], { name: post.title }]) +
        `<article><header style="margin-top:20px"><p class="text-xs text-gray-500">${esc(meta)}</p>` +
        `<h1 class="font-display font-extrabold text-3xl" style="margin-top:8px">${esc(post.title)}</h1>` +
        `<p class="text-gray-600" style="margin-top:12px">${esc(post.summary)}</p></header>` +
(post.image ? `<img src="${esc(post.image)}" alt="${esc(post.title)}" width="1200" height="630" style="width:100%;height:auto;margin-top:20px;border-radius:16px" />` : "") +
        `<div class="article-body" style="margin-top:24px">${markdownToHtml(post.content)}</div>` +
        (post.tags.length ? `<p class="text-xs text-gray-500" style="margin-top:24px">${post.tags.map((t) => `#${esc(t)}`).join(" ")}</p>` : "") +
        `</article>` +
        relatedList("Bài viết khác", related),
    ),
  };
}

function cafePage(a: CafeSoEntry, all: CafeSoEntry[]): PageSpec {
  const route = `cafe-so/${a.slug}`;
  const idx = all.findIndex((x) => x.slug === a.slug);
  const related = [...all.slice(idx + 1), ...all.slice(0, idx)].slice(0, 4).map((x) => ({ href: `/cafe-so/${x.slug}`, title: x.title, summary: x.summary }));
  const trail = [{ name: "Trang chủ", href: "/" }, { name: "Cafe Số", href: "/cafe-so" }, { name: a.title, href: `/${route}` }];
  return {
    route,
    title: a.title,
    description: a.summary,
    keywords: a.tags,
    type: "article",
    image: a.image,
    published: a.date,
    modified: a.updated,
    jsonLd: [articleLd({ ...a, description: a.summary, route, published: a.date, modified: a.updated }), crumbLd(trail)],
    body: shell(
      crumbs([trail[0], trail[1], { name: a.title }]) +
        `<article><header style="margin-top:20px"><p class="text-xs text-gray-500">${esc([a.category, `${a.readingTime} đọc`].join(" · "))}</p>` +
        `<h1 class="font-display font-extrabold text-3xl" style="margin-top:8px">${esc(a.title)}</h1>` +
        `<p class="text-gray-600" style="margin-top:12px">${esc(a.summary)}</p></header>` +
(a.image ? `<img src="${esc(a.image)}" alt="${esc(a.title)}" width="1200" height="630" style="width:100%;height:auto;margin-top:20px;border-radius:16px" />` : "") +
        (a.analogy ? `<div class="article-body" style="margin-top:20px"><blockquote><p><strong>Ví dụ đời thực:</strong> ${inline(a.analogy)}</p></blockquote></div>` : "") +
        `<div class="article-body" style="margin-top:24px">${markdownToHtml(a.content)}</div>` +
        `</article>` +
        relatedList("Đọc tiếp trong Cafe Số", related),
    ),
  };
}

function guideBlocks(g: Guide) {
  return g.blocks
    .map((b) => {
      const head = `<h2>${esc(b.title)}</h2>${b.lead ? `<p>${esc(b.lead)}</p>` : ""}`;
      switch (b.kind) {
        case "cards":
          return head + b.items.map((c) => `<h3>${esc(c.title)}</h3><p>${esc(c.detail)}</p>`).join("");
        case "violations":
          return head + b.groups.map((gr) => `<h3>${esc(gr.name)}</h3><p>${esc(gr.intro)}</p><ul>${gr.items
            .map((v) => `<li><strong>${esc(v.title)}</strong>. Ví dụ: ${esc(v.example)} Nên làm: ${esc(v.instead)} (Hậu quả: ${esc(v.penalty)})</li>`).join("")}</ul>`).join("");
        case "checklist":
          return head + `<ul>${b.items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>`;
        case "steps":
          return head + `<ol>${b.items.map((s) => `<li><strong>${esc(s.title)}</strong>: ${esc(s.detail)}</li>`).join("")}</ol>`;
        case "faq":
          return head + b.items.map((q) => `<h3>${esc(q.question)}</h3><p>${esc(q.answer)}</p>`).join("");
      }
    })
    .join("\n");
}

function guidePage(g: Guide): PageSpec {
  const route = `kien-thuc/${g.slug}`;
  const trail = [{ name: "Trang chủ", href: "/" }, { name: "Kiến thức", href: "/kien-thuc" }, { name: g.breadcrumb, href: `/${route}` }];
  const faq = g.blocks.find((b) => b.kind === "faq");
  const ld: object[] = [articleLd({ title: g.title, description: g.description, route, published: g.date, tags: g.keywords }), crumbLd(trail)];
  if (faq && faq.kind === "faq") {
    ld.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.items.map((q) => ({ "@type": "Question", name: q.question, acceptedAnswer: { "@type": "Answer", text: q.answer } })),
    });
  }
  return {
    route,
    title: g.title,
    description: g.description,
    keywords: g.keywords,
    type: "article",
    published: g.date,
    jsonLd: ld,
    body: shell(
      crumbs([trail[0], trail[1], { name: g.breadcrumb }]) +
        `<article><header style="margin-top:20px"><p class="text-xs text-gray-500">${esc(`${g.kicker} · Cập nhật ${g.updated} · ${g.readingTime} đọc`)}</p>` +
        `<h1 class="font-display font-extrabold text-3xl" style="margin-top:8px">${esc(g.title)}</h1>` +
        `<p class="text-gray-600" style="margin-top:12px">${esc(g.intro)}</p></header>` +
        `<div class="article-body" style="margin-top:24px">${guideBlocks(g)}<h2>${esc(g.closing.title)}</h2><p>${esc(g.closing.text)}</p></div>` +
        `</article>`,
    ),
  };
}

function listPage(route: string, title: string, description: string, heading: string, items: { href: string; title: string; summary: string; meta?: string }[]): PageSpec {
  const trail = [{ name: "Trang chủ", href: "/" }, { name: heading, href: `/${route}` }];
  return {
    route,
    title,
    description,
    type: "website",
    jsonLd: [
      crumbLd(trail),
      {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: heading,
        description,
        url: `${SITE}/${route}`,
        hasPart: items.map((i) => ({ "@type": "BlogPosting", headline: i.title, url: `${SITE}${i.href}` })),
      },
    ],
    body: shell(
      crumbs([trail[0], { name: heading }]) +
        `<h1 class="font-display font-extrabold text-3xl" style="margin-top:20px">${esc(heading)}</h1><p class="text-gray-600" style="margin-top:12px">${esc(description)}</p>` +
        `<ul style="margin-top:24px">${items
          .map((i) => `<li style="margin-top:18px">${i.meta ? `<span class="text-xs text-gray-500">${esc(i.meta)}</span><br />` : ""}<a href="${i.href}"><strong>${esc(i.title)}</strong></a><br /><span class="text-sm text-gray-600">${esc(i.summary)}</span></li>`)
          .join("")}</ul>`,
    ),
  };
}

/* ---------- sitemap ---------- */

function sitemap(staticXml: string, pages: PageSpec[]) {
  const generated = new Set(pages.map((p) => `${SITE}/${p.route}`));
  const blocks = staticXml.match(/<url>[\s\S]*?<\/url>/g) || [];
  // Bỏ các URL bài viết cũ ghi tay: danh sách bài giờ lấy từ content/ và guides
  const kept = blocks.filter((b) => {
    const loc = b.match(/<loc>([^<]+)<\/loc>/)?.[1] || "";
    return !generated.has(loc) && !/\/(blog|cafe-so|kien-thuc)\/[^/]+$/.test(loc);
  });
  const today = new Date().toISOString().slice(0, 10);
  const made = pages.map((p) => {
    const lastmod = isoDate(p.modified) || isoDate(p.published) || today;
    const priority = p.type === "article" ? "0.7" : "0.9";
    const freq = p.type === "article" ? "monthly" : "weekly";
    return `  <url>\n    <loc>${SITE}/${p.route}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${freq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
  });
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${kept.map((b) => "  " + b.trim()).join("\n")}\n  <!-- Bài viết và trang danh sách: tự sinh lúc build từ content/ và src/data/guides.ts -->\n${made.join("\n")}\n</urlset>\n`;
}

/* ---------- plugin ---------- */

function readDir(dir: string) {
  if (!fs.existsSync(dir)) return {};
  return Object.fromEntries(fs.readdirSync(dir).filter((f) => f.endsWith(".md")).map((f) => [f, fs.readFileSync(path.join(dir, f), "utf-8")]));
}

export default function staticPages(): Plugin {
  let config: ResolvedConfig;
  return {
    name: "static-pages",
    apply: "build",
    configResolved(c) {
      config = c;
    },
    closeBundle() {
      const outDir = path.resolve(config.root, config.build.outDir);
      const indexPath = path.join(outDir, "index.html");
      if (!fs.existsSync(indexPath)) return;
      const base = fs.readFileSync(indexPath, "utf-8");

      const blog = buildBlog(readDir(path.resolve(config.root, "content/blog")));
      const cafe = buildCafeSo(readDir(path.resolve(config.root, "content/cafe-so")));

      const pages: PageSpec[] = [
        listPage("blog", "Blog Chiến Lược & Tài Sản Số", "Bài chia sẻ về tối ưu SEO, xây dựng website và tư duy tích luỹ tài sản số lâu dài cho doanh nghiệp.", "Blog",
          blog.map((p) => ({ href: `/blog/${p.slug}`, title: p.title, summary: p.summary, meta: [p.category, viDate(p.date)].filter(Boolean).join(" · ") }))),
        ...blog.map((p) => blogPage(p, blog)),
        listPage("cafe-so", "Cafe Số - Hiểu web bằng ví dụ đời thường", "Giải mã website, hosting, tên miền, source code và SEO bằng các ví dụ đời thực dễ hiểu. Website là nền móng tài sản số.", "Cafe Số",
          cafe.map((a) => ({ href: `/cafe-so/${a.slug}`, title: a.title, summary: a.summary, meta: a.category }))),
        ...cafe.map((a) => cafePage(a, cafe)),
        listPage("kien-thuc", "Kiến thức web cho chủ doanh nghiệp", "Thư viện bài viết giải thích website, tên miền, hosting, SEO, Google Maps bằng lời dễ hiểu, giúp chủ doanh nghiệp tự quyết định đúng mà không cần biết code.", "Kiến thức",
          [
            ...guides.map((g) => ({ href: `/kien-thuc/${g.slug}`, title: g.title, summary: g.summary, meta: "Cẩm nang" })),
            ...cafe.map((a) => ({ href: `/cafe-so/${a.slug}`, title: a.title, summary: a.summary, meta: "Cafe Số" })),
            ...blog.map((p) => ({ href: `/blog/${p.slug}`, title: p.title, summary: p.summary, meta: "Blog" })),
          ]),
        ...guides.map(guidePage),
      ];

      for (const p of pages) {
        const file = path.join(outDir, `${p.route}.html`);
        fs.mkdirSync(path.dirname(file), { recursive: true });
        fs.writeFileSync(file, renderPage(base, p));
      }

      const staticSitemap = path.resolve(config.root, "public/sitemap.xml");
      if (fs.existsSync(staticSitemap)) {
        fs.writeFileSync(path.join(outDir, "sitemap.xml"), sitemap(fs.readFileSync(staticSitemap, "utf-8"), pages));
      }
      config.logger.info(`  trang tĩnh cho SEO: ${pages.length} trang (${blog.length} blog, ${cafe.length} cafe số, ${guides.length} cẩm nang) + sitemap.xml`);
    },
  };
}
