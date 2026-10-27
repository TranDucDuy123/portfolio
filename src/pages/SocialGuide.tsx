import { Fragment, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, ArrowRight, CheckSquare, ExternalLink, LifeBuoy, MessageCircle, ShieldCheck, Square } from "lucide-react";
import Meta from "../components/Meta";
import Schema from "../components/Schema";
import { socialConfig } from "../config/social";
import {
  faq,
  foundation,
  officialSources,
  platformLabel,
  prePostChecklist,
  socialGuideSlug,
  socialGuideUpdated,
  violationGroups,
  whenFlagged,
  type Penalty,
  type Platform
} from "../data/socialGuide";

const sections = [
  { id: "nen-mong", label: "Làm 1 lần khi mở kênh" },
  { id: "loi-de-dinh", label: "Lỗi dễ dính nhất" },
  { id: "truoc-khi-dang", label: "Checklist trước khi đăng" },
  { id: "khi-bi-han-che", label: "Lỡ bị hạn chế thì làm gì" },
  { id: "hoi-dap", label: "Hỏi đáp" }
];

const platformStyle: Record<Platform, string> = {
  facebook: "bg-[#1877F2]/10 text-[#1877F2]",
  tiktok: "bg-brand-dark text-white",
  "ca-hai": "bg-gray-100 text-gray-600"
};

const penaltyStyle: Record<Penalty, string> = {
  "Giảm tiếp cận": "text-amber-700 bg-amber-50 border-amber-200",
  "Hạn chế tính năng": "text-orange-700 bg-orange-50 border-orange-200",
  "Gỡ bài": "text-red-700 bg-red-50 border-red-200",
  "Khoá tài khoản": "text-white bg-brand-primary border-brand-primary"
};

