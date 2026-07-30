  import { useState } from "react";
  import { 
    CheckCircle2, 
    Calendar, 
    Clock, 
    ShieldCheck, 
    Share2, 
    Printer, 
    MessageSquare, 
    Check, 
    Sparkles,
    FileText,
    User,
    Building2,
    DollarSign,
    ArrowRight,
    ChevronRight,
    Layers,
    Zap,
    Play,
    QrCode,
    Users,
    CheckCircle,
    Video,
    Lock,
    Mail,
    Smartphone,
    Laptop
  } from "lucide-react";
  import { socialConfig } from "../config/social";
  import Schema from "../components/Schema";

  export default function BaoGiaTranCong() {
    const [copiedLink, setCopiedLink] = useState(false);
    const [activeTab, setActiveTab] = useState<"phases" | "flows" | "table">("phases");
    const [activeFlow, setActiveFlow] = useState<"booking" | "elearning" | "payment" | "affiliate">("booking");
    const [activeStep, setActiveStep] = useState<number>(0);

    const handleCopyLink = () => {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    };

    // Phase 1 (MVP Cốt lõi) vs Phase 2 (Nâng cấp)
    const phase1Items = [
      {
        id: 1,
        title: "Giao diện UI/UX Custom & Mobile First",
        desc: "Thiết kế độc quyền chuẩn nhận diện thương hiệu Coach Trần Công, tối ưu trải nghiệm đọc & học trên di động.",
        price: 12000000,
        phase: 1,
        tag: "Cốt lõi"
      },
      {
        id: 2,
        title: "Module Booking Chuyên Gia & Đặt Lịch Tự Động",
        desc: "Lịch rảnh/bận động, khảo sát chỉ số sức khỏe ban đầu, tự động tạo phòng Google Meet/Zoom & gửi Email nhắc lịch.",
        price: 6000000,
        phase: 1,
        tag: "Cốt lõi"
      },
      {
        id: 4,
        title: "Module Khóa Học E-Learning Online (Video Streaming)",
        desc: "Mã hóa video bài giảng HLS chống tải lậu, lưu % tiến trình học tập cá nhân, đính kèm tài liệu PDF/Excel.",
        price: 8000000,
        phase: 1,
        tag: "Cốt lõi"
      },
      {
        id: 5,
        title: "CMS & Trang Quản Trị Hệ Thống (Admin Portal)",
        desc: "Quản lý bài viết blog, quản lý lớp học, phân quyền ban quản trị & trợ lý dễ dàng.",
        price: 4000000,
        phase: 1,
        tag: "Cốt lõi"
      },
      {
        id: 6,
        title: "Tích Hợp Thanh Toán VietQR Tự Động (SePay / VNPay)",
        desc: "Quét mã QR ngân hàng tự động mở khóa học & ca hẹn trong 3 giây, chống gian lận.",
        price: 8000000,
        phase: 1,
        tag: "Cốt lõi"
      },
      {
        id: 8,
        title: "Email Automation (Kịch Bản Nhắc Lịch Básic)",
        desc: "Email xác nhận đơn hàng, email chuỗi bài học chào mừng & nhắc ca tư vấn trước 24h & 1h.",
        price: 2000000,
        phase: 1,
        tag: "Cốt lõi"
      },
      {
        id: 9,
        title: "Bảo Mật SSL, Tối Ưu SEO Google & Hạ Tầng Cloudflare",
        desc: "Chứng chỉ SSL HTTPS, tường lửa Cloudflare chống DDoS, chuẩn hóa Schema Google & bảo hành 12 tháng.",
        price: 2000000,
        phase: 1,
        tag: "Cốt lõi"
      }
    ];

    const phase2Items = [
      {
        id: 3,
        title: "Hệ Thống Affiliate Marketing (Tiếp Thị Liên Kết CTV)",
        desc: "Mã giới thiệu & Link Ref riêng cho từng CTV, Portal theo dõi doanh số realtime, đối soát hoa hồng đa tầng tự động.",
        price: 15000000,
        phase: 2,
        tag: "Nâng cao"
      },
      {
        id: 7,
        title: "CRM Quản Lý Khách Hàng & Phân Nhóm Tag Học Viên",
        desc: "Hồ sơ học viên 360 độ, gắn tag tự động phân loại (Học viên VIP, Lớp K01) và lưu lịch sử tư vấn.",
        price: 3000000,
        phase: 2,
        tag: "Nâng cao"
      }
    ];

    const totalPhase1 = phase1Items.reduce((sum, item) => sum + item.price, 0);
    const totalPhase2 = phase2Items.reduce((sum, item) => sum + item.price, 0);
    const grandTotal = totalPhase1 + totalPhase2;

    // Interactive Flow Data & Screen Previews
    const flowsData = {
      booking: {
        title: "Luồng 1: Đặt Lịch Tư Vấn Chuyên Gia 1-1 (Booking & Google Meet)",
        subtitle: "Học viên chọn ca hẹn rảnh -> Điền khảo sát -> Thanh toán VietQR -> Tự động sinh link Meet & nhắc lịch",
        steps: [
          {
            num: "01",
            title: "Khách chọn Khung giờ & Dịch vụ Tư vấn",
            desc: "Học viên vào trang profile Coach Trần Công, xem các gói tư vấn (ví dụ: Tư vấn Dinh dưỡng 1-1) và chọn ngày, giờ rảnh trên lịch động.",
            mockupTitle: "Giao diện Chọn Lịch Booking",
            mockupContent: (
              <div className="bg-white p-4 rounded border border-gray-200 text-xs font-sans space-y-3">
                <div className="flex items-center justify-between border-b pb-2">
                  <span className="font-bold text-brand-dark">Tư vấn Dinh dưỡng & Sức khỏe 1-1</span>
                  <span className="font-mono text-brand-primary font-bold">1.500.000 đ / 60 phút</span>
                </div>
                <div>
                  <span className="text-gray-500 font-medium block mb-1">Chọn ngày hẹn:</span>
                  <div className="flex gap-1.5 overflow-x-auto pb-1">
                    <button className="px-2.5 py-1.5 rounded bg-brand-primary text-white font-bold text-[11px]">Thứ Hai, 03/08</button>
                    <button className="px-2.5 py-1.5 rounded bg-gray-100 text-gray-700 text-[11px]">Thứ Ba, 04/08</button>
                    <button className="px-2.5 py-1.5 rounded bg-gray-100 text-gray-700 text-[11px]">Thứ Tư, 05/08</button>
                  </div>
                </div>
                <div>
                  <span className="text-gray-500 font-medium block mb-1">Ca làm việc còn rảnh:</span>
                  <div className="grid grid-cols-3 gap-1.5">
                    <button className="py-1 bg-brand-primary/10 border border-brand-primary text-brand-primary font-bold rounded text-[11px]">09:00 - 10:00</button>
                    <button className="py-1 bg-gray-50 border border-gray-200 text-gray-700 rounded text-[11px]">14:00 - 15:00</button>
                    <button className="py-1 bg-gray-50 border border-gray-200 text-gray-700 rounded text-[11px]">20:00 - 21:00</button>
                  </div>
                </div>
              </div>
            )
          },
          {
            num: "02",
            title: "Khảo sát Chỉ số & Mục tiêu ban đầu",
            desc: "Học viên điền thông tin cá nhân (Cân nặng, chiều cao, bệnh lý nền, câu hỏi dành cho Coach) giúp Coach chuẩn bị trước buổi tư vấn.",
            mockupTitle: "Form Khảo sát Tình trạng Học viên",
            mockupContent: (
              <div className="bg-white p-4 rounded border border-gray-200 text-xs font-sans space-y-2.5">
                <div className="font-bold text-brand-dark border-b pb-1">Phiếu khảo sát tình trạng sức khỏe</div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] text-gray-500 block">Cân nặng (kg)</label>
                    <input readOnly value="68 kg" className="w-full bg-gray-50 p-1.5 border rounded text-[11px]" />
                  </div>
                  <div>
                    <label className="text-[10px] text-gray-500 block">Chiều cao (cm)</label>
                    <input readOnly value="172 cm" className="w-full bg-gray-50 p-1.5 border rounded text-[11px]" />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] text-gray-500 block">Mục tiêu chính:</label>
                  <input readOnly value="Giảm mỡ nội tạng & Cải thiện chỉ số BMR" className="w-full bg-gray-50 p-1.5 border rounded text-[11px]" />
                </div>
              </div>
            )
          },
          {
            num: "03",
            title: "Thanh toán VietQR SePay Tự Động 3s",
            desc: "Hiển thị mã VietQR động có đính kèm nội dung chuyển khoản tự động. Học viên chuyển tiền, hệ thống khớp đơn trong 3 giây.",
            mockupTitle: "Giao diện Quét Mã Thanh Toán VietQR",
            mockupContent: (
              <div className="bg-white p-4 rounded border border-amber-300 bg-amber-50/30 text-xs font-sans space-y-3 text-center">
                <div className="inline-flex items-center space-x-1 text-green-700 bg-green-100 px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                  <CheckCircle className="h-3 w-3" />
                  <span>Đã xác nhận thanh toán thành công!</span>
                </div>
                <div className="w-24 h-24 bg-white mx-auto border-2 border-brand-primary p-2 rounded flex flex-col items-center justify-center shadow-xs">
                  <QrCode className="h-16 w-16 text-brand-dark" />
                  <span className="text-[9px] font-mono font-bold text-gray-500">SEPAY TC102</span>
                </div>
                <div className="text-[11px] text-gray-600">
                  Số tiền: <strong className="text-brand-primary font-mono font-bold">1.500.000 VNĐ</strong>
                </div>
              </div>
            )
          },
          {
            num: "04",
            title: "Tự động sinh Link Google Meet & Nhắc Lịch",
            desc: "Hệ thống tự động tạo phòng Meet/Zoom gắn vào Lịch hẹn, đồng thời gửi Email xác nhận + lịch Google Calendar cho học viên & Coach.",
            mockupTitle: "Thông báo Ca hẹn & Link Meet",
            mockupContent: (
              <div className="bg-white p-4 rounded border border-gray-200 text-xs font-sans space-y-2">
                <div className="flex items-center space-x-2 text-brand-primary font-bold">
                  <Video className="h-4 w-4" />
                  <span>Phòng họp Google Meet đã được tạo:</span>
                </div>
                <div className="p-2 bg-blue-50 border border-blue-200 rounded text-[11px] font-mono font-bold text-blue-800 truncate">
                  https://meet.google.com/abc-tran-cong-coaching
                </div>
                <p className="text-[10px] text-gray-500">
                  📩 Email tự động nhắc lịch sẽ được gửi trước buổi hẹn 24 giờ & 1 giờ.
                </p>
              </div>
            )
          }
        ]
      },
      elearning: {
        title: "Luồng 2: Học Khóa Học Online (E-Learning Video Streaming)",
        subtitle: "Bán khóa học tự động -> Video mã hóa HLS chống quay lậu -> Lưu % tiến độ học tập",
        steps: [
          {
            num: "01",
            title: "Học viên Đăng ký Khóa học & Thanh toán",
            desc: "Khách chọn khóa học mong muốn (ví dụ: 'Khóa học Dinh dưỡng Thực hành 30 ngày'). Quét mã QR thanh toán tức thì.",
            mockupTitle: "Trang Chi Tiết Khóa Học",
            mockupContent: (
              <div className="bg-white p-4 rounded border border-gray-200 text-xs font-sans space-y-2">
                <div className="font-bold text-sm text-brand-dark">Khóa Học Dinh Dưỡng Thực Hành 30 Ngày</div>
                <p className="text-gray-500 text-[11px]">Bao gồm 24 bài giảng Video HD + Bộ thực đơn mẫu PDF</p>
                <div className="flex items-baseline space-x-2 pt-1">
                  <span className="font-mono font-bold text-base text-brand-primary">2.990.000 đ</span>
                  <span className="text-[10px] text-gray-400 line-through">4.500.000 đ</span>
                </div>
              </div>
            )
          },
          {
            num: "02",
            title: "Kích hoạt Quyền học Tức thì (Instant Access)",
            desc: "Sau khi SePay xác nhận giao dịch thành công trong 3s, hệ thống tự động mở khóa bài học ngay lập tức không cần chờ Admin duyệt thủ công.",
            mockupTitle: "Mở Khóa Tài Khoản Học Viên",
            mockupContent: (
              <div className="bg-green-50 p-3.5 rounded border border-green-200 text-xs font-sans space-y-1">
                <div className="font-bold text-green-800 flex items-center space-x-1.5">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Đã kích hoạt khóa học thành công!</span>
                </div>
                <p className="text-[11px] text-green-700">Tài khoản: hocvien@gmail.com | Quyền truy cập: Vĩnh viễn</p>
              </div>
            )
          },
          {
            num: "03",
            title: "Xem Video Bài Giảng Mã Hóa HLS",
            desc: "Video được truyền tải dưới dạng mã hóa HLS, chèn Watermark mờ tên/SĐT học viên chống quay lậu màn hình, xem mượt trên di động.",
            mockupTitle: "Trình Xem Bài Giảng E-Learning",
            mockupContent: (
              <div className="bg-gray-900 text-white p-4 rounded text-xs font-sans space-y-2 relative overflow-hidden">
                <div className="aspect-video bg-gray-800 rounded flex items-center justify-center relative">
                  <Play className="h-8 w-8 text-brand-accent opacity-80" />
                  <span className="absolute top-2 right-2 text-[9px] font-mono bg-black/60 px-1.5 py-0.5 rounded text-gray-300">
                    HLS Encrypted • Watermark: 0908***123
                  </span>
                </div>
                <div className="flex justify-between items-center text-[10px] text-gray-400">
                  <span>Bài 03: Công thức tính TDEE & BMR chuẩn y khoa</span>
                  <span>Tiến độ: 45%</span>
                </div>
              </div>
            )
          },
          {
            num: "04",
            title: "Lưu Tiến độ & Tải Tài liệu Đi kèm",
            desc: "Tự động đánh dấu bài học đã xem, ghi nhớ vị trí dừng để học tiếp lần sau. Tải đính kèm file Thực đơn PDF / Bảng tính Calo Excel.",
            mockupTitle: "Tài Liệu & Tiến Độ Bài Học",
            mockupContent: (
              <div className="bg-white p-4 rounded border border-gray-200 text-xs font-sans space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-gray-700">Tài liệu bài học đính kèm:</span>
                  <span className="text-[10px] font-bold text-brand-primary bg-brand-light px-2 py-0.5 rounded">Tải PDF</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-brand-primary h-2 rounded-full w-[45%]"></div>
                </div>
              </div>
            )
          }
        ]
      },
      payment: {
        title: "Luồng 3: Thanh Toán VietQR SePay Tự Động 3 Giây",
        subtitle: "Chuyển khoản VietQR bất kỳ ngân hàng -> SePay Webhook đối soát -> Mở khóa đơn hàng lập tức",
        steps: [
          {
            num: "01",
            title: "Hệ thống Sinh Mã QR Động kèm Cú pháp",
            desc: "Khi khách mua khóa học hoặc đặt lịch, hệ thống tạo mã VietQR có sẵn số tiền & nội dung đính kèm (Ví dụ: `SEPAY TC102`).",
            mockupTitle: "Mã VietQR Chuyển Khoản",
            mockupContent: (
              <div className="bg-white p-4 rounded border border-gray-200 text-xs font-sans space-y-2 text-center">
                <div className="font-bold text-brand-dark">Ngân hàng MBBank - CTY COACH TRAN CONG</div>
                <div className="font-mono font-bold text-brand-primary text-sm">STK: 0908123456</div>
                <div className="p-2 bg-gray-50 border rounded font-mono text-[11px]">Nội dung: SEPAY TC102</div>
              </div>
            )
          },
          {
            num: "02",
            title: "Khách Chuyển Khoản Qua App Ngân Hàng",
            desc: "Học viên mở app ngân hàng (MBBank, Vietcombank, Techcombank, MoMo...) quét mã QR và xác nhận chuyển tiền.",
            mockupTitle: "Giao Dịch Ngân Hàng Phía Học Viên",
            mockupContent: (
              <div className="bg-blue-50 p-3 rounded border border-blue-200 text-xs font-sans space-y-1">
                <div className="font-bold text-blue-900">Chuyển thành công: 1.500.000 VNĐ</div>
                <div className="text-[10px] text-blue-700">Tới: CTY COACH TRAN CONG | Mã GD: FT2621008</div>
              </div>
            )
          },
          {
            num: "03",
            title: "SePay Webhook Bắt Giao Dịch Trong 3s",
            desc: "Cổng SePay bắt biến động số dư ngân hàng trong 3 giây, gửi tín hiệu bảo mật xác nhận khớp tiền tới Website Coach.",
            mockupTitle: "Tín Hiệu Khớp Đơn Tự Động",
            mockupContent: (
              <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-[10px] space-y-1">
                <div>[Webhook Received] SePay Txn ID: #98213</div>
                <div>Status: MATCHED (1.500.000 VND) -&gt; Trigger Order #TC102 Activated</div>
              </div>
            )
          },
          {
            num: "04",
            title: "Kích Hoạt Đơn Hàng & Gửi Email Biên Nhận",
            desc: "Đơn hàng tự động đổi trạng thái 'Đã thanh toán', kích hoạt dịch vụ và gửi Email hóa đơn điện tử cho học viên.",
            mockupTitle: "Biên Nhận Hóa Đơn Điện Tử",
            mockupContent: (
              <div className="bg-white p-3 rounded border border-gray-200 text-xs font-sans space-y-1">
                <div className="font-bold text-green-600 flex items-center space-x-1">
                  <Check className="h-3.5 w-3.5" />
                  <span>Đơn hàng #TC102 đã hoàn tất</span>
                </div>
                <p className="text-[10px] text-gray-500">Email xác nhận đã được gửi về homthu@gmail.com</p>
              </div>
            )
          }
        ]
      },
      affiliate: {
        title: "Luồng 4: Tiếp Thị Liên Kết Affiliate CTV (Giai Đoạn 2)",
        subtitle: "Tạo link Ref cá nhân -> Ghi nhận hoa hồng tự động -> Portal quản trị CTV & Đơn hàng",
        steps: [
          {
            num: "01",
            title: "Cộng Tác Viên (CTV) Lấy Link Ref Riêng",
            desc: "CTV hoặc Học viên cũ đăng nhập Portal Affiliate, lấy đường link giới thiệu độc quyền (Ví dụ: `trancong.com?ref=ctv01`).",
            mockupTitle: "Portal Quản Trị CTV",
            mockupContent: (
              <div className="bg-white p-4 rounded border border-gray-200 text-xs font-sans space-y-2">
                <div className="font-bold text-brand-dark">Link Tiếp Thị Cá Nhân Của Bạn:</div>
                <div className="p-2 bg-gray-50 border rounded font-mono text-[11px] text-brand-primary truncate">
                  https://trancongcoach.com/khoa-hoc-dinh-duong?ref=nguyenvana
                </div>
              </div>
            )
          },
          {
            num: "02",
            title: "Tự Động Ghi Nhận Cookie & Đơn Hàng",
            desc: "Khách bấm qua link CTV và mua khóa học, hệ thống tự động trích % hoa hồng (ví dụ: 15%) vào ví của CTV.",
            mockupTitle: "Tracking Hoa Hồng Realtime",
            mockupContent: (
              <div className="bg-amber-50 p-3 rounded border border-amber-200 text-xs font-sans space-y-1">
                <div className="font-bold text-amber-800">Hoa hồng mới phát sinh: +225.000 VNĐ</div>
                <div className="text-[10px] text-amber-700">Đơn hàng: Khóa học Dinh dưỡng (Mã đơn: #TC105)</div>
              </div>
            )
          },
          {
            num: "03",
            title: "Rút Tiền & Admin Chi Trả Tự Động",
            desc: "CTV tạo yêu cầu rút tiền khi đạt hạn mức tối thiểu. Ban quản trị duyệt và đối soát chi trả minh bạch.",
            mockupTitle: "Duyệt Rút Tiền CTV",
            mockupContent: (
              <div className="bg-white p-3 rounded border border-gray-200 text-xs font-sans space-y-1">
                <div className="font-bold text-brand-dark">Yêu cầu rút tiền: 1.500.000 VNĐ</div>
                <span className="inline-block bg-green-100 text-green-800 text-[10px] px-2 py-0.5 rounded font-bold">Đã duyệt chi trả</span>
              </div>
            )
          }
        ]
      }
    };

    return (
      <>
        <Schema
          type="Article"
          data={{
            title: "Bảng Báo Giá & Phân Phước Triển Khai Website Booking - Coach Trần Công",
            summary: "Bảng báo giá đặc tả phân khúc ưu tiên giai đoạn 1 (Booking, E-Learning, Thanh toán VietQR) và mô phỏng luồng vận hành trực quan cho Coach Trần Công.",
            slug: "bao-gia/coach-tran-cong"
          }}
        />

        <div className="bg-gray-100 min-h-screen py-8 sm:py-12 text-gray-800 font-sans">
          {/* Floating Action & Navigation Bar */}
          <div className="max-w-5xl mx-auto px-4 mb-6 flex flex-wrap items-center justify-between gap-3 print:hidden">
            <div className="flex items-center space-x-2 text-xs font-mono font-bold text-gray-600 uppercase">
              <FileText className="h-4 w-4 text-brand-primary" />
              <span>Link báo giá & đặc tả cho Coach Trần Công</span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handleCopyLink}
                className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded bg-white hover:bg-gray-50 border border-gray-300 text-xs font-bold text-gray-700 shadow-xs transition-all cursor-pointer"
                style={{ minHeight: "38px" }}
                title="Sao chép đường link này để gửi cho khách"
              >
                {copiedLink ? (
                  <>
                    <Check className="h-4 w-4 text-green-600" />
                    <span className="text-green-600">Đã chép Link!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="h-4 w-4 text-brand-primary" />
                    <span>Sao chép Link</span>
                  </>
                )}
              </button>

              <button
                onClick={() => window.print()}
                className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded bg-white hover:bg-gray-50 border border-gray-300 text-xs font-bold text-gray-700 shadow-xs transition-all cursor-pointer"
                style={{ minHeight: "38px" }}
              >
                <Printer className="h-4 w-4 text-gray-600" />
                <span>In PDF</span>
              </button>

              <a
                href={socialConfig.zalo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 px-4 py-2 rounded bg-brand-primary hover:bg-brand-secondary text-white text-xs font-bold uppercase shadow-sm transition-all"
                style={{ minHeight: "38px" }}
              >
                <MessageSquare className="h-4 w-4" />
                <span>Trao đổi Zalo</span>
              </a>
            </div>
          </div>

          {/* View Switcher Tabs (Print Hidden) */}
          <div className="max-w-5xl mx-auto px-4 mb-6 print:hidden">
            <div className="bg-white p-1.5 rounded-lg border border-gray-200 shadow-xs flex flex-wrap gap-2">
              <button
                onClick={() => setActiveTab("phases")}
                className={`flex-1 min-w-[160px] py-2.5 px-4 rounded text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center space-x-2 cursor-pointer ${
                  activeTab === "phases"
                    ? "bg-brand-primary text-white shadow-xs"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Layers className="h-4 w-4" />
                <span>1. Phân Phước Triển Khai (Ưu Tiên)</span>
              </button>

              <button
                onClick={() => setActiveTab("flows")}
                className={`flex-1 min-w-[160px] py-2.5 px-4 rounded text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center space-x-2 cursor-pointer ${
                  activeTab === "flows"
                    ? "bg-brand-primary text-white shadow-xs"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Zap className="h-4 w-4 text-amber-300" />
                <span>2. Xem Trực Quan Luồng Vận Hành</span>
              </button>

              <button
                onClick={() => setActiveTab("table")}
                className={`flex-1 min-w-[160px] py-2.5 px-4 rounded text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center space-x-2 cursor-pointer ${
                  activeTab === "table"
                    ? "bg-brand-primary text-white shadow-xs"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                }`}
              >
                <FileText className="h-4 w-4" />
                <span>3. Bảng Báo Giá Chi Tiết 9 Module</span>
              </button>
            </div>
          </div>

          {/* Paper Document Sheet Container */}
          <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden print:shadow-none print:border-none print:rounded-none">
            {/* Header Banner */}
            <div className="bg-brand-dark text-white p-6 sm:p-8 border-b-4 border-brand-primary">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="inline-flex items-center space-x-1.5 bg-brand-primary/20 text-brand-accent px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider mb-2">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>BẢNG BÁO GIÁ & ĐẶC TẢ TIẾN ĐỘ</span>
                  </span>
                  <h1 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight">
                    Website Booking & E-Learning Coach
                  </h1>
                  <p className="text-gray-300 text-xs sm:text-sm mt-1">
                    Kính gửi: <strong className="text-amber-400">Coach Trần Công</strong> | Mã báo giá: <span className="font-mono text-gray-300 font-bold">DDW-QUOTE-2026-TC01</span>
                  </p>
                </div>

                <div className="sm:text-right border-t sm:border-t-0 border-gray-800 pt-3 sm:pt-0">
                  <div className="text-xs text-gray-400 font-mono">Đơn vị lập báo giá:</div>
                  <div className="font-display font-bold text-lg text-white">ĐỨC DUY WEB</div>
                  <div className="text-xs text-brand-accent">Hotline/Zalo: {socialConfig.phone}</div>
                </div>
              </div>
            </div>

            {/* TAB 1: PHAN PHUC TRIEN KHAI (PRIORITIZED PHASES) */}
            {(activeTab === "phases" || true) && (
              <div className={`p-6 sm:p-8 ${activeTab !== "phases" ? "print:block hidden" : "block"}`}>
                <div className="mb-6">
                  <div className="flex items-center space-x-2 text-brand-primary font-bold text-xs uppercase tracking-wider mb-1">
                    <Layers className="h-4 w-4" />
                    <span>PHÂN PHÚC TRIỂN KHAI THEO ƯU TIÊN DOANH THU</span>
                  </div>
                  <h2 className="font-display font-bold text-xl text-brand-dark">
                    Chia Lộ Trình Triển Khai: Ra Mắt Nhanh & Tối Ưu Chi Phí
                  </h2>
                  <p className="text-xs text-gray-500 mt-1">
                    Đức Duy Web đề xuất làm trước <strong>Giai đoạn 1 (MVP Cốt lõi)</strong> bao gồm Booking chuyên gia + Học online E-Learning + Thanh toán tự động VietQR để Coach ra mắt ngay và tạo doanh thu lập tức.
                  </p>
                </div>

                {/* 3 Phase Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  {/* Phase 1 Card */}
                  <div className="bg-white rounded-lg border-2 border-brand-primary shadow-sm p-6 relative flex flex-col justify-between">
                    <div className="absolute -top-3 left-4 bg-brand-primary text-white text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-0.5 rounded shadow-xs">
                      ⭐ KHUYÊN DÙNG LÀM TRƯỚC (ƯU TIÊN)
                    </div>

                    <div>
                      <div className="flex items-baseline justify-between mt-1 border-b border-gray-100 pb-3">
                        <div>
                          <h3 className="font-display font-bold text-lg text-brand-dark">Giai Đoạn 1: MVP Cốt Lõi Bán Hàng</h3>
                          <span className="text-[11px] text-gray-500">Thời gian làm: <strong>10 - 12 ngày làm việc</strong></span>
                        </div>
                        <div className="text-right">
                          <span className="font-display font-black text-2xl text-brand-primary font-mono">
                            {totalPhase1.toLocaleString("vi-VN")}
                          </span>
                          <span className="text-xs font-bold text-gray-500 block">VNĐ</span>
                        </div>
                      </div>

                      <div className="mt-4 space-y-2.5">
                        <span className="text-[11px] font-bold uppercase text-gray-400 font-mono block">
                          Các module bao gồm trong Giai đoạn 1:
                        </span>
                        {phase1Items.map((item) => (
                          <div key={item.id} className="p-2.5 bg-gray-50 rounded border border-gray-200 flex items-start justify-between text-xs">
                            <div>
                              <div className="font-bold text-brand-dark flex items-center space-x-1.5">
                                <CheckCircle2 className="h-3.5 w-3.5 text-brand-primary flex-shrink-0" />
                                <span>{item.title}</span>
                              </div>
                              <p className="text-[11px] text-gray-500 mt-0.5 pl-5">{item.desc}</p>
                            </div>
                            <span className="font-mono font-bold text-gray-700 text-xs ml-2 flex-shrink-0">
                              {item.price.toLocaleString("vi-VN")} đ
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-100 bg-brand-light p-3 rounded">
                      <span className="text-xs font-bold text-brand-dark block">💡 Kết quả đạt được ngay:</span>
                      <p className="text-[11px] text-gray-600 mt-0.5">
                        Coach Trần Công có thể đăng tải khóa học, nhận lịch hẹn tư vấn 1-1, thu học phí tự động qua VietQR SePay và gửi Email nhắc ca ngay sau 10 ngày!
                      </p>
                    </div>
                  </div>

                  {/* Phase 2 Card */}
                  <div className="bg-white rounded-lg border border-gray-300 shadow-sm p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-baseline justify-between border-b border-gray-100 pb-3">
                        <div>
                          <h3 className="font-display font-bold text-lg text-brand-dark">Giai Đoạn 2: Nâng Cấp Tăng Trưởng</h3>
                          <span className="text-[11px] text-gray-500">Mở rộng khi học viên đông (1-2 tháng sau)</span>
                        </div>
                        <div className="text-right">
                          <span className="font-display font-black text-2xl text-gray-700 font-mono">
                            {totalPhase2.toLocaleString("vi-VN")}
                          </span>
                          <span className="text-xs font-bold text-gray-500 block">VNĐ</span>
                        </div>
                      </div>

                      <div className="mt-4 space-y-2.5">
                        <span className="text-[11px] font-bold uppercase text-gray-400 font-mono block">
                          Các module nâng cấp Giai đoạn 2:
                        </span>
                        {phase2Items.map((item) => (
                          <div key={item.id} className="p-2.5 bg-gray-50 rounded border border-gray-200 flex items-start justify-between text-xs">
                            <div>
                              <div className="font-bold text-brand-dark flex items-center space-x-1.5">
                                <Sparkles className="h-3.5 w-3.5 text-amber-500 flex-shrink-0" />
                                <span>{item.title}</span>
                              </div>
                              <p className="text-[11px] text-gray-500 mt-0.5 pl-5">{item.desc}</p>
                            </div>
                            <span className="font-mono font-bold text-gray-700 text-xs ml-2 flex-shrink-0">
                              {item.price.toLocaleString("vi-VN")} đ
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-100 bg-amber-50/60 p-3 rounded border border-amber-200">
                      <span className="text-xs font-bold text-amber-900 block">🚀 Quyền lợi trọn gói cả 2 Giai đoạn:</span>
                      <p className="text-[11px] text-amber-800 mt-0.5">
                        Nếu Coach chốt triển khai trọn gói cả 2 Giai đoạn ngay từ đầu: Tổng ngân sách trọn gói là <strong className="font-mono font-bold">{grandTotal.toLocaleString("vi-VN")} VNĐ</strong> (Miễn phí tích hợp Zalo ZNS nhắc lịch).
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: INTERACTIVE FLOW SIMULATOR */}
            {(activeTab === "flows" || true) && (
              <div className={`p-6 sm:p-8 bg-gray-50/70 border-t border-gray-200 ${activeTab !== "flows" ? "print:block hidden" : "block"}`}>
                <div className="mb-6">
                  <div className="flex items-center space-x-2 text-brand-primary font-bold text-xs uppercase tracking-wider mb-1">
                    <Zap className="h-4 w-4 text-amber-500" />
                    <span>MÔ PHỎNG TRỰC QUAN GIAO DIỆN & LUỒNG VẬN HÀNH</span>
                  </div>
                  <h2 className="font-display font-bold text-xl text-brand-dark">
                    Trải Nghiệm Luồng Khách Hàng Tương Tác Trên Website
                  </h2>
                  <p className="text-xs text-gray-500 mt-1">
                    Bấm vào từng luồng bên dưới để xem mô phỏng màn hình giao diện thực tế mà học viên và Coach sẽ trải nghiệm.
                  </p>

                  {/* Flow Selection Sub-Tabs */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    <button
                      onClick={() => { setActiveFlow("booking"); setActiveStep(0); }}
                      className={`px-3.5 py-2 rounded text-xs font-bold transition-all cursor-pointer ${
                        activeFlow === "booking"
                          ? "bg-brand-dark text-white shadow-xs"
                          : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                      }`}
                    >
                      📅 Luồng Booking 1-1
                    </button>

                    <button
                      onClick={() => { setActiveFlow("elearning"); setActiveStep(0); }}
                      className={`px-3.5 py-2 rounded text-xs font-bold transition-all cursor-pointer ${
                        activeFlow === "elearning"
                          ? "bg-brand-dark text-white shadow-xs"
                          : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                      }`}
                    >
                      🎓 Luồng Học E-Learning
                    </button>

                    <button
                      onClick={() => { setActiveFlow("payment"); setActiveStep(0); }}
                      className={`px-3.5 py-2 rounded text-xs font-bold transition-all cursor-pointer ${
                        activeFlow === "payment"
                          ? "bg-brand-dark text-white shadow-xs"
                          : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                      }`}
                    >
                      💳 Luồng VietQR SePay 3s
                    </button>

                    <button
                      onClick={() => { setActiveFlow("affiliate"); setActiveStep(0); }}
                      className={`px-3.5 py-2 rounded text-xs font-bold transition-all cursor-pointer ${
                        activeFlow === "affiliate"
                          ? "bg-brand-dark text-white shadow-xs"
                          : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                      }`}
                    >
                      🤝 Luồng Affiliate CTV
                    </button>
                  </div>
                </div>

                {/* Active Flow Display Box */}
                <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                  <div className="mb-4 pb-3 border-b border-gray-100">
                    <h3 className="font-display font-bold text-lg text-brand-dark">
                      {flowsData[activeFlow].title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {flowsData[activeFlow].subtitle}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    {/* Left Step Timeline */}
                    <div className="lg:col-span-6 space-y-3">
                      <span className="text-[11px] font-bold uppercase text-gray-400 font-mono block">
                        Các bước trong quy trình:
                      </span>
                      {flowsData[activeFlow].steps.map((step, idx) => (
                        <div
                          key={idx}
                          onClick={() => setActiveStep(idx)}
                          className={`p-3 rounded border transition-all cursor-pointer flex items-start space-x-3 ${
                            activeStep === idx
                              ? "bg-brand-primary/5 border-brand-primary shadow-2xs"
                              : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                          }`}
                        >
                          <div className={`w-6 h-6 rounded-full text-xs font-mono font-bold flex items-center justify-center flex-shrink-0 mt-0.5 ${
                            activeStep === idx ? "bg-brand-primary text-white" : "bg-gray-200 text-gray-700"
                          }`}>
                            {step.num}
                          </div>
                          <div>
                            <h4 className={`font-bold text-xs ${activeStep === idx ? "text-brand-primary" : "text-brand-dark"}`}>
                              {step.title}
                            </h4>
                            <p className="text-[11px] text-gray-600 mt-0.5 leading-relaxed">
                              {step.desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Right Screen Mockup Box */}
                    <div className="lg:col-span-6 bg-gray-900 rounded-lg p-3 text-white shadow-md border border-gray-800">
                      <div className="flex items-center justify-between pb-2 mb-3 border-b border-gray-800 px-1">
                        <div className="flex items-center space-x-1.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                          <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                          <span className="text-[10px] font-mono text-gray-400 pl-2">trancongcoach.com</span>
                        </div>
                        <span className="text-[10px] font-mono text-brand-accent font-bold">
                          {flowsData[activeFlow].steps[activeStep]?.mockupTitle}
                        </span>
                      </div>

                      <div className="p-1">
                        {flowsData[activeFlow].steps[activeStep]?.mockupContent}
                      </div>

                      <div className="mt-3 pt-2 border-t border-gray-800 text-[10px] text-gray-400 text-center font-mono">
                        Mô phỏng giao diện chuẩn Responsive Mobile & Desktop
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: DETAILED TABLE OF 9 MODULES */}
            {(activeTab === "table" || true) && (
              <div className={`p-6 sm:p-8 border-t border-gray-200 ${activeTab !== "table" ? "print:block hidden" : "block"}`}>
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="font-display font-bold text-lg text-brand-dark uppercase tracking-wide">
                    DANH MỤC BÁO GIÁ CHI TIẾT 9 MODULE KỸ THUẬT
                  </h2>
                  <span className="text-xs font-mono bg-brand-primary/10 text-brand-primary px-2.5 py-1 rounded font-bold">
                    Bàn giao 100% Full Source Code
                  </span>
                </div>

                <div className="overflow-x-auto border border-gray-200 rounded-lg">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-gray-100 text-brand-dark font-bold border-b border-gray-200 uppercase font-mono">
                        <th className="py-3 px-3 text-center w-12 border-r border-gray-200">STT</th>
                        <th className="py-3 px-4 border-r border-gray-200">Module Kỹ Thuật</th>
                        <th className="py-3 px-4 border-r border-gray-200 hidden md:table-cell">Mô Tả Chi Tiết</th>
                        <th className="py-3 px-3 text-center border-r border-gray-200 w-28">Giai Đoạn</th>
                        <th className="py-3 px-4 text-right w-32">Chi Phí (VNĐ)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {[...phase1Items, ...phase2Items].map((item, idx) => (
                        <tr key={item.id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                          <td className="py-3.5 px-3 text-center font-mono font-bold text-gray-500 border-r border-gray-200">
                            {String(idx + 1).padStart(2, "0")}
                          </td>
                          <td className="py-3.5 px-4 border-r border-gray-200">
                            <div className="font-bold text-sm text-brand-dark">{item.title}</div>
                            <div className="text-gray-500 text-[11px] mt-1 md:hidden leading-relaxed">
                              {item.desc}
                            </div>
                          </td>
                          <td className="py-3.5 px-4 text-gray-600 leading-relaxed border-r border-gray-200 hidden md:table-cell">
                            {item.desc}
                          </td>
                          <td className="py-3.5 px-3 text-center border-r border-gray-200">
                            {item.phase === 1 ? (
                              <span className="inline-block bg-green-100 text-green-800 font-bold text-[10px] px-2 py-0.5 rounded">
                                Giai đoạn 1 (Ưu tiên)
                              </span>
                            ) : (
                              <span className="inline-block bg-amber-100 text-amber-800 font-bold text-[10px] px-2 py-0.5 rounded">
                                Giai đoạn 2 (Nâng cao)
                              </span>
                            )}
                          </td>
                          <td className="py-3.5 px-4 text-right font-mono font-bold text-brand-dark text-sm whitespace-nowrap">
                            {item.price.toLocaleString("vi-VN")} đ
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="bg-brand-primary/10 text-brand-dark font-bold border-t border-brand-primary/30">
                        <td colSpan={3} className="py-3 px-4 text-left text-xs uppercase font-display border-r border-gray-300">
                          TỔNG PHÂN PHÚC GIAI ĐOẠN 1 (ƯU TIÊN LÀM TRƯỚC):
                        </td>
                        <td className="py-3 px-3 text-center font-mono text-xs border-r border-gray-300">GĐ 1</td>
                        <td className="py-3 px-4 text-right font-mono font-bold text-base text-brand-primary whitespace-nowrap">
                          {totalPhase1.toLocaleString("vi-VN")} đ
                        </td>
                      </tr>
                      <tr className="bg-brand-dark text-white font-bold">
                        <td colSpan={3} className="py-4 px-4 text-left text-sm uppercase font-display border-r border-gray-800">
                          TỔNG TRỌN GÓI CẢ 2 GIAI ĐOẠN (FULL OPTION):
                        </td>
                        <td className="py-4 px-3 text-center font-mono text-xs border-r border-gray-800">Toàn bộ</td>
                        <td className="py-4 px-4 text-right font-mono font-black text-xl text-amber-400 whitespace-nowrap">
                          {grandTotal.toLocaleString("vi-VN")} VNĐ
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>

                {/* Payment Schedule & Guarantees */}
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
                  <div className="bg-amber-50/60 p-4 rounded border border-amber-200">
                    <h3 className="font-bold text-brand-dark uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                      <DollarSign className="h-4 w-4 text-amber-600" />
                      <span>LỘ TRÌNH THANH TOÁN (2 ĐỢT)</span>
                    </h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start space-x-2">
                        <span className="font-mono font-bold text-amber-800">Đợt 1 (50%):</span>
                        <span>Thanh toán <strong>21.000.000 VNĐ</strong> (cho GĐ 1) sau khi ký hợp đồng và duyệt bản thiết kế.</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="font-mono font-bold text-amber-800">Đợt 2 (50%):</span>
                        <span>Thanh toán <strong>21.000.000 VNĐ</strong> sau khi bàn giao nghiệm thu & đưa vào sử dụng.</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-brand-light p-4 rounded border border-brand-primary/20">
                    <h3 className="font-bold text-brand-dark uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                      <ShieldCheck className="h-4 w-4 text-brand-primary" />
                      <span>CAM KẾT BẢO HÀNH & MÃ NGUỒN</span>
                    </h3>
                    <ul className="space-y-1.5 text-gray-700">
                      <li className="flex items-center space-x-1.5">
                        <CheckCircle2 className="h-3.5 w-3.5 text-brand-primary flex-shrink-0" />
                        <span>Bàn giao 100% Full Source Code độc lập vĩnh viễn.</span>
                      </li>
                      <li className="flex items-center space-x-1.5">
                        <CheckCircle2 className="h-3.5 w-3.5 text-brand-primary flex-shrink-0" />
                        <span>Bảo hành kỹ thuật 12 tháng trọn gói.</span>
                      </li>
                      <li className="flex items-center space-x-1.5">
                        <CheckCircle2 className="h-3.5 w-3.5 text-brand-primary flex-shrink-0" />
                        <span>Tối ưu Google PageSpeed & SEO 100%.</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Signatures */}
                <div className="mt-10 pt-6 border-t border-gray-200 grid grid-cols-2 gap-8 text-center text-xs">
                  <div>
                    <p className="font-bold uppercase text-gray-500">ĐẠI DIỆN KHÁCH HÀNG</p>
                    <p className="text-gray-400 mt-1 italic">(Ký & ghi rõ họ tên)</p>
                    <div className="h-14"></div>
                    <p className="font-bold text-brand-dark">Coach Trần Công</p>
                  </div>

                  <div>
                    <p className="font-bold uppercase text-gray-500">ĐẠI DIỆN ĐỨC DUY WEB</p>
                    <p className="text-gray-400 mt-1 italic">(Ký & xác nhận)</p>
                    <div className="h-14 flex items-center justify-center">
                      <span className="font-mono text-brand-primary font-bold border border-brand-primary/30 px-3 py-1 rounded bg-brand-primary/5">
                        [ĐÃ DUYỆT BẢN ĐẶC TẢ]
                      </span>
                    </div>
                    <p className="font-bold text-brand-dark">Đức Duy Web</p>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Callout Bar */}
            <div className="bg-gray-50 p-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden">
              <div>
                <h4 className="font-bold text-sm text-brand-dark">Coach đã sẵn sàng triển khai Giai đoạn 1?</h4>
                <p className="text-xs text-gray-500 mt-0.5">Liên hệ Đức Duy Web qua Zalo để ký hợp đồng và bắt đầu lập trình ngay.</p>
              </div>

              <a
                href={socialConfig.zalo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-5 py-2.5 rounded bg-brand-primary hover:bg-brand-secondary text-white text-xs font-bold uppercase shadow-sm transition-all flex-shrink-0"
                style={{ minHeight: "42px" }}
              >
                <span>Xác nhận triển khai qua Zalo</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </>
    );
  }
