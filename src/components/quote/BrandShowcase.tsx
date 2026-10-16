import { useState, type ReactNode } from "react";
import {
  Camera,
  ThumbsUp,
  Clapperboard,
  ShoppingBag,
  Check,
  X,
  Copy,
  Heart,
  MessageCircle,
  Bookmark,
  Share2,
  Music2,
  Search,
  ShoppingCart,
  Grid3x3,
  Plus,
  Menu,
  ChevronLeft,
} from "lucide-react";
import type { BrandKit, ChannelShowcase, ShowcaseTile } from "../../data/proposalQuoteTypes";

/*
  Bộ nhận diện online + hình ảnh mẫu theo kênh cho trang báo giá riêng.
  Mọi "ảnh" ở đây là đồ hoạ dựng bằng SVG/CSS từ màu và logo trong brandKit,
  để khách hình dung định hướng; ảnh chụp thật làm sau theo quy tắc trong bộ nhận diện.
*/

const isDark = (hex: string) => {
  const h = hex.replace("#", "");
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
  return 0.299 * r + 0.587 * g + 0.114 * b < 140;
};

/* ------------------------------ đồ hoạ ------------------------------ */

export function Hoodie({ color, print, label = "turn", className = "" }: { color: string; print?: string; label?: string; className?: string; key?: string | number }) {
  const ink = print || (isDark(color) ? "#F3ECE0" : "#141414");
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden>
      <path d="M40 30 L22 38 L10 80 L23 84 L32 60 L32 106 L88 106 L88 60 L97 84 L110 80 L98 38 L80 30 Q60 46 40 30 Z" fill={color} />
      <path d="M42 32 Q46 10 60 10 Q74 10 78 32 Q60 44 42 32 Z" fill={color} />
      <path d="M47 30 Q50 16 60 16 Q70 16 73 30 Q60 38 47 30 Z" fill="rgba(0,0,0,.28)" />
      <path d="M55 36 L54 52 M65 36 L66 52" stroke={ink} strokeWidth="1.6" strokeLinecap="round" opacity=".8" />
      <path d="M43 82 L77 82 L81 98 L39 98 Z" fill="rgba(0,0,0,.12)" />
      <rect x="32" y="101" width="56" height="5" fill="rgba(0,0,0,.16)" />
      <path d="M10 80 L23 84 L22 88 L9 84 Z M110 80 L97 84 L98 88 L111 84 Z" fill="rgba(0,0,0,.16)" />
      <text x="60" y="70" textAnchor="middle" fontSize="10" fontWeight="800" fontFamily="Space Grotesk, sans-serif" fill={ink}>
        {label}
      </text>
    </svg>
  );
}

export function Tee({ color, print, label = "turn", className = "" }: { color: string; print?: string; label?: string; className?: string }) {
  const ink = print || (isDark(color) ? "#F3ECE0" : "#141414");
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden>
      <path d="M42 20 L20 30 L8 54 L24 62 L32 48 L32 104 L88 104 L88 48 L96 62 L112 54 L100 30 L78 20 Q60 32 42 20 Z" fill={color} />
      <path d="M46 21 Q60 30 74 21" fill="none" stroke="rgba(0,0,0,.25)" strokeWidth="3" />
      <path d="M8 54 L24 62 L23 65 L7 57 Z M112 54 L96 62 L97 65 L113 57 Z" fill="rgba(0,0,0,.14)" />
      <rect x="32" y="100" width="56" height="4" fill="rgba(0,0,0,.12)" />
      <text x="60" y="58" textAnchor="middle" fontSize="10" fontWeight="800" fontFamily="Space Grotesk, sans-serif" fill={ink}>
        {label}
      </text>
    </svg>
  );
}

