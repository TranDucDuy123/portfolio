// Video trên site = video YouTube (đồng bộ bằng `npm run sync-youtube`) + bài viết liên quan.
//
// Video tự nối với bài khi mô tả YouTube có link bài, vd:
//   "Đọc bài đầy đủ: https://duyweb.info.vn/blog/luat-choi-shopee-affiliate-va-bi-quyet-giu-hoa-hong"
// Chưa sửa mô tả được thì khai báo tay trong videoLinks bên dưới (khai báo tay được ưu tiên).
// Chỉ video có bài liên quan mới hiện trên site, clip cá nhân trên kênh không bị lộ ra.

import youtubeVideos from "./youtube-videos.json";
import { blogPosts } from "./blog";
import { cafeSoArticles } from "./cafeSo";

export const series = {
  "muon-nghe": {
    name: "Trải nghiệm muôn nghề",
    tagline: "Duy làm thử từng nghề, thấy cái khó của người trong nghề, rồi kể lại họ cần gì trên Internet.",
    hashtag: "#TraiNghiemMuonNghe",
    titlePattern: /^thử nghề/i // Tiêu đề mở đầu "Thử nghề…" thì tự vào seri
  }
} as const;

export type SeriesId = keyof typeof series;

// youtubeId -> bài liên quan / seri (khi mô tả YouTube chưa có link)
export const videoLinks: Record<string, { article?: string; series?: SeriesId }> = {
  "3ey191O8MRw": { series: "muon-nghe", article: "/blog/luat-choi-shopee-affiliate-va-bi-quyet-giu-hoa-hong" }
};

export interface RelatedArticle {
  href: string;
  title: string;
  summary: string;
}

export interface SiteVideo {
  id: string;
  title: string;
  description: string;
  published: string;
  isShort: boolean;
  thumbnail: string;
  url: string;
  series?: SeriesId;
  article: RelatedArticle;
}

const articles = new Map<string, RelatedArticle>([
  ...blogPosts.map((p) => [`/blog/${p.slug}`, { href: `/blog/${p.slug}`, title: p.title, summary: p.summary }] as const),
  ...cafeSoArticles.map((a) => [`/cafe-so/${a.slug}`, { href: `/cafe-so/${a.slug}`, title: a.title, summary: a.summary }] as const)
]);

// Link bài đầu tiên trong mô tả YouTube, bỏ phần ?utm… nếu có
function articleFromDescription(description: string) {
  const match = description.match(/duyweb\.info\.vn(\/(?:blog|cafe-so)\/[a-z0-9-]+)/i);
  return match?.[1].toLowerCase();
}

function seriesOf(title: string, description: string, manual?: SeriesId): SeriesId | undefined {
  if (manual) return manual;
  return (Object.keys(series) as SeriesId[]).find(
    (id) => series[id].titlePattern.test(title) || description.toLowerCase().includes(series[id].hashtag.toLowerCase())
  );
}

export const videos: SiteVideo[] = youtubeVideos.flatMap((v) => {
  const manual = videoLinks[v.id];
  const article = articles.get(manual?.article ?? articleFromDescription(v.description) ?? "");
  if (!article) return [];
  return [{
    id: v.id,
    title: v.title,
    description: v.description,
    published: v.published,
    isShort: v.isShort,
    thumbnail: v.thumbnail,
    url: v.isShort ? `https://www.youtube.com/shorts/${v.id}` : `https://www.youtube.com/watch?v=${v.id}`,
    series: seriesOf(v.title, v.description, manual?.series),
    article
  }];
});

export const videosForArticle = (href: string) => videos.filter((v) => v.article.href === href);
