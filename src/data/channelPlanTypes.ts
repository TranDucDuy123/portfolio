// Kiểu dữ liệu cho trang "Kế hoạch vận hành đa kênh" gửi riêng cho từng khách hàng.
// Mỗi kế hoạch là 1 file JSON đặt trong: public/kh-data/<ma-link>.json
// Link gửi khách: https://ducduyweb.vn/ke-hoach/<ma-link>

export type ChannelType =
  | "website"
  | "google"
  | "facebook"
  | "tiktok"
  | "zalo"
  | "youtube"
  | "instagram"
  | "email"
  | "ecommerce"
  | "ads"
  | "other";

export interface PlanChannel {
  type: ChannelType;
  name: string; // Tên hiển thị, vd "Fanpage Facebook"
  tier: "hub" | "core" | "support"; // hub = trung tâm (thường là Website)
  role: string; // Vai trò của kênh trong hệ thống
  audience?: string; // Kênh này nói chuyện với ai
  contentTypes?: string[]; // Dạng nội dung chính
  frequency?: string; // Tần suất đăng / cập nhật
  kpis?: string[]; // Chỉ số theo dõi
  owner?: string; // Ai phụ trách
}

export interface ChannelPlan {
  isSample?: boolean; // true = hiện nhãn "BẢN MẪU"
  client: {
    name: string;
    industry?: string;
    location?: string;
  };
  title?: string; // Mặc định: "Kế hoạch vận hành đa kênh"
  projectName?: string;
  preparedBy?: string;
  preparedDate?: string; // Ghi dạng hiển thị, vd "12/10/2026"
  version?: string;
  validUntil?: string;

  summary: string;
  goals?: { label: string; target: string; note?: string }[];
  diagnosis?: { current: string; why: string; fix: string }[]; // Hiện trạng – vì sao – hướng xử lý
  channels: PlanChannel[];
  journey?: { stage: string; description: string; channels?: string[]; action?: string }[];
  weeklyCadence?: { day: string; items: { channel: string; content: string }[] }[];
  phases?: { name: string; period: string; focus: string; deliverables: string[] }[];
  responsibilities?: { party: string; items: string[] }[];
  reporting?: { metric: string; source: string; frequency: string }[];
  budget?: { items: { item: string; amount: string; note?: string }[]; total?: string; note?: string };
  nextSteps?: string[];
  notes?: string[];
}
