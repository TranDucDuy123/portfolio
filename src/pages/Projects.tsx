import { useState, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Award, ExternalLink, Filter, Laptop, Smartphone, Eye } from "lucide-react";
import { projects } from "../data/projects";
import { ProjectItem } from "../types";
import { socialConfig } from "../config/social";
import Meta from "../components/Meta";
import Schema from "../components/Schema";

export default function Projects() {
  const { slug } = useParams<{ slug?: string }>();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const activeProject = projects.find((p) => p.slug === slug);

  const categories = [
    { value: "all", label: "Tất cả" },
    { value: "business", label: "Web Doanh Nghiệp" },
    { value: "landing", label: "Landing Page" },
    { value: "profile", label: "Company Profile" },
    { value: "portfolio", label: "Portfolio" }
  ];

  const filteredProjects = useMemo(() => {
    if (selectedCategory === "all") return projects;
    return projects.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  const handleSelectProject = (projSlug: string) => {
    navigate(`/projects/${projSlug}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToList = () => {
    navigate("/projects");
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Meta tags for dynamic SEO */}
      {activeProject ? (
        <Meta
          title={activeProject.title}
          description={activeProject.description}
          keywords={activeProject.techStack}
          slug={`projects/${activeProject.slug}`}
        />
      ) : (
        <Meta
          title="Portfolio Dự Án Thực Tế - Đức Duy Web"
          description="Khám phá các sản phẩm website doanh nghiệp, landing page, profile số được Đức Duy Web thi công may đo trọn gói chuẩn SEO."
        />
      )}

      {/* Structured data */}
      {activeProject && (
        <Schema
          type="Project"
          data={{
            title: activeProject.title,
            description: activeProject.description,
            categoryLabel: activeProject.categoryLabel,
            industry: activeProject.industry
          }}
        />
      )}

      {/* Page Header */}
      <section className="bg-brand-light py-12 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-primary">
              🖥️ PORTFOLIO SẢN PHẨM HOÀN THIỆN
            </span>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-dark mt-1 tracking-tight">
              {activeProject ? activeProject.title : "Các Dự Án Website Thực Tế Đã Triển Khai"}
            </h1>
            <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed">
              {activeProject
                ? `Chi tiết dự án thuộc ngành: ${activeProject.industry}`
                : "Tất cả các sản phẩm đều được tối ưu tốc độ load thần tốc, cấu trúc chuẩn SEO tối đa và thiết kế giao diện độc bản sang trọng."}
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {activeProject ? (
          /* PROJECT DETAIL VIEW */
          <div className="space-y-8 animate-fade-in">
            {/* Back Button */}
            <div>
              <button
                onClick={handleBackToList}
                className="inline-flex items-center text-sm font-semibold text-brand-primary hover:text-brand-secondary cursor-pointer"
                style={{ minHeight: "44px" }}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Quay lại danh sách dự án
              </button>
            </div>

            {/* Split layout: visual and text */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Left 2 Cols: Showcase image and details */}
              <div className="lg:col-span-2 space-y-6">
                <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-md bg-gray-50 aspect-video relative group">
                  <img
                    src={activeProject.imageUrl}
                    alt={activeProject.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="bg-white/90 text-brand-dark font-display font-bold text-xs uppercase tracking-wider py-2 px-4 rounded-lg shadow-md flex items-center">
                      <Eye className="h-4 w-4 mr-1.5 text-brand-primary" />
                      Xem Demo Trực Tuyến
                    </span>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-2xl p-6 bg-white space-y-4">
                  <h3 className="font-display font-bold text-lg text-brand-dark pb-2 border-b border-gray-100">
                    Mô Tả & Định Hướng Dự Án
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {activeProject.description}
                  </p>
                  <div className="bg-brand-primary/5 p-4 rounded-xl border border-brand-primary/10">
                    <h4 className="text-xs uppercase font-mono font-bold text-brand-primary tracking-wider mb-1">Mục tiêu kinh doanh:</h4>
                    <p className="text-xs text-gray-700 leading-relaxed font-sans font-medium">
                      {activeProject.goals}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Col: Specifications & Features list */}
              <div className="space-y-6">
                <div className="border border-gray-200 rounded-2xl p-6 bg-white shadow-xs">
                  <h3 className="font-display font-bold text-base text-brand-dark mb-4 border-b border-gray-100 pb-2">
                    Thông tin dự án
                  </h3>
                  
                  <div className="space-y-4 text-xs">
                    <div>
                      <span className="text-gray-400 block uppercase font-mono font-bold text-[9px] tracking-wider">Phân loại:</span>
                      <span className="font-semibold text-brand-primary text-sm mt-0.5 block">{activeProject.categoryLabel}</span>
                    </div>

                    <div>
                      <span className="text-gray-400 block uppercase font-mono font-bold text-[9px] tracking-wider">Lĩnh vực:</span>
                      <span className="font-semibold text-brand-dark text-sm mt-0.5 block">{activeProject.industry}</span>
                    </div>

                    <div>
                      <span className="text-gray-400 block uppercase font-mono font-bold text-[9px] tracking-wider">Công nghệ sử dụng:</span>
                      <div className="flex flex-wrap gap-1.5 mt-1.5">
                        {activeProject.techStack.map((tech) => (
                          <span key={tech} className="bg-gray-100 text-gray-600 px-2.5 py-1 rounded-md font-mono text-[10px]">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-2xl p-6 bg-white shadow-xs">
                  <h3 className="font-display font-bold text-base text-brand-dark mb-4 border-b border-gray-100 pb-2">
                    Các tính năng đặc sắc
                  </h3>
                  <div className="space-y-3">
                    {activeProject.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start text-xs text-gray-700">
                        <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500 mr-2 flex-shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-brand-primary p-6 rounded-2xl text-white text-center space-y-3">
                  <Award className="h-8 w-8 text-brand-accent mx-auto" />
                  <h4 className="font-display font-bold text-sm">Bạn thích phong cách thiết kế này?</h4>
                  <p className="text-[11px] text-brand-light/90 leading-relaxed">
                    Hãy đặt lịch ngay để Đức Duy thiết kế riêng một bản vẽ nháp miễn phí phù hợp 100% với thương hiệu của bạn.
                  </p>
                  <a
                    href={socialConfig.zalo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center py-2.5 rounded-lg text-xs font-bold uppercase bg-white text-brand-primary hover:bg-brand-accent transition-colors"
                  >
                    Tư vấn ngay qua Zalo
                  </a>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* PROJECTS GRID VIEW WITH FILTERS */
          <div className="space-y-8 animate-fade-in">
            {/* Filter tags */}
            <div className="flex flex-wrap gap-2 items-center justify-center lg:justify-start">
              <span className="text-xs font-bold text-gray-400 mr-2 uppercase tracking-wider font-display">Lọc dự án:</span>
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`px-4 py-2 text-xs rounded-xl font-medium transition-all ${
                    selectedCategory === cat.value
                      ? "bg-brand-primary text-white font-bold shadow-md"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                  style={{ minHeight: "44px" }}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((p) => (
                <div
                  key={p.id}
                  onClick={() => handleSelectProject(p.slug)}
                  className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-md cursor-pointer group transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Project Image block */}
                  <div className="aspect-video bg-gray-100 overflow-hidden relative">
                    <img
                      src={p.imageUrl}
                      alt={p.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs py-1 px-2.5 rounded-md text-[9px] font-mono font-bold text-brand-primary shadow-xs uppercase">
                      {p.categoryLabel}
                    </div>
                  </div>

                  {/* Project text details */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-mono font-semibold text-gray-400">{p.industry}</span>
                      <h3 className="font-display font-bold text-base text-brand-dark mt-1 leading-snug group-hover:text-brand-primary transition-colors">
                        {p.title}
                      </h3>
                      <p className="text-xs text-gray-500 mt-2 line-clamp-2 leading-relaxed">
                        {p.description}
                      </p>
                    </div>

                    <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                      <div className="flex space-x-1.5">
                        {p.techStack.slice(0, 2).map((tech) => (
                          <span key={tech} className="bg-gray-50 text-gray-400 px-2 py-0.5 rounded font-mono text-[9px]">
                            {tech}
                          </span>
                        ))}
                      </div>
                      <span className="text-brand-primary font-bold inline-flex items-center group-hover:text-brand-secondary transition-colors">
                        Xem chi tiết →
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
