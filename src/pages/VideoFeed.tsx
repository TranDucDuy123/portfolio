import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, ChevronDown, ChevronUp, MessageCircle, Pause, Play, Share2, Volume2, VolumeX } from "lucide-react";
import Meta from "../components/Meta";
import { socialConfig } from "../config/social";
import { videoFeed, VideoFeedItem } from "../data/videoFeed";

// Gửi lệnh cho iframe YouTube (cần enablejsapi=1 trong src)
function ytCommand(iframe: HTMLIFrameElement | null, func: string) {
  iframe?.contentWindow?.postMessage(JSON.stringify({ event: "command", func, args: [] }), "*");
}

function embedUrl(id: string) {
  const params = new URLSearchParams({
    enablejsapi: "1",
    autoplay: "1",
    mute: "1",
    playsinline: "1",
    controls: "0",
    loop: "1",
    playlist: id, // loop chỉ chạy khi có playlist trùng id
    rel: "0",
    modestbranding: "1",
    origin: window.location.origin
  });
  return `https://www.youtube-nocookie.com/embed/${id}?${params}`;
}

export default function VideoFeed() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [muted, setMuted] = useState(true);
  const totalSlides = videoFeed.length + 1; // +1 thẻ kết thúc

  // Slide nào chiếm phần lớn màn hình thì là slide đang xem
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.index));
        });
      },
      { root: scrollerRef.current, threshold: 0.6 }
    );
    slideRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Mở link chia sẻ dạng /video#ma-video thì nhảy thẳng tới video đó
  useEffect(() => {
    const index = videoFeed.findIndex((v) => `#${v.id}` === window.location.hash);
    if (index > 0) slideRefs.current[index]?.scrollIntoView();
  }, []);

  const goTo = useCallback((index: number) => {
    const target = slideRefs.current[Math.max(0, Math.min(totalSlides - 1, index))];
    target?.scrollIntoView({ behavior: "smooth" });
  }, [totalSlides]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "PageDown") { e.preventDefault(); goTo(active + 1); }
      if (e.key === "ArrowUp" || e.key === "PageUp") { e.preventDefault(); goTo(active - 1); }
      if (e.key === "m") setMuted((m) => !m);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, goTo]);

  return (
    <div className="fixed inset-0 bg-neutral-950 text-white">
      <Meta
        title="Video ngắn về web cho chủ doanh nghiệp"
        description="Lướt video ngắn giải thích website, tên miền, hosting, Google Maps, SEO cho chủ doanh nghiệp."
        slug="video"
      />

      {/* Thanh trên cùng */}
      <div className="absolute top-0 inset-x-0 z-30 flex items-center justify-between px-4 py-3 bg-gradient-to-b from-black/70 to-transparent pointer-events-none">
        <Link to="/" className="pointer-events-auto inline-flex items-center gap-2 text-sm font-bold">
          <ArrowLeft className="h-4 w-4" />
          Đức Duy Web
        </Link>
        <button
          type="button"
          onClick={() => setMuted((m) => !m)}
          className="pointer-events-auto inline-flex items-center gap-2 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur px-3 py-2 text-xs font-bold cursor-pointer"
          aria-label={muted ? "Bật tiếng" : "Tắt tiếng"}
        >
          {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          {muted ? "Bật tiếng" : "Tắt tiếng"}
        </button>
      </div>

      {/* Chấm tiến độ (desktop) */}
      <div className="hidden lg:flex absolute right-6 top-1/2 -translate-y-1/2 z-30 flex-col gap-2">
        {Array.from({ length: totalSlides }).map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Tới video ${i + 1}`}
            className={`w-2 rounded-full transition-all cursor-pointer ${i === active ? "h-6 bg-brand-accent" : "h-2 bg-white/30 hover:bg-white/60"}`}
          />
        ))}
      </div>

      <div ref={scrollerRef} className="h-[100svh] overflow-y-auto snap-y snap-mandatory overscroll-contain [scrollbar-width:none]">
        {videoFeed.map((item, i) => (
          <section
            key={item.id}
            ref={(el) => { slideRefs.current[i] = el; }}
            data-index={i}
            className="relative h-[100svh] snap-start snap-always flex items-center justify-center lg:gap-10"
          >
            <VideoSlide item={item} isActive={i === active} shouldMount={Math.abs(i - active) <= 1} muted={muted} onUnmute={() => setMuted(false)} />
            {i === 0 && active === 0 && (
              <button
                type="button"
                onClick={() => goTo(1)}
                className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 hidden lg:inline-flex flex-col items-center text-xs text-white/70 animate-bounce cursor-pointer"
              >
                Lướt để xem tiếp
                <ChevronDown className="h-4 w-4" />
              </button>
            )}
          </section>
        ))}

        {/* Thẻ kết thúc */}
        <section
          ref={(el) => { slideRefs.current[videoFeed.length] = el; }}
          data-index={videoFeed.length}
          className="h-[100svh] snap-start snap-always flex items-center justify-center px-6"
        >
          <div className="max-w-md text-center">
            <p className="text-xs font-mono uppercase tracking-[0.25em] text-brand-accent">Hết video rồi</p>
            <h2 className="font-display font-black text-3xl uppercase mt-3 leading-tight">Muốn hỏi riêng về web của bạn?</h2>
            <p className="mt-4 text-white/70 text-sm leading-relaxed">
              Gửi Duy link website hoặc kể mình nghe bạn đang kinh doanh gì. Mình sẽ góp ý nên làm gì trước.
            </p>
            <div className="mt-8 flex flex-col gap-3">
              <a
                href={socialConfig.zalo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-brand-primary hover:bg-brand-secondary px-6 py-3.5 text-sm font-bold"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Nhắn Duy qua Zalo
              </a>
              <Link to="/kien-thuc" className="inline-flex items-center justify-center rounded-full border border-white/30 hover:bg-white/10 px-6 py-3.5 text-sm font-bold">
                <BookOpen className="h-4 w-4 mr-2" />
                Đọc thư viện kiến thức
              </Link>
              <button type="button" onClick={() => goTo(0)} className="text-xs text-white/60 hover:text-white mt-2 cursor-pointer">
                <ChevronUp className="h-4 w-4 inline mr-1" />
                Xem lại từ đầu
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

interface VideoSlideProps {
  item: VideoFeedItem;
  isActive: boolean;
  shouldMount: boolean; // chỉ tạo iframe cho video đang xem và 2 video kề bên để trang nhẹ
  muted: boolean;
  onUnmute: () => void;
}

function VideoSlide({ item, isActive, shouldMount, muted, onUnmute }: VideoSlideProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [paused, setPaused] = useState(false);
  const [expanded, setExpanded] = useState(false);

  // Player YouTube cần chút thời gian mới nhận lệnh, nên gửi lại vài lần
  const sync = useCallback(() => {
    const apply = () => {
      if (isActive && !paused) ytCommand(iframeRef.current, "playVideo");
      else ytCommand(iframeRef.current, "pauseVideo");
      ytCommand(iframeRef.current, muted ? "mute" : "unMute");
    };
    apply();
    const timers = [400, 1200, 2500].map((ms) => window.setTimeout(apply, ms));
    return () => timers.forEach(clearTimeout);
  }, [isActive, paused, muted]);

  useEffect(() => sync(), [sync]);
  useEffect(() => { if (!isActive) { setPaused(false); setExpanded(false); } }, [isActive]);

  const share = async () => {
    const url = `${window.location.origin}/video#${item.id}`;
    try {
      if (navigator.share) await navigator.share({ title: item.hook, url });
      else await navigator.clipboard.writeText(url);
    } catch { /* người dùng huỷ chia sẻ */ }
  };

  return (
    <>
      {/* Khung video: toàn màn hình trên điện thoại, khung dọc 9:16 trên desktop */}
      <div className="absolute inset-0 lg:relative lg:inset-auto lg:h-[calc(100svh-4rem)] lg:aspect-[9/16] lg:rounded-2xl overflow-hidden bg-black lg:shadow-2xl">
        <img
          src={`https://i.ytimg.com/vi/${item.youtubeId}/hqdefault.jpg`}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-60 blur-sm scale-110"
        />
        {shouldMount && (
          <iframe
            ref={iframeRef}
            src={embedUrl(item.youtubeId)}
            title={item.hook}
            allow="autoplay; encrypted-media; picture-in-picture"
            onLoad={sync}
            className="absolute inset-0 w-full h-full"
          />
        )}
        {/* Lớp phủ trong suốt: bắt chạm để dừng/phát và để vuốt cuộn không bị iframe nuốt mất */}
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          className="absolute inset-0 z-10 cursor-pointer"
          aria-label={paused ? "Phát video" : "Dừng video"}
        >
          {paused && (
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-black/50 flex items-center justify-center">
              <Play className="h-7 w-7 ml-1" />
            </span>
          )}
        </button>

        {/* Nút bên phải kiểu TikTok (điện thoại) */}
        <div className="lg:hidden absolute right-3 bottom-40 z-20 flex flex-col items-center gap-5">
          <RailButton label="Hỏi Duy" href={socialConfig.zalo}><MessageCircle className="h-6 w-6" /></RailButton>
          {item.article && <RailButton label="Đọc bài" to={item.article.href}><BookOpen className="h-6 w-6" /></RailButton>}
          <RailButton label="Chia sẻ" onClick={share}><Share2 className="h-6 w-6" /></RailButton>
          {muted && <RailButton label="Bật tiếng" onClick={onUnmute}><VolumeX className="h-6 w-6" /></RailButton>}
        </div>

        {/* Nội dung phủ dưới video (điện thoại) */}
        <div className="lg:hidden absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/90 via-black/60 to-transparent px-4 pr-20 pt-16 pb-6 max-h-[75%] overflow-y-auto">
          <ContentHeader item={item} />
          <button
            type="button"
            onClick={() => setExpanded((e) => !e)}
            className="mt-3 inline-flex items-center text-xs font-bold text-white/80 cursor-pointer"
          >
            {expanded ? "Thu gọn" : "Xem ý chính"}
            {expanded ? <ChevronDown className="h-4 w-4 ml-1" /> : <ChevronUp className="h-4 w-4 ml-1" />}
          </button>
          {expanded && <ContentBody item={item} />}
        </div>
      </div>

      {/* Bảng nội dung bên phải (desktop) */}
      <aside className="hidden lg:block w-[380px] max-h-[calc(100svh-4rem)] overflow-y-auto">
        <ContentHeader item={item} />
        <ContentBody item={item} />
        <div className="mt-8 flex gap-3">
          <a
            href={socialConfig.zalo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-full bg-brand-primary hover:bg-brand-secondary px-5 py-3 text-sm font-bold"
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            Hỏi Duy
          </a>
          <button type="button" onClick={share} className="inline-flex items-center rounded-full border border-white/30 hover:bg-white/10 px-5 py-3 text-sm font-bold cursor-pointer">
            <Share2 className="h-4 w-4 mr-2" />
            Chia sẻ
          </button>
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            className="inline-flex items-center justify-center rounded-full border border-white/30 hover:bg-white/10 w-12 cursor-pointer"
            aria-label={paused ? "Phát video" : "Dừng video"}
          >
            {paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
          </button>
        </div>
      </aside>
    </>
  );
}

function ContentHeader({ item }: { item: VideoFeedItem }) {
  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-brand-primary px-3 py-1 text-[11px] font-bold uppercase tracking-wider">{item.topic}</span>
        <span className="rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold">Dành cho: {item.audience}</span>
      </div>
      <h2 className="font-display font-black text-xl lg:text-3xl leading-tight mt-3">{item.hook}</h2>
    </div>
  );
}

function ContentBody({ item }: { item: VideoFeedItem }) {
  const [answer, setAnswer] = useState<string | null>(null);

  return (
    <div className="mt-4 space-y-5">
      <ul className="space-y-2">
        {item.points.map((p) => (
          <li key={p} className="flex gap-2 text-sm text-white/85 leading-relaxed">
            <span className="text-brand-accent font-bold">•</span>
            <span>{p}</span>
          </li>
        ))}
      </ul>

      {item.quiz && (
        <div className="rounded-xl bg-white/10 border border-white/10 p-4">
          <p className="text-[11px] font-mono uppercase tracking-widest text-brand-accent">Tự kiểm tra 10 giây</p>
          <p className="text-sm font-semibold mt-2">{item.quiz.question}</p>
          <div className="flex flex-wrap gap-2 mt-3">
            {item.quiz.options.map((o) => (
              <button
                key={o.label}
                type="button"
                onClick={() => setAnswer(o.reply)}
                className={`rounded-full px-4 py-2 text-xs font-bold border cursor-pointer transition-colors ${answer === o.reply ? "bg-white text-neutral-900 border-white" : "border-white/30 hover:bg-white/10"}`}
              >
                {o.label}
              </button>
            ))}
          </div>
          {answer && <p className="text-sm text-white/85 mt-3 leading-relaxed">{answer}</p>}
        </div>
      )}

      {item.article && (
        <Link to={item.article.href} className="inline-flex items-center text-sm font-bold text-brand-accent hover:text-white">
          <BookOpen className="h-4 w-4 mr-2" />
          {item.article.label}
        </Link>
      )}
    </div>
  );
}

function RailButton({ label, href, to, onClick, children }: { label: string; href?: string; to?: string; onClick?: () => void; children: ReactNode }) {
  const inner = (
    <>
      <span className="w-12 h-12 rounded-full bg-black/40 backdrop-blur flex items-center justify-center">{children}</span>
      <span className="text-[10px] font-bold mt-1 drop-shadow">{label}</span>
    </>
  );
  const cls = "flex flex-col items-center cursor-pointer";
  if (href) return <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>;
  if (to) return <Link to={to} className={cls}>{inner}</Link>;
  return <button type="button" onClick={onClick} className={cls}>{inner}</button>;
}