export function Sun({ color = "#EE2B2B", bg = "#F3ECE0", className = "" }: { color?: string; bg?: string; className?: string }) {
  const id = `sun-${color.replace("#", "")}-${bg.replace("#", "")}`;
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      <defs>
        <clipPath id={id}>
          <circle cx="50" cy="50" r="46" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${id})`}>
        <rect width="100" height="100" fill={color} />
        {[56, 66, 75, 83, 90].map((y, i) => (
          <rect key={y} x="0" y={y} width="100" height={2.4 + i * 0.5} fill={bg} />
        ))}
      </g>
    </svg>
  );
}

function Wordmark({ text, color, className = "" }: { text: string; color: string; className?: string }) {
  return (
    <span className={`font-display font-bold lowercase tracking-[-0.06em] leading-none ${className}`} style={{ color }}>
      {text}
    </span>
  );
}

function Tile({ t, wordmark, className = "" }: { t: ShowcaseTile; wordmark: string; className?: string; key?: string | number }) {
  const base = `relative aspect-square overflow-hidden flex items-center justify-center ${className}`;
  switch (t.kind) {
    case "wordmark":
      return (
        <div className={base} style={{ background: t.bg }}>
          <Wordmark text={wordmark} color={t.fg} className="text-[26px]" />
        </div>
      );
    case "sun":
      return (
        <div className={base} style={{ background: t.bg }}>
          <Sun color={t.fg} bg={t.bg} className="w-[72%]" />
        </div>
      );
    case "text":
      return (
        <div className={`${base} p-2 text-center`} style={{ background: t.bg }}>
          <span className="font-display font-bold lowercase leading-tight text-[12px]" style={{ color: t.fg }}>
            {t.text}
          </span>
        </div>
      );
    case "texture":
      return (
        <div
          className={base}
          style={{
            background: `repeating-linear-gradient(45deg, ${t.bg} 0 3px, rgba(0,0,0,.08) 3px 4px), ${t.bg}`,
          }}
        >
          <span className="rounded-[2px] px-1.5 py-0.5 text-[8px] font-bold tracking-widest shadow" style={{ background: t.fg, color: t.bg }}>
            {t.text || wordmark}
          </span>
        </div>
      );
    default:
      return (
        <div className={base} style={{ background: t.bg }}>
          {t.kind === "tee" ? (
            <Tee color={t.fg} className="w-[74%] drop-shadow-md" label={wordmark} />
          ) : (
            <Hoodie color={t.fg} className="w-[78%] drop-shadow-md" label={wordmark} />
          )}
          {t.text && (
            <span className="absolute bottom-1 inset-x-0 text-center text-[6px] font-bold tracking-[0.2em]" style={{ color: isDark(t.bg) ? "#F3ECE0" : "#141414" }}>
              {t.text}
            </span>
          )}
        </div>
      );
  }
}

/* ------------------------------ bộ nhận diện ------------------------------ */

function Box({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`bg-white rounded-xl border border-black/[0.06] shadow-[0_1px_2px_rgba(0,0,0,0.04)] ${className}`}>{children}</div>;
}

function Label({ children }: { children: ReactNode }) {
  return <p className="font-mono text-[10px] uppercase tracking-widest text-gray-500 mb-3">{children}</p>;
}

export function BrandKitSection({ k }: { k: BrandKit }) {
  const [copied, setCopied] = useState<string | null>(null);
  const [bg, ink, accent] = [k.colors[0]?.hex || "#F3ECE0", k.colors[1]?.hex || "#141414", k.colors[2]?.hex || "#EE2B2B"];
  const copy = (hex: string) => {
    navigator.clipboard?.writeText(hex).then(() => {
      setCopied(hex);
      setTimeout(() => setCopied(null), 1500);
    });
  };

  return (
    <div>
      <p className="text-[15px] sm:text-base leading-relaxed text-gray-700 max-w-3xl">{k.lead}</p>

      {k.coverImage && (
        <figure className="mt-6">
          <img src={k.coverImage} alt={`Ảnh nhận diện ${k.wordmark}`} className="w-full rounded-xl border border-black/[0.06] shadow-sm" loading="lazy" />
          <figcaption className="mt-2 text-[12px] text-gray-500">Ảnh nhận diện gốc của Turn — nguồn cho màu, chữ và hoạ tiết bên dưới.</figcaption>
        </figure>
      )}

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-3">
        <Box className="p-5">
          <Label>Logo & khẩu hiệu</Label>
          <div className="grid grid-cols-3 gap-2">
            {[
              [bg, ink],
              [ink, bg],
              [accent, bg],
            ].map(([b, f]) => (
              <div key={b + f} className="aspect-[4/3] rounded-lg flex items-center justify-center border border-black/[0.05]" style={{ background: b }}>
                <Wordmark text={k.wordmark} color={f} className="text-3xl sm:text-4xl" />
              </div>
            ))}
          </div>
          {k.tagline && (
            <p className="mt-4 text-sm text-gray-600">
              Khẩu hiệu gợi ý: <span className="font-display font-bold text-gray-900">{k.tagline}</span>
            </p>
          )}
        </Box>

        <Box className="p-5">
          <Label>Bảng màu · bấm để chép mã</Label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {k.colors.map((c) => (
              <button key={c.hex} onClick={() => copy(c.hex)} className="group text-left rounded-lg overflow-hidden border border-black/[0.06] hover:shadow-md transition-shadow">
                <span className="relative block h-16" style={{ background: c.hex }}>
                  <span
                    className="absolute right-1.5 top-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ color: isDark(c.hex) ? "#fff" : "#141414" }}
                  >
                    {copied === c.hex ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  </span>
                </span>
                <span className="block p-2">
                  <span className="block text-[12px] font-semibold">{c.name}</span>
                  <span className="block font-mono text-[11px] text-gray-500">{copied === c.hex ? "Đã chép" : c.hex}</span>
                  <span className="block mt-1 text-[11px] leading-snug text-gray-500">{c.use}</span>
                </span>
              </button>
            ))}
          </div>
        </Box>

        {k.fonts?.length ? (
          <Box className="p-5">
            <Label>Kiểu chữ</Label>
            <div className="space-y-3">
              {k.fonts.map((f, i) => (
                <div key={f.name} className="rounded-lg bg-[#F8F5EF] p-4">
                  <p className={i === 0 ? "font-display text-3xl font-bold lowercase tracking-tight" : "text-lg font-medium"} style={{ color: ink }}>
                    {f.sample}
                  </p>
                  <p className="mt-2 text-[12px] text-gray-600">
                    <b className="text-gray-800">{f.name}</b> · {f.use}
                  </p>
                </div>
              ))}
            </div>
          </Box>
        ) : null}

        {k.motif && (
          <Box className="p-5">
            <Label>Hoạ tiết nhận diện</Label>
            <div className="flex gap-4 items-start">
              <Sun color={accent} bg="#fff" className="h-20 w-20 shrink-0" />
              <div>
                <p className="font-semibold">{k.motif.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-gray-600">{k.motif.text}</p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[11px] text-gray-500">
              <div>
                <div className="mx-auto h-14 w-14 rounded-full flex items-center justify-center" style={{ background: ink }}>
                  <Sun color={accent} bg={ink} className="h-10 w-10" />
                </div>
                <p className="mt-1.5">Avatar</p>
              </div>
              <div>
                <div className="mx-auto h-14 w-14 rounded-full border-2 border-dashed flex flex-col items-center justify-center" style={{ background: bg, borderColor: ink }}>
                  <Wordmark text={k.wordmark} color={ink} className="text-sm" />
                  <span className="text-[6px] font-bold tracking-widest" style={{ color: accent }}>
                    COLLECTION
                  </span>
                </div>
                <p className="mt-1.5">Tem túi hàng</p>
              </div>
              <div>
                <div className="mx-auto h-14 w-9 rounded-md overflow-hidden flex flex-col items-center justify-end pb-1" style={{ background: bg }}>
                  <Sun color={accent} bg={bg} className="h-6 w-6" />
                  <span className="text-[5px] font-bold mt-0.5" style={{ color: ink }}>
                    NEW DROP
                  </span>
                </div>
                <p className="mt-1.5">Khung story</p>
              </div>
            </div>
          </Box>
        )}
      </div>

      {k.photoRules && (
        <Box className="mt-3 p-5">
          <Label>Quy tắc hình ảnh</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-lg border border-emerald-200 bg-emerald-50/50 p-4">
              <p className="text-sm font-semibold text-emerald-800 mb-2">Nên</p>
              <ul className="space-y-1.5">
                {k.photoRules.do.map((x) => (
                  <li key={x} className="flex gap-2 text-sm text-gray-700">
                    <Check className="h-4 w-4 mt-0.5 shrink-0 text-emerald-600" /> {x}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg border border-red-200 bg-red-50/50 p-4">
              <p className="text-sm font-semibold text-red-800 mb-2">Không nên</p>
              <ul className="space-y-1.5">
                {k.photoRules.dont.map((x) => (
                  <li key={x} className="flex gap-2 text-sm text-gray-700">
                    <X className="h-4 w-4 mt-0.5 shrink-0 text-red-600" /> {x}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Box>
      )}

      {k.voice && <VoiceBox voice={k.voice} />}

      {k.reference && (
        <Box className="mt-3 p-5 grid grid-cols-1 md:grid-cols-[minmax(0,300px)_1fr] gap-5 items-center">
          <img src={k.reference.image} alt="Moodboard tham khảo lưới Instagram" className="w-full max-w-[300px] mx-auto rounded-lg border border-black/[0.06]" loading="lazy" />
          <div>
            <Label>Moodboard tham khảo</Label>
            <p className="text-[15px] leading-relaxed text-gray-700">{k.reference.caption}</p>
            <div className="mt-4 flex items-center gap-2">
              {k.colors.slice(0, 3).map((c) => (
                <span key={c.hex} className="h-6 w-6 rounded-full border border-black/10" style={{ background: c.hex }} title={c.name} />
              ))}
              <span className="text-[12px] text-gray-500">→ bộ màu áp dụng cho Turn</span>
            </div>
          </div>
        </Box>
      )}
    </div>
  );
}

function VoiceBox({ voice }: { voice: NonNullable<BrandKit["voice"]> }) {
  const [showGood, setShowGood] = useState(true);
  return (
    <Box className="mt-3 p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Label>Giọng văn</Label>
        {voice.examples?.length ? (
          <div className="inline-flex rounded-full bg-gray-100 p-1 text-[12px] font-semibold print:hidden -mt-3">
            <button onClick={() => setShowGood(false)} className={`rounded-full px-3 py-1 ${!showGood ? "bg-white text-red-700 shadow" : "text-gray-500"}`}>
              Cách thường thấy
            </button>
            <button onClick={() => setShowGood(true)} className={`rounded-full px-3 py-1 ${showGood ? "bg-white text-emerald-700 shadow" : "text-gray-500"}`}>
              Cách của Turn
            </button>
          </div>
        ) : null}
      </div>
      <div className="flex flex-wrap gap-2">
        {voice.traits.map((t) => (
          <span key={t} className="rounded-full bg-[#141414] text-white px-3 py-1 text-[12px] font-semibold">
            {t}
          </span>
        ))}
      </div>
      {voice.examples?.length ? (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
          {voice.examples.map((e) => (
            <div
              key={e.good}
              className={`rounded-lg border p-4 text-[15px] leading-relaxed transition-colors duration-300 ${
                showGood ? "border-emerald-200 bg-emerald-50/40 text-gray-800" : "border-red-200 bg-red-50/40 text-gray-600"
              }`}
            >
              <span key={String(showGood)} className="block animate-[fadeUp_.3s_ease_both]">
                {showGood ? e.good : e.bad}
              </span>
            </div>
          ))}
        </div>
      ) : null}
    </Box>
  );
}

/* ------------------------------ mockup theo kênh ------------------------------ */

const CH_ICON = { instagram: Camera, facebook: ThumbsUp, tiktok: Clapperboard, shopee: ShoppingBag };

function Phone({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <div className="relative mx-auto w-[264px] shrink-0 rounded-[2.3rem] bg-[#0b0b0b] p-[9px] shadow-[0_20px_50px_-15px_rgba(0,0,0,.45)]">
      <div className={`relative h-[540px] overflow-hidden rounded-[1.8rem] ${dark ? "bg-black" : "bg-white"}`}>
        <div className="absolute top-2 left-1/2 -translate-x-1/2 h-[18px] w-[72px] rounded-full bg-black z-30" />
        <div className="h-full overflow-y-auto overscroll-contain [scrollbar-width:none]">{children}</div>
      </div>
    </div>
  );
}

function InstagramMock({ s, k }: { s: ChannelShowcase; k: BrandKit }) {
  const ink = k.colors[1]?.hex || "#141414";
  const accent = k.colors[2]?.hex || "#EE2B2B";
  return (
    <div className="min-h-full pb-2 text-[11px] text-gray-900">
      <div className="pt-8 px-3 pb-2 flex items-center justify-between">
        <span className="font-bold text-[13px]">{s.handle}</span>
        <span className="flex gap-2.5 text-gray-800">
          <Plus className="h-4 w-4" />
          <Menu className="h-4 w-4" />
        </span>
      </div>
      <div className="px-3 flex items-center gap-3">
        <div className="h-[58px] w-[58px] rounded-full p-[2px] bg-gradient-to-tr from-amber-400 via-red-500 to-fuchsia-600">
          <div className="h-full w-full rounded-full border-2 border-white flex items-center justify-center" style={{ background: ink }}>
            <Sun color={accent} bg={ink} className="h-9 w-9" />
          </div>
        </div>
        <div className="flex-1 grid grid-cols-3 text-center leading-tight">
          {["bài viết", "người theo dõi", "đang theo dõi"].map((l) => (
            <div key={l}>
              <p className="font-bold text-[12px]">—</p>
              <p className="text-[9px] text-gray-600">{l}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="px-3 mt-2 leading-snug">
        {s.bio?.map((b, i) => (
          <p key={b} className={i === 0 ? "font-semibold" : "text-gray-700"}>
            {b}
          </p>
        ))}
        <p className="text-[#00376b] font-medium">turnapparel.vn</p>
      </div>
      <div className="px-3 mt-2 grid grid-cols-2 gap-1.5">
        <span className="rounded-md bg-gray-100 py-1.5 text-center font-semibold">Theo dõi</span>
        <span className="rounded-md bg-gray-100 py-1.5 text-center font-semibold">Nhắn tin</span>
      </div>
      <div className="px-2 mt-3 flex gap-2.5 overflow-hidden">
        {s.highlights?.map((h, i) => (
          <div key={h} className="text-center shrink-0 w-[46px]">
            <div className="mx-auto h-[42px] w-[42px] rounded-full border border-gray-300 p-[2px]">
              <div className="h-full w-full rounded-full flex items-center justify-center" style={{ background: i % 2 ? "#F3ECE0" : ink }}>
                <Wordmark text={k.wordmark[0]} color={i % 2 ? ink : accent} className="text-base" />
              </div>
            </div>
            <p className="mt-1 text-[8.5px] truncate">{h}</p>
          </div>
        ))}
      </div>
      <div className="mt-3 flex border-t border-gray-200">
        <span className="flex-1 flex justify-center py-1.5 border-b border-gray-900">
          <Grid3x3 className="h-4 w-4" />
        </span>
        <span className="flex-1 flex justify-center py-1.5 text-gray-400">
          <Clapperboard className="h-4 w-4" />
        </span>
      </div>
      <div className="grid grid-cols-3 gap-[2px]">
        {s.igTiles.slice(0, 9).map((t, i) => (
          <Tile key={i} t={t} wordmark={k.wordmark} />
        ))}
      </div>
    </div>
  );
}

function FacebookMock({ s, k, caption }: { s: ChannelShowcase; k: BrandKit; caption: string }) {
  const [bg, ink, accent] = [k.colors[0]?.hex || "#F3ECE0", k.colors[1]?.hex || "#141414", k.colors[2]?.hex || "#EE2B2B"];
  return (
    <div className="min-h-full pb-2 text-[11px] text-gray-900 bg-[#F0F2F5]">
      <div className="bg-white pt-8 px-3 pb-2 flex items-center justify-between">
        <span className="font-bold text-[17px] text-[#1877F2] tracking-tight">facebook</span>
        <Search className="h-4 w-4 text-gray-700" />
      </div>
      <div className="bg-white pb-3">
        <div className="relative h-[86px] overflow-hidden" style={{ background: bg }}>
          <Wordmark text={k.wordmark} color={ink} className="absolute left-3 top-3 text-[34px]" />
          <Sun color={accent} bg={bg} className="absolute -right-6 -top-4 h-[120px] w-[120px]" />
        </div>
        <div className="px-3 -mt-7 relative">
          <div className="h-[60px] w-[60px] rounded-full border-[3px] border-white flex items-center justify-center" style={{ background: ink }}>
            <Sun color={accent} bg={ink} className="h-9 w-9" />
          </div>
          <p className="mt-1 font-bold text-[15px]">Turn Apparel</p>
          <p className="text-gray-500 text-[10px]">Thương hiệu quần áo · streetwear</p>
          <div className="mt-2 grid grid-cols-2 gap-1.5">
            <span className="rounded-md bg-[#1877F2] text-white py-1.5 text-center font-semibold flex items-center justify-center gap-1">
              <MessageCircle className="h-3 w-3" /> Nhắn tin
            </span>
            <span className="rounded-md bg-gray-200 py-1.5 text-center font-semibold">Mua ngay</span>
          </div>
        </div>
      </div>
      <div className="mt-2 bg-white px-3 pt-2.5">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-full flex items-center justify-center" style={{ background: ink }}>
            <Sun color={accent} bg={ink} className="h-4 w-4" />
          </div>
          <div className="leading-tight">
            <p className="font-semibold">Turn Apparel</p>
            <p className="text-[9px] text-gray-500">Vừa xong · 🌐</p>
          </div>
        </div>
        <p className="mt-2 whitespace-pre-line leading-snug line-clamp-4">{caption}</p>
        <div className="mt-2 -mx-3 grid grid-cols-2 gap-[2px]">
          <Tile t={{ kind: "hoodie", bg, fg: s.products[0]?.color || ink, text: "RETROVISION" }} wordmark={k.wordmark} />
          <Tile t={{ kind: "texture", bg: "#8A857D", fg: bg, text: k.wordmark }} wordmark={k.wordmark} />
        </div>
        <div className="flex justify-around py-2 text-gray-600 border-t border-gray-100 mt-1">
          <span className="flex items-center gap-1">
            <ThumbsUp className="h-3.5 w-3.5" /> Thích
          </span>
          <span className="flex items-center gap-1">
            <MessageCircle className="h-3.5 w-3.5" /> Bình luận
          </span>
          <span className="flex items-center gap-1">
            <Share2 className="h-3.5 w-3.5" /> Chia sẻ
          </span>
        </div>
      </div>
    </div>
  );
}

function TikTokMock({ s, k, caption, hashtags }: { s: ChannelShowcase; k: BrandKit; caption: string; hashtags?: string[] }) {
  const [bg, ink, accent] = [k.colors[0]?.hex || "#F3ECE0", k.colors[1]?.hex || "#141414", k.colors[2]?.hex || "#EE2B2B"];
  const p = s.products[0];
  const ways = ["đi làm", "cà phê", "đi tối"];
  const [way, setWay] = useState(0);
  return (
    <div className="relative h-full overflow-hidden text-white" style={{ background: `radial-gradient(circle at 50% 38%, ${bg} 0, #b9b0a2 45%, #2a2622 100%)` }}>
      <div className="absolute top-8 inset-x-0 flex justify-center gap-4 text-[12px] font-semibold z-10">
        <span className="opacity-60">Đã follow</span>
        <span className="border-b-2 border-white pb-0.5">Dành cho bạn</span>
      </div>
      <div className="absolute top-[64px] left-3 z-10">
        <p className="font-display font-bold text-[22px] leading-[1.05] drop-shadow" style={{ color: ink }}>
          1 hoodie
          <br />
          <span className="px-1" style={{ background: accent, color: bg }}>
            5 cách mặc
          </span>
        </p>
      </div>
      <button onClick={() => setWay((w) => (w + 1) % ways.length)} className="absolute inset-x-0 top-[120px] flex flex-col items-center" aria-label="Đổi cách phối">
        <Hoodie key={way} color={[ink, accent, "#8A857D"][way]} label={k.wordmark} className="w-[170px] drop-shadow-2xl animate-[fadeUp_.35s_ease_both]" />
        <span className="mt-1 rounded-full bg-black/55 px-3 py-1 text-[11px] font-semibold">
          cách {way + 1}: {ways[way]} · chạm để đổi
        </span>
      </button>
      <div className="absolute right-2 bottom-[150px] flex flex-col items-center gap-3.5 z-10">
        <div className="h-9 w-9 rounded-full border-2 border-white flex items-center justify-center" style={{ background: ink }}>
          <Sun color={accent} bg={ink} className="h-6 w-6" />
        </div>
        {[Heart, MessageCircle, Bookmark, Share2].map((I, i) => (
          <I key={i} className="h-6 w-6 drop-shadow" fill={i === 0 ? "white" : "none"} />
        ))}
      </div>
      <div className="absolute inset-x-0 bottom-0 p-3 pr-12 pb-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-[11px]">
        {p && (
          <div className="mb-2 inline-flex items-center gap-1.5 rounded-md bg-white/95 px-2 py-1 text-gray-900">
            <ShoppingCart className="h-3.5 w-3.5 text-[#FE2C55]" />
            <span className="font-semibold truncate max-w-[92px]">{p.name}</span>
            <span className="font-bold text-[#FE2C55]">{p.price}</span>
          </div>
        )}
        <p className="font-bold">@{s.handle}</p>
        <p className="mt-0.5 leading-snug line-clamp-2">{caption}</p>
        {hashtags?.length ? <p className="mt-0.5 font-semibold">{hashtags.join(" ")}</p> : null}
        <p className="mt-1.5 flex items-center gap-1 opacity-90">
          <Music2 className="h-3 w-3" /> âm thanh thịnh hành · Turn Apparel
        </p>
      </div>
    </div>
  );
}

