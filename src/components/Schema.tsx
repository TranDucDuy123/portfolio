import { useEffect } from "react";

interface SchemaProps {
  type: "LocalBusiness" | "Article" | "FAQ" | "Project" | "CaseStudy" | "BreadcrumbList";
  data: Record<string, any>;
}

export default function Schema({ type, data }: SchemaProps) {
  useEffect(() => {
    // Generate unique ID for this script to avoid duplicating schemas on page navigate
    const scriptId = `schema-${type}-${data.id || data.slug || "global"}`;
    
    // Check if script already exists
    let script = document.getElementById(scriptId) as HTMLScriptElement;
    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }

    let schemaObject: Record<string, any> = {};

    if (type === "LocalBusiness") {
      schemaObject = {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "name": "Đức Duy Web",
        "image": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
        "@id": "https://ducduyweb.vn/#localbusiness",
        "url": "https://ducduyweb.vn",
        "telephone": data.telephone || "0909123456",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Quận 1",
          "addressLocality": "Thành phố Hồ Chí Minh",
          "addressCountry": "VN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 10.7769,
          "longitude": 106.7009
        },
        "sameAs": [
          data.facebookPersonal || "https://facebook.com/ducduy.web",
          data.facebookFanpage || "https://facebook.com/ducduyweb.hub",
          data.youtube || "https://youtube.com/@ducduyweb"
        ],
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
          ],
          "opens": "08:00",
          "closes": "18:00"
        }
      };
    } else if (type === "Article") {
      schemaObject = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": data.title,
        "image": data.image || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
        "datePublished": data.date || "2026-06-25",
        "description": data.summary,
        "author": {
          "@type": "Person",
          "name": "Đức Duy"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Đức Duy Web",
          "logo": {
            "@type": "ImageObject",
            "url": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
          }
        },
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `https://ducduyweb.vn/cafe-so/${data.slug}`
        }
      };
    } else if (type === "FAQ") {
      schemaObject = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": (data.questions || []).map((q: any) => ({
          "@type": "Question",
          "name": q.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": q.answer
          }
        }))
      };
    } else if (type === "Project") {
      schemaObject = {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        "name": data.title,
        "description": data.description,
        "genre": data.categoryLabel,
        "audience": {
          "@type": "Audience",
          "audienceType": data.industry
        },
        "creator": {
          "@type": "Organization",
          "name": "Đức Duy Web"
        }
      };
    } else if (type === "CaseStudy") {
      schemaObject = {
        "@context": "https://schema.org",
        "@type": "TechArticle",
        "headline": data.title,
        "description": data.background,
        "genre": "Digital Consulting Case Study",
        "dependencies": data.suggestedFeatures ? data.suggestedFeatures.join(", ") : "",
        "author": {
          "@type": "Organization",
          "name": "Đức Duy Web"
        }
      };
    } else if (type === "BreadcrumbList") {
      schemaObject = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": (data.items || []).map((item: any, idx: number) => ({
          "@type": "ListItem",
          "position": idx + 1,
          "name": item.name,
          "item": `https://ducduyweb.vn${item.url}`
        }))
      };
    }

    script.textContent = JSON.stringify(schemaObject, null, 2);

    // Clean up on unmount to prevent head bloat
    return () => {
      const activeScript = document.getElementById(scriptId);
      if (activeScript) {
        activeScript.remove();
      }
    };
  }, [type, data]);

  return null;
}
