import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ArrowUpRight, BookOpen, PlayCircle, ListChecks, UserRound, BriefcaseBusiness } from "lucide-react";
import { socialConfig } from "../config/social";
import { LiquidNavbar, type NimbusFx } from "./ui/liquid-glass-navbar";

const iconProps = { size: 18, strokeWidth: 1.8, "aria-hidden": true } as const;

// Màn lg (1024–1279px) không đủ chỗ cho cả chữ: menu nước chỉ hiện icon
function useWideNav() {
  const query = "(min-width: 1280px)";
  const [wide, setWide] = useState(() => typeof window !== "undefined" && window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setWide(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return wide;
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const wideNav = useWideNav();

  // Mỗi mục gom các trang cũ liên quan để menu gọn, link cũ vẫn sống
  const navigation = [
    { name: "Kiến thức", href: "/kien-thuc", match: ["/kien-thuc", "/cafe-so", "/blog"], icon: <BookOpen {...iconProps} />, fx: "glow" as NimbusFx },
    { name: "Video", href: "/videos", match: ["/videos"], icon: <PlayCircle {...iconProps} />, fx: "spin" as NimbusFx },
    { name: "Checklist", href: "/resources", match: ["/resources"], icon: <ListChecks {...iconProps} />, fx: "drop" as NimbusFx },
    { name: "Về Duy", href: "/about", match: ["/about"], icon: <UserRound {...iconProps} />, fx: "wave" as NimbusFx },
    { name: "Làm việc cùng Duy", href: "/services", match: ["/services", "/bao-gia", "/pricing", "/connect", "/solutions", "/case-study", "/projects"], icon: <BriefcaseBusiness {...iconProps} />, fx: "pop" as NimbusFx }
  ];

  const isActive = (paths: string[]) =>
    paths.some((path) => location.pathname.startsWith(path));

  // Trang chủ hoặc trang ngoài menu: -1, giọt nước ẩn
  const activeIndex = navigation.findIndex((item) => isActive(item.match));

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo & Brand Identity */}
          <div className="flex-shrink-0 flex flex-col justify-center">
            {/* Logo ngang bản nền sáng, giữ đúng tỉ lệ và vùng trống của bộ nhận diện */}
            <Link to="/" className="flex flex-col items-start gap-1 group" aria-label="Duy Web, về trang chủ">
              <img
                src="/brand/duyweb-lockup-horizontal-light.svg"
                alt="Duy Web"
                width={168}
                height={36}
                className="h-8 sm:h-9 w-auto transition-opacity group-hover:opacity-85"
              />
              <span className="hidden sm:block text-[10px] font-medium tracking-[0.04em] text-gray-500 leading-none pl-[2px]">
                Chuyện web cho chủ doanh nghiệp
              </span>
            </Link>
          </div>

          {/* Desktop Navigation: thanh menu "nước" (WebGL, tự lùi về CSS nếu máy không hỗ trợ) */}
          <div className="hidden lg:flex rounded-full bg-gradient-to-r from-neutral-100 via-white to-red-50">
            <LiquidNavbar
              tone="light"
              compact={!wideNav}
              active={activeIndex}
              onNavigate={(href) => navigate(href)}
              items={navigation.map((item) => ({ label: item.name, href: item.href, icon: item.icon, fx: item.fx }))}
              style={{ fontFamily: "inherit" }}
            />
          </div>

          {/* Call to Action Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <a
              href={socialConfig.zalo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-sm text-xs font-bold uppercase tracking-widest text-white bg-brand-dark hover:bg-brand-primary transition-colors duration-200"
            >
              Nhắn Duy qua Zalo
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
                  isActive(item.match)
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
                Nhắn Duy qua Zalo
                <ArrowUpRight className="ml-1.5 h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
