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
| `loop` | Vòng lặp tự chạy (`focus` = bước trọng tâm, đếm từ 0) |
| `stages` | Các chặng mở khoá (số cuối trong `title` là mốc đơn) |
| `roadmap` | Lộ trình theo tuần |
| `techPartner` | Đối tác kỹ thuật (vd NASANI): giới thiệu, dịch vụ, phân vai Duy Web / đối tác, link website |
| `pricing` | Gói khởi tạo + gói tháng (khách chọn) + bảng ước tính, nút xác nhận qua Zalo |
| `partners`, `why`, `nextSteps`, `closing` | Đơn vị đã làm, lý do chọn, bước tiếp theo |

`type` của kênh (quyết định icon): `website`, `shopee`, `tiktok`, `facebook`, `instagram`, `google`,
`zalo`, `youtube`, `other`.

## Thu hồi link

Xoá (hoặc đổi tên) file JSON rồi deploy lại — link cũ sẽ báo "Liên kết không hợp lệ hoặc đã hết hạn".
