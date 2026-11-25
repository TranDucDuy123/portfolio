// Dự án mẫu: mỗi dự án trình bày cách một chiến dịch được vận hành từ đầu đến cuối,
// kèm bản demo chạy thật để chủ doanh nghiệp hình dung. Không ghi số liệu kết quả khi chưa có dữ liệu thật.

export interface SampleProjectPhase {
  name: string;
  time: string;
  goal: string;
  work: string[];
  deliverable: string;
}

export interface SampleProject {
  slug: string;
  client: string;
  title: string;
  industry: string;
  status: string;
  summary: string;
  cover: string;
  demoUrl?: string;
  channels: string[];
  context: string[];
  goals: string[];
  phases: SampleProjectPhase[];
  weekly: { day: string; task: string }[];
  measure: { what: string; why: string }[];
  roles: { who: string; does: string[] }[];
  gallery: { src: string; caption: string }[];
  note: string;
}

export const sampleProjects: SampleProject[] = [
  {
    slug: "turn-apparel",
    client: "TURN Apparel",
    title: "TURN Apparel: website lookbook và chiến dịch “phối theo chủ đề”",
    industry: "Thời trang streetwear",
    status: "Concept đề xuất · Demo chạy thật",
    summary:
      "Thương hiệu streetwear mới vào Việt Nam: dựng website làm trung tâm thương hiệu, nội dung xoay quanh từng dịp mặc (đi học, đi cafe, dạo phố, đồ đôi, thể thao), rồi dùng dữ liệu để quyết định bước tiếp theo.",
    cover: "/du-an-mau/turn-apparel-hero.jpg",
    demoUrl: "/demo/turnapparel/",
    channels: ["Website", "Facebook", "Instagram", "TikTok", "Shopee / TikTok Shop"],
    context: [
      "Đã có hệ thống bán hàng (đơn, kho, gian hàng sàn) nhưng website chưa được tối ưu và chưa kể được câu chuyện thương hiệu.",
      "Mỗi kênh một kiểu hình ảnh, khách khó nhận ra cùng một thương hiệu.",
      "Thương hiệu mới nên chưa biết khách Việt quan tâm sản phẩm, màu, mức giá hay thông điệp nào.",
    ],
    goals: [
      "Khách vào web hiểu ngay TURN mặc thế nào, cho dịp nào, và mua ở đâu.",
      "Một bộ nhận diện thống nhất trên mọi kênh.",
      "Có dữ liệu thật để quyết định giai đoạn 2, không đoán.",
    ],
    phases: [
      {
        name: "Chọn gu và chuẩn hoá nhận diện",
        time: "Tuần 1–2",
        goal: "Thống nhất TURN trông và nói chuyện thế nào trước khi làm bất cứ thứ gì khác.",
        work: [
          "Lập bảng phong cách (style board): màu, chữ, kiểu ảnh, set outfit mẫu để chủ thương hiệu chọn.",
          "Chuẩn hoá logo, ảnh bìa, mẫu ảnh sản phẩm, giọng văn cho website, Facebook, Instagram, TikTok, sàn.",
        ],
        deliverable: "Bộ nhận diện dùng chung cho 5 kênh",
      },
      {
        name: "Website làm trung tâm thương hiệu",
        time: "Tuần 2–4",
        goal: "Biến website từ danh sách sản phẩm thành nơi khách được gợi ý cách mặc.",
        work: [
          "Trang chủ lookbook: menu chia theo dịp mặc, slider sản phẩm ngang, cột món phối cùng cuộn dọc.",
          "Mục hướng dẫn phối đồ: mỗi bước gắn sẵn sản phẩm và nút mua.",
          "Cây danh mục sản phẩm, SEO nền tảng, bảng size có gợi ý theo chiều cao, cân nặng.",
        ],
        deliverable: "Trang chủ demo chạy trên máy tính và điện thoại",
      },
      {
        name: "Mở kênh và nội dung mở màn",
        time: "Tuần 3–6",
        goal: "Bắt đầu xuất hiện đều đặn, mỗi bài đều dẫn về một sản phẩm cụ thể.",
        work: [
          "Mở shop liên kết với hệ thống bán hàng, đơn từ mọi kênh về một chỗ.",
          "Lịch đăng Facebook, Instagram theo chủ đề tuần: bài phối đồ, bài sản phẩm, video ngắn.",
          "Mỗi bài gắn link về đúng trang chủ đề trên web để đo được bài nào kéo khách.",
        ],
        deliverable: "Lịch nội dung tháng và các bài mở màn",
      },
      {
        name: "Cộng đồng và nội dung từ khách",
        time: "Tuần 5–8",
        goal: "Để khách mặc TURN tự kể chuyện, thương hiệu chỉ cần chọn lọc và lan toả.",
        work: [
          "Mục Cộng đồng trên web: khách đăng outfit, gắn món TURN đang mặc.",
          "Góc “Hỏi cách phối”: câu hỏi thật của khách thành chủ đề bài viết tiếp theo.",
        ],
        deliverable: "Quy trình nhận, duyệt và đăng lại outfit của khách",
      },
      {
        name: "Đo lường và quyết định giai đoạn 2",
        time: "Hằng tháng",
        goal: "Chỉ mở rộng phần nào dữ liệu cho thấy hiệu quả.",
        work: [
          "Theo dõi tìm kiếm, nội dung, hành vi trên web và phản hồi khách.",
          "Báo cáo tháng bằng ngôn ngữ dễ hiểu: chủ đề nào, sản phẩm nào, kênh nào đang được quan tâm.",
        ],
        deliverable: "Báo cáo tháng và đề xuất giai đoạn 2",
      },
    ],
    weekly: [
      { day: "Thứ Hai", task: "Chốt chủ đề tuần (ví dụ: Đi học) và 3–5 món chủ lực" },
      { day: "Thứ Ba", task: "Đăng bài phối đồ, gắn link trang chủ đề trên web" },
      { day: "Thứ Năm", task: "Đăng video ngắn hoặc bài sản phẩm, trả lời câu hỏi cách phối" },
      { day: "Thứ Sáu", task: "Chọn và đăng lại outfit của khách trong mục Cộng đồng" },
      { day: "Chủ Nhật", task: "Đọc số liệu tuần, ghi lại chủ đề và sản phẩm được quan tâm" },
    ],
    measure: [
      { what: "Chủ đề nào được xem nhiều", why: "Biết dịp mặc nào nên làm thêm nội dung và nhập thêm hàng" },
      { what: "Sản phẩm được bấm, thả tim, thêm vào giỏ", why: "Chọn món chủ lực cho quảng cáo khi có ngân sách" },
      { what: "Bài đăng nào kéo khách về web", why: "Bỏ dạng bài không hiệu quả, nhân bản dạng bài tốt" },
      { what: "Câu hỏi và phản hồi của khách", why: "Lấy chính lời khách làm chủ đề và thông điệp" },
    ],
    roles: [
      { who: "Chủ thương hiệu quyết định", does: ["Sản phẩm, định vị, giá", "Ngân sách quảng cáo", "Duyệt nội dung trước khi đăng"] },
      { who: "Duy Web thực hiện", does: ["Website và trải nghiệm mua", "Nhận diện và nội dung trên các kênh", "Đo lường và báo cáo hằng tháng"] },
    ],
    gallery: [
      { src: "/du-an-mau/turn-apparel-hero.jpg", caption: "Trang chủ: menu theo dịp mặc, slider sản phẩm và cột món phối cùng" },
      { src: "/du-an-mau/turn-apparel-huong-dan.jpg", caption: "Hướng dẫn phối đồ: mỗi bước gắn sẵn sản phẩm" },
      { src: "/du-an-mau/turn-apparel-cong-dong.jpg", caption: "Cộng đồng: outfit của khách gắn món đang mặc" },
      { src: "/du-an-mau/turn-apparel-mobile.jpg", caption: "Bản điện thoại: cột sản phẩm chuyển thành dải lướt ngang" },
    ],
    note: "Bản demo concept. Giá, bài viết và tài khoản trong demo là dữ liệu minh hoạ, không phải kết quả thật.",
  },
];