function ShopeeMock({ s, k }: { s: ChannelShowcase; k: BrandKit }) {
  const [bg, ink, accent] = [k.colors[0]?.hex || "#F3ECE0", k.colors[1]?.hex || "#141414", k.colors[2]?.hex || "#EE2B2B"];
  return (
    <div className="min-h-full pb-2 text-[10px] text-gray-900 bg-[#F5F5F5]">
      <div className="bg-[#EE4D2D] pt-8 px-2.5 pb-2 flex items-center gap-2 text-white">
        <ChevronLeft className="h-4 w-4" />
        <span className="flex-1 flex items-center gap-1.5 rounded-sm bg-white px-2 py-1 text-gray-500">
          <Search className="h-3 w-3" /> turn apparel
        </span>
        <ShoppingCart className="h-4 w-4" />
      </div>
      <div className="relative h-[92px] overflow-hidden" style={{ background: ink }}>
        <Sun color={accent} bg={ink} className="absolute -right-5 -top-6 h-[120px] w-[120px] opacity-90" />
        <div className="absolute left-2.5 bottom-2.5 flex items-center gap-2">
          <div className="h-11 w-11 rounded-full border-2 border-white flex items-center justify-center" style={{ background: bg }}>
            <Wordmark text={k.wordmark} color={ink} className="text-[13px]" />
          </div>
          <div className="text-white leading-tight">
            <p className="font-bold text-[12px]">Turn Apparel</p>
            <p className="opacity-80 text-[9px]">Streetwear · hoodie chữ ký</p>
          </div>
        </div>
        <span className="absolute right-2.5 top-2.5 rounded-sm border border-white bg-black/30 text-white px-2 py-0.5 font-semibold">+ Theo dõi</span>
      </div>
      <div className="bg-white flex text-center font-semibold">
        {["Shop", "Sản phẩm", "Danh mục"].map((t, i) => (
          <span key={t} className={`flex-1 py-2 ${i === 1 ? "text-[#EE4D2D] border-b-2 border-[#EE4D2D]" : "text-gray-600"}`}>
            {t}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-1.5 p-1.5">
        {s.products.slice(0, 4).map((p) => (
          <div key={p.name} className="bg-white rounded-sm overflow-hidden">
            <div className="relative">
              <Tile t={{ kind: p.kind || "hoodie", bg, fg: p.color }} wordmark={k.wordmark} />
              {p.tag && (
                <span className="absolute left-0 top-1.5 px-1.5 py-0.5 text-[8px] font-bold text-white" style={{ background: accent }}>
                  {p.tag}
                </span>
              )}
            </div>
            <div className="p-1.5">
              <p className="leading-tight line-clamp-2 min-h-[2.4em]">
                <b>[Turn]</b> {p.name}
              </p>
              <p className="mt-1 font-semibold text-[#EE4D2D] text-[11px]">{p.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ChannelShowcaseSection({ s, k }: { s: ChannelShowcase; k: BrandKit }) {
  const [idx, setIdx] = useState(0);
  const ch = s.channels[idx];

  const mock = (() => {
    switch (ch.type) {
      case "instagram":
        return <InstagramMock s={s} k={k} />;
      case "facebook":
        return <FacebookMock s={s} k={k} caption={ch.caption} />;
      case "tiktok":
        return <TikTokMock s={s} k={k} caption={ch.caption} hashtags={ch.hashtags} />;
      default:
        return <ShopeeMock s={s} k={k} />;
    }
  })();

  return (
    <div>
      <p className="text-[15px] sm:text-base leading-relaxed text-gray-700 max-w-3xl">{s.lead}</p>

      <div className="mt-6 flex gap-1.5 overflow-x-auto [scrollbar-width:none] print:hidden">
        {s.channels.map((c, i) => {
          const Icon = CH_ICON[c.type];
          return (
            <button
              key={c.name}
              onClick={() => setIdx(i)}
              className={`shrink-0 inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[13px] font-semibold border transition-all ${
                i === idx ? "bg-[#141414] text-white border-[#141414] shadow" : "bg-white border-black/[0.08] text-gray-600 hover:border-gray-400"
              }`}
            >
              <Icon className="h-4 w-4" /> {c.name}
            </button>
          );
        })}
      </div>

      <div className="mt-4 rounded-2xl bg-white border border-black/[0.06] p-5 sm:p-7 grid grid-cols-1 md:grid-cols-[264px_1fr] gap-6 md:gap-8 items-start">
        <div key={ch.type} className="animate-[fadeUp_.4s_ease_both]">
          <Phone dark={ch.type === "tiktok"}>{mock}</Phone>
          <p className="mt-3 text-center text-[11px] text-gray-400">Hình minh hoạ định hướng · không phải ảnh thật</p>
        </div>

        <div key={`p-${ch.type}`} className="animate-[fadeUp_.4s_ease_both] min-w-0">
          <p className="font-mono text-[10px] uppercase tracking-widest text-brand-primary">Vai trò</p>
          <h3 className="font-display text-2xl font-bold mt-1">{ch.name}</h3>
          <p className="mt-2 text-[15px] leading-relaxed text-gray-700">{ch.role}</p>

          <div className="mt-5 rounded-xl bg-[#F8F5EF] p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">{ch.type === "shopee" ? "Tên sản phẩm mẫu" : "Caption mẫu"}</p>
            <p className="whitespace-pre-line text-[15px] leading-relaxed text-gray-900">{ch.caption}</p>
            {ch.hashtags?.length ? <p className="mt-2 text-sm font-semibold text-sky-700">{ch.hashtags.join(" ")}</p> : null}
          </div>

          <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">Điểm nhận diện cần giữ</p>
          <ul className="space-y-2">
            {ch.rules.map((r) => (
              <li key={r} className="flex gap-2 text-sm text-gray-700">
                <Check className="h-4 w-4 mt-0.5 shrink-0 text-brand-primary" /> {r}
              </li>
            ))}
          </ul>

          {(ch.type === "shopee" || ch.type === "tiktok") && s.products.length > 0 && (
            <div className="mt-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">Sản phẩm & giá trên gian hàng</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {s.products.map((p) => (
                  <div key={p.name} className="rounded-lg border border-black/[0.06] overflow-hidden">
                    <Tile t={{ kind: p.kind || "hoodie", bg: k.colors[0]?.hex || "#F3ECE0", fg: p.color }} wordmark={k.wordmark} />
                    <div className="p-2">
                      <p className="text-[12px] leading-tight line-clamp-2 min-h-[2.4em]">{p.name}</p>
                      <p className="mt-1 text-[13px] font-bold text-brand-primary">{p.price}</p>
                    </div>
                  </div>
                ))}
              </div>
              {s.priceNote && <p className="mt-3 text-[12px] italic text-gray-500 leading-relaxed">{s.priceNote}</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
