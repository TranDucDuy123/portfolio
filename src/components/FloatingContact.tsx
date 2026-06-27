import { Phone, MessageSquare, CornerDownLeft, Share2 } from "lucide-react";
import { socialConfig } from "../config/social";
import { useState } from "react";

export default function FloatingContact() {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col space-y-3 pointer-events-none">
      {/* Copy link share option */}
      <button
        onClick={handleCopyLink}
        className="pointer-events-auto w-12 h-12 rounded-full bg-white text-gray-700 shadow-xl border border-gray-100 flex items-center justify-center hover:bg-gray-50 active:scale-95 transition-all duration-200"
        title="Sao chép liên kết trang này"
        style={{ minWidth: "48px", minHeight: "48px" }}
      >
        {copied ? (
          <span className="text-[10px] font-bold text-green-600">Copied!</span>
        ) : (
          <Share2 className="h-5 w-5" />
        )}
      </button>

      {/* Zalo Button */}
      <a
        href={socialConfig.zalo}
        target="_blank"
        rel="noopener noreferrer"
        className="pointer-events-auto w-12 h-12 rounded-full bg-blue-600 text-white shadow-xl flex items-center justify-center hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all duration-200 group relative"
        title="Nhắn tin tư vấn qua Zalo"
        style={{ minWidth: "48px", minHeight: "48px" }}
      >
        <MessageSquare className="h-5 w-5 animate-pulse" />
        <span className="absolute right-14 bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
          Zalo: {socialConfig.phoneDisplay}
        </span>
      </a>

      {/* Hotline Button */}
      <a
        href={`tel:${socialConfig.phone}`}
        className="pointer-events-auto w-12 h-12 rounded-full bg-brand-primary text-white shadow-xl flex items-center justify-center hover:bg-brand-secondary hover:scale-105 active:scale-95 transition-all duration-200 group relative"
        title="Gọi điện tư vấn trực tiếp"
        style={{ minWidth: "48px", minHeight: "48px" }}
      >
        <Phone className="h-5 w-5" />
        <span className="absolute right-14 bg-brand-primary text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
          Hotline: {socialConfig.phoneDisplay}
        </span>
      </a>
    </div>
  );
}
