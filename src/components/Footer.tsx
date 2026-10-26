import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, ArrowUpRight, Youtube, Facebook } from "lucide-react";
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
                <span className="text-[9px] uppercase font-mono tracking-[0.12em] text-gray-400 font-bold leading-none mt-0.5">
                  Chuyện web cho chủ doanh nghiệp
                </span>
              </div>
            </Link>
            <p className="text-xs text-gray-400 mt-2 leading-relaxed">
              Mình là Đức Duy, người làm web. Ở đây mình kể lại chuyện web, SEO, tên miền, hosting bằng lời dễ hiểu, để chủ doanh nghiệp tự quyết định đúng mà không cần biết code.
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

          {/* Column 2: Đọc */}
          <div>
            <h3 className="font-display text-white font-bold text-base mb-4 tracking-tight border-l-4 border-brand-primary pl-3">
              Đọc & dùng thử
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/kien-thuc" className="hover:text-brand-accent hover:underline transition-all">
                  → Thư viện kiến thức
                </Link>
              </li>
              <li>
                <Link to="/cafe-so" className="hover:text-brand-accent hover:underline transition-all">
                  → Cafe Số: hiểu web trong 5 phút
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-brand-accent hover:underline transition-all">
                  → Blog chiến lược & SEO
                </Link>
              </li>
              <li>
                <Link to="/resources" className="hover:text-brand-accent hover:underline transition-all">
                  → Checklist tự kiểm tra website
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Làm việc cùng Duy */}
          <div>
            <h3 className="font-display text-white font-bold text-base mb-4 tracking-tight border-l-4 border-brand-primary pl-3">
              Làm việc cùng Duy
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/services" className="hover:text-brand-accent hover:underline transition-all">
                  → Mình làm những gì
                </Link>
              </li>
              <li>
                <Link to="/bao-gia" className="hover:text-brand-accent hover:underline transition-all">
                  → Bảng giá tham khảo
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-brand-accent hover:underline transition-all">
                  → Về Duy
                </Link>
              </li>
              <li>
                <Link to="/connect" className="hover:text-brand-accent hover:underline transition-all">
                  → Liên hệ trực tiếp
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact info */}
          <div className="flex flex-col space-y-4">
            <h3 className="font-display text-white font-bold text-base mb-4 tracking-tight border-l-4 border-brand-primary pl-3">
              Liên hệ
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
            {/* Nhận bài mới: dùng Zalo vì chưa có hệ thống email */}
            <div className="pt-2">
              <h4 className="text-xs uppercase tracking-wider text-brand-accent font-bold mb-2">Nhận bài mới</h4>
              <a
                href={socialConfig.zalo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2.5 rounded-sm text-xs font-bold text-white bg-brand-primary hover:bg-brand-secondary transition-colors"
              >
                Nhắn Zalo "nhận bài" để Duy gửi bài mới
                <ArrowUpRight className="ml-1.5 h-3.5 w-3.5" />
              </a>
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
