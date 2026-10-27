// Danh sách cẩm nang hiện ở /kien-thuc/<slug>. Thêm cẩm nang mới: tạo file dữ liệu theo guideTypes rồi thêm vào đây.
import type { Guide } from "./guideTypes";
import { socialGuide } from "./socialGuide";
import { birdAffiliateGuide } from "./birdAffiliateGuide";

export const guides: Guide[] = [socialGuide, birdAffiliateGuide];

export const findGuide = (slug?: string) => guides.find((g) => g.slug === slug);
