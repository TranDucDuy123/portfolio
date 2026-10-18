/*
  Đo hành vi khách trên trang báo giá — dùng chung cho mọi phiên bản để so sánh.
    v1 = báo giá React  (/bao-gia-kh/<ma-link>)
    v2 = báo giá dựng từ skill duyweb-bao-gia (/de-xuat/<ma-link>)

  Cách gắn: <script src="/quote-track.js" data-version="v2" defer></script>
  Mỗi sự kiện gửi kèm quote_version và quote_slug, để xem trong Google Analytics 4
  (Báo cáo → Sự kiện, lọc theo quote_version) hoặc Facebook Events Manager.

  Điền ID bên dưới thì mới gửi đi. Để trống: chỉ ghi vào console (dùng khi thử trên máy).
*/
(function () {
  var CONFIG = {
    ga4: "", // VD "G-XXXXXXXXXX" — Google Analytics 4 › Quản trị › Luồng dữ liệu
    fbPixel: "", // VD "1234567890" — chỉ điền nếu có Pixel thật
  };

  if (window.__quoteTrack) return;
  var me = document.currentScript;
  var version = (me && me.getAttribute("data-version")) || "unknown";
  var parts = location.pathname.replace(/\/+$/, "").split("/");
  var slug = parts[parts.length - 1] || "";
  var base = { quote_version: version, quote_slug: slug };
  var sent = {};

  function loadScript(src) {
    var s = document.createElement("script");
    s.async = true;
    s.src = src;
    document.head.appendChild(s);
  }

  if (CONFIG.ga4) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
    loadScript("https://www.googletagmanager.com/gtag/js?id=" + CONFIG.ga4);
    window.gtag("js", new Date());
    window.gtag("config", CONFIG.ga4, { send_page_view: false });
  }
  if (CONFIG.fbPixel && !window.fbq) {
    var n = (window.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); });
    n.push = n; n.loaded = true; n.version = "2.0"; n.queue = [];
    loadScript("https://connect.facebook.net/en_US/fbevents.js");
    window.fbq("init", CONFIG.fbPixel);
  }

  function track(name, extra, once) {
    if (once) {
      if (sent[name]) return;
      sent[name] = true;
    }
    var params = {};
    var k;
    for (k in base) params[k] = base[k];
    for (k in extra || {}) params[k] = extra[k];
    if (CONFIG.ga4 && window.gtag) window.gtag("event", name, params);
    if (CONFIG.fbPixel && window.fbq) window.fbq("trackCustom", name, params);
    if (!CONFIG.ga4 && !CONFIG.fbPixel && window.console) console.debug("[quote-track]", name, params);
  }
  window.__quoteTrack = track;

  // Xem trang
  track("quote_view", { page_title: document.title }, true);

  // Thời gian thực sự ở lại (chỉ tính khi tab đang mở trước mặt)
  var active = 0;
  setInterval(function () {
    if (document.visibilityState !== "visible") return;
    active += 5;
    if (active === 30) track("quote_engaged_30s", null, true);
    if (active === 120) track("quote_engaged_2m", null, true);
    if (active === 300) track("quote_engaged_5m", null, true);
  }, 5000);

  // Đọc tới đâu
  function onScroll() {
    var h = document.documentElement.scrollHeight - window.innerHeight;
    if (h <= 0) return;
    var p = window.scrollY / h;
    if (p >= 0.5) track("quote_scroll_50", null, true);
    if (p >= 0.9) track("quote_scroll_90", null, true);
  }
  window.addEventListener("scroll", onScroll, { passive: true });

  // Những hành động cho thấy khách quan tâm thật
  function label(el) {
    return (el.getAttribute("aria-label") || el.textContent || "").replace(/\s+/g, " ").trim().slice(0, 80);
  }
  document.addEventListener(
    "click",
    function (e) {
      var el = e.target && e.target.closest ? e.target.closest("a,button,[role=radio],label") : null;
      if (!el) return;
      var href = el.getAttribute("href") || "";
      var text = label(el);
      if (/zalo\.me/.test(href) || el.id === "zbtn" || /Zalo/i.test(text)) return track("quote_zalo", { cta: text });
      if (/^tel:/.test(href) || /^Gọi\b/.test(text)) return track("quote_call", { cta: text });
      if (el.id === "cbtn" || /^Chép\b/.test(text)) return track("quote_copy", { cta: text });
      if (/In\s*\/\s*PDF|Tải PDF|In báo giá/i.test(text)) return track("quote_print", { cta: text });
      if (el.getAttribute("role") === "radio") return track("quote_select_package", { option: text });
    },
    true
  );
  // Chọn gói ở báo giá v2 (radio name="setup")
  document.addEventListener("change", function (e) {
    var t = e.target;
    if (t && t.name === "setup") {
      var card = t.closest("label");
      var h3 = card && card.querySelector("h3");
      track("quote_select_package", { option: h3 ? h3.textContent.trim() : t.value });
    }
  });
  window.addEventListener("beforeprint", function () { track("quote_print", { cta: "trình duyệt" }, true); });
})();
