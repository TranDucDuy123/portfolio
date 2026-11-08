// Dựng danh sách bài từ file Markdown trong content/. Trang React (qua import.meta.glob) và
// bước sinh HTML lúc build (qua fs) cùng gọi các hàm này, nên thứ tự và dữ liệu luôn khớp nhau.
import type { BlogPost, CafeSoArticle } from "../types";
import { parseFrontmatter } from "./frontmatter";

const slugOf = (file: string) => file.split(/[\\/]/).pop()!.replace(/\.md$/, "");
const str = (v: unknown, fallback = "") => (typeof v === "string" ? v : v == null ? fallback : String(v));
const list = (v: unknown) => (Array.isArray(v) ? v.map(String) : typeof v === "string" && v ? v.split(",").map((s) => s.trim()) : []);

export interface WithSeo {
  /** Ảnh chia sẻ riêng của bài (đường dẫn trong public/ hoặc URL đầy đủ) */
  image?: string;
  /** Ngày sửa gần nhất, YYYY-MM-DD */
  updated?: string;
  /** true: chưa đăng, không hiện trên site và không vào sitemap */
  draft?: boolean;
}

export type BlogEntry = BlogPost & WithSeo;
export type CafeSoEntry = CafeSoArticle & WithSeo & { order: number; date?: string };

export function toBlogPost(file: string, raw: string): BlogEntry {
  const { data, body } = parseFrontmatter(raw);
  const slug = slugOf(file);
  return {
    id: str(data.id, slug),
    slug,
    title: str(data.title, slug),
    category: str(data.category, "Website") as BlogPost["category"],
    summary: str(data.summary),
    content: body,
    tags: list(data.tags),
    date: str(data.date),
    readingTime: str(data.readingTime, readingTime(body)),
    popular: data.popular === true,
    image: data.image ? str(data.image) : undefined,
    updated: data.updated ? str(data.updated) : undefined,
    draft: data.draft === true,
  };
}

export function toCafeSoArticle(file: string, raw: string): CafeSoEntry {
  const { data, body } = parseFrontmatter(raw);
  const slug = slugOf(file);
  return {
    id: str(data.id, slug),
    slug,
    title: str(data.title, slug),
    analogy: str(data.analogy),
    summary: str(data.summary),
    content: body,
    category: str(data.category, "Cơ bản"),
    tags: list(data.tags),
    readingTime: str(data.readingTime, readingTime(body)),
    order: typeof data.order === "number" ? data.order : 999,
    date: data.date ? str(data.date) : undefined,
    image: data.image ? str(data.image) : undefined,
    updated: data.updated ? str(data.updated) : undefined,
    draft: data.draft === true,
  };
}

// Blog: bài mới nhất lên đầu. Cafe Số: theo số thứ tự "order" (bài nền tảng đọc trước)
export const sortBlog = (a: BlogEntry, b: BlogEntry) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title, "vi");
export const sortCafeSo = (a: CafeSoEntry, b: CafeSoEntry) => a.order - b.order || a.title.localeCompare(b.title, "vi");

export function buildBlog(files: Record<string, string>) {
  return Object.entries(files).map(([f, raw]) => toBlogPost(f, raw)).filter((p) => !p.draft).sort(sortBlog);
}
export function buildCafeSo(files: Record<string, string>) {
  return Object.entries(files).map(([f, raw]) => toCafeSoArticle(f, raw)).filter((p) => !p.draft).sort(sortCafeSo);
}

// Không ghi readingTime thì tự ước: khoảng 220 chữ mỗi phút
export function readingTime(body: string) {
  const words = body.split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 220))} phút`;
}
