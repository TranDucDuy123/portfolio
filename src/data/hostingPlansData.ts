// Data file for Hosting Plans, Comparison Matrix, Quiz Questions, and FAQs for Vận Tải MKS Proposal

export interface HostingPlan {
  id: string;
  name: string;
  capacity: string;
  tag: string;
  isRecommended?: boolean;
  price: string;
  mainDesc: string;
  clientMessage: string;
  suitableFor: string[];
  limitations?: string[];
  highlightNote?: string;
  colorScheme: {
    border: string;
    bg: string;
    badgeBg: string;
    badgeText: string;
    accent: string;
  };
}

export const HOSTING_PLANS: HostingPlan[] = [
  {
    id: "3gb",
    name: "Gói 3GB – KHỞI TẠO",
    capacity: "3 GB NVMe Storage",
    tag: "Đủ để bắt đầu",
    price: "Liên hệ tư vấn",
    mainDesc: "Làm website giới thiệu cơ bản và ít cập nhật.",
    clientMessage: "Anh làm website xong, đưa thông tin công ty lên và chủ yếu để đó.",
    suitableFor: [
      "Website giới thiệu khoảng 5–7 trang cơ bản",
      "Ít hình ảnh sản phẩm & dự án",
      "Không đăng bài viết tin tức/SEO thường xuyên",
      "Không cần sử dụng nhiều email doanh nghiệp",
      "Chưa có kế hoạch phát triển SEO dài hạn"
    ],
    limitations: [
      "Khoảng dự phòng bộ nhớ đệm rất ít",
      "Cần nén và tối ưu kích thước ảnh cực kỳ cẩn thận",
      "Có thể phải nâng cấp dung lượng sớm khi bắt đầu đăng nhiều bài"
    ],
    colorScheme: {
      border: "border-gray-200",
      bg: "bg-white",
      badgeBg: "bg-gray-100",
      badgeText: "text-gray-700",
      accent: "text-gray-900"
    }
  },
  {
    id: "5gb",
    name: "Gói 5GB – VỪA ĐỦ",
    capacity: "5 GB NVMe Storage",
    tag: "Vừa đủ vận hành",
    price: "Liên hệ tư vấn",
    mainDesc: "Đủ dùng cho website công ty có cập nhật nội dung ở mức vừa phải.",
    clientMessage: "Có thể viết bài và đăng hình ảnh đa dạng, nhưng dung lượng được sử dụng tương đối vừa khít.",
    suitableFor: [
      "Website công ty khoảng 10–15 trang nội dung",
      "Có các trang dịch vụ vận tải & dự án chuyến hàng",
      "Đăng trung bình 1–2 bài viết tin tức mỗi tháng",
      "Hình ảnh tải lên đã qua tối ưu dung lượng",
      "Sử dụng 1–2 địa chỉ email doanh nghiệp cơ bản"
    ],
    limitations: [
      "Dung lượng sử dụng sát với thực tế vận hành",
      "Cần theo dõi mức tiêu tốn dung lượng định kỳ hàng quý"
    ],
    colorScheme: {
      border: "border-blue-200",
      bg: "bg-white",
      badgeBg: "bg-blue-50",
      badgeText: "text-blue-700",
      accent: "text-blue-900"
    }
  },
  {
    id: "10gb",
    name: "Gói 10GB – SEO TĂNG TRƯỜNG",
    capacity: "10 GB NVMe Storage",
    tag: "Cân bằng chi phí & phát triển",
    isRecommended: true,
    price: "Liên hệ tư vấn",
    mainDesc: "Có khoảng dự phòng phù hợp để phát triển nội dung và SEO.",
    clientMessage: "Không chỉ đủ chạy website mà còn chừa không gian cho bài viết, hình ảnh dự án và kế hoạch SEO lâu dài.",
    suitableFor: [
      "Website giới thiệu công ty vận tải chuyên nghiệp",
      "Nhiều trang dịch vụ & tuyến đường vận chuyển",
      "Viết từ 2–4 bài viết tối ưu SEO mỗi tháng",
      "Thường xuyên cập nhật hình ảnh dự án & chuyến hàng thực tế",
      "Sử dụng email doanh nghiệp gửi báo giá & hợp đồng",
      "Có khoảng dự phòng rộng rãi cho cache và dữ liệu phát sinh"
    ],
    highlightNote: "Lựa chọn hợp lý cho Vận Tải MKS nếu muốn làm website nghiêm túc và phát triển SEO.",
    colorScheme: {
      border: "border-amber-400 border-2",
      bg: "bg-amber-50/30",
      badgeBg: "bg-amber-500",
      badgeText: "text-white font-bold",
      accent: "text-brand-dark"
    }
  },
  {
    id: "20gb",
    name: "Gói 20GB – MARKETING THOẢI MÁI",
    capacity: "20 GB NVMe Storage",
    tag: "Phát triển dài hạn",
    price: "Liên hệ tư vấn",
    mainDesc: "Không gian thoải mái cho doanh nghiệp xác định đầu tư nội dung và marketing dài hạn.",
    clientMessage: "Phù hợp khi doanh nghiệp muốn phát triển nhiều bài viết, hình ảnh, dự án, email và các chiến dịch SEO liên tục.",
    suitableFor: [
      "Nhiều nhóm dịch vụ vận chuyển & quy trình phức tạp",
      "Đa dạng các tuyến vận chuyển Bắc - Trung - Nam",
      "Thư viện hình ảnh xe tải, kho bãi & chuyến hàng lớn",
      "Viết nội dung SEO và đăng tin tức thường xuyên",
      "Nhiều hộp thư email doanh nghiệp hoạt động song song",
      "Có không gian cho môi trường thử nghiệm (Staging)",
      "Khoảng dự phòng dồi dào, hoàn toàn hạn chế việc phải nâng cấp sớm"
    ],
    highlightNote: "Đầu tư một lần để có không gian vận hành và marketing thoải mái hơn.",
    colorScheme: {
      border: "border-brand-dark border-2",
      bg: "bg-brand-dark text-white",
      badgeBg: "bg-amber-400",
      badgeText: "text-brand-dark font-black",
      accent: "text-white"
    }
  }
];

