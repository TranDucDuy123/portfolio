import type { KnowledgeTopic } from "./knowledge";

// Khung dữ liệu chung cho các trang cẩm nang tại /kien-thuc/<slug>.
// Mỗi cẩm nang là một danh sách khối (block); GuidePage tự dựng giao diện theo loại khối.

export type GuideIcon = "shield" | "alert" | "check" | "life" | "users" | "calendar" | "faq" | "bot";

// Nhãn nằm trên thẻ: tên nền tảng hoặc loại nội dung. ALWAYS_TAG luôn hiện khi lọc theo nhãn khác.
export const ALWAYS_TAG = "Cả hai";

export interface GuideCard {
  title: string;
  detail: string;
  tag?: string;
}

export interface GuideViolation {
  title: string;
  example: string; // Ví dụ thật hay gặp
  instead: string; // Làm gì thay thế
  penalty: string; // Mức phạt thường gặp
  tag?: string;
}

interface BlockBase {
  id: string; // Neo cho mục lục
  nav: string; // Tên ngắn trong mục lục
  title: string;
  lead?: string;
  icon?: GuideIcon;
}

export type GuideBlock =
  | (BlockBase & { kind: "cards"; items: GuideCard[] })
  | (BlockBase & { kind: "violations"; filter?: boolean; groups: { name: string; intro: string; items: GuideViolation[] }[] })
  | (BlockBase & { kind: "checklist"; items: string[]; doneMessage: string })
  | (BlockBase & { kind: "steps"; items: { title: string; detail: string }[] })
  | (BlockBase & { kind: "faq"; items: { question: string; answer: string }[] });

export interface Guide {
  slug: string;
  kicker: string;
  title: string; // H1 và tiêu đề trang
  summary: string; // Dùng cho thẻ trong thư viện Kiến thức
  description: string; // Meta description
  keywords: string[];
  intro: string;
  breadcrumb: string;
  updated: string; // Ghi dạng hiển thị, vd "27/10/2026"
  date: string; // ISO, cho schema
  readingTime: string;
  topic?: KnowledgeTopic; // Chủ đề trong thư viện Kiến thức, mặc định "Chọn kênh"
  blocks: GuideBlock[];
  closing: { title: string; text: string; links: { label: string; href: string }[]; zaloLabel?: string };
  sources: { label: string; href: string }[];
  sourcesNote?: string; // Câu dẫn trước danh sách nguồn, mặc định nói về chính sách nền tảng
}
