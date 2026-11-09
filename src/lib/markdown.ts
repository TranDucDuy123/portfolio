// Chuyển Markdown của bài viết sang HTML. Dùng chung cho trang React và bước sinh HTML lúc build,
// nên chữ khách đọc và chữ Google đọc là một. Hỗ trợ đủ những gì bài đang dùng:
// tiêu đề #..######, đoạn văn, **đậm**, *nghiêng*, `code`, [link](url), ![ảnh](url "chú thích"),
// danh sách gạch đầu dòng / đánh số (lồng nhau theo thụt lề), trích dẫn >, bảng |, đường kẻ ---.
// Nội dung do chủ site viết trong repo; vẫn thoát ký tự HTML để chữ < > không làm vỡ trang.

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const safeUrl = (u: string) => (/^(https?:|mailto:|tel:|\/|#)/i.test(u.trim()) ? u.trim() : "#");

export function inline(text: string): string {
  const codes: string[] = [];
  let s = text.replace(/`([^`]+)`/g, (_, c) => `\u0000${codes.push(escapeHtml(c)) - 1}\u0000`);
  s = escapeHtml(s);
  s = s.replace(/!\[([^\]]*)\]\(([^)\s]+)(?:\s+&quot;([^&]*)&quot;)?\)/g, (_, alt, url, title) =>
    `<img src="${safeUrl(url)}" alt="${alt}" loading="lazy"${title ? ` title="${title}"` : ""} />`);
  s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, label, url) => {
    const href = safeUrl(url);
    const ext = /^https?:/i.test(href) && !/duyweb\.info\.vn/i.test(href);
    return `<a href="${href}"${ext ? ' target="_blank" rel="noopener noreferrer"' : ""}>${label}</a>`;
  });
  s = s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  s = s.replace(/(^|[^*])\*([^*\s][^*]*?)\*(?!\*)/g, "$1<em>$2</em>");
  return s.replace(/\u0000(\d+)\u0000/g, (_, i) => `<code>${codes[Number(i)]}</code>`);
}

const LIST_RE = /^(\s*)([*+-]|\d+[.)])\s+(.*)$/;
const indentOf = (line: string) => line.match(/^\s*/)![0].replace(/\t/g, "  ").length;

function renderList(lines: string[], start: number, baseIndent: number): [string, number] {
  const first = lines[start].match(LIST_RE)!;
  const ordered = /\d/.test(first[2]);
  const items: string[] = [];
  let i = start;
  while (i < lines.length) {
    const m = lines[i].match(LIST_RE);
    if (!m || indentOf(lines[i]) !== baseIndent) break;
    let html = inline(m[3]);
    i++;
    // Dòng tiếp theo thụt sâu hơn: danh sách con, hoặc chữ nối tiếp của mục này
    while (i < lines.length && lines[i].trim() && indentOf(lines[i]) > baseIndent) {
      if (LIST_RE.test(lines[i])) {
        const [sub, next] = renderList(lines, i, indentOf(lines[i]));
        html += sub;
        i = next;
      } else {
        html += " " + inline(lines[i].trim());
        i++;
      }
    }
    items.push(`<li>${html}</li>`);
    while (i < lines.length && !lines[i].trim() && lines[i + 1] && LIST_RE.test(lines[i + 1]) && indentOf(lines[i + 1]) >= baseIndent) i++;
  }
  const tag = ordered ? "ol" : "ul";
  return [`<${tag}>${items.join("")}</${tag}>`, i];
}

function renderTable(rows: string[]): string {
  const cells = (r: string) => r.trim().replace(/^\||\|$/g, "").split("|").map((c) => c.trim());
  const head = cells(rows[0]);
  const body = rows.slice(rows[1] && /^[\s|:-]+$/.test(rows[1]) ? 2 : 1);
  return (
    `<div class="md-table"><table><thead><tr>${head.map((c) => `<th>${inline(c)}</th>`).join("")}</tr></thead>` +
    `<tbody>${body.map((r) => `<tr>${cells(r).map((c) => `<td>${inline(c)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`
  );
}

// Neo cho tiêu đề mục: bỏ dấu tiếng Việt, chữ thường, nối bằng "-"; trùng thì thêm -2, -3…
function slugify(text: string) {
  return text
    .replace(/[*_`[\]()]/g, "")
    .normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D")
    .toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60) || "muc";
}

function makeIds() {
  const used = new Map<string, number>();
  return (text: string) => {
    const base = slugify(text);
    const n = (used.get(base) || 0) + 1;
    used.set(base, n);
    return n === 1 ? base : `${base}-${n}`;
  };
}

export interface MdHeading {
  level: number;
  text: string;
  id: string;
}

// Danh sách mục lớn của bài (## và ###, hoặc ### và #### với bài cũ) để dựng mục lục; id khớp với markdownToHtml
export function headingsOf(md: string): MdHeading[] {
  const nextId = makeIds();
  const all = md.replace(/\r\n/g, "\n").split("\n")
    .map((l) => l.match(/^(#{1,6})\s+(.*)$/))
    .filter((m): m is RegExpMatchArray => !!m)
    .map((m) => ({ level: m[1].length, text: m[2].replace(/[*_`]/g, "").trim(), id: nextId(m[2].trim()) }));
  const top = Math.min(...all.map((h) => h.level));
  return all.filter((h) => h.level <= top + 1);
}

export function markdownToHtml(md: string, nextId = makeIds()): string {
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  const out: string[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) { i++; continue; }

    const h = line.match(/^(#{1,6})\s+(.*)$/);
    if (h) { out.push(`<h${h[1].length} id="${nextId(h[2].trim())}">${inline(h[2].trim())}</h${h[1].length}>`); i++; continue; }

    if (/^\s*(-{3,}|\*{3,})\s*$/.test(line)) { out.push("<hr />"); i++; continue; }

    if (/^\s*>/.test(line)) {
      const quote: string[] = [];
      while (i < lines.length && /^\s*>/.test(lines[i])) quote.push(lines[i++].replace(/^\s*>\s?/, ""));
      out.push(`<blockquote>${markdownToHtml(quote.join("\n"), nextId)}</blockquote>`);
      continue;
    }

    if (/^\s*\|/.test(line)) {
      const rows: string[] = [];
      while (i < lines.length && /^\s*\|/.test(lines[i])) rows.push(lines[i++]);
      out.push(renderTable(rows));
      continue;
    }

    if (LIST_RE.test(line)) {
      const [html, next] = renderList(lines, i, indentOf(line));
      out.push(html);
      i = next;
      continue;
    }

    const para: string[] = [];
    while (i < lines.length && lines[i].trim() && !/^(#{1,6})\s|^\s*>|^\s*\||^\s*(-{3,}|\*{3,})\s*$/.test(lines[i]) && !LIST_RE.test(lines[i])) {
      para.push(lines[i++].trim());
    }
    out.push(`<p>${inline(para.join(" "))}</p>`);
  }
  return out.join("\n");
}

// Chữ thuần để tìm kiếm, mô tả ngắn: bỏ ký hiệu Markdown
export function markdownToText(md: string): string {
  return md
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[#>*`|_]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
