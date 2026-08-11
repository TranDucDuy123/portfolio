    import React, { useState } from "react";
import { 
  Server, 
  Globe, 
  Code2, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  Calculator, 
  HelpCircle, 
  Share2, 
  Printer, 
  MessageSquare, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  Truck, 
  FileText, 
  Image as ImageIcon, 
  Mail, 
  HardDrive, 
  TrendingUp, 
  MapPin, 
  Zap, 
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  PhoneCall,
  ExternalLink
} from "lucide-react";
import { socialConfig } from "../config/social";
import Schema from "../components/Schema";
import { 
  HOSTING_PLANS, 
  COMPARISON_TABLE, 
  QUIZ_QUESTIONS, 
  FAQ_LIST, 
  HostingPlan 
} from "../data/hostingPlansData";

export default function TuVanHostingMKS() {
  const [copiedLink, setCopiedLink] = useState(false);
  const [isSlideMode, setIsSlideMode] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Quiz calculator state
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({
    1: 1,
    2: 1,
    3: 1,
    4: 1,
    5: 2,
    6: 0
  });

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  // Calculate Quiz Recommendation
  const calculateResult = () => {
    let totalScore = 0;
    (Object.values(quizAnswers) as number[]).forEach((score) => {
      totalScore += score;
    });

    if (totalScore <= 3) {
      return {
        plan: HOSTING_PLANS[0], // 3GB
        reason: "Nhu cầu của quý khách rất cơ bản, chủ yếu tạo website thông tin doanh nghiệp cố định và ít thay đổi nội dung.",
        factors: ["Số trang dưới 10", "Chưa viết bài SEO hàng tháng", "Tải ít ảnh dự án"]
      };
    } else if (totalScore <= 6) {
      return {
        plan: HOSTING_PLANS[1], // 5GB
        reason: "Nhu cầu ở mức vừa phải, website công ty hoạt động ổn định với lượng nội dung và ảnh bài viết cập nhật vừa đủ.",
        factors: ["Số trang 10–15 trang", "Có 1–2 bài viết/tháng", "Dung lượng vừa khít nhu cầu hiện tại"]
      };
    } else if (totalScore <= 11) {
      return {
        plan: HOSTING_PLANS[2], // 10GB (Recommended for MKS)
        reason: "Rất phù hợp với Vận Tải MKS! Đủ không gian phát triển bài viết SEO, lưu thư viện ảnh đội xe, chuyến hàng và email doanh nghiệp mà không lo ngắt quãng.",
        factors: ["Phát triển SEO 2–4 bài/tháng", "Đăng ảnh chuyến hàng thực tế", "Duy trì email doanh nghiệp & dự phòng 30%+"]
      };
    } else {
      return {
        plan: HOSTING_PLANS[3], // 20GB
        reason: "Doanh nghiệp có định hướng đầu tư Marketing & SEO mạnh mẽ dài hạn. Gói 20GB mang lại sự thoải mái tuyệt đối, không lo nghẽn bộ nhớ.",
        factors: ["Nhiều bài SEO & thư viện ảnh lớn", "Nhiều email doanh nghiệp", "Có môi trường thử nghiệm & dự phòng lớn"]
      };
    }
  };

  const currentQuizResult = calculateResult();

  const slidesCount = 10;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev < slidesCount - 1 ? prev + 1 : 0));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : slidesCount - 1));
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Schema
        type="Article"
        data={{
          title: "Đề Xuất Website & Hosting Cho Vận Tải MKS - Đức Duy Web",
          summary: "Tư vấn cấu hình website, giải thích hạ tầng hosting và đề xuất các gói dung lượng 3GB, 5GB, 10GB, 20GB dành riêng cho Vận Tải MKS.",
          slug: "tu-van-mks"
        }}
      />

      <div className="bg-gray-50 min-h-screen text-gray-800 font-sans pb-16">
        {/* Floating Action / Presentation Header Bar */}
        <div className="sticky top-20 z-40 bg-brand-dark/95 backdrop-blur-md text-white py-3 px-4 border-b border-gray-800 shadow-md print:hidden">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center space-x-3">
              <span className="inline-flex items-center space-x-1.5 bg-amber-400 text-brand-dark px-2.5 py-0.5 rounded text-[11px] font-mono font-black uppercase">
                <Truck className="h-3.5 w-3.5" />
                <span>VẬN TẢI MKS</span>
              </span>
              <span className="text-xs text-gray-300 hidden md:inline font-medium">
                Hồ sơ đề xuất Phương án Website & Hosting – Đức Duy Web
              </span>
            </div>

            {/* Slide View vs Scroll View Toggle */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsSlideMode(!isSlideMode)}
                className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  isSlideMode 
                    ? "bg-amber-400 text-brand-dark shadow-sm font-black" 
                    : "bg-gray-800 text-gray-200 hover:bg-gray-700 border border-gray-700"
                }`}
              >
                <Maximize2 className="h-3.5 w-3.5" />
                <span>{isSlideMode ? "Thoát Chế Độ Slide" : "Bật Chế Độ Trình Chiếu Live Slide"}</span>
              </button>

              <button
                onClick={handleCopyLink}
                className="inline-flex items-center space-x-1 px-3 py-1.5 rounded bg-gray-800 hover:bg-gray-700 text-xs font-bold text-gray-200 border border-gray-700 transition-all cursor-pointer"
                title="Sao chép link trang tư vấn"
              >
                {copiedLink ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-green-400" />
                    <span className="text-green-400">Đã chép!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="h-3.5 w-3.5 text-amber-400" />
                    <span>Copy Link</span>
                  </>
                )}
              </button>

              <button
                onClick={() => window.print()}
                className="hidden sm:inline-flex items-center space-x-1 px-3 py-1.5 rounded bg-gray-800 hover:bg-gray-700 text-xs font-bold text-gray-200 border border-gray-700 transition-all cursor-pointer"
              >
                <Printer className="h-3.5 w-3.5 text-gray-300" />
                <span>In PDF</span>
              </button>

              <a
                href={socialConfig.zalo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded bg-brand-primary hover:bg-brand-secondary text-white text-xs font-bold uppercase transition-all"
              >
                <MessageSquare className="h-3.5 w-3.5" />
                <span>Zalo Tư Vấn</span>
              </a>
            </div>
          </div>

          {/* Slide Deck Navigation Bar when Slide Mode active */}
          {isSlideMode && (
            <div className="max-w-7xl mx-auto mt-2.5 pt-2 border-t border-gray-800 flex items-center justify-between text-xs font-mono">
              <button
                onClick={prevSlide}
                className="inline-flex items-center space-x-1 px-2.5 py-1 rounded bg-gray-800 hover:bg-gray-700 text-amber-300 font-bold"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Slide Trước</span>
              </button>

              <div className="flex items-center space-x-1 overflow-x-auto px-2">
                {Array.from({ length: slidesCount }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      currentSlide === idx 
                        ? "bg-amber-400 text-brand-dark" 
                        : "bg-gray-800 text-gray-400 hover:text-white"
                    }`}
                  >
                    Slide {idx + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={nextSlide}
                className="inline-flex items-center space-x-1 px-2.5 py-1 rounded bg-gray-800 hover:bg-gray-700 text-amber-300 font-bold"
              >
                <span>Slide Tiếp</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        {/* MAIN PRESENTATION CONTENT CONTAINER */}
        <div className="max-w-6xl mx-auto px-4 pt-6 space-y-12">

          {/* SECTION 1: HERO MỞ ĐẦU (SLIDE 1) */}
          {(!isSlideMode || currentSlide === 0) && (
            <section id="hero" className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden relative">
              <div className="bg-gradient-to-r from-brand-dark via-slate-900 to-brand-dark text-white p-8 sm:p-12 relative overflow-hidden">
                {/* Background road accent line graphic */}
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:16px_16px]"></div>
                <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-brand-primary/20 rounded-full blur-3xl"></div>

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7 space-y-5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="bg-amber-400 text-brand-dark px-3 py-1 rounded text-xs font-mono font-black uppercase tracking-wider">
                        ĐỨC DUY WEB
                      </span>
                      <span className="bg-white/10 text-amber-300 border border-white/20 px-3 py-1 rounded text-xs font-mono font-bold uppercase tracking-wider">
                        Đề xuất dành cho Vận Tải MKS
                      </span>
                    </div>

                    <h1 className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight leading-tight">
                      ĐỀ XUẤT WEBSITE & HOSTING CHO VẬN TẢI MKS
                    </h1>

                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                      Xây dựng website giới thiệu công ty chuyên nghiệp, phát triển nội dung SEO và chuẩn bị nền tảng ổn định cho hoạt động marketing lâu dài.
                    </p>

                    <div className="flex flex-wrap gap-3 pt-2">
                      <button
                        onClick={() => scrollToSection("calculator")}
                        className="px-6 py-3 rounded-lg bg-amber-500 hover:bg-amber-600 text-brand-dark font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center space-x-2 cursor-pointer"
                      >
                        <Calculator className="h-4 w-4" />
                        <span>Tìm gói hosting phù hợp</span>
                      </button>

                      <button
                        onClick={() => scrollToSection("basics")}
                        className="px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs uppercase tracking-wider transition-all flex items-center space-x-2 cursor-pointer"
                      >
                        <HelpCircle className="h-4 w-4 text-amber-300" />
                        <span>Xem cách website hoạt động</span>
                      </button>
                    </div>
                  </div>

                  {/* Right Dashboard Illustration Panel */}
                  <div className="lg:col-span-5 bg-slate-800/80 p-5 rounded-xl border border-slate-700 shadow-xl space-y-3 font-mono text-xs">
                    <div className="flex items-center justify-between border-b border-slate-700 pb-2">
                      <div className="flex items-center space-x-2 text-amber-400 font-bold">
                        <Truck className="h-4 w-4" />
                        <span>MKS LOGISTICS DASHBOARD</span>
                      </div>
                      <span className="text-[10px] text-green-400 font-bold">● SYSTEM READY</span>
                    </div>

                    <div className="space-y-2">
                      <div className="p-2.5 bg-slate-900/90 rounded border border-slate-700 flex justify-between items-center">
                        <span className="text-gray-400">Tên miền (Domain):</span>
                        <span className="font-bold text-white">vantaimks.vn</span>
                      </div>

                      <div className="p-2.5 bg-slate-900/90 rounded border border-slate-700 flex justify-between items-center">
                        <span className="text-gray-400">Website Công ty:</span>
                        <span className="font-bold text-amber-300">Chuẩn UX / Responsive</span>
                      </div>

                      <div className="p-2.5 bg-slate-900/90 rounded border border-slate-700 flex justify-between items-center">
                        <span className="text-gray-400">Hosting Máy chủ:</span>
                        <span className="font-bold text-green-400">NVMe High Speed</span>
                      </div>

                      <div className="p-2.5 bg-slate-900/90 rounded border border-slate-700 flex justify-between items-center">
                        <span className="text-gray-400">Chiến lược Google SEO:</span>
                        <span className="font-bold text-blue-400">Sẵn sàng phủ từ khóa</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 pt-2 text-center text-[10px]">
                      <div className="bg-slate-900 p-2 rounded border border-slate-700">
                        <span className="text-amber-400 block font-bold">Website</span>
                        <span className="text-gray-300">Chuyên nghiệp</span>
                      </div>
                      <div className="bg-slate-900 p-2 rounded border border-slate-700">
                        <span className="text-green-400 block font-bold">Hosting</span>
                        <span className="text-gray-300">Ổn định 99.9%</span>
                      </div>
                      <div className="bg-slate-900 p-2 rounded border border-slate-700">
                        <span className="text-blue-400 block font-bold">SEO Content</span>
                        <span className="text-gray-300">Phát triển</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* SECTION 2: GIẢI THÍCH WEBSITE HOẠT ĐỘNG THẾ NÀO (SLIDE 2) */}
          {(!isSlideMode || currentSlide === 1) && (
            <section id="basics" className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-10 space-y-8">
              <div className="text-center max-w-3xl mx-auto space-y-2">
                <span className="text-xs font-mono font-bold uppercase text-brand-primary tracking-widest bg-brand-light px-3 py-1 rounded">
                  Nền Tảng Kỹ Thuật Cơ Bản
                </span>
                <h2 className="font-display font-black text-xl sm:text-3xl text-brand-dark uppercase tracking-tight">
                  ĐỂ WEBSITE HOẠT ĐỘNG CẦN NHỮNG GÌ?
                </h2>
                <p className="text-xs sm:text-sm text-gray-600">
                  Một website doanh nghiệp vận tải hoàn chỉnh vận hành dựa trên 3 yếu tố không thể tách rời:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Card 1: Source Code */}
                <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 flex flex-col justify-between hover:shadow-md transition-all">
                  <div>
                    <div className="w-12 h-12 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center mb-4">
                      <Code2 className="h-6 w-6" />
                    </div>
                    <h3 className="font-display font-bold text-lg text-brand-dark mb-2">1. Source Code (Mã Nguồn)</h3>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Source Code là toàn bộ giao diện, nội dung và chức năng tạo nên website. Có thể hiểu Source Code giống như phần kiến trúc và nội thất của một văn phòng.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-200">
                    <span className="text-[11px] font-bold text-blue-900 bg-blue-50 p-2 rounded block">
                      📌 Không có Source Code, website chưa có hình dáng và chức năng.
                    </span>
                  </div>
                </div>

                {/* Card 2: Domain */}
                <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 flex flex-col justify-between hover:shadow-md transition-all">
                  <div>
                    <div className="w-12 h-12 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
                      <Globe className="h-6 w-6" />
                    </div>
                    <h3 className="font-display font-bold text-lg text-brand-dark mb-2">2. Domain (Tên Miền)</h3>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Domain là tên miền, tức địa chỉ để khách hàng truy cập website. Ví dụ địa chỉ thương hiệu: <strong className="text-emerald-800">vantaimks.vn</strong>.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-200">
                    <span className="text-[11px] font-bold text-emerald-900 bg-emerald-50 p-2 rounded block">
                      📌 Domain ngắn, dễ nhớ giúp khách hàng nhận diện doanh nghiệp tốt hơn.
                    </span>
                  </div>
                </div>

                {/* Card 3: Hosting */}
                <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 flex flex-col justify-between hover:shadow-md transition-all">
                  <div>
                    <div className="w-12 h-12 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center mb-4">
                      <Server className="h-6 w-6" />
                    </div>
                    <h3 className="font-display font-bold text-lg text-brand-dark mb-2">3. Hosting (Máy Chủ)</h3>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Hosting là nơi lưu Source Code, hình ảnh, bài viết, email và dữ liệu website. Hosting quyết định website có đủ không gian để phát triển và vận hành ổn định hay không.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-200">
                    <span className="text-[11px] font-bold text-amber-900 bg-amber-50 p-2 rounded block">
                      📌 Dung lượng hosting càng phù hợp, website càng có khoảng trống để mở rộng nội dung và SEO.
                    </span>
                  </div>
                </div>
              </div>

              {/* Formula Banner */}
              <div className="bg-brand-dark text-white p-5 rounded-xl border-2 border-amber-400 text-center font-mono text-xs sm:text-sm font-bold shadow-sm">
                <span className="text-amber-400">DOMAIN</span> + <span className="text-blue-300">SOURCE CODE</span> + <span className="text-green-400">HOSTING</span> = <span className="text-white bg-brand-primary px-2 py-0.5 rounded">WEBSITE HOẠT ĐỘNG HOÀN CHỈNH</span>
              </div>
            </section>
          )}

          {/* SECTION 3: ĐẨY NHU CẦU HOSTING (SLIDE 3) */}
          {(!isSlideMode || currentSlide === 2) && (
            <section id="needs" className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-10 space-y-8">
              <div className="text-center max-w-3xl mx-auto space-y-2">
                <span className="text-xs font-mono font-bold uppercase text-amber-600 tracking-widest bg-amber-50 px-3 py-1 rounded">
                  Tại Sao Cần Chọn Đúng Dung Lượng?
                </span>
                <h2 className="font-display font-black text-xl sm:text-3xl text-brand-dark uppercase tracking-tight">
                  WEBSITE KHÔNG CHỈ CẦN CHỖ ĐỂ CHẠY – WEBSITE CẦN CHỖ ĐỂ PHÁT TRIỂN
                </h2>
                <p className="text-xs sm:text-sm text-gray-600">
                  4 yếu tố chính khiến dung lượng hosting tăng dần theo thời gian vận hành doanh nghiệp:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="p-5 rounded-xl bg-gray-50 border border-gray-200 space-y-2">
                  <div className="flex items-center space-x-2 text-brand-primary font-bold text-sm">
                    <FileText className="h-5 w-5" />
                    <span>1. Bài viết SEO</span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Mỗi bài viết có nội dung, hình ảnh, ảnh đại diện và dữ liệu liên quan. Website càng phát triển SEO thì thư viện nội dung càng lớn.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-gray-50 border border-gray-200 space-y-2">
                  <div className="flex items-center space-x-2 text-brand-primary font-bold text-sm">
                    <ImageIcon className="h-5 w-5" />
                    <span>2. Hình ảnh dự án</span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Ảnh xe, phương tiện, chuyến hàng và hoạt động công ty giúp tăng độ tin cậy nhưng cũng sử dụng dung lượng hosting.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-gray-50 border border-gray-200 space-y-2">
                  <div className="flex items-center space-x-2 text-brand-primary font-bold text-sm">
                    <Mail className="h-5 w-5" />
                    <span>3. Email doanh nghiệp</span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Email theo tên miền có thể chiếm nhiều dung lượng nếu thường xuyên gửi báo giá, hợp đồng và file đính kèm.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-gray-50 border border-gray-200 space-y-2">
                  <div className="flex items-center space-x-2 text-brand-primary font-bold text-sm">
                    <HardDrive className="h-5 w-5" />
                    <span>4. Dữ liệu vận hành</span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Bộ nhớ đệm (Cache), nhật ký hệ thống, bản thử nghiệm và dữ liệu sao lưu (Backup) đều cần khoảng trống để hoạt động an toàn.
                  </p>
                </div>
              </div>

              {/* Callout Highlight */}
              <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-brand-dark p-6 rounded-xl font-display font-bold text-sm sm:text-base text-center shadow-sm">
                “Hosting vừa đủ giúp website chạy hôm nay. Hosting có khoảng dự phòng giúp doanh nghiệp phát triển trong những năm tiếp theo.”
              </div>
            </section>
          )}

          {/* SECTION 4: BẢNG 4 GÓI HOSTING (SLIDE 4) */}
          {(!isSlideMode || currentSlide === 3) && (
            <section id="plans" className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-10 space-y-8">
              <div className="text-center max-w-3xl mx-auto space-y-2">
                <span className="text-xs font-mono font-bold uppercase text-brand-primary tracking-widest bg-brand-light px-3 py-1 rounded">
                  Bảng Cấu Hình Chi Tiết
                </span>
                <h2 className="font-display font-black text-xl sm:text-3xl text-brand-dark uppercase tracking-tight">
                  CÁC GÓI HOSTING ĐỀ XUẤT CHO BÁO GIÁ
                </h2>
                <p className="text-xs sm:text-sm text-gray-600">
                  Lựa chọn dung lượng phù hợp với quy mô và định hướng phát triển Marketing của Vận Tải MKS:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {HOSTING_PLANS.map((plan) => (
                  <div
                    key={plan.id}
                    className={`rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 relative ${
                      plan.isRecommended
                        ? "bg-amber-50/50 border-2 border-amber-500 shadow-lg -translate-y-1"
                        : plan.id === "20gb"
                        ? "bg-brand-dark text-white border-2 border-slate-700 shadow-md"
                        : "bg-white border border-gray-200 hover:border-gray-300 shadow-xs"
                    }`}
                  >
                    {plan.isRecommended && (
                      <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 bg-amber-500 text-brand-dark text-[10px] font-mono font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">
                        ⭐ ĐỀ XUẤT CHO VẬN TẢI MKS
                      </div>
                    )}

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded ${plan.colorScheme.badgeBg} ${plan.colorScheme.badgeText}`}>
                          {plan.tag}
                        </span>
                      </div>

                      <h3 className={`font-display font-black text-lg mb-1 ${plan.id === "20gb" ? "text-white" : "text-brand-dark"}`}>
                        {plan.name}
                      </h3>

                      <div className={`text-xs font-mono font-bold mb-4 ${plan.id === "20gb" ? "text-amber-300" : "text-brand-primary"}`}>
                        Chi phí: <span className="text-sm font-black">{plan.price}</span>
                      </div>

                      <p className={`text-xs mb-4 leading-relaxed font-medium ${plan.id === "20gb" ? "text-gray-300" : "text-gray-600"}`}>
                        {plan.mainDesc}
                      </p>

                      <div className={`p-3 rounded-lg text-[11px] mb-4 italic ${plan.id === "20gb" ? "bg-slate-800 text-amber-200" : "bg-gray-100 text-gray-700"}`}>
                        "{plan.clientMessage}"
                      </div>

                      <div className="space-y-2 mb-4">
                        <span className={`text-[10px] font-mono font-bold uppercase block ${plan.id === "20gb" ? "text-gray-400" : "text-gray-500"}`}>
                          Phù hợp nhu cầu:
                        </span>
                        {plan.suitableFor.map((item, idx) => (
                          <div key={idx} className="flex items-start space-x-1.5 text-[11px]">
                            <CheckCircle2 className={`h-3.5 w-3.5 flex-shrink-0 mt-0.5 ${plan.id === "20gb" ? "text-amber-400" : "text-brand-primary"}`} />
                            <span className={plan.id === "20gb" ? "text-gray-200" : "text-gray-700"}>{item}</span>
                          </div>
                        ))}
                      </div>

                      {plan.limitations && (
                        <div className="space-y-1.5 pt-2 border-t border-gray-200/50">
                          <span className="text-[10px] font-mono font-bold uppercase text-amber-700 block">
                            Hạn chế cần lưu ý:
                          </span>
                          {plan.limitations.map((item, idx) => (
                            <p key={idx} className="text-[10px] text-gray-500 pl-2 border-l-2 border-amber-300">
                              • {item}
                            </p>
                          ))}
                        </div>
                      )}
                    </div>

                    {plan.highlightNote && (
                      <div className="mt-4 pt-3 border-t border-amber-200 bg-amber-100/60 p-2.5 rounded text-[11px] font-bold text-amber-900">
                        💡 {plan.highlightNote}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* SECTION 5: BẢNG SO SÁNH TRỰC QUAN (SLIDE 5) */}
          {(!isSlideMode || currentSlide === 4) && (
            <section id="comparison" className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-10 space-y-8">
              <div className="text-center max-w-3xl mx-auto space-y-2">
                <span className="text-xs font-mono font-bold uppercase text-brand-primary tracking-widest bg-brand-light px-3 py-1 rounded">
                  Đối Chiếu Tiêu Chí
                </span>
                <h2 className="font-display font-black text-xl sm:text-3xl text-brand-dark uppercase tracking-tight">
                  BẢNG SO SÁNH TRỰC QUAN 4 GÓI HOSTING
                </h2>
                <p className="text-xs sm:text-sm text-gray-600">
                  Dễ dàng so sánh năng lực lưu trữ giữa các gói để đưa ra quyết định phù hợp nhất:
                </p>
              </div>

              <div className="overflow-x-auto border border-gray-200 rounded-xl">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-brand-dark text-white font-bold font-mono">
                      <th className="py-3.5 px-4 w-1/4 border-r border-slate-700">Tiêu chí so sánh</th>
                      <th className="py-3.5 px-3 text-center border-r border-slate-700">3GB (Khởi Tạo)</th>
                      <th className="py-3.5 px-3 text-center border-r border-slate-700">5GB (Vừa Đủ)</th>
                      <th className="py-3.5 px-3 text-center bg-amber-500 text-brand-dark border-r border-amber-600 font-black">
                        10GB (SEO MKS) ⭐
                      </th>
                      <th className="py-3.5 px-3 text-center">20GB (Marketing)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {COMPARISON_TABLE.map((row, idx) => (
                      <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50/60"}>
                        <td className="py-3 px-4 font-bold text-brand-dark border-r border-gray-200">
                          {row.category}
                        </td>
                        <td className="py-3 px-3 text-center text-gray-600 border-r border-gray-200 font-medium">
                          {row.p3gb}
                        </td>
                        <td className="py-3 px-3 text-center text-gray-700 border-r border-gray-200 font-medium">
                          {row.p5gb}
                        </td>
                        <td className="py-3 px-3 text-center font-bold text-brand-primary bg-amber-50/50 border-r border-amber-200">
                          {row.p10gb}
                        </td>
                        <td className="py-3 px-3 text-center font-bold text-brand-dark">
                          {row.p20gb}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Technical Notes Box */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-gray-600 space-y-1.5">
                <p className="font-bold text-brand-dark flex items-center space-x-1.5">
                  <ShieldCheck className="h-4 w-4 text-brand-primary" />
                  <span>Lưu ý kỹ thuật quan trọng từ Đức Duy Web:</span>
                </p>
                <p>
                  • Các con số chỉ mang tính định hướng. Dung lượng thực tế phụ thuộc vào kích thước hình ảnh, số lượng email, bộ nhớ đệm cache và cách lưu bản sao lưu.
                </p>
                <p className="text-amber-800 font-medium">
                  • <strong>Đặc biệt lưu ý Video:</strong> Video giới thiệu đội xe nên được đăng trên YouTube/Vimeo rồi nhúng vào website, không nên lưu trực tiếp file .mp4 trên hosting để tiết kiệm dung lượng và tránh làm chậm web.
                </p>
              </div>
            </section>
          )}

          {/* SECTION 6: CÔNG CỤ TÍNH GÓI HOSTING TƯƠNG TÁC (SLIDE 6) */}
          {(!isSlideMode || currentSlide === 5) && (
            <section id="calculator" className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-10 space-y-8">
              <div className="text-center max-w-3xl mx-auto space-y-2">
                <span className="text-xs font-mono font-bold uppercase text-amber-600 tracking-widest bg-amber-50 px-3 py-1 rounded">
                  Công Cụ Trực Quan Interactive
                </span>
                <h2 className="font-display font-black text-xl sm:text-3xl text-brand-dark uppercase tracking-tight">
                  THỬ TÍNH GÓI HOSTING PHÙ HỢP VỚI NHU CẦU MKS
                </h2>
                <p className="text-xs sm:text-sm text-gray-600">
                  Trả lời nhanh 6 câu hỏi dưới đây để hệ thống tự động đề xuất cấu hình tối ưu:
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Questions Input Form */}
                <div className="lg:col-span-7 space-y-5">
                  {QUIZ_QUESTIONS.map((q) => (
                    <div key={q.id} className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-2">
                      <label className="font-bold text-xs text-brand-dark block">
                        {q.question}
                      </label>
                      <div className="space-y-1.5">
                        {q.options.map((opt, optIdx) => (
                          <label
                            key={optIdx}
                            className={`flex items-center space-x-2.5 p-2 rounded text-xs cursor-pointer transition-all ${
                              quizAnswers[q.id] === opt.points
                                ? "bg-amber-100/80 border border-amber-400 font-bold text-brand-dark"
                                : "bg-white hover:bg-gray-100 border border-gray-200 text-gray-700"
                            }`}
                          >
                            <input
                              type="radio"
                              name={`q_${q.id}`}
                              checked={quizAnswers[q.id] === opt.points}
                              onChange={() => setQuizAnswers({ ...quizAnswers, [q.id]: opt.points })}
                              className="text-brand-primary focus:ring-brand-primary"
                            />
                            <span>{opt.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Real-time Calculation Result Box */}
                <div className="lg:col-span-5 sticky top-36 bg-brand-dark text-white p-6 rounded-2xl border-2 border-amber-400 shadow-xl space-y-5">
                  <div className="flex items-center justify-between border-b border-gray-800 pb-3">
                    <span className="text-xs font-mono font-bold uppercase text-amber-400">
                      KẾT QUẢ ĐỀ XUẤT TỰ ĐỘNG
                    </span>
                    <Sparkles className="h-4 w-4 text-amber-400" />
                  </div>

                  <div>
                    <span className="text-[11px] text-gray-400 uppercase font-mono block">Gói Hosting đề xuất:</span>
                    <h3 className="font-display font-black text-2xl text-amber-300 mt-0.5">
                      {currentQuizResult.plan.name}
                    </h3>
                    <span className="inline-block bg-amber-400 text-brand-dark text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded mt-1">
                      {currentQuizResult.plan.tag}
                    </span>
                  </div>

                  <div className="p-3 bg-slate-800/80 rounded-lg text-xs leading-relaxed text-gray-200 border border-slate-700">
                    <strong className="text-amber-300 block mb-1">Lý do chọn gói này:</strong>
                    {currentQuizResult.reason}
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <span className="text-[11px] font-mono text-gray-400 uppercase block">
                      Các yếu tố chính đã ảnh hưởng:
                    </span>
                    {currentQuizResult.factors.map((f, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-gray-300">
                        <Check className="h-3.5 w-3.5 text-amber-400 flex-shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 space-y-2">
                    <a
                      href={socialConfig.zalo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center space-x-2 py-3 rounded-lg bg-amber-400 hover:bg-amber-500 text-brand-dark font-black text-xs uppercase tracking-wider transition-all shadow-sm"
                    >
                      <span>Nhận tư vấn cấu hình thực tế</span>
                      <ArrowRight className="h-4 w-4" />
                    </a>

                    <button
                      onClick={() => scrollToSection("plans")}
                      className="w-full py-2 text-center text-xs text-gray-400 hover:text-white underline cursor-pointer"
                    >
                      So sánh lại chi tiết 4 gói
                    </button>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* SECTION 7: ĐỊNH HƯỚNG SEO CHO VẬN TẢI MKS (SLIDE 7) */}
          {(!isSlideMode || currentSlide === 6) && (
            <section id="seo-plan" className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-10 space-y-8">
              <div className="text-center max-w-3xl mx-auto space-y-2">
                <span className="text-xs font-mono font-bold uppercase text-brand-primary tracking-widest bg-brand-light px-3 py-1 rounded">
                  Chiến Lược Tăng Trưởng Doanh Thu
                </span>
                <h2 className="font-display font-black text-xl sm:text-3xl text-brand-dark uppercase tracking-tight">
                  HOSTING LÀ NỀN TẢNG – NỘI DUNG SEO LÀ CÁCH WEBSITE TẠO RA KHÁCH HÀNG
                </h2>
                <p className="text-xs sm:text-sm text-gray-600">
                  Phân bổ 4 nhóm nội dung cốt lõi giúp Vận Tải MKS phủ sóng từ khóa tìm kiếm trên Google:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex items-center space-x-2 text-brand-primary font-bold text-sm">
                    <Truck className="h-5 w-5" />
                    <span>1. Nhóm Dịch Vụ Cốt Lõi</span>
                  </div>
                  <ul className="text-xs text-gray-600 space-y-1 pl-4 list-disc">
                    <li>Dịch vụ vận chuyển hàng hóa trọn gói</li>
                    <li>Cho thuê xe tải chở hàng (1.5 tấn - 15 tấn)</li>
                    <li>Vận chuyển hàng hóa nội thành & liên tỉnh</li>
                    <li>Dịch vụ vận chuyển hàng công trình theo hợp đồng</li>
                  </ul>
                </div>

                <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex items-center space-x-2 text-brand-primary font-bold text-sm">
                    <MapPin className="h-5 w-5" />
                    <span>2. Nhóm Tuyến Đường Khai Thác</span>
                  </div>
                  <ul className="text-xs text-gray-600 space-y-1 pl-4 list-disc">
                    <li>Các tuyến đường trọng điểm MKS đang triển khai</li>
                    <li>Trang thông tin chi tiết từng tuyến: Thời gian, phương tiện</li>
                    <li>Bảng giá cước tham khảo & cách đặt xe nhanh</li>
                  </ul>
                </div>

                <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex items-center space-x-2 text-brand-primary font-bold text-sm">
                    <FileText className="h-5 w-5" />
                    <span>3. Nhóm Kiến Thức & Hướng Dẫn</span>
                  </div>
                  <ul className="text-xs text-gray-600 space-y-1 pl-4 list-disc">
                    <li>Cách tính cước phí vận chuyển hàng hóa tối ưu</li>
                    <li>Kinh nghiệm chọn loại xe tải phù hợp với hàng hóa</li>
                    <li>Quy cách đóng gói hàng hóa an toàn khi đi xa</li>
                    <li>Phân biệt hàng ghép và hàng vận chuyển nguyên chuyến</li>
                  </ul>
                </div>

                <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex items-center space-x-2 text-brand-primary font-bold text-sm">
                    <ShieldCheck className="h-5 w-5" />
                    <span>4. Nhóm Chứng Minh Năng Lực</span>
                  </div>
                  <ul className="text-xs text-gray-600 space-y-1 pl-4 list-disc">
                    <li>Hình ảnh thực tế đội xe tải & bãi xe MKS</li>
                    <li>Hình ảnh các chuyến hàng thực tế đã hoàn thành</li>
                    <li>Quy trình giao nhận & cam kết bồi thường hàng hóa</li>
                    <li>Đối tác & cảm nhận của khách hàng</li>
                  </ul>
                </div>
              </div>

              {/* Roadmap timeline */}
              <div className="pt-4 border-t border-gray-200">
                <span className="text-xs font-mono font-bold uppercase text-gray-500 block mb-3">
                  Lộ trình 4 giai đoạn SEO cho Vận Tải MKS:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <div className="bg-brand-primary/5 p-3 rounded border border-brand-primary/20 text-xs">
                    <span className="font-mono font-bold text-brand-primary block">GIAI ĐOẠN 1</span>
                    <p className="text-gray-700 font-bold mt-0.5">Hoàn thiện Website & Các trang Dịch vụ</p>
                  </div>
                  <div className="bg-brand-primary/5 p-3 rounded border border-brand-primary/20 text-xs">
                    <span className="font-mono font-bold text-brand-primary block">GIAI ĐOẠN 2</span>
                    <p className="text-gray-700 font-bold mt-0.5">Viết Nội dung SEO & Tuyến vận chuyển</p>
                  </div>
                  <div className="bg-brand-primary/5 p-3 rounded border border-brand-primary/20 text-xs">
                    <span className="font-mono font-bold text-brand-primary block">GIAI ĐOẠN 3</span>
                    <p className="text-gray-700 font-bold mt-0.5">Tối ưu Google & Thu hút yêu cầu Báo giá</p>
                  </div>
                  <div className="bg-brand-primary/5 p-3 rounded border border-brand-primary/20 text-xs">
                    <span className="font-mono font-bold text-brand-primary block">GIAI ĐOẠN 4</span>
                    <p className="text-gray-700 font-bold mt-0.5">Cập nhật Dự án & Duy trì Nhận diện</p>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* SECTION 8: KHUYẾN NGHỊ RIÊNG CHO MKS (SLIDE 8) */}
          {(!isSlideMode || currentSlide === 7) && (
            <section id="recommendation" className="bg-gradient-to-br from-brand-dark via-slate-900 to-brand-dark text-white rounded-2xl p-6 sm:p-10 border-2 border-amber-400 shadow-xl space-y-6">
              <div className="flex items-center space-x-2 text-amber-400 font-mono text-xs font-bold uppercase">
                <Sparkles className="h-4 w-4" />
                <span>ĐỀ XUẤT DÀNH RIÊNG CHO MKS DỮ LIỆU TỪ ĐỨC DUY WEB</span>
              </div>

              <h2 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight">
                ĐỀ XUẤT CỦA ĐỨC DUY WEB DÀNH CHO VẬN TẢI MKS
              </h2>

              <div className="space-y-4 text-xs sm:text-sm text-gray-200 leading-relaxed font-medium">
                <p className="p-4 bg-slate-800/90 rounded-xl border border-slate-700">
                  👉 <strong>Trường hợp 1:</strong> Nếu Vận Tải MKS chỉ cần một website giới thiệu cơ bản và ít cập nhật, gói <strong>5GB</strong> có thể đáp ứng. Tuy nhiên, nếu công ty muốn xây dựng nhận diện thương hiệu, đăng hình ảnh dự án thực tế và phát triển bài viết SEO lâu dài, gói <strong className="text-amber-300 font-bold">10GB (SEO Tăng Trưởng)</strong> là lựa chọn cân bằng nhất giữa chi phí và hiệu quả.
                </p>

                <p className="p-4 bg-slate-800/90 rounded-xl border border-slate-700">
                  👉 <strong>Trường hợp 2:</strong> Nếu MKS xác định viết nội dung thường xuyên, phát triển nhiều tuyến dịch vụ mới, sử dụng nhiều địa chỉ email doanh nghiệp và muốn hạn chế tối đa việc phải nâng cấp gói sớm, gói <strong className="text-amber-300 font-bold">20GB (Marketing Dài Hạn)</strong> sẽ tạo khoảng vận hành cực kỳ thoải mái.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href={socialConfig.zalo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-lg bg-amber-400 hover:bg-amber-500 text-brand-dark font-black text-xs uppercase tracking-wider shadow-md transition-all flex items-center space-x-2"
                >
                  <span>Chọn Gói 10GB – SEO Tăng Trưởng (Đề xuất)</span>
                  <ArrowRight className="h-4 w-4" />
                </a>

                <a
                  href={socialConfig.zalo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs uppercase tracking-wider transition-all flex items-center space-x-2"
                >
                  <span>Chọn Gói 20GB – Marketing Dài Hạn</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </section>
          )}

          {/* SECTION 9: FAQ ACCORDION (SLIDE 9) */}
          {(!isSlideMode || currentSlide === 8) && (
            <section id="faq" className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-10 space-y-8">
              <div className="text-center max-w-3xl mx-auto space-y-2">
                <span className="text-xs font-mono font-bold uppercase text-brand-primary tracking-widest bg-brand-light px-3 py-1 rounded">
                  Giải Đáp Thắc Mắc Kỹ Thuật
                </span>
                <h2 className="font-display font-black text-xl sm:text-3xl text-brand-dark uppercase tracking-tight">
                  CÂU HỎI THƯỜNG GẶP (FAQ) VỀ HOSTING & WEBSITE
                </h2>
                <p className="text-xs sm:text-sm text-gray-600">
                  Những thắc mắc phổ biến giúp khách hàng hiểu rõ giá trị thực sự của hạ tầng hosting:
                </p>
              </div>

              <div className="space-y-3 max-w-4xl mx-auto">
                {FAQ_LIST.map((faq, idx) => (
                  <div
                    key={idx}
                    className="border border-gray-200 rounded-xl overflow-hidden transition-all"
                  >
                    <button
                      onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                      className="w-full p-4 text-left font-bold text-xs sm:text-sm text-brand-dark bg-gray-50 hover:bg-gray-100 flex items-center justify-between transition-colors cursor-pointer"
                    >
                      <span>{faq.question}</span>
                      {openFaqIndex === idx ? (
                        <ChevronUp className="h-4 w-4 text-brand-primary flex-shrink-0" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-gray-400 flex-shrink-0" />
                      )}
                    </button>

                    {openFaqIndex === idx && (
                      <div className="p-4 bg-white text-xs text-gray-600 leading-relaxed border-t border-gray-200 animate-fade-in">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* SECTION 10: CTA CUỐI TRANG (SLIDE 10) */}
          {(!isSlideMode || currentSlide === 9) && (
            <section id="cta" className="bg-brand-dark text-white rounded-2xl p-8 sm:p-12 text-center space-y-6 relative overflow-hidden">
              <div className="max-w-3xl mx-auto space-y-4 relative z-10">
                <span className="inline-block bg-amber-400 text-brand-dark px-3 py-1 rounded font-mono text-xs font-black uppercase">
                  ĐỨC DUY WEB TƯ VẤN ĐỒNG HÀNH
                </span>

                <h2 className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight">
                  CHỌN HOSTING KHÔNG CHỈ CHO WEBSITE HÔM NAY – HÃY CHỌN CHO KẾ HOẠCH PHÁT TRIỂN TIẾP THEO
                </h2>

                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto">
                  Đức Duy Web sẽ dựa trên số lượng trang, hình ảnh, email và kế hoạch SEO thực tế của Vận Tải MKS để tư vấn cấu hình phù hợp, tránh mua thiếu nhưng cũng không lãng phí tài nguyên.
                </p>

                <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                  <a
                    href={socialConfig.zalo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3.5 rounded-lg bg-brand-primary hover:bg-brand-secondary text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center space-x-2"
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span>Nhận tư vấn hosting qua Zalo</span>
                  </a>

                  <a
                    href={`tel:${socialConfig.phone}`}
                    className="px-6 py-3.5 rounded-lg bg-amber-400 hover:bg-amber-500 text-brand-dark font-black text-xs uppercase tracking-wider shadow-md transition-all flex items-center space-x-2"
                  >
                    <PhoneCall className="h-4 w-4" />
                    <span>Hotline: {socialConfig.phoneDisplay}</span>
                  </a>
                </div>

                {/* Contact info variables block */}
                <div className="pt-6 border-t border-gray-800 text-xs font-mono text-gray-400 grid grid-cols-1 sm:grid-cols-3 gap-2 max-w-2xl mx-auto">
                  <div>
                    <span className="block text-gray-500">Hotline tư vấn:</span>
                    <strong className="text-white">{socialConfig.phoneDisplay}</strong>
                  </div>
                  <div>
                    <span className="block text-gray-500">Website chính thức:</span>
                    <strong className="text-amber-400">ducduyweb.vn</strong>
                  </div>
                  <div>
                    <span className="block text-gray-500">Email liên hệ:</span>
                    <strong className="text-white">{socialConfig.email}</strong>
                  </div>
                </div>
              </div>
            </section>
          )}

        </div>
      </div>
    </>
  );
}
