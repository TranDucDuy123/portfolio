// Đọc phần đầu file Markdown (giữa hai dòng ---): mỗi dòng "khoá: giá trị".
// Giá trị là chuỗi trong ngoặc kép, mảng ["a", "b"], số, true/false, hoặc chữ thường không ngoặc.
// Dùng chung cho trang (trình duyệt) và bước sinh HTML lúc build (Node), nên không phụ thuộc thư viện ngoài.

export interface ParsedMarkdown {
  data: Record<string, unknown>;
  body: string;
}

function parseValue(raw: string): unknown {
  const v = raw.trim();
  if (v === "") return "";
  if (v === "true") return true;
  if (v === "false") return false;
  if (/^-?\d+(\.\d+)?$/.test(v)) return Number(v);
  if (v.startsWith("[") || v.startsWith('"')) {
    try {
      return JSON.parse(v);
    } catch {
      // Mảng viết tay kiểu [a, b] không có ngoặc kép
      if (v.startsWith("[")) return v.slice(1, -1).split(",").map((s) => s.trim().replace(/^["']|["']$/g, "")).filter(Boolean);
    }
  }
  return v.replace(/^'(.*)'$/, "$1");
}

export function parseFrontmatter(source: string): ParsedMarkdown {
  const text = source.replace(/^﻿/, "").replace(/\r\n/g, "\n");
  const m = text.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!m) return { data: {}, body: text.trim() };
  const data: Record<string, unknown> = {};
  for (const line of m[1].split("\n")) {
    const kv = line.match(/^([A-Za-z][\w-]*)\s*:\s*(.*)$/);
    if (kv) data[kv[1]] = parseValue(kv[2]);
  }
  return { data, body: text.slice(m[0].length).trim() };
}
