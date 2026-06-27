import { ProjectItem } from "../types";

export const projects: ProjectItem[] = [
  {
    id: "proj-quang-cao-phuong-dong",
    slug: "quang-cao-phuong-dong",
    title: "Website Doanh Nghiệp Quảng Cáo Phương Đông",
    category: "business",
    categoryLabel: "Website Doanh Nghiệp",
    description: "Hệ thống website đa chức năng giới thiệu năng lực thi công quảng cáo, biển hiệu và hộp đèn. Tích hợp thư viện ảnh công trình độ nét cao cùng bộ lọc dự án real-time.",
    features: [
      "Showroom dự án thông minh với bộ lọc không tải lại trang.",
      "Tính năng ước tính giá thi công nhanh dựa trên kích thước bảng hiệu.",
      "Tối ưu SEO On-Page đạt điểm tuyệt đối 100/100 trên Google Lighthouse.",
      "Trang liên hệ tích hợp bản đồ Google Business chính xác."
    ],
    goals: "Giúp doanh nghiệp tiếp cận các chủ chuỗi cửa hàng, nhà hàng lớn tại khu vực phía Nam và nâng tầm thương hiệu thi công quảng cáo chuyên nghiệp.",
    industry: "Quảng cáo & Thi công hoàn thiện",
    imageUrl: "https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&w=800&q=80",
    techStack: ["React", "Vite", "Tailwind CSS", "Framer Motion"]
  },
  {
    id: "proj-da-hoa-cuong-hoang-gia",
    slug: "da-hoa-cuong-hoang-gia",
    title: "E-Catalog Cao Cấp Đá Hoa Cương Hoàng Gia",
    category: "profile",
    categoryLabel: "Company Profile Số",
    description: "Website hồ sơ năng lực số trưng bày hơn 500 mẫu đá tự nhiên nhập khẩu từ Brazil, Ý, Ấn Độ. Tập trung vào tính nghệ thuật sang trọng của từng vân đá.",
    features: [
      "Bộ sưu tập vân đá độ phân giải cực cao (HD Texture Viewer).",
      "Hệ thống phối cảnh ốp đá 3D ảo cho nhà bếp, phòng khách.",
      "Bảng tra cứu phong thủy chọn đá theo mệnh gia chủ tự động.",
      "Giao diện tối giản phong cách Thụy Sĩ tôn vinh hình ảnh sản phẩm."
    ],
    goals: "Đồng hành cùng các Kiến trúc sư và chủ biệt thự cao cấp lựa chọn dòng đá lát nền nghệ thuật chất lượng hàng đầu.",
    industry: "Vật liệu & Đá tự nhiên",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    techStack: ["React", "TypeScript", "Tailwind CSS", "Lucide React"]
  },
  {
    id: "proj-bida-thanh-tam",
    slug: "bida-thanh-tam",
    title: "Cổng Thông Tin & Setup CLB Bida Thành Tâm",
    category: "business",
    categoryLabel: "Website Doanh Nghiệp",
    description: "Nền tảng trực tuyến kết hợp giới thiệu xưởng sản xuất bàn bida gia đình và các gói tư vấn setup câu lạc bộ bida trọn gói chuyên nghiệp.",
    features: [
      "Cẩm nang kinh doanh CLB bida, chia sẻ bài toán thu hồi vốn chi tiết.",
      "Công cụ đo đạc bố trí bàn bida theo kích thước phòng trống.",
      "Hệ thống định vị các câu lạc bộ đối tác đã setup thành công.",
      "Biểu mẫu đăng ký tư vấn trực tiếp với Giám đốc xưởng."
    ],
    goals: "Gia tăng doanh số bán bàn bida đạt chuẩn quốc tế nội địa và kết nối với các nhà đầu tư CLB bida khởi nghiệp.",
    industry: "Sản xuất & Thể thao giải trí",
    imageUrl: "https://images.unsplash.com/photo-1544192240-4a34feb0104c?auto=format&fit=crop&w=800&q=80",
    techStack: ["React", "Vite", "Tailwind CSS", "Framer Motion"]
  },
  {
    id: "proj-spa-pet-sweet-home",
    slug: "spa-pet-sweet-home",
    title: "Hệ Thống Đặt Lịch & Spa Thú Cưng Sweet Home",
    category: "landing",
    categoryLabel: "Landing Page Dịch Vụ",
    description: "Trang đích chuyển đổi cực cao tối ưu cho di động phục vụ đặt lịch spa tắm sấy, cắt tỉa lông và khách sạn thú cưng cao cấp.",
    features: [
      "Hệ thống đặt lịch real-time tự động khóa giờ khi có khách đăng ký.",
      "Bảng giá trực quan cập nhật theo cân nặng chó/mèo.",
      "Trang Feedback khách hàng thực tế kèm hình ảnh pet trước/sau làm đẹp.",
      "Đồng bộ hóa dữ liệu đặt lịch về nhóm chat Zalo của quản lý tiệm."
    ],
    goals: "Giải quyết bài toán trùng lịch hẹn, tối ưu năng suất làm việc của thợ cắt lông pet và thu hút khách hàng mới lân cận.",
    industry: "Dịch vụ Thú cưng & Thú y",
    imageUrl: "https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?auto=format&fit=crop&w=800&q=80",
    techStack: ["React", "Vite", "Tailwind CSS", "Zalo API Integration"]
  },
  {
    id: "proj-interior-nordic-design",
    slug: "interior-nordic-design",
    title: "Hồ Sơ Năng Lực Thiết Kế Nội Thất Nordic Design",
    category: "portfolio",
    categoryLabel: "Website Portfolio Cá Nhân / Team",
    description: "Website trưng bày dự án thiết kế thi công nội thất phong cách Bắc Âu (Scandinavian). Sử dụng phong cách thẩm mỹ tối giản, tinh tế.",
    features: [
      "Bộ trượt kéo so sánh ảnh thiết kế 3D và ảnh thực tế hoàn thiện 1:1.",
      "Công cụ tính toán dự toán ngân sách thi công nội thất tự động.",
      "Trang blog chia sẻ cẩm nang trang trí nhà ở, chọn vật liệu bền vững.",
      "Lazy-loading hình ảnh nâng cao bảo toàn tốc độ load dưới 1.5 giây."
    ],
    goals: "Thu hút phân khúc khách hàng mua căn hộ chung cư cao cấp và nhà phố đang có nhu cầu hoàn thiện nội thất tinh tế.",
    industry: "Thiết kế & Thi công Nội thất",
    imageUrl: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
    techStack: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"]
  }
];