export interface ComparisonCriterion {
  category: string;
  p3gb: string;
  p5gb: string;
  p10gb: string;
  p20gb: string;
}

export const COMPARISON_TABLE: ComparisonCriterion[] = [
  {
    category: "Website giới thiệu cơ bản",
    p3gb: "✓ Đủ dùng",
    p5gb: "✓ Rất tốt",
    p10gb: "✓ Hoàn hảo",
    p20gb: "✓ Hoàn hảo"
  },
  {
    category: "Số lượng trang tối đa",
    p3gb: "5–7 trang",
    p5gb: "10–15 trang",
    p10gb: "20–40 trang",
    p20gb: "Không giới hạn"
  },
  {
    category: "Viết bài tin tức & SEO",
    p3gb: "Thỉnh thoảng (Hạn chế)",
    p5gb: "1–2 bài/tháng",
    p10gb: "2–4 bài/tháng (Rất tốt)",
    p20gb: "Đăng thoải mái (SEO mạnh)"
  },
  {
    category: "Thư viện hình ảnh dự án",
    p3gb: "Ít (Cần nén kỹ)",
    p5gb: "Vừa phải",
    p10gb: "Phong phú",
    p20gb: "Rất lớn / Chất lượng cao"
  },
  {
    category: "Email doanh nghiệp theo domain",
    p3gb: "Hạn chế (Chỉ đọc)",
    p5gb: "1–2 email",
    p10gb: "3–5 email",
    p20gb: "Dùng thoải mái"
  },
  {
    category: "Khoảng dự phòng Cache & Backup",
    p3gb: "Ít (Dưới 10%)",
    p5gb: "Khoảng 15–20%",
    p10gb: "Khoảng 35–40%",
    p20gb: "Trên 50% (Rất an toàn)"
  },
  {
    category: "Khả năng phát triển 12–24 tháng",
    p3gb: "Cần nâng cấp sớm",
    p5gb: "Tùy lượng bài viết",
    p10gb: "✓ Đạt yêu cầu SEO MKS",
    p20gb: "✓ Thoải mái không lo nghẽn"
  },
  {
    category: "Định hướng phù hợp",
    p3gb: "Website tĩnh thông tin",
    p5gb: "Website doanh nghiệp nhỏ",
    p10gb: "Đề xuất cho Vận Tải MKS",
    p20gb: "Đầu tư Marketing tổng thể"
  }
];

