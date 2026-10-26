import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen } from "lucide-react";
import Meta from "../components/Meta";
import { knowledgeItems, knowledgeTopics, startHereItems, KnowledgeTopic } from "../data/knowledge";

export default function KienThuc() {
  const [topic, setTopic] = useState<KnowledgeTopic | "Tất cả">("Tất cả");
  const items = topic === "Tất cả" ? knowledgeItems : knowledgeItems.filter((item) => item.topic === topic);

  return (
    <div className="bg-white min-h-screen">
      <Meta
        title="Kiến thức web cho chủ doanh nghiệp"
        description="Thư viện bài viết giải thích website, tên miền, hosting, SEO, Google Maps bằng lời dễ hiểu, giúp chủ doanh nghiệp tự quyết định đúng mà không cần biết code."
        slug="kien-thuc"
      />

      {/* Hero */}
      <section className="bg-brand-light py-16 sm:py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-[10px] font-mono font-black uppercase tracking-[0.25em] text-brand-primary">📚 THƯ VIỆN KIẾN THỨC</span>
            <h1 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-brand-dark mt-3 tracking-tight uppercase leading-tight">
              Hiểu đủ về web để không bị hớ
            </h1>
            <div className="w-16 h-1 bg-brand-primary mt-5"></div>
            <p className="mt-5 text-sm sm:text-base text-gray-600 leading-relaxed">
              Mình gom ở đây những câu chủ doanh nghiệp hay hỏi mình nhất: website là gì, tên miền đứng tên ai, hosting bao nhiêu là đủ, vì sao làm web xong vẫn không có khách. Mỗi bài đọc vài phút, không cần biết code.
            </p>
          </div>
        </div>
      </section>

      {/* Bắt đầu từ đây */}
      <section className="py-14 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display font-black text-xl sm:text-2xl text-brand-dark uppercase tracking-tight">Mới đọc lần đầu? Bắt đầu từ 3 bài này</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {startHereItems.map((item, idx) => (
              <Link
                key={item.slug}
                to={item.href}
                className="group bg-white border border-gray-200 hover:border-brand-primary/50 rounded-sm p-6 shadow-xs transition-all flex flex-col"
              >
                <span className="font-mono text-3xl font-black text-brand-primary/30">0{idx + 1}</span>
                <h3 className="font-display font-black text-base text-brand-dark mt-2 leading-snug uppercase tracking-tight group-hover:text-brand-primary">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-500 mt-3 leading-relaxed line-clamp-3 flex-1">{item.summary}</p>
                <span className="mt-4 inline-flex items-center text-xs font-bold uppercase tracking-wider text-brand-primary">
                  Đọc bài <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Toàn bộ bài theo chủ đề */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display font-black text-xl sm:text-2xl text-brand-dark uppercase tracking-tight">Tất cả bài viết</h2>
          <div className="flex flex-wrap gap-2 mt-6">
            {(["Tất cả", ...knowledgeTopics] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTopic(t)}
                className={`px-4 py-2 rounded-sm text-xs font-bold uppercase tracking-wider border transition-colors cursor-pointer ${
                  topic === t
                    ? "bg-brand-dark text-white border-brand-dark"
                    : "bg-white text-gray-600 border-gray-300 hover:border-brand-primary hover:text-brand-primary"
                }`}
                style={{ minHeight: "40px" }}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {items.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="group bg-white border border-gray-200 hover:border-brand-primary/50 rounded-sm p-6 shadow-xs transition-all flex flex-col"
              >
                <div className="flex items-center justify-between text-[10px] font-mono font-bold uppercase tracking-widest">
                  <span className="text-brand-secondary">{item.topic}</span>
                  <span className="text-gray-400">{item.source}</span>
                </div>
                <h3 className="font-display font-black text-base text-brand-dark mt-3 leading-snug uppercase tracking-tight group-hover:text-brand-primary line-clamp-3">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-500 mt-3 leading-relaxed line-clamp-3 flex-1">{item.summary}</p>
                <span className="mt-4 inline-flex items-center text-[10px] font-mono font-bold text-gray-400 uppercase">
                  <BookOpen className="h-3.5 w-3.5 mr-1.5" /> {item.readingTime}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
