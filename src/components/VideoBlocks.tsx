import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Play, Youtube } from "lucide-react";
import Schema from "./Schema";
import { series, videosForArticle, type SiteVideo } from "../data/videos";

// Chỉ hiện ảnh bìa, bấm mới tải iframe YouTube: trang nhẹ hơn nhiều khi có nhiều video
export function YouTubeLite({ video }: { video: SiteVideo }) {
  const [playing, setPlaying] = useState(false);
  const ratio = video.isShort ? "aspect-[9/16] max-h-[70vh] mx-auto" : "aspect-video";

  return (
    <div className={`relative w-full overflow-hidden rounded-xl bg-black ${ratio}`}>
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
          title={video.title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      ) : (
        <button type="button" onClick={() => setPlaying(true)} className="group absolute inset-0 w-full h-full cursor-pointer" aria-label={`Phát video: ${video.title}`}>
          <img src={video.thumbnail} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
          <span className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-brand-primary group-hover:bg-brand-secondary flex items-center justify-center shadow-lg transition-colors">
            <Play className="h-7 w-7 text-white ml-1" fill="currentColor" />
          </span>
        </button>
      )}
    </div>
  );
}

// Thẻ video trong trang /videos: video + bài liên quan đi liền nhau
export function VideoCard({ video }: { video: SiteVideo }) {
  const s = video.series ? series[video.series] : undefined;
  return (
    <article className="flex flex-col rounded-2xl border border-gray-200 bg-white overflow-hidden">
      <Schema type="Video" data={video} />
      <div className="p-3 pb-0">
        <YouTubeLite video={video} />
      </div>
      <div className="flex flex-col flex-1 p-5">
        <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono text-gray-400">
          {s && <span className="rounded-md bg-brand-primary/10 text-brand-primary px-2 py-0.5 font-bold">{s.name}</span>}
          <span>{new Date(video.published).toLocaleDateString("vi-VN")}</span>
        </div>
        <h3 className="font-display font-bold text-lg text-brand-dark mt-2 leading-snug">{video.title}</h3>
        {video.description && <p className="text-sm text-gray-600 mt-2 line-clamp-3 whitespace-pre-line">{video.description}</p>}

        <Link to={video.article.href} className="group mt-auto pt-4">
          <span className="flex items-start gap-3 rounded-xl bg-brand-light border border-gray-100 group-hover:border-brand-primary/40 p-3 transition-colors">
            <BookOpen className="h-4 w-4 mt-0.5 shrink-0 text-brand-primary" />
            <span className="min-w-0">
              <span className="block text-[11px] font-bold uppercase tracking-wider text-gray-400">Bài viết liên quan</span>
              <span className="block text-sm font-semibold text-brand-dark group-hover:text-brand-primary mt-0.5">{video.article.title}</span>
            </span>
            <ArrowRight className="h-4 w-4 mt-0.5 shrink-0 text-gray-400 group-hover:text-brand-primary ml-auto" />
          </span>
        </Link>
      </div>
    </article>
  );
}

// Đặt trong trang bài viết: tự hiện video nào trỏ về bài này, không có thì không hiện gì
export function RelatedVideos({ articleHref }: { articleHref: string }) {
  const list = videosForArticle(articleHref);
  if (!list.length) return null;

  return (
    <section className="rounded-2xl border border-gray-200 bg-gray-50 p-4 sm:p-5 space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-display font-bold text-base text-brand-dark flex items-center gap-2">
          <Youtube className="h-5 w-5 text-brand-primary" />
          {list.length > 1 ? "Video liên quan" : "Xem video của bài này"}
        </h3>
        <Link to="/videos" className="text-xs font-bold text-brand-primary hover:text-brand-secondary">Tất cả video →</Link>
      </div>
      {list.map((v) => (
        <div key={v.id} className="space-y-2">
          <Schema type="Video" data={v} />
          <YouTubeLite video={v} />
          <p className="text-sm font-semibold text-brand-dark">
            {v.series && <span className="text-brand-primary">{series[v.series].name} · </span>}
            {v.title}
          </p>
        </div>
      ))}
    </section>
  );
}
