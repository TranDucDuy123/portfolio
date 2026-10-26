import { cafeSoArticles } from "./cafeSo";
import { blogPosts } from "./blog";

// Gộp Cafe Số và Blog thành một thư viện kiến thức chung theo chủ đề chủ doanh nghiệp hay hỏi
export type KnowledgeTopic = "Hiểu cơ bản" | "Chọn kênh" | "Để khách tìm thấy" | "Chiến lược & chốt khách";

export interface KnowledgeItem {
  slug: string;
  title: string;
  summary: string;
  topic: KnowledgeTopic;
  source: "Cafe Số" | "Blog";
  href: string;
  readingTime: string;
  date?: string;
}

export const knowledgeTopics: KnowledgeTopic[] = ["Hiểu cơ bản", "Chọn kênh", "Để khách tìm thấy", "Chiến lược & chốt khách"];

const cafeSoTopic: Record<string, KnowledgeTopic> = {
  "Cơ bản": "Hiểu cơ bản",
  "Hạ tầng": "Hiểu cơ bản",
  "So sánh": "Chọn kênh",
  "Tiếp thị": "Để khách tìm thấy",
  "Chiến lược": "Chiến lược & chốt khách"
};

const blogTopic: Record<string, KnowledgeTopic> = {
  "SEO": "Để khách tìm thấy",
  "Website": "Chọn kênh"
};

export const knowledgeItems: KnowledgeItem[] = [
  ...cafeSoArticles.map((a) => ({
    slug: a.slug,
    title: a.title,
    summary: a.summary,
    topic: cafeSoTopic[a.category] ?? "Hiểu cơ bản",
    source: "Cafe Số" as const,
    href: `/cafe-so/${a.slug}`,
    readingTime: a.readingTime
  })),
  ...blogPosts.map((p) => ({
    slug: p.slug,
    title: p.title,
    summary: p.summary,
    topic: blogTopic[p.category] ?? "Chiến lược & chốt khách",
    source: "Blog" as const,
    href: `/blog/${p.slug}`,
    readingTime: p.readingTime,
    date: p.date
  }))
];

// Lộ trình đọc cho người mới: hiểu website là gì → vì sao không chỉ dựa Facebook → làm xong web rồi thì sao
export const startHereSlugs = [
  "website-la-gi",
  "website-khac-facebook-the-nao",
  "website-va-seo-khong-chi-la-lam-xong-roi-cho-khach"
];

export const startHereItems = startHereSlugs
  .map((slug) => knowledgeItems.find((item) => item.slug === slug))
  .filter((item): item is KnowledgeItem => Boolean(item));
