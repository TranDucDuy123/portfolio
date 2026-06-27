import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import Schema from "./Schema";

interface BreadcrumbItem {
  name: string;
  url: string;
}

export default function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  if (pathnames.length === 0) return null;

  // Custom mapping for Vietnamese translations of our routes
  const routeNameMap: Record<string, string> = {
    "about": "Giới thiệu",
    "cafe-so": "Cafe Số",
    "case-study": "Thư viện Case Study",
    "projects": "Dự án",
    "solutions": "Giải pháp ngành",
    "blog": "Blog",
    "resources": "Tài nguyên tải về",
    "connect": "Cổng kết nối",
    "services": "Giải pháp tài sản số",
    
    // Sub-routes or tags (optional, generic translation if not matched)
    "quang-cao": "Ngành Quảng cáo",
    "da-hoa-cuong": "Ngành Đá hoa cương",
    "bida": "Ngành Bida",
    "thu-cung": "Ngành Thú cưng",
    "noi-that": "Ngành Nội thất"
  };

  const breadcrumbs: BreadcrumbItem[] = [
    { name: "Trang chủ", url: "/" }
  ];

  let currentUrl = "";
  pathnames.forEach((p) => {
    currentUrl += `/${p}`;
    breadcrumbs.push({
      name: routeNameMap[p] || p.charAt(0).toUpperCase() + p.slice(1).replace(/-/g, " "),
      url: currentUrl
    });
  });

  return (
    <div className="bg-brand-light border-b border-gray-100 py-3 px-4 sm:px-6 lg:px-8">
      <nav className="max-w-7xl mx-auto flex items-center space-x-2 text-sm font-medium text-gray-500">
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1;

          return (
            <div key={crumb.url} className="flex items-center">
              {index > 0 && <ChevronRight className="h-4 w-4 text-gray-400 mx-2 flex-shrink-0" />}
              {isLast ? (
                <span className="text-brand-primary font-semibold truncate max-w-[200px] sm:max-w-none">
                  {crumb.name}
                </span>
              ) : (
                <Link
                  to={crumb.url}
                  className="flex items-center text-gray-600 hover:text-brand-secondary transition-colors duration-150"
                >
                  {index === 0 && <Home className="h-4 w-4 mr-1 flex-shrink-0" />}
                  <span>{crumb.name}</span>
                </Link>
              )}
            </div>
          );
        })}
      </nav>

      {/* Render Breadcrumb Structured Data */}
      <Schema type="BreadcrumbList" data={{ items: breadcrumbs }} />
    </div>
  );
}
