// Làm ảnh cho bài viết theo bộ nhận diện Duy Web (đen + đỏ), vẽ bằng Edge/Chrome chạy ẩn.
//
//   node scripts/blog-image.mjs cover <slug> "Tiêu đề bài" [--kicker "Cafe Số"]
//       → public/blog-images/<slug>/cover.png (1200×630): ảnh bìa đầu bài + ảnh chia sẻ Zalo/Facebook
//   node scripts/blog-image.mjs quote <slug> <tên-file> "Câu trích dẫn" [--by "Đức Duy"]
//       → public/blog-images/<slug>/<tên-file>.png (1200×630): thẻ câu chốt để chèn giữa bài
//
// In ra đường dẫn công khai (vd /blog-images/<slug>/cover.png) để dán vào bài.
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const [kind, slug, ...rest] = process.argv.slice(2);
const flag = (name) => {
  const i = rest.indexOf(`--${name}`);
  return i >= 0 ? rest.splice(i, 2)[1] : undefined;
};
const kicker = flag("kicker") || "Blog";
const by = flag("by") || "Đức Duy · duyweb.info.vn";

if (!["cover", "quote"].includes(kind) || !slug || !/^[a-z0-9-]+$/.test(slug)) {
  console.error('Cách dùng:\n  node scripts/blog-image.mjs cover <slug> "Tiêu đề" [--kicker "Cafe Số"]\n  node scripts/blog-image.mjs quote <slug> <tên-file> "Câu trích dẫn" [--by "Tên"]');
  process.exit(1);
}
const name = kind === "cover" ? "cover" : rest.shift();
const text = rest.join(" ").trim();
if (!text || !/^[a-z0-9-]+$/.test(name || "")) {
  console.error("Thiếu nội dung chữ, hoặc tên file chỉ được dùng chữ thường không dấu, số và dấu -");
  process.exit(1);
}

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const mark = fs.readFileSync(path.join(root, "public/brand/duyweb-mark-red-bright.svg"), "utf8");

// Cỡ chữ tự co theo độ dài để tiêu đề dài vẫn nằm gọn trong 3–4 dòng
const len = [...text].length;
const coverSize = len <= 40 ? 76 : len <= 64 ? 64 : len <= 90 ? 54 : 46;
const quoteSize = len <= 60 ? 58 : len <= 100 ? 48 : len <= 150 ? 40 : 34;

const css = `
*{box-sizing:border-box;margin:0}
html,body{width:1200px;height:630px;overflow:hidden}
body{font-family:"Be Vietnam Pro",sans-serif;color:#fff;-webkit-font-smoothing:antialiased;
  background:radial-gradient(70% 90% at 82% 50%,rgba(188,2,2,.55),transparent 70%),
    linear-gradient(rgba(255,255,255,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.04) 1px,transparent 1px),#000;
  background-size:auto,40px 40px,40px 40px,auto}
.ghost{position:absolute;right:-90px;top:50%;transform:translateY(-50%);width:560px;opacity:.16}
.ghost svg{width:100%;height:auto}
.lines i{position:absolute;right:0;height:2px;width:520px;background:linear-gradient(90deg,transparent,rgba(255,0,0,.8))}
.wrap{position:absolute;inset:0;padding:72px 84px;display:flex;flex-direction:column}
.top{display:flex;align-items:center;gap:16px}
.top svg{width:52px;height:52px}
.brand{font-weight:800;font-size:30px;letter-spacing:-.01em}.brand b{color:#FF0000}
.kicker{margin-left:auto;border:2px solid rgba(255,0,0,.7);border-radius:999px;padding:8px 20px;font-size:20px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:#ffdede}
.foot{margin-top:auto;display:flex;align-items:center;gap:12px;font-size:22px;color:rgba(255,255,255,.7);font-weight:500}
.foot i{width:10px;height:10px;border-radius:50%;background:#FF0000}
`;

const body =
  kind === "cover"
    ? `<h1 style="margin-top:auto;font-weight:800;font-size:${coverSize}px;line-height:1.18;letter-spacing:-.015em;max-width:960px;text-wrap:balance">${esc(text)}</h1>
       <div class="foot" style="margin-top:36px"><i></i>duyweb.info.vn · Chuyện web cho chủ doanh nghiệp</div>`
    : `<div style="margin-top:auto;font-size:150px;line-height:.6;color:#FF0000;font-weight:800">“</div>
       <p style="margin-top:18px;font-weight:700;font-size:${quoteSize}px;line-height:1.32;max-width:980px;text-wrap:balance">${esc(text)}</p>
       <div class="foot" style="margin-top:32px"><i></i>${esc(by)}</div>`;

const html = `<!doctype html><html lang="vi"><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@500;600;700;800&display=swap" rel="stylesheet">
<style>${css}</style></head><body>
<div class="ghost">${mark}</div>
<div class="lines"><i style="top:24%"></i><i style="top:52%;width:380px"></i><i style="top:78%"></i></div>
<div class="wrap"><div class="top">${mark}<span class="brand">Duy <b>Web</b></span><span class="kicker">${esc(kind === "cover" ? kicker : "Điều cần nhớ")}</span></div>${body}</div>
</body></html>`;

const browsers = [
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
];
const browser = browsers.find((b) => fs.existsSync(b));
if (!browser) {
  console.error("Không tìm thấy Edge hoặc Chrome để vẽ ảnh");
  process.exit(1);
}

const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "duyweb-img-"));
const htmlFile = path.join(tmpDir, "page.html");
fs.writeFileSync(htmlFile, html);
const outDir = path.join(root, "public/blog-images", slug);
fs.mkdirSync(outDir, { recursive: true });
const outFile = path.join(outDir, `${name}.png`);

const r = spawnSync(browser, [
  "--headless=new", "--disable-gpu", "--hide-scrollbars", "--force-device-scale-factor=1",
  "--virtual-time-budget=6000", `--user-data-dir=${path.join(tmpDir, "profile")}`,
  "--window-size=1200,630", `--screenshot=${outFile}`, pathToFileURL(htmlFile).href,
], { stdio: "ignore", timeout: 60000 });

// Edge trả về trước khi ghi xong ảnh: đợi file xuất hiện và ngừng lớn lên (tối đa 30 giây)
const sleep = (ms) => Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
let last = -1;
for (let waited = 0; waited < 30000; waited += 250) {
  const size = fs.existsSync(outFile) ? fs.statSync(outFile).size : -1;
  if (size > 0 && size === last) break;
  last = size;
  sleep(250);
}
try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch { /* Edge còn giữ hồ sơ tạm: bỏ qua */ }

if (r.status !== 0 || !fs.existsSync(outFile)) {
  console.error("Vẽ ảnh lỗi");
  process.exit(1);
}
console.log(`/blog-images/${slug}/${name}.png  (${Math.round(fs.statSync(outFile).size / 1024)} KB)`);
