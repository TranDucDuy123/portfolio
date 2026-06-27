import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, CheckCircle2, AlertTriangle, Lightbulb, Compass, Award, Cpu, FileSpreadsheet, ChevronRight, MessageSquare } from "lucide-react";
import { caseStudies } from "../data/caseStudies";
import { CaseStudyProposal } from "../types";
import { socialConfig } from "../config/social";
import Meta from "../components/Meta";
import Schema from "../components/Schema";

export default function CaseStudies() {
  const { slug } = useParams<{ slug?: string }>();
  const navigate = useNavigate();

  // Find active case study if slug is present in URL
  const activeStudy = caseStudies.find((cs) => cs.slug === slug);

  const handleSelectCase = (csSlug: string) => {
    navigate(`/case-study/${csSlug}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToList = () => {
    navigate("/case-study");
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Dynamic SEO Meta */}
      {activeStudy ? (
        <Meta
          title={activeStudy.title}
          description={activeStudy.background}
          keywords={[activeStudy.industry, "tài sản số", "đề xuất website", activeStudy.slug]}
          slug={`case-study/${activeStudy.slug}`}
        />
      ) : (
        <Meta
          title="Thư viện Case Study - Cố vấn tài sản số"
          description="Khám phá các đề xuất cấu trúc website chi tiết, quy trình vận hành và chiến lược tài sản số thực chiến cho từng lĩnh vực kinh doanh cụ thể."
        />
      )}

      {/* Schema Structured Data for Case Study */}
      {activeStudy && (
        <Schema
          type="CaseStudy"
          data={{
            id: activeStudy.id,
            title: activeStudy.title,
            background: activeStudy.background,
            suggestedFeatures: activeStudy.suggestedFeatures
          }}
        />
      )}

      {/* Header Banner */}
      <section className="bg-brand-light py-12 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-primary">
              📂 THƯ VIỆN ĐỀ XUẤT THỰC CHIẾN
            </span>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-dark mt-1 tracking-tight">
              {activeStudy ? activeStudy.title : "Thư Viện Case Study & Đề Xuất Cấu Trúc Website"}
            </h1>
            <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed">
              {activeStudy
                ? `Mô hình tài sản số chi tiết cho ngành: ${activeStudy.industry}`
                : "Chúng tôi lập chi tiết các bài toán, cơ hội chuyển mình, cấu trúc sơ đồ trang và hành trình khách hàng số hóa cho từng lĩnh vực cụ thể để quý khách tham khảo trực tiếp."}
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {activeStudy ? (
          /* CASE STUDY DETAIL VIEW */
          <div className="space-y-10">
            {/* Back Button */}
            <div>
              <button
                onClick={handleBackToList}
                className="inline-flex items-center text-sm font-semibold text-brand-primary hover:text-brand-secondary cursor-pointer"
                style={{ minHeight: "44px" }}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Quay lại thư viện Case Study
              </button>
            </div>

            {/* Main Proposal Content Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Left 2 Columns: Core Content */}
              <div className="lg:col-span-2 space-y-8">
                
                {/* Section 1: Background & Problems */}
                <div className="border border-gray-200 rounded-2xl p-6 bg-white shadow-xs">
                  <h3 className="font-display font-bold text-lg text-brand-dark flex items-center mb-4 pb-2 border-b border-gray-100">
                    <AlertTriangle className="h-5 w-5 text-brand-primary mr-2" />
                    Bối cảnh & Vấn đề Doanh nghiệp gặp phải
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">
                    {activeStudy.background}
                  </p>
                  <div className="space-y-3">
                    <h4 className="text-xs uppercase font-mono font-bold tracking-wider text-brand-primary">Nỗi đau nhức nhối:</h4>
                    <div className="grid grid-cols-1 gap-2.5">
                      {activeStudy.problems.map((prob, idx) => (
                        <div key={idx} className="flex items-start text-xs text-gray-600 bg-red-50/50 p-2.5 rounded-lg border border-red-100">
                          <span className="text-brand-primary font-bold mr-2">❌</span>
                          <span>{prob}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Section 2: Analysis & Opportunities */}
                <div className="border border-gray-200 rounded-2xl p-6 bg-white shadow-xs">
                  <h3 className="font-display font-bold text-lg text-brand-dark flex items-center mb-4 pb-2 border-b border-gray-100">
                    <Lightbulb className="h-5 w-5 text-brand-secondary mr-2" />
                    Phân tích Chuyên môn & Cơ hội Bứt phá
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">
                    {activeStudy.analysis}
                  </p>
                  <div className="space-y-3">
                    <h4 className="text-xs uppercase font-mono font-bold tracking-wider text-brand-secondary">Cơ hội vàng trên kênh số:</h4>
                    <div className="grid grid-cols-1 gap-2.5">
                      {activeStudy.opportunities.map((opp, idx) => (
                        <div key={idx} className="flex items-start text-xs text-gray-600 bg-yellow-50/30 p-2.5 rounded-lg border border-yellow-100">
                          <span className="text-brand-secondary font-bold mr-2">⭐</span>
                          <span>{opp}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Section 3: Website Structure Proposal */}
                <div className="border border-gray-200 rounded-2xl p-6 bg-white shadow-xs">
                  <h3 className="font-display font-bold text-lg text-brand-dark flex items-center mb-4 pb-2 border-b border-gray-100">
                    <Compass className="h-5 w-5 text-brand-primary mr-2" />
                    Sơ đồ đề xuất cấu trúc Website
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">
                    {activeStudy.suggestedStructure.description}
                  </p>
                  
                  {/* Visual Structure Map */}
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 sm:p-6 space-y-3">
                    <div className="text-center">
                      <span className="bg-brand-primary text-white text-[10px] font-mono font-bold px-3 py-1 rounded-full uppercase">
                        {activeStudy.suggestedStructure.title}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
                      {activeStudy.suggestedStructure.sections.map((sec, idx) => (
                        <div key={idx} className="bg-white p-3 rounded-lg border border-gray-150 shadow-xs text-xs">
                          <span className="font-mono font-bold text-brand-primary mr-1.5">{idx + 1}.</span>
                          <span className="text-gray-700">{sec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Section 4: Customer Journey */}
                <div className="border border-gray-200 rounded-2xl p-6 bg-white shadow-xs">
                  <h3 className="font-display font-bold text-lg text-brand-dark flex items-center mb-4 pb-2 border-b border-gray-100">
                    <Cpu className="h-5 w-5 text-emerald-600 mr-2" />
                    Hành trình Khách hàng Số hóa (Customer Journey)
                  </h3>
                  
                  {/* Horizontal visual journey map */}
                  <div className="relative pl-6 border-l-2 border-emerald-500 space-y-4 py-2">
                    {activeStudy.customerJourney.map((step, idx) => {
                      const stepTitles = ["TIẾP CẬN", "TÌM HIỂU SÂU", "RA QUYẾT ĐỊNH"];
                      return (
                        <div key={idx} className="relative">
                          {/* node */}
                          <div className="absolute -left-[31px] top-1 w-4.5 h-4.5 rounded-full bg-white border-2 border-emerald-500 flex items-center justify-center text-[10px] font-mono font-bold text-emerald-600">
                            {idx + 1}
                          </div>
                          <div>
                            <span className="text-[10px] font-mono font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                              {stepTitles[idx]}
                            </span>
                            <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">{step}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Section 5: Strategic features & Digital Asset Strategy */}
                <div className="border border-gray-200 rounded-2xl p-6 bg-white shadow-xs">
                  <h3 className="font-display font-bold text-lg text-brand-dark flex items-center mb-4 pb-2 border-b border-gray-100">
                    <FileSpreadsheet className="h-5 w-5 text-brand-secondary mr-2" />
                    Chiến lược Tích lũy Tài sản số lâu dài
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">
                    {activeStudy.digitalAssetStrategy}
                  </p>
                  <div className="space-y-3">
                    <h4 className="text-xs uppercase font-mono font-bold tracking-wider text-brand-secondary">Tính năng công nghệ kiến nghị:</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {activeStudy.suggestedFeatures.map((feat, idx) => (
                        <div key={idx} className="flex items-center text-xs text-gray-700 bg-gray-50 px-3 py-2 rounded-lg border border-gray-150">
                          <CheckCircle2 className="h-4.5 w-4.5 text-green-500 mr-2 flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>

              {/* Right Column: Key metrics & Callout */}
              <div className="space-y-6">
                
                {/* Expected Results Card */}
                <div className="bg-brand-dark text-white p-6 rounded-2xl shadow-md border border-gray-800">
                  <Award className="h-8 w-8 text-brand-accent mb-3" />
                  <h3 className="font-display font-bold text-base uppercase tracking-wider text-white">Kết quả dự kiến đạt được</h3>
                  <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                    Khi xây dựng hệ thống website chuẩn mực và thực hiện đúng lộ trình cố vấn tài sản số.
                  </p>
                  <div className="mt-5 space-y-4">
                    {activeStudy.expectedResults.map((res, idx) => (
                      <div key={idx} className="flex items-start text-xs border-b border-gray-800 pb-3 last:border-0 last:pb-0">
                        <CheckCircle2 className="h-5 w-5 text-brand-accent mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-200 leading-normal">{res}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Proposal Request CTA */}
                <div className="border border-brand-primary/20 bg-brand-primary/5 p-6 rounded-2xl text-center space-y-4">
                  <MessageSquare className="h-10 w-10 text-brand-primary mx-auto" />
                  <h4 className="font-display font-bold text-sm text-brand-dark">Muốn sở hữu cấu trúc tương tự cho công ty bạn?</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Tôi có thể tư vấn trực tiếp và lên bản thảo phác thảo giải pháp tài sản số cá nhân hóa 100% miễn phí cho riêng doanh nghiệp của bạn.
                  </p>
                  <a
                    href={socialConfig.zalo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center px-4 py-3 rounded-lg text-xs font-bold uppercase text-white bg-brand-primary hover:bg-brand-secondary transition-colors"
                  >
                    Gửi yêu cầu qua Zalo ({socialConfig.phoneDisplay})
                  </a>
                </div>

              </div>
            </div>
          </div>
        ) : (
          /* CASE STUDIES LIBRARY LISTING */
          <div className="space-y-10">
            <div className="max-w-2xl">
              <h2 className="font-display font-bold text-2xl text-brand-dark">Chọn giải pháp cho mô hình kinh doanh của bạn</h2>
              <p className="text-gray-500 text-sm mt-2">
                Hãy click vào ngành nghề tương đồng để xem chi tiết bản phác thảo năng lực, hành trình người dùng và chiến lược chuyển dịch tài sản số cụ thể.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {caseStudies.map((cs) => (
                <div
                  key={cs.id}
                  onClick={() => handleSelectCase(cs.slug)}
                  className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-md cursor-pointer group transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="p-6">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-primary/10 text-brand-primary">
                      {cs.industry}
                    </span>
                    <h3 className="font-display font-bold text-lg text-brand-dark mt-4 leading-snug group-hover:text-brand-primary transition-colors">
                      {cs.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-3 line-clamp-3 leading-relaxed">
                      {cs.background}
                    </p>
                    
                    {/* Visual metrics dots preview */}
                    <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between text-[11px] font-mono text-gray-400">
                      <span>Cơ hội số hóa</span>
                      <span className="text-brand-secondary font-bold flex items-center">
                        CHI TIẾT <ChevronRight className="h-3 w-3 ml-0.5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
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
