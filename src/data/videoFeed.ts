// Feed video kiểu TikTok tại /video (trang thử nghiệm).
// youtubeId: mã video sau "youtube.com/shorts/" hoặc "watch?v=". Hiện đang dùng tạm Shorts có sẵn
// trên kênh @ducduyweb để thử giao diện, thay bằng video đúng chủ đề khi quay xong.

export interface VideoFeedItem {
  id: string;
  youtubeId: string;
  topic: string;
  audience: string; // Tệp khách hàng video này nhắm tới
  hook: string; // Câu mở đầu, hiện to nhất
  points: string[];
  quiz?: {
    question: string;
    options: { label: string; reply: string }[];
  };
  article?: { label: string; href: string };
}

export const videoFeed: VideoFeedItem[] = [
  {
    id: "ten-mien-dung-ten-ai",
    youtubeId: "r26x68_cm4A",
    topic: "Tên miền",
    audience: "Chủ doanh nghiệp đã có website",
    hook: "Tên miền website của bạn đang đứng tên ai?",
    points: [
      "Nhiều web do bên làm web đăng ký hộ, đứng tên họ chứ không phải bạn.",
      "Đổi đơn vị làm web hoặc họ ngưng hoạt động là có thể mất luôn tên miền.",
      "Tra thử bằng whois, 1 phút là biết."
    ],
    quiz: {
      question: "Bạn có tài khoản quản lý tên miền của mình không?",
      options: [
        { label: "Có, tự giữ", reply: "Tốt. Nhớ bật xác thực 2 lớp và kiểm tra ngày hết hạn mỗi năm." },
        { label: "Không rõ", reply: "Nhắn Duy tên miền, mình tra giúp xem đang đứng tên ai, miễn phí." }
      ]
    },
    article: { label: "Đọc: Domain là gì, chọn sao cho đúng", href: "/cafe-so/domain-la-gi" }
  },
  {
    id: "khach-search-ten-tiem",
    youtubeId: "QTk0NDZF9Lg",
    topic: "Google Maps",
    audience: "Tiệm, phòng khám, cửa hàng có mặt bằng",
    hook: "Khách gõ tên tiệm bạn lên Google, họ thấy gì?",
    points: [
      "Phần lớn khách xem Google Maps trước khi ghé: giờ mở cửa, ảnh, đánh giá.",
      "Hồ sơ trống hoặc sai giờ là mất khách mà bạn không hề biết.",
      "Tạo và xác minh Google Business hoàn toàn miễn phí."
    ],
    quiz: {
      question: "Tiệm bạn đã hiện trên Google Maps chưa?",
      options: [
        { label: "Rồi", reply: "Thử đếm: bạn có đủ 10 ảnh thật và đã trả lời hết đánh giá chưa?" },
        { label: "Chưa", reply: "Đây là việc nên làm đầu tiên, trước cả website. Đọc bài bên dưới nhé." }
      ]
    },
    article: { label: "Đọc: Google Business là gì", href: "/cafe-so/google-business-la-gi" }
  },
  {
    id: "chi-ban-tren-facebook",
    youtubeId: "OkinXUIaMUg",
    topic: "Chọn kênh",
    audience: "Shop đang bán chủ yếu trên Facebook, TikTok",
    hook: "Chỉ bán trên Facebook thì có sao không?",
    points: [
      "Không sao, cho tới ngày tài khoản bị khoá hoặc thuật toán đổi.",
      "Facebook là đất thuê, website là đất thổ cư của bạn.",
      "Dùng mạng xã hội để kéo khách, dùng web để giữ khách."
    ],
    quiz: {
      question: "Nếu fanpage mất ngày mai, bạn còn liên lạc được với khách cũ không?",
      options: [
        { label: "Còn", reply: "Bạn đang giữ dữ liệu khách đúng cách. Bước tiếp là có web để họ tìm lại bạn." },
        { label: "Không", reply: "Đây là rủi ro lớn nhất. Bắt đầu lưu số điện thoại, email khách ngay từ hôm nay." }
      ]
    },
    article: { label: "Đọc: Website khác Facebook thế nào", href: "/cafe-so/website-khac-facebook-the-nao" }
  },
  {
    id: "lam-web-xong-khong-ai-vao",
    youtubeId: "t8B6Msp27Tg",
    topic: "SEO",
    audience: "Đã có website nhưng vắng khách",
    hook: "Làm web xong, vì sao vẫn không ai vào?",
    points: [
      "Web giống cửa hàng trong hẻm: có rồi nhưng chưa ai biết đường tới.",
      "Cần nội dung trả lời đúng câu khách hay tìm trên Google.",
      "SEO là việc làm đều mỗi tháng, không phải làm một lần."
    ],
    quiz: {
      question: "Web của bạn có bài viết mới trong 3 tháng gần đây không?",
      options: [
        { label: "Có", reply: "Tốt. Kiểm tra tiếp trong Google Search Console xem bài nào có người tìm." },
        { label: "Không", reply: "Google ít ghé những web đứng yên. Một bài hữu ích mỗi tháng đã khác rất nhiều." }
      ]
    },
    article: { label: "Đọc: Web và SEO không chỉ là làm xong rồi chờ", href: "/blog/website-va-seo-khong-chi-la-lam-xong-roi-cho-khach" }
  },
  {
    id: "hosting-re-hay-dat",
    youtubeId: "iPH2bgCOtYg",
    topic: "Hosting",
    audience: "Đang tìm chỗ làm web, so sánh báo giá",
    hook: "Hosting 300 nghìn và 3 triệu một năm khác nhau chỗ nào?",
    points: [
      "Khác ở tốc độ, độ ổn định và có sao lưu dữ liệu hay không.",
      "Web chậm 3 giây là khách điện thoại bấm thoát.",
      "Đắt chưa chắc tốt, quan trọng là đúng nhu cầu."
    ],
    quiz: {
      question: "Web của bạn có được sao lưu tự động không?",
      options: [
        { label: "Có", reply: "Thử hỏi bên quản lý: lần khôi phục gần nhất mất bao lâu?" },
        { label: "Không biết", reply: "Hỏi ngay bên làm web. Mất dữ liệu là mất cả năm công sức." }
      ]
    },
    article: { label: "Đọc: Hosting là gì", href: "/cafe-so/hosting-la-gi" }
  }
];
