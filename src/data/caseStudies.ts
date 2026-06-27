import { CaseStudyProposal } from "../types";

export const caseStudies: CaseStudyProposal[] = [
  {
    id: "cs-quang-cao",
    slug: "quang-cao",
    title: "Giải pháp tài sản số tối ưu cho Công ty Quảng cáo & Thi công bảng hiệu",
    industry: "Quảng cáo & Tổ chức sự kiện",
    background: "Công ty thiết kế thi công quảng cáo truyền thống có quy mô 15-20 nhân sự, chủ yếu nhận khách hàng qua quen biết hoặc chạy quảng cáo Facebook cá nhân lẻ tẻ. Khách hàng doanh nghiệp lớn thường yêu cầu hồ sơ năng lực (profile) chuẩn chỉnh nhưng công ty chưa có cách trình bày thuyết phục.",
    problems: [
      "Khách hàng chỉ hỏi giá rẻ rồi bỏ đi vì không thấy được chất lượng thi công thực tế.",
      "Không lưu trữ và trình bày được các công trình bảng hiệu lớn đã hoàn thành một cách ngăn nắp.",
      "Hồ sơ năng lực (Company Profile) bản PDF gửi qua Zalo hay bị trôi mất hoặc quá nặng khó tải.",
      "Bị động nguồn khách hàng, phụ thuộc hoàn toàn vào mối quan hệ cá nhân của giám đốc."
    ],
    analysis: "Ngành quảng cáo bán sản phẩm trực quan (bảng hiệu LED, mặt dựng Alu, hộp đèn). Người mua là chủ shop, chủ nhà hàng cần thấy 'bằng chứng năng lực' thi công sắc nét, bền đẹp chứ không chỉ nghe báo giá suông. Hơn nữa họ muốn tìm một nhà thầu uy tín có pháp lý rõ ràng.",
    opportunities: [
      "Đón đầu lưu lượng tìm kiếm từ Google cực lớn cho các từ khóa dạng 'thi công bảng hiệu quận [x]', 'làm hộp đèn quảng cáo đẹp'.",
      "Xây dựng Website đóng vai trò như một Showroom trực tuyến hiển thị hàng trăm dự án thực tế sắc nét."
    ],
    suggestedStructure: {
      title: "Hệ thống Website Multi-Category cho Công ty Quảng cáo",
      description: "Tập trung sâu vào việc hiển thị dự án thực tế (Portfolio) kèm bộ lọc theo chất liệu (Alu, Mica, LED, bạt Hiflex) và loại công trình (Shop thời trang, Nhà hàng, Spa, Văn phòng).",
      sections: [
        "Trang chủ: Định vị năng lực, cam kết tiến độ và chất lượng bảo hành.",
        "Trang giới thiệu: Đội ngũ thi công chuyên nghiệp, nhà xưởng máy móc hiện đại.",
        "Trang danh mục dự án: Bộ lọc thông minh theo chất liệu & ngành nghề của khách hàng.",
        "Trang chi tiết dự án (Case Study): Hình ảnh trước/sau thi công, chất liệu sử dụng, thời gian hoàn thành.",
        "Trang báo giá tự động: Biểu mẫu nhập kích thước để ước lượng chi phí sơ bộ, thu hút khách hàng điền form."
      ]
    },
    businessWorkflow: "Khách hàng truy cập web -> Xem danh mục dự án tương đồng ngành nghề -> Thử tính năng báo giá sơ bộ -> Điền thông tin kích thước -> Nhân viên nhận lead tự động gọi điện tư vấn chi tiết -> Khảo sát mặt bằng thực tế -> Ký hợp đồng.",
    customerJourney: [
      "Nhận thức: Khách hàng mở shop quần áo mới, lên Google gõ 'thi công bảng hiệu shop thời trang tphcm'.",
      "Cân nhắc: Click vào Đức Duy Web đề xuất cho đối tác quảng cáo, thấy showroom 50 dự án shop thời trang đã làm cực kỳ sắc nét.",
      "Quyết định: Thấy biểu mẫu tính giá sơ bộ tiện lợi, điền thông tin và đặt lịch khảo sát miễn phí."
    ],
    digitalAssetStrategy: "Biến Website thành Hồ sơ năng lực số (Digital Company Profile). Khi gửi báo giá cho đối tác, chỉ cần gửi link dự án cụ thể. Tích hợp Google Map để hiển thị vị trí văn phòng/xưởng thi công, tạo dựng niềm tin tuyệt đối.",
    suggestedFeatures: [
      "Bộ lọc dự án real-time (Isotope/Filter).",
      "Công cụ tự động ước tính chi phí thi công theo m2.",
      "Hình ảnh so sánh kéo trước/sau (Before-After Image Slider) cho các công trình sửa đổi mặt tiền.",
      "Nút liên hệ nhanh qua Zalo và Hotline hiển thị đẹp mắt ở góc màn hình."
    ],
    expectedResults: [
      "Tăng 150% tỷ lệ chốt hợp đồng khi gửi link hồ sơ trực tuyến thay vì gửi file PDF nặng nề.",
      "Tiếp cận 30-50 khách hàng mới tự nhiên hàng tháng từ nguồn tìm kiếm tự nhiên của Google (SEO).",
      "Khách hàng sẵn sàng trả giá cao hơn 15-20% vì nhìn thấy sự chuyên nghiệp vượt trội của website."
    ]
  },
  {
    id: "cs-da-hoa-cuong",
    slug: "da-hoa-cuong",
    title: "Giải pháp tài sản số tối ưu cho Doanh nghiệp Đá hoa cương & Granite",
    industry: "Vật liệu xây dựng & Thi công hoàn thiện",
    background: "Kho đá hoa cương quy mô lớn tại các vùng ngoại thành hoặc khu công nghiệp. Sở hữu hàng nghìn mẫu đá nhập khẩu cao cấp (Granite, Marble, Quartz) nhưng chỉ trưng bày được ở kho vật lý. Khách hàng ở nội thành ngại đi xa xem mẫu.",
    problems: [
      "Khách hàng không thể phân biệt được các loại đá và vân đá nếu chỉ nhìn hình ảnh chụp qua điện thoại gửi qua Zalo.",
      "Khách hàng cao cấp (chủ biệt thự, penthouse) yêu cầu tính thẩm mỹ cực cao nhưng giao diện trình bày năng lực hiện tại của xưởng quá đơn sơ.",
      "Cạnh tranh khốc liệt về giá với các cơ sở nhỏ lẻ làm ăn chụp giật."
    ],
    analysis: "Khách hàng mua đá hoa cương biệt thự quan tâm đến nguồn gốc xuất xứ, độ bóng, độ dày và tay nghề bo góc cạnh của thợ thi công. Website cần thể hiện được tính xa xỉ, cao cấp của vật liệu đá tự nhiên và độ tỉ mỉ trong khâu lắp đặt.",
    opportunities: [
      "Xây dựng thư viện mẫu đá chất lượng cao (E-Catalog) có phân loại rõ ràng theo màu sắc, phong thủy, xuất xứ (Ý, Brazil, Ấn Độ).",
      "Tối ưu SEO từ khóa ngách như 'đá marble lát nền biệt thự', 'đá granite cầu thang cao cấp'."
    ],
    suggestedStructure: {
      title: "Hệ thống Website Catalog Sản phẩm Cao cấp kết hợp Trải nghiệm Thực tế",
      description: "Giao diện tối giản mang tone màu trầm tối sang trọng, làm nổi bật đường vân của các mẫu đá hoa cương đắt giá.",
      sections: [
        "Trang chủ: Banner toàn màn hình hiển thị các biệt thự ốp đá hoa cương lộng lẫy.",
        "E-Catalog Đá: Phân loại theo dòng đá (Granite, Marble, Nhân tạo) kèm thông số chi tiết (độ dày, độ cứng, ứng dụng tốt nhất).",
        "Bộ sưu tập công trình: Tập trung vào các hạng mục mặt tiền, cầu thang, bàn bếp, tranh đá phòng khách.",
        "Bảng tra cứu phong thủy: Nhập mệnh/tuổi để gợi ý màu sắc đá phù hợp, gia tăng tương tác khách hàng."
      ]
    },
    businessWorkflow: "Chủ nhà/KTS truy cập web -> Tìm kiếm mẫu đá theo màu sắc hoặc phong thủy -> Xem hình ảnh thực tế công trình đã thi công loại đá đó -> Đăng ký nhận mẫu đá cắt sẵn gửi tận nhà miễn phí -> Chốt đơn thi công.",
    customerJourney: [
      "Nhận thức: Chủ nhà đang hoàn thiện biệt thự quận 2, muốn tìm tranh đá tự nhiên ốp vách tivi phòng khách.",
      "Cân nhắc: Lướt web thấy thư viện tranh đá marble cẩm thạch Ý sang trọng kèm hướng dẫn thi công bảo dưỡng kỹ lưỡng.",
      "Quyết định: Gửi form đăng ký tư vấn phong thủy chọn đá trực tiếp, nhận cuộc gọi từ chuyên gia của xưởng đá."
    ],
    digitalAssetStrategy: "Biến website thành công cụ hỗ trợ cho các Kiến trúc sư (KTS) và nhà thầu thiết kế. Khi KTS cần lấy mẫu đá phối cảnh, họ sẽ vào website của bạn tải ảnh chất lượng cao. Từ đó xưởng đá trở thành nhà cung cấp ưu tiên hàng đầu.",
    suggestedFeatures: [
      "Thư viện hình ảnh độ phân giải siêu cao (HD Texture Library) cho phép phóng to xem rõ từng đường vân đá.",
      "Tính năng phối màu đá ảo (Visualizer) lên không gian phòng bếp/phòng tắm 3D đơn giản.",
      "Form đăng ký 'Nhận hộp mẫu đá thực tế tận công trình'."
    ],
    expectedResults: [
      "Xây dựng mối quan hệ hợp tác tự động với 20+ kiến trúc sư mỗi quý nhờ thư viện vân đá tiện ích.",
      "Tăng giá trị trung bình của mỗi đơn hàng thi công biệt thự từ vài chục triệu lên hàng trăm triệu đồng.",
      "Giảm 80% thời gian nhân viên phải gửi ảnh mẫu đá lặp đi lặp lại qua Zalo."
    ]
  },
  {
    id: "cs-bida",
    slug: "bida",
    title: "Giải pháp tài sản số tối ưu cho Hệ thống Câu lạc bộ & Xưởng đóng Bàn Bida",
    industry: "Thể thao & Giải trí",
    background: "Cơ sở sản xuất và phân phối bàn bida lâu đời có tay nghề cơ khí cao nhưng gặp khó khăn khi tiếp cận tệp khách hàng mở câu lạc bộ (CLB) bida mới trên toàn quốc. Các chủ CLB trẻ hiện nay chỉ tìm kiếm đơn vị setup trọn gói chuyên nghiệp trực tuyến.",
    problems: [
      "Chủ CLB bida mới mở không biết cần chuẩn bị bao nhiêu vốn, diện tích tối thiểu bao nhiêu để setup một câu lạc bộ.",
      "Hình ảnh xưởng sản xuất thực tế lộn xộn, không phản ánh được quy trình kiểm định băng bida, độ phẳng đá nghiêm ngặt.",
      "Khách mua bàn bida lẻ gia đình không biết chọn kích thước bàn thế nào cho vừa phòng."
    ],
    analysis: "Đầu tư CLB bida là đầu tư kinh doanh thu hồi vốn. Chủ CLB cần tính toán bài toán tài chính chi tiết, cần một đối tác có khả năng cung ứng bàn chất lượng ổn định, bảo trì dài hạn và hỗ trợ setup trọn gói từ bảng hiệu, ánh sáng đến phần mềm quản lý.",
    opportunities: [
      "Trở thành chuyên gia cố vấn setup CLB bida hàng đầu thông qua các bài viết phân tích bài toán kinh doanh.",
      "Tạo dựng uy tín thương hiệu sản xuất bàn bida chính hãng nội địa đạt tiêu chuẩn thi đấu quốc tế."
    ],
    suggestedStructure: {
      title: "Hệ thống Web Tư vấn Setup & Catalog Bàn Bida Chuyên nghiệp",
      description: "Sự kết hợp giữa Landing Page bán bàn bida đơn lẻ và Content Hub chia sẻ kinh nghiệm vận hành câu lạc bộ bida sinh lời.",
      sections: [
        "Trang chủ: Trưng bày các mẫu bàn bida thiết kế mới nhất (Bàn lỗ, Bàn carom, Bàn snooker) đạt tiêu chuẩn thi đấu.",
        "Gói giải pháp Setup CLB: Gói 6 bàn, 10 bàn, 15 bàn kèm bảng dự toán chi phí chi tiết từ A-Z.",
        "Thư viện Khách hàng: Bản đồ hiển thị các CLB bida trên toàn quốc đã được xưởng setup thành công.",
        "Cẩm nang Bida: Hướng dẫn bảo quản nỉ bàn bida, cách chọn cơ bida, cách vận hành giải đấu kích cầu doanh thu."
      ]
    },
    businessWorkflow: "Chủ CLB tương lai tìm kiếm cẩm nang mở quán bida -> Đọc bài phân tích tài chính -> Tải bảng dự toán chi tiết -> Đăng ký nhận bản vẽ thiết kế mặt bằng 2D miễn phí -> Gặp gỡ chốt hợp đồng cung ứng 10-20 bàn bida.",
    customerJourney: [
      "Nhận thức: Nhà đầu tư ở Bình Dương muốn mở CLB bida 300m2 nhưng chưa biết bố trí được bao nhiêu bàn.",
      "Cân nhắc: Đọc bài viết hướng dẫn tính khoảng cách giữa các bàn bida trên web của xưởng, thấy cực kỳ chi tiết và khoa học.",
      "Quyết định: Nhấp vào nút 'Yêu cầu lên bản vẽ bố trí bàn miễn phí', cung cấp kích thước phòng và được hỗ trợ tức thì."
    ],
    digitalAssetStrategy: "Định vị xưởng bida là nhà đồng hành khởi nghiệp chứ không chỉ bán bàn thô. Xây dựng thương hiệu bàn bida chuẩn thi đấu thông qua các video kiểm chứng độ nảy băng cao su, độ phẳng mặt đá bùn gốc Hàn Quốc trên website.",
    suggestedFeatures: [
      "Công cụ tự động tính toán số lượng bàn tối đa lắp được dựa trên chiều dài và chiều rộng mặt bằng.",
      "Bảng so sánh thông số kỹ thuật chi tiết giữa bàn nhập khẩu và bàn sản xuất trong nước.",
      "Form đăng ký tư vấn nhượng quyền hoặc setup CLB trọn gói giảm giá 10% phụ kiện."
    ],
    expectedResults: [
      "Hút 10-15 dự án setup CLB bida quy mô lớn (>8 bàn) mỗi tháng trên toàn quốc.",
      "Xây dựng tệp data khách hàng chủ CLB bida chất lượng để cung ứng dịch vụ thay nỉ, thay cơ định kỳ hàng năm.",
      "Thương hiệu bàn bida nội địa được phủ sóng rộng rãi, khẳng định vị thế cạnh tranh sòng phẳng với bàn ngoại nhập."
    ]
  },
  {
    id: "cs-thu-cung",
    slug: "thu-cung",
    title: "Giải pháp tài sản số tối ưu cho Chuỗi Cửa hàng Thú cưng & Dịch vụ Spa Pet",
    industry: "Chăm sóc sức khỏe & Dịch vụ thú cưng",
    background: "Hệ thống Pet Shop kết hợp dịch vụ Spa, khách sạn thú cưng cao cấp tại khu đô thị sầm uất. Đã có lượng khách quen tại chỗ nhưng gặp khó khăn khi mở rộng tệp khách hàng đặt lịch dịch vụ trực tuyến. Việc quản lý lịch hẹn qua Zalo hay bị chồng chéo, sót lịch.",
    problems: [
      "Khách hàng gọi điện đặt lịch spa nhưng đến nơi vẫn phải chờ đợi do trùng giờ hẹn với người khác.",
      "Không trình bày được bảng giá rõ ràng cho từng cân nặng và chủng loại chó/mèo (Poodle, Corgi, mèo Anh lông ngắn).",
      "Khách hàng lo lắng về tay nghề nhân viên tắm sấy, sợ thú cưng bị stress hoặc chấn thương."
    ],
    analysis: "Người nuôi thú cưng cực kỳ yêu thương vật nuôi của họ và sẵn sàng chi tiền triệu nếu cảm thấy an tâm. Họ cần một hệ thống đặt lịch minh bạch, xem trước hình ảnh cơ sở vật chất khách sạn thú cưng sạch sẽ, và thấy được quy trình làm việc nhẹ nhàng, yêu động vật của đội ngũ kỹ thuật viên.",
    opportunities: [
      "Xây dựng công cụ đặt lịch spa thông minh trực tuyến giúp tối ưu công suất hoạt động của nhân viên.",
      "Xây dựng chuyên trang kiến thức chăm sóc dinh dưỡng cho thú cưng để làm phễu SEO cực tốt."
    ],
    suggestedStructure: {
      title: "Hệ thống Portal Đặt lịch Dịch vụ & E-Commerce Pet Shop Tích hợp",
      description: "Giao diện màu sắc tươi sáng, năng động, tối ưu tuyệt đối trên thiết bị di động vì 95% khách nuôi pet dùng điện thoại đặt lịch.",
      sections: [
        "Trang chủ: Nút Đặt lịch Spa nổi bật nhất, cam kết quy trình nâng niu thú cưng 5 sao.",
        "Hệ thống Đặt lịch Spa/Hotel: Khách chọn dịch vụ -> Chọn cân nặng pet -> Chọn ngày & khung giờ còn trống -> Xác nhận nhận SMS/Zalo.",
        "Bảng giá dịch vụ minh bạch: Không phát sinh phụ phí ngoài báo giá.",
        "Cửa hàng trực tuyến: Bán các dòng thức ăn hạt hữu cơ, sữa tắm chuyên dụng, cát vệ sinh cao cấp."
      ]
    },
    businessWorkflow: "Khách hàng truy cập điện thoại -> Click đặt lịch -> Chọn dịch vụ cắt tỉa lông -> Chọn giờ 14:00 chủ nhật -> Hệ thống tự động khóa khung giờ đó và gửi thông báo xác nhận -> Khách mang pet đến đúng giờ -> Trải nghiệm dịch vụ nhanh chóng -> Thanh toán và tích điểm số điện thoại.",
    customerJourney: [
      "Nhận thức: Cuối tuần chủ nuôi thấy bé Poodle lông quá dài và bẩn, muốn tìm tiệm spa cắt tỉa lông đẹp gần nhà.",
      "Cân nhắc: Tìm thấy web Đức Duy Web giới thiệu cho đối tác Pet Spa, giao diện dễ thương, có bảng giá chi tiết theo cân nặng, hình ảnh tiệm cực kỳ sạch sẽ hiện đại.",
      "Quyết định: Bấm đặt lịch trong vòng 30 giây, không cần gọi điện thoại chờ đợi, nhận được tin nhắn xác nhận giữ chỗ."
    ],
    digitalAssetStrategy: "Website là trung tâm quản lý lịch hẹn và lưu trữ hồ sơ sức khỏe của thú cưng (Pet Health Card). Mỗi bé pet đến spa sẽ có một mã số riêng để theo dõi lịch sử tắm sấy, cân nặng định kỳ. Khách hàng cảm nhận được sự chăm sóc cá nhân hóa cực cao và không bao giờ muốn chuyển sang tiệm khác.",
    suggestedFeatures: [
      "Hệ thống đặt lịch tự động theo thời gian thực (Real-time Booking Engine) đồng bộ với lịch làm việc của nhân viên.",
      "Bảng tính giá tự động dựa trên loài (chó/mèo) và cân nặng thực tế.",
      "Trang cá nhân của Khách hàng: Xem lịch sử dịch vụ và điểm thưởng tích lũy đổi quà."
    ],
    expectedResults: [
      "Giảm 95% tình trạng sót lịch hẹn hoặc trùng lịch gây bức xúc cho khách hàng.",
      "Tăng 40% doanh thu dịch vụ Spa nhờ tối ưu hóa giờ trống của kỹ thuật viên bằng ưu đãi giờ thấp điểm.",
      "Sở hữu tệp data khách hàng nuôi thú cưng trung thành để remarketing bán lẻ thức ăn, phụ kiện."
    ]
  },
  {
    id: "cs-noi-that",
    slug: "noi-that",
    title: "Giải pháp tài sản số tối ưu cho Công ty Thiết kế & Thi công Nội thất Trọn gói",
    industry: "Kiến trúc & Nội thất",
    background: "Văn phòng thiết kế nội thất tầm trung có gu thẩm mỹ tốt, xưởng sản xuất trực tiếp rộng 800m2. Chủ yếu làm thầu phụ hoặc nhận khách lẻ qua giới thiệu. Muốn nâng tầm thương hiệu để ký các hợp đồng thiết kế thi công trọn gói căn hộ cao cấp, nhà phố, biệt thự.",
    problems: [
      "Kiến trúc sư vẽ phối cảnh 3D rất đẹp nhưng xưởng thi công thực tế ra đồ gỗ bị lệch màu, lệch khớp khiến khách hàng thất vọng.",
      "Khách hàng không hình dung được chi phí thi công trọn gói gồm những hạng mục gì dẫn đến hoài nghi báo giá cao.",
      "Hình ảnh dự án hoàn thiện trên website cũ rất mờ, tải trang chậm khiến khách hàng lướt qua rồi thoát ngay."
    ],
    analysis: "Nội thất là ngành bán niềm tin và gu thẩm mỹ. Giá trị hợp đồng từ vài trăm triệu đến hàng tỷ đồng. Người mua nhà cần một đơn vị minh bạch về quy trình thi công, cam kết giống bản vẽ 3D tới 95%, vật liệu gỗ công nghiệp chính hãng (An Cường, Minh Long) có chứng nhận CO/CQ rõ ràng.",
    opportunities: [
      "Xây dựng showroom thực tế ảo hoặc thư viện ảnh dự án chất lượng siêu cao phân loại theo phong cách (Modern, Neo Classic, Japandi, Indochine).",
      "Tối ưu SEO bộ từ khóa vàng 'thiết kế nội thất căn hộ 2 phòng ngủ', 'thi công nội thất trọn gói biệt thự'."
    ],
    suggestedStructure: {
      title: "Hệ thống Website Interior Portfolio & Công cụ Dự toán Chi phí",
      description: "Giao diện mang phong cách tối giản Bắc Âu, sử dụng tone màu trung tính sang trọng, font chữ không chân tinh tế và khoảng trắng rộng lớn để tôn vinh từng góc chụp nội thất nghệ thuật.",
      sections: [
        "Trang chủ: Video quay cận cảnh căn hộ thực tế sau khi bàn giao, nhấn mạnh sự sắc nét trong từng chi tiết chỉ phào, mối nối gỗ.",
        "Showroom Dự án: Phân nhóm rõ ràng theo Phong cách thiết kế và Loại hình nhà ở (Căn hộ, Nhà phố, Biệt thự).",
        "Công cụ Dự toán thông minh: Nhập diện tích căn hộ, số phòng ngủ, phong cách yêu thích để nhận ngay báo giá ước lượng chi tiết trong 10 giây.",
        "Quy trình làm việc 6 bước: Minh bạch từ khảo sát, lên ý tưởng 2D/3D, sản xuất tại xưởng đến lắp đặt hoàn thiện và bàn giao.",
        "Trang Vật liệu & Cam kết: Trưng bày chứng nhận gỗ chống ẩm An Cường chính hãng, sơn không mùi an toàn sức khỏe."
      ]
    },
    businessWorkflow: "Khách hàng mua chung cư mới nhận bàn giao -> Vào web xem các căn hộ mẫu cùng layout căn hộ của mình -> Sử dụng bộ dự toán chi phí nhẩm tính ngân sách -> Đăng ký nhận tư vấn mặt bằng 2D miễn phí từ KTS trưởng -> Gặp trực tiếp tại showroom xem chất liệu gỗ -> Ký hợp đồng thi công."
    ,
    customerJourney: [
      "Nhận thức: Cặp vợ chồng trẻ mới nhận bàn giao căn hộ 75m2 Vinhomes Grand Park, muốn làm nội thất phong cách Japandi ấm cúng.",
      "Cân nhắc: Lướt website Đức Duy Web thiết kế cho đối tác nội thất, ngắm nhìn căn hộ mẫu Japandi tuyệt đẹp, zoom cận cảnh thấy đồ gỗ thi công cực kỳ chuẩn xác sắc nét.",
      "Quyết định: Sử dụng bảng dự toán tự động thấy chi phí khớp với ngân sách tích lũy, bấm nút đặt lịch hẹn KTS đo đạc thực tế tại căn hộ."
    ],
    digitalAssetStrategy: "Xây dựng website trở thành đại sứ thương hiệu 24/7. Tích hợp hệ thống Blog tư vấn thiết kế: cách bố trí bếp hợp phong thủy, cách chọn sofa cho phòng khách nhỏ để hút khách hàng tự nhiên từ Google (SEO). Biến website thành phễu lọc khách hàng có ngân sách phù hợp trước khi đưa sang bộ phận thiết kế tư vấn trực tiếp.",
    suggestedFeatures: [
      "Bộ lọc dự án theo mức ngân sách thi công (Dưới 150tr, 150-300tr, Trên 300tr) giúp định vị đúng khách hàng mục tiêu.",
      "Công cụ dự toán chi phí thi công gỗ nội thất tự động (Real-time Budget Calculator) cập nhật giá vật liệu mới nhất.",
      "Hệ thống Slide so sánh trực tiếp ảnh Thiết kế 3D và Ảnh chụp thực tế sau hoàn thiện tỉ lệ tương đồng 1:1."
    ],
    expectedResults: [
      "Gia tăng tỷ lệ chuyển đổi từ khách ghé thăm website thành khách hàng đăng ký tư vấn trực tiếp lên gấp 3 lần.",
      "Thu hút các hợp đồng thiết kế thi công trọn gói phân khúc cao cấp biệt thự, nhà phố có biên lợi nhuận cực tốt.",
      "Kênh SEO mang lại 40-60 lead đăng ký tư vấn nội thất chất lượng cao đều đặn mỗi tháng mà không cần phụ thuộc vào quảng cáo đắt đỏ."
    ]
  }
];
