import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useParams } from "react-router-dom";
import {
  Globe,
  ShoppingBag,
  Clapperboard,
  ThumbsUp,
  Camera,
  MapPin,
  MessageCircle,
  CirclePlay,
  Radio,
  ArrowRight,
  Check,
  Lock,
  LockOpen,
  Printer,
  Phone,
  Copy,
  Sparkles,
  Wrench,
  RotateCcw,
} from "lucide-react";
import { socialConfig } from "../config/social";
import type { ProposalQuote, QuoteChannelType } from "../data/proposalQuoteTypes";

/*
  Trang đề xuất & báo giá gửi riêng khách hàng — không menu, không lập chỉ mục.
  Dữ liệu tải từ public/kh-data/<slug>.json (giống trang kế hoạch đa kênh),
  nên nội dung báo giá không nằm trong bundle JS chung.
*/

const CHANNEL_ICON: Record<QuoteChannelType, typeof Globe> = {
  website: Globe,
  shopee: ShoppingBag,
  tiktok: Clapperboard,
  facebook: ThumbsUp,
  instagram: Camera,
  google: MapPin,
  zalo: MessageCircle,
  youtube: CirclePlay,
  other: Radio,
};

const vnd = (n: number) => `${Math.round(n).toLocaleString("vi-VN")}đ`;

type LoadState = { status: "loading" } | { status: "missing" } | { status: "ready"; quote: ProposalQuote };

/* ------------------------------ hooks ------------------------------ */

function useNoIndex() {
  useEffect(() => {
    let tag = document.querySelector<HTMLMetaElement>("meta[name='robots']");
    const created = !tag;
    const previous = tag?.getAttribute("content") ?? null;
    if (!tag) {
      tag = document.createElement("meta");
      tag.setAttribute("name", "robots");
      document.head.appendChild(tag);
    }
    tag.setAttribute("content", "noindex, nofollow, noarchive");
    return () => {
      if (!tag) return;
      if (created) tag.remove();
      else if (previous !== null) tag.setAttribute("content", previous);
    };
  }, []);
}

function useInView<T extends Element>(threshold = 0.3) {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    if (!("IntersectionObserver" in window)) {
      setSeen(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [seen, threshold]);
  return [ref, seen] as const;
}

// Nội suy mượt một dãy số tới giá trị đích (dùng cho radar, thanh, bộ đếm)
function useTween(target: number[], ms = 650) {
  const [vals, setVals] = useState(target);
  const current = useRef(target);
  const key = target.join(",");
  useEffect(() => {
    const from = current.current;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const k = Math.min(1, (t - start) / ms);
      const e = 1 - Math.pow(1 - k, 3);
      const next = target.map((v, i) => (from[i] ?? 0) + (v - (from[i] ?? 0)) * e);
      current.current = next;
      setVals(next);
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, ms]);
  return vals;
}

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
}

/* ------------------------------ page ------------------------------ */

export default function BaoGiaKhachHang() {
  const { slug = "" } = useParams();
  const [state, setState] = useState<LoadState>({ status: "loading" });

  useNoIndex();

  useEffect(() => {
    if (!/^[a-z0-9-]{4,80}$/.test(slug)) {
      setState({ status: "missing" });
      return;
    }
    let cancelled = false;
    setState({ status: "loading" });
    fetch(`/kh-data/${slug}.json`, { cache: "no-cache" })
      .then((res) => {
        const type = res.headers.get("content-type") || "";
        if (!res.ok || !type.includes("json")) throw new Error("not found");
        return res.json() as Promise<ProposalQuote>;
      })
      .then((quote) => {
        if (cancelled) return;
        if (!quote?.client?.name || !quote.pricing?.setup || !Array.isArray(quote.intro)) throw new Error("invalid");
        setState({ status: "ready", quote });
      })
      .catch(() => {
        if (!cancelled) setState({ status: "missing" });
      });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  useEffect(() => {
    if (state.status === "ready") document.title = `${state.quote.client.name} × Duy Web — ${state.quote.title}`;
    else if (state.status === "missing") document.title = "Không tìm thấy tài liệu";
  }, [state]);

  if (state.status === "loading") {
    return (
      <div className="min-h-screen bg-[#F4EFE6] flex items-center justify-center">
        <div className="h-6 w-6 rounded-full border-2 border-gray-300 border-t-brand-primary animate-spin" aria-label="Đang tải" />
      </div>
    );
  }

  if (state.status === "missing") {
    return (
      <div className="min-h-screen bg-[#F4EFE6] flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-gray-500 mb-3">Tài liệu riêng</p>
          <h1 className="font-display text-2xl font-bold text-brand-dark mb-3">Liên kết không hợp lệ hoặc đã hết hạn</h1>
          <p className="text-sm text-gray-600 leading-relaxed">
            Vui lòng kiểm tra lại đường dẫn hoặc liên hệ {socialConfig.phoneDisplay} để nhận liên kết mới.
          </p>
        </div>
      </div>
    );
  }

  return <QuoteDocument quote={state.quote} />;
}

/* ---------------------------- document ---------------------------- */

type Section = { id: string; nav: string; title: string; render: () => ReactNode };

function QuoteDocument({ quote: q }: { quote: ProposalQuote }) {
  const sections: Section[] = [];
  sections.push({ id: "mo-dau", nav: "Lời mở đầu", title: "Lời mở đầu", render: () => <IntroSection q={q} /> });
  if (q.market) sections.push({ id: "thi-truong", nav: "Thị trường", title: "Thị trường local brand Việt", render: () => <MarketSection m={q.market!} /> });
  if (q.testLearn) sections.push({ id: "do-roi-lam", nav: "Đo rồi mới làm", title: "Vì sao phải làm marketing để hiểu thị trường", render: () => <TestLearnSection t={q.testLearn!} /> });
  if (q.positioning) sections.push({ id: "doi-thu", nav: "Bản đồ đối thủ", title: `Bản đồ đối thủ và vị trí của ${q.client.name.split(" ")[0]}`, render: () => <PositioningSection p={q.positioning!} /> });
  if (q.channelReviews) sections.push({ id: "danh-gia-kenh", nav: "Đánh giá 6 kênh", title: "Đánh giá thị trường qua từng kênh công nghệ", render: () => <ChannelReviewSection c={q.channelReviews!} brand={q.client.name.split(" ")[0]} /> });
  if (q.audit) sections.push({ id: "hien-trang", nav: "Hiện trạng website", title: `Hiện trạng ${q.client.website || "website"}`, render: () => <AuditSection a={q.audit!} /> });
  if (q.story) sections.push({ id: "hinh-anh", nav: "Hình ảnh & câu chuyện", title: "Định hướng hình ảnh và câu chuyện", render: () => <StorySection s={q.story!} /> });
  if (q.loop) sections.push({ id: "dong-hanh", nav: "Vòng lặp đồng hành", title: "Ưu tiên dịch vụ: đồng hành để ra quyết định đúng", render: () => <LoopSection l={q.loop!} /> });
  if (q.stages) sections.push({ id: "100-don", nav: "Đến 100 đơn", title: "Từ đơn đầu tiên đến 100 đơn", render: () => <StagesSection s={q.stages!} /> });
  if (q.roadmap) sections.push({ id: "lo-trinh", nav: "Lộ trình 4 tuần", title: `Lộ trình triển khai ${q.roadmap.weeks.length} tuần`, render: () => <RoadmapSection r={q.roadmap!} /> });
  sections.push({ id: "chi-phi", nav: "Chi phí", title: "Chi phí", render: () => <PricingSection q={q} /> });
  if (q.partners?.length) sections.push({ id: "don-vi", nav: "Đơn vị đã đồng hành", title: "Các đơn vị bên em đã đồng hành", render: () => <PartnersSection q={q} /> });
  if (q.why?.length || q.nextSteps?.length) sections.push({ id: "buoc-tiep", nav: "Bước tiếp theo", title: "Vì sao chọn Duy Web và bước tiếp theo", render: () => <NextSection q={q} /> });

  const active = useActiveSection(sections.map((s) => s.id));
  const progress = useScrollProgress();

  return (
    <div className="min-h-screen bg-[#F4EFE6] text-brand-dark print:bg-white">
      <div className="fixed top-0 inset-x-0 h-1 z-50 bg-transparent print:hidden">
        <div className="h-full bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent origin-left" style={{ transform: `scaleX(${progress})` }} />
      </div>

      <Cover q={q} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:grid lg:grid-cols-[190px_minmax(0,1fr)] lg:gap-10 pb-24">
        <nav aria-label="Mục lục" className="hidden lg:block print:hidden">
          <ol className="sticky top-8 pt-12 space-y-1 text-[13px]">
            {sections.map((s, i) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className={`flex items-baseline gap-2 rounded px-2 py-1.5 transition-colors ${
                    active === s.id ? "bg-white text-brand-dark font-semibold shadow-sm" : "text-gray-500 hover:text-brand-dark"
                  }`}
                >
                  <span className={`font-mono text-[11px] tabular-nums ${active === s.id ? "text-brand-primary" : ""}`}>{String(i + 1).padStart(2, "0")}</span>
                  {s.nav}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <main>
          {sections.map((s, i) => (
            <section key={s.id} id={s.id} className="scroll-mt-6 pt-12 sm:pt-16 break-inside-avoid-page">
              <header className="flex items-baseline gap-3 sm:gap-4 mb-6">
                <span className="font-mono text-sm font-semibold text-brand-primary tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <h2 className="font-display text-[22px] sm:text-3xl font-bold tracking-tight leading-tight">{s.title}</h2>
              </header>
              {s.render()}
            </section>
          ))}
          <DocFooter q={q} />
        </main>
      </div>
    </div>
  );
}

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  const key = ids.join("|");
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -65% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
  return active;
}

function useScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const on = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setP(h > 0 ? Math.min(1, window.scrollY / h) : 0);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
    };
  }, []);
  return p;
}

