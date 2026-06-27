import { Link } from "react-router-dom";
import { ArrowRight, HelpCircle, LayoutGrid, CheckCircle2, ChevronRight, TrendingUp, Users, Database, ShieldAlert, FileText } from "lucide-react";
import { caseStudies } from "../data/caseStudies";
import { industrySolutions } from "../data/solutions";
import { cafeSoArticles } from "../data/cafeSo";
import { socialConfig } from "../config/social";
import Meta from "../components/Meta";

export default function Home() {
  return (
    <div className="bg-white">
      <Meta
        title="Website Là Nền Móng Tài Sản Số"
        description="Đức Duy Web - Digital Asset Hub. Tư vấn xây dựng website chuẩn chỉnh, SEO bền vững và chuyển đổi số thực chất cho doanh nghiệp."
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 sm:py-32 bg-white border-b border-gray-100">
        {/* Clean grid lines pattern background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <span className="inline-flex items-center px-4 py-1.5 rounded-sm text-xs font-bold uppercase tracking-wider text-brand-primary bg-brand-primary/5 border border-brand-primary/20 mb-8 font-mono">
              💡 TRIẾT LÝ WEBSITE FIRST — SỞ HỮU TÀI SẢN SỐ
            </span>
            
            <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-brand-dark tracking-tighter uppercase leading-[1.05] mb-8">
              Website là <span className="text-brand-primary relative inline-block border-b-4 border-brand-secondary px-1">nền móng</span> cho tài sản số doanh nghiệp.
            </h1>
            
            <p className="text-base sm:text-lg text-gray-600 font-sans max-w-2xl mx-auto leading-relaxed border-l-4 border-brand-accent pl-4 text-left sm:text-center sm:border-l-0 sm:pl-0">
              Facebook tạo <span className="text-brand-secondary font-bold uppercase tracking-wide">sự chú ý</span>. 
              TikTok tạo <span className="text-brand-secondary font-bold uppercase tracking-wide">lượt tiếp cận</span>. <br className="hidden sm:inline" />
              Website tạo <span className="text-brand-primary font-extrabold uppercase tracking-widest border-b border-brand-primary/30">niềm tin và chuyển đổi</span>.
            </p>

            <div className="mt-12 flex flex-col sm:flex-row justify-center items-center gap-4">
              <Link
                to="/case-study"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-sm text-xs font-bold uppercase tracking-widest text-white bg-brand-primary hover:bg-brand-secondary transition-colors shadow-sm"
                style={{ minHeight: "48px" }}
              >
                Xem Case Study
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                to="/connect"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-sm text-xs font-bold uppercase tracking-widest text-brand-dark bg-gray-50 hover:bg-gray-100 transition-colors border border-gray-300"
                style={{ minHeight: "48px" }}
              >
                Kết nối tư vấn trực tiếp
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Digital Asset Diagram Section */}
      <section className="py-20 bg-brand-light border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[10px] font-mono font-black uppercase tracking-[0.25em] text-brand-secondary">QUY TRÌNH LUÂN CHUYỂN DÒNG TRUY CẬP</span>
            <h2 className="font-display font-black text-3xl text-brand-dark tracking-tight uppercase mt-2">
              Sơ Đồ Hệ Sinh Thái Tài Sản Số
            </h2>
            <div className="w-16 h-1 bg-brand-primary mx-auto mt-4"></div>
            <p className="mt-4 text-gray-600 text-sm">
              Mô hình chuyển dịch khách hàng tự động từ mạng xã hội sang pháo đài dữ liệu doanh nghiệp bền vững.
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
                  Nơi thu hút sự chú ý cực lớn của đám đông nhưng thuật toán liên tục biến động và dễ bay màu tài khoản.
                </p>
              </div>

              {/* Arrow 1 */}
              <div className="flex justify-center lg:rotate-0 rotate-90">
                <div className="flex flex-col items-center">
                  <span className="text-[9px] font-mono text-brand-primary font-bold tracking-widest">CHUYỂN DỊCH</span>
                  <div className="w-12 h-0.5 bg-brand-primary my-1 relative">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-brand-primary rotate-45 border-t border-r border-white"></div>
                  </div>
                </div>
              </div>

              {/* Box 2: Core Platform (Website) */}
              <div className="bg-white border-4 border-brand-primary p-6 rounded-sm flex flex-col items-center text-center space-y-3 relative shadow-xs">
                <div className="absolute -top-3 bg-brand-primary text-white text-[9px] font-mono font-bold px-3 py-0.5 rounded-none uppercase tracking-wider">
                  PHÁO ĐÀI TRUNG TÂM
                </div>
                <div className="w-10 h-10 bg-brand-primary flex items-center justify-center rounded-sm text-white transform rotate-45 mb-1 mt-2 shadow-xs">
                  <LayoutGrid className="h-5 w-5 -rotate-45" />
                </div>
                <h3 className="font-display font-black text-lg text-brand-dark leading-tight uppercase tracking-tight">Website Doanh Nghiệp</h3>
                <p className="text-xs text-gray-700 leading-relaxed font-semibold">
                  Trụ sở số thuộc sở hữu độc quyền 100%. Nơi trưng bày năng lực sắc bén nhất để tạo niềm tin tối đa.
                </p>
                <div className="w-full bg-brand-light border border-gray-300 py-1 px-2.5 rounded-none text-[9px] font-mono text-brand-dark font-bold tracking-widest uppercase text-center">
                  URL: DOANHNGHIEP.VN
                </div>
              </div>

              {/* Arrow 2 */}
              <div className="flex justify-center lg:rotate-0 rotate-90">
                <div className="flex flex-col items-center">
                  <span className="text-[9px] font-mono text-emerald-700 font-bold tracking-widest">TÍCH LŨY</span>
                  <div className="w-12 h-0.5 bg-emerald-600 my-1 relative">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-emerald-600 rotate-45 border-t border-r border-white"></div>
                  </div>
                </div>
              </div>

              {/* Box 3: Growth and Client Data */}
              <div className="bg-emerald-50/50 border border-emerald-200 p-5 rounded-sm flex flex-col space-y-3">
                <span className="text-[10px] uppercase tracking-widest font-mono font-bold text-emerald-700">2. TÀI SẢN VĨNH VIỄN</span>
                <div className="space-y-2 text-xs font-mono">
                  <div className="bg-white border border-emerald-100 p-2.5 rounded-sm flex items-center space-x-2 text-emerald-800 font-bold">
                    <Database className="h-4 w-4 text-emerald-600" />
                    <span className="uppercase tracking-wider">Dữ liệu KH</span>
                  </div>
                  <div className="bg-white border border-emerald-100 p-2.5 rounded-sm flex items-center space-x-2 text-emerald-800 font-bold">
                    <TrendingUp className="h-4 w-4 text-emerald-600" />
                    <span className="uppercase tracking-wider">Tăng trưởng DT</span>
                  </div>
                </div>
                <p className="text-[11px] text-gray-500 leading-normal">
                  Danh sách khách hàng đăng ký, email và số điện thoại hoàn toàn thuộc quyền kiểm soát của bạn để chăm sóc lại miễn phí.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Featured Case Studies */}
      <section className="py-24 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-gray-150 pb-6">
            <div className="max-w-2xl">
              <span className="text-[10px] font-mono font-black uppercase tracking-[0.25em] text-brand-primary">🎯 THỰC CHIẾN QUYẾT ĐỊNH THÀNH BẠI</span>
              <h2 className="font-display font-black text-3xl sm:text-4xl text-brand-dark mt-2 tracking-tight uppercase">
                Case Study Tư Vấn Thiết Kế Bứt Phá Doanh Số
              </h2>
            </div>
            <Link
              to="/case-study"
              className="mt-4 md:mt-0 inline-flex items-center text-xs font-bold uppercase tracking-widest text-brand-primary hover:text-brand-secondary transition-colors"
            >
              Xem toàn bộ Case Study
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.slice(0, 3).map((study) => (
              <div key={study.id} className="bg-white rounded-sm border border-gray-200 hover:border-brand-primary/50 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col relative before:absolute before:top-0 before:left-0 before:right-0 before:h-1.5 before:bg-brand-primary">
                <div className="p-6 pt-8 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="inline-flex items-center px-3 py-1 rounded-sm text-[10px] font-mono font-bold uppercase tracking-wider bg-brand-primary/5 border border-brand-primary/10 text-brand-primary">
                      {study.industry}
                    </span>
                    <h3 className="font-display font-black text-lg text-brand-dark mt-4 leading-snug uppercase tracking-tight line-clamp-2">
                      {study.title}
                    </h3>
                    <p className="text-gray-600 text-xs mt-3 leading-relaxed line-clamp-3">
                      {study.background}
                    </p>
                    {/* Problems preview */}
                    <div className="mt-5 pt-4 border-t border-dashed border-gray-200">
                      <h4 className="text-[10px] font-black text-brand-secondary uppercase tracking-widest font-mono">Vấn đề cốt lõi:</h4>
                      <ul className="mt-2 space-y-1.5 text-xs text-gray-500">
                        {study.problems.slice(0, 2).map((p, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="text-brand-primary mr-1.5 flex-shrink-0 font-bold">•</span>
                            <span className="line-clamp-1">{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-gray-150 flex items-center justify-between">
                    <span className="text-[9px] font-mono font-bold text-gray-400 tracking-wider">CASE STUDY</span>
                    <Link
                      to={`/case-study/${study.slug}`}
                      className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-brand-primary hover:text-brand-secondary border-b-2 border-transparent hover:border-brand-primary pb-0.5"
                      style={{ minHeight: "44px" }}
                    >
                      Đọc đề xuất
                      <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Solutions Showcase */}
      <section className="py-24 bg-brand-light border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-[10px] font-mono font-black uppercase tracking-[0.25em] text-brand-secondary">🛠️ MAY ĐO THEO TỪNG LĨNH VỰC CHUYÊN SỰ</span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-brand-dark mt-2 tracking-tight uppercase">
              Giải Pháp Số Hóa Ngành Dọc Chuyên Sâu
            </h2>
            <div className="w-16 h-1 bg-brand-secondary mx-auto mt-4"></div>
            <p className="mt-4 text-gray-600 text-sm">
              Không thiết kế web đại trà. Chúng tôi nghiên cứu sâu sắc bài toán kinh doanh và hành trình khách hàng riêng cho từng ngành nghề.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industrySolutions.map((sol) => (
              <div key={sol.id} className="bg-white rounded-sm border border-gray-200 p-6 shadow-xs hover:border-brand-secondary/50 transition-all duration-300 flex flex-col justify-between">
                <div>
                  <span className="w-10 h-10 rounded-sm bg-brand-secondary/10 flex items-center justify-center text-brand-secondary font-mono font-black text-base mb-5 border border-brand-secondary/25">
                    {sol.slug.charAt(0).toUpperCase()}
                  </span>
                  <h3 className="font-display font-black text-lg text-brand-dark leading-snug uppercase tracking-tight">
                    {sol.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-2 leading-relaxed line-clamp-2 italic">
                    "{sol.tagline}"
                  </p>
                  <div className="mt-5 space-y-2 border-t border-dashed border-gray-150 pt-4">
                    {sol.problems.slice(0, 2).map((prob, idx) => (
                      <div key={idx} className="flex items-start text-xs text-gray-600">
                        <ShieldAlert className="h-4 w-4 text-brand-primary mr-2 flex-shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{prob}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-gray-150 flex items-center justify-between">
                  <Link
                    to={`/solutions/${sol.slug}`}
                    className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-brand-primary hover:text-brand-secondary border-b-2 border-transparent hover:border-brand-primary pb-0.5"
                    style={{ minHeight: "44px" }}
                  >
                    Chi tiết giải pháp
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cafe Số & Simplify Section */}
      <section className="py-24 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-gray-150 pb-6">
            <div className="max-w-2xl">
              <span className="text-[10px] font-mono font-black uppercase tracking-[0.25em] text-brand-primary">☕ CAFE SỐ — ĐÀM THOẠI BÌNH DÂN</span>
              <h2 className="font-display font-black text-3xl sm:text-4xl text-brand-dark mt-2 tracking-tight uppercase">
                Giải Mã Công Nghệ Bằng Ví Dụ Đời Thường
              </h2>
            </div>
            <Link
              to="/cafe-so"
              className="mt-4 md:mt-0 inline-flex items-center text-xs font-bold uppercase tracking-widest text-brand-primary hover:text-brand-secondary transition-colors"
            >
              Toàn bộ bài viết Cafe Số
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cafeSoArticles.slice(0, 3).map((article) => (
              <div key={article.id} className="bg-white rounded-sm border border-gray-200 hover:border-brand-primary/50 p-6 shadow-xs transition-all duration-300 flex flex-col justify-between relative before:absolute before:top-0 before:left-0 before:right-0 before:h-1.5 before:bg-brand-secondary">
                <div>
                  <span className="text-[9px] uppercase font-mono font-bold tracking-widest text-brand-secondary">
                    CHUYÊN MỤC: {article.category}
                  </span>
                  <h3 className="font-display font-black text-lg text-brand-dark mt-3 leading-snug uppercase tracking-tight line-clamp-2">
                    {article.title}
                  </h3>
                  <div className="mt-4 bg-gray-50 border-l-4 border-brand-accent p-4 rounded-none text-xs italic text-gray-600 leading-relaxed font-sans">
                    <strong>Ví dụ đời thường:</strong> {article.analogy}
                  </div>
                  <p className="text-gray-600 text-xs mt-4 leading-relaxed line-clamp-3">
                    {article.summary}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-gray-150 flex items-center justify-between">
                  <span className="text-[10px] text-gray-400 font-mono font-bold">{article.readingTime.toUpperCase()}</span>
                  <Link
                    to={`/cafe-so/${article.slug}`}
                    className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-brand-primary hover:text-brand-secondary border-b-2 border-transparent hover:border-brand-primary pb-0.5"
                    style={{ minHeight: "44px" }}
                  >
                    Đọc tiếp
                    <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-brand-dark text-white py-20 sm:py-28 relative overflow-hidden border-b border-gray-900">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 rotate-45 transform translate-x-32 -translate-y-32 border border-brand-primary/10"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-secondary/5 rotate-12 transform -translate-x-24 translate-y-24 border border-brand-secondary/10"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="text-[10px] font-mono font-black uppercase tracking-[0.25em] text-brand-accent">HÃY BẮT ĐẦU NGAY</span>
          <h2 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tight mt-3">
            Sẵn sàng xây dựng cột mốc tài sản số bền vững?
          </h2>
          <p className="mt-4 text-gray-400 max-w-xl mx-auto text-xs sm:text-sm leading-relaxed">
            Ngưng đốt tiền vào tiếp thị ngắn hạn trên những vùng đất thuê đầy rủi ro. Hãy kiến tạo ngôi nhà số vững chắc của bạn ngay hôm nay cùng Đức Duy Web.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4 max-w-lg mx-auto">
            <a
              href={socialConfig.zalo}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-sm text-xs font-bold uppercase tracking-widest text-white bg-brand-primary hover:bg-brand-secondary transition-colors"
              style={{ minHeight: "48px" }}
            >
              Nhắn tin Zalo ({socialConfig.phoneDisplay})
            </a>
            <Link
              to="/connect"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-sm text-xs font-bold uppercase tracking-widest text-gray-300 bg-gray-800 hover:bg-gray-700 transition-colors border border-gray-700"
              style={{ minHeight: "48px" }}
            >
              Cổng kết nối trực tiếp
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
