import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, CheckCircle2, ShieldAlert, Cpu, HeartHandshake, Compass, PlayCircle, HelpCircle } from "lucide-react";
import { industrySolutions } from "../data/solutions";
import { socialConfig } from "../config/social";
import Meta from "../components/Meta";
import Schema from "../components/Schema";

export default function Solutions() {
  const { slug } = useParams<{ slug?: string }>();
  const navigate = useNavigate();

  const activeSolution = industrySolutions.find((s) => s.slug === slug);

  const handleSelectSolution = (solSlug: string) => {
    navigate(`/solutions/${solSlug}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToList = () => {
    navigate("/solutions");
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Dynamic SEO Meta */}
      {activeSolution ? (
        <Meta
          title={activeSolution.title}
          description={activeSolution.tagline}
          keywords={[activeSolution.slug, "giải pháp website", "digital asset", "thiết kế web"]}
          slug={`solutions/${activeSolution.slug}`}
        />
      ) : (
        <Meta
          title="Giải Pháp Website Ngành Dọc - Đức Duy Web"
          description="Nghiên cứu bài toán thực tế và đề xuất bộ giải pháp website toàn diện cho các ngành: Quảng cáo, Đá hoa cương, Bida, Thú cưng, Nội thất."
        />
      )}

      {/* Header Banner */}
      <section className="bg-brand-light py-12 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-primary">
              ⚡ GIẢI PHÁP SỐ HÓA MAY ĐO
            </span>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-dark mt-1 tracking-tight">
              {activeSolution ? activeSolution.title : "Giải Pháp Tài Sản Số Theo Lĩnh Vực Kinh Doanh"}
            </h1>
            <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed">
              {activeSolution
                ? `Giải pháp chi tiết được thiết lập bởi Đức Duy Web`
                : "Chúng tôi loại bỏ hoàn toàn các cấu trúc website rập khuôn. Mỗi ngành nghề có một bối cảnh cạnh tranh và hành vi người dùng hoàn toàn khác nhau."}
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {activeSolution ? (
          /* SOLUTION DETAILS VIEW */
          <div className="space-y-10 animate-fade-in">
            {/* Back Button */}
            <div>
              <button
                onClick={handleBackToList}
                className="inline-flex items-center text-sm font-semibold text-brand-primary hover:text-brand-secondary cursor-pointer"
                style={{ minHeight: "44px" }}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Quay lại tất cả giải pháp ngành
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Left 2 Cols: Technical specifications */}
              <div className="lg:col-span-2 space-y-8">
                
                {/* 1. Industry Problems */}
                <div className="border border-gray-200 rounded-2xl p-6 bg-white shadow-xs">
                  <h3 className="font-display font-bold text-lg text-brand-dark flex items-center mb-4 pb-2 border-b border-gray-100">
                    <ShieldAlert className="h-5 w-5 text-brand-primary mr-2" />
                    Bệnh lý kinh doanh thường gặp trong ngành
                  </h3>
                  <div className="space-y-3">
                    {activeSolution.problems.map((prob, idx) => (
                      <div key={idx} className="flex items-start text-xs text-gray-600 bg-red-50/40 p-3 rounded-lg border border-red-100">
                        <span className="text-brand-primary font-bold mr-2">⚠️</span>
                        <span>{prob}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. Solutions Benefits */}
                <div className="border border-gray-200 rounded-2xl p-6 bg-white shadow-xs">
                  <h3 className="font-display font-bold text-lg text-brand-dark flex items-center mb-4 pb-2 border-b border-gray-100">
                    <HeartHandshake className="h-5 w-5 text-emerald-600 mr-2" />
                    Giá trị & Lợi ích Website mang lại
                  </h3>
                  <div className="space-y-3">
                    {activeSolution.benefits.map((ben, idx) => (
                      <div key={idx} className="flex items-start text-xs text-gray-700 bg-emerald-50/30 p-3 rounded-lg border border-emerald-100">
                        <CheckCircle2 className="h-5 w-5 text-emerald-500 mr-2 flex-shrink-0" />
                        <span>{ben}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. Suggested structure */}
                <div className="border border-gray-200 rounded-2xl p-6 bg-white shadow-xs">
                  <h3 className="font-display font-bold text-lg text-brand-dark flex items-center mb-4 pb-2 border-b border-gray-100">
                    <Compass className="h-5 w-5 text-brand-secondary mr-2" />
                    {activeSolution.suggestedStructure.name}
                  </h3>
                  <div className="space-y-3.5">
                    {activeSolution.suggestedStructure.pages.map((p, idx) => (
                      <div key={idx} className="bg-gray-50 p-4 rounded-xl border border-gray-150 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <span className="text-xs font-bold text-brand-primary font-mono block">TRANG {idx + 1}</span>
                          <h4 className="font-display font-bold text-sm text-brand-dark mt-0.5">{p.name}</h4>
                        </div>
                        <p className="text-xs text-gray-500 max-w-md">{p.purpose}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Right Col: Features & Journey summary */}
              <div className="space-y-6">
                
                {/* Visual features check */}
                <div className="border border-gray-200 rounded-2xl p-6 bg-white shadow-xs">
                  <h3 className="font-display font-bold text-base text-brand-dark mb-4 border-b border-gray-100 pb-2">
                    Tính năng may đo tích hợp
                  </h3>
                  <div className="space-y-3">
                    {activeSolution.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start text-xs text-gray-700 bg-gray-50 px-3 py-2 rounded-lg">
                        <Cpu className="h-4 w-4 text-brand-primary mr-2 mt-0.5 flex-shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Journey preview map */}
                <div className="border border-gray-200 rounded-2xl p-6 bg-white shadow-xs">
                  <h3 className="font-display font-bold text-base text-brand-dark mb-4 border-b border-gray-100 pb-2">
                    Hành trình mua hàng số hóa
                  </h3>
                  <div className="space-y-3 text-xs">
                    {activeSolution.customerJourney.map((step, idx) => (
                      <div key={idx} className="flex items-start">
                        <span className="w-5 h-5 rounded-full bg-brand-secondary/10 text-brand-secondary font-mono font-bold flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span className="text-gray-600">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Solution CTA card */}
                <div className="bg-brand-dark text-white p-6 rounded-2xl text-center space-y-4">
                  <PlayCircle className="h-10 w-10 text-brand-accent mx-auto animate-pulse" />
                  <h4 className="font-display font-bold text-sm">Cần hiện thực hóa mô hình này?</h4>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Tôi cam kết mang lại sản phẩm website chạy mượt mà như ứng dụng di động, tốc độ tải tối ưu hóa và mang nét cá tính độc quyền cho công ty của bạn.
                  </p>
                  <a
                    href={socialConfig.zalo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center py-2.5 rounded-lg text-xs font-bold uppercase bg-brand-primary text-white hover:bg-brand-secondary transition-colors"
                  >
                    Đăng ký tư vấn trực tiếp
                  </a>
                </div>

              </div>
            </div>
          </div>
        ) : (
          /* SOLUTIONS INDEX VIEW */
          <div className="space-y-8 animate-fade-in">
            <div className="max-w-2xl">
              <h2 className="font-display font-bold text-2xl text-brand-dark">Thiết lập cấu trúc số chuyên biệt cho từng lĩnh vực</h2>
              <p className="text-gray-500 text-sm mt-2">
                Hãy lựa chọn lĩnh vực hoạt động của quý công ty để khám phá các bẫy tâm lý người dùng, mô hình cấu trúc trang đề xuất và bản đồ chức năng chi tiết nhất.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {industrySolutions.map((sol) => (
                <div
                  key={sol.id}
                  onClick={() => handleSelectSolution(sol.slug)}
                  className="bg-white border border-gray-200 rounded-xl p-6 shadow-xs hover:shadow-md cursor-pointer group transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <span className="w-10 h-10 rounded-lg bg-brand-primary/10 flex items-center justify-center text-brand-primary font-display font-bold text-sm mb-4 uppercase">
                      {sol.slug.charAt(0)}
                    </span>
                    <h3 className="font-display font-bold text-base text-brand-dark group-hover:text-brand-primary transition-colors leading-snug">
                      {sol.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-2 line-clamp-2 leading-relaxed">
                      {sol.tagline}
                    </p>
                  </div>
                  <div className="mt-6 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-mono text-gray-400">
                    <span>Xem sơ đồ đề xuất</span>
                    <span className="text-brand-secondary font-bold group-hover:translate-x-1 transition-transform">
                      Khám phá →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
