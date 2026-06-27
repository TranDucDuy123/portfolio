import { Link } from "react-router-dom";
import { CheckCircle, ArrowRight, ShieldCheck, HelpCircle, FileSearch, Sparkles, Globe, Terminal } from "lucide-react";
import { socialConfig } from "../config/social";
import Meta from "../components/Meta";

export default function Services() {
  const services = [
    {
      icon: Globe,
      title: "Website Foundation (Nền móng tài sản số)",
      description: "Lập trình may đo hệ thống website lõi bằng công nghệ hiện đại React/Vite tải siêu tốc. Giao diện độc bản 100%, tích hợp hệ thống đo lường dữ liệu chuẩn chỉnh vĩnh viễn.",
      features: ["Mã nguồn chuẩn SEO tối đa", "Tối ưu hóa Lighthouse 100/100", "Bảo mật tuyệt đối, nói không với lỗi vặt", "Tự động sao lưu dữ liệu"]
    },
    {
      icon: ShieldCheck,
      title: "Business Profile Website (Hồ sơ năng lực số)",
      description: "Số hóa cuốn Company Profile của doanh nghiệp thành trang web sinh động. Trực quan hóa năng lực, xưởng sản xuất, đội ngũ kỹ thuật để thuyết phục chủ đầu tư lớn.",
      features: ["Trình bày thông số năng lực chuyên sâu", "Thiết lập trang triết lý & chứng nhận", "Định dạng file PDF tải nhanh tiện dụng", "Giao diện cao cấp tăng uy tín thương hiệu"]
    },
    {
      icon: Sparkles,
      title: "Portfolio Website (Trưng bày công trình)",
      description: "Thư viện trình diễn các dự án đã bàn giao một cách ngăn nắp có bộ lọc real-time. Phù hợp sâu sắc cho các đơn vị thi công quảng cáo, nội thất, đá hoa cương.",
      features: ["Bộ lọc dự án thông minh mượt mà", "Ảnh độ phân giải cao phóng to sắc nét", "Slide so sánh ảnh trước/sau thi công", "Tự động nén ảnh giữ nguyên chất lượng"]
    },
    {
      icon: Terminal,
      title: "Landing Page (Sát thủ chuyển đổi)",
      description: "Thiết kế và tối ưu trang đích bán hàng tập trung vào một mục tiêu duy nhất. Đón đầu và chốt đơn tự động khi quý khách chạy quảng cáo Google Ads, Facebook Ads.",
      features: ["Tiêu đề thu hút (Hook) giữ chân 3s đầu", "Form thu thập thông tin đơn giản", "Bảng giá tự động theo khối lượng", "Đồng bộ lead tự động về Zalo/Google Sheet"]
    },
    {
      icon: FileSearch,
      title: "SEO Foundation & Digital Presence",
      description: "Thiết lập đồng bộ hồ sơ Google Maps (Google Business), cắm mốc chủ quyền địa phương kết hợp tối ưu SEO On-Page đưa doanh nghiệp lên Top tìm kiếm Google tự nhiên.",
      features: ["Xác minh địa điểm Google Maps chính chủ", "Nghiên cứu bộ từ khóa ngách bứt phá doanh số", "Đồng nhất thông tin NAP trên internet", "Tạo sitemap.xml, Schema chuẩn cấu trúc"]
    },
    {
      icon: HelpCircle,
      title: "Website & Digital Asset Audit (Khảo sát sức khỏe)",
      description: "Đánh giá chi tiết website hiện tại của bạn: chỉ ra các lỗi chặn đứng dòng khách hàng, tốc độ tải thực tế, lỗ hổng bảo mật và đề xuất lộ trình tối ưu chi tiết.",
      features: ["Báo cáo lỗi kỹ thuật bằng văn bản", "Đo lường chi tiết tốc độ tải trang di động", "Khảo sát trải nghiệm người dùng thực tế", "Lộ trình tối ưu hóa miễn phí"]
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      <Meta
        title="Giải Pháp Tài Sản Số Doanh Nghiệp - Đức Duy Web"
        description="Chúng tôi không bán website. Chúng tôi cố vấn kiến tạo các giải pháp tài sản số dài hạn giúp doanh nghiệp sở hữu trọn vẹn tệp dữ liệu khách hàng."
      />

      {/* Header Banner */}
      <section className="bg-brand-light py-12 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-primary">
              🌟 PHÁO ĐÀI KỸ THUẬT SỐ DOANH NGHIỆP
            </span>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-dark mt-1 tracking-tight">
              Dịch Vụ Tư Vấn & Thiết Lập Giải Pháp Tài Sản Số
            </h1>
            <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed">
              Chúng tôi không thiết kế website đại trà. Chúng tôi may đo các cỗ máy tài sản số bền vững giúp doanh nghiệp cắm cột mốc uy tín vĩnh viễn trên Internet.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((ser, idx) => {
              const IconComp = ser.icon;
              return (
                <div key={idx} className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center mb-6">
                      <IconComp className="h-6 w-6" />
                    </div>
                    <h3 className="font-display font-bold text-xl text-brand-dark mb-3">
                      {ser.title}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed mb-6">
                      {ser.description}
                    </p>
                    <div className="space-y-2.5">
                      {ser.features.map((f, fIdx) => (
                        <div key={fIdx} className="flex items-center text-xs text-gray-700">
                          <CheckCircle className="h-4.5 w-4.5 text-brand-primary mr-2 flex-shrink-0" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 pt-5 border-t border-gray-100">
                    <Link
                      to="/connect"
                      className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-brand-primary hover:text-brand-secondary"
                      style={{ minHeight: "44px" }}
                    >
                      Nhận tư vấn giải pháp này
                      <ArrowRight className="ml-1.5 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Philosophy callout */}
      <section className="bg-brand-dark text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
          <span className="text-xs font-mono font-bold text-brand-accent uppercase tracking-wider">⚠️ CẢNH BÁO TƯ DUY</span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl mt-2">
            Đừng hoang phí tiền chạy quảng cáo khi móng nhà chưa vững
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 mt-4 leading-relaxed max-w-2xl mx-auto">
            Một website tải chậm, giao diện nghiệp dư và nội dung nghèo nàn sẽ bóp chết 90% ngân sách quảng cáo của bạn. Hãy thiết lập một nền móng tài sản số vững chãi trước khi ném tiền cho mạng xã hội.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <a
              href={socialConfig.zalo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl text-xs font-bold uppercase bg-brand-primary text-white hover:bg-brand-secondary transition-all shadow-md"
              style={{ minHeight: "48px" }}
            >
              Liên hệ kiểm tra Website miễn phí
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
