#!/usr/bin/env node
// Dựng trang nội bộ có tài khoản: mã hóa nội dung, chỉ người có mật khẩu mới mở được.
//
//   node scripts/noi-bo.mjs trai-cay-350
//
// Đọc  noi-bo-src/<ten>/khung.html, app.js           (giao diện + script, được commit)
//      noi-bo-src/<ten>/noi-dung/*                    (nội dung thật, KHÔNG commit)
//      noi-bo-src/<ten>/tai-khoan.json                (tài khoản + mật khẩu, KHÔNG commit)
// Ghi  public/noi-bo/<ten>.html                       (chỉ chứa bản mã hóa, an toàn để public)
//
// Cách khóa:
//  - Nội dung chia thành từng "gói" (nv, chu, qt). Mỗi gói một khóa AES-256-GCM ngẫu nhiên, tạo lại mỗi lần build.
//  - Mỗi tài khoản: mật khẩu → PBKDF2-SHA256 (600.000 vòng, muối riêng) → khóa bọc các khóa gói đúng theo vai trò.
//  - Trong file public không có mật khẩu, không có tên đăng nhập (chỉ có mã băm), không có nội dung chữ thường.
//  - Xóa tài khoản + build lại = tài khoản đó không mở được bản mới (khóa gói đã đổi).
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { pathToFileURL } from "node:url";

const { subtle } = globalThis.crypto;
const getRandomValues = (a) => globalThis.crypto.getRandomValues(a);
const rand = (n) => getRandomValues(new Uint8Array(n));
const b64 = (u8) => Buffer.from(u8).toString("base64");
const enc = new TextEncoder();
const VONG_LAP = 600_000;

const ten = process.argv[2];
if (!ten || !/^[a-z0-9-]+$/.test(ten)) {
  console.error("Cách dùng: node scripts/noi-bo.mjs <ten-trang>   (vd: trai-cay-350)");
  process.exit(1);
}
const goc = resolve("noi-bo-src", ten);
const fileTK = resolve(goc, "tai-khoan.json");
const thuMucND = resolve(goc, "noi-dung");
const ra = resolve("public/noi-bo", `${ten}.html`);

// Vai trò → các gói được mở
const VAI = {
  "quan-tri": ["nv", "chu", "qt"],
  "chu-tiem": ["nv", "chu"],
  "nhan-vien": ["nv"],
};

// Mật khẩu tự tạo: 3 cụm 4 ký tự, bỏ ký tự dễ nhầm (0/o, 1/l/i) — khoảng 62 bit
function taoMatKhau() {
  const bang = "abcdefghjkmnpqrstuvwxyz23456789";
  const cum = () => Array.from(rand(4), (b) => bang[b % bang.length]).join("");
  return `${cum()}-${cum()}-${cum()}`;
}

async function maHoa(key, obj) {
  const iv = rand(12);
  const ct = new Uint8Array(await subtle.encrypt({ name: "AES-GCM", iv }, key, enc.encode(JSON.stringify(obj))));
  return { iv: b64(iv), ct: b64(ct) };
}

async function maTen(user) {
  const h = new Uint8Array(await subtle.digest("SHA-256", enc.encode(`noi-bo:${ten}:${user.trim().toLowerCase()}`)));
  return b64(h).slice(0, 22);
}

async function khoaTuMatKhau(matKhau, muoi) {
  const goc = await subtle.importKey("raw", enc.encode(matKhau.normalize("NFC")), "PBKDF2", false, ["deriveKey"]);
  return subtle.deriveKey(
    { name: "PBKDF2", hash: "SHA-256", salt: muoi, iterations: VONG_LAP },
    goc, { name: "AES-GCM", length: 256 }, false, ["encrypt"],
  );
}

