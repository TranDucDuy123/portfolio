# Báo giá tương tác – link riêng cho từng khách

Mỗi khách = **1 file JSON** = **1 link riêng**. Trang không menu, không header/footer, gắn `noindex`
(cả thẻ meta lẫn header `X-Robots-Tag` trên Vercel) và không có trong sitemap.

## Tạo báo giá cho khách mới

1. Sao chép `public/kh-data/turn-apparel-r8v3np.json`.
2. Đổi tên file thành mã link mới, **luôn kèm 6 ký tự ngẫu nhiên**: `ten-khach-abc123.json`
   (chỉ chữ thường không dấu, số và dấu `-`).
3. Sửa nội dung. Thêm `"isSample": true` nếu muốn hiện nhãn "Bản mẫu".
4. Deploy, rồi gửi khách link: `https://ducduyweb.vn/bao-gia-kh/ten-khach-abc123`

Xem thử trên máy: `npm run dev` rồi mở `http://localhost:3000/bao-gia-kh/turn-apparel-r8v3np`

## Ảnh & tiêu đề khi gửi link (Zalo, Facebook, Messenger)

Khai báo khối `seo` trong file JSON:

```json
"seo": {
  "title": "Báo giá <Khách> × Duy Web – …",
  "description": "Khoảng 140–160 ký tự, nói rõ khách nhận được gì và giá.",
  "image": "/kh-data/og/<ma-link>.jpg",
  "imageAlt": "Mô tả ảnh"
}
```

- Ảnh đặt trong `public/kh-data/og/`, kích thước **1200×630**, JPG dưới ~300KB.
- Icon khi khách bấm **Chia sẻ → Thêm vào MH chính** trên iPhone (và Android): thêm vào `seo`
  `"icon"` (PNG 180×180), `"iconLarge"` (512×512), `"favicon"` (32×32) và `"appTitle"` (tên dưới icon, ≤ 12 ký tự).
  PNG phải **nền đặc** — iOS tô đen phần trong suốt. Không khai báo thì iPhone lấy ảnh chụp trang làm icon.
- Khi `npm run build`, plugin `vite-plugins/privateQuoteMeta.ts` sinh `dist/bao-gia-kh/<ma-link>.html`
  có sẵn title / description / ảnh (vì Zalo, Facebook không chạy JS nên không đọc được thẻ do React gắn).
  Vercel bật `cleanUrls` nên link không đuôi `.html` vẫn ra đúng file này.
- Sau khi deploy, dán link vào https://developers.facebook.com/tools/debug/ và bấm "Scrape Again"
  nếu Facebook/Messenger còn giữ ảnh cũ. Zalo cũng lưu đệm bản xem trước, đổi ảnh thì nên đổi cả tên file ảnh.

## Các phần trong file JSON

Kiểu dữ liệu đầy đủ: `src/data/proposalQuoteTypes.ts`.
Bắt buộc: `client.name`, `title`, `intro`, `pricing.setup`. Phần nào không có thì trang tự ẩn và đánh số lại mục.

| Trường | Hiển thị trên trang |
|---|---|
| `headline` | Số tiền lớn ở bìa (tự đếm lên) |
| `strengths` | Các thẻ "đã có" ở bìa |
| `market` | Số liệu thị trường tự đếm + thẻ brand bấm để xem bài học |
| `testLearn` | Công tắc "đoán rồi làm / đo rồi làm" + ví dụ |
| `positioning` | Bản đồ đối thủ bấm được (`x`, `y` từ 0 đến 1; `highlight` = thương hiệu của khách) |
| `channelReviews` | Radar từng kênh + so sánh theo tiêu chí (`scores` 1–5, cùng thứ tự `metrics`) |
| `audit` | Danh sách lỗi website, bấm để xem "sau khi xử lý" |
| `story` | Câu chuyện, 3 trụ hình ảnh, tab nội dung theo kênh |
| `brandKit` | Bộ nhận diện online: logo chữ, bảng màu (bấm chép mã; màu 1 nền · 2 chữ · 3 nhấn · 4 phụ), kiểu chữ, hoạ tiết, quy tắc ảnh, giọng văn, moodboard (`reference`) |
| `channelShowcase` | Điện thoại mô phỏng Instagram / Facebook / TikTok / Shopee dựng từ `brandKit`: `igTiles` (`wordmark`, `hoodie`, `tee`, `sun`, `text`, `texture`), `products` (giá, `kind`), caption & checklist từng kênh. Cần có `brandKit` |
| `loop` | Vòng lặp tự chạy (`focus` = bước trọng tâm, đếm từ 0) |
| `stages` | Các chặng mở khoá (số cuối trong `title` là mốc đơn) |
| `roadmap` | Lộ trình theo tuần |
| `techPartner` | Đối tác kỹ thuật (vd NASANI): giới thiệu, dịch vụ, phân vai Duy Web / đối tác, link website |
| `pricing` | Gói khởi tạo + gói tháng (khách chọn) + bảng ước tính, nút xác nhận qua Zalo |
| `offer` | Ưu đãi có hạn: thẻ dưới gói khởi tạo + nhãn ở bìa, đếm ngược và **tự ẩn sau `deadline`** (`YYYY-MM-DD`) |
| `growthPath` | Lộ trình mở rộng sau tuần 4: các bước bấm xem (`current: true` = gói đang đề xuất), `credit`, `note` |
| `partners`, `why`, `nextSteps`, `closing` | Đơn vị đã làm, lý do chọn, bước tiếp theo |

