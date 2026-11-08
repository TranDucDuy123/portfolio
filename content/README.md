# Bài viết của duyweb.info.vn

Mỗi bài là **một file Markdown**. Không có database: GitHub là nơi lưu bài, Vercel tự build và đăng khi có commit mới.

| Thư mục | Hiện ở | Thứ tự |
|---|---|---|
| `content/blog/` | `/blog/<tên-file>` | Ngày mới nhất lên đầu |
| `content/cafe-so/` | `/cafe-so/<tên-file>` | Theo số `order` (nhỏ lên trước) |

Tên file là đường dẫn bài: `seo-la-gi.md` → `/cafe-so/seo-la-gi`. Chỉ dùng chữ thường không dấu, số và dấu `-`. Đổi tên file là đổi link, link cũ sẽ hỏng.

## Thêm một bài Blog

Tạo `content/blog/ten-bai-khong-dau.md`:

```markdown
---
title: "Tiêu đề bài, khoảng 50–60 ký tự, có từ khoá chính"
summary: "Mô tả 140–160 ký tự. Hiện dưới tiêu đề trên Google và khi gửi link qua Zalo, Facebook."
category: "SEO"
tags: ["SEO", "Google Maps"]
date: "2026-11-10"
---

### Tiêu đề mục đầu tiên

Đoạn văn. Chữ **đậm**, chữ *nghiêng*, [link nội bộ](/cafe-so/seo-la-gi).

* Gạch đầu dòng
* Gạch đầu dòng
  * Ý con (thụt 2 dấu cách)

1. Bước một
2. Bước hai

> Câu chốt hoặc lưu ý quan trọng.

| Cột 1 | Cột 2 |
|---|---|
| A | B |
```

`category` của Blog chọn một trong: `Website`, `SEO`, `Digital Assets`, `Business Strategy`, `Conversion`, `Content Marketing`, `Lead Generation`.

## Thêm một bài Cafe Số

Như Blog, thêm `analogy` (ví dụ đời thường, hiện trong khung riêng) và `order`:

```markdown
---
title: "Hosting là gì?"
summary: "…"
analogy: "Hosting giống mảnh đất để xây nhà…"
category: "Hạ tầng"
tags: ["Hosting"]
order: 12
---
```

## Các trường không bắt buộc

| Trường | Dùng khi |
|---|---|
| `readingTime: "6 phút"` | Muốn ghi tay; bỏ trống thì tự tính theo số chữ |
| `updated: "2026-12-01"` | Sửa nội dung đáng kể, để Google biết bài mới cập nhật |
| `image: "/blog-images/ten-anh.jpg"` | Ảnh chia sẻ riêng (1200×630), đặt file trong `public/blog-images/` |
| `popular: true` | Đánh dấu bài nổi bật |
| `draft: true` | Viết dở, chưa đăng: không hiện trên site, không vào sitemap |

Ảnh trong bài: `![Mô tả ảnh](/blog-images/ten-anh.jpg)`.

## Sau khi push

Lúc build, `vite-plugins/staticPages.ts` tự:
- sinh HTML riêng cho từng bài (tiêu đề, mô tả, ảnh chia sẻ, dữ liệu có cấu trúc, toàn bộ nội dung), để Google, Zalo, Facebook đọc được ngay mà không cần chạy JavaScript;
- thêm bài vào `sitemap.xml` và trang danh sách `/blog`, `/cafe-so`, `/kien-thuc`.

Việc còn lại bằng tay: vào Google Search Console, dán link bài mới vào ô kiểm tra URL, bấm **Yêu cầu lập chỉ mục**.
