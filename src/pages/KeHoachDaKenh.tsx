import { useEffect, useState, type ReactNode } from "react";
import { useParams } from "react-router-dom";
import {
  Globe,
  MapPin,
  ThumbsUp,
  Clapperboard,
  MessageCircle,
  CirclePlay,
  Camera,
  Mail,
  ShoppingBag,
  Megaphone,
  Radio,
  ArrowRight,
} from "lucide-react";
import { socialConfig } from "../config/social";
import type { ChannelPlan, ChannelType, PlanChannel } from "../data/channelPlanTypes";

/*
  Trang kế hoạch vận hành đa kênh — chỉ đọc, không menu, không lập chỉ mục.
  Dữ liệu tải từ public/kh-data/<slug>.json để không nằm trong bundle JS chung
  (người ngoài không thể dò ra danh sách khách hàng).
*/

const CHANNEL_ICON: Record<ChannelType, typeof Globe> = {
  website: Globe,
  google: MapPin,
  facebook: ThumbsUp,
  tiktok: Clapperboard,
  zalo: MessageCircle,
  youtube: CirclePlay,
  instagram: Camera,
  email: Mail,
  ecommerce: ShoppingBag,
  ads: Megaphone,
  other: Radio,
};

const TIER_LABEL: Record<PlanChannel["tier"], string> = {
  hub: "Kênh trung tâm",
  core: "Kênh chủ lực",
  support: "Kênh hỗ trợ",
};

type LoadState = { status: "loading" } | { status: "missing" } | { status: "ready"; plan: ChannelPlan };

function useNoIndex() {
  useEffect(() => {
    let tag = document.querySelector<HTMLMetaElement>("meta[name='robots']");
    const created = !tag;
    const previous = tag?.getAttribute("content") ?? null;
    if (!tag) {
      tag = document.createElement("meta");
      tag.setAttribute("name", "robots");
      document.head.appendChild(tag);
    }
    tag.setAttribute("content", "noindex, nofollow, noarchive");
    return () => {
      if (!tag) return;
      if (created) tag.remove();
      else if (previous !== null) tag.setAttribute("content", previous);
    };
  }, []);
}

