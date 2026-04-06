import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, ArrowRight, CheckCircle2, 
  Search, ShieldCheck, Code, 
  TrendingUp, Smartphone, Phone, Briefcase, 
  Moon, Sun, MessageSquare, Send, Bot, User, XCircle, Loader2,
  Target, BrainCircuit, AlertCircle, FileText, ChevronRight, ClipboardEdit
} from 'lucide-react';


// Khai báo biến bifoodImg để sửa lỗi "is not defined".
const bifoodImg = "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800&q=80";

// --- Hàm gọi Gemini API (Trợ lý AI) ---
const callGeminiWithBackoff = async (prompt: string, retries = 5, delay = 1000): Promise<string> => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        systemInstruction: { 
          parts: [{ text: "Bạn là trợ lý AI trên trang Portfolio của Duy. Nhiệm vụ của bạn là tư vấn ngắn gọn, lịch sự bằng tiếng Việt. Khuyên khách hàng liên hệ trực tiếp với Duy qua Zalo 0938.415.218." }] 
        }
      })
    });
    
    if (!response.ok) throw new Error('Lỗi kết nối API');
    
    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "Xin lỗi, tôi chưa thể trả lời lúc này.";
  } catch (error) {
    if (retries > 0) {
      await new Promise(res => setTimeout(res, delay));
      return callGeminiWithBackoff(prompt, retries - 1, delay * 2);
    }
    return "Hệ thống AI hiện đang bận, xin vui lòng liên hệ trực tiếp Zalo Duy: 0938.415.218 để được hỗ trợ nhé!";
  }
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // STATE ĐIỀU HƯỚNG: home | roadmap | brief
  const [currentView, setCurrentView] = useState<'home' | 'roadmap' | 'brief'>('home');
  const [briefTab, setBriefTab] = useState<'form' | 'process'>('form');
  
  // State Chat AI
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [messages, setMessages] = useState<{role: 'ai' | 'user', text: string}[]>([
    { role: 'ai', text: 'Chào bạn! Mình là Trợ lý AI của Duy. Bạn cần tìm hiểu về thiết kế Web hay SEO?' }
  ]);
  const [isAiTyping, setIsAiTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isSystemDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (isSystemDark) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isAiTyping]);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    }
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleNavClick = (sectionId: string) => {
    if (currentView !== 'home') {
      setCurrentView('home');
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const handleSendMessage = async () => {
    if (!chatMessage.trim()) return;
    const userText = chatMessage;
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setChatMessage("");
    setIsAiTyping(true);
    const aiResponse = await callGeminiWithBackoff(userText);
    setMessages(prev => [...prev, { role: 'ai', text: aiResponse }]);
    setIsAiTyping(false);
  };

  return (
    <div className="scroll-smooth w-full relative">
      <style dangerouslySetInnerHTML={{__html: `
        #root { max-width: 100% !important; padding: 0 !important; margin: 0 !important; text-align: left !important; }
        body { display: block !important; min-height: 100vh !important; margin: 0 !important; background-color: transparent !important; }
        html.dark body { background-color: #0f172a !important; }
      `}} />
      
      <div className="min-h-screen w-full bg-slate-50 dark:bg-slate-900 font-sans text-slate-900 dark:text-slate-100 selection:bg-blue-200 dark:selection:bg-blue-900 transition-colors duration-300 overflow-x-hidden flex flex-col">
        
        {/* --- NAVIGATION --- */}
        <nav className="fixed top-0 left-0 w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md z-50 border-b border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="flex justify-between h-20 items-center">
              <button onClick={() => {setCurrentView('home'); window.scrollTo(0,0);}} className="flex items-center gap-2 shrink-0 cursor-pointer">
                <div className="bg-blue-600 p-2 rounded-lg text-white">
                  <Code size={24} />
                </div>
                <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white hidden sm:block">Duy.Portfolio</span>
              </button>
              
              <div className="hidden lg:flex items-center space-x-4 xl:space-x-8">
                <button onClick={() => handleNavClick('about')} className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">Triết lý</button>
                <button onClick={() => handleNavClick('projects')} className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">Dự án</button>
                
                {/* NÚT CLIENT PORTAL */}
                <button 
                  onClick={() => {setCurrentView('roadmap'); window.scrollTo(0,0);}} 
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all ${currentView === 'roadmap' ? 'bg-[#8E2C8B] text-white shadow-md' : 'bg-[#8E2C8B]/10 text-[#8E2C8B] dark:bg-[#8E2C8B]/20 dark:text-[#f3a8ef] hover:bg-[#8E2C8B]/20 dark:hover:bg-[#8E2C8B]/40'}`}
                >
                  <User size={16} /> Client Portal
                </button>

                {/* NÚT YÊU CẦU DỰ ÁN */}
                <button 
                  onClick={() => {setCurrentView('brief'); window.scrollTo(0,0);}} 
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all ${currentView === 'brief' ? 'bg-emerald-600 text-white shadow-md' : 'bg-emerald-600/10 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 hover:bg-emerald-600/20 dark:hover:bg-emerald-500/30'}`}
                >
                  <ClipboardEdit size={16} /> Gửi Yêu Cầu
                </button>

                <button onClick={toggleTheme} className="p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 hover:text-blue-600 dark:hover:bg-slate-800 dark:hover:text-yellow-400 rounded-full transition-all focus:outline-none">
                  {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>

                <button onClick={() => handleNavClick('contact')} className="px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
                  Nhận tư vấn
                </button>
              </div>

              <div className="lg:hidden flex items-center gap-3 shrink-0">
                <button onClick={toggleTheme} className="p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-all focus:outline-none">
                  {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>
                <button onClick={toggleMenu} className="p-1 text-slate-600 dark:text-slate-300 focus:outline-none">
                  {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Nav Menu */}
          {isMenuOpen && (
            <div className="lg:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-xl absolute w-full left-0 transition-colors duration-300">
              <div className="px-4 pt-2 pb-6 space-y-2 flex flex-col">
                <button onClick={() => handleNavClick('about')} className="text-left block px-3 py-3 text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-md">Triết lý</button>
                <button onClick={() => handleNavClick('projects')} className="text-left block px-3 py-3 text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-md">Dự án</button>
                <button onClick={() => {setCurrentView('roadmap'); setIsMenuOpen(false); window.scrollTo(0,0);}} className="text-left flex items-center gap-2 px-3 py-3 text-base font-bold text-[#8E2C8B] dark:text-[#f3a8ef] hover:bg-[#8E2C8B]/10 dark:hover:bg-[#8E2C8B]/20 rounded-md">
                  <User size={18} /> Client Portal
                </button>
                <button onClick={() => {setCurrentView('brief'); setIsMenuOpen(false); window.scrollTo(0,0);}} className="text-left flex items-center gap-2 px-3 py-3 text-base font-bold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 rounded-md">
                  <ClipboardEdit size={18} /> Gửi Yêu Cầu Dự Án
                </button>
                <button onClick={() => handleNavClick('contact')} className="block w-full text-center mt-4 px-5 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700">
                  Nhận tư vấn miễn phí
                </button>
              </div>
            </div>
          )}
        </nav>

        {/* ======================================================== */}
        {/* CONTENT RENDERER */}
        {/* ======================================================== */}
        
        {currentView === 'home' && (
          <main className="flex-1 animate-in fade-in duration-500">
            {/* Hero Section */}
            <section className="pt-32 pb-16 md:pt-40 md:pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-12">
              <div className="w-full md:w-1/2 space-y-6 md:space-y-8 relative z-10 flex flex-col items-center md:items-start text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800/50 text-blue-700 dark:text-blue-400 text-sm font-semibold transition-colors">
                  <TrendingUp size={16} />
                  <span>UX Designer & SEO Content Writer</span>
                </div>
                
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.25] md:leading-[1.15] break-words w-full">
                  Thiết kế Website <br className="hidden lg:block"/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">không chỉ để ngắm.</span>
                </h1>
                
                <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl transition-colors">
                  Tôi xây dựng nền tảng số giúp thương hiệu của bạn vận hành và tăng trưởng bền vững. Kết hợp trải nghiệm người dùng (UX) mượt mà và tối ưu hóa công cụ tìm kiếm (SEO) để biến website thành nhân viên sale làm việc 24/7.
                </p>
                
                <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-4 pt-2 md:pt-4 justify-center md:justify-start">
                  <button onClick={() => {setCurrentView('brief'); window.scrollTo(0,0);}} className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-emerald-600 text-white text-base md:text-lg font-medium rounded-xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 dark:shadow-emerald-900/20">
                    Bắt đầu dự án <ArrowRight size={20} />
                  </button>
                  <button onClick={() => handleNavClick('projects')} className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 text-base md:text-lg font-medium rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-all">
                    Xem dự án thực tế
                  </button>
                </div>
              </div>
              
              <div className="w-full md:w-1/2 relative mt-8 md:mt-0 px-2 sm:px-0">
                <div className="w-full aspect-square sm:aspect-[4/3] md:aspect-auto md:h-[500px] relative">
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-3xl transform rotate-3 scale-100 sm:scale-105 -z-10 transition-colors"></div>
                  
                  {/* Hero Web Frame */}
                  <div className="w-full h-full bg-white dark:bg-slate-800 rounded-3xl shadow-xl overflow-hidden border border-slate-100 dark:border-slate-700 flex flex-col relative transition-colors">
                    <div className="h-10 bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 flex items-center px-4 gap-2 transition-colors">
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                        <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col items-center justify-center space-y-4 p-8">
                      <div className="h-8 bg-slate-100 dark:bg-slate-700 rounded-lg w-3/4 transition-colors"></div>
                      <div className="h-32 bg-blue-50 dark:bg-blue-900/20 rounded-lg w-full flex items-center justify-center border border-blue-100 dark:border-blue-800/50 transition-colors">
                        <span className="text-blue-300 dark:text-blue-500 font-medium text-sm sm:text-base">Mô phỏng Giao diện</span>
                      </div>
                      <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full">
                        <div className="h-20 bg-slate-100 dark:bg-slate-700 rounded-lg transition-colors"></div>
                        <div className="h-20 bg-slate-100 dark:bg-slate-700 rounded-lg transition-colors"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* The "Why Me" Section */}
            <section id="about" className="py-16 md:py-24 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800 transition-colors">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Triết lý "Ăn chắc mặc bền"</h2>
                  <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 transition-colors">Website không chỉ là bộ mặt, mà là cỗ máy kinh doanh. Tôi không chạy theo xu hướng phù phiếm, tôi tập trung vào 3 giá trị cốt lõi mang lại hiệu quả thực tế.</p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  <div className="bg-slate-50 dark:bg-slate-800/50 p-6 md:p-8 rounded-2xl border border-slate-100 dark:border-slate-700 hover:shadow-md transition-all">
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center mb-5 md:mb-6">
                      <Smartphone className="w-6 h-6 md:w-8 md:h-8" />
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-3">Tối ưu UX / Di động</h3>
                    <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 mb-4 transition-colors">Hơn 80% khách hàng duyệt web trên điện thoại. Tôi thiết kế luồng thao tác đơn giản, nút bấm to rõ, giúp khách hàng của bạn dễ dàng tìm thông tin và chốt đơn.</p>
                  </div>
                  
                  <div className="bg-slate-50 dark:bg-slate-800/50 p-6 md:p-8 rounded-2xl border border-slate-100 dark:border-slate-700 hover:shadow-md transition-all">
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 rounded-xl flex items-center justify-center mb-5 md:mb-6">
                      <Search className="w-6 h-6 md:w-8 md:h-8" />
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-3">Chuẩn SEO từ gốc</h3>
                    <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 mb-4 transition-colors">Mã nguồn sạch, cấu trúc thẻ Heading chuẩn xác và nội dung được viết theo Insight người dùng giúp website dễ dàng leo Top Google mà không tốn nhiều chi phí Ads.</p>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-800/50 p-6 md:p-8 rounded-2xl border border-slate-100 dark:border-slate-700 hover:shadow-md transition-all sm:col-span-2 lg:col-span-1">
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 rounded-xl flex items-center justify-center mb-5 md:mb-6">
                      <ShieldCheck className="w-6 h-6 md:w-8 md:h-8" />
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-3">Bền bỉ & Bảo mật</h3>
                    <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 mb-4 transition-colors">Không nhồi nhét plugin làm nặng máy chủ. Xây dựng cấu trúc vững chắc, dễ dàng bảo trì và mở rộng khi doanh nghiệp của bạn phát triển lớn hơn.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Case Studies Section */}
            <section id="projects" className="py-16 md:py-24 bg-slate-50 dark:bg-slate-900 transition-colors">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-10 md:mb-16 md:flex md:justify-between md:items-end">
                  <div className="max-w-2xl text-center md:text-left mx-auto md:mx-0">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Dự án tiêu biểu</h2>
                    <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 transition-colors">Đừng nghe những gì tôi nói, hãy xem cách tôi giải quyết vấn đề cho các doanh nghiệp thực tế.</p>
                  </div>
                </div>

                <div className="space-y-12 md:space-y-20">
                  <div className="flex flex-col lg:flex-row gap-8 md:gap-12 items-center bg-white dark:bg-slate-800 p-6 sm:p-8 md:p-12 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm transition-colors">
                    <div className="w-full lg:w-1/2 order-2 lg:order-1">
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-md text-xs sm:text-sm font-medium mb-4 sm:mb-6 transition-colors">
                        <Briefcase size={14} /> Ngành: Bán lẻ / Thú cưng (Pet Shop)
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-4 sm:mb-6">Bifood.com.vn</h3>
                      
                      <div className="space-y-4 sm:space-y-6">
                        <div>
                          <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-2">
                            <span className="w-2 h-2 bg-red-500 rounded-full"></span> Vấn đề
                          </h4>
                          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 transition-colors">Khách hàng khó phân loại và tìm kiếm thức ăn theo độ tuổi/giống thú cưng. Giao diện cũ thiếu điểm nhấn để tạo sự tin tưởng khi bán các dòng cám nhập khẩu cao cấp.</p>
                        </div>
                        
                        <div>
                          <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-2">
                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span> Giải pháp (UX/SEO)
                          </h4>
                          <ul className="text-sm sm:text-base text-slate-600 dark:text-slate-300 space-y-2 list-disc list-inside ml-2 transition-colors">
                            <li>Thiết kế giao diện tươi sáng, thân thiện với người yêu động vật.</li>
                            <li>Tối ưu bộ lọc sản phẩm thông minh (Chó/Mèo, Độ tuổi, Hạt/Pate).</li>
                            <li>Xây dựng cấu trúc danh mục và trang Blog kiến thức nuôi Pet chuẩn SEO.</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div className="w-full lg:w-1/2 order-1 lg:order-2">
                      <div className="w-full rounded-xl overflow-hidden shadow-2xl shadow-slate-300/50 dark:shadow-slate-900/50 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 transition-colors">
                        <div className="h-10 bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 flex items-center px-4 gap-2 transition-colors">
                          <div className="flex gap-1.5 shrink-0">
                            <div className="w-3 h-3 rounded-full bg-red-400"></div>
                            <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                            <div className="w-3 h-3 rounded-full bg-green-400"></div>
                          </div>
                          
                          <div className="mx-auto bg-white dark:bg-slate-800 text-[11px] font-medium text-slate-500 dark:text-slate-400 px-4 py-1 rounded-md border border-slate-200 dark:border-slate-700 flex items-center gap-1.5 shadow-sm">
                            <ShieldCheck size={12} className="text-green-500" />
                            bifood.com.vn
                          </div>
                          <div className="w-10 shrink-0"></div>
                        </div>

                        <div className="w-full aspect-[4/3] bg-slate-200 dark:bg-slate-800 overflow-hidden relative group cursor-pointer">
                          <img 
                            src={bifoodImg} 
                            alt="Bifood Website Demo" 
                            className="w-full h-auto object-cover object-top transition-transform duration-[5s] ease-in-out group-hover:-translate-y-[30%] sm:group-hover:-translate-y-[50%]"
                          />
                          <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.05)] pointer-events-none"></div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </section>

            {/* CTA / Contact Section */}
            <section id="contact" className="py-16 md:py-24 bg-blue-600 dark:bg-blue-900 relative overflow-hidden transition-colors">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 md:mb-6">Bạn đã sẵn sàng để nâng cấp?</h2>
                <p className="text-lg md:text-xl text-blue-100 dark:text-blue-200 mb-8 md:mb-10 max-w-2xl mx-auto transition-colors px-2">
                  Hãy nhắn tin cho tôi để chúng ta cùng thảo luận về giải pháp phù hợp nhất.
                </p>
                
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 sm:p-8 md:p-12 shadow-2xl text-left max-w-2xl mx-auto transition-colors mx-2 sm:mx-auto">
                  <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center">Liên hệ trực tiếp</h3>
                  <div className="space-y-4 md:space-y-6">
                    <a href="https://zalo.me/0938415218" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-slate-700/50 transition-all group">
                      <div className="bg-blue-50 dark:bg-slate-700 p-2 md:p-3 rounded-lg text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                        <Phone className="w-5 h-5 md:w-6 md:h-6" />
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-xs md:text-sm font-medium text-slate-500 dark:text-slate-400">Zalo / Hotline</p>
                        <p className="text-base md:text-lg font-bold text-slate-900 dark:text-white truncate">0938.415.218</p>
                      </div>
                    </a>

                    <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-slate-700/50 transition-all group">
                      <div className="bg-blue-50 dark:bg-slate-700 p-2 md:p-3 rounded-lg text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 md:w-6 md:h-6"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-xs md:text-sm font-medium text-slate-500 dark:text-slate-400">Facebook</p>
                        <p className="text-base md:text-lg font-bold text-slate-900 dark:text-white truncate">Facebook Cá Nhân</p>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </main>
        )}

        {/* ======================================================== */}
        {/* CLIENT BRIEF: FORM YÊU CẦU DỰ ÁN CỦA KHÁCH HÀNG          */}
        {/* ======================================================== */}
        {currentView === 'brief' && (
          <main className="flex-1 pt-32 pb-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            <button onClick={() => {setCurrentView('home'); window.scrollTo(0,0);}} className="mb-8 flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">
              <ArrowRight className="rotate-180" size={16} /> Quay lại Portfolio
            </button>

            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 text-sm font-bold mb-4">
                <FileText size={16} />
                <span>Bản Yêu Cầu Dự Án (Creative Brief)</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold mb-4 dark:text-white">
                Khởi tạo dự án <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400">Thực Chiến</span>
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                Để sản phẩm "chạm" đúng khách hàng và ra chuyển đổi, xin anh/chị xem qua 4 thông tin thiết yếu cần cung cấp trước khi chúng ta bắt đầu.
              </p>
            </div>

            {/* Tabs Control cho Brief */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8 bg-white dark:bg-slate-800 p-2 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
              <button 
                onClick={() => setBriefTab('form')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-semibold transition-all ${briefTab === 'form' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
              >
                <Target size={20} /> 1. Khách Hàng Cung Cấp
              </button>
              <button 
                onClick={() => setBriefTab('process')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-semibold transition-all ${briefTab === 'process' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
              >
                <Search size={20} /> 2. Tiêu Chí & Nghiệm Thu
              </button>
            </div>

            {/* Nội dung Brief - Form */}
            {briefTab === 'form' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-500">
                {/* Step 1 */}
                <div className="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center font-bold text-xl">1</div>
                    <div>
                      <h3 className="text-xl font-bold dark:text-white">Mục tiêu dự án</h3>
                      <p className="text-slate-500 dark:text-slate-400 text-sm">Anh/chị muốn khách hàng làm gì sau khi xem Website/Bài viết?</p>
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <label className="flex items-start gap-3 p-4 border border-slate-200 dark:border-slate-600 rounded-xl cursor-pointer hover:border-emerald-500 dark:hover:border-emerald-400 transition-colors bg-slate-50 dark:bg-slate-900/50">
                      <input type="radio" name="goal" className="mt-1 w-4 h-4 text-emerald-600" />
                      <div>
                        <span className="block font-bold dark:text-white">Bán hàng ngay (Conversion)</span>
                        <span className="text-sm text-slate-500 dark:text-slate-400">Tập trung chốt sale, tối ưu giỏ hàng, kêu gọi hành động mạnh.</span>
                      </div>
                    </label>
                    <label className="flex items-start gap-3 p-4 border border-slate-200 dark:border-slate-600 rounded-xl cursor-pointer hover:border-emerald-500 dark:hover:border-emerald-400 transition-colors bg-slate-50 dark:bg-slate-900/50">
                      <input type="radio" name="goal" className="mt-1 w-4 h-4 text-emerald-600" />
                      <div>
                        <span className="block font-bold dark:text-white">Xây dựng niềm tin (Authority)</span>
                        <span className="text-sm text-slate-500 dark:text-slate-400">Chia sẻ kiến thức chuyên sâu để định vị thương hiệu lâu dài.</span>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center font-bold text-xl">2</div>
                    <div>
                      <h3 className="text-xl font-bold dark:text-white">Chân dung đối tượng</h3>
                      <p className="text-slate-500 dark:text-slate-400 text-sm">Ai là người sẽ mua hàng/đọc bài viết này?</p>
                    </div>
                  </div>
                  <textarea 
                    className="w-full p-4 border border-slate-200 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-900/50 focus:ring-2 focus:ring-blue-500 outline-none dark:text-white placeholder:text-slate-400" 
                    rows={3}
                    placeholder="VD: Người mới nuôi mèo (cần hướng dẫn cơ bản) hay Người nuôi lâu năm (đang tìm đổi sang loại hạt cao cấp hơn)?"
                  ></textarea>
                </div>

                {/* Step 3 */}
                <div className="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center font-bold text-xl">3</div>
                    <div>
                      <h3 className="text-xl font-bold dark:text-white">Thông điệp cốt lõi (USP)</h3>
                      <p className="text-slate-500 dark:text-slate-400 text-sm">Điểm sáng nhất của sản phẩm/dịch vụ muốn đọng lại trong đầu khách?</p>
                    </div>
                  </div>
                  <input 
                    type="text" 
                    className="w-full p-4 border border-slate-200 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-900/50 focus:ring-2 focus:ring-indigo-500 outline-none dark:text-white placeholder:text-slate-400"
                    placeholder="VD: 'Giao diện tải dưới 2 giây', 'Cám mát không gây sỏi thận', 'Giá rẻ nhất khu vực'..."
                  />
                </div>

                {/* Step 4 */}
                <div className="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400 rounded-2xl flex items-center justify-center font-bold text-xl">4</div>
                    <div>
                      <h3 className="text-xl font-bold dark:text-white">Kỳ vọng số liệu</h3>
                      <p className="text-slate-500 dark:text-slate-400 text-sm">Mục tiêu đo lường sau khi triển khai.</p>
                    </div>
                  </div>
                  
                  <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50 p-4 rounded-xl flex gap-3 mb-4">
                    <AlertCircle className="text-amber-600 dark:text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-amber-800 dark:text-amber-400 text-sm mb-1">Lưu ý về số liệu Website (SEO/UX):</h4>
                      <p className="text-sm text-amber-700 dark:text-amber-500/80 leading-relaxed">
                        Khác với chạy Quảng cáo (Ads) ra số ngay. Sản phẩm Website và SEO mang tính chất "Lãi suất kép". Chỉ số đo lường thực tế nhất sẽ là: <br/>
                        <strong>1. Thứ hạng từ khóa trên Google sau 1-3 tháng.</strong><br/>
                        <strong>2. Thời gian khách hàng ở lại trang (Time on page) và Tốc độ tải trang.</strong>
                      </p>
                    </div>
                  </div>

                  <input 
                    type="text" 
                    className="w-full p-4 border border-slate-200 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-900/50 focus:ring-2 focus:ring-amber-500 outline-none dark:text-white placeholder:text-slate-400"
                    placeholder="Anh/chị kỳ vọng bài viết tiếp cận bao nhiêu Traffic tự nhiên/tháng? Hoặc mong muốn tăng bao nhiêu % chuyển đổi?"
                  />
                </div>
                
                <div className="text-right pt-4">
                   <button onClick={() => setBriefTab('process')} className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200 dark:shadow-emerald-900/20">
                     Tiếp theo: Xem tiêu chí nghiệm thu <ChevronRight size={20} />
                   </button>
                </div>
              </div>
            )}

            {/* Nội dung Brief - Process & QA */}
            {briefTab === 'process' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                <div>
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 dark:text-white">
                    <BrainCircuit className="text-blue-600 dark:text-blue-400" size={28} />
                    Phương pháp Nghiên cứu (Research)
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 dark:bg-blue-900/20 rounded-bl-full -mr-4 -mt-4 z-0"></div>
                      <h3 className="text-lg font-bold mb-3 relative z-10 dark:text-white">1. Từ khóa & UX (Keywords & Flow)</h3>
                      <p className="text-slate-600 dark:text-slate-400 relative z-10 text-sm leading-relaxed">
                        Tôi không chỉ thiết kế, tôi phân tích dữ liệu:
                        <br/>• <strong className="text-slate-900 dark:text-slate-200">Hành vi người dùng:</strong> Họ click vào đâu nhiều nhất?
                        <br/>• <strong className="text-slate-900 dark:text-slate-200">Từ khóa chuyển đổi:</strong> Khách gõ gì trên Google khi muốn mua ngay?
                      </p>
                    </div>
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50 dark:bg-indigo-900/20 rounded-bl-full -mr-4 -mt-4 z-0"></div>
                      <h3 className="text-lg font-bold mb-3 relative z-10 dark:text-white">2. Đào sâu Nỗi đau (Insight)</h3>
                      <p className="text-slate-600 dark:text-slate-400 relative z-10 text-sm leading-relaxed">
                        Nghiên cứu bình luận, review đối thủ để tìm ra vấn đề khách hàng đang gặp phải. Từ đó thiết kế luồng nội dung và chức năng để "đập tan" nỗi sợ của họ.
                      </p>
                    </div>
                  </div>
                </div>

                <hr className="border-slate-200 dark:border-slate-700" />

                <div>
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 dark:text-white">
                    <CheckCircle2 className="text-emerald-600 dark:text-emerald-400" size={28} />
                    Tiêu Chí Nghiệm Thu Bàn Giao (QA)
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400 mb-6">Anh/chị có thể dùng bảng Checklist này để nghiệm thu công việc của tôi:</p>
                  
                  <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
                    {[
                      { title: "Giao diện (UI) & Trải nghiệm (UX)", desc: "Responsive 100% trên Mobile. Tốc độ tải trang dưới 3 giây. Nút bấm dễ thao tác." },
                      { title: "Độ mạch lạc Nội dung (Readability)", desc: "Câu văn ngắn gọn, chia đoạn rõ. Khách hàng lướt web (Scan) vẫn nắm được 80% ý chính." },
                      { title: "Chuẩn SEO On-page", desc: "Từ khóa chính xuất hiện ở Tiêu đề (H1), Thẻ H2 và rải tự nhiên trong bài. Cấu trúc URL chuẩn." },
                      { title: "Đánh trúng Insight & CTA rõ ràng", desc: "Phần mở đầu chạm đúng nỗi đau khách hàng. Có lời kêu gọi liên hệ/mua hàng mạnh mẽ ở cuối." }
                    ].map((item, index) => (
                      <div key={index} className="flex gap-4 p-5 border-b border-slate-100 dark:border-slate-700 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors">
                        <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" size={20} />
                        <div>
                          <h4 className="font-bold text-slate-900 dark:text-white mb-1">{item.title}</h4>
                          <p className="text-sm text-slate-600 dark:text-slate-400">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50 p-6 rounded-2xl text-center">
                  <h3 className="text-lg font-bold text-emerald-800 dark:text-emerald-400 mb-2">Đã sẵn sàng triển khai?</h3>
                  <p className="text-emerald-600 dark:text-emerald-500 text-sm mb-6">Hãy gửi cho tôi các thông tin anh/chị vừa định hình qua Zalo nhé.</p>
                  <a href="https://zalo.me/0938415218" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-colors shadow-lg">
                    <Phone size={20} /> Mở Zalo Gửi Yêu Cầu Cho Duy
                  </a>
                </div>
              </div>
            )}
          </main>
        )}

        {/* ======================================================== */}
        {/* CLIENT PORTAL: LỘ TRÌNH DỰ ÁN (ROADMAP)                  */}
        {/* ======================================================== */}
        {currentView === 'roadmap' && (
          <main className="flex-1 pt-32 pb-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            <button onClick={() => {setCurrentView('home'); window.scrollTo(0,0);}} className="mb-8 flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">
              <ArrowRight className="rotate-180" size={16} /> Quay lại Portfolio
            </button>

            <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
              <div>
                <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Lộ trình triển khai nội dung</h2>
                <p className="text-slate-500 dark:text-slate-400 mt-2">Dự án: <span className="font-bold text-[#8E2C8B] dark:text-[#d76bd4] uppercase">Chiến dịch Orio "Cám Mát"</span></p>
              </div>
              <div className="bg-white dark:bg-slate-800 px-4 py-2 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
                <span className="text-xs font-bold text-slate-400 uppercase block mb-1">Trạng thái</span>
                <span className="text-sm font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-pulse"></span>
                  Đang thực hiện Bước 2
                </span>
              </div>
            </div>

            <div className="relative">
              <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-1 bg-slate-200 dark:bg-slate-700 rounded-full"></div>

              <div className="relative flex flex-col md:flex-row items-start md:items-center mb-16 group">
                <div className="md:w-1/2 md:pr-12 md:text-right order-2 md:order-1 mt-4 md:mt-0 w-full">
                  <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 group-hover:shadow-md transition-all">
                    <h3 className="font-bold text-lg text-slate-800 dark:text-white">Bước 1: Research & Data</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">Phân tích 10 đối thủ trực tiếp, tìm ra 5 nỗi đau của khách nuôi mèo tại Việt Nam (hôi phân, rụng lông, kén ăn).</p>
                    <div className="mt-4 flex flex-wrap gap-2 md:justify-end">
                      <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-[10px] font-bold rounded">ĐÃ HOÀN THÀNH</span>
                    </div>
                  </div>
                </div>
                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-green-500 text-white z-10 border-4 border-slate-50 dark:border-slate-900 shadow">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <div className="md:w-1/2 md:pl-12 order-3 hidden md:block"></div>
              </div>

              <div className="relative flex flex-col md:flex-row items-start md:items-center mb-16">
                <div className="md:w-1/2 order-3 hidden md:block"></div>
                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 flex items-center justify-center w-10 h-10 rounded-full bg-yellow-400 dark:bg-yellow-500 text-white z-10 border-4 border-slate-50 dark:border-slate-900 shadow-lg animate-bounce">
                  <span className="font-bold text-xl">!</span>
                </div>
                <div className="md:w-1/2 md:pl-12 order-2 md:order-3 mt-4 md:mt-0 w-full">
                  <div className="bg-yellow-50 dark:bg-yellow-900/10 p-6 rounded-2xl border-2 border-yellow-200 dark:border-yellow-700/50 shadow-xl shadow-yellow-100/50 dark:shadow-none">
                    <h3 className="font-bold text-lg text-slate-800 dark:text-white flex flex-wrap items-center gap-2">
                      Bước 2: Phê duyệt Outline 
                      <span className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-[10px] rounded animate-pulse tracking-tighter">QUAN TRỌNG</span>
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 italic">Duy đã lên xong sườn bài tập trung vào "Đạm tươi" và "Giảm mùi hôi".</p>
                    <div className="mt-6 flex flex-col sm:flex-row gap-3">
                      <button className="bg-[#8E2C8B] dark:bg-[#a93caf] text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-lg hover:scale-105 transition-transform text-center">XEM & DUYỆT NGAY</button>
                      <button className="border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 px-5 py-2.5 rounded-xl font-bold text-xs hover:bg-white dark:hover:bg-slate-800 transition-colors text-center">YÊU CẦU SỬA</button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative flex flex-col md:flex-row items-start md:items-center mb-16 opacity-50 dark:opacity-40">
                <div className="md:w-1/2 md:pr-12 md:text-right order-2 md:order-1 mt-4 md:mt-0 w-full">
                  <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-dashed border-slate-300 dark:border-slate-600">
                    <h3 className="font-bold text-lg text-slate-400 dark:text-slate-500">Bước 3: Viết bài chi tiết</h3>
                    <p className="text-sm text-slate-400 dark:text-slate-500 mt-2">Áp dụng văn phong "Ăn chắc mặc bền", lồng ghép khéo léo triết lý nghệ nhân của Ngọc Nhân.</p>
                  </div>
                </div>
                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 z-10 border-4 border-slate-50 dark:border-slate-900 shadow">
                  <span className="font-bold text-xs">3</span>
                </div>
                <div className="md:w-1/2 md:pl-12 order-3 hidden md:block"></div>
              </div>

              <div className="relative flex flex-col md:flex-row items-start md:items-center mb-16 opacity-50 dark:opacity-40">
                <div className="md:w-1/2 order-3 hidden md:block"></div>
                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 z-10 border-4 border-slate-50 dark:border-slate-900 shadow">
                  <span className="font-bold text-xs text-center">🏆</span>
                </div>
                <div className="md:w-1/2 md:pl-12 order-2 md:order-3 mt-4 md:mt-0 w-full">
                  <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-dashed border-slate-300 dark:border-slate-600">
                    <h3 className="font-bold text-lg text-slate-400 dark:text-slate-500 uppercase tracking-tighter text-xs">Bước 4: QC & Report</h3>
                    <p className="text-sm text-slate-400 dark:text-slate-500 mt-2 italic underline">Tối ưu SEO - Báo cáo chỉ số tiếp cận.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 p-6 bg-slate-900 dark:bg-slate-950 border border-slate-800 dark:border-slate-800 rounded-3xl text-white shadow-2xl">
              <h4 className="font-bold text-yellow-400 mb-2 flex items-center gap-2">💡 Mẹo cho Duy:</h4>
              <p className="text-sm text-slate-300 leading-relaxed">
                Khi Duy gửi link này cho khách, hãy nhấn mạnh rằng: <span className="text-white font-bold bg-[#8E2C8B] px-1 rounded">"Duy chỉ chuyển sang Bước 3 khi anh/chị nhấn nút Duyệt ở Bước 2"</span>. Điều này giúp Duy không bao giờ phải viết lại cả bài nếu khách đổi ý giữa chừng.
              </p>
            </div>
          </main>
        )}

        {/* --- FOOTER CHUNG --- */}
        <footer className="bg-slate-900 dark:bg-slate-950 text-slate-400 py-12 border-t border-slate-800 dark:border-slate-900 transition-colors mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2 text-white">
              <Code size={24} />
              <span className="font-bold text-xl tracking-tight">Duy.Portfolio</span>
            </div>
            <p className="text-center md:text-left text-sm md:text-base">
              © {new Date().getFullYear()} Duy UX Designer & SEO Content Writer.
            </p>
          </div>
        </footer>

      </div>

      {/* --- GIAO DIỆN CHAT AI (GEMINI) NỔI Ở GÓC DƯỚI BÊN PHẢI --- */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        {isChatOpen && (
          <div className="bg-white dark:bg-slate-800 w-80 sm:w-96 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 mb-4 overflow-hidden flex flex-col h-[400px] animate-in fade-in slide-in-from-bottom-5 transition-colors">
            <div className="bg-blue-600 dark:bg-blue-800 text-white p-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Bot size={20} />
                <h3 className="font-bold">Trợ lý AI của Duy</h3>
              </div>
              <button onClick={() => setIsChatOpen(false)} className="hover:text-blue-200 transition-colors">
                <XCircle size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-900 text-sm">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-600 rounded-tl-none shadow-sm'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isAiTyping && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-600 p-3 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2">
                    <Loader2 size={16} className="animate-spin text-blue-500" /> AI đang gõ...
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-3 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 flex gap-2">
              <input 
                type="text" 
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Hỏi AI về làm Web, SEO..."
                className="flex-1 px-3 py-2 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white text-sm"
              />
              <button 
                onClick={handleSendMessage}
                disabled={isAiTyping || !chatMessage.trim()}
                className="bg-blue-600 text-white p-2 rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        )}

        <button 
          onClick={() => setIsChatOpen(!isChatOpen)}
          className={`bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-2xl transition-transform hover:scale-110 flex items-center justify-center ${isChatOpen ? 'rotate-90 scale-0 opacity-0 hidden' : 'rotate-0 scale-100 opacity-100'}`}
          style={{ transitionDuration: '300ms' }}
        >
          <MessageSquare size={28} />
          <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-500 border-2 border-white dark:border-slate-900 rounded-full animate-pulse"></span>
        </button>
      </div>
    </div>
  );
}