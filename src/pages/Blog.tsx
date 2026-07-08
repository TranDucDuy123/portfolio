import { useState, useMemo, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Search, Filter, BookOpen, Clock, Tag, X, Calendar, ArrowLeft, ArrowUpRight, Copy, Check, Share2 } from "lucide-react";
import { blogPosts } from "../data/blog";
import { BlogPost } from "../types";
import { socialConfig } from "../config/social";
import Meta from "../components/Meta";
import Schema from "../components/Schema";

export default function Blog() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Tất cả");
  const [selectedTag, setSelectedTag] = useState<string>("");
  const [activePost, setActivePost] = useState<BlogPost | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Synchronize activePost with URL slug
  useEffect(() => {
    if (slug) {
      const post = blogPosts.find((p) => p.slug === slug);
      if (post) {
        setActivePost(post);
        window.scrollTo(0, 0);
      } else {
        setActivePost(null);
      }
    } else {
      setActivePost(null);
    }
  }, [slug]);

  const categories = ["Tất cả", "Website", "SEO", "Digital Assets", "Business Strategy", "Conversion", "Content Marketing", "Lead Generation"];

  const tags = useMemo(() => {
    const list = new Set<string>();
    blogPosts.forEach((post) => post.tags.forEach((t) => list.add(t)));
    return Array.from(list);
  }, []);

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "Tất cả" || post.category === selectedCategory;

      const matchesTag = !selectedTag || post.tags.includes(selectedTag);

      return matchesSearch && matchesCategory && matchesTag;
    });
  }, [searchQuery, selectedCategory, selectedTag]);

  const handleSelectPost = (post: BlogPost) => {
    navigate(`/blog/${post.slug}`);
  };

  const handleBackToList = () => {
    navigate("/blog");
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Meta tags for dynamic SEO */}
      {activePost ? (
        <Meta
          title={activePost.title}
          description={activePost.summary}
          keywords={activePost.tags}
          slug={`blog/${activePost.slug}`}
        />
      ) : (
        <Meta
          title="Blog Chiến Lược & Tài Sản Số - Đức Duy Web"
          description="Khám phá các bài chia sẻ chuyên sâu về tối ưu hóa SEO, xây dựng website chuẩn chỉ và tư duy tích lũy giá trị thương mại lâu dài."
        />
      )}

      {/* Article Schema */}
      {activePost && (
        <Schema
          type="Article"
          data={{
            id: activePost.id,
            title: activePost.title,
            summary: activePost.summary,
            slug: activePost.slug,
            date: activePost.date
          }}
        />
      )}

      {/* Header Banner */}
      <section className="bg-brand-light py-12 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-primary">
              📝 BLOG CHIẾN LƯỢC SỐ HÓA
            </span>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-dark mt-1 tracking-tight">
              {activePost ? activePost.title : "Cẩm Nang Chiến Lược Số & Bản Đồ Tài Sản Doanh Nghiệp"}
            </h1>
            <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed">
              {activePost
                ? `Chuyên mục tư duy: ${activePost.category}`
                : "Các bài viết đúc kết kinh nghiệm làm việc trực tiếp, sửa chữa các lỗi sai kinh điển giúp website của quý khách bứt phá doanh số tự nhiên."}
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {activePost ? (
          /* READ BLOG POST */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Core article content */}
            <div className="lg:col-span-2 space-y-6">
              <button
                onClick={handleBackToList}
                className="inline-flex items-center text-sm font-semibold text-brand-primary hover:text-brand-secondary cursor-pointer pb-2"
                style={{ minHeight: "44px" }}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Quay lại danh sách bài viết
              </button>

              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-4">
                <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400">
                  <span className="bg-brand-primary/10 text-brand-primary px-2.5 py-1 rounded-md font-semibold font-mono">
                    {activePost.category}
                  </span>
                  <span className="flex items-center">
                    <Calendar className="h-3.5 w-3.5 mr-1 text-gray-400" />
                    {activePost.date}
                  </span>
                  <span className="flex items-center">
                    <Clock className="h-3.5 w-3.5 mr-1 text-gray-400" />
                    {activePost.readingTime} đọc
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyLink}
                    className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gray-100 hover:bg-brand-primary/10 hover:text-brand-primary text-gray-600 transition-all cursor-pointer"
                    style={{ minHeight: "36px" }}
                  >
                    {copied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-green-500" />
                        <span className="text-green-600">Đã sao chép!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Sao chép link chia sẻ</span>
                      </>
                    )}
                  </button>

                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center p-1.5 rounded-lg bg-gray-100 hover:bg-[#1877F2]/10 hover:text-[#1877F2] text-gray-600 transition-all text-xs font-semibold space-x-1"
                    style={{ minHeight: "36px" }}
                    title="Chia sẻ Facebook"
                  >
                    <Share2 className="h-3.5 w-3.5" />
                    <span>Facebook</span>
                  </a>
                </div>
              </div>

              {/* Body rendering */}
              <div className="prose max-w-none text-gray-800 text-sm sm:text-base leading-relaxed space-y-5 pt-4">
                {activePost.content.split("\n\n").map((para, idx) => {
                  if (para.startsWith("###")) {
                    return (
                      <h3 key={idx} className="font-display font-bold text-lg sm:text-xl text-brand-dark pt-4 border-b border-gray-150 pb-2">
                        {para.replace("###", "").trim()}
                      </h3>
                    );
                  }
                  if (para.startsWith("####")) {
                    return (
                      <h4 key={idx} className="font-display font-bold text-base text-brand-dark pt-3">
                        {para.replace("####", "").trim()}
                      </h4>
                    );
                  }
                  if (para.startsWith("*") || para.startsWith("-")) {
                    return (
                      <ul key={idx} className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-gray-600">
                        {para.split("\n").map((li, lIdx) => (
                          <li key={lIdx}>{li.replace(/^[*-]\s*/, "").trim()}</li>
                        ))}
                      </ul>
                    );
                  }
                  if (para.startsWith("|")) {
                    // Render simple table
                    const rows = para.split("\n").filter(r => r.trim());
                    return (
                      <div key={idx} className="overflow-x-auto my-6 border border-gray-200 rounded-xl">
                        <table className="w-full text-left border-collapse text-xs">
                          <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                              {rows[0].split("|").filter(c => c.trim()).map((cell, cIdx) => (
                                <th key={cIdx} className="p-3 font-semibold text-brand-dark">{cell.trim()}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {rows.slice(2).map((row, rIdx) => (
                              <tr key={rIdx} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                                {row.split("|").filter(c => c.trim()).map((cell, cIdx) => (
                                  <td key={cIdx} className="p-3 text-gray-600">{cell.trim()}</td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    );
                  }
                  if (para.startsWith(">")) {
                    return (
                      <div key={idx} className="bg-brand-primary/5 border-l-4 border-brand-primary p-4 rounded-r-lg text-xs font-semibold italic text-brand-dark leading-relaxed">
                        {para.replace(">", "").trim()}
                      </div>
                    );
                  }
                  return <p key={idx}>{para}</p>;
                })}
              </div>

              {/* Tags block */}
              <div className="pt-6 border-t border-gray-100 flex flex-wrap gap-2">
                {activePost.tags.map((tag) => (
                  <span key={tag} className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-mono text-gray-500 bg-gray-100">
                    <Tag className="h-3 w-3 mr-1" />
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Bottom Share Callout */}
              <div className="bg-brand-light border border-brand-primary/10 p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
                <div className="text-left">
                  <h4 className="font-display font-bold text-sm text-brand-dark">Bạn thấy nội dung này hữu ích?</h4>
                  <p className="text-xs text-gray-500 mt-1">Hãy gửi tặng liên kết này cho bạn bè, đối tác hoặc chia sẻ lên mạng xã hội nhé!</p>
                </div>
                <div className="flex items-center gap-2.5 flex-shrink-0 w-full sm:w-auto justify-end">
                  <button
                    onClick={handleCopyLink}
                    className="inline-flex items-center justify-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-white border border-gray-200 hover:border-brand-primary text-gray-700 hover:text-brand-primary shadow-sm transition-all cursor-pointer w-full sm:w-auto"
                    style={{ minHeight: "40px" }}
                  >
                    {copied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-green-500" />
                        <span className="text-green-600">Đã copy link!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Sao chép link</span>
                      </>
                    )}
                  </button>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-[#1877F2] text-white hover:bg-[#1877F2]/90 shadow-sm transition-all w-full sm:w-auto"
                    style={{ minHeight: "40px" }}
                  >
                    <Share2 className="h-3.5 w-3.5" />
                    <span>Chia sẻ</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Sidebar info */}
            <div className="space-y-6">
              <div className="border border-gray-200 rounded-2xl p-5 bg-gray-50">
                <h3 className="font-display font-bold text-sm text-brand-dark mb-4 uppercase tracking-wider">Bài viết phổ biến</h3>
                <div className="space-y-4">
                  {blogPosts
                    .filter((p) => p.id !== activePost.id)
                    .slice(0, 3)
                    .map((item) => (
                      <button
                        key={item.id}
                        onClick={() => handleSelectPost(item)}
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
            </div>
          </div>
        ) : (
          /* BLOG LISTING VIEW */
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters sidebar */}
            <div className="space-y-6">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Tìm kiếm bài viết..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-gray-200 focus:outline-hidden focus:ring-1 focus:ring-brand-primary"
                  style={{ minHeight: "44px" }}
                />
              </div>

              {/* Categories */}
              <div className="border border-gray-200 rounded-xl p-4">
                <h3 className="font-display font-bold text-xs uppercase tracking-wider text-brand-dark mb-3 flex items-center">
                  <Filter className="h-4 w-4 text-brand-primary mr-1.5" />
                  Chuyên mục
                </h3>
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

              {/* Tags */}
              <div className="border border-gray-200 rounded-xl p-4">
                <h3 className="font-display font-display font-bold text-xs uppercase tracking-wider text-brand-dark mb-3">Tags phổ biến</h3>
                <div className="flex flex-wrap gap-1.5">
                  {tags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setSelectedTag(selectedTag === tag ? "" : tag)}
                      className={`px-2.5 py-1 text-[10px] font-mono rounded-md transition-all ${
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
              </div>
            </div>

            {/* Post cards list */}
            <div className="lg:col-span-3 space-y-6">
              {filteredPosts.length === 0 ? (
                <div className="text-center py-16 border border-dashed border-gray-200 rounded-2xl">
                  <BookOpen className="h-10 w-10 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 text-sm font-medium">Không tìm thấy bài viết chiến lược nào khớp.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredPosts.map((post) => (
                    <div
                      key={post.id}
                      className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex justify-between items-center text-[10px] uppercase font-mono font-bold text-brand-secondary">
                          <span>{post.category}</span>
                          <span className="text-gray-400">{post.date}</span>
                        </div>
                        <h3 className="font-display font-bold text-base text-brand-dark mt-2 leading-snug">
                          {post.title}
                        </h3>
                        <p className="text-xs text-gray-500 mt-3 line-clamp-3 leading-relaxed">
                          {post.summary}
                        </p>
                      </div>

                      <div className="mt-6 pt-3.5 border-t border-gray-100 flex items-center justify-between text-xs">
                        <span className="text-gray-400 font-mono">{post.readingTime}</span>
                        <button
                          onClick={() => handleSelectPost(post)}
                          className="inline-flex items-center text-xs font-bold uppercase text-brand-primary hover:text-brand-secondary cursor-pointer"
                          style={{ minHeight: "44px" }}
                        >
                          Đọc tiếp
                          <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
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
