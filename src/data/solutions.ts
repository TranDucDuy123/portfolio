import { IndustrySolution } from "../types";

export const industrySolutions: IndustrySolution[] = [
  {
    id: "sol-quang-cao",
    slug: "quang-cao",
    title: "Giải pháp Website cho Ngành Quảng Cáo & Thi Công Bảng Hiệu",
    tagline: "Biến Website thành Showroom công trình trực tuyến và Hồ sơ năng lực đắt giá.",
    problems: [
      "Khách hàng chỉ chăm chăm so sánh giá rẻ vì không thấy được chất lượng hoàn thiện thực tế.",
      "Gặp khó khăn khi trình bày năng lực thiết kế thi công với đối tác lớn yêu cầu chuẩn chỉnh.",
      "Mất dấu và khó sắp xếp gọn gàng hàng trăm công trình bảng hiệu đã thi công theo năm tháng."
    ],
    benefits: [
      "Khẳng định vị thế chuyên nghiệp vượt trội của nhà thầu thi công quảng cáo uy tín.",
      "Tối ưu quy trình gửi hồ sơ năng lực đến khách hàng doanh nghiệp chỉ bằng 1 liên kết duy nhất.",
      "Xây dựng phễu khách hàng tự động từ nhu cầu tìm kiếm làm bảng hiệu địa phương trên Google."
    ],
    suggestedStructure: {
      name: "Cấu Trúc Web Ngành Quảng Cáo Gợi Ý",
      pages: [
        { name: "Trang Chủ", purpose: "Định vị thương hiệu, giới thiệu năng lực cốt lõi và các công trình nổi bật." },
        { name: "Danh Mục Dự Án", purpose: "Bộ lọc dự án thông minh theo loại bảng hiệu (LED, Alu, Chữ nổi, Mica) và ngành nghề (Shop, Spa, Nhà hàng)." },
        { name: "Chi Tiết Công Trình (Case Studies)", purpose: "Hình ảnh cận cảnh sắc nét, thông số vật tư sử dụng, và tiến độ hoàn thành thực tế." },
        { name: "Hệ Thống Dự Toán", purpose: "Bảng tính chi phí thi công nhẩm tính theo diện tích m2 và vật liệu để giữ chân khách hàng." }
      ]
    },
    features: [
      "Showroom dự án tương tác mượt mà không tải lại trang.",
      "Slider so sánh ảnh trước/sau sửa đổi mặt bằng thi công quảng cáo.",
      "Tính năng gửi yêu cầu báo giá đính kèm bản vẽ nháp.",
      "Tối ưu hóa hình ảnh di động siêu tốc."
    ],
    customerJourney: [
      "Tìm kiếm: Khách hàng tìm từ khóa 'thi công bảng hiệu spa uy tín'.",
      "Tiếp cận: Vào website đối tác Quảng cáo, ấn tượng bởi giao diện hiện đại.",
      "Xem năng lực: Click danh mục dự án, lọc xem 15 công trình spa sang trọng đã làm.",
      "Liên hệ: Nhấp nút báo giá sơ bộ và điền form, nhận cuộc gọi tư vấn chuẩn mực."
    ]
  },
  {
    id: "sol-da-hoa-cuong",
    slug: "da-hoa-cuong",
    title: "Giải pháp Website cho Ngành Đá Hoa Cương & Granite",
    tagline: "Thiết lập Catalog đá sang trọng, khẳng định gu thẩm mỹ tinh tế cho công trình cao cấp.",
    problems: [
      "Không trình bày được vẻ đẹp và chi tiết đường vân đá tự nhiên đắt giá qua tin nhắn thông thường.",
      "Cạnh tranh khốc liệt về giá với các đại lý bán lẻ đá bình dân chụp giật.",
      "Kho đá ở xa, khách hàng cao cấp ngại di chuyển xem mẫu thực tế."
    ],
    benefits: [
      "Xây dựng trải nghiệm xem catalog ảo sang trọng như tham quan showroom vật lý.",
      "Thu hút các đối tác thiết kế, Kiến trúc sư hợp tác khai thác mẫu đá.",
      "Định vị thương hiệu đá nhập khẩu xa xỉ, nâng tầm giá trị hợp đồng thi công biệt thự."
    ],
    suggestedStructure: {
      name: "Cấu Trúc Web Đá Hoa Cương Gợi Ý",
      pages: [
        { name: "Trang Chủ", purpose: "Banner lớn thể hiện các không gian biệt thự ốp đá hoa cương lộng lẫy, quyền quý." },
        { name: "Thư Viện Mẫu Đá (E-Catalog)", purpose: "Phân loại rõ ràng (Granite, Marble, Tranh đá đối xứng) kèm bộ lọc màu sắc, xuất xứ." },
        { name: "Bộ Sưu Tập Không Gian", purpose: "Hình ảnh thi công thực tế mặt bếp, cầu thang, mặt tiền biệt thự sang trọng." },
        { name: "Tư Vấn Phong Thủy", purpose: "Gợi ý chọn màu sắc đá hợp tuổi, mệnh của gia chủ tự động." }
      ]
    },
    features: [
      "Xem ảnh đá ở định dạng siêu nét phóng to (Ultra HD Texture).",
      "Tính năng phối cảnh 3D ảo đơn giản cho mặt bếp/phòng tắm.",
      "Form đăng ký gửi trực tiếp mẫu đá thực tế tận công trình cho chủ nhà."
    ],
    customerJourney: [
      "Lên ý tưởng: Chủ nhà muốn ốp đá marble nhập khẩu cho biệt thự nhưng băn khoăn về vân đá.",
      "Xem catalog: Khảo sát catalog online trên website xưởng đá, phóng to xem đường vân láng bóng cực kỳ sắc sảo.",
      "Chọn mẫu: Chọn được 3 mẫu ưng ý, bấm yêu cầu gửi mẫu đá thực tế.",
      "Thực thi: Nhân viên xưởng mang hộp mẫu đá thật đến gặp chủ nhà tư vấn trực tiếp và đo đạc."
    ]
  },
  {
    id: "sol-bida",
    slug: "bida",
    title: "Giải pháp Website cho Xưởng Sản Xuất & Setup Câu Lạc Bộ Bida",
    tagline: "Định vị chuyên gia setup CLB bida khởi nghiệp sinh lời bền vững.",
    problems: [
      "Khách đầu tư CLB bida mới chưa có kinh nghiệm tính toán bài toán tài chính, diện tích bố trí bàn.",
      "Xưởng sản xuất thô sơ khó thể hiện được quy trình kiểm định băng, mặt đá nhập đạt chuẩn thi đấu.",
      "Khó cạnh tranh thương hiệu với các đơn vị bàn ngoại nhập đắt đỏ."
    ],
    benefits: [
      "Thu hút các chủ CLB trẻ hiện đại nhờ cẩm nang tư vấn khởi nghiệp bida khoa học.",
      "Nâng tầm uy tín bàn bida sản xuất nội địa chất lượng cao đạt chuẩn thi đấu quốc tế.",
      "Quản lý và phô diễn hệ thống câu lạc bộ đối tác đã setup thành công trên cả nước."
    ],
    suggestedStructure: {
      name: "Cấu Trúc Web Xưởng Bida Gợi Ý",
      pages: [
        { name: "Trang Chủ", purpose: "Khẳng định tầm vóc xưởng sản xuất, trưng bày các mẫu bàn bida bán chạy nhất." },
        { name: "Catalog Bàn Bida", purpose: "Chi tiết thông số kỹ thuật bàn lỗ, bàn carom, bàn snooker chuẩn thi đấu." },
        { name: "Gói Setup CLB Trọn Gói", purpose: "Bảng toán tài chính chi tiết cho các quy mô 6 bàn, 10 bàn, 15 bàn." },
        { name: "Cẩm Nang Vận Hành", purpose: "Các bài viết chia sẻ cách giữ gìn nỉ bàn, quản lý nhân viên, tổ chức giải đấu." }
      ]
    },
    features: [
      "Hệ thống ước lượng số bàn tối đa lắp được dựa trên chiều dài và chiều rộng mặt bằng.",
      "Form đăng ký nhận bản vẽ thiết kế mặt bằng CLB 2D miễn phí.",
      "Video kiểm định độ nảy băng cao su và độ mượt của vải nỉ tích hợp tinh tế."
    ],
    customerJourney: [
      "Tìm hiểu: Nhà đầu tư có mặt bằng 250m2, lên Google tìm 'mở quán bida cần chuẩn bị gì'.",
      "Đọc cẩm nang: Đọc bài viết hướng dẫn setup CLB của xưởng bida trên web, thấy chỉ dẫn cực kỳ tận tình.",
      "Tính toán diện tích: Sử dụng công cụ tính số bàn trên web biết mặt bằng của mình lắp được tối đa 8 bàn.",
      "Chốt đơn: Điền form đăng ký nhận layout 2D bố trí bàn, tiến hành gặp gỡ chốt hợp đồng cung cấp trọn gói."
    ]
  },
  {
    id: "sol-thu-cung",
    slug: "thu-cung",
    title: "Giải pháp Website cho Chuỗi Cửa Hàng Thú Cưng & Spa Pet",
    tagline: "Hệ thống đặt lịch spa thông minh, tối ưu công suất kỹ thuật viên.",
    problems: [
      "Khách hàng gọi điện đặt lịch spa hay bị trùng giờ, sót lịch gây phiền hà.",
      "Bảng giá dịch vụ mập mờ theo cân nặng khiến khách hàng nghi ngờ phát sinh phụ phí.",
      "Không lưu lại được lịch sử chăm sóc và hồ sơ sức khỏe của thú cưng để phục vụ chu đáo."
    ],
    benefits: [
      "Khách đặt lịch tự động 24/7 không cần nhân viên trực điện thoại.",
      "Bảng giá dịch vụ rõ ràng, chuyên nghiệp tạo dựng lòng tin tuyệt đối.",
      "Lưu trữ hồ sơ sức khỏe (Pet Health Profile) số hóa để tăng tỷ lệ quay lại của khách hàng."
    ],
    suggestedStructure: {
      name: "Cấu Trúc Web Thú Cưng Gợi Ý",
      pages: [
        { name: "Trang Chủ", purpose: "Nút Đặt lịch Spa nổi bật, giới thiệu quy trình chăm sóc nâng niu thú cưng." },
        { name: "Đặt Lịch Trực Tuyến", purpose: "Giao diện chọn loài (chó/mèo), cân nặng, dịch vụ, ngày giờ còn trống và xác nhận." },
        { name: "E-Shop Thức Ăn & Phụ Kiện", purpose: "Trưng bày các dòng hạt dinh dưỡng cao cấp, sữa tắm chăm sóc lông pet chính hãng." },
        { name: "Cẩm Nang Nuôi Pet", purpose: "Hướng dẫn huấn luyện pet, dinh dưỡng khoa học và các dấu hiệu bệnh cần lưu ý." }
      ]
    },
    features: [
      "Real-time Booking Engine đồng bộ lịch trống.",
      "Công cụ tự động tính giá tắm sấy theo cân nặng.",
      "Tích hợp tin nhắn Zalo/SMS thông báo nhắc lịch hẹn tự động cho chủ nuôi."
    ],
    customerJourney: [
      "Nhìn thấy pet bẩn: Khách hàng thấy cún cưng có mùi hôi, muốn đặt lịch tắm sấy tối nay sau giờ làm.",
      "Đặt lịch: Lướt điện thoại vào web cửa hàng pet, thấy khung giờ 19:00 còn trống, bấm đặt lịch trong 30 giây.",
      "SMS nhắc hẹn: Nhận tin nhắn xác nhận lịch đặt thành công.",
      "Hoàn thành: Mang cún đến làm đẹp đúng giờ, không phải chờ đợi mệt mỏi, hài lòng đánh giá 5 sao."
    ]
  },
  {
    id: "sol-noi-that",
    slug: "noi-that",
    title: "Giải pháp Website cho Công Ty Thiết Kế & Thi Công Nội Thất",
    tagline: "Showroom Bắc Âu tối giản tôn vinh từng chi tiết sắc nét của công trình hoàn thiện.",
    problems: [
      "Khách hàng không tin tưởng xưởng thi công thực tế giống bản vẽ phối cảnh 3D.",
      "Khách hàng mơ hồ về dự toán ngân sách, lo ngại phát sinh chi phí lớn khi thi công trọn gói.",
      "Website cũ tải ảnh công trình quá chậm làm tuột cảm xúc của khách hàng cao cấp."
    ],
    benefits: [
      "Gia tăng tỷ lệ chuyển đổi khách hàng nhờ sự chuyên nghiệp của Portfolio hình ảnh sắc nét tải siêu tốc.",
      "Khách hàng tự ước lượng ngân sách phù hợp trước khi làm việc trực tiếp với KTS.",
      "Khẳng định chất lượng thi công gỗ công nghiệp chuẩn An Cường chính hãng bằng tài liệu cam kết rõ ràng."
    ],
    suggestedStructure: {
      name: "Cấu Trúc Web Nội Thất Gợi Ý",
      pages: [
        { name: "Trang Chủ", purpose: "Giới thiệu video căn hộ thực tế sau bàn giao, nhấn mạnh độ sắc sảo trong thi công gỗ." },
        { name: "Thư Viện Portfolio", purpose: "Phân loại dự án theo Phong cách (Japandi, Indochine, Modern) và loại hình (Căn hộ, Biệt thự)." },
        { name: "Dự Toán Nội Thất Tự Động", purpose: "Bảng tính chi phí thi công gỗ theo diện tích và số phòng ngủ cực kỳ tiện lợi." },
        { name: "Quy Trình 6 Bước", purpose: "Minh bạch hóa các bước từ khảo sát, thiết kế 2D/3D đến sản xuất tại xưởng và bảo hành." }
      ]
    },
    features: [
      "Thanh trượt kéo kéo so sánh Thiết kế 3D vs Thực tế thi công tỷ lệ 1:1.",
      "Tính toán chi phí nội thất tự động trong 10 giây.",
      "Lazy-loading tối ưu hóa hình ảnh Portfolio chất lượng cao không làm chậm tốc độ load web."
    ],
    customerJourney: [
      "Nhận căn hộ: Vợ chồng mới mua căn hộ 2 phòng ngủ, muốn tìm đơn vị thiết kế nội thất uy tín.",
      "Khảo sát web: Vào web công ty nội thất, xem 20 dự án 3D vs Thực tế giống nhau như đúc.",
      "Tính ngân sách: Sử dụng công cụ dự toán tự động biết chi phí tầm 180 triệu, khớp ngân sách của mình.",
      "Đặt lịch: Điền form yêu cầu KTS liên hệ trực tiếp tư vấn mặt bằng 2D miễn phí."
    ]
  }
];
