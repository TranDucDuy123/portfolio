import { ResourceChecklist } from "../types";

export const resourceChecklists: ResourceChecklist[] = [
  {
    id: "chk-website",
    slug: "website-checklist",
    title: "Checklist Đánh Giá Độ Chuẩn Sàn Của Website Doanh Nghiệp",
    description: "Trước khi đầu tư chạy quảng cáo đắt đỏ, hãy kiểm tra xem website của bạn đã đạt tiêu chuẩn giữ chân khách hàng và tạo dựng niềm tin chưa.",
    items: [
      { text: "Tốc độ tải trang dưới 3 giây trên cả thiết bị di động và máy tính.", category: "Hiệu năng" },
      { text: "Đã cài đặt chứng chỉ bảo mật HTTPS (có biểu tượng ổ khóa an toàn).", category: "Bảo mật" },
      { text: "Giao diện hiển thị co giãn chuẩn xác, không bị tràn viền hay lỗi font trên di động.", category: "Trải nghiệm (UX/UI)" },
      { text: "Tiêu đề (Headline) trang chủ nêu rõ ngành nghề và lợi ích cốt lõi trong vòng 3 giây đầu.", category: "Nội dung (Copywriting)" },
      { text: "Có ít nhất 3 dự án thực tế kèm hình ảnh/video sắc nét chứng minh năng lực thi công.", category: "Độ uy tín (Social Proof)" },
      { text: "Các nút liên hệ nhanh (Zalo, Hotline, Messenger) được ghim nổi bật, hoạt động mượt mà.", category: "Chuyển đổi" },
      { text: "Đã cài đặt các công cụ theo dõi hành vi cơ bản như Google Analytics 4 (GA4).", category: "Dữ liệu" }
    ]
  },
  {
    id: "chk-seo",
    slug: "seo-checklist",
    title: "Checklist Tối Ưu SEO On-Page Thống Trị Top Google",
    description: "Bộ tiêu chí kỹ thuật chuẩn chỉ giúp các công cụ tìm kiếm của Google quét, hiểu và xếp hạng website của bạn ở vị trí đầu tiên.",
    items: [
      { text: "Tất cả các trang đều có thẻ tiêu đề (Title Tag) chứa từ khóa chính, độ dài dưới 60 ký tự.", category: "Thẻ Meta" },
      { text: "Thẻ mô tả (Meta Description) hấp dẫn, kích thích lượt click, độ dài dưới 160 ký tự.", category: "Thẻ Meta" },
      { text: "Mỗi trang chỉ có duy nhất một thẻ H1, các thẻ H2 và H3 được sắp xếp theo cấu trúc phân cấp khoa học.", category: "Cấu trúc bài viết" },
      { text: "Tên file ảnh không dấu viết liền bằng gạch ngang (ví dụ: thi-cong-bang-hieu.jpg) và chứa thẻ Alt mô tả ảnh.", category: "Tối ưu hình ảnh" },
      { text: "Đường dẫn URL ngắn gọn, thân thiện, chứa từ khóa chính và không có ký tự đặc biệt.", category: "URL" },
      { text: "Có hệ thống liên kết nội bộ (Internal Linking) chặt chẽ giữa các bài viết liên quan.", category: "Liên kết" },
      { text: "Đã tạo và gửi sitemap.xml, robots.txt lên Google Search Console.", category: "Kỹ thuật (Technical)" }
    ]
  },
  {
    id: "chk-gmb",
    slug: "google-business-checklist",
    title: "Checklist Tối Ưu Google Business & Google Maps Địa Phương",
    description: "Tăng 200% khả năng hiển thị trước mắt khách hàng lân cận đang tìm kiếm dịch vụ trực tiếp quanh khu vực bạn hoạt động.",
    items: [
      { text: "Tên doanh nghiệp chuẩn hóa, chứa lĩnh vực hoạt động (ví dụ: Xưởng Đá Hoa Cương Hoàng Gia).", category: "Hồ sơ" },
      { text: "Đăng ký chính xác danh mục kinh doanh chính và các danh mục phụ liên quan.", category: "Hồ sơ" },
      { text: "Cung cấp địa chỉ thực có thể định vị chính xác trên bản đồ Google Maps để khách ghé thăm.", category: "Địa điểm" },
      { text: "Số điện thoại liên hệ và giờ mở cửa được cập nhật chính xác, trùng khớp với website.", category: "Thông tin" },
      { text: "Đăng tải ít nhất 10 hình ảnh chất lượng cao chụp văn phòng, mặt tiền cửa hàng và xưởng sản xuất thực tế.", category: "Hình ảnh" },
      { text: "Có quy trình phản hồi tất cả các đánh giá (Review) của khách hàng, dù là tích cực hay tiêu cực.", category: "Đánh giá" },
      { text: "Định kỳ đăng tải các bài đăng ngắn giới thiệu sản phẩm mới trực tiếp lên Google Business hằng tuần.", category: "Tương tác" }
    ]
  },
  {
    id: "chk-asset",
    slug: "digital-asset-checklist",
    title: "Checklist Đánh Giá Sức Khỏe Tài Sản Số Doanh Nghiệp",
    description: "Đo lường mức độ tự chủ về mặt công nghệ và quản lý dữ liệu để đảm bảo doanh nghiệp không bị phụ thuộc vào đất thuê mạng xã hội.",
    items: [
      { text: "Doanh nghiệp đứng tên sở hữu trực tiếp tên miền thương hiệu cốt lõi.", category: "Chủ quyền" },
      { text: "Nắm giữ tài khoản quản trị tối cao của Website và Hosting lưu trữ.", category: "Quyền kiểm soát" },
      { text: "Sử dụng hệ thống Email theo đuôi tên miền doanh nghiệp (ví dụ: ceo@tencongty.com).", category: "Thương hiệu số" },
      { text: "Có danh sách cập nhật liên tục thông tin liên hệ (Email, SĐT) của ít nhất 500 khách hàng cũ.", category: "Dữ liệu khách hàng" },
      { text: "Hồ sơ Google Business Maps đã được xác minh chính chủ và thuộc quyền quản trị của công ty.", category: "Chủ quyền" },
      { text: "Website có lượng truy cập tìm kiếm tự nhiên ổn định mỗi tháng từ Google (không cần trả phí quảng cáo).", category: "Tính bền vững" },
      { text: "Có công cụ tự động sao lưu (Backup) dữ liệu website định kỳ đề phòng sự cố máy chủ.", category: "An toàn dữ liệu" }
    ]
  }
];
