import { Fragment, useState, type ReactNode } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { AlertTriangle, ArrowRight, CalendarDays, CheckSquare, ExternalLink, HelpCircle, LifeBuoy, MessageCircle, ShieldCheck, Square, Users } from "lucide-react";
import Meta from "../components/Meta";
import Schema from "../components/Schema";
import { socialConfig } from "../config/social";
import { findGuide } from "../data/guides";
import { ALWAYS_TAG, type GuideBlock, type GuideIcon } from "../data/guideTypes";

// Trang cẩm nang dùng chung cho /kien-thuc/<slug>: dữ liệu ở src/data/guides.ts
export default function GuidePage() {
  const { slug } = useParams();
  const guide = findGuide(slug);
  if (!guide) return <Navigate to="/kien-thuc" replace />;

  const faq = guide.blocks.find((b) => b.kind === "faq");

  return (
    <div className="bg-white min-h-screen">
      <Meta title={guide.title} description={guide.description} keywords={guide.keywords} slug={`kien-thuc/${guide.slug}`} />
      <Schema type="Article" data={{ id: guide.slug, title: guide.title, summary: guide.summary, slug: guide.slug, date: guide.date }} />
      {faq?.kind === "faq" && <Schema type="FAQ" data={{ id: guide.slug, questions: faq.items }} />}

      {/* Hero */}
      <section className="bg-brand-light py-14 sm:py-16 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-[10px] font-mono font-black uppercase tracking-[0.25em] text-brand-primary">{guide.kicker}</span>
            <h1 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-brand-dark mt-3 tracking-tight uppercase leading-tight">{guide.title}</h1>
            <div className="w-16 h-1 bg-brand-primary mt-5"></div>
            <p className="mt-5 text-sm sm:text-base text-gray-600 leading-relaxed">{guide.intro}</p>
            <p className="mt-4 text-[11px] font-mono text-gray-400">Cập nhật {guide.updated} · Đọc khoảng {guide.readingTime}</p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:grid lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-12">
        {/* Mục lục */}
        <aside className="hidden lg:block">
          <nav className="sticky top-28 space-y-1">
            <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400 mb-3">Trong bài</p>
            {guide.blocks.map((b) => (
              <a key={b.id} href={`#${b.id}`} className="block text-sm text-gray-600 hover:text-brand-primary py-1.5 border-l-2 border-gray-100 hover:border-brand-primary pl-3">
                {b.nav}
              </a>
            ))}
          </nav>
        </aside>

        <div className="space-y-16 min-w-0">
          {guide.blocks.map((b) => (
            <section key={b.id} id={b.id} className="scroll-mt-28">
              <SectionTitle icon={b.icon} title={b.title}>{b.lead}</SectionTitle>
              <div className="mt-6">
                <Block block={b} />
              </div>
            </section>
          ))}

          {/* Kết */}
          <section className="bg-brand-dark text-white rounded-2xl p-6 sm:p-8">
            <h2 className="font-display font-black text-xl sm:text-2xl uppercase tracking-tight">{guide.closing.title}</h2>
            <p className="text-sm text-white/75 mt-3 leading-relaxed max-w-2xl">{guide.closing.text}</p>
            <div className="flex flex-wrap gap-3 mt-6">
              {guide.closing.links.map((l) => (
                <Link key={l.href} to={l.href} className="inline-flex items-center rounded-sm bg-brand-primary hover:bg-brand-secondary px-5 py-3 text-xs font-bold uppercase tracking-wider">
                  {l.label} <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              ))}
              <a href={socialConfig.zalo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center rounded-sm border border-white/30 hover:bg-white/10 px-5 py-3 text-xs font-bold uppercase tracking-wider">
                <MessageCircle className="h-4 w-4 mr-2" /> Nhờ Duy xem kênh giúp
              </a>
            </div>
          </section>

          <p className="text-xs text-gray-500 leading-relaxed">
            Chính sách của các nền tảng thay đổi thường xuyên. Bài này tóm tắt những điểm hay gặp ở thời điểm cập nhật, không thay thế quy định chính thức:{" "}
            {guide.sources.map((s, i) => (
              <Fragment key={s.href}>
                {i > 0 && " · "}
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center font-semibold text-brand-primary hover:underline">
                  {s.label} <ExternalLink className="h-3 w-3 ml-0.5" />
                </a>
              </Fragment>
            ))}
            .
          </p>
        </div>
      </div>
    </div>
  );
}

function Block({ block }: { block: GuideBlock }) {
  switch (block.kind) {
    case "cards":
      return (
        <div className="grid sm:grid-cols-2 gap-4">
          {block.items.map((c) => (
            <div key={c.title} className="border border-gray-200 rounded-xl p-5">
              {c.tag && <Tag text={c.tag} />}
              <h3 className={`font-display font-bold text-base text-brand-dark ${c.tag ? "mt-2" : ""}`}>{c.title}</h3>
              <p className="text-sm text-gray-600 mt-1.5 leading-relaxed">{c.detail}</p>
            </div>
          ))}
        </div>
      );
    case "violations":
      return <Violations block={block} />;
    case "checklist":
      return <Checklist items={block.items} doneMessage={block.doneMessage} />;
    case "steps":
      return (
        <ol className="space-y-3">
          {block.items.map((s, i) => (
            <li key={s.title} className="flex gap-4 border border-gray-200 rounded-xl p-5">
              <span className="font-mono text-2xl font-black text-brand-primary/30 leading-none">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="font-display font-bold text-base text-brand-dark">{s.title}</h3>
                <p className="text-sm text-gray-600 mt-1 leading-relaxed">{s.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      );
    case "faq":
      return (
        <div className="divide-y divide-gray-200 border-y border-gray-200">
          {block.items.map((q) => (
            <details key={q.question} className="group py-4">
              <summary className="cursor-pointer list-none flex items-start justify-between gap-4 font-display font-bold text-base text-brand-dark">
                {q.question}
                <span className="text-brand-primary text-xl leading-none group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="text-sm text-gray-600 mt-3 leading-relaxed">{q.answer}</p>
            </details>
          ))}
        </div>
      );
  }
}

const penaltyStyle: Record<string, string> = {
  "Giảm tiếp cận": "text-amber-700 bg-amber-50 border-amber-200",
  "Hạn chế tính năng": "text-orange-700 bg-orange-50 border-orange-200",
  "Admin xoá, chặn": "text-orange-700 bg-orange-50 border-orange-200",
  "Bị báo cáo hàng loạt": "text-orange-700 bg-orange-50 border-orange-200",
  "Gỡ bài": "text-red-700 bg-red-50 border-red-200",
  "Khoá tài khoản": "text-white bg-brand-primary border-brand-primary"
};

function Violations({ block }: { block: Extract<GuideBlock, { kind: "violations" }> }) {
  const [filter, setFilter] = useState<string>("all");
  // Nút lọc lấy từ nhãn có trong dữ liệu; nhãn "Cả hai" luôn hiện
  const tags = [...new Set(block.groups.flatMap((g) => g.items.map((v) => v.tag)).filter((t): t is string => Boolean(t) && t !== ALWAYS_TAG))];
  const matches = (tag?: string) => filter === "all" || !tag || tag === ALWAYS_TAG || tag === filter;

  return (
    <>
      {block.filter && tags.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {["all", ...tags].map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setFilter(t)}
              className={`px-4 py-2 rounded-sm text-xs font-bold uppercase tracking-wider border transition-colors cursor-pointer ${
                filter === t ? "bg-brand-dark text-white border-brand-dark" : "bg-white text-gray-600 border-gray-300 hover:border-brand-primary hover:text-brand-primary"
              }`}
              style={{ minHeight: "40px" }}
            >
              {t === "all" ? "Tất cả" : t}
            </button>
          ))}
        </div>
      )}
      <div className="space-y-10">
        {block.groups.map((g) => {
          const items = g.items.filter((v) => matches(v.tag));
          if (!items.length) return null;
          return (
            <div key={g.name}>
              <h3 className="font-display font-black text-lg text-brand-dark uppercase tracking-tight">{g.name}</h3>
              <p className="text-sm text-gray-500 mt-1">{g.intro}</p>
              <div className="mt-4 space-y-3">
                {items.map((v) => (
                  <article key={v.title} className="border border-gray-200 rounded-xl p-5">
                    <div className="flex flex-wrap items-center gap-2">
                      {v.tag && <Tag text={v.tag} />}
                      <span className={`text-[10px] font-bold uppercase tracking-wider border rounded px-2 py-0.5 ${penaltyStyle[v.penalty] ?? "text-gray-600 bg-gray-50 border-gray-200"}`}>{v.penalty}</span>
                    </div>
                    <h4 className="font-display font-bold text-base text-brand-dark mt-2">{v.title}</h4>
                    <div className="grid sm:grid-cols-2 gap-3 mt-3 text-sm">
                      <p className="bg-red-50/60 rounded-lg p-3 text-gray-700 leading-relaxed">
                        <span className="block text-[10px] font-mono font-bold uppercase tracking-wider text-red-600 mb-1">Hay gặp</span>
                        {v.example}
                      </p>
                      <p className="bg-emerald-50/70 rounded-lg p-3 text-gray-700 leading-relaxed">
                        <span className="block text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-700 mb-1">Làm thay bằng</span>
                        {v.instead}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

function Checklist({ items, doneMessage }: { items: string[]; doneMessage: string }) {
  const [checked, setChecked] = useState<number[]>([]);
  const toggle = (i: number) => setChecked((c) => (c.includes(i) ? c.filter((x) => x !== i) : [...c, i]));

  return (
    <div className="border border-gray-200 rounded-2xl p-4 sm:p-6">
      <div className="flex items-center justify-between gap-4 mb-4">
        <div className="h-2 flex-1 rounded-full bg-gray-100 overflow-hidden">
          <div className="h-full bg-brand-primary transition-all" style={{ width: `${(checked.length / items.length) * 100}%` }} />
        </div>
        <span className="text-xs font-mono font-bold text-gray-500">{checked.length}/{items.length}</span>
      </div>
      <div className="space-y-2">
        {items.map((item, i) => {
          const on = checked.includes(i);
          return (
            <button
              key={item}
              type="button"
              onClick={() => toggle(i)}
              className="w-full text-left flex items-start gap-3 p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              {on ? <CheckSquare className="h-5 w-5 text-brand-primary shrink-0" /> : <Square className="h-5 w-5 text-gray-300 shrink-0" />}
              <span className={`text-sm leading-relaxed ${on ? "line-through text-gray-400" : "text-gray-700"}`}>{item}</span>
            </button>
          );
        })}
      </div>
      {checked.length === items.length && (
        <p className="mt-4 text-sm font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg p-3">{doneMessage}</p>
      )}
    </div>
  );
}

const icons: Record<GuideIcon, ReactNode> = {
  shield: <ShieldCheck className="h-5 w-5" />,
  alert: <AlertTriangle className="h-5 w-5" />,
  check: <CheckSquare className="h-5 w-5" />,
  life: <LifeBuoy className="h-5 w-5" />,
  users: <Users className="h-5 w-5" />,
  calendar: <CalendarDays className="h-5 w-5" />,
  faq: <HelpCircle className="h-5 w-5" />
};

function SectionTitle({ icon, title, children }: { icon?: GuideIcon; title: string; children?: ReactNode }) {
  return (
    <div>
      <h2 className="flex items-center gap-2.5 font-display font-black text-xl sm:text-2xl text-brand-dark uppercase tracking-tight">
        {icon && <span className="w-9 h-9 rounded-sm bg-brand-primary/10 text-brand-primary flex items-center justify-center shrink-0">{icons[icon]}</span>}
        {title}
      </h2>
      {children && <p className="text-sm text-gray-600 mt-2 leading-relaxed">{children}</p>}
    </div>
  );
}

const tagStyle: Record<string, string> = {
  Facebook: "bg-[#1877F2]/10 text-[#1877F2]",
  TikTok: "bg-brand-dark text-white",
  "Có link": "bg-brand-secondary/15 text-brand-secondary",
  "Có ích": "bg-emerald-50 text-emerald-700"
};

function Tag({ text }: { text: string }) {
  return <span className={`inline-block text-[10px] font-bold uppercase tracking-wider rounded px-2 py-0.5 ${tagStyle[text] ?? "bg-gray-100 text-gray-600"}`}>{text}</span>;
}
