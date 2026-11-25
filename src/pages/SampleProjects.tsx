import type { ReactNode } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, CalendarDays, CheckCircle2, Eye, Gauge, Layers, MonitorSmartphone, Users } from "lucide-react";
import { sampleProjects, type SampleProject } from "../data/sampleProjects";
import { socialConfig } from "../config/social";
import Meta from "../components/Meta";

function ProjectCard({ project }: { project: SampleProject; key?: string }) {
  return (
    <Link
      to={`/du-an-mau/${project.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
    >
      <div className="relative aspect-video overflow-hidden bg-gray-100">
        <img src={project.cover} alt={project.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <span className="absolute left-3 top-3 rounded-md bg-white/90 px-2.5 py-1 font-mono text-[10px] font-bold uppercase text-brand-primary shadow-xs">
          {project.status}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <span className="font-mono text-[10px] font-semibold uppercase text-gray-400">{project.industry}</span>
        <h2 className="mt-1 font-display text-lg font-bold leading-snug text-brand-dark transition-colors group-hover:text-brand-primary">{project.title}</h2>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-gray-600">{project.summary}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.channels.map((channel) => (
            <span key={channel} className="rounded bg-gray-50 px-2 py-0.5 font-mono text-[10px] text-gray-500">{channel}</span>
          ))}
        </div>
        <span className="mt-5 inline-flex items-center border-t border-gray-100 pt-3 text-sm font-bold text-brand-primary">
          Xem cách vận hành chiến dịch →
        </span>
      </div>
    </Link>
  );
}

function SectionTitle({ icon, eyebrow, title }: { icon: ReactNode; eyebrow: string; title: string }) {
  return (
    <div className="mb-5">
      <span className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-brand-primary">
        {icon}
        {eyebrow}
      </span>
      <h2 className="mt-1 font-display text-2xl font-extrabold tracking-tight text-brand-dark sm:text-3xl">{title}</h2>
    </div>
  );
}

function ProjectDetail({ project }: { project: SampleProject }) {
  return (
    <div className="space-y-14">
      <Link to="/du-an-mau" className="inline-flex items-center text-sm font-semibold text-brand-primary hover:text-brand-secondary" style={{ minHeight: "44px" }}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Tất cả dự án mẫu
      </Link>

      {/* Ảnh demo + thông tin nhanh */}
      <div className="grid gap-8 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener"
            className="group relative block overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 shadow-md"
          >
            <img src={project.cover} alt={`Demo ${project.client}`} className="aspect-[1440/860] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
            {project.demoUrl && (
              <span className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/25">
                <span className="flex items-center rounded-lg bg-white/95 px-4 py-2 font-display text-xs font-bold uppercase tracking-wider text-brand-dark opacity-0 shadow-md transition-opacity group-hover:opacity-100">
                  <Eye className="mr-1.5 h-4 w-4 text-brand-primary" />
                  Mở demo chạy thật
                </span>
              </span>
            )}
          </a>
          <p className="mt-3 text-xs text-gray-500">{project.note}</p>
        </div>
        <div className="space-y-5 lg:col-span-2">
          <p className="text-base leading-relaxed text-gray-700">{project.summary}</p>
          <dl className="grid grid-cols-2 gap-4 rounded-2xl border border-gray-200 p-5 text-sm">
            <div>
              <dt className="font-mono text-[10px] font-bold uppercase tracking-wider text-gray-400">Khách hàng</dt>
              <dd className="mt-0.5 font-semibold text-brand-dark">{project.client}</dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] font-bold uppercase tracking-wider text-gray-400">Lĩnh vực</dt>
              <dd className="mt-0.5 font-semibold text-brand-dark">{project.industry}</dd>
            </div>
            <div className="col-span-2">
              <dt className="font-mono text-[10px] font-bold uppercase tracking-wider text-gray-400">Kênh triển khai</dt>
              <dd className="mt-1.5 flex flex-wrap gap-1.5">
                {project.channels.map((channel) => (
                  <span key={channel} className="rounded-md bg-gray-100 px-2.5 py-1 text-xs text-gray-700">{channel}</span>
                ))}
              </dd>
            </div>
          </dl>
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener"
              className="inline-flex w-full items-center justify-center rounded-xl bg-brand-primary px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-secondary"
            >
              Xem demo website <ArrowUpRight className="ml-1.5 h-4 w-4" />
            </a>
          )}
        </div>
      </div>

      {/* Bối cảnh & mục tiêu */}
      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl bg-brand-light p-6">
          <h3 className="font-display text-lg font-bold text-brand-dark">Bối cảnh</h3>
          <ul className="mt-3 space-y-2.5 text-sm leading-relaxed text-gray-700">
            {project.context.map((item) => (
              <li key={item} className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-brand-primary" />{item}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-gray-200 p-6">
          <h3 className="font-display text-lg font-bold text-brand-dark">Mục tiêu</h3>
          <ul className="mt-3 space-y-2.5 text-sm leading-relaxed text-gray-700">
            {project.goals.map((item) => (
              <li key={item} className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-emerald-500" />{item}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Lộ trình chiến dịch */}
      <section>
        <SectionTitle icon={<Layers className="h-4 w-4" />} eyebrow="Lộ trình" title="Chiến dịch chạy qua từng giai đoạn" />
        <ol className="relative space-y-5 border-l-2 border-brand-primary/15 pl-6 sm:pl-8">
          {project.phases.map((phase, index) => (
            <li key={phase.name} className="relative">
              <span className="absolute -left-[37px] top-0 flex h-8 w-8 items-center justify-center rounded-full bg-brand-primary font-display text-sm font-bold text-white sm:-left-[45px]">
                {index + 1}
              </span>
              <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-xs">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display text-lg font-bold text-brand-dark">{phase.name}</h3>
                  <span className="rounded-md bg-brand-primary/10 px-2.5 py-1 font-mono text-[11px] font-bold text-brand-primary">{phase.time}</span>
                </div>
                <p className="mt-1.5 text-sm text-gray-600">{phase.goal}</p>
                <ul className="mt-3 space-y-1.5 text-sm text-gray-700">
                  {phase.work.map((item) => (
                    <li key={item} className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-emerald-500" />{item}</li>
                  ))}
                </ul>
                <p className="mt-3 border-t border-gray-100 pt-3 text-xs text-gray-500">
                  <b className="font-semibold text-brand-dark">Bàn giao:</b> {phase.deliverable}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Vận hành hằng tuần + đo lường */}
      <section className="grid gap-8 lg:grid-cols-2">
        <div>
          <SectionTitle icon={<CalendarDays className="h-4 w-4" />} eyebrow="Vận hành" title="Một tuần làm việc trông thế nào" />
          <div className="overflow-hidden rounded-2xl border border-gray-200">
            {project.weekly.map((row) => (
              <div key={row.day} className="grid grid-cols-[96px_1fr] border-b border-gray-100 text-sm last:border-b-0">
                <span className="bg-brand-light px-4 py-3 font-semibold text-brand-dark">{row.day}</span>
                <span className="px-4 py-3 text-gray-700">{row.task}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <SectionTitle icon={<Gauge className="h-4 w-4" />} eyebrow="Đo lường" title="Theo dõi gì, để làm gì" />
          <div className="space-y-3">
            {project.measure.map((row) => (
              <div key={row.what} className="rounded-xl border border-gray-200 p-4">
                <b className="block text-sm text-brand-dark">{row.what}</b>
                <span className="text-sm text-gray-600">{row.why}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ai làm gì */}
      <section>
        <SectionTitle icon={<Users className="h-4 w-4" />} eyebrow="Phân vai" title="Ai làm phần nào" />
        <div className="grid gap-5 md:grid-cols-2">
          {project.roles.map((role, index) => (
            <div key={role.who} className={`rounded-2xl p-6 ${index === 0 ? "bg-brand-dark text-white" : "border border-gray-200 bg-white"}`}>
              <h3 className={`font-display text-lg font-bold ${index === 0 ? "text-white" : "text-brand-dark"}`}>{role.who}</h3>
              <ul className={`mt-3 space-y-2 text-sm ${index === 0 ? "text-gray-200" : "text-gray-700"}`}>
                {role.does.map((item) => (
                  <li key={item} className="flex gap-2"><CheckCircle2 className={`mt-0.5 h-4 w-4 flex-none ${index === 0 ? "text-brand-accent" : "text-emerald-500"}`} />{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Ảnh màn hình */}
      <section>
        <SectionTitle icon={<MonitorSmartphone className="h-4 w-4" />} eyebrow="Màn hình demo" title="Xem nhanh giao diện" />
        <div className="grid gap-5 sm:grid-cols-2">
          {project.gallery.map((shot) => (
            <figure key={shot.src} className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-50">
              <img src={shot.src} alt={shot.caption} loading="lazy" className="aspect-video w-full object-cover object-top" />
              <figcaption className="px-4 py-3 text-xs text-gray-600">{shot.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="rounded-2xl bg-brand-primary p-8 text-center text-white">
        <h2 className="font-display text-2xl font-extrabold">Muốn một lộ trình như thế cho thương hiệu của bạn?</h2>
        <p className="mx-auto mt-2 max-w-xl text-sm text-white/85">
          Gửi Duy vài dòng về sản phẩm và kênh bạn đang bán. Duy phác thảo lộ trình và một màn hình demo theo ngành của bạn.
        </p>
        <a
          href={socialConfig.zalo}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-bold uppercase text-brand-primary transition-colors hover:bg-brand-light"
        >
          Nhắn Zalo cho Duy
        </a>
      </section>
    </div>
  );
}

export default function SampleProjects() {
  const { slug } = useParams<{ slug?: string }>();
  const project = sampleProjects.find((item) => item.slug === slug);

  return (
    <div className="min-h-screen bg-white">
      {project ? (
        <Meta title={project.title} description={project.summary} slug={`du-an-mau/${project.slug}`} ogImage={`https://duyweb.info.vn${project.cover}`} />
      ) : (
        <Meta
          title="Dự án mẫu: xem cách một chiến dịch marketing được vận hành"
          description="Các dự án mẫu của Duy Web: demo website chạy thật, lộ trình từng giai đoạn, lịch vận hành hằng tuần và cách đo lường để chủ doanh nghiệp hình dung trước khi bắt đầu."
          slug="du-an-mau"
        />
      )}

      <section className="border-b border-gray-100 bg-brand-light py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-brand-primary">Dự án mẫu</span>
            <h1 className="mt-1 font-display text-3xl font-extrabold tracking-tight text-brand-dark sm:text-4xl">
              {project ? project.title : "Xem trước một chiến dịch được vận hành thế nào"}
            </h1>
            {!project && (
              <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:text-base">
                Mỗi dự án mẫu có một bản demo chạy thật, lộ trình từng giai đoạn, lịch làm việc hằng tuần và những gì được đo. Bạn hình dung được toàn bộ cách làm trước khi quyết định.
              </p>
            )}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {project ? (
          <ProjectDetail project={project} />
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {sampleProjects.map((item) => (
              <ProjectCard key={item.slug} project={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
