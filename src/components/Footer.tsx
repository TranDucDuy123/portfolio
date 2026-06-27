import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, ArrowUpRight, Github, Youtube, Facebook, Send } from "lucide-react";
import { socialConfig } from "../config/social";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-dark text-gray-300 pt-16 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Column 1: Brand & Tagline */}
          <div className="flex flex-col space-y-4">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-brand-primary flex items-center justify-center rounded-sm transition-all duration-300 transform group-hover:bg-brand-secondary group-hover:rotate-12 flex-shrink-0 shadow-sm">
                <div className="w-5 h-5 border-2 border-white rotate-45"></div>
              </div>
              <div className="flex flex-col">
                <span className="font-display font-black text-xl tracking-tighter leading-none uppercase text-white group-hover:text-brand-primary transition-colors">
                  Đức Duy Web
                </span>
                <span className="text-[9px] uppercase font-mono tracking-[0.2em] text-gray-400 font-bold leading-none mt-0.5">
                  Digital Asset Hub
                </span>
              </div>
            </Link>
            <p className="text-xs text-gray-400 mt-2 leading-relaxed">
              Website là nền móng tài sản số dài hạn của doanh nghiệp. Các kênh mạng xã hội khác là kênh dẫn dắt và thu hút sự chú ý.
            </p>
            <div className="flex space-x-2 pt-2">
              <a
                href={socialConfig.facebookPersonal}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-sm bg-gray-800 hover:bg-brand-primary flex items-center justify-center text-gray-300 hover:text-white transition-all duration-200 border border-gray-700 hover:border-brand-primary"
                style={{ minWidth: "40px", minHeight: "40px" }}
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href={socialConfig.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-sm bg-gray-800 hover:bg-brand-primary flex items-center justify-center text-gray-300 hover:text-white transition-all duration-200 border border-gray-700 hover:border-brand-primary"
                style={{ minWidth: "40px", minHeight: "40px" }}
              >
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-display text-white font-bold text-base mb-4 tracking-tight border-l-4 border-brand-primary pl-3">
              Mạng Lưới Tài Sản
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/services" className="hover:text-brand-accent hover:underline transition-all">
                  → Dịch vụ Tài sản số
                </Link>
              </li>
              <li>
                <Link to="/case-study" className="hover:text-brand-accent hover:underline transition-all">
                  → Thư viện Case Study
                </Link>
              </li>
              <li>
                <Link to="/solutions" className="hover:text-brand-accent hover:underline transition-all">
                  → Giải pháp ngành dọc
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-brand-accent hover:underline transition-all">
                  → Portfolio dự án
                </Link>
              </li>
              <li>
                <Link to="/resources" className="hover:text-brand-accent hover:underline transition-all">
                  → Checklists tải về
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Cafe Số & Blog */}
          <div>
            <h3 className="font-display text-white font-bold text-base mb-4 tracking-tight border-l-4 border-brand-primary pl-3">
              Kiến Thức & Cafe Số
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/cafe-so" className="hover:text-brand-accent hover:underline transition-all">
                  → Cafe Số - Giải mã Web
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-brand-accent hover:underline transition-all">
                  → Blog Chiến lược SEO
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-brand-accent hover:underline transition-all">
                  → Về Đức Duy
                </Link>
              </li>
              <li>
                <Link to="/connect" className="hover:text-brand-accent hover:underline transition-all">
                  → Cổng Kết nối Trực tiếp
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact info */}
          <div className="flex flex-col space-y-4">
            <h3 className="font-display text-white font-bold text-base mb-4 tracking-tight border-l-4 border-brand-primary pl-3">
              Trụ Sở Đăng Ký
            </h3>
            <div className="space-y-3 text-sm text-gray-400">
              <div className="flex items-start space-x-2.5">
                <MapPin className="h-5 w-5 text-brand-secondary flex-shrink-0 mt-0.5" />
                <span>{socialConfig.address}</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Phone className="h-5 w-5 text-brand-secondary flex-shrink-0" />
                <a href={`tel:${socialConfig.phone}`} className="hover:text-white transition-colors">
                  {socialConfig.phoneDisplay}
                </a>
              </div>
              <div className="flex items-center space-x-2.5">
                <Mail className="h-5 w-5 text-brand-secondary flex-shrink-0" />
                <a href={`mailto:${socialConfig.email}`} className="hover:text-white transition-colors">
                  {socialConfig.email}
                </a>
              </div>
            </div>
            {/* Newsletter signup */}
            <div className="pt-2">
              <h4 className="text-xs uppercase tracking-wider text-brand-accent font-bold mb-2">Nhận bản tin Cafe Số</h4>
              <form onSubmit={(e) => e.preventDefault()} className="flex">
                <input
                  type="email"
                  placeholder="Nhập email của bạn..."
                  className="bg-gray-800 text-white px-3 py-2 text-xs rounded-l-sm focus:outline-hidden focus:ring-1 focus:ring-brand-primary w-full border border-gray-700"
                  required
                />
                <button
                  type="submit"
                  className="bg-brand-primary hover:bg-brand-secondary text-white px-3 py-2 rounded-r-sm flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Đăng ký nhận bản tin"
                >
                  <Send className="h-3 w-3" />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom copyright section */}
        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500">
          <p>© {currentYear} Đức Duy Web. Tất cả quyền được bảo lưu. Thiết kế và code bởi Đức Duy.</p>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <a href="/robots.txt" className="hover:text-white">Robots.txt</a>
            <a href="/sitemap.xml" className="hover:text-white">Sitemap.xml</a>
            <span className="text-brand-secondary font-semibold font-mono">OWNED LAND - NOT RENTED</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
