// Bài Blog nằm trong content/blog/<slug>.md (xem content/README.md). File này chỉ gom lại.
import { buildBlog } from "../lib/content";

const files = import.meta.glob("/content/blog/*.md", { query: "?raw", import: "default", eager: true }) as Record<string, string>;

export const blogPosts = buildBlog(files);
