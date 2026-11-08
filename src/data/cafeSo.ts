// Bài Cafe Số nằm trong content/cafe-so/<slug>.md (xem content/README.md). File này chỉ gom lại.
import { buildCafeSo } from "../lib/content";

const files = import.meta.glob("/content/cafe-so/*.md", { query: "?raw", import: "default", eager: true }) as Record<string, string>;

export const cafeSoArticles = buildCafeSo(files);