`type` của kênh (quyết định icon): `website`, `shopee`, `tiktok`, `facebook`, `instagram`, `google`,
`zalo`, `youtube`, `other`.

## Thu hồi link

Xoá (hoặc đổi tên) file JSON rồi deploy lại — link cũ sẽ báo "Liên kết không hợp lệ hoặc đã hết hạn".

## Upsell khéo: lộ trình mở rộng + ưu đãi

- Giữ **một** lựa chọn cần quyết định ngay (gói khởi tạo). Các gói lớn hơn đặt trong `growthPath`,
  ghi giá dạng "Thêm X đ" (phần chênh lệch) và điều kiện mở rõ ràng ("sau buổi đánh giá tuần 4").
- `offer` chỉ gắn với gói khởi tạo; nên tặng phần việc (thiết kế, ưu tiên lịch, giữ giá nâng cấp)
  thay vì giảm tiền.

## Báo giá kiểu mới (/de-xuat/) và so sánh hiệu quả

Hai kiểu báo giá chạy song song, không đụng nhau:

| | Kiểu cũ (v1) | Kiểu mới (v2) |
|---|---|---|
| Đường dẫn | `/bao-gia-kh/<ma-link>` | `/de-xuat/<ma-link>` |
| Dựng bằng | Trang React đọc `public/kh-data/<ma-link>.json` | Skill `duyweb-bao-gia` → 1 file HTML |
| Nơi để file | `public/kh-data/` | Làm việc ở `bao-gia-xuat/`, đưa lên `public/de-xuat/` |

### Đưa một báo giá kiểu mới lên site

1. Dựng bằng skill, để `<ma-link>.html` (và `<ma-link>.json`) trong `bao-gia-xuat/`.
   Muốn có ảnh khi gửi qua Zalo/Facebook: thêm `bao-gia-xuat/<ma-link>-og.jpg` (1200×630).
2. Chạy `npm run de-xuat -- <ma-link>` (bỏ `<ma-link>` để đưa lên tất cả).
   Script chép sang `public/de-xuat/`, thêm link chuẩn, noindex, ảnh chia sẻ và bộ đo hành vi.
3. Commit và deploy. Gửi khách: `https://ducduyweb.vn/de-xuat/<ma-link>`

Ghi chú nội bộ `bao-gia-xuat/*-noi-bo.md` (giá sàn, kịch bản chốt) **không commit** — đã có trong `.gitignore`.

### Đo để biết kiểu nào hiệu quả

`public/quote-track.js` gắn vào cả hai kiểu, mỗi sự kiện có `quote_version` (v1/v2) và `quote_slug`:

| Sự kiện | Nghĩa là |
|---|---|
| `quote_view` | Khách mở báo giá |
| `quote_engaged_30s`, `_2m`, `_5m` | Thực sự đọc (chỉ tính lúc tab đang mở trước mặt) |
| `quote_scroll_50`, `quote_scroll_90` | Đọc tới nửa trang / gần hết |
| `quote_select_package` | Bấm chọn gói (kèm tên gói) |
| `quote_zalo`, `quote_call`, `quote_copy`, `quote_print` | Bấm Zalo, gọi, chép, in |

**Cần làm một lần:** điền ID Google Analytics 4 (`ga4: "G-..."`) ở đầu `public/quote-track.js`
(có thể thêm `fbPixel` nếu có Pixel thật). Chưa điền thì sự kiện chỉ hiện trong console trình duyệt, không gửi đi đâu.

So sánh trong GA4: Báo cáo → Sự kiện → `quote_zalo` (hoặc sự kiện khác), thêm chiều `quote_version`.
Chỉ số nên xem: tỉ lệ `quote_zalo` / `quote_view` và tỉ lệ `quote_engaged_2m` / `quote_view` theo từng phiên bản.
Vì mỗi khách chỉ xem một kiểu, nên ghi thêm kết quả thật (chốt / chưa chốt, gói nào) cho từng mã link để đối chiếu.
