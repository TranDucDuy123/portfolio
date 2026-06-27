import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ArrowUpRight, ShieldCheck } from "lucide-react";
import { socialConfig } from "../config/social";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Trang chủ", href: "/" },
    { name: "Dịch vụ số", href: "/services" },
    { name: "Case Study", href: "/case-study" },
    { name: "Ngành", href: "/solutions" },
    { name: "Dự án", href: "/projects" },
    { name: "Cafe Số", href: "/cafe-so" },
    { name: "Blog", href: "/blog" },
    { name: "Tài nguyên", href: "/resources" },
    { name: "Giới thiệu", href: "/about" },
    { name: "Kết nối", href: "/connect" }
  ];

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo & Brand Identity */}
          <div className="flex-shrink-0 flex flex-col justify-center">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-brand-primary flex items-center justify-center rounded-sm transition-all duration-300 transform group-hover:bg-brand-secondary group-hover:rotate-12 flex-shrink-0 shadow-sm">
                <div className="w-5 h-5 border-2 border-white rotate-45"></div>
              </div>
              <div className="flex flex-col">
                <span className="font-display font-black text-xl tracking-tighter leading-none uppercase text-brand-dark group-hover:text-brand-primary transition-colors">
                  Đức Duy Web
                </span>
                <span className="text-[9px] uppercase font-mono tracking-[0.2em] text-gray-500 font-bold leading-none mt-0.5">
                  Digital Asset Hub
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-1.5 rounded-sm text-xs font-bold uppercase tracking-wider transition-all duration-150 border-b-2 ${
                  isActive(item.href)
                    ? "text-brand-primary border-brand-primary bg-brand-primary/5 font-bold"
                    : "text-gray-600 border-transparent hover:text-brand-primary hover:bg-gray-50/50"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Call to Action Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <a
              href={socialConfig.zalo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-sm text-xs font-bold uppercase tracking-widest text-white bg-brand-dark hover:bg-brand-primary transition-colors duration-200"
            >
              Tư vấn ngay
              <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2.5 rounded-lg text-gray-500 hover:text-brand-primary hover:bg-gray-50 focus:outline-hidden"
              aria-controls="mobile-menu"
              aria-expanded="false"
              style={{ minWidth: "44px", minHeight: "44px" }} // accessibility target size
            >
              <span className="sr-only">Mở menu chính</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden animate-fade-in bg-white border-b border-gray-100" id="mobile-menu">
          <div className="px-2 pt-2 pb-6 space-y-1 sm:px-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-sm text-sm font-bold uppercase tracking-wider transition-all ${
                  isActive(item.href)
                    ? "text-brand-primary bg-brand-primary/5 font-bold border-l-4 border-brand-primary pl-3"
                    : "text-gray-600 hover:text-brand-primary hover:bg-gray-50"
                }`}
                style={{ minHeight: "44px" }}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 pb-2 px-4 border-t border-gray-100">
              <a
                href={socialConfig.zalo}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center px-4 py-3.5 rounded-sm text-xs font-bold uppercase tracking-widest text-white bg-brand-dark hover:bg-brand-primary transition-all shadow-sm"
                style={{ minHeight: "44px" }}
              >
                Tư vấn tài sản số qua Zalo
                <ArrowUpRight className="ml-1.5 h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
