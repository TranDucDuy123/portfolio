import { Link } from "react-router-dom";
import { ArrowRight, LayoutGrid, ChevronRight, TrendingUp, Database, CheckSquare, BookOpen, Play } from "lucide-react";
import { blogPosts } from "../data/blog";
import { resourceChecklists } from "../data/resources";
import { startHereItems } from "../data/knowledge";
import { videoFeed } from "../data/videoFeed";
import { socialConfig } from "../config/social";
import Meta from "../components/Meta";

export default function Home() {
  const latestPosts = [...blogPosts].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);

  return (
    <div className="bg-white">
      <Meta
        title="Chuyện web cho chủ doanh nghiệp"
        description="Mình là Đức Duy, người làm web. Mình giải thích website, tên miền, hosting, SEO bằng lời dễ hiểu để chủ doanh nghiệp tự quyết định đúng, và đồng hành làm web khi bạn cần."
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-28 bg-white border-b border-gray-100">
        {/* Clean grid lines pattern background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <span className="inline-flex items-center px-4 py-1.5 rounded-sm text-xs font-bold uppercase tracking-wider text-brand-primary bg-brand-primary/5 border border-brand-primary/20 mb-8 font-mono">
              👋 Mình là Đức Duy, người làm web
            </span>

            <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-brand-dark tracking-tighter uppercase leading-[1.05] mb-8">
              Chuyện web, kể cho <span className="text-brand-primary relative inline-block border-b-4 border-brand-secondary px-1">chủ doanh nghiệp</span> dễ hiểu.
            </h1>

            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Bạn không cần biết code. Nhưng nên hiểu đủ để không bị hớ khi làm web, không phụ thuộc vào người làm web, và không mất trắng khi một tài khoản mạng xã hội bị khoá.
            </p>

            <div className="mt-12 flex flex-col sm:flex-row justify-center items-center gap-4">
              <a
                href="#bat-dau"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-sm text-xs font-bold uppercase tracking-widest text-white bg-brand-primary hover:bg-brand-secondary transition-colors shadow-sm"
                style={{ minHeight: "48px" }}
              >
                Đọc 3 bài đầu tiên
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
              <a
                href={socialConfig.zalo}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-sm text-xs font-bold uppercase tracking-widest text-brand-dark bg-gray-50 hover:bg-gray-100 transition-colors border border-gray-300"
                style={{ minHeight: "48px" }}
              >
                Hỏi Duy qua Zalo
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Bắt đầu từ đây */}
      <section id="bat-dau" className="py-20 bg-white border-b border-gray-200 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <span className="text-[10px] font-mono font-black uppercase tracking-[0.25em] text-brand-primary">📖 BẮT ĐẦU TỪ ĐÂY</span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-brand-dark mt-2 tracking-tight uppercase">
              Mới tìm hiểu về web? Đọc theo thứ tự này
            </h2>
            <p className="mt-4 text-gray-600 text-sm sm:text-base leading-relaxed">
              Ba bài mình hay gửi cho chủ doanh nghiệp trước buổi nói chuyện đầu tiên. Đọc xong, bạn sẽ hỏi người làm web được những câu đúng.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {startHereItems.map((item, idx) => (
              <Link
                key={item.slug}
                to={item.href}
                className="group bg-white rounded-sm border border-gray-200 hover:border-brand-primary/50 p-6 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col relative before:absolute before:top-0 before:left-0 before:right-0 before:h-1.5 before:bg-brand-primary"
              >
                <span className="font-mono text-4xl font-black text-brand-primary/25 mt-2">0{idx + 1}</span>
                <h3 className="font-display font-black text-lg text-brand-dark mt-2 leading-snug uppercase tracking-tight group-hover:text-brand-primary">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm mt-3 leading-relaxed line-clamp-3 flex-1">{item.summary}</p>
                <span className="mt-5 inline-flex items-center text-xs font-bold uppercase tracking-wider text-brand-primary">
                  Đọc bài · {item.readingTime}
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Lối vào feed video ngắn /video */}
      <section className="py-14 bg-brand-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-center">
          <div className="max-w-xl">
            <span className="text-[10px] font-mono font-black uppercase tracking-[0.25em] text-brand-accent">🎬 VIDEO NGẮN</span>
            <h2 className="font-display font-black text-2xl sm:text-3xl mt-2 tracking-tight uppercase">Lười đọc? Lướt video 1 phút</h2>
            <p className="mt-3 text-sm text-gray-300 leading-relaxed">
              Mỗi video một câu hỏi chủ doanh nghiệp hay gặp, kèm ý chính và câu tự kiểm tra 10 giây. Lướt như TikTok.
            </p>
            <Link
              to="/video"
              className="mt-6 inline-flex items-center justify-center px-6 py-3.5 rounded-sm text-xs font-bold uppercase tracking-widest text-white bg-brand-primary hover:bg-brand-secondary transition-colors"
              style={{ minHeight: "48px" }}
            >
              <Play className="mr-2 h-4 w-4" />
              Xem video
            </Link>
          </div>
          <div className="flex gap-3">
            {videoFeed.slice(0, 3).map((v, i) => (
              <Link
                key={v.id}
                to={`/video#${v.id}`}
                className={`group relative w-24 sm:w-28 aspect-[9/16] rounded-lg overflow-hidden bg-black ${i === 2 ? "hidden sm:block" : ""}`}
              >
                <img
                  src={`https://i.ytimg.com/vi/${v.youtubeId}/hqdefault.jpg`}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity"
                />
                <span className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/90 to-transparent text-[10px] font-bold leading-tight line-clamp-3">
                  {v.hook}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Digital Asset Diagram Section */}
      <section className="py-20 bg-brand-light border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[10px] font-mono font-black uppercase tracking-[0.25em] text-brand-secondary">💡 Ý TƯỞNG MÌNH NHẮC NHIỀU NHẤT</span>
            <h2 className="font-display font-black text-3xl text-brand-dark tracking-tight uppercase mt-2">
              Mạng xã hội là đất thuê, website là đất thổ cư
            </h2>
            <div className="w-16 h-1 bg-brand-primary mx-auto mt-4"></div>
            <p className="mt-4 text-gray-600 text-sm sm:text-base">
              Facebook tạo sự chú ý, TikTok tạo lượt tiếp cận. Nhưng muốn giữ khách lâu dài, hãy dẫn họ về nơi bạn thực sự sở hữu.
            </p>
          </div>

          {/* Interactive Responsive Diagram Box */}
          <div className="bg-white rounded-sm border border-gray-300 p-6 sm:p-10 shadow-xs relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-secondary/5 rounded-none rotate-45 transform translate-x-16 -translate-y-16 border-l border-b border-brand-secondary/10"></div>

            {/* Diagram Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center relative z-10">

              {/* Box 1: Traffic Channels */}
              <div className="bg-gray-50 border border-gray-200 p-5 rounded-sm flex flex-col space-y-3">
                <span className="text-[10px] uppercase tracking-widest font-mono font-bold text-brand-secondary">1. KÊNH DẪN KHÁCH (ĐẤT THUÊ)</span>
                <div className="grid grid-cols-2 gap-2 text-xs font-bold font-mono">
                  <div className="bg-white border border-gray-200 p-2.5 rounded-sm text-blue-800 text-center uppercase tracking-wider">Facebook</div>
                  <div className="bg-white border border-gray-200 p-2.5 rounded-sm text-gray-800 text-center uppercase tracking-wider">TikTok</div>
                  <div className="bg-white border border-gray-200 p-2.5 rounded-sm text-red-800 text-center uppercase tracking-wider">YouTube</div>
                  <div className="bg-white border border-gray-200 p-2.5 rounded-sm text-blue-900 text-center uppercase tracking-wider">G-Maps</div>
                </div>
                <p className="text-[11px] text-gray-500 leading-normal">
                  Đông người, dễ được biết đến. Nhưng luật chơi do nền tảng quyết, có thể đổi hoặc khoá tài khoản bất cứ lúc nào.
                </p>
              </div>

              {/* Arrow 1 */}
              <div className="flex justify-center lg:rotate-0 rotate-90">
                <div className="flex flex-col items-center">
                  <span className="text-[9px] font-mono text-brand-primary font-bold tracking-widest">DẪN VỀ</span>
                  <div className="w-12 h-0.5 bg-brand-primary my-1 relative">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-brand-primary rotate-45 border-t border-r border-white"></div>
                  </div>
                </div>
              </div>

              {/* Box 2: Core Platform (Website) */}
              <div className="bg-white border-4 border-brand-primary p-6 rounded-sm flex flex-col items-center text-center space-y-3 relative shadow-xs">
                <div className="absolute -top-3 bg-brand-primary text-white text-[9px] font-mono font-bold px-3 py-0.5 rounded-none uppercase tracking-wider">
                  NHÀ CỦA BẠN
                </div>
                <div className="w-10 h-10 bg-brand-primary flex items-center justify-center rounded-sm text-white transform rotate-45 mb-1 mt-2 shadow-xs">
                  <LayoutGrid className="h-5 w-5 -rotate-45" />
                </div>
                <h3 className="font-display font-black text-lg text-brand-dark leading-tight uppercase tracking-tight">Website Doanh Nghiệp</h3>
                <p className="text-xs text-gray-700 leading-relaxed font-semibold">
                  Tên miền và dữ liệu đứng tên bạn. Nơi khách xem kỹ năng lực, hỏi giá và quyết định tin bạn.
                </p>
                <div className="w-full bg-brand-light border border-gray-300 py-1 px-2.5 rounded-none text-[9px] font-mono text-brand-dark font-bold tracking-widest uppercase text-center">
                  URL: DOANHNGHIEP.VN
                </div>
              </div>

              {/* Arrow 2 */}
              <div className="flex justify-center lg:rotate-0 rotate-90">
                <div className="flex flex-col items-center">
                  <span className="text-[9px] font-mono text-emerald-700 font-bold tracking-widest">GIỮ LẠI</span>
                  <div className="w-12 h-0.5 bg-emerald-600 my-1 relative">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-emerald-600 rotate-45 border-t border-r border-white"></div>
                  </div>
                </div>
              </div>

              {/* Box 3: Growth and Client Data */}
              <div className="bg-emerald-50/50 border border-emerald-200 p-5 rounded-sm flex flex-col space-y-3">
                <span className="text-[10px] uppercase tracking-widest font-mono font-bold text-emerald-700">2. TÀI SẢN CỦA BẠN</span>
                <div className="space-y-2 text-xs font-mono">
                  <div className="bg-white border border-emerald-100 p-2.5 rounded-sm flex items-center space-x-2 text-emerald-800 font-bold">
                    <Database className="h-4 w-4 text-emerald-600" />
                    <span className="uppercase tracking-wider">Dữ liệu KH</span>
                  </div>
                  <div className="bg-white border border-emerald-100 p-2.5 rounded-sm flex items-center space-x-2 text-emerald-800 font-bold">
                    <TrendingUp className="h-4 w-4 text-emerald-600" />
                    <span className="uppercase tracking-wider">Khách quay lại</span>
                  </div>
                </div>
                <p className="text-[11px] text-gray-500 leading-normal">
                  Số điện thoại, email khách để lại thuộc về bạn, chăm sóc lại không tốn tiền quảng cáo.
                </p>
              </div>

            </div>
          </div>

          <div className="text-center mt-10">
            <Link
              to="/cafe-so/website-khac-facebook-the-nao"
              className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-brand-primary hover:text-brand-secondary transition-colors"
            >
              Đọc bài giải thích đầy đủ
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Bài mới */}
      <section className="py-20 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-gray-150 pb-6">
            <div className="max-w-2xl">
              <span className="text-[10px] font-mono font-black uppercase tracking-[0.25em] text-brand-primary">✍️ BÀI MỚI</span>
              <h2 className="font-display font-black text-3xl sm:text-4xl text-brand-dark mt-2 tracking-tight uppercase">
                Mình vừa viết
              </h2>
            </div>
            <Link
              to="/kien-thuc"
              className="mt-4 md:mt-0 inline-flex items-center text-xs font-bold uppercase tracking-widest text-brand-primary hover:text-brand-secondary transition-colors"
            >
              Xem cả thư viện
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestPosts.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="group bg-white rounded-sm border border-gray-200 hover:border-brand-primary/50 p-6 shadow-xs transition-all flex flex-col"
              >
                <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-brand-secondary">{post.category}</span>
                <h3 className="font-display font-black text-base text-brand-dark mt-3 leading-snug uppercase tracking-tight group-hover:text-brand-primary line-clamp-3">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm mt-3 leading-relaxed line-clamp-3 flex-1">{post.summary}</p>
                <span className="mt-5 inline-flex items-center text-[10px] font-mono font-bold text-gray-400 uppercase">
                  <BookOpen className="h-3.5 w-3.5 mr-1.5" /> {post.readingTime}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Checklist + Về Duy */}
      <section className="py-20 bg-brand-light border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white border border-gray-200 rounded-sm p-8 shadow-xs">
            <span className="text-[10px] font-mono font-black uppercase tracking-[0.25em] text-brand-secondary">✅ TỰ KIỂM TRA</span>
            <h2 className="font-display font-black text-2xl text-brand-dark mt-2 tracking-tight uppercase">Website của bạn đang ổn chưa?</h2>
            <p className="mt-3 text-sm text-gray-600 leading-relaxed">
              Bốn bảng checklist ngắn, tự tick trong 10 phút, không cần nhờ ai.
            </p>
            <ul className="mt-6 space-y-3">
              {resourceChecklists.map((c) => (
                <li key={c.id} className="flex items-start text-sm text-brand-dark">
                  <CheckSquare className="h-4 w-4 text-brand-secondary mr-2.5 mt-0.5 flex-shrink-0" />
                  <span>{c.title}</span>
                </li>
              ))}
            </ul>
            <Link
              to="/resources"
              className="mt-8 inline-flex items-center text-xs font-bold uppercase tracking-widest text-brand-primary hover:text-brand-secondary"
            >
              Mở checklist
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          <div className="bg-brand-dark text-white rounded-sm p-8 flex flex-col">
            <span className="text-[10px] font-mono font-black uppercase tracking-[0.25em] text-brand-accent">👋 VỀ DUY</span>
            <h2 className="font-display font-black text-2xl mt-2 tracking-tight uppercase">Người làm web thích giải thích</h2>
            <p className="mt-4 text-sm text-gray-300 leading-relaxed flex-1">
              Mình bắt đầu từ việc viết code, rồi gặp quá nhiều chủ doanh nghiệp bỏ tiền làm web mà không hiểu mình đang có gì. Giờ mình vừa làm web, SEO, kế hoạch đa kênh, vừa viết lại những gì mình biết để bạn đọc miễn phí.
            </p>
            <Link
              to="/about"
              className="mt-8 inline-flex items-center text-xs font-bold uppercase tracking-widest text-brand-accent hover:text-white"
            >
              Đọc thêm về mình
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-brand-dark text-white py-20 sm:py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 rotate-45 transform translate-x-32 -translate-y-32 border border-brand-primary/10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tight">
            Có câu hỏi về web? Cứ hỏi.
          </h2>
          <p className="mt-4 text-gray-400 max-w-xl mx-auto text-sm leading-relaxed">
            Gửi mình link website hoặc kể mình nghe bạn đang kinh doanh gì. Mình sẽ nói thật nên làm gì trước, làm gì sau.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4 max-w-lg mx-auto">
            <a
              href={socialConfig.zalo}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-sm text-xs font-bold uppercase tracking-widest text-white bg-brand-primary hover:bg-brand-secondary transition-colors"
              style={{ minHeight: "48px" }}
            >
              Nhắn Zalo ({socialConfig.phoneDisplay})
            </a>
            <Link
              to="/services"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-sm text-xs font-bold uppercase tracking-widest text-gray-300 bg-gray-800 hover:bg-gray-700 transition-colors border border-gray-700"
              style={{ minHeight: "48px" }}
            >
              Xem mình làm những gì
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