export default function SocialGuide() {
  const [filter, setFilter] = useState<Platform | "all">("all");
  const [checked, setChecked] = useState<number[]>([]);

  const matches = (p: Platform) => filter === "all" || p === "ca-hai" || p === filter;
  const toggle = (i: number) => setChecked((c) => (c.includes(i) ? c.filter((x) => x !== i) : [...c, i]));
  const allDone = checked.length === prePostChecklist.length;

  return (
    <div className="bg-white min-h-screen">
      <Meta
        title="Vận hành Facebook, TikTok không dính vi phạm cộng đồng"
        description="Cẩm nang cho chủ doanh nghiệp tự vận hành fanpage, kênh TikTok: những lỗi hay bị gỡ bài, khoá tài khoản, checklist trước khi đăng và cách xử lý khi bị hạn chế."
        keywords={["vận hành fanpage", "vi phạm tiêu chuẩn cộng đồng facebook", "tiktok bị hạn chế", "nguyên tắc cộng đồng tiktok", "fanpage bị khoá", "đức duy web"]}
        slug={`kien-thuc/${socialGuideSlug}`}
      />
      <Schema
        type="Article"
        data={{
          id: socialGuideSlug,
          title: "Vận hành Facebook, TikTok không dính vi phạm cộng đồng",
          summary: "Những lỗi hay bị gỡ bài, khoá tài khoản và cách vận hành kênh an toàn cho chủ doanh nghiệp.",
          slug: socialGuideSlug,
          date: "2026-10-27"
        }}
      />
      <Schema type="FAQ" data={{ id: socialGuideSlug, questions: faq }} />

      {/* Hero */}
      <section className="bg-brand-light py-14 sm:py-16 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-[10px] font-mono font-black uppercase tracking-[0.25em] text-brand-primary">Cẩm nang vận hành kênh</span>
            <h1 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-brand-dark mt-3 tracking-tight uppercase leading-tight">
              Vận hành Facebook, TikTok không dính vi phạm
            </h1>
            <div className="w-16 h-1 bg-brand-primary mt-5"></div>
            <p className="mt-5 text-sm sm:text-base text-gray-600 leading-relaxed">
              Fanpage và kênh TikTok là đất thuê: chỉ một lần dính gậy là bài không ai thấy, nặng thì mất luôn kênh nuôi mấy năm. Đây là những lỗi chủ doanh nghiệp hay dính nhất mà mình gặp, và cách tránh từ đầu.
            </p>
            <p className="mt-4 text-[11px] font-mono text-gray-400">Cập nhật {socialGuideUpdated} · Đọc khoảng 8 phút</p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:grid lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-12">
        {/* Mục lục */}
        <aside className="hidden lg:block">
          <nav className="sticky top-28 space-y-1">
            <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400 mb-3">Trong bài</p>
            {sections.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="block text-sm text-gray-600 hover:text-brand-primary py-1.5 border-l-2 border-gray-100 hover:border-brand-primary pl-3">
                {s.label}
              </a>
            ))}
          </nav>
        </aside>

        <div className="space-y-16 min-w-0">
          {/* Nền móng */}
          <section id="nen-mong" className="scroll-mt-28">
            <SectionTitle icon={<ShieldCheck className="h-5 w-5" />} title="Làm 1 lần khi mở kênh">
              Phần lớn ca mất trang mình từng xử lý là do mất tài khoản quản trị, không phải do đăng sai.
            </SectionTitle>
            <div className="grid sm:grid-cols-2 gap-4 mt-6">
              {foundation.map((f) => (
                <div key={f.title} className="border border-gray-200 rounded-xl p-5">
                  <PlatformBadge platform={f.platform} />
                  <h3 className="font-display font-bold text-base text-brand-dark mt-2">{f.title}</h3>
                  <p className="text-sm text-gray-600 mt-1.5 leading-relaxed">{f.detail}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Lỗi dễ dính */}
          <section id="loi-de-dinh" className="scroll-mt-28">
            <SectionTitle icon={<AlertTriangle className="h-5 w-5" />} title="Những lỗi dễ dính nhất">
              Mỗi lỗi kèm ví dụ thật hay gặp, mức phạt thường gặp và cách làm thay thế.
            </SectionTitle>

            <div className="flex flex-wrap gap-2 mt-6">
              {(["all", "facebook", "tiktok"] as const).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setFilter(p)}
                  className={`px-4 py-2 rounded-sm text-xs font-bold uppercase tracking-wider border transition-colors cursor-pointer ${
                    filter === p ? "bg-brand-dark text-white border-brand-dark" : "bg-white text-gray-600 border-gray-300 hover:border-brand-primary hover:text-brand-primary"
                  }`}
                  style={{ minHeight: "40px" }}
                >
                  {p === "all" ? "Tất cả" : platformLabel[p]}
                </button>
              ))}
            </div>

            <div className="space-y-10 mt-8">
              {violationGroups.map((g) => {
                const items = g.items.filter((v) => matches(v.platform));
                if (!items.length) return null;
                return (
                  <div key={g.name}>
                    <h3 className="font-display font-black text-lg text-brand-dark uppercase tracking-tight">{g.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{g.intro}</p>
                    <div className="mt-4 space-y-3">
                      {items.map((v) => (
                        <article key={v.title} className="border border-gray-200 rounded-xl p-5">
                          <div className="flex flex-wrap items-center gap-2">
                            <PlatformBadge platform={v.platform} />
                            <span className={`text-[10px] font-bold uppercase tracking-wider border rounded px-2 py-0.5 ${penaltyStyle[v.penalty]}`}>{v.penalty}</span>
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
          </section>

          {/* Checklist */}
          <section id="truoc-khi-dang" className="scroll-mt-28">
            <SectionTitle icon={<CheckSquare className="h-5 w-5" />} title="Checklist 30 giây trước khi bấm Đăng">
              Bấm vào từng dòng khi đã kiểm tra. Đủ hết thì đăng.
            </SectionTitle>
            <div className="mt-6 border border-gray-200 rounded-2xl p-4 sm:p-6">
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="h-2 flex-1 rounded-full bg-gray-100 overflow-hidden">
                  <div className="h-full bg-brand-primary transition-all" style={{ width: `${(checked.length / prePostChecklist.length) * 100}%` }} />
                </div>
                <span className="text-xs font-mono font-bold text-gray-500">{checked.length}/{prePostChecklist.length}</span>
              </div>
              <div className="space-y-2">
                {prePostChecklist.map((item, i) => {
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
              {allDone && (
                <p className="mt-4 text-sm font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg p-3">
                  Ổn rồi, đăng thôi. Nhớ trả lời bình luận trong giờ đầu, đó là lúc bài được đẩy mạnh nhất.
                </p>
              )}
            </div>
          </section>

          {/* Khi bị hạn chế */}
          <section id="khi-bi-han-che" className="scroll-mt-28">
            <SectionTitle icon={<LifeBuoy className="h-5 w-5" />} title="Lỡ bị gỡ bài, hạn chế thì làm gì">
              Bình tĩnh làm theo thứ tự, đừng vội lập kênh mới.
            </SectionTitle>
            <ol className="mt-6 space-y-3">
              {whenFlagged.map((w, i) => (
                <li key={w.title} className="flex gap-4 border border-gray-200 rounded-xl p-5">
                  <span className="font-mono text-2xl font-black text-brand-primary/30 leading-none">0{i + 1}</span>
                  <div>
                    <h3 className="font-display font-bold text-base text-brand-dark">{w.title}</h3>
                    <p className="text-sm text-gray-600 mt-1 leading-relaxed">{w.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* Hỏi đáp */}
          <section id="hoi-dap" className="scroll-mt-28">
            <SectionTitle title="Hỏi đáp nhanh" />
            <div className="mt-6 divide-y divide-gray-200 border-y border-gray-200">
              {faq.map((q) => (
                <details key={q.question} className="group py-4">
                  <summary className="cursor-pointer list-none flex items-start justify-between gap-4 font-display font-bold text-base text-brand-dark">
                    {q.question}
                    <span className="text-brand-primary text-xl leading-none group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="text-sm text-gray-600 mt-3 leading-relaxed">{q.answer}</p>
                </details>
              ))}
            </div>
          </section>

          {/* Kết + nguồn */}
          <section className="bg-brand-dark text-white rounded-2xl p-6 sm:p-8">
            <h2 className="font-display font-black text-xl sm:text-2xl uppercase tracking-tight">Đừng để kênh mạng xã hội là chỗ duy nhất</h2>
            <p className="text-sm text-white/75 mt-3 leading-relaxed max-w-2xl">
              Làm đúng hết vẫn có ngày bị khoá nhầm. Hãy kéo khách từ Facebook, TikTok về nơi bạn tự làm chủ: số Zalo, danh sách khách, website.
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              <Link to="/cafe-so/website-khac-facebook-the-nao" className="inline-flex items-center rounded-sm bg-brand-primary hover:bg-brand-secondary px-5 py-3 text-xs font-bold uppercase tracking-wider">
                Website khác Facebook thế nào <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
              <a href={socialConfig.zalo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center rounded-sm border border-white/30 hover:bg-white/10 px-5 py-3 text-xs font-bold uppercase tracking-wider">
                <MessageCircle className="h-4 w-4 mr-2" /> Nhờ Duy xem kênh giúp
              </a>
            </div>
          </section>

          <div className="text-xs text-gray-500 leading-relaxed">
            <p>
              Chính sách của Meta và TikTok thay đổi thường xuyên. Bài này tóm tắt những điểm hay gặp ở thời điểm cập nhật, không thay thế quy định chính thức:{" "}
              {officialSources.map((s, i) => (
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
    </div>
  );
}

function SectionTitle({ icon, title, children }: { icon?: ReactNode; title: string; children?: ReactNode }) {
  return (
    <div>
      <h2 className="flex items-center gap-2.5 font-display font-black text-xl sm:text-2xl text-brand-dark uppercase tracking-tight">
        {icon && <span className="w-9 h-9 rounded-sm bg-brand-primary/10 text-brand-primary flex items-center justify-center shrink-0">{icon}</span>}
        {title}
      </h2>
      {children && <p className="text-sm text-gray-600 mt-2 leading-relaxed">{children}</p>}
    </div>
  );
}

function PlatformBadge({ platform }: { platform: Platform }) {
  return <span className={`inline-block text-[10px] font-bold uppercase tracking-wider rounded px-2 py-0.5 ${platformStyle[platform]}`}>{platformLabel[platform]}</span>;
}