export interface QuizQuestion {
  id: number;
  question: string;
  options: {
    label: string;
    points: number;
  }[];
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "1. Website Vận Tải MKS dự kiến sẽ có bao nhiêu trang nội dung?",
    options: [
      { label: "Dưới 10 trang (Trang chủ, Giới thiệu, Liên hệ, 2-3 Dịch vụ)", points: 1 },
      { label: "Từ 10 – 20 trang (Giới thiệu, Nhiều dịch vụ vận chuyển, Tuyến đường)", points: 2 },
      { label: "Trên 20 trang (Chi tiết từng đội xe, Tuyến hàng, Quy trình, Dự án)", points: 3 }
    ]
  },
  {
    id: 2,
    question: "2. Mỗi tháng kế hoạch đăng bao nhiêu bài viết tin tức & chuẩn SEO?",
    options: [
      { label: "Hầu như không đăng bài mới (Chỉ để thông tin cố định)", points: 0 },
      { label: "Đăng từ 1 – 2 bài/tháng (Cập nhật hoạt động công ty)", points: 1 },
      { label: "Đăng từ 3 – 4 bài/tháng (Chiến lược kéo khách từ Google SEO)", points: 2 },
      { label: "Trên 4 bài/tháng (Phát triển mạng lưới từ khóa ngành vận tải)", points: 3 }
    ]
  },
  {
    id: 3,
    question: "3. Tần suất tải lên hình ảnh xe tải, chuyến hàng & kho bãi thực tế?",
    options: [
      { label: "Dưới 20 ảnh/tháng (Chỉ dùng ảnh đại diện cơ bản)", points: 1 },
      { label: "Từ 20 – 50 ảnh/tháng (Cập nhật hình ảnh dự án thực tế)", points: 2 },
      { label: "Trên 50 ảnh/tháng (Kho thư viện ảnh chuyến hàng liên tục)", points: 3 }
    ]
  },
  {
    id: 4,
    question: "4. Công ty có nhu cầu sử dụng Email doanh nghiệp dạng email@vantaimks.vn không?",
    options: [
      { label: "Không sử dụng (Dùng Gmail riêng)", points: 0 },
      { label: "Có, khoảng 1 – 3 email chính (DieuHanh@, BaoGia@)", points: 1 },
      { label: "Có, trên 3 email cho các phòng ban & lái xe", points: 2 }
    ]
  },
  {
    id: 5,
    question: "5. Vận Tải MKS có kế hoạch làm Marketing & SEO từ 12 tháng trở lên không?",
    options: [
      { label: "Có, muốn duy trì và tăng trưởng lượt truy cập lâu dài", points: 2 },
      { label: "Chưa rõ, trước mắt chỉ làm website giới thiệu", points: 0 }
    ]
  },
  {
    id: 6,
    question: "6. Có cần môi trường chạy thử (Staging) để thử nghiệm tính năng mới không?",
    options: [
      { label: "Có, cần khoảng dự phòng an toàn", points: 2 },
      { label: "Không cần, chỉ chạy bản chính thức", points: 0 }
    ]
  }
];

export interface FAQItem {
  question: string;
  answer: string;
}

