import type { MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import DoodleCrewFooter, { type CrewMember } from "./ui/doodle-crew-footer";
import { socialConfig } from "../config/social";

// Chữ lớn "ĐỨC DUY WEB": vị trí ký tự Đ0 Ứ1 C2 _3 D4 U5 Y6 _7 W8 E9 B10.
// Không cho ai ngồi trên Ứ vì dấu móc + sắc sẽ đè lên nhân vật.
const crew: CrewMember[] = [
  { kind: "yeti", letter: 0, seat: "front", offset: -0.34, name: "Bé Gấu", says: "Web chậm là khách bỏ đi đó!" },
  { kind: "bird", letter: 2, seat: "top", offset: 0.02, name: "Chim Sẻ", says: "Ghé Zalo hỏi Duy nha!" },
  { kind: "kid", letter: 4, seat: "top", offset: -0.05, name: "Bé Duy", says: "Ngồi đây thấy hết Google!" },
  { kind: "ghost", letter: 6, seat: "behind", offset: 0, name: "Ma Hosting", says: "Hù! Tên miền sắp hết hạn chưa?" },
  { kind: "mushroom", letter: 8, seat: "front", offset: 0.1, scale: 0.95, name: "Nấm SEO", says: "Mình mọc từ từ, nhưng bền." },
  { kind: "cat", letter: 10, seat: "front", offset: 0.42, flip: true, name: "Mèo Mướp", says: "Meo… xem bảng giá chưa?" },
];

export default function Footer() {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  // Link nội bộ trong footer đi qua react-router, không tải lại trang
  const onClickCapture = (e: MouseEvent<HTMLDivElement>) => {
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = (e.target as HTMLElement).closest("a");
    const href = a?.getAttribute("href");
    if (!href || !href.startsWith("/") || /\.(txt|xml)$/.test(href)) return;
    e.preventDefault();
    navigate(href);
  };

  return (
    <div onClickCapture={onClickCapture}>
      <DoodleCrewFooter
        wordmark="Đức Duy Web"
        brand="Duy Web"
        logo={<img src="/brand/duyweb-mark-red-bright.svg" alt="" width={40} height={40} />}
        blurb="Mình là Đức Duy, người làm web. Ở đây mình kể lại chuyện web, SEO, tên miền, hosting bằng lời dễ hiểu, để chủ doanh nghiệp tự quyết định đúng mà không cần biết code."
        tagline="Chuyện web cho chủ doanh nghiệp: đất của mình, không phải đất thuê."
        columns={[
          {
            title: "Đọc & dùng thử",
            links: [
              { label: "Thư viện kiến thức", href: "/kien-thuc" },
              { label: "Cafe Số: hiểu web trong 5 phút", href: "/cafe-so" },
              { label: "Blog chiến lược & SEO", href: "/blog" },
              { label: "Checklist tự kiểm tra website", href: "/resources" },
            ],
          },
          {
            title: "Làm việc cùng Duy",
            links: [
              { label: "Mình làm những gì", href: "/services" },
              { label: "Bảng giá tham khảo", href: "/bao-gia" },
              { label: "Về Duy", href: "/about" },
              { label: "Liên hệ trực tiếp", href: "/connect" },
            ],
          },
          {
            title: "Liên hệ",
            links: [
              { label: socialConfig.phoneDisplay, href: `tel:${socialConfig.phone}` },
              { label: socialConfig.email, href: `mailto:${socialConfig.email}` },
              { label: socialConfig.address },
            ],
          },
        ]}
        actions={[
          { label: "Xem bảng giá", href: "/bao-gia", icon: "star", variant: "outline" },
          { label: "Nhắn Duy qua Zalo", href: socialConfig.zalo, icon: "bolt", variant: "solid" },
        ]}
        copyright={`© ${currentYear} Đức Duy Web. Thiết kế và code bởi Đức Duy.`}
        legal={[
          { label: "Robots.txt", href: "/robots.txt" },
          { label: "Sitemap.xml", href: "/sitemap.xml" },
        ]}
        socials={[
          { label: "Facebook", href: socialConfig.facebookPersonal },
          { label: "YouTube", href: socialConfig.youtube },
          { label: "Zalo", href: socialConfig.zalo },
        ]}
        backToTopLabel="Lên đầu trang"
        crew={crew}
        preset="night"
        palette={{ background: "#000000", ink: "#F5F2F1", accent: "#FF0000" }}
        serifFamily='"Inter", ui-sans-serif, system-ui, sans-serif'
        height="720px"
      />
    </div>
  );
}
