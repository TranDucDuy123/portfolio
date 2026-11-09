// Lưới bài nổi bật: 1 thẻ lớn + 2 thẻ nhỏ (dựa trên mẫu "blog-posts" của 21st.dev, chỉnh cho Duy Web).
// Khác mẫu: mỗi thẻ là <Link> thật (Google đọc được link, mở tab mới được), không có số sao và lượt xem
// vì site không có dữ liệu đó; nền thẻ dựng theo bộ nhận diện vì ảnh bìa của site đã in sẵn tiêu đề.
import { Link } from "react-router-dom";
import { ArrowRight, Clock } from "lucide-react";
import { cn } from "../../lib/utils";

export interface FeaturedPost {
  id: string | number;
  title: string;
  category: string;
  href: string;
  /** Ảnh nền thật (ảnh chụp, không có chữ). Bỏ trống thì dùng nền thương hiệu. */
  imageUrl?: string;
  readTime?: string;
  date?: string;
  summary?: string;
  className?: string;
}

interface FeaturedPostsProps {
  title: string;
  description?: string;
  backgroundLabel?: string;
  backgroundPosition?: "left" | "right";
  posts?: FeaturedPost[];
  className?: string;
}

const viDate = (d?: string) => (d && /^\d{4}-\d{2}-\d{2}/.test(d) ? d.slice(0, 10).split("-").reverse().join("/") : "");

export function FeaturedPosts({ title, description, backgroundLabel, backgroundPosition = "left", posts = [], className }: FeaturedPostsProps) {
  if (!posts.length) return null;
  return (
    <section className={cn("relative isolate overflow-hidden py-10", className)}>
      {backgroundLabel && (
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute -top-6 -z-10 select-none font-display font-black leading-none text-brand-dark/[0.035] text-[140px] md:text-[220px] lg:text-[300px]",
            backgroundPosition === "left" ? "-left-6" : "-right-6",
          )}
        >
          {backgroundLabel}
        </span>
      )}

      <h2 className="font-display font-black text-3xl md:text-4xl text-brand-dark tracking-tight">{title}</h2>
      {description && <p className="mt-3 max-w-2xl text-base md:text-lg leading-relaxed text-gray-600">{description}</p>}

      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 md:auto-rows-[260px] lg:grid-cols-[1fr_0.62fr]">
        {posts.slice(0, 3).map((post, index) => {
          const primary = index === 0;
          const meta = [viDate(post.date), post.readTime && `${post.readTime} đọc`].filter(Boolean).join(" · ");
          return (
            <Link
              key={post.id}
              to={post.href}
              className={cn(
                "group relative isolate flex min-h-[260px] flex-col justify-end overflow-hidden rounded-[20px] bg-brand-dark p-6 text-white transition-transform duration-300 hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-primary",
                primary && "md:col-span-2 md:row-span-2 lg:col-span-1 md:p-8",
                post.className,
              )}
            >
              {post.imageUrl ? (
                <img src={post.imageUrl} alt="" loading="lazy" className="absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              ) : (
                <>
                  {/* Nền thương hiệu: quầng đỏ, lưới mờ, chữ Đ mờ góc phải */}
                  <span aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(80%_70%_at_85%_30%,rgba(188,2,2,0.55),transparent_70%),linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[length:auto,32px_32px,32px_32px]" />
                  <img
                    src="/brand/duyweb-mark-red-bright.svg"
                    alt=""
                    aria-hidden="true"
                    className={cn("absolute -z-10 opacity-20 transition-transform duration-500 group-hover:scale-105", primary ? "-right-10 -top-6 w-72 md:w-96" : "-right-6 -top-6 w-44")}
                  />
                </>
              )}
              <span aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

              <span className="w-fit rounded-md bg-white/15 px-2 py-0.5 text-xs font-semibold uppercase tracking-wider backdrop-blur-sm">{post.category}</span>
              <h3 className={cn("mt-3 font-display font-bold leading-snug", primary ? "text-2xl md:text-3xl lg:text-4xl" : "text-lg md:text-xl")}>{post.title}</h3>
              {primary && post.summary && <p className="mt-3 max-w-xl text-sm md:text-base leading-relaxed text-white/75 line-clamp-3">{post.summary}</p>}
              <div className="mt-4 flex items-center justify-between gap-3 text-sm text-white/70">
                <span className="inline-flex items-center gap-1.5">
                  {meta && <Clock className="h-4 w-4" aria-hidden="true" />}
                  {meta}
                </span>
                <ArrowRight className="h-6 w-6 text-white transition-transform duration-300 group-hover:translate-x-1.5" strokeWidth={1.75} aria-hidden="true" />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

// Giữ tên xuất như mẫu gốc để dùng được theo ví dụ của 21st.dev
export const Component = FeaturedPosts;
