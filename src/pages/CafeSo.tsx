import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Search, Filter, BookOpen, Clock, Tag, X, HelpCircle, ArrowLeft, Send, ArrowUpRight } from "lucide-react";
import { cafeSoArticles } from "../data/cafeSo";
import { CafeSoArticle } from "../types";
import { socialConfig } from "../config/social";
import Meta from "../components/Meta";
import Schema from "../components/Schema";

export default function CafeSo() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Tất cả");
  const [selectedTag, setSelectedTag] = useState<string>("");
  const [activeArticle, setActiveArticle] = useState<CafeSoArticle | null>(null);

  // Extract all unique categories
  const categories = useMemo(() => {
    const list = new Set(cafeSoArticles.map((a) => a.category));
    return ["Tất cả", ...Array.from(list)];
  }, []);

  // Extract all unique tags
  const tags = useMemo(() => {
    const list = new Set<string>();
    cafeSoArticles.forEach((a) => a.tags.forEach((t) => list.add(t)));
    return Array.from(list);
  }, []);

  // Filtered articles
  const filteredArticles = useMemo(() => {
    return cafeSoArticles.filter((article) => {
      const matchesSearch =
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.content.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "Tất cả" || article.category === selectedCategory;

      const matchesTag = !selectedTag || article.tags.includes(selectedTag);

      return matchesSearch && matchesCategory && matchesTag;
    });
  }, [searchQuery, selectedCategory, selectedTag]);

  const handleSelectArticle = (article: CafeSoArticle) => {
    setActiveArticle(article);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToList = () => {
    setActiveArticle(null);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Dynamic SEO Meta Tags */}
      {activeArticle ? (
        <Meta
          title={activeArticle.title}
          description={activeArticle.summary}
          keywords={activeArticle.tags}
          slug={`cafe-so/${activeArticle.slug}`}
        />
      ) : (
        <Meta
          title="Cafe Số - Bình luận kỹ thuật số bình dân"
          description="Giải mã thế giới website, hosting, domain, source code và SEO bằng các ví dụ đời thực mộc mạc nhất. Website là nền móng tài sản số."
        />
      )}

      {/* Render article schema when viewing a single post */}
      {activeArticle && (
        <Schema
          type="Article"
          data={{
            id: activeArticle.id,
            title: activeArticle.title,
            summary: activeArticle.summary,
            slug: activeArticle.slug,
            date: "2026-06-25"
          }}
        />
      )}

      {/* Hero Header */}
      <section className="bg-brand-light py-12 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-brand-primary bg-brand-primary/10 mb-3">
              ☕ Cafe Số - Sáng trà đá, trưa đàm luận
            </span>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-dark tracking-tight leading-tight">
              {activeArticle ? activeArticle.title : "Cafe Số - Giải Mã Website & Kỹ Thuật Số Bình Dân"}
            </h1>
            <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed">
              {activeArticle
                ? `Đang đọc chuyên đề: ${activeArticle.category}`
                : "Nơi chúng ta biến những khái niệm kỹ thuật khô khan thành những câu chuyện đời thường dung dị nhất. Để chủ doanh nghiệp thực sự hiểu và làm chủ tài sản số."}
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {activeArticle ? (
          /* SINGLE ARTICLE READER VIEW */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Article Content */}
            <div className="lg:col-span-2 space-y-6">
              <button
                onClick={handleBackToList}
                className="inline-flex items-center text-sm font-semibold text-brand-primary hover:text-brand-secondary cursor-pointer pb-2"
                style={{ minHeight: "44px" }}
              >
                <ArrowLeft className="h-4 w-4 mr-1.5" />
                Quay lại danh mục Cafe Số
              </button>

              <div className="flex items-center space-x-3 text-xs text-gray-400">
                <span className="bg-brand-primary/10 text-brand-primary px-2.5 py-1 rounded-md font-semibold">
                  {activeArticle.category}
                </span>
                <span>•</span>
                <div className="flex items-center">
                  <Clock className="h-3.5 w-3.5 mr-1" />
                  <span>{activeArticle.readingTime} đọc</span>
                </div>
              </div>

              {/* Analogy Box */}
              <div className="bg-brand-accent/10 border-l-4 border-brand-accent p-5 rounded-r-xl">
                <div className="flex items-start">
                  <HelpCircle className="h-5 w-5 text-brand-secondary mr-2.5 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-display font-bold text-sm text-brand-dark">Ví dụ đời thực mộc mạc:</h4>
                    <p className="text-xs text-gray-700 mt-1.5 leading-relaxed font-sans font-medium italic">
                      &ldquo;{activeArticle.analogy}&rdquo;
                    </p>
                  </div>
                </div>
              </div>

              {/* Rich Content Render */}
              <div className="prose max-w-none text-gray-800 text-sm sm:text-base leading-relaxed space-y-4">
                {activeArticle.content.split("\n\n").map((para, idx) => {
                  if (para.startsWith("###")) {
                    return (
                      <h3 key={idx} className="font-display font-bold text-lg sm:text-xl text-brand-dark pt-4 border-b border-gray-100 pb-2">
                        {para.replace("###", "").trim()}
                      </h3>
                    );
                  }
                  if (para.startsWith("*")) {
                    return (
                      <ul key={idx} className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-gray-600">
                        {para.split("\n").map((li, lIdx) => (
                          <li key={lIdx}>{li.replace("*", "").trim()}</li>
                        ))}
                      </ul>
                    );
                  }
                  if (para.startsWith(">")) {
                    return (
                      <div key={idx} className="bg-gray-50 border-l-4 border-brand-primary p-3 rounded-r-lg text-xs italic font-medium text-brand-primary">
                        {para.replace(">", "").trim()}
                      </div>
                    );
                  }
                  return <p key={idx}>{para}</p>;
                })}
              </div>

              {/* Tags block */}
              <div className="pt-6 border-t border-gray-100 flex flex-wrap gap-2">
                {activeArticle.tags.map((tag) => (
                  <span key={tag} className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-mono text-gray-500 bg-gray-100">
                    <Tag className="h-3 w-3 mr-1" />
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Connect Hub Callout */}
              <div className="bg-brand-dark text-white p-6 rounded-2xl mt-10">
                <h4 className="font-display font-bold text-base">Bạn chưa thực sự yên tâm về Website của mình?</h4>
                <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                  Đừng lo lắng. Hãy liên hệ trực tiếp với Đức Duy để nhận một buổi đàm thoại Cafe Số giải đáp trực tiếp 1-1 cho các khúc mắc kỹ thuật của bạn.
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <a
                    href={socialConfig.zalo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 rounded-lg text-xs font-bold uppercase bg-brand-primary text-white hover:bg-brand-secondary transition-colors"
                  >
                    Tư vấn Zalo
                  </a>
                  <Link
                    to="/connect"
                    className="inline-flex items-center px-4 py-2 rounded-lg text-xs font-bold uppercase bg-gray-800 text-gray-300 hover:text-white transition-colors"
                  >
                    Cổng Kết Nối
                  </Link>
                </div>
              </div>
            </div>

            {/* Sidebar with related articles */}
            <div className="space-y-6">
              <div className="border border-gray-200 rounded-xl p-5 bg-gray-50">
                <h3 className="font-display font-bold text-sm text-brand-dark mb-4 uppercase tracking-wider">Đọc thêm Cafe Số</h3>
                <div className="space-y-4">
                  {cafeSoArticles
                    .filter((a) => a.id !== activeArticle.id)
                    .slice(0, 4)
                    .map((item) => (
                      <button
                        key={item.id}
                        onClick={() => handleSelectArticle(item)}
                        className="w-full text-left group cursor-pointer"
                      >
                        <span className="text-[10px] text-brand-secondary font-bold font-mono uppercase">{item.category}</span>
                        <h4 className="font-display font-semibold text-xs text-brand-dark group-hover:text-brand-primary transition-colors leading-tight mt-0.5">
                          {item.title}
                        </h4>
                        <p className="text-[11px] text-gray-400 mt-1 line-clamp-1">{item.summary}</p>
                      </button>
                    ))}
                </div>
              </div>

              {/* Dynamic Quote Box */}
              <div className="bg-brand-primary/5 p-5 rounded-xl border border-brand-primary/20 text-center">
                <HelpCircle className="h-8 w-8 text-brand-primary mx-auto mb-2" />
                <h4 className="font-display font-bold text-xs uppercase tracking-wider text-brand-primary">Website First</h4>
                <p className="text-[11px] text-gray-600 mt-1 leading-relaxed">
                  &ldquo;Hãy sở hữu lấy một căn nhà riêng trên Internet, thay vì gồng mình đi đóng tiền mặt bằng mạng xã hội đắt đỏ mỗi tháng.&rdquo;
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* ARTICLES LISTING VIEW */
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left Sidebar: Filters */}
            <div className="space-y-6">
              {/* Search input */}
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Tìm kiếm khái niệm..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-gray-200 focus:outline-hidden focus:ring-1 focus:ring-brand-primary"
                  style={{ minHeight: "44px" }}
                />
              </div>

              {/* Category Filter */}
              <div className="border border-gray-200 rounded-xl p-4">
                <div className="flex items-center space-x-2 text-brand-dark font-display font-bold text-xs uppercase tracking-wider mb-3">
                  <Filter className="h-4 w-4 text-brand-primary" />
                  <span>Phân loại chủ đề</span>
                </div>
                <div className="space-y-1">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full text-left px-3 py-2 text-xs rounded-lg transition-all ${
                        selectedCategory === cat
                          ? "bg-brand-primary text-white font-bold"
                          : "text-gray-600 hover:bg-gray-50 hover:text-brand-primary"
                      }`}
                      style={{ minHeight: "44px" }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tag filtering */}
              <div className="border border-gray-200 rounded-xl p-4">
                <h3 className="font-display font-bold text-xs uppercase tracking-wider text-brand-dark mb-3">Thẻ từ khóa</h3>
                <div className="flex flex-wrap gap-1.5">
                  {tags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setSelectedTag(selectedTag === tag ? "" : tag)}
                      className={`px-2 py-1 text-[10px] font-mono rounded-md transition-all ${
                        selectedTag === tag
                          ? "bg-brand-secondary text-white font-bold"
                          : "bg-gray-50 text-gray-500 hover:bg-gray-100"
                      }`}
                      style={{ minHeight: "32px" }}
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
                {selectedTag && (
                  <button
                    onClick={() => setSelectedTag("")}
                    className="mt-3 text-[10px] text-brand-primary hover:underline font-bold flex items-center"
                  >
                    <X className="h-3 w-3 mr-1" />
                    Bỏ chọn thẻ từ khóa
                  </button>
                )}
              </div>
            </div>

            {/* Right Side: Articles Cards Grid */}
            <div className="lg:col-span-3 space-y-6">
              {filteredArticles.length === 0 ? (
                <div className="text-center py-16 border border-dashed border-gray-200 rounded-2xl">
                  <BookOpen className="h-10 w-10 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 text-sm font-medium">Không tìm thấy bài viết Cafe Số nào khớp với bộ lọc của bạn.</p>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("Tất cả");
                      setSelectedTag("");
                    }}
                    className="mt-4 text-xs font-bold text-brand-primary hover:underline"
                  >
                    Đặt lại tất cả bộ lọc
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredArticles.map((article) => (
                    <div
                      key={article.id}
                      className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex justify-between items-center text-[10px] uppercase font-mono font-bold text-brand-secondary">
                          <span>{article.category}</span>
                          <span className="text-gray-400">{article.readingTime}</span>
                        </div>
                        <h3 className="font-display font-bold text-base text-brand-dark mt-2 leading-snug group-hover:text-brand-primary">
                          {article.title}
                        </h3>
                        {/* Short analogy preview */}
                        <div className="mt-3.5 bg-gray-50/80 border-l-3 border-brand-accent p-2.5 rounded-r-lg text-[11px] italic text-gray-500 leading-relaxed">
                          <strong>Mô phỏng:</strong> {article.analogy.substring(0, 110)}...
                        </div>
                        <p className="text-xs text-gray-600 mt-3 line-clamp-2">{article.summary}</p>
                      </div>

                      <div className="mt-5 pt-3.5 border-t border-gray-100 flex items-center justify-between">
                        <div className="flex space-x-1">
                          {article.tags.slice(0, 2).map((t) => (
                            <span key={t} className="text-[9px] font-mono bg-gray-100 px-1.5 py-0.5 rounded text-gray-400">
                              #{t}
                            </span>
                          ))}
                        </div>
                        <button
                          onClick={() => handleSelectArticle(article)}
                          className="inline-flex items-center text-xs font-bold uppercase text-brand-primary hover:text-brand-secondary cursor-pointer"
                          style={{ minHeight: "44px" }}
                        >
                          Đọc ngay
                          <ArrowUpRight className="ml-1 h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
