import { useState, FormEvent } from "react";
import { Mail, Phone, MessageSquare, Facebook, Youtube, Send, CheckCircle2, QrCode } from "lucide-react";
import { socialConfig } from "../config/social";
import Meta from "../components/Meta";

export default function Connect() {
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", note: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    // Simulate API registration
    setSubmitted(true);
  };

  const socialCards = [
    {
      name: "Zalo Chat",
      icon: MessageSquare,
      color: "bg-blue-600",
      textColor: "text-blue-600",
      bgColor: "bg-blue-50",
      display: socialConfig.phoneDisplay,
      href: socialConfig.zalo,
      actionLabel: "Nhắn tin Zalo"
    },
    {
      name: "Facebook Cá Nhân",
      icon: Facebook,
      color: "bg-indigo-600",
      textColor: "text-indigo-600",
      bgColor: "bg-indigo-50",
      display: "@ducduy.web",
      href: socialConfig.facebookPersonal,
      actionLabel: "Kết nối Facebook"
    },
    {
      name: "Facebook Fanpage",
      icon: Facebook,
      color: "bg-blue-800",
      textColor: "text-blue-800",
      bgColor: "bg-blue-50/55",
      display: "Đức Duy Web Hub",
      href: socialConfig.facebookFanpage,
      actionLabel: "Ghé thăm Fanpage"
    },
    {
      name: "Kênh YouTube",
      icon: Youtube,
      color: "bg-red-600",
      textColor: "text-red-600",
      bgColor: "bg-red-50",
      display: "@ducduyweb",
      href: socialConfig.youtube,
      actionLabel: "Xem chia sẻ"
    },
    {
      name: "Hotline Gọi Điện",
      icon: Phone,
      color: "bg-brand-primary",
      textColor: "text-brand-primary",
      bgColor: "bg-red-50/50",
      display: socialConfig.phoneDisplay,
      href: `tel:${socialConfig.phone}`,
      actionLabel: "Gọi điện tư vấn"
    },
    {
      name: "Hộp Thư Điện Tử",
      icon: Mail,
      color: "bg-yellow-600",
      textColor: "text-yellow-600",
      bgColor: "bg-yellow-50",
      display: socialConfig.email,
      href: `mailto:${socialConfig.email}`,
      actionLabel: "Gửi Email"
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      <Meta
        title="Cổng Kết Nối Trực Tiếp - Đức Duy Web"
        description="Kết nối trực tiếp với Đức Duy qua Zalo, Điện thoại, Facebook, YouTube hoặc điền biểu mẫu nhận lịch tư vấn miễn phí."
      />

      {/* Header Banner */}
      <section className="bg-brand-light py-12 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-primary">
              🌐 CỔNG KẾT NỐI ĐA KÊNH
            </span>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-dark mt-1 tracking-tight">
              Kết Nối Trực Tiếp Với Đức Duy Web
            </h1>
            <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed">
              Lựa chọn phương thức giao tiếp thuận tiện nhất đối với bạn để thảo luận về dự án thiết kế website hoặc tối ưu chiến lược tài sản số của bạn.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Left 2 Cols: Social cards and QR */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Social cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {socialCards.map((card, idx) => {
                const IconComp = card.icon;
                return (
                  <div key={idx} className="border border-gray-200 rounded-2xl p-5 flex items-center justify-between bg-white shadow-xs hover:shadow-md transition-all">
                    <div className="flex items-center space-x-3.5">
                      <div className={`w-11 h-11 rounded-xl ${card.bgColor} ${card.textColor} flex items-center justify-center`}>
                        <IconComp className="h-5.5 w-5.5" />
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-sm text-brand-dark">{card.name}</h4>
                        <p className="text-xs text-gray-400 font-mono mt-0.5">{card.display}</p>
                      </div>
                    </div>
                    <a
                      href={card.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-1.5 rounded-lg border border-gray-150 hover:bg-gray-50 text-gray-700`}
                      style={{ minHeight: "36px" }}
                    >
                      {card.actionLabel}
                    </a>
                  </div>
                );
              })}
            </div>

            {/* QR Code Area */}
            <div className="border border-gray-200 rounded-2xl p-6 bg-white shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 max-w-md">
                <h3 className="font-display font-bold text-lg text-brand-dark flex items-center">
                  <QrCode className="h-5 w-5 text-brand-primary mr-2" />
                  Mã QR quét kết nối nhanh qua Zalo
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Mở ứng dụng Zalo trên điện thoại di động của bạn, chọn tính năng quét mã QR ở thanh tìm kiếm góc trên cùng bên phải và quét mã đối diện để nhắn tin tư vấn trực tiếp với Đức Duy.
                </p>
              </div>
              <div className="w-40 h-40 bg-gray-50 border border-gray-200 rounded-xl p-2.5 flex items-center justify-center shadow-xs flex-shrink-0">
                <img
                  src={socialConfig.qrZalo}
                  alt="Zalo QR Code"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

          </div>

          {/* Right Col: Consultation Form */}
          <div>
            <div className="border border-gray-200 rounded-2xl p-6 bg-white shadow-md relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-primary/5 rounded-full blur-xl"></div>
              
              <h3 className="font-display font-bold text-base text-brand-dark">Đăng ký nhận lịch tư vấn</h3>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                Để lại yêu cầu và thông tin liên hệ của bạn, tôi sẽ trực tiếp nghiên cứu sơ bộ thương hiệu của bạn và gọi lại tư vấn trong vòng 2 giờ làm việc.
              </p>

              {submitted ? (
                <div className="mt-6 p-5 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-3 animate-fade-in">
                  <CheckCircle2 className="h-10 w-10 text-emerald-500 mx-auto" />
                  <h4 className="font-display font-bold text-sm text-emerald-900 font-bold">Gửi yêu cầu thành công!</h4>
                  <p className="text-xs text-emerald-700 leading-normal">
                    Chào **{formData.name}**, tôi đã ghi nhận yêu cầu của bạn. Tôi sẽ gọi điện liên hệ trực tiếp cho bạn qua số điện thoại **{formData.phone}** trong thời gian sớm nhất.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="mt-6 space-y-3.5">
                  <div>
                    <label className="block text-[10px] uppercase font-mono font-bold text-gray-400 mb-1">Họ tên của bạn *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Nguyễn Văn A"
                      className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-gray-200 focus:outline-hidden focus:ring-1 focus:ring-brand-primary"
                      style={{ minHeight: "44px" }}
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-mono font-bold text-gray-400 mb-1">Số điện thoại *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="09xx xxx xxx"
                      className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-gray-200 focus:outline-hidden focus:ring-1 focus:ring-brand-primary"
                      style={{ minHeight: "44px" }}
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-mono font-bold text-gray-400 mb-1">Hộp thư điện tử (Email)</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="partner@gmail.com"
                      className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-gray-200 focus:outline-hidden focus:ring-1 focus:ring-brand-primary"
                      style={{ minHeight: "44px" }}
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-mono font-bold text-gray-400 mb-1">Ghi chú về dự án của bạn</label>
                    <textarea
                      rows={3}
                      value={formData.note}
                      onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                      placeholder="Mô tả sơ qua về lĩnh vực của bạn hoặc các vấn đề website đang gặp phải..."
                      className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-gray-200 focus:outline-hidden focus:ring-1 focus:ring-brand-primary"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center px-4 py-3.5 rounded-lg text-xs font-bold uppercase text-white bg-brand-primary hover:bg-brand-secondary transition-colors shadow-md cursor-pointer"
                    style={{ minHeight: "48px" }}
                  >
                    Gửi yêu cầu đăng ký tư vấn
                    <Send className="ml-2 h-4 w-4" />
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
