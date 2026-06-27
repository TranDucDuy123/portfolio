import { useState, FormEvent } from "react";
import { CheckSquare, Square, Download, Sparkles, Send, HelpCircle, FileText, CheckCircle } from "lucide-react";
import { resourceChecklists } from "../data/resources";
import Meta from "../components/Meta";

export default function Resources() {
  const [activeChecklist, setActiveChecklist] = useState(resourceChecklists[0]);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [leadInfo, setLeadInfo] = useState({ name: "", phone: "", email: "", industry: "" });

  const toggleItem = (itemId: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const scorePercentage = () => {
    const total = activeChecklist.items.length;
    const completed = activeChecklist.items.filter((item, idx) => checkedItems[`${activeChecklist.id}-${idx}`]).length;
    return Math.round((completed / total) * 100);
  };

  const handleDownloadSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!leadInfo.name || !leadInfo.phone || !leadInfo.email) return;
    
    // Simulate API registration / PDF dispatch
    setIsSubmitted(true);
  };

  return (
    <div className="bg-white min-h-screen">
      <Meta
        title="Trung tâm Tài nguyên & Checklists - Đức Duy Web"
        description="Đăng ký nhận hoặc thực hành trực tuyến bộ Checklists chuẩn hóa Website, SEO, Google Business và Tài sản số độc quyền hoàn toàn miễn phí."
      />

      {/* Header Banner */}
      <section className="bg-brand-light py-12 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-primary">
              🎁 TRUNG TÂM TÀI NGUYÊN SỐ MIỄN PHÍ
            </span>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-dark mt-1 tracking-tight">
              Đo lường & Tối ưu hóa Sức khỏe Tài sản số của Bạn
            </h1>
            <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed">
              Tự kiểm định và cho điểm các kênh kỹ thuật số của bạn thông qua bộ công cụ tích hợp trực quan dưới đây trước khi đưa ra quyết định đầu tư ngân sách.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Left Column: Interactive Checklists */}
          <div className="lg:col-span-2 space-y-8">
            <div className="border border-gray-200 rounded-2xl p-6 bg-white shadow-xs">
              <h3 className="font-display font-bold text-lg text-brand-dark mb-4 pb-2 border-b border-gray-100 flex items-center">
                <Sparkles className="h-5 w-5 text-brand-secondary mr-2" />
                Công cụ tự đánh giá trực tuyến
              </h3>

              {/* Selector Tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
                {resourceChecklists.map((chk) => (
                  <button
                    key={chk.id}
                    onClick={() => setActiveChecklist(chk)}
                    className={`px-3 py-2.5 rounded-xl text-xs font-semibold tracking-tight transition-all duration-150 ${
                      activeChecklist.id === chk.id
                        ? "bg-brand-primary text-white shadow-sm"
                        : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                    }`}
                    style={{ minHeight: "44px" }}
                  >
                    {chk.title.replace("Checklist ", "").substring(0, 18)}...
                  </button>
                ))}
              </div>

              {/* Active Checklist Info */}
              <div className="space-y-4">
                <div className="bg-brand-primary/5 p-4 rounded-xl border border-brand-primary/15 flex items-center justify-between">
                  <div>
                    <h4 className="font-display font-bold text-sm text-brand-dark">{activeChecklist.title}</h4>
                    <p className="text-xs text-gray-500 mt-1">{activeChecklist.description}</p>
                  </div>
                  {/* Dynamic Score widget */}
                  <div className="text-center ml-4 flex-shrink-0">
                    <span className="block text-2xl font-extrabold text-brand-primary font-mono">{scorePercentage()}%</span>
                    <span className="text-[9px] uppercase font-mono font-bold text-gray-400">Đạt chuẩn</span>
                  </div>
                </div>

                {/* Checklist Items list */}
                <div className="space-y-2 pt-2">
                  {activeChecklist.items.map((item, idx) => {
                    const itemId = `${activeChecklist.id}-${idx}`;
                    const isChecked = !!checkedItems[itemId];

                    return (
                      <button
                        key={idx}
                        onClick={() => toggleItem(itemId)}
                        className="w-full text-left flex items-start p-3 rounded-lg border border-gray-100 hover:bg-gray-50/80 transition-colors cursor-pointer"
                        style={{ minHeight: "44px" }}
                      >
                        {isChecked ? (
                          <CheckSquare className="h-5 w-5 text-brand-primary mr-3 flex-shrink-0 mt-0.5" />
                        ) : (
                          <Square className="h-5 w-5 text-gray-300 mr-3 flex-shrink-0 mt-0.5" />
                        )}
                        <div>
                          <span className="text-xs font-mono font-bold text-brand-secondary bg-brand-secondary/10 px-1.5 py-0.5 rounded mr-2">
                            {item.category}
                          </span>
                          <span className={`text-xs text-gray-700 leading-relaxed ${isChecked ? "line-through text-gray-400 font-medium" : "font-sans"}`}>
                            {item.text}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Lead Capture Box */}
          <div className="space-y-6">
            <div className="border border-gray-200 rounded-2xl p-6 bg-white shadow-md relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-primary/5 rounded-full blur-xl"></div>
              
              <FileText className="h-10 w-10 text-brand-primary mb-3" />
              <h3 className="font-display font-bold text-base text-brand-dark">Tải về trọn bộ PDF Checklist Độc Quyền</h3>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                Nhập thông tin bên dưới để nhận ngay liên kết tải về bộ tài liệu hướng dẫn và Checklist chi tiết cho thương hiệu của bạn.
              </p>

              {isSubmitted ? (
                <div className="mt-6 p-5 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-3 animate-fade-in">
                  <CheckCircle className="h-10 w-10 text-emerald-500 mx-auto" />
                  <h4 className="font-display font-bold text-sm text-emerald-900">Gửi thông tin thành công!</h4>
                  <p className="text-xs text-emerald-700 leading-normal">
                    Hệ thống đang tự động khởi tạo liên kết tải về và gửi trực tiếp tệp PDF vào email **{leadInfo.email}** của bạn trong vòng vài giây.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleDownloadSubmit} className="mt-6 space-y-3.5">
                  <div>
                    <label className="block text-[10px] uppercase font-mono font-bold text-gray-400 mb-1">Họ tên của bạn *</label>
                    <input
                      type="text"
                      required
                      value={leadInfo.name}
                      onChange={(e) => setLeadInfo({ ...leadInfo, name: e.target.value })}
                      placeholder="Nguyễn Văn A"
                      className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-gray-200 focus:outline-hidden focus:ring-1 focus:ring-brand-primary"
                      style={{ minHeight: "44px" }}
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-mono font-bold text-gray-400 mb-1">Số điện thoại *</label>
                    <input
                      type="tel"
                      required
                      value={leadInfo.phone}
                      onChange={(e) => setLeadInfo({ ...leadInfo, phone: e.target.value })}
                      placeholder="09xx xxx xxx"
                      className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-gray-200 focus:outline-hidden focus:ring-1 focus:ring-brand-primary"
                      style={{ minHeight: "44px" }}
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-mono font-bold text-gray-400 mb-1">Email nhận tài liệu *</label>
                    <input
                      type="email"
                      required
                      value={leadInfo.email}
                      onChange={(e) => setLeadInfo({ ...leadInfo, email: e.target.value })}
                      placeholder="partner@tencongty.com"
                      className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-gray-200 focus:outline-hidden focus:ring-1 focus:ring-brand-primary"
                      style={{ minHeight: "44px" }}
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-mono font-bold text-gray-400 mb-1">Ngành nghề của công ty</label>
                    <input
                      type="text"
                      value={leadInfo.industry}
                      onChange={(e) => setLeadInfo({ ...leadInfo, industry: e.target.value })}
                      placeholder="Ví dụ: Thi công nội thất, Quảng cáo..."
                      className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-gray-200 focus:outline-hidden focus:ring-1 focus:ring-brand-primary"
                      style={{ minHeight: "44px" }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center px-4 py-3.5 rounded-lg text-xs font-bold uppercase text-white bg-brand-primary hover:bg-brand-secondary transition-colors shadow-md cursor-pointer"
                    style={{ minHeight: "44px" }}
                  >
                    Tải về tài nguyên PDF ngay
                    <Download className="ml-2 h-4 w-4" />
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
