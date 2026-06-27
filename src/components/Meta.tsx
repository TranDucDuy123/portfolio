import { useEffect } from "react";

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
  keywords = ["đức duy web", "tài sản số", "thiết kế website", "tối ưu seo", "digital asset hub", "seo tphcm", "profile doanh nghiep"],
  ogImage = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
  slug = ""
}: MetaProps) {
  useEffect(() => {
    // Dynamic document title update
    const baseTitle = "Đức Duy Web";
    document.title = title ? `${title} | ${baseTitle}` : `${baseTitle} - Digital Asset Hub`;

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
      "og:title": title ? `${title} | ${baseTitle}` : `${baseTitle} - Digital Asset Hub`,
      "og:description": description,
      "og:image": ogImage,
      "og:url": `https://ducduyweb.vn${slug ? `/${slug}` : ""}`,
      "og:type": "website",
      "twitter:title": title ? `${title} | ${baseTitle}` : `${baseTitle} - Digital Asset Hub`,
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