export default function KeHoachDaKenh() {
  const { slug = "" } = useParams();
  const [state, setState] = useState<LoadState>({ status: "loading" });

  useNoIndex();

  useEffect(() => {
    if (!/^[a-z0-9-]{4,80}$/.test(slug)) {
      setState({ status: "missing" });
      return;
    }
    let cancelled = false;
    setState({ status: "loading" });
    fetch(`/kh-data/${slug}.json`, { cache: "no-cache" })
      .then((res) => {
        const type = res.headers.get("content-type") || "";
        if (!res.ok || !type.includes("json")) throw new Error("not found");
        return res.json() as Promise<ChannelPlan>;
      })
      .then((plan) => {
        if (cancelled) return;
        if (!plan || !plan.client?.name || !Array.isArray(plan.channels)) throw new Error("invalid");
        setState({ status: "ready", plan });
      })
      .catch(() => {
        if (!cancelled) setState({ status: "missing" });
      });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  useEffect(() => {
    if (state.status === "ready") {
      const p = state.plan;
      document.title = `${p.title || "Kế hoạch vận hành đa kênh"} – ${p.client.name}`;
    } else if (state.status === "missing") {
      document.title = "Không tìm thấy tài liệu";
    }
  }, [state]);

  if (state.status === "loading") {
    return (
      <div className="min-h-screen bg-stone-100 flex items-center justify-center">
        <div className="h-6 w-6 rounded-full border-2 border-gray-300 border-t-brand-primary animate-spin" aria-label="Đang tải" />
      </div>
    );
  }

  if (state.status === "missing") {
    return (
      <div className="min-h-screen bg-stone-100 flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-gray-500 mb-3">Tài liệu riêng</p>
          <h1 className="font-display text-2xl font-bold text-brand-dark mb-3">Liên kết không hợp lệ hoặc đã hết hạn</h1>
          <p className="text-sm text-gray-600 leading-relaxed">
            Vui lòng kiểm tra lại đường dẫn hoặc liên hệ {socialConfig.phoneDisplay} để nhận liên kết mới.
          </p>
        </div>
      </div>
    );
  }

  return <PlanDocument plan={state.plan} />;
}

/* ---------------------------------------------------------------- */

function PlanDocument({ plan }: { plan: ChannelPlan }) {
  const hub = plan.channels.filter((c) => c.tier === "hub");
  const others = plan.channels.filter((c) => c.tier !== "hub");

  // Đánh số mục tự động theo những phần có dữ liệu
  const sections: { key: string; title: string; render: () => ReactNode }[] = [];
  sections.push({ key: "summary", title: "Tóm tắt & mục tiêu", render: () => <SummarySection plan={plan} /> });
  sections.push({
    key: "ecosystem",
    title: "Hệ sinh thái kênh",
    render: () => <EcosystemSection hub={hub} others={others} />,
  });
  sections.push({
    key: "channels",
    title: "Chi tiết vận hành từng kênh",
    render: () => <ChannelDetails channels={plan.channels} />,
  });
  if (plan.journey?.length)
    sections.push({ key: "journey", title: "Hành trình khách hàng qua các kênh", render: () => <JourneySection plan={plan} /> });
  if (plan.weeklyCadence?.length)
    sections.push({ key: "cadence", title: "Nhịp nội dung hằng tuần", render: () => <CadenceSection plan={plan} /> });
  if (plan.phases?.length)
    sections.push({ key: "phases", title: "Lộ trình triển khai", render: () => <PhasesSection plan={plan} /> });
  if (plan.responsibilities?.length)
    sections.push({ key: "roles", title: "Phân công thực hiện", render: () => <RolesSection plan={plan} /> });
  if (plan.reporting?.length)
    sections.push({ key: "reporting", title: "Đo lường & báo cáo", render: () => <ReportingSection plan={plan} /> });
  if (plan.budget?.items?.length)
    sections.push({ key: "budget", title: "Ngân sách dự kiến", render: () => <BudgetSection plan={plan} /> });
  if (plan.nextSteps?.length || plan.notes?.length)
    sections.push({ key: "next", title: "Bước tiếp theo", render: () => <NextSection plan={plan} /> });

  return (
    <div className="min-h-screen bg-stone-100 py-0 sm:py-10 print:bg-white print:py-0">
      <article className="relative max-w-4xl mx-auto bg-white sm:rounded-lg sm:shadow-[0_1px_3px_rgba(0,0,0,0.06),0_12px_40px_-12px_rgba(0,0,0,0.12)] overflow-hidden print:shadow-none print:rounded-none">
        <Cover plan={plan} />

        <div className="px-5 sm:px-12 pb-12">
          {sections.map((s, i) => (
            <section key={s.key} className="pt-12 sm:pt-14 break-inside-avoid-page">
              <header className="flex items-baseline gap-4 mb-6 border-b border-gray-200 pb-3">
                <span className="font-mono text-sm font-semibold text-brand-primary tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-brand-dark">{s.title}</h2>
              </header>
              {s.render()}
            </section>
          ))}
        </div>

        <DocFooter plan={plan} />
      </article>
    </div>
  );
}

function Cover({ plan }: { plan: ChannelPlan }) {
  const meta: [string, string | undefined][] = [
    ["Ngày lập", plan.preparedDate],
    ["Phiên bản", plan.version],
    ["Người lập", plan.preparedBy],
    ["Hiệu lực đến", plan.validUntil],
  ];
  return (
    <header className="relative bg-brand-dark text-white px-5 sm:px-12 pt-10 sm:pt-14 pb-10 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.07] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:28px_28px]"
      />
      <div aria-hidden className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-primary/30 blur-3xl" />

      <div className="relative">
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-accent">
            {plan.title || "Kế hoạch vận hành đa kênh"}
          </span>
          {plan.isSample && (
            <span className="font-mono text-[10px] uppercase tracking-widest bg-white/10 border border-white/20 px-2 py-0.5 rounded-sm">
              Bản mẫu
            </span>
          )}
        </div>

        <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight leading-[1.08] mb-3">{plan.client.name}</h1>
        {(plan.projectName || plan.client.industry) && (
          <p className="text-base sm:text-lg text-gray-300 max-w-2xl">
            {plan.projectName}
            {plan.projectName && plan.client.industry ? " · " : ""}
            {plan.client.industry}
            {plan.client.location ? ` · ${plan.client.location}` : ""}
          </p>
        )}

        <dl className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-4 border-t border-white/15 pt-6">
          {meta
            .filter(([, v]) => v)
            .map(([k, v]) => (
              <div key={k}>
                <dt className="font-mono text-[10px] uppercase tracking-widest text-gray-400 mb-1">{k}</dt>
                <dd className="text-sm font-medium">{v}</dd>
              </div>
            ))}
        </dl>
      </div>
    </header>
  );
}

function SummarySection({ plan }: { plan: ChannelPlan }) {
  return (
    <div>
      <p className="text-[15px] sm:text-base leading-relaxed text-gray-700 whitespace-pre-line max-w-3xl">{plan.summary}</p>
      {plan.goals?.length ? (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-200 border border-gray-200 rounded-md overflow-hidden">
          {plan.goals.map((g) => (
            <div key={g.label} className="bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">{g.label}</p>
              <p className="font-display text-2xl font-bold text-brand-dark leading-tight">{g.target}</p>
              {g.note && <p className="mt-2 text-xs text-gray-500 leading-relaxed">{g.note}</p>}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function ChannelBadge({ type, className = "" }: { type: ChannelType; className?: string }) {
  const Icon = CHANNEL_ICON[type] || Radio;
  return <Icon className={`h-4 w-4 flex-shrink-0 ${className}`} aria-hidden />;
}

function EcosystemSection({ hub, others }: { hub: PlanChannel[]; others: PlanChannel[] }) {
  const core = others.filter((c) => c.tier === "core");
  const support = others.filter((c) => c.tier === "support");
  return (
    <div>
      <p className="text-sm text-gray-600 mb-6 max-w-3xl">
        Các kênh mạng xã hội và nền tảng bên ngoài làm nhiệm vụ <strong>thu hút và dẫn khách</strong>; kênh trung tâm là nơi khách
        <strong> tìm hiểu kỹ, tin tưởng và để lại liên hệ</strong>. Mọi nội dung đều hướng người xem về kênh trung tâm.
      </p>

      <div className="grid gap-4 md:grid-cols-[1fr_auto_1.1fr] items-stretch">
        {/* Feeders */}
        <div className="space-y-4">
          {[
            { label: TIER_LABEL.core, list: core },
            { label: TIER_LABEL.support, list: support },
          ]
            .filter((g) => g.list.length)
            .map((g) => (
              <div key={g.label}>
                <p className="font-mono text-[10px] uppercase tracking-widest text-gray-500 mb-2">{g.label}</p>
                <ul className="space-y-2">
                  {g.list.map((c) => (
                    <li key={c.name} className="flex items-start gap-3 rounded-md border border-gray-200 px-3 py-2.5">
                      <ChannelBadge type={c.type} className="mt-0.5 text-gray-500" />
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-brand-dark">{c.name}</p>
                        <p className="text-xs text-gray-500 leading-snug">{c.role}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
        </div>

        {/* Arrow */}
        <div className="flex md:flex-col items-center justify-center gap-2 text-brand-secondary py-1">
          <span className="h-px w-10 md:h-10 md:w-px bg-brand-secondary/40" />
          <ArrowRight className="h-5 w-5 rotate-90 md:rotate-0" aria-hidden />
          <span className="h-px w-10 md:h-10 md:w-px bg-brand-secondary/40" />
        </div>

        {/* Hub */}
        <div className="rounded-md border-2 border-brand-primary bg-brand-primary/[0.03] p-5 flex flex-col justify-center">
          <p className="font-mono text-[10px] uppercase tracking-widest text-brand-primary mb-3">{TIER_LABEL.hub}</p>
          {hub.length ? (
            hub.map((c) => (
              <div key={c.name} className="mb-3 last:mb-0">
                <div className="flex items-center gap-2 mb-1">
                  <ChannelBadge type={c.type} className="text-brand-primary" />
                  <p className="font-display text-lg font-bold text-brand-dark">{c.name}</p>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{c.role}</p>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">Chưa xác định kênh trung tâm.</p>
          )}
          <p className="mt-4 pt-4 border-t border-brand-primary/20 text-xs text-gray-600">
            Đích đến: khách để lại số điện thoại, nhắn Zalo hoặc đặt lịch tư vấn.
          </p>
        </div>
      </div>
    </div>
  );
}

function ChannelDetails({ channels }: { channels: PlanChannel[] }) {
  const order = { hub: 0, core: 1, support: 2 } as const;
  const sorted = [...channels].sort((a, b) => order[a.tier] - order[b.tier]);
  return (
    <div className="space-y-4">
      {sorted.map((c) => (
        <div key={c.name} className="rounded-md border border-gray-200 break-inside-avoid">
          <div className="flex flex-wrap items-center justify-between gap-2 px-4 sm:px-5 py-3 border-b border-gray-100 bg-gray-50/70">
            <div className="flex items-center gap-2.5">
              <ChannelBadge type={c.type} className={c.tier === "hub" ? "text-brand-primary" : "text-gray-600"} />
              <h3 className="font-semibold text-brand-dark">{c.name}</h3>
            </div>
            <span
              className={`font-mono text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-sm ${
                c.tier === "hub" ? "bg-brand-primary text-white" : "bg-gray-200 text-gray-700"
              }`}
            >
              {TIER_LABEL[c.tier]}
            </span>
          </div>
          <div className="px-4 sm:px-5 py-4 grid gap-4 sm:grid-cols-2 text-sm">
            <Field label="Vai trò" className="sm:col-span-2">
              {c.role}
            </Field>
            {c.audience && <Field label="Đối tượng">{c.audience}</Field>}
            {c.frequency && <Field label="Tần suất">{c.frequency}</Field>}
            {c.contentTypes?.length ? (
              <Field label="Nội dung chính">
                <ul className="list-disc pl-4 space-y-0.5 marker:text-gray-400">
                  {c.contentTypes.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </Field>
            ) : null}
            {c.kpis?.length ? (
              <Field label="Chỉ số theo dõi">
                <ul className="list-disc pl-4 space-y-0.5 marker:text-gray-400">
                  {c.kpis.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </Field>
            ) : null}
            {c.owner && (
              <Field label="Phụ trách" className="sm:col-span-2">
                {c.owner}
              </Field>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function Field({ label, children, className = "" }: { label: string; children: ReactNode; className?: string }) {
  return (
    <div className={className}>
      <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400 mb-1">{label}</p>
      <div className="text-gray-700 leading-relaxed">{children}</div>
    </div>
  );
}

function JourneySection({ plan }: { plan: ChannelPlan }) {
  const steps = plan.journey!;
  return (
    <ol className="relative border-l-2 border-gray-200 ml-3 space-y-6">
      {steps.map((s, i) => (
        <li key={s.stage} className="pl-6 relative break-inside-avoid">
          <span className="absolute -left-[13px] top-0 h-6 w-6 rounded-full bg-white border-2 border-brand-primary font-mono text-[11px] font-bold text-brand-primary flex items-center justify-center">
            {i + 1}
          </span>
          <h3 className="font-semibold text-brand-dark leading-6">{s.stage}</h3>
          <p className="text-sm text-gray-600 mt-1 leading-relaxed">{s.description}</p>
          {(s.channels?.length || s.action) && (
            <div className="mt-2 flex flex-wrap items-center gap-1.5">
              {s.channels?.map((ch) => (
                <span key={ch} className="text-[11px] font-medium bg-gray-100 text-gray-700 px-2 py-0.5 rounded-sm">
                  {ch}
                </span>
              ))}
              {s.action && (
                <span className="text-[11px] text-brand-primary font-medium inline-flex items-center gap-1">
                  <ArrowRight className="h-3 w-3" aria-hidden />
                  {s.action}
                </span>
              )}
            </div>
          )}
        </li>
      ))}
    </ol>
  );
}

function CadenceSection({ plan }: { plan: ChannelPlan }) {
  const rows = plan.weeklyCadence!;
  return (
    <div className="overflow-x-auto -mx-5 sm:mx-0 px-5 sm:px-0">
      <table className="w-full min-w-[520px] text-sm border-collapse">
        <thead>
          <tr className="text-left">
            <th className="w-24 py-2 pr-4 text-[11px] font-semibold uppercase tracking-wide text-gray-400 border-b border-gray-200">Ngày</th>
            <th className="py-2 text-[11px] font-semibold uppercase tracking-wide text-gray-400 border-b border-gray-200">Hoạt động</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.day} className="align-top">
              <td className="py-3 pr-4 font-semibold text-brand-dark border-b border-gray-100 whitespace-nowrap">{r.day}</td>
              <td className="py-3 border-b border-gray-100">
                {r.items.length ? (
                  <ul className="space-y-1.5">
                    {r.items.map((it, idx) => (
                      <li key={idx} className="flex gap-2">
                        <span className="flex-shrink-0 text-[11px] font-medium bg-gray-100 text-gray-700 px-2 py-0.5 rounded-sm h-fit">
                          {it.channel}
                        </span>
                        <span className="text-gray-700">{it.content}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span className="text-gray-400">—</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function PhasesSection({ plan }: { plan: ChannelPlan }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {plan.phases!.map((p, i) => (
        <div key={p.name} className="rounded-md border border-gray-200 p-5 break-inside-avoid">
          <p className="font-mono text-[10px] uppercase tracking-widest text-brand-secondary mb-1">
            Giai đoạn {i + 1} · {p.period}
          </p>
          <h3 className="font-display text-lg font-bold text-brand-dark mb-2">{p.name}</h3>
          <p className="text-sm text-gray-600 mb-3 leading-relaxed">{p.focus}</p>
          <ul className="space-y-1.5 text-sm text-gray-700">
            {p.deliverables.map((d) => (
              <li key={d} className="flex gap-2">
                <span className="mt-2 h-1 w-1 rounded-full bg-gray-400 flex-shrink-0" />
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function RolesSection({ plan }: { plan: ChannelPlan }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {plan.responsibilities!.map((r) => (
        <div key={r.party} className="rounded-md border border-gray-200 p-5 break-inside-avoid">
          <h3 className="font-semibold text-brand-dark mb-3">{r.party}</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            {r.items.map((it) => (
              <li key={it} className="flex gap-2">
                <span className="mt-2 h-1 w-1 rounded-full bg-brand-primary flex-shrink-0" />
                <span className="leading-relaxed">{it}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function ReportingSection({ plan }: { plan: ChannelPlan }) {
  return (
    <div className="overflow-x-auto -mx-5 sm:mx-0 px-5 sm:px-0">
      <table className="w-full min-w-[520px] text-sm border-collapse">
        <thead>
          <tr className="text-left">
            {["Chỉ số", "Nguồn số liệu", "Tần suất"].map((h) => (
              <th key={h} className="py-2 pr-4 text-[11px] font-semibold uppercase tracking-wide text-gray-400 border-b border-gray-200">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {plan.reporting!.map((r) => (
            <tr key={r.metric} className="align-top">
              <td className="py-3 pr-4 font-medium text-brand-dark border-b border-gray-100">{r.metric}</td>
              <td className="py-3 pr-4 text-gray-600 border-b border-gray-100">{r.source}</td>
              <td className="py-3 text-gray-600 border-b border-gray-100 whitespace-nowrap">{r.frequency}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function BudgetSection({ plan }: { plan: ChannelPlan }) {
  const b = plan.budget!;
  return (
    <div>
      <div className="overflow-x-auto -mx-5 sm:mx-0 px-5 sm:px-0">
        <table className="w-full min-w-[480px] text-sm border-collapse">
          <tbody>
            {b.items.map((it) => (
              <tr key={it.item} className="align-top">
                <td className="py-3 pr-4 border-b border-gray-100">
                  <p className="font-medium text-brand-dark">{it.item}</p>
                  {it.note && <p className="text-xs text-gray-500 mt-0.5">{it.note}</p>}
                </td>
                <td className="py-3 text-right font-mono tabular-nums text-gray-800 border-b border-gray-100 whitespace-nowrap">
                  {it.amount}
                </td>
              </tr>
            ))}
            {b.total && (
              <tr>
                <td className="pt-4 pr-4 font-semibold text-brand-dark">Tổng cộng</td>
                <td className="pt-4 text-right font-mono tabular-nums font-bold text-brand-primary whitespace-nowrap">{b.total}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {b.note && <p className="mt-4 text-xs text-gray-500 leading-relaxed">{b.note}</p>}
    </div>
  );
}

function NextSection({ plan }: { plan: ChannelPlan }) {
  return (
    <div className="space-y-6">
      {plan.nextSteps?.length ? (
        <ol className="space-y-3">
          {plan.nextSteps.map((s, i) => (
            <li key={s} className="flex gap-4">
              <span className="font-mono text-sm font-semibold text-brand-primary tabular-nums pt-px">{i + 1}.</span>
              <span className="text-[15px] text-gray-700 leading-relaxed">{s}</span>
            </li>
          ))}
        </ol>
      ) : null}
      {plan.notes?.length ? (
        <div className="rounded-md bg-amber-50 border border-amber-200 px-4 py-3">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-amber-800 mb-1.5">Lưu ý</p>
          <ul className="space-y-1 text-sm text-amber-900">
            {plan.notes.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

function DocFooter({ plan }: { plan: ChannelPlan }) {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 px-5 sm:px-12 py-8 text-sm">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <p className="font-display font-bold text-brand-dark">{plan.preparedBy || "Đức Duy Web"}</p>
          <p className="text-gray-500 text-xs mt-1">
            Tài liệu dành riêng cho {plan.client.name}. Vui lòng không chia sẻ công khai.
          </p>
        </div>
        <div className="text-gray-600 text-xs sm:text-right space-y-0.5">
          <p>
            Điện thoại / Zalo:{" "}
            <a href={`tel:${socialConfig.phone}`} className="font-medium text-brand-dark">
              {socialConfig.phoneDisplay}
            </a>
          </p>
          <p>
            Email:{" "}
            <a href={`mailto:${socialConfig.email}`} className="font-medium text-brand-dark">
              {socialConfig.email}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
