// Kiểu dữ liệu cho trang "Đề xuất & báo giá" gửi riêng cho từng khách hàng.
// Mỗi báo giá là 1 file JSON đặt trong: public/kh-data/<ma-link>.json
// Link gửi khách: https://duyweb.info.vn/bao-gia-kh/<ma-link>
// Bắt buộc: client.name, title, intro, pricing. Phần nào không có thì trang tự ẩn.

export type QuoteChannelType =
  | "website"
  | "shopee"
  | "tiktok"
  | "facebook"
  | "instagram"
  | "google"
  | "zalo"
  | "youtube"
  | "other";

export interface QuoteStat {
  value: number;
  start?: number; // Số bắt đầu đếm (mặc định 0), vd 400 cho "400–800k"
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
  note?: string;
}

export interface QuoteChannelReview {
  type: QuoteChannelType;
  name: string;
  role: string; // Vai trò trong hệ thống
  behavior: string; // Khách làm gì ở kênh này
  verdict: string; // Nhận định cho riêng thương hiệu này
  scores: number[]; // 1–5, cùng thứ tự với channelReviews.metrics
  setup: string[]; // Việc làm trong gói khởi tạo
  watch: string; // Chỉ số xem ở buổi đánh giá
}

export interface QuoteMapPoint {
  name: string;
  x: number; // 0–1, trái → phải (giá)
  y: number; // 0–1, trên → dưới (bản sắc → đại chúng)
  highlight?: boolean;
  note?: string;
}

export interface ProposalQuote {
  isSample?: boolean;
  client: { name: string; website?: string };
  // Thẻ chia sẻ (Zalo, Facebook, Messenger): được ghi sẵn vào HTML lúc build, xem vite-plugins/privateQuoteMeta.ts
  seo?: {
    title: string;
    description: string;
    image?: string; // Đường dẫn trong public/, nên 1200×630, vd "/kh-data/og/<ma-link>.jpg"
    imageAlt?: string;
    // Icon khi khách "Thêm vào MH chính" (iPhone/Android): PNG nền đặc, không trong suốt
    icon?: string; // 180×180 (apple-touch-icon)
    iconLarge?: string; // 512×512 (Android)
    favicon?: string; // 32×32 (tab trình duyệt)
    appTitle?: string; // Tên dưới icon, nên ≤ 12 ký tự
  };
  title: string;
  preparedBy?: string;
  preparedDate?: string;
  validUntil?: string;
  headline?: { amount: number; label: string; caption?: string };

  intro: string[];
  strengths?: string[]; // Những gì khách đã có

  market?: {
    title?: string; // Mặc định: "Thị trường local brand Việt"
    lead: string;
    stats: QuoteStat[];
    brands?: { name: string; how: string; lesson: string }[];
    source?: string;
  };

  testLearn?: {
    lead: string;
    guess: { title: string; sub: string }[];
    measure: { title: string; sub: string }[];
    examples?: { title: string; text: string }[];
  };

  positioning?: {
    lead: string;
    yAxis: string;
    xAxis: string;
    bands: { label: string; from: number; to: number; highlight?: boolean }[];
    quadrants: [string, string, string, string]; // trên-trái, trên-phải, dưới-trái, dưới-phải
    points: QuoteMapPoint[];
    proposal?: string;
    question?: string;
  };

  channelReviews?: {
    lead: string;
    metrics: string[];
    channels: QuoteChannelReview[];
    disclaimer?: string;
  };

  audit?: {
    lead: string;
    items: { issue: string; impact: string; fix: string }[];
    note?: string;
  };

  story?: {
    line: string;
    audience?: { label: string; value: string }[]; // Chân dung khách mục tiêu
    pillars: { title: string; text: string }[];
    contentChannels?: { name: string; role: string; content: string; tone: string }[];
    principle?: string;
  };

  brandKit?: BrandKit;
  channelShowcase?: ChannelShowcase;

  loop?: {
    lead: string;
    steps: { title: string; text: string }[];
    focus?: number; // vị trí bước trọng tâm (0-based)
    note?: string;
  };

  stages?: {
    lead: string;
    items: { title: string; actions: string[]; doneWhen: string }[];
    footer?: string;
    note?: string;
  };

  roadmap?: {
    lead: string;
    weeks: { title: string; items: string[] }[];
    review?: string;
    after?: { title: string; text: string };
    note?: string;
  };

  pricing: {
    lead?: string;
    setup: { name: string; amount: number; includes: string };
    monthly?: { name: string; options: { amount: number; label: string; desc: string }[]; note?: string };
    depositRate?: number; // vd 0.5 = đợt 1 thanh toán 50% gói khởi tạo
    excluded?: string;
  };

  // Ưu đãi có hạn: hiện dưới gói khởi tạo + nhãn nhỏ ở bìa, tự ẩn sau ngày hết hạn
  offer?: {
    title: string; // vd "Ưu đãi chốt trong tháng 10"
    deadline: string; // "YYYY-MM-DD", hết hạn cuối ngày (giờ Việt Nam)
    deadlineLabel?: string; // vd "31/10/2026"
    gifts: { title: string; text: string }[];
    note?: string;
  };

  // Lộ trình mở rộng tham khảo: các gói cao hơn, mở sau khi có số liệu (không cần quyết định ngay)
  growthPath?: {
    lead: string;
    steps: {
      name: string;
      tag?: string; // vd "Đang đề xuất"
      price: string; // Hiển thị nguyên văn, vd "14.000.000đ" hoặc "Thêm 10.000.000đ"
      priceNote?: string;
      when: string; // Mở khi nào / điều kiện
      goal: string; // Mục tiêu của bước
      adds: string[]; // Có thêm gì
      current?: boolean; // Bước khách đang được đề xuất
    }[];
    credit?: string; // Câu nhấn "khoản đã đầu tư được tính trọn khi nâng cấp"
    note?: string;
  };

  techPartner?: {
    name: string;
    legalName?: string;
    url?: string;
    intro: string;
    services?: { title: string; text: string }[];
    split?: { party: string; items: string[] }[]; // Phân vai: ai lo phần nào
    note?: string;
  };

  partners?: { domain: string; category?: string; work?: string; highlight: string }[];
  why?: { title: string; text: string }[];
  nextSteps?: string[];
  closing?: string;
}

// ---- Bộ nhận diện online & hình ảnh mẫu theo kênh ----

export interface BrandKit {
  lead: string;
  wordmark: string; // Logo chữ, vd "turn"
  tagline?: string;
  coverImage?: string; // Ảnh nhận diện (đường dẫn trong public/)
  colors: { name: string; hex: string; use: string }[]; // Màu 1 = nền, 2 = chữ, 3 = nhấn, 4 = phụ
  fonts?: { name: string; use: string; sample: string }[];
  motif?: { title: string; text: string };
  photoRules?: { do: string[]; dont: string[] };
  voice?: { traits: string[]; examples?: { bad: string; good: string }[] };
  reference?: { image: string; caption: string };
}

export interface ShowcaseTile {
  kind: "wordmark" | "hoodie" | "tee" | "sun" | "text" | "texture";
  bg: string;
  fg: string;
  text?: string;
}

export interface ChannelShowcase {
  lead: string;
  handle: string;
  bio?: string[];
  highlights?: string[];
  igTiles: ShowcaseTile[];
  products: { name: string; price: string; color: string; tag?: string; kind?: "hoodie" | "tee" }[];
  priceNote?: string;
  channels: {
    type: "instagram" | "facebook" | "tiktok" | "shopee";
    name: string;
    role: string;
    caption: string;
    hashtags?: string[];
    rules: string[];
  }[];
}
