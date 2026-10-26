import { Link } from "react-router-dom";
import { ArrowRight, Home, Lightbulb, Wrench, BookOpen, Code, Map, Server, FileText, Eye, MessageCircle } from "lucide-react";
import Meta from "../components/Meta";
import { socialConfig } from "../config/social";

export default function About() {
  const beliefs = [
    {
      icon: Home,
      title: "Website là đất thổ cư, mạng xã hội là đất thuê",
      description: "Facebook, TikTok rất tốt để người ta biết đến bạn. Nhưng thuật toán đổi, tài khoản bị khoá là công sức đi theo. Website và tên miền đứng tên chính bạn thì không ai lấy lại được."
    },
    {
      icon: Lightbulb,
      title: "Hiểu trước rồi mới chi tiền",
      description: "Chủ doanh nghiệp không cần biết code, nhưng nên biết tên miền đứng tên ai, hosting nằm ở đâu, vì sao web nhanh hay chậm. Hiểu đủ thì không bị hớ, cũng không bị phụ thuộc vào người làm web."
    },
    {
      icon: Wrench,
      title: "Làm xong web mới là bắt đầu",
      description: "Web đẹp mà không ai tìm thấy thì cũng như cửa hàng đóng cửa. Phần quan trọng là sau đó: nội dung, Google Maps, SEO, và đưa khách từ mạng xã hội về web."
    }
  ];

  const work = [
    { icon: BookOpen, title: "Viết kiến thức", description: "Giải thích web, SEO, tên miền, hosting bằng ví dụ đời thường trong Cafe Số và Blog." },
    { icon: Code, title: "Làm website & SEO", description: "Tự code website nhẹ, nhanh, chuẩn SEO, may theo cách khách hàng của từng ngành tìm và chọn." },
    { icon: Map, title: "Lên kế hoạch đa kênh", description: "Sắp xếp vai trò của web, Facebook, TikTok, Zalo, Google Maps để các kênh cùng dẫn khách về một nơi." },
    { icon: Server, title: "Tư vấn hạ tầng", description: "Chọn tên miền, hosting, email theo đúng nhu cầu, không mua thừa và không để rủi ro mất dữ liệu." }
  ];

  const industries = ["Mắt kính", "Phòng khám", "Xe điện", "Thời trang", "Coaching & đào tạo", "Vận tải"];

  const howIWork = [
    { icon: FileText, text: "Mỗi khách nhận một bản đề xuất riêng qua link: hiện trạng, hướng làm, chi phí và lộ trình, đọc trên điện thoại được." },
    { icon: Eye, text: "Nói rõ cái gì cần làm ngay, cái gì để sau, cái gì không cần làm, để tiền bỏ ra đúng chỗ." },
    { icon: MessageCircle, text: "Giải thích bằng lời dễ hiểu. Bạn hỏi lại bao nhiêu lần cũng được, cho đến khi tự quyết được." }
  ];

  return (
    <div className="bg-white min-h-screen">
      <Meta
        title="Về Đức Duy - người làm web kể chuyện web cho chủ doanh nghiệp"
        description="Mình là Đức Duy, người làm web. Mình viết kiến thức web dễ hiểu cho chủ doanh nghiệp và đồng hành làm website, SEO, kế hoạch đa kênh."
        slug="about"
      />

      {/* Hero */}
      <section className="bg-brand-light py-16 sm:py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10 items-center">
            <div className="max-w-3xl">
              <span className="text-[10px] font-mono font-black uppercase tracking-[0.25em] text-brand-primary">👋 VỀ DUY</span>
              <h1 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-brand-dark mt-3 tracking-tight uppercase leading-tight">
                Chào bạn, mình là Đức Duy
              </h1>
              <div className="w-16 h-1 bg-brand-primary mt-5"></div>
              <p className="mt-5 text-sm sm:text-base text-gray-600 leading-relaxed">
                Mình làm web, và mình thích giải thích chuyện web cho những người không làm web. Phần lớn người mình gặp là chủ doanh nghiệp nhỏ: giỏi nghề của họ, nhưng mỗi lần nghe tới tên miền, hosting, SEO là thấy mù mờ. Trang này để bạn biết mình là ai và mình làm việc thế nào.
              </p>
            </div>
            {/* Ảnh chân dung: khi có ảnh, đặt file vào public/images/duc-duy.jpg và thay khối chữ ĐD bằng thẻ img */}
            <div className="order-first md:order-none w-24 h-24 md:w-48 md:h-48 rounded-full bg-brand-dark text-white flex items-center justify-center font-display font-black text-3xl md:text-5xl border-4 border-white shadow-md">
              ĐD
            </div>
          </div>
        </div>
      </section>

      {/* Câu chuyện */}
      <section className="py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
          <h2 className="font-display font-black text-2xl sm:text-3xl text-brand-dark uppercase tracking-tight">
            Vì sao mình viết những thứ này
          </h2>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            Mình bắt đầu từ việc viết code. Càng làm càng gặp nhiều chủ doanh nghiệp đã bỏ tiền làm web nhưng không biết web của mình đang nằm ở đâu, tên miền đứng tên ai, vì sao làm xong mà chẳng ai tìm thấy. Có người chỉ dựa vào Facebook, đến lúc tài khoản quảng cáo bị khoá thì gần như mất hết kênh bán hàng.
          </p>
          <div className="bg-brand-primary/5 border-l-4 border-brand-primary p-5">
            <p className="text-sm text-brand-dark font-medium italic leading-relaxed">
              Vấn đề thường không nằm ở chuyện thiếu tiền hay thiếu người làm, mà ở chỗ chủ doanh nghiệp không có ai giải thích cho họ bằng lời dễ hiểu.
            </p>
          </div>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            Nên ngoài việc làm web, mình bắt đầu viết lại những gì mình biết: website là gì, khác Facebook ra sao, SEO hoạt động thế nào, nên đầu tư cái gì trước. Bạn có thể đọc miễn phí, tự làm nếu muốn, và tìm mình khi cần một người làm cùng.
          </p>
        </div>
      </section>

      {/* Điều mình tin */}
      <section className="py-16 sm:py-20 bg-brand-light border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display font-black text-2xl sm:text-3xl text-brand-dark uppercase tracking-tight text-center">
            3 điều mình tin khi làm web
          </h2>
          <div className="w-16 h-1 bg-brand-primary mx-auto mt-4 mb-12"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {beliefs.map((b) => {
              const IconComp = b.icon;
              return (
                <div key={b.title} className="bg-white p-6 rounded-sm border border-gray-200 shadow-xs">
                  <div className="w-10 h-10 rounded-sm bg-brand-primary/10 text-brand-primary flex items-center justify-center mb-4">
                    <IconComp className="h-5 w-5" />
                  </div>
                  <h3 className="font-display font-black text-base text-brand-dark mb-2 uppercase tracking-tight">{b.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{b.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mình đang làm gì */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-brand-dark uppercase tracking-tight">Mình đang làm gì</h2>
              <div className="mt-8 space-y-6">
                {work.map((w) => {
                  const IconComp = w.icon;
                  return (
                    <div key={w.title} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-sm bg-brand-secondary/10 text-brand-secondary flex items-center justify-center flex-shrink-0">
                        <IconComp className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-brand-dark">{w.title}</h3>
                        <p className="text-sm text-gray-600 mt-1 leading-relaxed">{w.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <h3 className="font-display font-black text-lg text-brand-dark uppercase tracking-tight mt-12">Những ngành mình đã đồng hành</h3>
              <div className="flex flex-wrap gap-2 mt-4">
                {industries.map((name) => (
                  <span key={name} className="px-3 py-1.5 rounded-sm text-xs font-bold bg-gray-100 text-gray-700 border border-gray-200">
                    {name}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-brand-dark text-white p-8 rounded-sm self-start">
              <h2 className="font-display font-black text-xl uppercase tracking-tight border-b border-gray-700 pb-4">Cách mình làm việc</h2>
              <div className="mt-6 space-y-6">
                {howIWork.map((h) => {
                  const IconComp = h.icon;
                  return (
                    <div key={h.text} className="flex items-start gap-4">
                      <IconComp className="h-5 w-5 text-brand-accent flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-gray-300 leading-relaxed">{h.text}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-primary py-16 sm:py-20 text-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight">Đang băn khoăn chuyện web?</h2>
          <p className="mt-4 text-sm sm:text-base text-white/90 leading-relaxed">
            Gửi mình link website hoặc kể mình nghe bạn đang kinh doanh gì. Mình sẽ góp ý thật lòng nên làm gì trước, kể cả khi câu trả lời là chưa cần làm web.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <a
              href={socialConfig.zalo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-sm text-xs font-bold uppercase tracking-widest text-brand-dark bg-white hover:bg-brand-accent transition-colors"
              style={{ minHeight: "48px" }}
            >
              Nhắn Duy qua Zalo
              <ArrowRight className="ml-2 h-4 w-4 text-brand-primary" />
            </a>
            <Link
              to="/kien-thuc"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-sm text-xs font-bold uppercase tracking-widest text-white border border-white/50 hover:bg-white/10 transition-colors"
              style={{ minHeight: "48px" }}
            >
              Đọc kiến thức trước
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
