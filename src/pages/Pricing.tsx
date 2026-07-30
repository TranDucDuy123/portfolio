import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Clock, 
  Sparkles, 
  FileText, 
  Layers, 
  Check, 
  HelpCircle, 
  MessageSquare, 
  Server,
  Code
} from "lucide-react";
import { socialConfig } from "../config/social";
import Schema from "../components/Schema";

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<"one_time">("one_time");

  const packages = [
    {
      id: "basic",
      name: "Website Doanh Nghiệp / Landing Page",
      badge: "Phổ Biến Cho SMEs",
      price: "15.000.000 - 25.000.000",
      unit: "VNĐ / Dự án",
      desc: "Thích hợp cho doanh nghiệp cần khẳng định uy tín thương hiệu, nhận diện chuẩn SEO và tối ưu chuyển đổi.",
      deliveryTime: "7 - 10 Ngày",
      featured: false,
      features: [
        "Giao diện thiết kế UI/UX độc quyền chuẩn thương hiệu",
        "Tối ưu trải nghiệm Responsive trên di động (Mobile First)",
        "Chuẩn hóa hạ tầng SEO Google & Schema Structured Data",
        "Tích hợp nút Gọi điện, Zalo, Messenger, Form nhận tư vấn",
        "Quản trị CMS dễ sử dụng, cập nhật bài viết & dịch vụ",
        "Tối ưu tốc độ tải trang Google PageSpeed > 85/100",
        "Bàn giao 100% Full Source Code (Không phí thuê hàng tháng)",
        "Bảo hành & Hỗ trợ kỹ thuật 12 tháng liên tục"
      ]
    },
    {
      id: "expert",
      name: "Website Chuyên Gia Booking & E-Learning",
      badge: "Khuyên Dùng Cho Coach & Đào Tạo",
      price: "40.000.000 - 60.000.000",
      unit: "VNĐ / Dự án",
      desc: "Hệ thống trọn gói dành riêng cho Coach, Chuyên gia & Đào tạo: Đặt lịch tư vấn, bán khóa học E-Learning & Affiliate.",
      deliveryTime: "15 - 20 Ngày",
      featured: true,
      sampleLink: "/bao-gia/coach-tran-cong",
      sampleTitle: "Xem Báo Giá Mẫu Thực Tế (Coach Trần Công)",
      features: [
        "Toàn bộ tính năng của Gói Doanh Nghiệp",
        "Module Đặt lịch Booking Chuyên gia & Tự động tạo link Meet/Zoom",
        "Module Khóa học E-Learning Video Streaming chống quay lậu",
        "Cổng thanh toán VietQR (SePay) đối soát tự động trong 3 giây",
        "Hệ thống Affiliate Marketing (Quản lý CTV & Hoa hồng)",
        "CRM Quản lý học viên 360 độ & Gắn tag phân loại",
        "Email Automation xác nhận đơn & nhắc lịch tự động",
        "Cấu hình tường lửa Cloudflare & Bảo mật SSL HTTPS"
      ]
    },
    {
      id: "custom",
      name: "Hệ Thống Custom E-Commerce / SaaS Enterprise",
      badge: "May Đo Theo Yêu Cầu",
      price: "Từ 80.000.000",
      unit: "VNĐ / Hệ thống",
      desc: "Giải pháp lập trình theo yêu cầu nghiệp vụ phức tạp, sàn thương mại điện tử, ứng dụng web chuyên sâu.",
      deliveryTime: "30 - 45 Ngày",
      featured: false,
      features: [
        "Toàn bộ tính năng theo đặc tả bài toán của doanh nghiệp",
        "Kiến trúc Microservices / High Availability chịu tải cao",
        "Tích hợp ERP / CRM ngoài (Salesforce, HubSpot, SAP)",
        "Đa cổng thanh toán (VNPay, MoMo, Stripe, Paypal)",
        "Hệ thống phân quyền đa cấp, quản trị chi nhánh / đại lý",
        "Hạ tầng Server Dedicated / Cloud AWS / GCP",
        "Đội ngũ kỹ thuật hỗ trợ vận hành 24/7",
        "Cam kết SLA bảo trì & nâng cấp lâu dài"
      ]
    }
  ];

  const faqs = [
    {
      q: "Chi phí làm Website tại Đức Duy Web có phát sinh thêm phí hàng tháng không?",
      a: "KHÔNG. Đức Duy Web xây dựng Website theo triết lý 'Sở Hữu Tài Sản Số'. Quý khách sở hữu 100% Source Code vĩnh viễn, không phải trả phí duy trì nền tảng hàng tháng như các dịch vụ thuê web."
    },
    {
      q: "Tôi có được bàn giao lại mã nguồn (Source Code) không?",
      a: "CÓ. Sau khi nghiệm thu dự án, Đức Duy Web sẽ bàn giao đầy đủ Source Code, tài liệu hướng dẫn vận hành và thông tin quản trị Hosting/Domain."
    },
    {
      q: "Trường hợp tôi cần mẫu báo giá chi tiết từng module cho dự án đặc thù?",
      a: "Bạn có thể tham khảo mẫu bản đặc tả chi tiết dành cho Coach Trần Công hoặc liên hệ trực tiếp qua Zalo Đức Duy để nhận file báo giá may đo trong vòng 24 giờ."
    },
    {
      q: "Chính sách bảo hành và hỗ trợ sau khi nghiệm thu ra sao?",
      a: "Mọi dự án đều được bảo hành kỹ thuật 12 tháng trọn gói. Hệ thống được tự động sao lưu dữ liệu hàng tuần và hỗ trợ xử lý sự cố trong vòng 2 giờ làm việc."
    }
  ];

  return (
    <>
      <Schema
        type="LocalBusiness"
        data={{
          id: "pricing-page"
        }}
      />

      <div className="bg-gray-50 min-h-screen pb-20">
        {/* Banner Hero */}
        <section className="bg-brand-dark text-white pt-12 pb-16 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <span className="inline-flex items-center space-x-2 bg-brand-primary/20 text-brand-accent px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider mb-4 border border-brand-primary/30">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Báo Giá Minh Bạch — Sở Hữu Vĩnh Viễn</span>
            </span>
            <h1 className="font-display font-black text-3xl sm:text-4xl md:text-5xl tracking-tight text-white max-w-3xl mx-auto">
              Bảng Báo Giá Thiết Kế Website & Giải Pháp Tài Sản Số
            </h1>
            <p className="text-gray-300 text-sm sm:text-base mt-4 max-w-2xl mx-auto leading-relaxed">
              Tối ưu hóa ngân sách đầu tư, không phí ẩn duy trì hàng tháng, bàn giao 100% mã nguồn độc lập và cam kết bảo hành kỹ thuật 12 tháng.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                to="/bao-gia/coach-tran-cong"
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-sm bg-brand-primary hover:bg-brand-secondary text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md"
                style={{ minHeight: "44px" }}
              >
                <FileText className="h-4 w-4" />
                <span>Xem Báo Giá Mẫu (Coach Trần Công)</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <a
                href={socialConfig.zalo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-sm bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs font-bold uppercase tracking-wider transition-all border border-gray-700"
                style={{ minHeight: "44px" }}
              >
                <MessageSquare className="h-4 w-4 text-brand-accent" />
                <span>Yêu Cầu Báo Giá Riêng Qua Zalo</span>
              </a>
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`bg-white rounded-lg p-6 sm:p-8 flex flex-col justify-between border transition-all ${
                  pkg.featured
                    ? "border-brand-primary shadow-xl ring-2 ring-brand-primary/20 relative"
                    : "border-gray-200 shadow-xs hover:border-gray-300"
                }`}
              >
                <div>
                  {pkg.featured && (
                    <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 bg-brand-primary text-white text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">
                      {pkg.badge}
                    </div>
                  )}

                  {!pkg.featured && (
                    <span className="inline-block text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 bg-gray-100 text-gray-600 rounded-sm mb-2">
                      {pkg.badge}
                    </span>
                  )}

                  <h2 className="font-display font-bold text-xl text-brand-dark mt-2">
                    {pkg.name}
                  </h2>
                  <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                    {pkg.desc}
                  </p>

                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <span className="text-[11px] uppercase font-mono text-gray-400 font-bold block">
                      Chi phí đầu tư ước tính:
                    </span>
                    <div className="flex items-baseline space-x-1 mt-1">
                      <span className="font-display font-black text-2xl text-brand-primary font-mono">
                        {pkg.price}
                      </span>
                    </div>
                    <span className="text-[11px] text-gray-500 font-medium">
                      {pkg.unit} • Thời gian: {pkg.deliveryTime}
                    </span>
                  </div>

                  {pkg.sampleLink && (
                    <div className="mt-4 bg-amber-50 p-3 rounded-md border border-amber-200">
                      <span className="text-[11px] font-bold text-amber-800 block mb-1">
                        📌 Mẫu Đặc Tả Thực Tế:
                      </span>
                      <Link
                        to={pkg.sampleLink}
                        className="text-xs font-bold text-brand-primary hover:underline inline-flex items-center space-x-1"
                      >
                        <span>{pkg.sampleTitle}</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  )}

                  <div className="mt-6 pt-6 border-t border-gray-100 space-y-3">
                    <h3 className="text-xs uppercase font-mono font-bold text-gray-400">
                      Quyền lợi bao gồm:
                    </h3>
                    <ul className="space-y-2 text-xs text-gray-700">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <CheckCircle2 className="h-4 w-4 text-brand-primary flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100">
                  <a
                    href={socialConfig.zalo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full flex items-center justify-center space-x-2 py-3 rounded-sm text-xs font-bold uppercase tracking-wider transition-all shadow-xs ${
                      pkg.featured
                        ? "bg-brand-primary hover:bg-brand-secondary text-white"
                        : "bg-brand-dark hover:bg-brand-primary text-white"
                    }`}
                    style={{ minHeight: "44px" }}
                  >
                    <span>Tư vấn gói này qua Zalo</span>
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Case Study Quote Banner */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <div className="bg-brand-dark text-white p-8 rounded-lg border border-gray-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-brand-accent uppercase tracking-widest block">
                DỰ ÁN TIÊU BIỂU DÀNH CHO COACH & ĐÀO TẠO
              </span>
              <h2 className="font-display font-bold text-2xl text-white">
                Đặc Tả & Báo Giá Website Booking - E-Learning Coach Trần Công
              </h2>
              <p className="text-xs text-gray-300 max-w-2xl leading-relaxed">
                Khám phá bản báo giá tương tác bao gồm sơ đồ luồng Booking Google Meet tự động, học trực tuyến HLS, hệ thống Affiliate CTV và bảng dự toán 9 module chi tiết.
              </p>
            </div>

            <Link
              to="/bao-gia/coach-tran-cong"
              className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-sm bg-brand-primary hover:bg-brand-secondary text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md flex-shrink-0"
              style={{ minHeight: "44px" }}
            >
              <span>Xem Bản Đặc Tả Coach Trần Công</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <div className="text-center mb-10">
            <h2 className="font-display font-bold text-2xl text-brand-dark">
              Câu Hỏi Thường Gặp Về Báo Giá
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Giải đáp thắc mắc chi tiết trước khi bắt đầu dự án cùng Đức Duy Web.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg border border-gray-200 shadow-xs">
                <h3 className="font-bold text-sm text-brand-dark flex items-start space-x-2">
                  <HelpCircle className="h-4 w-4 text-brand-primary flex-shrink-0 mt-0.5" />
                  <span>{faq.q}</span>
                </h3>
                <p className="text-xs text-gray-600 mt-2 pl-6 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
