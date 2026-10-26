# Kế hoạch vận hành đa kênh – link riêng cho từng khách

Mỗi khách / dự án = **1 file JSON** = **1 link riêng**. Trang chỉ để đọc: không menu, không header/footer,
không xuất hiện trong sitemap và gắn `noindex` để Google không lập chỉ mục.

## Tạo kế hoạch cho khách mới

1. Sao chép file mẫu `public/kh-data/noi-that-an-gia-x7k2p9.json`.
2. Đổi tên file thành mã link mới, **luôn kèm 6 ký tự ngẫu nhiên** để không ai đoán được:
   `ten-khach-abc123.json` (chỉ dùng chữ thường không dấu, số và dấu `-`).
3. Sửa nội dung trong file. Xoá dòng `"isSample": true` để bỏ nhãn "Bản mẫu".
4. Deploy (đẩy lên Vercel như bình thường).
5. Gửi khách link: `https://duyweb.info.vn/ke-hoach/ten-khach-abc123`

Xem thử trên máy: `npm run dev` rồi mở `http://localhost:3000/ke-hoach/noi-that-an-gia-x7k2p9`

## Các phần trong file JSON

Bắt buộc: `client.name`, `summary`, `channels`. Mọi phần khác không có thì trang tự ẩn và đánh số lại mục.

| Trường | Nội dung |
|---|---|
| `client` | `name`, `industry`, `location` |
| `projectName`, `preparedBy`, `preparedDate`, `version`, `validUntil` | Thông tin trang bìa |
| `summary` | Đoạn tóm tắt (xuống dòng bằng `\n`) |
| `goals` | Mục tiêu: `label`, `target`, `note` |
| `diagnosis` | Hiện trạng & điểm nghẽn: `current`, `why`, `fix` |
| `channels` | Mỗi kênh: `type`, `name`, `tier` (`hub` / `core` / `support`), `role`, `audience`, `contentTypes`, `frequency`, `kpis`, `owner` |
| `journey` | Hành trình khách: `stage`, `description`, `channels`, `action` |
| `weeklyCadence` | Lịch tuần: `day`, `items` (`channel`, `content`) |
| `phases` | Lộ trình: `name`, `period`, `focus`, `deliverables` |
| `responsibilities` | Phân công: `party`, `items` |
| `reporting` | Đo lường: `metric`, `source`, `frequency` |
| `budget` | `items` (`item`, `amount`, `note`), `total`, `note` |
| `nextSteps`, `notes` | Bước tiếp theo, lưu ý |

`type` của kênh (quyết định icon): `website`, `google`, `facebook`, `tiktok`, `zalo`, `youtube`,
`instagram`, `email`, `ecommerce`, `ads`, `other`.

## Thu hồi link

Xoá (hoặc đổi tên) file JSON rồi deploy lại — link cũ sẽ báo "Liên kết không hợp lệ hoặc đã hết hạn".

## Lưu ý bảo mật

Đây là "ẩn bằng link khó đoán", không phải mật khẩu: ai có link đều xem được. Không đưa thông tin
nhạy cảm (số tài khoản, hợp đồng) vào file.
