// Báo cho Bing (và các công cụ dùng IndexNow) biết có trang mới hoặc vừa sửa.
// Chạy SAU khi bài đã lên web thật (Vercel deploy xong):
//
//   node scripts/indexnow.mjs /blog/ten-bai [/cafe-so/bai-khac ...]
//
// Khoá xác minh nằm ở public/<KEY>.txt, Bing đọc file đó để biết lệnh này đúng là của chủ site.
// Google không dùng IndexNow: với Google, yêu cầu lập chỉ mục trong Search Console.
const SITE = "https://duyweb.info.vn";
const KEY = "e47f78658dfa527946ff74d23252ec0a";

const paths = process.argv.slice(2);
if (!paths.length) {
  console.error("Cách dùng: node scripts/indexnow.mjs /blog/ten-bai [/cafe-so/bai-khac ...]");
  process.exit(1);
}
const urlList = paths.map((p) => (p.startsWith("http") ? p : `${SITE}${p.startsWith("/") ? "" : "/"}${p}`));

// Kiểm tra trang đã lên thật chưa, tránh báo một link còn lỗi 404
for (const u of urlList) {
  const r = await fetch(u, { method: "HEAD" });
  if (!r.ok) {
    console.error(`${u} trả về ${r.status}, chưa báo. Đợi Vercel deploy xong rồi chạy lại.`);
    process.exit(1);
  }
}

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: new URL(SITE).host, key: KEY, keyLocation: `${SITE}/${KEY}.txt`, urlList }),
});
// 200/202: đã nhận. 422: link không thuộc site hoặc khoá chưa lên web
console.log(`IndexNow ${res.status} ${res.statusText}: ${urlList.join(", ")}`);
if (!res.ok && res.status !== 202) process.exit(1);