/* ------------------------------ cover ------------------------------ */

function Cover({ q }: { q: ProposalQuote }) {
  const [ref, seen] = useInView<HTMLDivElement>(0.2);
  const [amount] = useTween([seen && q.headline ? q.headline.amount : 0], 1400);
  const meta: [string, string | undefined][] = [
    ["Ngày lập", q.preparedDate],
    ["Người lập", q.preparedBy],
    ["Hiệu lực đến", q.validUntil],
  ];
  return (
    <header className="relative bg-brand-dark text-white overflow-hidden">
      <div aria-hidden className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:28px_28px]" />
      <div aria-hidden className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-brand-secondary/30 blur-3xl animate-pulse" />
      <div aria-hidden className="absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-brand-primary/25 blur-3xl" />

      <div ref={ref} className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-10 sm:pt-16 pb-10 sm:pb-14">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-10">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-accent">{q.title}</span>
          <div className="flex items-center gap-2 print:hidden">
            {q.isSample && <span className="font-mono text-[10px] uppercase tracking-widest bg-white/10 border border-white/20 px-2 py-0.5 rounded-sm">Bản mẫu</span>}
            <button onClick={() => window.print()} className="inline-flex items-center gap-1.5 text-xs text-gray-300 hover:text-white border border-white/20 rounded px-2.5 py-1.5">
              <Printer className="h-3.5 w-3.5" /> In / PDF
            </button>
          </div>
        </div>

        <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight leading-[1.04]">
          {q.client.name} <span className="text-brand-secondary">×</span> Duy Web
        </h1>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          {q.strengths?.length ? (
            <div>
              <p className="text-sm text-gray-400 mb-3">{q.client.name.split(" ")[0]} đã có những thứ nhiều local brand mất vài năm mới có:</p>
              <ul className="flex flex-wrap gap-2">
                {q.strengths.map((s, i) => (
                  <li
                    key={s}
                    className="text-[13px] bg-white/[0.07] border border-white/15 rounded-full px-3 py-1.5 transition-all duration-700"
                    style={{ opacity: seen ? 1 : 0, transform: seen ? "none" : "translateY(8px)", transitionDelay: `${300 + i * 120}ms` }}
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div />
          )}

          {q.headline && (
            <div className="lg:text-right">
              <p className="font-mono text-[11px] uppercase tracking-widest text-gray-400 mb-1">{q.headline.label}</p>
              <p className="font-display text-4xl sm:text-5xl font-bold tabular-nums text-brand-accent">{vnd(amount)}</p>
              {q.headline.caption && <p className="mt-1 text-sm text-gray-300 max-w-xs lg:ml-auto">{q.headline.caption}</p>}
            </div>
          )}
        </div>

        <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-3 border-t border-white/15 pt-5">
          {meta
            .filter(([, v]) => v)
            .map(([k, v]) => (
              <div key={k}>
                <dt className="font-mono text-[10px] uppercase tracking-widest text-gray-400 mb-0.5">{k}</dt>
                <dd className="text-sm font-medium">{v}</dd>
              </div>
            ))}
        </dl>
      </div>
    </header>
  );
}

/* ------------------------------ sections ------------------------------ */

function Card({ children, className = "" }: { children: ReactNode; className?: string; key?: string | number }) {
  return <div className={`bg-white rounded-xl border border-black/[0.06] shadow-[0_1px_2px_rgba(0,0,0,0.04)] ${className}`}>{children}</div>;
}

function Lead({ children }: { children: ReactNode }) {
  return <p className="text-[15px] sm:text-base leading-relaxed text-gray-700 max-w-3xl">{children}</p>;
}

function Note({ children }: { children: ReactNode }) {
  return <p className="mt-4 text-[13px] italic text-gray-500 leading-relaxed max-w-3xl">{children}</p>;
}

function IntroSection({ q }: { q: ProposalQuote }) {
  return (
    <div className="space-y-4 max-w-3xl">
      {q.intro.map((p, i) => (
        <p key={i} className={i === 0 ? "text-lg sm:text-xl leading-relaxed text-brand-dark font-medium" : "text-[15px] sm:text-base leading-relaxed text-gray-700"}>
          {p}
        </p>
      ))}
    </div>
  );
}

function CountUp({ value, decimals = 0, prefix = "", suffix = "", run }: { value: number; decimals?: number; prefix?: string; suffix?: string; run: boolean }) {
  const [v] = useTween([run ? value : 0], 1300);
  const fmt = (n: number) => n.toLocaleString("vi-VN", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  return (
    <>
      <span className="print:hidden">
        {prefix}
        {fmt(v)}
        {suffix}
      </span>
      <span className="hidden print:inline">
        {prefix}
        {fmt(value)}
        {suffix}
      </span>
    </>
  );
}

function MarketSection({ m }: { m: NonNullable<ProposalQuote["market"]> }) {
  const [ref, seen] = useInView<HTMLDivElement>(0.4);
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div>
      <Lead>{m.lead}</Lead>
      <div ref={ref} className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
        {m.stats.map((s) => (
          <Card key={s.label} className="p-5 sm:p-6 relative overflow-hidden">
            <div aria-hidden className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-brand-secondary/10" />
            <p className="font-display text-3xl sm:text-4xl font-bold tabular-nums text-brand-primary">
              <CountUp value={s.value} decimals={s.decimals} prefix={s.prefix} suffix={s.suffix} run={seen} />
            </p>
            <p className="mt-2 text-sm text-gray-600 leading-snug">{s.label}</p>
          </Card>
        ))}
      </div>

      {m.brands?.length ? (
        <>
          <p className="mt-10 mb-3 text-sm font-semibold text-gray-800">Những brand đi trước mỗi bên một cách, nhưng ai cũng hiểu khách của mình trước khi bán. Chạm vào từng brand để xem bài học:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {m.brands.map((b, i) => {
              const isOpen = open === i;
              return (
                <button
                  key={b.name}
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className={`text-left rounded-xl border p-5 transition-all duration-300 ${
                    isOpen ? "bg-brand-dark text-white border-brand-dark shadow-lg -translate-y-0.5" : "bg-white border-black/[0.06] hover:border-brand-secondary/50 hover:shadow-md"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-display text-lg font-bold">{b.name}</span>
                    <span className={`font-mono text-[10px] uppercase tracking-widest ${isOpen ? "text-brand-accent" : "text-gray-400"}`}>{isOpen ? "Bài học" : "Xem bài học"}</span>
                  </div>
                  <p className={`mt-2 text-sm leading-relaxed ${isOpen ? "text-gray-300" : "text-gray-600"}`}>{b.how}</p>
                  <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr] mt-3" : "grid-rows-[0fr] print:grid-rows-[1fr] print:mt-3"}`}>
                    <div className="overflow-hidden">
                      <p className={`flex items-start gap-2 text-[15px] font-semibold ${isOpen ? "text-brand-accent" : "text-brand-primary"}`}>
                        <ArrowRight className="h-4 w-4 mt-0.5 shrink-0" /> {b.lesson}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </>
      ) : null}
      {m.source && <Note>{m.source}</Note>}
    </div>
  );
}

function TestLearnSection({ t }: { t: NonNullable<ProposalQuote["testLearn"]> }) {
  const [mode, setMode] = useState<"guess" | "measure">("measure");
  const flow = mode === "guess" ? t.guess : t.measure;
  const [openEx, setOpenEx] = useState(0);
  return (
    <div>
      <Lead>{t.lead}</Lead>

      <Card className="mt-6 p-5 sm:p-7">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <p className="text-sm font-semibold">Đo trước rồi mới làm: biết kết quả trong vài tuần thay vì vài tháng</p>
          <div role="tablist" className="inline-flex rounded-full bg-gray-100 p-1 text-[13px] font-medium print:hidden">
            {(["guess", "measure"] as const).map((k) => (
              <button
                key={k}
                role="tab"
                aria-selected={mode === k}
                onClick={() => setMode(k)}
                className={`rounded-full px-3.5 py-1.5 transition-all ${mode === k ? (k === "guess" ? "bg-white text-red-700 shadow" : "bg-white text-sky-700 shadow") : "text-gray-500"}`}
              >
                {k === "guess" ? "Cách cũ · đoán rồi làm" : "Duy Web · đo rồi làm"}
              </button>
            ))}
          </div>
        </div>

        <ol key={mode} className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-0 items-stretch">
          {flow.map((f, i) => {
            const last = i === flow.length - 1;
            const tone = last ? (mode === "guess" ? "border-red-300 bg-red-50 text-red-800" : "border-sky-300 bg-sky-50 text-sky-900") : "border-gray-200 bg-white";
            return (
              <li key={f.title} className="flex items-center sm:contents">
                <div className="relative flex w-full items-center">
                  <div
                    className={`flex-1 rounded-lg border px-4 py-4 text-center animate-[fadeUp_.5s_ease_both] ${tone}`}
                    style={{ animationDelay: `${i * 160}ms` }}
                  >
                    <p className="text-sm font-semibold">{f.title}</p>
                    <p className="text-xs opacity-70 mt-0.5">{f.sub}</p>
                  </div>
                  {!last && <ArrowRight className="hidden sm:block h-4 w-4 text-gray-400 mx-2 shrink-0" />}
                </div>
              </li>
            );
          })}
        </ol>
        <p className="mt-5 text-center text-[13px] text-gray-500">
          {mode === "guess" ? "Rủi ro: tiền và hàng tồn đã nằm sẵn trước khi biết khách muốn gì." : "Kết quả: mỗi đồng sản xuất và quảng cáo đi theo phản ứng thật của khách."}
        </p>
      </Card>

      {t.examples?.length ? (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-[minmax(0,240px)_1fr] gap-3">
          <div className="flex md:flex-col gap-2 overflow-x-auto [scrollbar-width:none] print:hidden">
            {t.examples.map((e, i) => (
              <button
                key={e.title}
                onClick={() => setOpenEx(i)}
                className={`shrink-0 text-left text-[13px] font-semibold rounded-lg px-3.5 py-2.5 border transition-colors ${
                  openEx === i ? "bg-brand-dark text-white border-brand-dark" : "bg-white border-black/[0.06] text-gray-700 hover:border-brand-secondary/60"
                }`}
              >
                {e.title}
              </button>
            ))}
          </div>
          <Card className="p-6 sm:p-8 flex items-center print:hidden">
            <div key={openEx} className="animate-[fadeUp_.4s_ease_both]">
              <Sparkles className="h-5 w-5 text-brand-secondary mb-3" />
              <p className="font-display text-xl sm:text-2xl font-bold mb-2">{t.examples[openEx].title}</p>
              <p className="text-[15px] leading-relaxed text-gray-700">{t.examples[openEx].text}</p>
            </div>
          </Card>
          <ul className="hidden print:block space-y-2 text-sm">
            {t.examples.map((e) => (
              <li key={e.title}>
                <b>{e.title}.</b> {e.text}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

function shortName(name: string) {
  const parts = name.split(" · ");
  if (parts.length === 1) return name;
  return /\d/.test(parts[1]) ? parts[0] : `${parts[0]} +${parts.length - 1}`;
}

function PositioningSection({ p }: { p: NonNullable<ProposalQuote["positioning"]> }) {
  const highlightIdx = Math.max(0, p.points.findIndex((pt) => pt.highlight));
  const [sel, setSel] = useState(highlightIdx);
  const [ref, seen] = useInView<HTMLDivElement>(0.3);
  const selected = p.points[sel];
  const quadrantOf = (pt: { x: number; y: number }) => p.quadrants[(pt.y < 0.5 ? 0 : 2) + (pt.x < 0.5 ? 0 : 1)];

  return (
    <div>
      <Lead>{p.lead}</Lead>

      <Card className="mt-6 p-4 sm:p-6">
        <div className="flex gap-2 sm:gap-3">
          <div className="hidden sm:flex items-center">
            <span className="[writing-mode:vertical-rl] rotate-180 text-[11px] font-semibold text-gray-500 whitespace-nowrap">{p.yAxis}</span>
          </div>
          <div className="flex-1 min-w-0">
            <div ref={ref} className="relative h-[300px] sm:h-[360px] rounded-lg border border-gray-200 overflow-hidden bg-white">
              {p.bands.map((b) => (
                <div
                  key={b.label}
                  className={`absolute inset-y-0 ${b.highlight ? "bg-brand-accent/15" : ""}`}
                  style={{ left: `${b.from * 100}%`, width: `${(b.to - b.from) * 100}%` }}
                />
              ))}
              <div className="absolute inset-x-0 top-1/2 border-t border-dashed border-gray-200" />
              <div className="absolute inset-y-0 left-1/2 border-l border-dashed border-gray-200" />
              <span className="absolute left-2 top-2 text-[10px] sm:text-[11px] text-gray-400">{p.quadrants[0]}</span>
              <span className="absolute right-2 top-2 text-[10px] sm:text-[11px] text-gray-400">{p.quadrants[1]}</span>
              <span className="absolute left-2 bottom-2 text-[10px] sm:text-[11px] text-gray-400">{p.quadrants[2]}</span>
              <span className="absolute right-2 bottom-2 text-[10px] sm:text-[11px] text-gray-400">{p.quadrants[3]}</span>

              {p.points.map((pt, i) => {
                const right = pt.x > 0.62 || (pt.name.length > 26 && pt.x > 0.5);
                const isSel = i === sel;
                return (
                  <button
                    key={pt.name}
                    onClick={() => setSel(i)}
                    className={`absolute flex items-center gap-1.5 -translate-y-1/2 transition-all duration-700 ${right ? "-translate-x-full flex-row-reverse" : ""} ${isSel ? "z-10" : ""}`}
                    style={{
                      left: `calc(${pt.x * 100}% + ${right ? 7 : -7}px)`,
                      top: `${pt.y * 100}%`,
                      opacity: seen ? 1 : 0,
                      transitionDelay: `${i * 90}ms`,
                    }}
                    aria-pressed={isSel}
                  >
                    <span className="relative flex h-3.5 w-3.5 items-center justify-center">
                      {pt.highlight && <span className="absolute inline-flex h-full w-full rounded-full bg-brand-primary/50 animate-ping" />}
                      <span
                        className={`relative rounded-full transition-all ${
                          pt.highlight ? "h-3.5 w-3.5 bg-brand-primary ring-4 ring-brand-primary/20" : isSel ? "h-3 w-3 bg-brand-dark" : "h-2.5 w-2.5 bg-gray-400"
                        }`}
                      />
                    </span>
                    <span
                      className={`whitespace-nowrap rounded px-1 text-[11px] sm:text-[12px] transition-colors ${
                        pt.highlight ? "font-bold text-brand-primary bg-white/80" : isSel ? "font-semibold text-brand-dark bg-white/90" : "text-gray-600 bg-white/60"
                      }`}
                    >
                      <span className="sm:hidden">{shortName(pt.name)}</span>
                      <span className="hidden sm:inline">{pt.name}</span>
                    </span>
                  </button>
                );
              })}
            </div>
            <div className="flex mt-1.5 text-[10px] sm:text-[11px] leading-tight text-gray-500">
              {p.bands.map((b) => (
                <span
                  key={b.label}
                  className={`px-1 text-center ${b.highlight ? "text-amber-700 font-semibold" : ""}`}
                  style={{ width: `${(b.to - b.from) * 100}%` }}
                >
                  {b.label}
                </span>
              ))}
            </div>
            <p className="text-center text-[11px] font-semibold text-gray-600 mt-1">{p.xAxis} →</p>
          </div>
        </div>

        <div key={sel} className="mt-4 rounded-lg bg-[#F8F5EF] px-4 py-3 text-sm animate-[fadeUp_.35s_ease_both]">
          <span className="font-semibold">{selected.name}</span>
          <span className="text-gray-500"> · {quadrantOf(selected)}</span>
          {selected.note && <p className="mt-1 text-gray-700">{selected.note}</p>}
        </div>
      </Card>

      {(p.proposal || p.question) && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
          {p.proposal && (
            <Card className="p-5 border-l-4 border-l-brand-primary">
              <p className="font-mono text-[10px] uppercase tracking-widest text-brand-primary mb-2">Định vị đề xuất</p>
              <p className="text-[15px] leading-relaxed text-gray-800">{p.proposal.replace(/^Định vị đề xuất cho [^:]+:\s*/, "")}</p>
            </Card>
          )}
          {p.question && (
            <Card className="p-5 border-l-4 border-l-brand-accent">
              <p className="font-mono text-[10px] uppercase tracking-widest text-amber-700 mb-2">Câu hỏi cần chốt</p>
              <p className="text-[15px] leading-relaxed text-gray-800">{p.question}</p>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}

/* ---------- Đánh giá kênh: radar + so sánh ---------- */

function Radar({ labels, values, size = 260 }: { labels: string[]; values: number[]; size?: number }) {
  const n = labels.length;
  const c = size / 2;
  const r = c - 34;
  const pt = (i: number, v: number) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / n;
    return [c + Math.cos(a) * r * (v / 5), c + Math.sin(a) * r * (v / 5)] as const;
  };
  const poly = values.map((v, i) => pt(i, v).join(",")).join(" ");
  return (
    <svg viewBox={`-56 -6 ${size + 112} ${size + 12}`} className="w-full max-w-[340px] mx-auto overflow-visible" role="img" aria-label="Biểu đồ đánh giá kênh">
      {[1, 2, 3, 4, 5].map((lv) => (
        <polygon key={lv} points={labels.map((_, i) => pt(i, lv).join(",")).join(" ")} fill={lv % 2 ? "#F8F5EF" : "#fff"} stroke="#E5E1D8" strokeWidth={1} />
      ))}
      {labels.map((_, i) => {
        const [x, y] = pt(i, 5);
        return <line key={i} x1={c} y1={c} x2={x} y2={y} stroke="#E5E1D8" />;
      })}
      <polygon points={poly} fill="rgba(214,40,40,0.18)" stroke="#D62828" strokeWidth={2} strokeLinejoin="round" />
      {values.map((v, i) => {
        const [x, y] = pt(i, v);
        return <circle key={i} cx={x} cy={y} r={4} fill="#D62828" stroke="#fff" strokeWidth={1.5} />;
      })}
      {labels.map((l, i) => {
        const [x, y] = pt(i, 5.9);
        const anchor = Math.abs(x - c) < 4 ? "middle" : x > c ? "start" : "end";
        const words = l.split(" ");
        const mid = Math.ceil(words.length / 2);
        const lines = words.length > 2 ? [words.slice(0, mid).join(" "), words.slice(mid).join(" ")] : [l];
        return (
          <text key={l} x={x} y={y - (lines.length - 1) * 6} textAnchor={anchor} dominantBaseline="middle" className="fill-gray-600" fontSize={12.5} fontWeight={600}>
            {lines.map((ln, k) => (
              <tspan key={k} x={x} dy={k === 0 ? 0 : 14}>
                {ln}
              </tspan>
            ))}
          </text>
        );
      })}
    </svg>
  );
}

function ChannelReviewSection({ c, brand }: { c: NonNullable<ProposalQuote["channelReviews"]>; brand: string }) {
  const [view, setView] = useState<"channel" | "compare">("channel");
  const [idx, setIdx] = useState(0);
  const [metric, setMetric] = useState(0);
  const ch = c.channels[idx];
  const radarVals = useTween(ch.scores, 600);

  const ranked = useMemo(
    () => c.channels.map((x, i) => ({ ...x, i, score: x.scores[metric] ?? 0 })).sort((a, b) => b.score - a.score),
    [c.channels, metric]
  );
  const barVals = useTween(
    c.channels.map((x) => (view === "compare" ? x.scores[metric] ?? 0 : 0)),
    700
  );

  return (
    <div>
      <Lead>{c.lead}</Lead>

      <div className="mt-6 inline-flex rounded-full bg-white border border-black/[0.06] p-1 text-[13px] font-medium print:hidden">
        <button onClick={() => setView("channel")} className={`rounded-full px-4 py-1.5 transition-colors ${view === "channel" ? "bg-brand-dark text-white" : "text-gray-600"}`}>
          Xem từng kênh
        </button>
        <button onClick={() => setView("compare")} className={`rounded-full px-4 py-1.5 transition-colors ${view === "compare" ? "bg-brand-dark text-white" : "text-gray-600"}`}>
          So sánh theo tiêu chí
        </button>
      </div>

      {view === "channel" ? (
        <Card className="mt-4 overflow-hidden">
          <div className="flex gap-1.5 overflow-x-auto [scrollbar-width:none] p-3 border-b border-gray-100 bg-[#FBF9F5]">
            {c.channels.map((x, i) => {
              const Icon = CHANNEL_ICON[x.type] || Radio;
              return (
                <button
                  key={x.name}
                  onClick={() => setIdx(i)}
                  className={`shrink-0 inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-[13px] font-semibold border transition-all ${
                    i === idx ? "bg-white border-brand-primary text-brand-primary shadow-sm" : "border-transparent text-gray-600 hover:bg-white"
                  }`}
                >
                  <Icon className="h-4 w-4" /> {x.name.replace(/^Website .*/, "Website")}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] gap-6 p-5 sm:p-7">
            <div>
              <Radar labels={c.metrics} values={radarVals} />
              <ul className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1.5">
                {c.metrics.map((m, i) => (
                  <li key={m} className="flex items-center justify-between text-[12px] text-gray-600">
                    <span className="truncate">{m}</span>
                    <span className="flex gap-0.5 ml-2">
                      {[1, 2, 3, 4, 5].map((d) => (
                        <span key={d} className={`h-1.5 w-2.5 rounded-full transition-colors duration-500 ${d <= ch.scores[i] ? "bg-brand-primary" : "bg-gray-200"}`} />
                      ))}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div key={idx} className="animate-[fadeUp_.4s_ease_both] min-w-0">
              <p className="font-mono text-[10px] uppercase tracking-widest text-brand-primary">{ch.role}</p>
              <h3 className="font-display text-2xl font-bold mt-1">{ch.name}</h3>
              <div className="mt-4 space-y-4 text-[15px] leading-relaxed">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1">Khách làm gì ở đây</p>
                  <p className="text-gray-700">{ch.behavior}</p>
                </div>
                <div className="rounded-lg bg-[#FFF6E6] border border-brand-accent/40 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-amber-700 mb-1">Nhận định cho {brand}</p>
                  <p className="text-gray-800">{ch.verdict}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1.5">Làm trong gói khởi tạo</p>
                    <ul className="space-y-1.5">
                      {ch.setup.map((s) => (
                        <li key={s} className="flex gap-2 text-sm text-gray-700">
                          <Check className="h-4 w-4 mt-0.5 text-emerald-600 shrink-0" /> {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1.5">Đo gì ở buổi đánh giá</p>
                    <p className="text-sm text-gray-700">{ch.watch}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      ) : (
        <Card className="mt-4 p-5 sm:p-7">
          <div className="flex flex-wrap gap-2 mb-6">
            {c.metrics.map((m, i) => (
              <button
                key={m}
                onClick={() => setMetric(i)}
                className={`rounded-full px-3.5 py-1.5 text-[13px] font-semibold border transition-colors ${
                  metric === i ? "bg-brand-primary text-white border-brand-primary" : "bg-white border-gray-200 text-gray-600 hover:border-brand-primary/50"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
          <ol className="relative" style={{ height: ranked.length * 52 }}>
            {ranked.map((x, pos) => {
              const Icon = CHANNEL_ICON[x.type] || Radio;
              const v = barVals[x.i] ?? 0;
              return (
                <li
                  key={x.name}
                  className="absolute inset-x-0 flex items-center gap-3 transition-transform duration-500"
                  style={{ transform: `translateY(${pos * 52}px)` }}
                >
                  <span className="w-28 sm:w-40 shrink-0 flex items-center gap-2 text-[13px] font-semibold text-gray-700">
                    <Icon className="h-4 w-4 text-gray-400 shrink-0" />
                    <span className="truncate">{x.name.replace(/^Website .*/, "Website")}</span>
                  </span>
                  <span className="flex-1 h-8 rounded-md bg-gray-100 overflow-hidden">
                    <span
                      className={`block h-full rounded-md ${pos === 0 ? "bg-gradient-to-r from-brand-primary to-brand-secondary" : "bg-brand-dark/70"}`}
                      style={{ width: `${(v / 5) * 100}%` }}
                    />
                  </span>
                  <span className="w-8 text-right font-mono text-sm tabular-nums">{v.toFixed(1).replace(".0", "")}</span>
                </li>
              );
            })}
          </ol>
          <p className="mt-4 text-[13px] text-gray-500">
            Kênh mạnh nhất về <b className="text-gray-700">{c.metrics[metric].toLowerCase()}</b>: {ranked[0].name}.{" "}
            <button className="underline underline-offset-2 hover:text-brand-primary" onClick={() => { setIdx(ranked[0].i); setView("channel"); }}>
              Xem chi tiết kênh
            </button>
          </p>
        </Card>
      )}
      {c.disclaimer && <Note>{c.disclaimer}</Note>}
    </div>
  );
}

function AuditSection({ a }: { a: NonNullable<ProposalQuote["audit"]> }) {
  const [fixed, setFixed] = useState<Set<number>>(new Set());
  const total = a.items.length;
  const pct = fixed.size / total;
  const [meter] = useTween([pct * 100], 500);
  const toggle = (i: number) =>
    setFixed((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  const allDone = fixed.size === total;

  return (
    <div>
      <Lead>{a.lead}</Lead>

      <Card className="mt-6 p-5 sm:p-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex-1 min-w-[220px]">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">Mức sẵn sàng đón khách mới</p>
            <div className="h-3 rounded-full bg-gray-100 overflow-hidden">
              <div
                className="h-full rounded-full transition-colors duration-500"
                style={{ width: `${Math.max(4, meter)}%`, background: meter < 40 ? "#D62828" : meter < 80 ? "#F77F00" : "#16a34a" }}
              />
            </div>
            <p className="mt-2 text-sm text-gray-600">
              <b className="tabular-nums">{fixed.size}/{total}</b> điểm đã xử lý{" "}
              {allDone ? "· website sẵn sàng chạy truyền thông" : "· bấm từng điểm để xem sau khi xử lý"}
            </p>
          </div>
          <button
            onClick={() => setFixed(allDone ? new Set() : new Set(a.items.map((_, i) => i)))}
            className="inline-flex items-center gap-1.5 rounded-lg bg-brand-dark text-white px-4 py-2 text-[13px] font-semibold hover:bg-black print:hidden"
          >
            {allDone ? <RotateCcw className="h-4 w-4" /> : <Wrench className="h-4 w-4" />}
            {allDone ? "Xem lại hiện trạng" : "Xử lý tất cả"}
          </button>
        </div>
      </Card>

      <ul className="mt-3 space-y-2">
        {a.items.map((it, i) => {
          const done = fixed.has(i);
          return (
            <li key={it.issue}>
              <button
                onClick={() => toggle(i)}
                aria-pressed={done}
                className={`w-full text-left rounded-xl border p-4 transition-all duration-300 grid grid-cols-[28px_1fr] gap-3 ${
                  done ? "bg-emerald-50/60 border-emerald-200" : "bg-white border-black/[0.06] hover:border-brand-secondary/50"
                }`}
              >
                <span className={`mt-0.5 h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${done ? "bg-emerald-600 text-white" : "bg-red-100 text-red-700"}`}>
                  {done ? <Check className="h-3.5 w-3.5" /> : "!"}
                </span>
                <span className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4 text-sm">
                  <span className={`font-semibold transition-colors ${done ? "text-gray-400 line-through decoration-gray-300" : "text-gray-900"}`}>{it.issue}</span>
                  <span className={`transition-colors ${done ? "text-gray-400" : "text-gray-600"}`}>{it.impact}</span>
                  <span className={`font-medium transition-all ${done ? "text-emerald-700" : "text-gray-500"}`}>
                    <span className="sm:hidden text-gray-400 font-normal">Hướng xử lý: </span>
                    {it.fix}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      {a.note && <Note>{a.note}</Note>}
    </div>
  );
}

function StorySection({ s }: { s: NonNullable<ProposalQuote["story"]> }) {
  const [tab, setTab] = useState(0);
  const cc = s.contentChannels ?? [];
  return (
    <div>
      <blockquote className="relative rounded-2xl bg-gradient-to-br from-[#3A2A1E] to-[#1A1A1A] text-[#F6E7CF] px-6 sm:px-10 py-8 sm:py-10 overflow-hidden">
        <div aria-hidden className="absolute inset-0 opacity-20 mix-blend-overlay bg-[radial-gradient(circle_at_20%_20%,#F77F00_0,transparent_45%),radial-gradient(circle_at_80%_90%,#FCBF49_0,transparent_40%)]" />
        <p className="relative font-mono text-[10px] uppercase tracking-[0.2em] text-brand-accent mb-3">Câu chuyện xuyên suốt mọi kênh</p>
        <p className="relative font-display text-2xl sm:text-3xl font-bold leading-snug">“{s.line}”</p>
      </blockquote>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
        {s.pillars.map((p, i) => (
          <Card key={p.title} className="p-5 group hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
            <span className="font-mono text-xs text-brand-secondary">Trụ {i + 1}</span>
            <p className="font-display text-lg font-bold mt-1 mb-2 group-hover:text-brand-primary transition-colors">{p.title}</p>
            <p className="text-sm leading-relaxed text-gray-600">{p.text}</p>
          </Card>
        ))}
      </div>

      {cc.length > 0 && (
        <Card className="mt-4 overflow-hidden">
          <div className="flex border-b border-gray-100 print:hidden">
            {cc.map((x, i) => (
              <button
                key={x.name}
                onClick={() => setTab(i)}
                className={`flex-1 px-3 py-3 text-sm font-semibold border-b-2 transition-colors ${tab === i ? "border-brand-primary text-brand-primary" : "border-transparent text-gray-500 hover:text-gray-800"}`}
              >
                {x.name}
              </button>
            ))}
          </div>
          <dl key={tab} className="grid grid-cols-1 sm:grid-cols-3 gap-5 p-5 sm:p-6 animate-[fadeUp_.35s_ease_both]">
            {[
              ["Vai trò", cc[tab].role],
              ["Nội dung chủ lực", cc[tab].content],
              ["Giọng điệu", cc[tab].tone],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1">{k}</dt>
                <dd className="text-[15px] leading-relaxed text-gray-800">{v}</dd>
              </div>
            ))}
          </dl>
        </Card>
      )}
      {s.principle && <Note>Nguyên tắc: {s.principle}</Note>}
    </div>
  );
}

function LoopSection({ l }: { l: NonNullable<ProposalQuote["loop"]> }) {
  const n = l.steps.length;
  const [step, setStep] = useState(0);
  const [auto, setAuto] = useState(true);
  const [ref, seen] = useInView<HTMLDivElement>(0.4);

  useEffect(() => {
    if (!auto || !seen || prefersReducedMotion()) return;
    const t = setInterval(() => setStep((s) => (s + 1) % n), 2600);
    return () => clearInterval(t);
  }, [auto, seen, n]);

  const pick = (i: number) => {
    setAuto(false);
    setStep(i);
  };

  return (
    <div>
      <Lead>{l.lead}</Lead>
      <div ref={ref} className="mt-6 grid grid-cols-1 md:grid-cols-[minmax(0,340px)_1fr] gap-6 items-center">
        <div className="relative mx-auto w-full max-w-[320px] aspect-square">
          <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" aria-hidden>
            <circle cx="100" cy="100" r="78" fill="none" stroke="#E5E1D8" strokeWidth="2" strokeDasharray="4 5" />
            <circle
              cx="100"
              cy="100"
              r="78"
              fill="none"
              stroke="#D62828"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={`${(2 * Math.PI * 78) / n} ${2 * Math.PI * 78}`}
              transform={`rotate(${-90 - 180 / n + (step * 360) / n} 100 100)`}
              style={{ transition: "transform .7s cubic-bezier(.4,0,.2,1)" }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-center px-16">
            <p className="text-[11px] font-mono uppercase tracking-widest text-gray-400">lặp lại<br />mỗi tháng</p>
          </div>
          {l.steps.map((s, i) => {
            const a = -Math.PI / 2 + (i * 2 * Math.PI) / n;
            const isOn = i === step;
            const isFocus = i === l.focus;
            return (
              <button
                key={s.title}
                onClick={() => pick(i)}
                className={`absolute -translate-x-1/2 -translate-y-1/2 h-14 w-14 sm:h-16 sm:w-16 rounded-full border-2 font-display text-lg font-bold transition-all duration-500 ${
                  isOn ? "bg-brand-primary border-brand-primary text-white scale-110 shadow-lg shadow-brand-primary/30" : isFocus ? "bg-white border-brand-primary text-brand-primary" : "bg-white border-gray-200 text-gray-500"
                }`}
                style={{ left: `${50 + Math.cos(a) * 39}%`, top: `${50 + Math.sin(a) * 39}%` }}
                aria-pressed={isOn}
                aria-label={s.title}
              >
                {i + 1}
              </button>
            );
          })}
        </div>

        <div>
          <Card key={step} className="p-6 animate-[fadeUp_.4s_ease_both]">
            <p className="font-mono text-xs text-brand-primary">
              Bước {step + 1}/{n} {l.focus === step && <span className="ml-1 rounded bg-brand-primary/10 px-1.5 py-0.5">trọng tâm</span>}
            </p>
            <p className="font-display text-2xl font-bold mt-1">{l.steps[step].title}</p>
            <p className="mt-2 text-[15px] leading-relaxed text-gray-700">{l.steps[step].text}</p>
          </Card>
          <div className="mt-3 flex gap-1.5 print:hidden">
            {l.steps.map((s, i) => (
              <button key={s.title} onClick={() => pick(i)} className={`h-1.5 rounded-full transition-all ${i === step ? "w-8 bg-brand-primary" : "w-4 bg-gray-300"}`} aria-label={`Bước ${i + 1}`} />
            ))}
          </div>
          <ol className="hidden print:block mt-3 space-y-1 text-sm">
            {l.steps.map((s, i) => (
              <li key={s.title}>
                <b>{i + 1}. {s.title}:</b> {s.text}
              </li>
            ))}
          </ol>
          {l.note && <Note>{l.note}</Note>}
        </div>
      </div>
    </div>
  );
}

function StagesSection({ s }: { s: NonNullable<ProposalQuote["stages"]> }) {
  const [unlocked, setUnlocked] = useState(0);
  const milestones = s.items.map((it) => {
    const nums = it.title.match(/\d+/g);
    return nums ? Number(nums[nums.length - 1]) : 1;
  });
  const [orders] = useTween([milestones[unlocked] ?? 1], 900);
  const [bar] = useTween([((unlocked + 1) / s.items.length) * 100], 700);
  const last = s.items.length - 1;

  return (
    <div>
      <Lead>{s.lead}</Lead>

      <Card className="mt-6 p-5 sm:p-7">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Mốc đang hướng tới</p>
            <p className="font-display text-4xl font-bold tabular-nums text-brand-primary">
              {Math.round(orders)} <span className="text-lg text-gray-500 font-semibold">đơn</span>
            </p>
          </div>
          <div className="flex gap-2 print:hidden">
            {unlocked > 0 && (
              <button onClick={() => setUnlocked(0)} className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-[13px] font-semibold text-gray-600 hover:bg-gray-50">
                <RotateCcw className="h-4 w-4" /> Từ đầu
              </button>
            )}
            <button
              disabled={unlocked >= last}
              onClick={() => setUnlocked((u) => Math.min(last, u + 1))}
              className="inline-flex items-center gap-1.5 rounded-lg bg-brand-primary text-white px-4 py-2 text-[13px] font-semibold disabled:opacity-40 hover:bg-red-700"
            >
              <LockOpen className="h-4 w-4" /> {unlocked >= last ? "Đã mở hết chặng" : "Mở khoá chặng tiếp"}
            </button>
          </div>
        </div>

        <div className="h-2 rounded-full bg-gray-100 overflow-hidden mb-5">
          <div className="h-full bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent rounded-full" style={{ width: `${bar}%` }} />
        </div>

        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {s.items.map((it, i) => {
            const open = i <= unlocked;
            const current = i === unlocked;
            return (
              <li
                key={it.title}
                onClick={() => setUnlocked(i)}
                className={`cursor-pointer rounded-xl border p-4 transition-all duration-500 ${
                  current ? "border-brand-primary bg-red-50/50 shadow-md" : open ? "border-gray-200 bg-white" : "border-dashed border-gray-300 bg-gray-50/80 print:bg-white print:border-solid"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`font-display font-bold ${current ? "text-brand-primary" : "text-gray-900"}`}>{it.title}</span>
                  {open ? <Check className="h-4 w-4 text-emerald-600" /> : <Lock className="h-4 w-4 text-gray-400 print:hidden" />}
                </div>
                <ul className={`space-y-1 text-[13px] transition-opacity duration-500 ${open ? "text-gray-700" : "text-gray-400 blur-[1.5px] print:blur-none print:text-gray-700"}`}>
                  {it.actions.map((x) => (
                    <li key={x}>· {x}</li>
                  ))}
                </ul>
                <p className="mt-3 text-[11px] font-mono text-gray-500">Xong khi: {it.doneWhen}</p>
              </li>
            );
          })}
        </ol>
        {s.footer && <p className="mt-4 rounded-lg bg-[#F8F5EF] px-4 py-3 text-center text-[13px] text-gray-700">{s.footer}</p>}
      </Card>
      {s.note && <Note>{s.note}</Note>}
    </div>
  );
}

function RoadmapSection({ r }: { r: NonNullable<ProposalQuote["roadmap"]> }) {
  const [week, setWeek] = useState(0);
  const [ref, seen] = useInView<HTMLDivElement>(0.3);
  return (
    <div>
      <Lead>{r.lead}</Lead>
      <div ref={ref} className="mt-6">
        <div className="relative grid grid-cols-4 gap-2 sm:gap-3">
          <div className="absolute left-[12.5%] right-[12.5%] top-5 h-0.5 bg-gray-200" aria-hidden />
          <div
            className="absolute left-[12.5%] top-5 h-0.5 bg-brand-primary transition-all duration-700"
            style={{ width: seen ? `${(week / (r.weeks.length - 1)) * 75}%` : 0 }}
            aria-hidden
          />
          {r.weeks.map((w, i) => (
            <button key={w.title} onClick={() => setWeek(i)} className="relative flex flex-col items-center text-center group">
              <span
                className={`relative z-10 h-10 w-10 rounded-full flex items-center justify-center font-mono text-sm font-bold border-2 transition-all duration-300 ${
                  i === week ? "bg-brand-primary border-brand-primary text-white scale-110" : i < week ? "bg-white border-brand-primary text-brand-primary" : "bg-white border-gray-200 text-gray-500 group-hover:border-gray-400"
                }`}
              >
                T{i + 1}
              </span>
              <span className={`mt-2 text-[12px] sm:text-sm font-semibold ${i === week ? "text-brand-dark" : "text-gray-500"}`}>{w.title}</span>
            </button>
          ))}
        </div>

        <Card key={week} className="mt-5 p-5 sm:p-6 animate-[fadeUp_.35s_ease_both] print:hidden">
          <p className="font-mono text-xs text-brand-primary">Tuần {week + 1}</p>
          <p className="font-display text-xl font-bold mb-3">{r.weeks[week].title}</p>
          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {r.weeks[week].items.map((x) => (
              <li key={x} className="flex gap-2 rounded-lg bg-[#F8F5EF] px-3 py-2.5 text-sm text-gray-800">
                <Check className="h-4 w-4 mt-0.5 text-brand-primary shrink-0" /> {x}
              </li>
            ))}
          </ul>
        </Card>
        <div className="hidden print:grid grid-cols-4 gap-2 mt-4 text-xs">
          {r.weeks.map((w, i) => (
            <div key={w.title}>
              <b>Tuần {i + 1} · {w.title}</b>
              <ul>{w.items.map((x) => <li key={x}>· {x}</li>)}</ul>
            </div>
          ))}
        </div>

        {r.review && (
          <div className="flex justify-center my-4">
            <div className="rotate-0 rounded-lg border-2 border-dashed border-brand-secondary bg-white px-4 py-2.5 text-center text-sm font-semibold text-gray-800">
              ◆ {r.review}
            </div>
          </div>
        )}
        {r.after && (
          <div className="rounded-xl bg-brand-dark text-white p-5 text-center">
            <p className="font-display text-lg font-bold">{r.after.title}</p>
            <p className="text-sm text-gray-300 mt-1">{r.after.text}</p>
          </div>
        )}
      </div>
      {r.note && <Note>{r.note}</Note>}
    </div>
  );
}

function PricingSection({ q }: { q: ProposalQuote }) {
  const pr = q.pricing;
  const opts = pr.monthly?.options ?? [];
  const [opt, setOpt] = useState(Math.min(1, Math.max(0, opts.length - 1)));
  const [months, setMonths] = useState(2);
  const [copied, setCopied] = useState(false);

  const monthly = opts[opt]?.amount ?? 0;
  const total = pr.setup.amount + (opts.length ? monthly * months : 0);
  const deposit = pr.depositRate ? pr.setup.amount * pr.depositRate : 0;
  const [tTotal, tDeposit] = useTween([total, deposit], 500);

  const message = [
    `${q.client.name} xác nhận báo giá Duy Web:`,
    `- ${pr.setup.name}: ${vnd(pr.setup.amount)} (trọn gói)`,
    opts.length ? `- ${pr.monthly!.name}: gói "${opts[opt].label}" ${vnd(monthly)}/tháng, dự kiến ${months} tháng từ tháng 2` : "",
    deposit ? `- Đợt 1 (${Math.round((pr.depositRate ?? 0) * 100)}%): ${vnd(deposit)}` : "",
    `Link báo giá: ${window.location.href}`,
  ]
    .filter(Boolean)
    .join("\n");

  const confirm = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 4000);
    } catch {
      /* clipboard bị chặn: vẫn mở Zalo */
    }
    window.open(socialConfig.zalo, "_blank", "noopener");
  };

  return (
    <div>
      {pr.lead && <Lead>{pr.lead}</Lead>}

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-4 items-start">
        <div className="space-y-4">
          <Card className="p-5 sm:p-6 border-2 border-brand-primary/70 relative overflow-hidden">
            <div aria-hidden className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand-primary/10" />
            <div className="relative flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-brand-primary">Giai đoạn 1 · Một lần</p>
                <p className="font-display text-xl font-bold mt-1">{pr.setup.name}</p>
              </div>
              <p className="font-display text-2xl sm:text-3xl font-bold tabular-nums">
                {vnd(pr.setup.amount)} <span className="text-sm font-semibold text-gray-500">trọn gói</span>
              </p>
            </div>
            <p className="relative mt-3 text-[15px] leading-relaxed text-gray-700">{pr.setup.includes}</p>
          </Card>

          {opts.length > 0 && (
            <Card className="p-5 sm:p-6">
              <p className="font-mono text-[10px] uppercase tracking-widest text-gray-500">Giai đoạn 2 · Từ tháng 2, chọn theo tháng</p>
              <p className="font-display text-xl font-bold mt-1 mb-4">{pr.monthly!.name}</p>
              <div role="radiogroup" className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {opts.map((o, i) => (
                  <button
                    key={o.label}
                    role="radio"
                    aria-checked={opt === i}
                    onClick={() => setOpt(i)}
                    className={`text-left rounded-xl border-2 p-4 transition-all ${
                      opt === i ? "border-brand-dark bg-brand-dark text-white shadow-lg" : "border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    <p className="font-display text-xl font-bold tabular-nums">
                      {o.amount / 1_000_000} triệu<span className={`text-xs font-medium ${opt === i ? "text-gray-300" : "text-gray-500"}`}> /tháng</span>
                    </p>
                    <p className={`text-sm font-semibold mt-1 ${opt === i ? "text-brand-accent" : "text-brand-primary"}`}>{o.label}</p>
                    <p className={`text-[13px] mt-1 leading-snug ${opt === i ? "text-gray-300" : "text-gray-600"}`}>{o.desc}</p>
                  </button>
                ))}
              </div>
              {pr.monthly!.note && <p className="mt-4 text-[13px] text-gray-500 leading-relaxed">{pr.monthly!.note}</p>}
            </Card>
          )}
          {pr.excluded && <p className="text-[13px] text-gray-500 italic px-1">{pr.excluded}</p>}
        </div>

        <aside className="lg:sticky lg:top-6">
          <div className="rounded-xl p-5 sm:p-6 bg-brand-dark text-white shadow-xl">
            <p className="font-mono text-[10px] uppercase tracking-widest text-brand-accent mb-4">Ước tính của anh/chị</p>

            {opts.length > 0 && (
              <div className="mb-5 print:hidden">
                <label htmlFor="months" className="flex justify-between text-sm text-gray-300 mb-2">
                  <span>Số tháng duy trì dự kiến</span>
                  <b className="text-white tabular-nums">{months} tháng</b>
                </label>
                <input id="months" type="range" min={1} max={6} value={months} onChange={(e) => setMonths(Number(e.target.value))} className="w-full accent-[#F77F00]" />
              </div>
            )}

            <dl className="space-y-2.5 text-sm">
              <div className="flex justify-between gap-3">
                <dt className="text-gray-400">Tháng 1 · {pr.setup.name.toLowerCase()}</dt>
                <dd className="tabular-nums font-semibold">{vnd(pr.setup.amount)}</dd>
              </div>
              {opts.length > 0 && (
                <div className="flex justify-between gap-3">
                  <dt className="text-gray-400">
                    {opts[opt].label} × {months} tháng
                  </dt>
                  <dd className="tabular-nums font-semibold">{vnd(monthly * months)}</dd>
                </div>
              )}
              <div className="flex justify-between gap-3 border-t border-white/15 pt-3 mt-3">
                <dt className="font-semibold">Tổng {opts.length ? `${months + 1} tháng` : ""}</dt>
                <dd className="font-display text-2xl font-bold tabular-nums text-brand-accent">{vnd(tTotal)}</dd>
              </div>
              {deposit > 0 && (
                <div className="flex justify-between gap-3 rounded-lg bg-white/[0.07] px-3 py-2.5 mt-2">
                  <dt className="text-gray-300">Đợt 1 ({Math.round((pr.depositRate ?? 0) * 100)}% gói khởi tạo)</dt>
                  <dd className="tabular-nums font-bold">{vnd(tDeposit)}</dd>
                </div>
              )}
            </dl>

            <div className="mt-5 space-y-2 print:hidden">
              <button onClick={confirm} className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-brand-primary hover:bg-red-700 px-4 py-3 text-sm font-bold transition-colors">
                {copied ? <Check className="h-4 w-4" /> : <MessageCircle className="h-4 w-4" />}
                {copied ? "Đã chép nội dung, dán vào Zalo" : "Xác nhận qua Zalo"}
              </button>
              <div className="grid grid-cols-2 gap-2">
                <a href={`tel:${socialConfig.phone}`} className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-white/20 px-3 py-2.5 text-[13px] font-semibold hover:bg-white/10">
                  <Phone className="h-4 w-4" /> Gọi
                </a>
                <button
                  onClick={() => navigator.clipboard?.writeText(message).then(() => { setCopied(true); setTimeout(() => setCopied(false), 3000); })}
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-white/20 px-3 py-2.5 text-[13px] font-semibold hover:bg-white/10"
                >
                  <Copy className="h-4 w-4" /> Chép
                </button>
              </div>
              <p className="text-[11px] text-gray-400 leading-snug">Nút xác nhận chép sẵn lựa chọn của anh/chị và mở Zalo {socialConfig.phoneDisplay}.</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function PartnersSection({ q }: { q: ProposalQuote }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      {q.partners!.map((p) => (
        <Card key={p.domain} className="p-5 flex flex-col">
          <div className="flex items-center gap-3 mb-3">
            <span className="h-10 w-10 rounded-lg bg-brand-dark text-white font-display font-bold flex items-center justify-center uppercase">{p.domain[0]}</span>
            <div className="min-w-0">
              <p className="font-semibold truncate">{p.domain}</p>
              {p.category && <p className="text-xs text-gray-500">{p.category}</p>}
            </div>
          </div>
          {p.work && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {p.work.split("/").map((w) => (
                <span key={w} className="text-[11px] font-medium rounded-full bg-[#F8F5EF] border border-black/[0.05] px-2 py-0.5 text-gray-700">
                  {w.trim()}
                </span>
              ))}
            </div>
          )}
          <p className="text-sm leading-relaxed text-gray-600">{p.highlight}</p>
        </Card>
      ))}
    </div>
  );
}

function NextSection({ q }: { q: ProposalQuote }) {
  const [done, setDone] = useState<Set<number>>(new Set());
  return (
    <div>
      {q.closing && <p className="text-lg sm:text-xl leading-relaxed font-medium max-w-3xl">{q.closing}</p>}
      {q.why?.length ? (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {q.why.map((w, i) => (
            <Card key={w.title} className="p-5">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-brand-primary/10 text-brand-primary font-mono text-xs font-bold">{i + 1}</span>
              <p className="font-semibold mt-3">{w.title}</p>
              <p className="text-sm text-gray-600 mt-1 leading-relaxed">{w.text}</p>
            </Card>
          ))}
        </div>
      ) : null}

      {q.nextSteps?.length ? (
        <Card className="mt-6 p-5 sm:p-7">
          <p className="font-display text-xl font-bold mb-4">Bước tiếp theo</p>
          <ol className="space-y-2">
            {q.nextSteps.map((s, i) => {
              const on = done.has(i);
              return (
                <li key={s}>
                  <button
                    onClick={() =>
                      setDone((prev) => {
                        const next = new Set(prev);
                        next.has(i) ? next.delete(i) : next.add(i);
                        return next;
                      })
                    }
                    className="w-full flex items-start gap-3 text-left rounded-lg px-2 py-2 hover:bg-gray-50"
                  >
                    <span className={`mt-0.5 h-6 w-6 shrink-0 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all ${on ? "bg-emerald-600 border-emerald-600 text-white" : "border-gray-300 text-gray-500"}`}>
                      {on ? <Check className="h-3.5 w-3.5" /> : i + 1}
                    </span>
                    <span className={`text-[15px] leading-relaxed transition-colors ${on ? "text-gray-400 line-through" : "text-gray-800"}`}>{s}</span>
                  </button>
                </li>
              );
            })}
          </ol>
        </Card>
      ) : null}
    </div>
  );
}

function DocFooter({ q }: { q: ProposalQuote }) {
  return (
    <footer className="mt-16 rounded-2xl bg-brand-dark text-white p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
      <div>
        <p className="font-display text-xl font-bold">Duy Web · đồng hành cùng {q.client.name}</p>
        <p className="text-sm text-gray-400 mt-1">
          {socialConfig.phoneDisplay} · {socialConfig.email}
        </p>
      </div>
      <a href={socialConfig.zalo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-white text-brand-dark px-5 py-3 text-sm font-bold hover:bg-brand-accent transition-colors print:hidden">
        <MessageCircle className="h-4 w-4" /> Nhắn Zalo cho Duy Web
      </a>
    </footer>
  );
}
