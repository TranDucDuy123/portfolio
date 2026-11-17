// Cắt ảnh màn hình từ clip hướng dẫn theo ghi chú giây, để bài viết có ảnh từng bước, người đọc khỏi tua video.
//
//   node scripts/video-frames.mjs <slug> <clip.mp4> <ghi-chu.txt> [--youtube <id>]
//       → public/blog-images/<slug>/<tên>.jpg, in ra đoạn Markdown để dán vào bài
//
// Ghi chú: mỗi dòng một ảnh, các phần cách nhau bằng "|". Dòng trống hoặc bắt đầu "#" bị bỏ qua.
//   giây | tên-ảnh | chú thích | che=x,y,r,c; x,y,r,c   (tên-ảnh, chú thích, che: không bắt buộc)
//   0:12 | fb-1 | Vào trang cá nhân, bấm nút ba chấm
//   1:05.5 | sp-3 | Điền thông tin cá nhân | che=10,30,80,8
// Giây viết 45, 1:05, 1:05.5 hoặc 1:02:03. Thiếu tên thì đặt buoc-1, buoc-2…
// "che" làm mờ vùng chữ nhật theo % khung hình: x, y (góc trên trái), rộng, cao. Dùng che tên, SĐT, số tài khoản…
// --youtube <id>: thêm dưới mỗi ảnh link mở video YouTube đúng giây đó.
//
// Cần ffmpeg trong PATH. Ảnh ngang rộng tối đa 1600px, ảnh dọc (quay màn hình điện thoại) cao tối đa 1280px.
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const yi = args.indexOf("--youtube");
const youtube = yi >= 0 ? args.splice(yi, 2)[1] : "";
const [slug, video, notesFile] = args;

const usage = "Cách dùng: node scripts/video-frames.mjs <slug> <clip.mp4> <ghi-chu.txt> [--youtube <id>]";
if (!slug || !/^[a-z0-9-]+$/.test(slug) || !video || !notesFile) { console.error(usage); process.exit(1); }
for (const f of [video, notesFile]) if (!fs.existsSync(f)) { console.error("Không thấy file: " + f); process.exit(1); }
if (youtube && !/^[\w-]{6,20}$/.test(youtube)) { console.error("ID YouTube không hợp lệ: " + youtube); process.exit(1); }

const toSeconds = (t) => t.split(":").reduce((acc, p) => acc * 60 + Number(p), 0);
const label = (s) => {
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = Math.floor(s % 60);
  return (h ? `${h}:${String(m).padStart(2, "0")}` : `${m}`) + `:${String(sec).padStart(2, "0")}`;
};

const items = [];
let auto = 0;
for (const [n, raw] of fs.readFileSync(notesFile, "utf8").split(/\r?\n/).entries()) {
  const line = raw.trim();
  if (!line || line.startsWith("#")) continue;
  const parts = line.split("|").map((p) => p.trim());
  const time = parts[0];
  if (!/^\d+(:\d{1,2}){0,2}(\.\d+)?$/.test(time)) { console.error(`Dòng ${n + 1}: giây không đúng dạng (vd 1:05): ${line}`); process.exit(1); }
  const rest = parts.slice(1);
  const cheIdx = rest.findIndex((p) => p.startsWith("che="));
  const che = cheIdx >= 0 ? rest.splice(cheIdx, 1)[0].slice(4) : "";
  let [name = "", caption = ""] = rest;
  if (name && !/^[a-z0-9-]+$/.test(name)) { caption = caption || name; name = ""; } // phần 2 là chú thích chứ không phải tên
  if (!name) name = `buoc-${++auto}`;
  const boxes = che ? che.split(";").map((b) => b.split(",").map(Number)) : [];
  if (boxes.some((b) => b.length !== 4 || b.some((v) => !(v >= 0 && v <= 100)))) {
    console.error(`Dòng ${n + 1}: "che" cần 4 số phần trăm x,y,rộng,cao: ${line}`); process.exit(1);
  }
  items.push({ seconds: toSeconds(time), name, caption, boxes });
}
if (!items.length) { console.error("Ghi chú không có dòng nào."); process.exit(1); }
const dup = items.map((i) => i.name).find((v, i, a) => a.indexOf(v) !== i);
if (dup) { console.error("Trùng tên ảnh: " + dup); process.exit(1); }

const outDir = path.join(root, "public/blog-images", slug);
fs.mkdirSync(outDir, { recursive: true });

// Ảnh ngang: rộng ≤ 1600; ảnh dọc: cao ≤ 1280. Kích thước luôn chẵn.
const SCALE = "scale='if(gte(iw,ih),min(1600,iw),trunc(min(1280,ih)*iw/ih/2)*2)':'if(gte(iw,ih),trunc(min(1600,iw)*ih/iw/2)*2,min(1280,ih))'";

const md = [];
for (const it of items) {
  const out = path.join(outDir, `${it.name}.jpg`);
  let graph = `[0:v]${SCALE}[v0]`;
  it.boxes.forEach(([x, y, w, h], k) => {
    const [fx, fy, fw, fh] = [x, y, w, h].map((v) => (v / 100).toFixed(4));
    graph += `;[v${k}]split[a${k}][b${k}];[b${k}]crop=iw*${fw}:ih*${fh}:iw*${fx}:ih*${fy},boxblur=lr='min(25,min(w,h)/2-1)':lp=3:cr='min(12,min(cw,ch)/2-1)':cp=3[m${k}];[a${k}][m${k}]overlay=main_w*${fx}:main_h*${fy}[v${k + 1}]`;
  });
  const r = spawnSync("ffmpeg", [
    "-hide_banner", "-loglevel", "error", "-y",
    "-ss", String(it.seconds), "-i", path.resolve(video),
    "-filter_complex", graph, "-map", `[v${it.boxes.length}]`,
    "-frames:v", "1", "-q:v", "3", out,
  ], { encoding: "utf8" });
  if (r.error) { console.error("Không chạy được ffmpeg. Cài ffmpeg và thêm vào PATH."); process.exit(1); }
  if (r.status !== 0 || !fs.existsSync(out)) { console.error(`Cắt ảnh ${it.name} (${label(it.seconds)}) lỗi:\n${r.stderr}`); process.exit(1); }

  const kb = Math.round(fs.statSync(out).size / 1024);
  console.error(`${label(it.seconds).padStart(7)}  /blog-images/${slug}/${it.name}.jpg  ${kb} KB${it.boxes.length ? `  (che ${it.boxes.length} vùng)` : ""}`);
  const cap = (it.caption || it.name).replace(/[[\]"]/g, "");
  md.push(`![${cap}](/blog-images/${slug}/${it.name}.jpg "${cap}")`);
  if (youtube) md.push(`[▶ Xem đoạn này trong video (${label(it.seconds)})](https://www.youtube.com/watch?v=${youtube}&t=${Math.floor(it.seconds)}s)`);
  md.push("");
}

// Markdown ra stdout để dán vào bài; danh sách file ở trên đi ra stderr
console.log(md.join("\n").trim());
