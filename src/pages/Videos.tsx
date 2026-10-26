import { Fragment } from "react";
import { Youtube } from "lucide-react";
import Meta from "../components/Meta";
import { VideoCard } from "../components/VideoBlocks";
import { socialConfig } from "../config/social";
import { series, videos, type SeriesId } from "../data/videos";

// Mục video: mỗi video YouTube đi kèm bài viết liên quan. Dữ liệu lấy từ src/data/videos.ts.
export default function Videos() {
  const seriesIds = (Object.keys(series) as SeriesId[]).filter((id) => videos.some((v) => v.series === id));
  const others = videos.filter((v) => !v.series);

  return (
    <div className="bg-white min-h-screen">
      <Meta
        title="Video: Trải nghiệm muôn nghề và chuyện web"
        description="Video Duy làm thử từng nghề và kể lại người trong nghề cần gì trên Internet. Mỗi video đi kèm bài viết đầy đủ để đọc kỹ hơn."
        keywords={["trải nghiệm muôn nghề", "video đức duy web", "thử nghề", "chuyện web cho chủ doanh nghiệp"]}
        slug="videos"
      />

      <section className="bg-brand-light py-12 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-primary">Video</span>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-dark mt-1 tracking-tight">Xem clip, đọc bài đầy đủ</h1>
            <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed">
              Mỗi video đều có một bài viết đi kèm. Xem clip để nắm câu chuyện, bấm vào bài để đọc kỹ và làm theo.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-14">
        {seriesIds.map((id) => (
          <section key={id}>
            <div className="mb-6 max-w-3xl">
              <h2 className="font-display font-bold text-2xl text-brand-dark">{series[id].name}</h2>
              <p className="text-sm text-gray-600 mt-1">{series[id].tagline}</p>
            </div>
            <VideoGrid list={videos.filter((v) => v.series === id)} />
          </section>
        ))}

        {others.length > 0 && (
          <section>
            <h2 className="font-display font-bold text-2xl text-brand-dark mb-6">Video khác</h2>
            <VideoGrid list={others} />
          </section>
        )}

        {videos.length === 0 && <p className="text-sm text-gray-500">Chưa có video nào gắn với bài viết.</p>}

        <a
          href={socialConfig.youtube}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-full bg-brand-dark hover:bg-brand-primary text-white px-6 py-3 text-sm font-bold transition-colors"
        >
          <Youtube className="h-4 w-4 mr-2" />
          Theo dõi kênh YouTube
        </a>
      </div>
    </div>
  );
}

function VideoGrid({ list }: { list: typeof videos }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 items-start">
      {list.map((v) => <Fragment key={v.id}><VideoCard video={v} /></Fragment>)}
    </div>
  );
}
