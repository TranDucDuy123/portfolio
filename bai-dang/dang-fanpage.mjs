// Đăng một bài nhiều ảnh lên Fanpage qua Facebook Graph API.
// Token đọc từ biến môi trường FB_PAGE_TOKEN (Page access token, quyền pages_manage_posts),
// không ghi vào file, không in ra màn hình.
//
// Cách chạy (PowerShell):
//   $env:FB_PAGE_TOKEN = "<dán token vào đây>"
//   node bai-dang/dang-fanpage.mjs bai-dang/nasani            # chạy thử: chỉ kiểm tra Trang + ảnh
//   node bai-dang/dang-fanpage.mjs bai-dang/nasani --dang     # đăng thật
//
// Thư mục bài cần có: bai-viet.txt (nội dung) và các ảnh *.png / *.jpg (đăng theo thứ tự tên file).

import { readdir, readFile } from "node:fs/promises";
import { openAsBlob } from "node:fs";
import path from "node:path";

const API = "https://graph.facebook.com/v21.0";
const token = process.env.FB_PAGE_TOKEN;
const dir = process.argv[2];
const publish = process.argv.includes("--dang");

if (!token) { console.error("Thiếu biến môi trường FB_PAGE_TOKEN."); process.exit(1); }
if (!dir) { console.error("Cách dùng: node bai-dang/dang-fanpage.mjs <thư mục bài> [--dang]"); process.exit(1); }

async function graph(method, endpoint, body) {
  const url = `${API}/${endpoint}`;
  const opts = { method, headers: { Authorization: `Bearer ${token}` } };
  if (body) opts.body = body;
  const res = await fetch(url, opts);
  const data = await res.json();
  if (data.error) throw new Error(`${data.error.type}: ${data.error.message}`);
  return data;
}

const message = (await readFile(path.join(dir, "bai-viet.txt"), "utf8")).trim();
const images = (await readdir(dir)).filter((f) => /\.(png|jpe?g)$/i.test(f)).sort();
if (!images.length) { console.error("Không thấy ảnh trong thư mục."); process.exit(1); }

const page = await graph("GET", "me?fields=id,name");
console.log(`Trang: ${page.name} (${page.id})`);
console.log(`Ảnh (${images.length}): ${images.join(", ")}`);
console.log(`Nội dung: ${message.split("\n")[0].slice(0, 80)}…`);

if (!publish) {
  console.log("\nChạy thử xong, chưa đăng gì. Thêm --dang để đăng thật.");
  process.exit(0);
}

// 1. Tải từng ảnh lên ở dạng chưa công khai, lấy id
const ids = [];
for (const name of images) {
  const form = new FormData();
  form.append("source", await openAsBlob(path.join(dir, name)), name);
  form.append("published", "false");
  const { id } = await graph("POST", `${page.id}/photos`, form);
  ids.push(id);
  console.log(`Đã tải ${name}`);
}

// 2. Tạo bài gồm nội dung + các ảnh theo đúng thứ tự
const post = new URLSearchParams({ message });
ids.forEach((id, i) => post.append(`attached_media[${i}]`, JSON.stringify({ media_fbid: id })));
const { id: postId } = await graph("POST", `${page.id}/feed`, post);
console.log(`\nĐã đăng: https://www.facebook.com/${postId}`);
