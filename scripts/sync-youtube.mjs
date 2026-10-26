// Đồng bộ video từ kênh YouTube @ducduyweb về src/data/youtube-videos.json.
//
//   npm run sync-youtube        → chạy tay khi vừa đăng clip mới
//   (tự chạy trước npm run build, nên mỗi lần deploy Vercel là có video mới)
//
// Nguồn: RSS công khai của kênh (không cần API key), chỉ trả 15 video mới nhất.
// Video cũ đã lưu trong JSON được giữ lại, video có trong RSS thì cập nhật tiêu đề, mô tả, ảnh.
// Lỗi mạng thì giữ nguyên file cũ và thoát êm, không làm hỏng build.
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const CHANNEL_ID = "UCKMBiHLM7Xn4IanvgVNWhMQ"; // @ducduyweb
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outFile = path.join(root, "src", "data", "youtube-videos.json");

const decode = (s = "") =>
  s
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .trim();

function parseFeed(xml) {
  return xml
    .split("<entry>")
    .slice(1)
    .map((entry) => {
      const tag = (name) => (entry.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`)) || [])[1];
      const link = (entry.match(/<link rel="alternate" href="([^"]+)"/) || [])[1] || "";
      const id = tag("yt:videoId");
      return {
        id,
        title: decode(tag("title")),
        description: decode(tag("media:description")),
        published: tag("published"),
        updated: tag("updated"),
        isShort: link.includes("/shorts/"),
        thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
      };
    })
    .filter((v) => v.id);
}

let saved = [];
try {
  saved = JSON.parse(fs.readFileSync(outFile, "utf-8"));
} catch {
  /* chưa có file: tạo mới */
}

let fresh;
try {
  const res = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  fresh = parseFeed(await res.text());
} catch (e) {
  console.warn(`sync-youtube: không tải được RSS (${e.message}), giữ nguyên ${saved.length} video đã lưu.`);
  process.exit(0);
}

const byId = new Map(saved.map((v) => [v.id, v]));
for (const v of fresh) byId.set(v.id, { ...byId.get(v.id), ...v });
const videos = [...byId.values()].sort((a, b) => b.published.localeCompare(a.published));

const before = JSON.stringify(saved);
const after = JSON.stringify(videos);
if (before !== after) {
  fs.writeFileSync(outFile, JSON.stringify(videos, null, 2) + "\n");
  const added = videos.length - saved.length;
  console.log(`sync-youtube: ${videos.length} video (${added > 0 ? `+${added} mới` : "cập nhật nội dung"}).`);
} else {
  console.log(`sync-youtube: không có gì mới (${videos.length} video).`);
}
