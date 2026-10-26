import { useEffect } from "react";

const SITE_URL = "https://duyweb.info.vn";

interface MetaProps {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  slug?: string;
}

export default function Meta({
  title,
  description,
  keywords = ["đức duy web", "tài sản số", "thiết kế website", "tối ưu seo", "chuyện web cho chủ doanh nghiệp", "seo tphcm", "profile doanh nghiep"],
  ogImage = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
  slug = ""
}: MetaProps) {
  useEffect(() => {
    // Dynamic document title update
    const baseTitle = "Đức Duy Web";
    // Tiêu đề đã có sẵn tên thương hiệu thì không gắn thêm, tránh "… - Đức Duy Web | Đức Duy Web"
    const fullTitle = !title
      ? `${baseTitle} - Chuyện web cho chủ doanh nghiệp`
      : title.includes(baseTitle) ? title : `${title} | ${baseTitle}`;
    document.title = fullTitle;

    // Canonical theo đúng trang đang xem; index.html chỉ có canonical của trang chủ
    const path = slug ? `/${slug}` : window.location.pathname.replace(/\/+$/, "");
    const pageUrl = `${SITE_URL}${path || "/"}`;
    let canonical = document.querySelector("link[rel='canonical']");
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", pageUrl);

    // Update Meta Description
    let metaDescription = document.querySelector("meta[name='description']");
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute("content", description);

    // Update Meta Keywords
    let metaKeywords = document.querySelector("meta[name='keywords']");
    if (!metaKeywords) {
      metaKeywords = document.createElement("meta");
      metaKeywords.setAttribute("name", "keywords");
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute("content", keywords.join(", "));

    // Update Open Graph (OG) tags
    const ogTags = {
      "og:title": fullTitle,
      "og:description": description,
      "og:image": ogImage,
      "og:url": pageUrl,
      "og:type": "website",
      "twitter:title": fullTitle,
      "twitter:description": description,
      "twitter:image": ogImage,
      "twitter:card": "summary_large_image"
    };

    Object.entries(ogTags).forEach(([property, value]) => {
      let tag = document.querySelector(`meta[property='${property}']`) || document.querySelector(`meta[name='${property}']`);
      if (!tag) {
        tag = document.createElement("meta");
        if (property.startsWith("og:")) {
          tag.setAttribute("property", property);
        } else {
          tag.setAttribute("name", property);
        }
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", value);
    });
  }, [title, description, keywords, ogImage, slug]);

  return null; // Side-effect only component
}