export const FAQ_LIST: FAQItem[] = [
  {
    question: "1. Website giới thiệu công ty vận tải có cần hosting dung lượng lớn không?",
    answer: "Nhu cầu dung lượng phụ thuộc vào định hướng sử dụng. Nếu website chỉ có 5-7 trang tĩnh và không cập nhật, dung lượng 3GB-5GB là đủ. Tuy nhiên, với công ty Vận Tải MKS, khi cập nhật hình ảnh đội xe, các chuyến hàng thực tế, hợp đồng mẫu và viết bài SEO thu hút khách hàng vận chuyển, dung lượng 10GB hoặc 20GB sẽ đảm bảo vận hành mượt mà trong 2-3 năm mà không bị ngắt gián đoạn."
  },
  {
    question: "2. Hosting 3GB có chạy được website Vận Tải MKS không?",
    answer: "Có, gói 3GB hoàn toàn chạy tốt website ban đầu. Tuy nhiên, nó sẽ hạn chế về khoảng dự phòng. Khi doanh nghiệp tải thêm 30-50 hình ảnh độ phân giải cao hoặc lưu trữ email báo giá, dung lượng sẽ nhanh chóng đạt mức 80-90%, buộc phải dọn dẹp hoặc nâng cấp sớm."
  },
  {
    question: "3. Vì sao viết bài chuẩn SEO lại tiêu tốn dung lượng hosting?",
    answer: "Một bài viết SEO chất lượng không chỉ có chữ mà còn bao gồm: ảnh đại diện, 3-5 ảnh minh họa thực tế, dữ liệu meta SEO, bản lưu nháp (revisions), và ảnh thumb tự động sinh ra cho màn hình di động. Càng nhiều bài viết, thư viện truyền tải càng phình to theo thời gian."
  },
  {
    question: "4. Điều gì xảy ra khi hosting bị tràn dung lượng (100% Full)?",
    answer: "Khi tràn dung lượng, website không thể ghi thêm dữ liệu mới. Lỗi thường gặp: không thể đăng bài mới, không thể tải ảnh, hệ thống gửi email bị kẹt, bộ nhớ đệm cache không hoạt động dẫn đến website load chậm hoặc xuất hiện lỗi 500 Internal Server Error. Đó là lý do Đức Duy Web luôn tư vấn duy trì khoảng dự phòng tối thiểu 30%."
  },
  {
    question: "5. Nếu chọn gói 5GB trước, sau này có nâng cấp lên 10GB hay 20GB được không?",
    answer: "Hoàn toàn nâng cấp dễ dàng! Đức Duy Web hỗ trợ nâng cấp gói hosting chỉ trong 5-10 phút mà không làm gián đoạn truy cập của khách hàng, dữ liệu được giữ nguyên 100%. Bạn chỉ cần thanh toán phần chênh lệch chi phí còn lại."
  },
  {
    question: "6. Mua gói hosting dung lượng lớn hơn (như 20GB) có làm website chạy nhanh hơn không?",
    answer: "Cần làm rõ: Số dung lượng GB lớn KHÔNG tự động làm website load nhanh hơn. Tốc độ website phụ thuộc vào cấu hình phần cứng (CPU, RAM, ổ cứng chuẩn NVMe tốc độ cao), công nghệ tối ưu mã nguồn, bộ nhớ đệm (Cache) và mạng CDN. Dung lượng GB lớn đóng vai trò cung cấp 'không gian kho' rộng rãi để chứa nhiều dữ liệu mà không bị chật chội."
  },
  {
    question: "7. Có nên lưu trực tiếp các video giới thiệu xe tải & kho bãi lên hosting không?",
    answer: "KHÔNG NÊN lưu trực tiếp file video (.mp4) lên hosting website. Một video HD có thể tốn từ 200MB - 1GB dung lượng và ngốn băng thông rất lớn khi nhiều người xem cùng lúc. Giải pháp chuẩn của Đức Duy Web: Đăng video lên kênh YouTube của Vận Tải MKS rồi nhúng vào website. Cách này hoàn toàn miễn phí dung lượng hosting và video chạy cực mượt!"
  },
  {
    question: "8. Email doanh nghiệp theo tên miền (@vantaimks.vn) có xài chung dung lượng hosting không?",
    answer: "Nếu sử dụng dịch vụ Email Hosting tích hợp sẵn trên gói web, tất cả email gửi/nhận kèm file hợp đồng, báo giá PDF sẽ dùng chung dung lượng với website. Do đó, nếu phòng điều hành gửi nhận nhiều email file nặng, lựa chọn gói 10GB hoặc 20GB là rất cần thiết."
  },
  {
    question: "9. Bao lâu nên kiểm tra tình trạng dung lượng hosting một lần?",
    answer: "Hệ thống quản trị do Đức Duy Web bàn giao có sẵn thanh đo dung lượng trực quan ngay tại dashboard. Quý khách chỉ cần kiểm tra 1-2 tháng/lần. Khi dung lượng chạm ngưỡng 75-80%, kỹ thuật viên của Đức Duy Web cũng sẽ tự động gửi cảnh báo tư vấn phương án tối ưu."
  },
  {
    question: "10. Tại sao khi chọn hosting không nên chỉ nhìn vào con số GB?",
    answer: "Con số GB chỉ là diện tích kho. Một gói hosting chất lượng cao cho doanh nghiệp vận tải như MKS cần đi kèm: Băng thông không giới hạn, Ổ cứng chuẩn NVMe U.2 siêu tốc, Chứng chỉ bảo mật SSL miễn phí, Bản sao lưu Backup tự động hàng tuần và Đội ngũ kỹ thuật hỗ trợ 24/7 khi gặp sự cố."
  }
];