async function main() {
  if (!existsSync(fileTK)) {
    const mau = [
      { user: "duy", ten: "Duy · Duy Web", vai: "quan-tri", mat_khau: "" },
      { user: "chihuong", ten: "Chị Hương", vai: "chu-tiem", mat_khau: "" },
      { user: "nhanvien1", ten: "Nhân viên 1", vai: "nhan-vien", mat_khau: "", het_han: "" },
    ];
    await writeFile(fileTK, JSON.stringify(mau, null, 2) + "\n");
    console.log(`Đã tạo ${fileTK} mẫu. Sửa tên/vai trò rồi chạy lại.`);
  }
  const taiKhoan = JSON.parse(await readFile(fileTK, "utf8"));

  // Tự tạo mật khẩu cho tài khoản để trống, ghi ngược lại file
  let moi = [];
  for (const tk of taiKhoan) {
    if (!VAI[tk.vai]) throw new Error(`Tài khoản "${tk.user}": vai "${tk.vai}" không hợp lệ (quan-tri | chu-tiem | nhan-vien)`);
    if (!tk.mat_khau) { tk.mat_khau = taoMatKhau(); moi.push(tk); }
    if (tk.mat_khau.length < 10) throw new Error(`Tài khoản "${tk.user}": mật khẩu quá ngắn (tối thiểu 10 ký tự)`);
  }
  const trung = taiKhoan.map((t) => t.user.toLowerCase()).filter((u, i, a) => a.indexOf(u) !== i);
  if (trung.length) throw new Error(`Trùng tên đăng nhập: ${trung.join(", ")}`);
  if (moi.length) await writeFile(fileTK, JSON.stringify(taiKhoan, null, 2) + "\n");

  // Nội dung
  const lich = (await import(pathToFileURL(resolve(thuMucND, "lich.mjs")).href + `?t=${Date.now()}`)).default;
  const soTay = await readFile(resolve(thuMucND, "so-tay.html"), "utf8");
  const soTayChu = await readFile(resolve(thuMucND, "so-tay-chu.html"), "utf8");
  const banDung = new Date().toISOString();

  const goi = {
    nv: { lich, soTay },
    chu: { soTayChu, viecChuChot: lich.viecChuChot || [] },
    qt: {
      taiKhoan: taiKhoan.map(({ user, ten, vai, het_han }) => ({ user, ten, vai, het_han: het_han || "" })),
    },
  };

  const khoaGoi = {};
  const goiMa = {};
  for (const [k, v] of Object.entries(goi)) {
    const raw = rand(32);
    khoaGoi[k] = raw;
    const key = await subtle.importKey("raw", raw, "AES-GCM", false, ["encrypt"]);
    goiMa[k] = await maHoa(key, v);
  }

  const tk = [];
  for (const t of taiKhoan) {
    const muoi = rand(16);
    const kek = await khoaTuMatKhau(t.mat_khau, muoi);
    const keys = Object.fromEntries(VAI[t.vai].map((g) => [g, b64(khoaGoi[g])]));
    tk.push({
      id: await maTen(t.user),
      muoi: b64(muoi),
      ...(await maHoa(kek, { user: t.user, ten: t.ten, vai: t.vai, het_han: t.het_han || "", keys })),
    });
  }
  // Xáo thứ tự để không đoán được ai là quản trị theo vị trí
  tk.sort(() => rand(1)[0] - 128);

  const kho = { v: 1, ten, ban: banDung, vong: VONG_LAP, tk, goi: goiMa };

  let html = await readFile(resolve(goc, "khung.html"), "utf8");
  const app = await readFile(resolve(goc, "app.js"), "utf8");
  // JSON trong <script>: chặn chuỗi </script lọt vào (base64 không có, nhưng cứ chặn)
  const khoJson = JSON.stringify(kho).replace(/</g, "\\u003c");
  html = html
    .replace("/*__KHO__*/", () => khoJson)
    .replace("/*__APP__*/", () => app.replace(/<\/script/gi, "<\\/script"));
  if (html.includes("__KHO__") || html.includes("__APP__")) throw new Error("khung.html thiếu chỗ chèn /*__KHO__*/ hoặc /*__APP__*/");

  await mkdir(dirname(ra), { recursive: true });
  await writeFile(ra, html);

  // Kiểm tra: không có chữ thường của nội dung lọt ra file public
  for (const mau of [...taiKhoan.map((t) => t.mat_khau), "Buổi quay gom", "chị Hương", soTay.slice(200, 260)]) {
    if (mau && html.includes(mau)) throw new Error("CẢNH BÁO: file public chứa chữ thường của nội dung/mật khẩu — dừng lại.");
  }

  console.log(`✓ ${ra}  (${(html.length / 1024).toFixed(0)} KB, ${taiKhoan.length} tài khoản, bản ${banDung})`);
  if (moi.length) {
    console.log("\nMật khẩu vừa tạo (đã ghi vào tai-khoan.json, gửi riêng từng người):");
    for (const t of moi) console.log(`  ${t.user.padEnd(14)} ${t.mat_khau}   (${t.vai})`);
  }
}

main().catch((e) => { console.error("✗", e.message); process.exit(1); });
