import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { isServer, ssrStore } from "../lib/ssr";

// Link không tồn tại: báo rõ cho người đọc, và không cho Google lập chỉ mục trang này.
// Bản dựng sẵn của trang này là dist/404.html, Vercel trả kèm mã 404.
export default function NotFound() {
  if (isServer) {
    ssrStore.meta = {
      title: "Không tìm thấy trang | Đức Duy Web",
      description: "Trang bạn tìm không còn hoặc chưa từng có trên duyweb.info.vn.",
      keywords: [],
      ogImage: "https://duyweb.info.vn/og-image.jpg",
      canonical: "",
      noindex: true,
    };
  }

  useEffect(() => {
    document.title = "Không tìm thấy trang | Đức Duy Web";
    let tag = document.querySelector<HTMLMetaElement>("meta[name='robots']");
    if (!tag) {
      tag = document.createElement("meta");
      tag.name = "robots";
      document.head.appendChild(tag);
    }
    const previous = tag.content;
    tag.content = "noindex, follow";
    return () => {
      if (tag) tag.content = previous;
    };
  }, []);

  const links = [
    { to: "/kien-thuc", label: "Thư viện kiến thức" },
    { to: "/services", label: "Mình làm những gì" },
    { to: "/bao-gia", label: "Bảng giá tham khảo" },
  ];

  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 py-24 text-center">
      <p className="text-sm font-mono font-bold text-brand-primary">404</p>
      <h1 className="font-display font-black text-3xl sm:text-4xl text-brand-dark mt-3">Không tìm thấy trang này</h1>
      <p className="text-gray-600 mt-4 leading-relaxed">
        Trang bạn mở không còn hoặc chưa từng có. Có thể link đã đổi sau khi mình sắp xếp lại site.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link to="/" className="inline-flex items-center rounded-sm bg-brand-primary hover:bg-brand-secondary text-white px-5 py-3 text-xs font-bold uppercase tracking-wider">
          Về trang chủ <ArrowRight className="h-4 w-4 ml-2" />
        </Link>
        {links.map((l) => (
          <Link key={l.to} to={l.to} className="inline-flex items-center rounded-sm border border-gray-300 hover:border-brand-primary hover:text-brand-primary px-5 py-3 text-xs font-bold uppercase tracking-wider text-gray-700">
            {l.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
