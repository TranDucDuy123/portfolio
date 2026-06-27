import { Link } from "react-router-dom";
import { ArrowRight, Star, GraduationCap, Code, Compass, Award, Calendar } from "lucide-react";
import Meta from "../components/Meta";

export default function About() {
  const timeline = [
    {
      year: "2018 - 2020",
      title: "Kỹ sư Phát triển Phần mềm (Fullstack Developer)",
      description: "Lập trình viên chuyên sâu phát triển hệ thống Enterprise lớn, nắm vững cốt lõi kỹ thuật tối ưu hóa mã nguồn, kiến trúc cơ sở dữ liệu và bảo mật hạ tầng."
    },
    {
      year: "2020 - 2022",
      title: "Chuyển mình sang Tư vấn Chiến lược số (SEO & Digital Strategist)",
      description: "Nhận thấy hàng nghìn doanh nghiệp làm web đẹp nhưng không có khách. Bắt đầu nghiên cứu chuyên sâu về hành vi tìm kiếm của Google (SEO) và tối ưu hóa tỷ lệ chuyển đổi (CRO)."
    },
    {
      year: "2022 - 2024",
      title: "Hình thành triết lý 'Website First' và 'Tài sản số'",
      description: "Xây dựng hàng loạt dự án cho các đơn vị thi công, quảng cáo, nội thất. Phát hiện ra rằng các kênh mạng xã hội đóng vai trò thu hút sự chú ý ngắn hạn tốt nhất khi dẫn dắt traffic trực tiếp về pháo đài trung tâm: Website sở hữu."
    },
    {
      year: "2025 - Nay",
      title: "Sáng lập Đức Duy Web - Digital Asset Hub",
      description: "Định vị là Cố vấn Tài sản số (Digital Asset Consultant) độc bản. Không chỉ làm code web đại trà, mà là thiết kế chiến lược tích lũy giá trị thương mại lâu dài cho chủ doanh nghiệp."
    }
  ];

  const philosophies = [
    {
      icon: Compass,
      title: "Sở hữu Tuyệt đối (Owned over Rented)",
      description: "Đừng dồn toàn bộ gia sản xây dựng lâu đài trên mảnh đất thuê (Facebook, TikTok) có thể bị thu hồi bất cứ lúc nào. Website là tài sản tối thượng do doanh nghiệp của bạn cắm mốc chủ quyền vĩnh viễn."
    },
    {
      icon: Code,
      title: "Mã nguồn Sạch & May đo Chuẩn SEO",
      description: "Nói KHÔNG với các mẫu giao diện kéo thả cũ kỹ hay cài đặt plugin bừa bãi làm sập hệ thống. Từng dòng code tại Đức Duy Web được lập trình tối ưu hóa giúp trang web tải nhẹ như bay, đạt điểm tuyệt đối trên thang đo tốc độ Google."
    },
    {
      icon: GraduationCap,
      title: "Đơn giản hóa Công nghệ (Simplify Tech)",
      description: "Chúng tôi biến những thuật ngữ khô khan (Domain, Hosting, DNS, Schema) thành các ví dụ đời thực dung dị thông qua nội dung 'Cafe Số'. Doanh nghiệp cần hiểu bản chất để làm chủ tài sản của mình."
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      <Meta
        title="Về Đức Duy - Digital Asset Consultant"
        description="Từ kỹ sư IT đến cố vấn tài sản số doanh nghiệp. Tìm hiểu hành trình phát triển, triết lý 'Website First' và tư duy kiến tạo giá trị dài hạn."
      />

      {/* Hero section */}
      <section className="bg-brand-light py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-[10px] font-mono font-black uppercase tracking-[0.25em] text-brand-primary">👤 CHÂN DUNG NGƯỜI ĐỒNG HÀNH</span>
            <h1 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-brand-dark mt-3 tracking-tight uppercase leading-tight">
              Đức Duy Web - Tư vấn xây dựng tài sản số doanh nghiệp
            </h1>
            <div className="w-16 h-1 bg-brand-primary mt-5"></div>
            <p className="mt-5 text-sm sm:text-base text-gray-600 leading-relaxed font-sans">
              Chào bạn, tôi là Đức Duy. Tôi không định vị mình là người thiết kế web dạo, tôi là đối tác tư vấn và lập trình kiến trúc tài sản số bền vững cho doanh nghiệp của bạn.
            </p>
          </div>
        </div>
      </section>
 
      {/* Narrative Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side text */}
            <div className="space-y-6">
              <h2 className="font-display font-black text-2xl sm:text-3xl text-brand-dark uppercase tracking-tight">
                Hành trình từ Kỹ sư IT đến Digital Consulting thực chiến
              </h2>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                Tốt nghiệp chuyên ngành Lập trình hệ thống, tôi đã có những năm tháng làm việc với các hệ thống phức tạp lớn. Tuy nhiên, khi quan sát các doanh nghiệp vừa và nhỏ Việt Nam loay hoay kinh doanh online, tôi nhận ra một lỗ hổng nghiêm trọng:
              </p>
              <div className="bg-brand-primary/5 border-l-4 border-brand-primary p-5 rounded-none">
                <p className="text-xs text-brand-dark font-medium italic leading-relaxed">
                  &ldquo;Doanh nghiệp làm web với giá vài ba triệu đồng, chạy chập chờn, không thể lên Top Google. Họ phó mặc số phận công ty cho Facebook Ads, TikTok Ads và rồi than thở quảng cáo ngày càng đắt đỏ, tài khoản quảng cáo hay bị khóa vô cớ.&rdquo;
                </p>
              </div>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                Tôi quyết định bước ra khỏi văn phòng lập trình thuần túy, kết hợp kiến thức kỹ thuật sâu với chiến lược SEO và tối ưu hóa tỷ lệ chuyển đổi. Tôi muốn tạo ra những Website thực sự hoạt động như những **cỗ máy hút khách và tích lũy dữ liệu** lâu dài cho doanh nghiệp.
              </p>
            </div>
 
            {/* Right side stats Card */}
            <div className="bg-brand-dark text-white p-8 rounded-sm relative overflow-hidden border border-gray-800 shadow-xs">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 rotate-45 transform translate-x-16 -translate-y-16 border-l border-b border-brand-primary/10"></div>
              <h3 className="font-display font-black text-lg mb-6 uppercase tracking-wider border-b border-gray-800 pb-3">Thành tựu & Chỉ số thực tế</h3>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-sm bg-brand-primary/20 flex items-center justify-center text-brand-accent border border-brand-primary/30 flex-shrink-0">
                    <Star className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm sm:text-base font-bold uppercase tracking-wider">6+ Năm kinh nghiệm</p>
                    <p className="text-xs text-gray-400 mt-0.5">Triển khai & tối ưu hóa hệ thống Web, SEO</p>
                  </div>
                </div>
 
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-sm bg-brand-primary/20 flex items-center justify-center text-brand-accent border border-brand-primary/30 flex-shrink-0">
                    <Award className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm sm:text-base font-bold uppercase tracking-wider">50+ Dự án bàn giao</p>
                    <p className="text-xs text-gray-400 mt-0.5">Thi công quảng cáo, xưởng đá, bida, nội thất, spa pet</p>
                  </div>
                </div>
 
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-sm bg-brand-primary/20 flex items-center justify-center text-brand-accent border border-brand-primary/30 flex-shrink-0">
                    <Compass className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm sm:text-base font-bold uppercase tracking-wider">Triết lý Website First</p>
                    <p className="text-xs text-gray-400 mt-0.5">Dịch chuyển traffic mạng xã hội về đất thổ cư của riêng bạn</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
 
      {/* Philosophy Section */}
      <section className="py-20 bg-brand-light border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[10px] font-mono font-black uppercase tracking-[0.25em] text-brand-primary">🎯 NGUYÊN TẮC HOẠT ĐỘNG</span>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-brand-dark mt-2 uppercase tracking-tight">
              Triết lý & Tư duy Tài sản số của Đức Duy Web
            </h2>
            <div className="w-16 h-1 bg-brand-primary mx-auto mt-4"></div>
            <p className="mt-4 text-gray-600 text-sm">
              Chúng tôi không chỉ viết code bán web lấy tiền một lần. Chúng tôi đồng hành xây dựng giải pháp lâu dài.
            </p>
          </div>
 
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {philosophies.map((p, idx) => {
              const IconComp = p.icon;
              return (
                <div key={idx} className="bg-white p-6 rounded-sm border border-gray-200 shadow-xs hover:border-brand-primary/30 transition-all">
                  <div className="w-10 h-10 rounded-sm bg-brand-primary/10 text-brand-primary flex items-center justify-center mb-4 border border-brand-primary/10">
                    <IconComp className="h-5 w-5" />
                  </div>
                  <h3 className="font-display font-black text-sm text-brand-dark mb-2 uppercase tracking-tight">{p.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed font-sans">{p.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
 
      {/* Timeline Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto mb-16 text-center">
            <h2 className="font-display font-black text-2xl sm:text-3xl text-brand-dark uppercase tracking-tight">Timeline Phát Triển Phương Pháp Luận</h2>
            <div className="w-16 h-1 bg-brand-primary mx-auto mt-4"></div>
            <p className="mt-3 text-gray-600 text-sm">Quá trình tích lũy kinh nghiệm thực chiến đúc rút thành triết lý cố vấn hiện tại.</p>
          </div>
 
          <div className="max-w-3xl mx-auto relative border-l-2 border-gray-200 pl-6 sm:pl-8 space-y-10 py-4">
            {timeline.map((item, idx) => (
              <div key={idx} className="relative group">
                {/* Timeline node */}
                <div className="absolute -left-[35px] sm:-left-[41px] top-1.5 w-6 h-6 rounded-sm bg-white border-2 border-brand-primary flex items-center justify-center group-hover:bg-brand-primary transition-colors">
                  <Calendar className="h-3.5 w-3.5 text-brand-primary group-hover:text-white" />
                </div>
                
                {/* Timeline content */}
                <div>
                  <span className="font-mono text-[10px] font-bold text-brand-secondary bg-brand-secondary/5 border border-brand-secondary/20 px-3 py-1 rounded-sm uppercase tracking-wider">
                    {item.year}
                  </span>
                  <h3 className="font-display font-black text-base text-brand-dark mt-3 uppercase tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
 
      {/* Consultation Call to Action */}
      <section className="bg-brand-primary py-20 text-white text-center border-b border-brand-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight">Bạn có muốn sở hữu những Tài sản số thực sự mang lại doanh thu?</h2>
          <p className="mt-4 text-xs sm:text-sm text-brand-light/90 max-w-xl mx-auto leading-relaxed">
            Hãy liên hệ với tôi ngay hôm nay để nhận một buổi đánh giá kiểm tra (Audit) Website và tư vấn lộ trình xây dựng tài sản số hoàn toàn miễn phí.
          </p>
          <div className="mt-10">
            <Link
              to="/connect"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-sm text-xs font-bold uppercase tracking-widest text-brand-dark bg-white hover:bg-brand-accent transition-colors shadow-sm"
              style={{ minHeight: "44px" }}
            >
              Đặt lịch tư vấn với Đức Duy
              <ArrowRight className="ml-2 h-4 w-4 text-brand-primary" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
