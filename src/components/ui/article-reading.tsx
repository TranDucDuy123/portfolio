// Công cụ đọc bài: thanh tiến độ đỏ mảnh trên đỉnh màn hình và mục lục dính theo khi cuộn.
// Mục lục lấy từ headingsOf() nên id khớp đúng với tiêu đề trong thân bài (markdownToHtml).
import { useEffect, useState, type RefObject } from "react";
import { ChevronDown, ListOrdered } from "lucide-react";
import type { MdHeading } from "../../lib/markdown";
import { cn } from "../../lib/utils";

/** Thanh đỏ mảnh trên cùng, dài theo phần thân bài đã đọc. */
export function ReadingProgress({ target }: { target: RefObject<HTMLElement | null> }) {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = target.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight * 0.6;
      setPct(Math.max(0, Math.min(1, total > 0 ? -r.top / total : 1)));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [target]);
  return (
    <div aria-hidden="true" className="fixed inset-x-0 top-0 z-[60] h-[3px] bg-transparent">
      <div className="h-full origin-left bg-brand-primary transition-transform duration-100" style={{ transform: `scaleX(${pct})` }} />
    </div>
  );
}

/** Mục lục: liệt kê mục lớn, tô đỏ mục đang đọc. Ẩn khi bài có ít hơn 3 mục.
 *  collapsible: gập lại thành một dòng (dùng trên điện thoại để không đẩy thân bài xuống xa). */
export function ArticleToc({ headings, className, collapsible = false }: { headings: MdHeading[]; className?: string; collapsible?: boolean }) {
  const [active, setActive] = useState(headings[0]?.id ?? "");
  const top = headings.length ? Math.min(...headings.map((h) => h.level)) : 2;

  useEffect(() => {
    if (headings.length < 3) return;
    // Mục đang đọc = tiêu đề cuối cùng đã lướt qua mép dưới header (cộng chút khoảng đệm)
    let raf = 0;
    const update = () => {
      raf = 0;
      let current = headings[0].id;
      for (const h of headings) {
        const el = document.getElementById(h.id);
        if (el && el.getBoundingClientRect().top < 160) current = h.id;
      }
      setActive(current);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [headings]);

  if (headings.length < 3) return null;
  const label = (
    <>
      <ListOrdered className="h-4 w-4 text-brand-primary" aria-hidden="true" />
      Mục lục
      {collapsible && <span className="ml-auto text-xs font-medium normal-case tracking-normal text-gray-400">{headings.length} mục</span>}
    </>
  );
  const list = (
      <ol className={cn("space-y-0.5 border-l border-gray-200", collapsible ? "mt-3" : "max-h-[45vh] overflow-y-auto")}>
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(h.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                history.replaceState(null, "", `#${h.id}`);
                setActive(h.id);
              }}
              className={cn(
                "-ml-px block border-l-2 py-1.5 pr-1 text-[13px] leading-snug transition-colors",
                h.level > top ? "pl-6 text-gray-500" : "pl-3 text-gray-700",
                active === h.id ? "border-brand-primary font-semibold text-brand-primary" : "border-transparent hover:text-brand-primary",
              )}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ol>
  );
  const box = "rounded-2xl border border-gray-200 bg-white";
  const head = "flex items-center gap-2 font-display text-sm font-bold uppercase tracking-wider text-brand-dark";
  if (collapsible) {
    return (
      <nav aria-label="Mục lục bài viết" className={className}>
        <details className={cn(box, "group px-5 py-4")}>
          <summary className={cn(head, "cursor-pointer list-none [&::-webkit-details-marker]:hidden")}>
            {label}
            <ChevronDown className="h-4 w-4 text-gray-400 transition-transform group-open:rotate-180" aria-hidden="true" />
          </summary>
          {list}
        </details>
      </nav>
    );
  }
  return (
    <nav aria-label="Mục lục bài viết" className={cn(box, "p-5", className)}>
      <p className={cn(head, "mb-3")}>{label}</p>
      {list}
    </nav>
  );
}
