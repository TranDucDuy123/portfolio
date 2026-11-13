/* Lịch hoạt động nội bộ: đăng nhập, giải mã, lịch ngày/tuần/tháng, theo dõi video 3 ngày, chấm điểm.
   Dữ liệu lịch nằm trong noi-dung/lich.mjs (được mã hóa khi build). File này chỉ là bộ máy, không chứa nội dung. */
(function () {
  "use strict";

  // ------------------------------------------------------------------ tiện ích
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const md = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>");
  const pad = (n) => String(n).padStart(2, "0");
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} },
    del(k) { try { localStorage.removeItem(k); } catch (e) {} },
  };
  const ss = {
    get(k) { try { return JSON.parse(sessionStorage.getItem(k) || "null"); } catch (e) { return null; } },
    set(k, v) { try { sessionStorage.setItem(k, JSON.stringify(v)); } catch (e) {} },
    del(k) { try { sessionStorage.removeItem(k); } catch (e) {} },
  };
  const u8 = (b64s) => Uint8Array.from(atob(b64s), (c) => c.charCodeAt(0));
  const b64 = (u) => btoa(String.fromCharCode.apply(null, Array.from(u)));

  const KHO = JSON.parse(document.getElementById("kho").textContent);
  const P = "nb:" + KHO.ten + ":"; // tiền tố lưu trữ
  const subtle = window.crypto && window.crypto.subtle;
  const enc = new TextEncoder();
  const dec = new TextDecoder();

  // ------------------------------------------------------------------ lịch âm (thuật toán Hồ Ngọc Đức, múi giờ +7)
  const INT = Math.floor, PI = Math.PI, TZ = 7;
  function jdFromDate(dd, mm, yy) {
    const a = INT((14 - mm) / 12), y = yy + 4800 - a, m = mm + 12 * a - 3;
    let jd = dd + INT((153 * m + 2) / 5) + 365 * y + INT(y / 4) - INT(y / 100) + INT(y / 400) - 32045;
    if (jd < 2299161) jd = dd + INT((153 * m + 2) / 5) + 365 * y + INT(y / 4) - 32083;
    return jd;
  }
  function jdToDate(jd) {
    let a, b, c;
    if (jd > 2299160) { a = jd + 32044; b = INT((4 * a + 3) / 146097); c = a - INT((b * 146097) / 4); }
    else { b = 0; c = jd + 32082; }
    const d = INT((4 * c + 3) / 1461), e = c - INT((1461 * d) / 4), m = INT((5 * e + 2) / 153);
    return [e - INT((153 * m + 2) / 5) + 1, m + 3 - 12 * INT(m / 10), b * 100 + d - 4800 + INT(m / 10)];
  }
  function newMoon(k) {
    const T = k / 1236.85, T2 = T * T, T3 = T2 * T, dr = PI / 180;
    let Jd1 = 2415020.75933 + 29.53058868 * k + 0.0001178 * T2 - 0.000000155 * T3;
    Jd1 += 0.00033 * Math.sin((166.56 + 132.87 * T - 0.009173 * T2) * dr);
    const M = 359.2242 + 29.10535608 * k - 0.0000333 * T2 - 0.00000347 * T3;
    const Mpr = 306.0253 + 385.81691806 * k + 0.0107306 * T2 + 0.00001236 * T3;
    const F = 21.2964 + 390.67050646 * k - 0.0016528 * T2 - 0.00000239 * T3;
    let C1 = (0.1734 - 0.000393 * T) * Math.sin(M * dr) + 0.0021 * Math.sin(2 * dr * M);
    C1 = C1 - 0.4068 * Math.sin(Mpr * dr) + 0.0161 * Math.sin(dr * 2 * Mpr);
    C1 = C1 - 0.0004 * Math.sin(dr * 3 * Mpr);
    C1 = C1 + 0.0104 * Math.sin(dr * 2 * F) - 0.0051 * Math.sin(dr * (M + Mpr));
    C1 = C1 - 0.0074 * Math.sin(dr * (M - Mpr)) + 0.0004 * Math.sin(dr * (2 * F + M));
    C1 = C1 - 0.0004 * Math.sin(dr * (2 * F - M)) - 0.0006 * Math.sin(dr * (2 * F + Mpr));
    C1 = C1 + 0.0010 * Math.sin(dr * (2 * F - Mpr)) + 0.0005 * Math.sin(dr * (2 * Mpr + M));
    const deltat = T < -11
      ? 0.001 + 0.000839 * T + 0.0002261 * T2 - 0.00000845 * T3 - 0.000000081 * T * T3
      : -0.000278 + 0.000265 * T + 0.000262 * T2;
    return Jd1 + C1 - deltat;
  }
  function sunLongitude(jdn) {
    const T = (jdn - 2451545.0) / 36525, T2 = T * T, dr = PI / 180;
    const M = 357.52910 + 35999.05030 * T - 0.0001559 * T2 - 0.00000048 * T * T2;
    const L0 = 280.46645 + 36000.76983 * T + 0.0003032 * T2;
    let DL = (1.914600 - 0.004817 * T - 0.000014 * T2) * Math.sin(dr * M);
    DL += (0.019993 - 0.000101 * T) * Math.sin(dr * 2 * M) + 0.000290 * Math.sin(dr * 3 * M);
    let L = (L0 + DL) * dr;
    return L - PI * 2 * INT(L / (PI * 2));
  }
  const getSunLong = (dn) => INT(sunLongitude(dn - 0.5 - TZ / 24) / PI * 6);
  const getNewMoonDay = (k) => INT(newMoon(k) + 0.5 + TZ / 24);
  function getLunarMonth11(yy) {
    const off = jdFromDate(31, 12, yy) - 2415021, k = INT(off / 29.530588853);
    let nm = getNewMoonDay(k);
    if (getSunLong(nm) >= 9) nm = getNewMoonDay(k - 1);
    return nm;
  }
  function getLeapMonthOffset(a11) {
    const k = INT((a11 - 2415021.076998695) / 29.530588853 + 0.5);
    let last, i = 1, arc = getSunLong(getNewMoonDay(k + i));
    do { last = arc; i++; arc = getSunLong(getNewMoonDay(k + i)); } while (arc !== last && i < 14);
    return i - 1;
  }
  const amCache = new Map();
  function amLich(jd) {
    if (amCache.has(jd)) return amCache.get(jd);
    const [, , yy] = jdToDate(jd);
    const k = INT((jd - 2415021.076998695) / 29.530588853);
    let monthStart = getNewMoonDay(k + 1);
    if (monthStart > jd) monthStart = getNewMoonDay(k);
    let a11 = getLunarMonth11(yy), b11 = a11, lunarYear;
    if (a11 >= monthStart) { lunarYear = yy; a11 = getLunarMonth11(yy - 1); }
    else { lunarYear = yy + 1; b11 = getLunarMonth11(yy + 1); }
    const day = jd - monthStart + 1, diff = INT((monthStart - a11) / 29);
    let leap = 0, month = diff + 11;
    if (b11 - a11 > 365) {
      const lmd = getLeapMonthOffset(a11);
      if (diff >= lmd) { month = diff + 10; if (diff === lmd) leap = 1; }
    }
    if (month > 12) month -= 12;
    if (month >= 11 && diff < 4) lunarYear -= 1;
    const r = { d: day, m: month, y: lunarYear, nhuan: leap };
    amCache.set(jd, r);
    return r;
  }
  const CAN = ["Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ", "Canh", "Tân", "Nhâm", "Quý"];
  const CHI = ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"];
  const namAm = (y) => CAN[(y + 6) % 10] + " " + CHI[(y + 8) % 12];
  const tenNgayAm = (a) => a.d === 1 ? "Mùng 1" : a.d === 15 ? "Rằm" : a.d <= 10 ? "Mùng " + a.d : String(a.d);

  // ------------------------------------------------------------------ ngày giờ (theo giờ Việt Nam)
  const THU = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
  const THU_DAI = ["Chủ nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];
  const thuCua = (jd) => (jd + 1) % 7; // 0 = Chủ nhật
  const iso = (jd) => { const [d, m, y] = jdToDate(jd); return y + "-" + pad(m) + "-" + pad(d); };
  const tuIso = (s) => { const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s || ""); return m ? jdFromDate(+m[3], +m[2], +m[1]) : null; };
  const dm = (jd) => { const [d, m] = jdToDate(jd); return pad(d) + "/" + pad(m); };
  const dmy = (jd) => { const [d, m, y] = jdToDate(jd); return pad(d) + "/" + pad(m) + "/" + y; };
  const phut = (hhmm) => { const [h, m] = String(hhmm).split(":").map(Number); return h * 60 + (m || 0); };

  // Cho phép thử ngày giờ khác: ?ngay=2026-11-18&gio=19:40
  const qs = new URLSearchParams(location.search);
  const GIA_NGAY = tuIso(qs.get("ngay"));
  const GIA_GIO = /^\d{1,2}:\d{2}$/.test(qs.get("gio") || "") ? phut(qs.get("gio")) : null;
  const t0 = Date.now();
  function bayGio() {
    if (GIA_NGAY != null) {
      const p = (GIA_GIO ?? 9 * 60) + INT((Date.now() - t0) / 60000);
      return { jd: GIA_NGAY, p, s: 0 };
    }
    const f = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Ho_Chi_Minh", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h23" });
    const o = Object.fromEntries(f.formatToParts(new Date()).map((x) => [x.type, x.value]));
    return { jd: jdFromDate(+o.day, +o.month, +o.year), p: +o.hour * 60 + +o.minute, s: +o.second };
  }
  const homNay = () => bayGio().jd;

  // ------------------------------------------------------------------ đăng nhập & giải mã
  const KHOA_PHIEN = P + "phien";
  const SAI = P + "sai";
  const NGHI_PHIEN = 2 * 60 * 60 * 1000;     // không thao tác 2 giờ thì đăng xuất (phiên thường)
  const NHO_LAU = 7 * 24 * 60 * 60 * 1000;   // "giữ đăng nhập" tối đa 7 ngày

  async function maTen(user) {
    const h = new Uint8Array(await subtle.digest("SHA-256", enc.encode("noi-bo:" + KHO.ten + ":" + user.trim().toLowerCase())));
    return b64(h).slice(0, 22);
  }
  async function giaiMa(keyRaw, goi) {
    const key = await subtle.importKey("raw", keyRaw, "AES-GCM", false, ["decrypt"]);
    const pt = await subtle.decrypt({ name: "AES-GCM", iv: u8(goi.iv) }, key, u8(goi.ct));
    return JSON.parse(dec.decode(pt));
  }
  async function dangNhap(user, pass) {
    const id = await maTen(user);
    const rec = KHO.tk.find((t) => t.id === id);
    // Không có tài khoản vẫn chạy PBKDF2 để thời gian phản hồi như nhau
    const muoi = rec ? u8(rec.muoi) : crypto.getRandomValues(new Uint8Array(16));
    const goc = await subtle.importKey("raw", enc.encode(pass.normalize("NFC")), "PBKDF2", false, ["deriveKey"]);
    const kek = await subtle.deriveKey({ name: "PBKDF2", hash: "SHA-256", salt: muoi, iterations: KHO.vong }, goc, { name: "AES-GCM", length: 256 }, false, ["decrypt"]);
    if (!rec) throw new Error("sai");
    let hs;
    try {
      hs = JSON.parse(dec.decode(await subtle.decrypt({ name: "AES-GCM", iv: u8(rec.iv) }, kek, u8(rec.ct))));
    } catch (e) { throw new Error("sai"); }
    if (hs.het_han && tuIso(hs.het_han) != null && homNay() > tuIso(hs.het_han)) throw new Error("het-han");
    return hs;
  }
  async function moGoi(hs) {
    const nd = {};
    for (const [g, k] of Object.entries(hs.keys)) {
      if (!KHO.goi[g]) continue;
      nd[g] = await giaiMa(u8(k), KHO.goi[g]);
    }
    if (!nd.nv) throw new Error("hong");
    return nd;
  }

  function docPhien() {
    const p = ss.get(KHOA_PHIEN) || store.get(KHOA_PHIEN, null);
    if (!p) return null;
    const nay = Date.now();
    if (p.ban !== KHO.ban) return { cu: true };
    if (p.nho ? nay - p.luc > NHO_LAU : nay - p.cuoi > NGHI_PHIEN) return { het: true };
    return p;
  }
  function ghiPhien(hs, nho) {
    const p = { ban: KHO.ban, hs, luc: Date.now(), cuoi: Date.now(), nho: !!nho };
    if (nho) store.set(KHOA_PHIEN, p); else ss.set(KHOA_PHIEN, p);
  }
  function chamPhien() {
    const p = ss.get(KHOA_PHIEN);
    if (p) { p.cuoi = Date.now(); ss.set(KHOA_PHIEN, p); }
  }
  function xoaPhien() { ss.del(KHOA_PHIEN); store.del(KHOA_PHIEN); }

  function hienDangNhap(thongBao) {
    $("#ung-dung").hidden = true;
    $("#dang-nhap").hidden = false;
    const info = $("#dn-info");
    info.hidden = !thongBao; info.textContent = thongBao || "";
    if (!subtle) {
      $("#dn-err").hidden = false;
      $("#dn-err").textContent = "Trình duyệt này không hỗ trợ giải mã. Hãy mở bằng Chrome, Safari hoặc Edge bản mới, qua địa chỉ https.";
      $("#dn-btn").disabled = true;
    }
    setTimeout(() => $("#dn-user").focus(), 50);
  }

  $("#form-dn").addEventListener("submit", async (ev) => {
    ev.preventDefault();
    const err = $("#dn-err"), btn = $("#dn-btn");
    const user = $("#dn-user").value.trim(), pass = $("#dn-pass").value;
    err.hidden = true;
    if (!user || !pass) { err.hidden = false; err.textContent = "Nhập đủ tên đăng nhập và mật khẩu."; return; }
    const sai = store.get(SAI, { n: 0, den: 0 });
    if (Date.now() < sai.den) {
      err.hidden = false;
      err.textContent = "Nhập sai nhiều lần. Thử lại sau " + Math.ceil((sai.den - Date.now()) / 1000) + " giây.";
      return;
    }
    btn.disabled = true; btn.textContent = "Đang mở khóa…";
    try {
      const hs = await dangNhap(user, pass);
      const nd = await moGoi(hs);
      store.del(SAI);
      ghiPhien(hs, $("#dn-nho").checked);
      $("#dn-pass").value = "";
      batDau(hs, nd);
    } catch (e) {
      err.hidden = false;
      if (e.message === "het-han") err.textContent = "Tài khoản đã hết hạn. Liên hệ Duy Web để gia hạn.";
      else if (e.message === "hong") err.textContent = "Tài khoản chưa được cấp quyền xem nội dung.";
      else {
        const n = sai.n + 1;
        const cho = n >= 5 ? Math.min(15 * 60, 30 * 2 ** (n - 5)) * 1000 : 0;
        store.set(SAI, { n, den: Date.now() + cho });
        err.textContent = "Sai tên đăng nhập hoặc mật khẩu." + (cho ? " Tạm khóa " + cho / 1000 + " giây." : "");
      }
    } finally {
      btn.disabled = false; btn.textContent = "Đăng nhập";
    }
  });

  $("#dang-xuat").addEventListener("click", () => { xoaPhien(); location.hash = ""; location.reload(); });

  // ------------------------------------------------------------------ trạng thái ứng dụng
  let HS = null, ND = null, L = null; // hồ sơ, nội dung, lịch
  const QUYEN = { "quan-tri": "Quản trị", "chu-tiem": "Chủ tiệm", "nhan-vien": "Nhân viên" };

  function batDau(hs, nd) {
    HS = hs; ND = nd; L = nd.nv.lich;
    $("#dang-nhap").hidden = true;
    $("#ung-dung").hidden = false;
    $("#u-ten").textContent = hs.ten;
    const vai = $("#u-vai"); vai.textContent = QUYEN[hs.vai] || hs.vai; vai.className = "role " + hs.vai;
    const ban = new Date(KHO.ban);
    const banTxt = "Cập nhật " + ban.toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh", day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
    $("#ban-cap-nhat").textContent = banTxt + (GIA_NGAY != null ? " · đang xem thử ngày " + dmy(GIA_NGAY) : "");
    $("#foot-ban").textContent = (L.tiem && L.tiem.ban ? L.tiem.ban + " · " : "") + banTxt + (hs.het_han ? " · tài khoản hết hạn " + hs.het_han : "");
    dungTabs();
    window.addEventListener("hashchange", veTheoHash);
    ["click", "keydown", "touchstart"].forEach((e) => document.addEventListener(e, chamPhien, { passive: true }));
    setInterval(() => {
      const p = docPhien();
      if (!p || p.het || p.cu) { xoaPhien(); location.reload(); return; }
      if (TAB === "hom-nay" && NGAY_XEM === homNay() && !document.activeElement.matches("input,select,textarea")) veHomNay(NGAY_XEM, true);
    }, 30000);
    veTheoHash();
  }

  const TABS = [
    { id: "hom-nay", ten: "Hôm nay" },
    { id: "tuan", ten: "Tuần" },
    { id: "thang", ten: "Tháng" },
    { id: "video", ten: "Video 3 ngày" },
    { id: "so-tay", ten: "Sổ tay" },
    { id: "chu", ten: "Chủ tiệm", can: "chu" },
    { id: "tai-khoan", ten: "Tài khoản", can: "qt" },
  ];
  const coQuyen = (t) => !t.can || (ND && ND[t.can]);
  function dungTabs() {
    $("#tabs").innerHTML = TABS.filter(coQuyen).map((t) => `<a href="#${t.id}" data-tab="${t.id}">${esc(t.ten)}</a>`).join("");
  }
  let TAB = "hom-nay", NGAY_XEM = null;
  function veTheoHash() {
    const [tab, tham] = location.hash.replace(/^#/, "").split("/");
    const t = TABS.find((x) => x.id === tab && coQuyen(x)) || TABS[0];
    TAB = t.id;
    $$("#tabs a").forEach((a) => { if (a.dataset.tab === TAB) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current"); });
    const jd = tuIso(tham);
    ({
      "hom-nay": () => veHomNay(jd ?? homNay()),
      tuan: () => veTuan(jd ?? homNay()),
      thang: () => veThang(jd ?? homNay()),
      video: veVideo,
      "so-tay": veSoTay,
      chu: veChu,
      "tai-khoan": veTaiKhoan,
    })[TAB]();
    if (!tham) window.scrollTo(0, 0);
  }
  const di = (tab, jd) => { location.hash = tab + (jd != null ? "/" + iso(jd) : ""); };

  // ------------------------------------------------------------------ bộ máy sự kiện
  function leTrongNgay(jd) {
    const [d, m] = jdToDate(jd), a = amLich(jd), r = [];
    for (const le of L.dipLe || []) {
      if (le.duong && le.duong === pad(m) + "-" + pad(d)) r.push(le);
      if (le.am && !a.nhuan) { const [am, ad] = le.am.split("-").map(Number); if (am === a.m && ad === a.d) r.push(le); }
    }
    return r;
  }
  // Các dịp lễ trong khoảng [tu, den]
  function leTrongKhoang(tu, den) {
    const r = [];
    for (let j = tu; j <= den; j++) for (const le of leTrongNgay(j)) r.push({ le, jd: j });
    return r;
  }
  function liveNgay(jd) {
    const thu = THU[thuCua(jd)], ngay = iso(jd);
    return (L.live || []).filter((l) => l.thu === thu).map((l) => {
      const doi = (L.liveDoi || []).find((x) => x.ngay === ngay && (!x.thu || x.thu === l.thu));
      return doi ? { ...l, gio: doi.gio || l.gio, huy: !!doi.huy, ghiChu: doi.ghiChu || "" } : l;
    });
  }
  function liveTiepTheo(jd, p) {
    for (let j = jd; j < jd + 15; j++) {
      for (const l of liveNgay(j).filter((x) => !x.huy).sort((a, b) => phut(a.gio) - phut(b.gio))) {
        if (j > jd || phut(l.gio) + (l.phut || 0) > p) return { l, jd: j };
      }
    }
    return null;
  }
  // Sự kiện hiển thị trên lịch tuần/tháng
  function suKien(jd) {
    const ev = [], a = amLich(jd);
    for (const l of liveNgay(jd)) ev.push({ loai: "live", txt: (l.huy ? "Hủy live " : "LIVE ") + l.gio, chiTiet: l.ten });
    for (const le of leTrongNgay(jd)) ev.push({ loai: "le", txt: le.ten });
    if (!a.nhuan && (a.d === 1 || a.d === 15)) ev.push({ loai: "am", txt: (a.d === 1 ? "Mùng 1" : "Rằm") + " tháng " + a.m });
    const n = (L.amLich && L.amLich.nhacTruoc) || 0;
    if (n) { const b = amLich(jd + n); if (!b.nhuan && (b.d === 1 || b.d === 15)) ev.push({ loai: "am", txt: "Nhắc trái cúng " + (b.d === 1 ? "mùng 1" : "Rằm") }); }
    for (const le of L.dipLe || []) {
      const t = leTrongNgay(jd + (le.baoTruoc || 0)).includes(le);
      if (t && le.baoTruoc) ev.push({ loai: "lead", txt: "Bắt đầu đăng " + le.ten });
    }
    for (const v of (L.viecRieng || []).filter((x) => x.ngay === iso(jd))) ev.push({ loai: "rieng", txt: v.viec });
    return ev;
  }
  function giaiDoanDayManh(jd) {
    return leTrongKhoang(jd, jd + 14).filter((x) => x.le.dayManh && x.jd > jd - 1);
  }

  // ------------------------------------------------------------------ HÔM NAY
  const KENH = ["tiktok", "facebook", "story", "zalo", "web"];
  const caHienTai = (p) => (L.ca || []).find((c) => p >= phut(c.tu) && p < phut(c.den));
  const keyCheck = (jd) => P + "ck:" + HS.user + ":" + iso(jd);

  function demNguoc(ph) {
    if (ph < 60) return ph + " phút";
    const h = INT(ph / 60), m = ph % 60;
    if (h < 24) return h + " giờ" + (m ? " " + m + " phút" : "");
    const d = INT(h / 24);
    return d + " ngày " + (h % 24) + " giờ";
  }

  function veHomNay(jd, lamMoi) {
    NGAY_XEM = jd;
    const now = bayGio(), laHomNay = jd === now.jd, a = amLich(jd), thu = THU[thuCua(jd)];
    const p = laHomNay ? now.p : -1;
    const viec = (L.tuan && L.tuan[thu]) || {};
    const lives = liveNgay(jd);
    const ca = laHomNay ? caHienTai(p) : null;

    // --- cảnh báo
    const al = [];
    const lt = liveTiepTheo(jd, laHomNay ? p : -1);
    for (const l of lives.filter((x) => x.huy)) al.push(`<div class="alert live"><span class="t">Live</span><b>Hủy live ${esc(l.gio)} hôm nay</b><p>${esc(l.ghiChu)}</p></div>`);
    if (lt) {
      const conPh = (lt.jd - jd) * 1440 + phut(lt.l.gio) - (laHomNay ? p : 0);
      const dangLive = laHomNay && lt.jd === jd && p >= phut(lt.l.gio);
      const tieuDe = dangLive ? "ĐANG LIVE · " + esc(lt.l.ten)
        : lt.jd === jd ? `Live hôm nay ${esc(lt.l.gio)} · ${esc(lt.l.ten)}`
        : `Live ${THU_DAI[thuCua(lt.jd)]} ${dm(lt.jd)}, ${esc(lt.l.gio)}`;
      const sau = laHomNay && !dangLive ? `<span class="cd">còn ${demNguoc(conPh)}</span> · ` : "";
      al.push(`<div class="alert live"><span class="t">Livestream</span><b>${tieuDe}</b><p>${sau}${esc(lt.l.noi)} nói · ${esc(lt.l.truc)}</p>${lt.jd === jd + 1 ? `<p><b>Hôm nay chuẩn bị:</b> bài báo lịch, 3 story đếm ngược, chọn hàng + bảng mã giá, báo khách quen Zalo.</p>` : ""}</div>`);
    }
    for (const x of leTrongKhoang(jd, jd + 30)) {
      const con = x.jd - jd, bt = x.le.baoTruoc || 7;
      if (con > Math.max(bt, x.le.dayManh ? 14 : 0)) continue;
      al.push(`<div class="alert le"><span class="t">Dịp lễ</span><b>${con === 0 ? "Hôm nay: " : "Còn " + con + " ngày: "}${esc(x.le.ten)}</b><p>${THU_DAI[thuCua(x.jd)]} ${dmy(x.jd)}${x.le.am ? " (âm " + x.le.am.split("-").reverse().join("/") + ")" : ""}. ${con <= bt && con > 0 ? "Đang trong thời gian đăng bài theo dịp, gửi mẫu Zalo cho khách giỏ quà." : con > bt ? "Bắt đầu đăng bài từ " + dm(x.jd - bt) + "." : ""}</p></div>`);
    }
    if (giaiDoanDayManh(jd).length) al.push(`<div class="alert tyle"><span class="t">Tỷ lệ Facebook</span><b>2 tuần trước lễ lớn: đổi tỷ lệ</b><p>Dịp lễ 25%, Album mẫu 20%, giảm Reels hàng thật và Tương tác. TikTok mạch giỏ quà lên 30%.</p></div>`);
    const nT = (L.amLich && L.amLich.nhacTruoc) || 0;
    if (!a.nhuan && (a.d === 1 || a.d === 15)) al.push(`<div class="alert am"><span class="t">Âm lịch</span><b>Hôm nay ${a.d === 1 ? "mùng 1" : "Rằm"} tháng ${a.m} âm</b><p>Giao các mâm trái cúng đã đặt trước.</p></div>`);
    for (let k = 1; k <= nT; k++) {
      const b = amLich(jd + k);
      if (!b.nhuan && (b.d === 1 || b.d === 15) && k === nT) al.push(`<div class="alert am"><span class="t">Zalo · trái cúng</span><b>${b.d === 1 ? "Mùng 1" : "Rằm"} tháng ${b.m} vào ${THU_DAI[thuCua(jd + k)]} ${dm(jd + k)}</b><p>${esc(L.amLich.viec || "")}</p></div>`);
    }
    for (const v of (L.viecRieng || []).filter((x) => x.ngay === iso(jd))) al.push(`<div class="alert rieng"><span class="t">Việc riêng hôm nay</span><b>${esc(v.viec)}</b>${v.ai ? `<p>Phụ trách: ${esc(v.ai)}</p>` : ""}</div>`);
    const n3 = (L.luat3Ngay && L.luat3Ngay.soNgay) || 3, jdV = jd - n3;
    const vids = layVideo().filter((v) => v.ngay === iso(jdV));
    const chuaCham = vids.filter((v) => v.xem == null || v.xem === "");
    al.push(`<div class="alert video"><span class="t">Luật ${n3} ngày</span><b>Chấm hạng video đăng ${THU_DAI[thuCua(jdV)]} ${dm(jdV)}</b><p>${vids.length ? (chuaCham.length ? chuaCham.length + " video chưa nhập số liệu." : "Đã nhập đủ số liệu.") : "Chưa có video ngày này trong bảng."} <a href="#video">Mở bảng video →</a></p></div>`);

    // --- việc các kênh
    const gd = Object.fromEntries((L.gioDang || []).map((g) => [g.kenh, g.khung]));
    const kenhHtml = KENH.map((k) => {
      const kk = (L.kenh && L.kenh[k]) || { ten: k };
      const txt = viec[k];
      return `<div class="ch ${k}${txt ? "" : " trong"}"><div class="k">${esc(kk.ten)}<small>${esc(kk.phu || "")}</small></div><div>${txt ? md(txt) : "<span class='muted'>Không có việc cố định</span>"}${gd[k] ? `<div class="gio">Giờ đăng gợi ý: ${gd[k].map(esc).join(" hoặc ")}</div>` : ""}</div></div>`;
    }).join("") + lives.map((l) => `<div class="ch live"><div class="k">LIVE ${esc(l.gio)}<small>${l.phut || ""} phút · ${esc(l.kenh || "")}</small></div><div>${l.huy ? "<b>Đã hủy</b> " + esc(l.ghiChu) : `<b>${esc(l.ten)}</b><div class="gio">${esc(l.noi)} nói · ${esc(l.truc)}</div>${(l.viec || []).length ? "<ul class='small' style='margin-top:4px'>" + l.viec.map((v) => `<li>${esc(v)}</li>`).join("") + "</ul>" : ""}`}</div></div>`).join("");

    // --- checklist ca
    const ck = store.get(keyCheck(jd), {});
    const caHtml = (L.ca || []).map((c) => {
      const xong = c.viec.filter((_, i) => ck[c.id + ":" + i]).length;
      const cur = ca && ca.id === c.id;
      // Mở: ca đang chạy, ca đã qua mà chưa xong, hoặc khi xem ngày khác. Khi tự làm mới thì giữ nguyên trạng thái đóng/mở.
      const cu = lamMoi ? $(`details[data-ca="${c.id}"]`) : null;
      const mo = cu ? cu.open : cur || !laHomNay || (p >= phut(c.den) && xong < c.viec.length);
      return `<details class="shift${cur ? " cur" : ""}" ${mo ? "open" : ""} data-ca="${c.id}">
        <summary><b>${esc(c.ten)}</b><span class="h">${esc(c.tu)}–${esc(c.den)}</span><span class="prog${xong === c.viec.length ? " full" : ""}">${xong}/${c.viec.length}</span></summary>
        <div class="pbar"><i style="width:${(100 * xong) / c.viec.length}%"></i></div>
        <ul>${c.viec.map((v, i) => `<li><label><input type="checkbox" data-k="${c.id}:${i}" ${ck[c.id + ":" + i] ? "checked" : ""}><span>${md(v)}</span></label></li>`).join("")}</ul></details>`;
    }).join("");

    // --- story
    const stHtml = (L.story || []).map((s) => {
      const tt = !laHomNay ? "" : p >= phut(s.den) ? " qua" : p >= phut(s.tu) ? " dang" : "";
      return `<div class="st${tt}"><div><div class="h">${esc(s.tu)}–${esc(s.den)}</div><div class="m">${esc(s.muc)}</div></div><div><b style="font-weight:600">${esc(s.noiDung)}</b><p>${esc(s.keo)}</p></div></div>`;
    }).join("");

    const tongCk = (L.ca || []).reduce((s, c) => s + c.viec.length, 0);
    const xongCk = Object.values(ck).filter(Boolean).length;

    $("#view").innerHTML = `<div class="view">
      <div class="dayhead">
        <div>
          <span class="eyebrow">${THU_DAI[thuCua(jd)]}${laHomNay ? " · hôm nay" : ""}</span>
          <h1>${dmy(jd)}</h1>
          <div class="am">Âm lịch <b>${tenNgayAm(a)}/${a.m}${a.nhuan ? " nhuận" : ""}</b> năm ${namAm(a.y)}</div>
        </div>
        <div class="daynav">
          ${laHomNay ? `<span class="now"><i></i>${pad(INT(p / 60))}:${pad(p % 60)}${ca ? " · Ca " + esc(ca.ten.toLowerCase()) : " · ngoài giờ ca"}</span>` : `<span class="now notday">Đang xem ngày khác</span>`}
          <button class="btn sm" data-go="${jd - 1}" aria-label="Ngày trước">‹</button>
          ${laHomNay ? "" : `<button class="btn sm" data-go="${now.jd}">Hôm nay</button>`}
          <button class="btn sm" data-go="${jd + 1}" aria-label="Ngày sau">›</button>
          <input type="date" id="chon-ngay" value="${iso(jd)}" aria-label="Chọn ngày">
        </div>
      </div>
      <div class="alerts">${al.join("")}</div>
      <div class="cols">
        <div class="panel"><h2>Việc từng kênh · ${THU_DAI[thuCua(jd)]}</h2><div class="chs">${kenhHtml}</div></div>
        <div class="panel">
          <h2>Checklist theo ca <span class="prog${xongCk === tongCk ? " full" : ""}" id="tong-ck">${xongCk}/${tongCk}</span></h2>
          <div class="shifts">${caHtml}</div>
          <p class="small muted">Dấu tick lưu theo ngày trên máy này, sang ngày mới tự trống.</p>
        </div>
      </div>
      <div class="panel"><h2>Story trong ngày</h2><div class="stl">${stHtml}</div></div>
    </div>`;

    $$("[data-go]").forEach((b) => b.addEventListener("click", () => di("hom-nay", +b.dataset.go)));
    $("#chon-ngay").addEventListener("change", (e) => { const j = tuIso(e.target.value); if (j) di("hom-nay", j); });
    $$(".shift input[type=checkbox]").forEach((cb) => cb.addEventListener("change", () => {
      const st = store.get(keyCheck(jd), {});
      if (cb.checked) st[cb.dataset.k] = Date.now(); else delete st[cb.dataset.k];
      store.set(keyCheck(jd), st);
      const det = cb.closest("details"), c = (L.ca || []).find((x) => x.id === det.dataset.ca);
      const xong = c.viec.filter((_, i) => st[c.id + ":" + i]).length;
      const pr = $(".prog", det); pr.textContent = xong + "/" + c.viec.length; pr.classList.toggle("full", xong === c.viec.length);
      $(".pbar i", det).style.width = (100 * xong) / c.viec.length + "%";
      const t = Object.values(st).filter(Boolean).length, tc = $("#tong-ck");
      tc.textContent = t + "/" + tongCk; tc.classList.toggle("full", t === tongCk);
    }));
    donCheckCu();
  }
  function donCheckCu() {
    try {
      const han = iso(homNay() - 30);
      for (let i = localStorage.length - 1; i >= 0; i--) {
        const k = localStorage.key(i);
        if (k && k.startsWith(P + "ck:") && k.slice(-10) < han) localStorage.removeItem(k);
      }
    } catch (e) {}
  }

  // ------------------------------------------------------------------ TUẦN
  function veTuan(jd) {
    const now = homNay();
    const dau = jd - ((thuCua(jd) + 6) % 7); // thứ Hai
    const ngay = Array.from({ length: 7 }, (_, i) => dau + i);
    const thuOf = (j) => THU[thuCua(j)];
    const tagHtml = (j) => suKien(j).map((e) => `<span class="tag ${e.loai}" title="${esc(e.chiTiet || e.txt)}">${esc(e.txt)}</span>`).join("");
    const head = ngay.map((j) => { const a = amLich(j); return `<th class="${j === now ? "today" : ""}"><button data-day="${j}">${THU_DAI[thuCua(j)].replace("Thứ ", "T.")}<span class="d">${dm(j)}</span><span class="a">âm ${a.d}/${a.m}</span></button></th>`; }).join("");
    const rows = KENH.map((k) => {
      const kk = (L.kenh && L.kenh[k]) || { ten: k };
      return `<tr class="r-${k}"><th class="rowh">${esc(kk.ten)}<small>${esc(kk.phu || "")}</small></th>${ngay.map((j) => `<td class="${j === now ? "today" : ""}">${md(((L.tuan || {})[thuOf(j)] || {})[k] || "–")}</td>`).join("")}</tr>`;
    }).join("");
    const evRow = `<tr class="r-ev"><th class="rowh">Sự kiện<small>live · lễ · âm lịch</small></th>${ngay.map((j) => `<td class="${j === now ? "today" : ""}">${tagHtml(j) || "<span class='muted'>–</span>"}</td>`).join("")}</tr>`;
    const cards = ngay.map((j) => {
      const v = (L.tuan || {})[thuOf(j)] || {}, t = tagHtml(j);
      return `<div class="dc${j === now ? " today" : ""}"><h3><span>${THU_DAI[thuCua(j)]} ${dm(j)}</span><button class="btn sm" data-day="${j}">Mở ngày</button></h3>${t ? `<div>${t}</div>` : ""}${KENH.filter((k) => v[k]).map((k) => `<div class="l" style="--c:var(--${{ tiktok: "tt", facebook: "fb", story: "st", zalo: "zl", web: "web" }[k]})"><b>${esc((L.kenh[k] || {}).ten || k)}</b><span>${md(v[k])}</span></div>`).join("")}</div>`;
    }).join("");
    $("#view").innerHTML = `<div class="view">
      <div class="toolbar"><div><span class="eyebrow">Lịch tuần</span><h1>${dm(ngay[0])} – ${dmy(ngay[6])}</h1></div>
        <div class="daynav"><button class="btn sm" data-wk="${jd - 7}">‹ Tuần trước</button><button class="btn sm" data-wk="${now}">Tuần này</button><button class="btn sm" data-wk="${jd + 7}">Tuần sau ›</button></div></div>
      <div class="wk"><table><thead><tr><th class="rowh"></th>${head}</tr></thead><tbody>${evRow}${rows}</tbody></table></div>
      <div class="wkcards">${cards}</div>
      ${legend()}
    </div>`;
    $$("[data-wk]").forEach((b) => b.addEventListener("click", () => di("tuan", +b.dataset.wk)));
    $$("[data-day]").forEach((b) => b.addEventListener("click", () => di("hom-nay", +b.dataset.day)));
  }
  const legend = () => `<div class="legend">Chú thích: <span class="tag live">Live</span><span class="tag le">Dịp lễ</span><span class="tag lead">Bắt đầu đăng bài lễ</span><span class="tag am">Âm lịch / nhắc trái cúng</span><span class="tag rieng">Việc riêng</span></div>`;

  // ------------------------------------------------------------------ THÁNG
  function veThang(jd) {
    const now = homNay();
    const [, m, y] = jdToDate(jd);
    const dau = jdFromDate(1, m, y);
    const cuoi = (m === 12 ? jdFromDate(1, 1, y + 1) : jdFromDate(1, m + 1, y)) - 1;
    const batDauLuoi = dau - ((thuCua(dau) + 6) % 7);
    const ketThuc = cuoi + (6 - ((thuCua(cuoi) + 6) % 7));
    let cells = "";
    for (let j = batDauLuoi; j <= ketThuc; j++) {
      const a = amLich(j), [d] = jdToDate(j);
      const ev = suKien(j);
      const amTxt = a.d === 1 ? a.d + "/" + a.m : String(a.d);
      cells += `<button class="c${j < dau || j > cuoi ? " ngoai" : ""}${j === now ? " today" : ""}" data-day="${j}" aria-label="${THU_DAI[thuCua(j)]} ${dmy(j)}${ev.length ? ": " + esc(ev.map((e) => e.txt).join(", ")) : ""}">
        <span class="n"><b>${d}</b><small class="${a.d === 1 || a.d === 15 ? "ram" : ""}">${amTxt}</small></span>
        <span class="tags">${ev.map((e) => `<span class="tag ${e.loai}">${esc(e.txt)}</span>`).join("")}</span></button>`;
    }
    const thangTruoc = dau - 1, thangSau = cuoi + 1;
    // Danh sách mốc trong tháng
    const moc = [];
    for (let j = dau; j <= cuoi; j++) for (const e of suKien(j)) if (e.loai !== "live") moc.push(`<li><b>${THU[thuCua(j)]} ${dm(j)}</b> · ${esc(e.txt)}</li>`);
    $("#view").innerHTML = `<div class="view">
      <div class="toolbar"><div><span class="eyebrow">Lịch tháng</span><h1>Tháng ${m}/${y}</h1></div>
        <div class="daynav"><button class="btn sm" data-mo="${thangTruoc}">‹ Tháng trước</button><button class="btn sm" data-mo="${now}">Tháng này</button><button class="btn sm" data-mo="${thangSau}">Tháng sau ›</button></div></div>
      <div class="cal">${["T2", "T3", "T4", "T5", "T6", "T7", "CN"].map((t) => `<div class="hd">${t}</div>`).join("")}${cells}</div>
      ${legend()}
      <div class="panel"><h2>Mốc trong tháng</h2>${moc.length ? `<ul class="card">${moc.join("")}</ul>` : "<p class='muted'>Không có mốc đặc biệt.</p>"}</div>
      <p class="small muted">Bấm vào một ngày để xem việc chi tiết của ngày đó. Số nhỏ góc phải là ngày âm.</p>
    </div>`;
    $$("[data-mo]").forEach((b) => b.addEventListener("click", () => di("thang", +b.dataset.mo)));
    $$("[data-day]").forEach((b) => b.addEventListener("click", () => di("hom-nay", +b.dataset.day)));
  }

  // ------------------------------------------------------------------ VIDEO 3 NGÀY
  const KV = P + "video";
  const layVideo = () => store.get(KV, []);
  const luuVideo = (v) => store.set(KV, v);
  function chamHang(list) {
    const cfg = L.luat3Ngay || {}, N = cfg.soVideoTB || 10, A = cfg.hangA || 2, B = cfg.hangB || 1;
    const coSo = list.filter((v) => v.xem !== "" && v.xem != null).sort((a, b) => (a.ngay < b.ngay ? -1 : a.ngay > b.ngay ? 1 : a.id - b.id));
    const kq = {};
    coSo.forEach((v, i) => {
      const truoc = coSo.slice(Math.max(0, i - N), i);
      if (truoc.length < 3) { kq[v.id] = { h: "x", note: "cần ≥3 video trước để so" }; return; }
      const tbXem = truoc.reduce((s, x) => s + +x.xem, 0) / truoc.length;
      const coHet = truoc.filter((x) => x.het !== "" && x.het != null);
      const tbHet = coHet.length ? coHet.reduce((s, x) => s + +x.het, 0) / coHet.length : null;
      const r = +v.xem / tbXem;
      const hetTot = tbHet == null || (v.het !== "" && v.het != null && +v.het > tbHet);
      kq[v.id] = { h: r >= A && hetTot ? "A" : r >= B ? "B" : "C", r, tbXem, tbHet };
    });
    return kq;
  }
  function veVideo() {
    const cfg = L.luat3Ngay || {}, n3 = cfg.soNgay || 3;
    const list = layVideo();
    const kq = chamHang(list);
    const now = homNay();
    const sx = [...list].sort((a, b) => (a.ngay > b.ngay ? -1 : a.ngay < b.ngay ? 1 : b.id - a.id));
    const den = (v) => tuIso(v.ngay) + n3;
    const canCham = list.filter((v) => (v.xem === "" || v.xem == null) && den(v) <= now);
    const dem = { A: 0, B: 0, C: 0 };
    Object.values(kq).forEach((x) => { if (dem[x.h] != null) dem[x.h]++; });
    const fmt = (n) => Number(n).toLocaleString("vi-VN");
    const rows = sx.map((v) => {
      const g = kq[v.id], due = (v.xem === "" || v.xem == null) && den(v) <= now, chua = den(v) > now;
      const hang = g ? `<span class="grade ${g.h}" title="${g.r ? "Gấp " + g.r.toFixed(2) + " lần TB " + fmt(Math.round(g.tbXem)) : esc(g.note || "")}">${g.h === "x" ? "?" : g.h}</span>` : chua ? `<span class="grade x">chấm ${dm(den(v))}</span>` : `<span class="grade x">chờ số</span>`;
      return `<tr class="${due ? "due" : ""}" data-id="${v.id}">
        <td class="ng">${dm(tuIso(v.ngay))}<br><small class="muted">${THU[thuCua(tuIso(v.ngay))]}</small></td>
        <td><input type="text" data-f="ten" value="${esc(v.ten)}" aria-label="Tên / hook"></td>
        <td><select data-f="mach" aria-label="Mạch">${(cfg.mach || []).map((m) => `<option ${m === v.mach ? "selected" : ""}>${esc(m)}</option>`).join("")}</select></td>
        <td><input type="number" min="0" data-f="xem" value="${v.xem ?? ""}" placeholder="lượt xem" aria-label="Lượt xem"></td>
        <td><input type="number" min="0" max="100" step="0.1" data-f="het" value="${v.het ?? ""}" placeholder="%" aria-label="Tỷ lệ xem hết %"></td>
        <td><input type="number" min="0" data-f="luu" value="${v.luu ?? ""}" aria-label="Lượt lưu" style="width:72px"></td>
        <td><input type="number" min="0" data-f="share" value="${v.share ?? ""}" aria-label="Chia sẻ" style="width:72px"></td>
        <td>${hang}</td>
        <td><label class="small" style="display:flex;gap:5px;align-items:center;white-space:nowrap"><input type="checkbox" data-f="reels" ${v.reels ? "checked" : ""}> đã lên</label></td>
        <td><button class="btn sm ghost" data-xoa="${v.id}" aria-label="Xóa">✕</button></td></tr>`;
    }).join("");
    $("#view").innerHTML = `<div class="view">
      <div class="toolbar"><div><span class="eyebrow">Luật ${n3} ngày</span><h1>Theo dõi video TikTok</h1><p class="muted small">Ghi video ngay khi đăng. Sau ${n3} ngày nhập số liệu, trang tự chấm hạng so với ${cfg.soVideoTB || 10} video gần nhất.</p></div>
        <div class="daynav"><button class="btn sm" id="xuat">Xuất file</button><label class="btn sm" style="cursor:pointer">Nhập file<input type="file" id="nhap" accept=".json,application/json" hidden></label></div></div>
      <div class="stats">
        <div class="stat"><b>${list.length}</b><span>video đã ghi</span></div>
        <div class="stat" style="${canCham.length ? "border-color:var(--warn)" : ""}"><b style="color:var(--warn)">${canCham.length}</b><span>đến hạn, chưa nhập số</span></div>
        <div class="stat"><b style="color:var(--good)">${dem.A}</b><span>hạng A · lên Reels ngay</span></div>
        <div class="stat"><b style="color:var(--warn)">${dem.B}</b><span>hạng B · cân nhắc</span></div>
        <div class="stat"><b style="color:var(--low)">${dem.C}</b><span>hạng C · không đăng lại</span></div>
      </div>
      <form class="form-row" id="them-video">
        <label>Ngày đăng<input type="date" name="ngay" value="${iso(now)}" required></label>
        <label class="grow">Tên video / hook<input type="text" name="ten" placeholder="VD: Ăn kiwi đừng gọt vỏ vội" required></label>
        <label>Mạch<select name="mach">${(cfg.mach || []).map((m) => `<option>${esc(m)}</option>`).join("")}</select></label>
        <button class="btn pri" type="submit">+ Thêm video</button>
      </form>
      <div class="vt">${list.length ? `<table><thead><tr><th>Ngày đăng</th><th>Tên / hook</th><th>Mạch</th><th>Lượt xem</th><th>Xem hết %</th><th>Lưu</th><th>Chia sẻ</th><th>Hạng</th><th>Reels FB</th><th></th></tr></thead><tbody>${rows}</tbody></table>` : `<div class="empty">Chưa có video nào. Thêm video đầu tiên ở ô bên trên.</div>`}</div>
      <p class="small muted">Hạng A: lượt xem ≥ ${cfg.hangA || 2} lần trung bình <b>và</b> tỷ lệ xem hết cao hơn trung bình. Hạng B: ≥ ${cfg.hangB || 1} lần. Hạng C: dưới trung bình. Dòng tô vàng là video đến hạn chấm mà chưa nhập số. Bảng lưu trên máy này, dùng <b>Xuất file</b> / <b>Nhập file</b> để chuyển sang máy khác.</p>
    </div>`;

    $("#them-video").addEventListener("submit", (e) => {
      e.preventDefault();
      const f = new FormData(e.target);
      const l = layVideo();
      l.push({ id: Date.now(), ngay: f.get("ngay"), ten: String(f.get("ten")).trim(), mach: f.get("mach"), xem: "", het: "", luu: "", share: "", reels: false, boi: HS.user });
      luuVideo(l); veVideo();
    });
    $$(".vt [data-f]").forEach((inp) => inp.addEventListener("change", () => {
      const id = +inp.closest("tr").dataset.id, l = layVideo(), v = l.find((x) => x.id === id);
      if (!v) return;
      v[inp.dataset.f] = inp.type === "checkbox" ? inp.checked : inp.value;
      luuVideo(l);
      if (["xem", "het"].includes(inp.dataset.f)) veVideo();
    }));
    $$("[data-xoa]").forEach((b) => b.addEventListener("click", () => {
      if (!confirm("Xóa video này khỏi bảng?")) return;
      luuVideo(layVideo().filter((x) => x.id !== +b.dataset.xoa)); veVideo();
    }));
    $("#xuat").addEventListener("click", () => {
      const blob = new Blob([JSON.stringify({ loai: "video-3-ngay", trang: KHO.ten, luc: new Date().toISOString(), video: layVideo() }, null, 2)], { type: "application/json" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob); a.download = "video-3-ngay-" + iso(homNay()) + ".json"; a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    });
    $("#nhap").addEventListener("change", async (e) => {
      const file = e.target.files[0]; if (!file) return;
      try {
        const d = JSON.parse(await file.text());
        if (d.loai !== "video-3-ngay" || !Array.isArray(d.video)) throw new Error();
        const l = layVideo(), co = new Set(l.map((x) => x.id));
        let them = 0;
        for (const v of d.video) {
          if (!v || typeof v.id !== "number" || !tuIso(v.ngay)) continue;
          const sach = { id: v.id, ngay: v.ngay, ten: String(v.ten || "").slice(0, 300), mach: String(v.mach || ""), xem: v.xem ?? "", het: v.het ?? "", luu: v.luu ?? "", share: v.share ?? "", reels: !!v.reels, boi: String(v.boi || "") };
          if (co.has(v.id)) Object.assign(l.find((x) => x.id === v.id), sach); else { l.push(sach); them++; }
        }
        luuVideo(l); alert("Đã nhập: " + them + " video mới, cập nhật các video trùng."); veVideo();
      } catch (er) { alert("File không đúng định dạng bảng video."); }
    });
  }

  // ------------------------------------------------------------------ SỔ TAY
  function ganNutChep(root) {
    $$(".tpl button.copy", root).forEach((btn) => btn.addEventListener("click", () => {
      const pre = btn.closest(".tpl").querySelector("pre");
      const xong = () => { btn.textContent = "Đã chép"; setTimeout(() => (btn.textContent = "Sao chép"), 1500); };
      const loi = () => { const r = document.createRange(); r.selectNodeContents(pre); const s = getSelection(); s.removeAllRanges(); s.addRange(r); btn.textContent = "Đã chọn, bấm Ctrl+C"; };
      try { navigator.clipboard.writeText(pre.innerText).then(xong, loi); } catch (e) { loi(); }
    }));
  }
  function mucLuc(root) {
    return `<nav class="toc" aria-label="Mục lục">${$$("section[data-toc]", root).map((s) => `<a href="#so-tay/${s.id}" data-sec="${s.id}">${esc(s.dataset.toc)}</a>`).join("")}</nav>`;
  }
  function veSoTay() {
    const tmp = document.createElement("div");
    tmp.innerHTML = ND.nv.soTay;
    $("#view").innerHTML = `<div class="view"><div><span class="eyebrow">Sổ tay vận hành</span><h1 style="font-size:1.6rem;font-weight:800">Hệ thống marketing 4 kênh</h1></div>${mucLuc(tmp)}<div class="sotay">${tmp.innerHTML}</div></div>`;
    ganNutChep($("#view"));
    const sec = location.hash.split("/")[1];
    if (sec && document.getElementById(sec)) document.getElementById(sec).scrollIntoView();
    $$(".toc a").forEach((a) => a.addEventListener("click", (e) => { e.preventDefault(); history.replaceState(null, "", a.getAttribute("href")); document.getElementById(a.dataset.sec).scrollIntoView({ behavior: "smooth" }); }));
  }

  // ------------------------------------------------------------------ CHỦ TIỆM
  const KD = P + "diem", KC = P + "chu-chot";
  const TIEU_CHI = [
    { id: "du", ten: "Làm đủ, đúng lịch", max: 30, mo: "Nội dung so với lịch, 2 live đúng giờ, chấm hạng đủ" },
    { id: "cl", ten: "Chất lượng", max: 20, mo: "Ảnh video thật, đúng tỷ lệ, không link, không sai giá" },
    { id: "kq", ten: "Kết quả", max: 30, mo: "Tin hỏi mua, đơn từ story + live so tuần trước" },
    { id: "ck", ten: "Chăm khách", max: 20, mo: "Trả lời 15 phút, hỏi thăm sau mua, nhãn Zalo" },
  ];
  function veChu() {
    if (!ND.chu) return di("hom-nay");
    const now = homNay(), dauTuan = now - ((thuCua(now) + 6) % 7);
    const diem = store.get(KD, {});
    const chon = $("#tuan-cham")?.value || iso(dauTuan);
    const cur = diem[chon] || {};
    const tuanOpts = Array.from({ length: 8 }, (_, i) => dauTuan - 7 * i).map((j) => `<option value="${iso(j)}" ${iso(j) === chon ? "selected" : ""}>Tuần ${dm(j)} – ${dm(j + 6)}${diem[iso(j)] ? " ✓" : ""}</option>`).join("");
    const lichSu = Object.keys(diem).sort().slice(-10);
    const tong = (d) => TIEU_CHI.reduce((s, t) => s + (+d[t.id] || 0), 0);
    const chot = store.get(KC, {});
    const tmp = document.createElement("div"); tmp.innerHTML = ND.chu.soTayChu;
    $("#view").innerHTML = `<div class="view">
      <div><span class="eyebrow">Chỉ chủ tiệm và quản trị</span><h1 style="font-size:1.6rem;font-weight:800">Giám sát tuần</h1></div>
      <div class="cols">
        <div class="panel"><h2>Chấm điểm tuần</h2>
          <form class="score" id="form-diem">
            <label class="small" style="display:grid;gap:4px;font-weight:700">Tuần<select id="tuan-cham">${tuanOpts}</select></label>
            ${TIEU_CHI.map((t) => `<div class="crit"><div><b>${t.ten}</b><small>${t.mo}</small></div><input type="range" min="0" max="${t.max}" step="1" name="${t.id}" value="${cur[t.id] ?? 0}" aria-label="${t.ten}"><output>${cur[t.id] ?? 0}/${t.max}</output></div>`).join("")}
            <textarea name="ghi" rows="2" placeholder="Ghi chú tuần này (nhân viên làm tốt gì, cần sửa gì)">${esc(cur.ghi || "")}</textarea>
            <div class="total" id="tong"><b>0</b><span class="muted">/ 100</span><span style="flex:1"></span><button class="btn pri" type="submit">Lưu điểm tuần</button></div>
          </form>
        </div>
        <div class="panel"><h2>10 tuần gần nhất</h2>
          ${lichSu.length ? `<div class="hist">${lichSu.map((k) => { const t = tong(diem[k]); return `<div title="${t} điểm"><span>${t}</span><i class="${t < 60 ? "low" : ""}" style="height:${t * 0.8}px"></i><span>${k.slice(8, 10)}/${k.slice(5, 7)}</span></div>`; }).join("")}</div>` : `<p class="muted small">Chưa chấm tuần nào.</p>`}
          <h2 style="margin-top:8px">Việc chủ tiệm cần chốt</h2>
          <ul class="chk card">${(ND.chu.viecChuChot || []).map((v, i) => `<li><label><input type="checkbox" data-c="${i}" ${chot[i] ? "checked" : ""}><span>${esc(v)}</span></label></li>`).join("")}</ul>
        </div>
      </div>
      <div class="sotay">${tmp.innerHTML}</div>
    </div>`;
    const form = $("#form-diem");
    const capNhat = () => {
      let t = 0;
      $$("input[type=range]", form).forEach((r) => { t += +r.value; r.nextElementSibling.textContent = r.value + "/" + r.max; });
      const box = $("#tong"); box.querySelector("b").textContent = t;
      box.className = "total " + (t >= 75 ? "ok" : t >= 60 ? "mid" : "low");
    };
    form.addEventListener("input", capNhat); capNhat();
    $("#tuan-cham").addEventListener("change", veChu);
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const d = store.get(KD, {}), f = new FormData(form), k = $("#tuan-cham").value;
      d[k] = Object.fromEntries(TIEU_CHI.map((t) => [t.id, +f.get(t.id)]));
      d[k].ghi = String(f.get("ghi") || ""); d[k].boi = HS.user; d[k].luc = Date.now();
      store.set(KD, d); veChu();
    });
    $$("[data-c]").forEach((cb) => cb.addEventListener("change", () => { const c = store.get(KC, {}); c[cb.dataset.c] = cb.checked; store.set(KC, c); }));
  }

  // ------------------------------------------------------------------ TÀI KHOẢN (quản trị)
  function veTaiKhoan() {
    if (!ND.qt) return di("hom-nay");
    const now = homNay();
    $("#view").innerHTML = `<div class="view">
      <div><span class="eyebrow">Chỉ quản trị</span><h1 style="font-size:1.6rem;font-weight:800">Tài khoản được cấp</h1></div>
      <div class="tbl"><table><thead><tr><th>Tên đăng nhập</th><th>Người dùng</th><th>Vai trò</th><th>Thấy được</th><th>Hết hạn</th></tr></thead><tbody>
      ${ND.qt.taiKhoan.map((t) => { const hh = tuIso(t.het_han); return `<tr><td class="day">${esc(t.user)}</td><td>${esc(t.ten)}</td><td><span class="role ${esc(t.vai)}">${esc(QUYEN[t.vai] || t.vai)}</span></td><td class="small">${t.vai === "nhan-vien" ? "Lịch, checklist, sổ tay, video" : t.vai === "chu-tiem" ? "+ Chủ tiệm (chấm điểm)" : "Tất cả + tài khoản"}</td><td>${hh == null ? "<span class='muted'>Không hạn</span>" : hh < now ? `<b style="color:var(--accent)">Đã hết ${dm(hh)}</b>` : dmy(hh)}</td></tr>`; }).join("")}
      </tbody></table></div>
      <div class="note"><b>Cách thêm, khóa, đổi mật khẩu</b>Sửa <code>noi-bo-src/${esc(KHO.ten)}/tai-khoan.json</code> trên máy Duy (để trống mật khẩu = tự tạo mới), rồi chạy <code>node scripts/noi-bo.mjs ${esc(KHO.ten)}</code> và đưa file lên hosting. Mỗi lần dựng lại, toàn bộ khóa được tạo mới: người bị xóa không mở được bản mới, mọi người phải đăng nhập lại.</div>
    </div>`;
  }

  // ------------------------------------------------------------------ khởi động
  async function khoiDong() {
    if (!subtle) return hienDangNhap();
    const p = docPhien();
    if (!p) return hienDangNhap();
    if (p.cu) { xoaPhien(); return hienDangNhap("Trang vừa được cập nhật. Đăng nhập lại để xem bản mới."); }
    if (p.het) { xoaPhien(); return hienDangNhap("Phiên đăng nhập đã hết hạn, đăng nhập lại nhé."); }
    try {
      if (p.hs.het_han && tuIso(p.hs.het_han) != null && homNay() > tuIso(p.hs.het_han)) throw new Error();
      const nd = await moGoi(p.hs);
      chamPhien();
      batDau(p.hs, nd);
    } catch (e) { xoaPhien(); hienDangNhap(); }
  }
  khoiDong();
})();
