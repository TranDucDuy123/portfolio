---
name: viet-bai
description: "Viết và đăng bài chuẩn SEO lên duyweb.info.vn (Blog hoặc Cafe Số): viết file Markdown trong content/, làm ảnh bìa và thẻ trích dẫn theo bộ nhận diện hoặc nén ảnh Duy gửi, xem trước, commit, push, kiểm tra bài trên web thật, báo IndexNow và yêu cầu lập chỉ mục trên Google Search Console. Dùng khi Duy nói /viet-bai, viết bài, lên bài, đăng bài cho site của Duy."
---

# Viết và đăng bài lên duyweb.info.vn

Site là web tĩnh trên Vercel free, không có database. Mỗi bài là một file `content/blog/<slug>.md` hoặc `content/cafe-so/<slug>.md`. Push lên `main` là Vercel tự build: `vite-plugins/staticPages.ts` sinh HTML riêng cho bài, thêm vào sitemap và trang danh sách. Định dạng file xem `content/README.md`.

## Đầu vào Duy có thể đưa

Ví dụ: `/viet-bai Cafe Số: tên miền .vn hay .com cho tiệm nhỏ. Ý: khách lớn tuổi nhớ .vn, đổi tên miền là mất Google. Đăng luôn.`

- **Chủ đề hoặc từ khoá** (bắt buộc). Có thể kèm ý chính, kinh nghiệm thật, ví dụ khách thật đã ẩn tên.
- **Loại bài**: "Cafe Số" (giải thích khái niệm bằng ví dụ đời thường, ngắn 500–900 chữ) hoặc "Blog" (chiến lược, hướng dẫn, 900–1600 chữ). Không nói thì tự chọn theo chủ đề và ghi rõ đã chọn.
- **Ảnh**: Duy gửi kèm (đường dẫn file hoặc ảnh dán vào chat), hoặc để trống thì tự làm ảnh.
- **"Đăng luôn"**: bỏ bước chờ duyệt, viết xong đăng thẳng. Không có chữ này thì để bản nháp cho Duy xem trước.

Chỉ hỏi lại khi thiếu chủ đề. Mọi thứ khác tự quyết theo hướng dẫn dưới đây, ghi rõ trong báo cáo.

## Quy trình

### 1. Chuẩn bị
- Đọc `content/README.md` (định dạng, các trường) và liệt kê `content/blog/`, `content/cafe-so/` để biết bài đã có: tránh trùng chủ đề, chọn 2–4 bài để link nội bộ.
- Có công cụ tìm kiếm web thì tìm từ khoá chính, đọc nhanh vài kết quả đầu để biết người tìm cần gì và đối thủ đang thiếu gì. Bài phải trả lời thẳng câu hỏi đó.

### 2. Viết file Markdown
- `slug`: chữ thường không dấu, 3–6 từ, có từ khoá chính, vd `ten-mien-vn-hay-com`. Kiểm tra không trùng file đã có.
- Phần đầu file:
  - `title`: 50–60 ký tự, có từ khoá chính, nói rõ lợi ích hoặc câu hỏi người đọc có.
  - `summary`: 140–160 ký tự, có từ khoá, gợi lý do bấm vào. Đây là mô tả trên Google và Zalo.
  - `category`: Blog chọn trong `Website`, `SEO`, `Digital Assets`, `Business Strategy`, `Conversion`, `Content Marketing`, `Lead Generation`; Cafe Số dùng `Cơ bản`, `Hạ tầng`, `So sánh`, `Tiếp thị`, `Chiến lược`.
  - `tags`: 2–4 tag. `date`: hôm nay (YYYY-MM-DD). Cafe Số thêm `analogy` (1–2 câu ví dụ đời thường) và `order` = số lớn nhất hiện có + 1.
  - `image`: ảnh bìa (bước 3). `draft: true` khi chưa được duyệt đăng.
- Thân bài:
  - Mở bài 2–3 câu đi thẳng vào vấn đề người đọc, có từ khoá chính trong đoạn đầu. Không mở bằng câu sáo ("Trong thời đại số…").
  - Mục lớn dùng `##`, mục con `###` (tiêu đề bài đã là H1 của trang). Ít nhất một `##` có từ khoá.
  - Đoạn ngắn 2–4 câu; dùng danh sách, bảng so sánh, câu chốt `>` khi giúp đọc nhanh hơn.
  - Link nội bộ 2–4 cái tới bài đã có, chữ link mô tả đúng nội dung (không dùng "tại đây", "xem thêm"): `[tên miền là gì](/cafe-so/domain-la-gi)`.
  - Kết bài có lời mời phù hợp: nhắn Zalo cho Duy hoặc đọc bài liên quan.
- Giọng: Duy xưng "mình", gọi người đọc "bạn"; lời thường, ví dụ đời thật của chủ tiệm, chủ doanh nghiệp nhỏ. Thuật ngữ nào cũng giải thích một câu.
- Trung thực: không bịa số liệu, giá, quy định, kết quả khách hàng, lời khách. Số liệu nào cũng phải có nguồn tìm được; không chắc thì bỏ, hoặc ghi `[CẦN DUY XÁC NHẬN: …]` và để bài ở dạng nháp.

### 3. Ảnh
Ảnh nằm trong `public/blog-images/<slug>/`, chèn vào bài bằng `![mô tả có từ khoá tự nhiên](/blog-images/<slug>/ten.jpg)`.

- **Duy gửi ảnh**: nén trước khi dùng.
  `node scripts/blog-photos.mjs <slug> <ảnh-1> <ảnh-2> --name <gợi-ý-không-dấu>`
  Xem từng ảnh để viết alt đúng nội dung và đặt vào đoạn liên quan. Ảnh có mặt người lạ, biển số xe, số điện thoại, thông tin khách thì hỏi Duy trước khi đăng.
- **Không có ảnh**: tự làm theo bộ nhận diện.
  - Ảnh bìa (luôn làm, dùng cho `image` và ảnh chia sẻ): `node scripts/blog-image.mjs cover <slug> "<tiêu đề ngắn gọn>" --kicker "Blog"` (hoặc `"Cafe Số"`).
  - Thẻ trích dẫn cho 1–2 câu chốt đắt nhất trong bài: `node scripts/blog-image.mjs quote <slug> cau-chot-1 "<câu chốt>"`.
- Mở ảnh vừa làm ra xem (Read) để chắc chữ không tràn, không lỗi dấu.
- Không chèn ảnh lấy từ web khác nếu không rõ bản quyền.

### 4. Xem trước (bỏ qua khi Duy nói "đăng luôn")
- Giữ `draft: true` thì bài không hiện trên site thật. Để xem trên máy: tạm bỏ `draft`, mở `npm run dev` (preview_start "dev") tại `http://localhost:3000/<blog|cafe-so>/<slug>`, kiểm tra trên khổ điện thoại và máy tính, rồi đặt lại `draft: true`.
- Gửi Duy: link xem trước, tiêu đề, mô tả, từ khoá, link nội bộ, ảnh, các chỗ cần xác nhận. Chờ Duy duyệt.

### 5. Đăng
- Bỏ `draft`, đặt `date` là ngày đăng.
- `npx vite build`: dòng "trang tĩnh cho SEO" phải tăng thêm 1 trang; mở `dist/<blog|cafe-so>/<slug>.html` kiểm tra title, description, ảnh og và nội dung có trong HTML.
- Chỉ add file của bài này: `content/.../<slug>.md` và `public/blog-images/<slug>/`. Không gom file khác đang thay đổi trong thư mục.
- Commit tiếng Việt, ví dụ `Đăng bài Cafe Số: Tên miền .vn hay .com cho tiệm nhỏ`, cuối message có dòng Co-Authored-By theo quy định của phiên. Email commit: `git -c user.email=dyly399@gmail.com commit`. Push `main`.

### 6. Kiểm tra bài trên web thật
- Đợi Vercel deploy (chạy nền, thử lại mỗi 5 giây, tối đa 4 phút) tới khi `https://duyweb.info.vn/<blog|cafe-so>/<slug>` trả về HTML có đúng `<title>` của bài.
- Kiểm tra ảnh bìa trả về 200 và `sitemap.xml` đã có link bài.

### 7. Báo công cụ tìm kiếm
- **Bing và các công cụ dùng IndexNow**: `node scripts/indexnow.mjs /<blog|cafe-so>/<slug>`. Kết quả 200 hoặc 202 là đã nhận.
- **Google Search Console**, bằng trình duyệt trong app (tải skill `anthropic-skills:built-in-browser` trước):
  1. Mở `https://search.google.com/search-console?resource_id=https%3A%2F%2Fduyweb.info.vn%2F` (link thẳng vào trang inspect bị 404). Khung trình duyệt hẹp thì ô "Kiểm tra mọi URL" bị ẩn: bấm biểu tượng kính lúp trên thanh trên cùng, dán link bài, Enter.
  2. Gặp trang đăng nhập Google thì dừng, nhờ Duy tự đăng nhập trong khung trình duyệt. Không bao giờ tự nhập mật khẩu, mã xác minh.
  3. Đợi kết quả kiểm tra. URL chưa có trên Google thì bấm **Yêu cầu lập chỉ mục** (Request indexing). Đã có thì ghi lại tình trạng, không gửi thừa. Trang có sẵn vài nút "Yêu cầu lập chỉ mục" ẩn: bấm nút đang hiện (tìm theo chữ, chọn ref mới nhất), đợi khung "Đã yêu cầu lập chỉ mục" hiện ra mới tính là xong.
  4. Google giới hạn số lần yêu cầu mỗi ngày. Gặp thông báo vượt hạn mức thì dừng, báo Duy gửi lại hôm sau.
  5. Sitemap đã khai báo sẵn, Google tự đọc lại định kỳ. Khi đăng nhiều bài một lúc có thể gửi lại `sitemap.xml` ở `https://search.google.com/search-console/sitemaps?resource_id=https%3A%2F%2Fduyweb.info.vn%2F` để Google đọc sớm hơn.
- **Bing**: chạy `indexnow.mjs` từ Bash có thể bị Git Bash đổi `/cafe-so/x` thành đường dẫn ổ đĩa; script đã tự sửa, và chỉ gửi khi trang trả về đúng canonical của bài.
- Không dùng Indexing API của Google cho bài blog.

### 8. Báo lại Duy
Ngắn gọn: link bài, tiêu đề và mô tả, từ khoá chính, ảnh đã dùng, link nội bộ, kết quả IndexNow, trạng thái Search Console, việc còn lại (nếu có).

## Viết nhiều bài một lần
Viết lần lượt, bài sau link tới bài trước khi liên quan. Có thể gom vào một commit. Search Console ưu tiên gửi bài quan trọng nhất, phần còn lại báo Duy gửi hôm sau vì hạn mức.

## Ghi nhớ (cập nhật khi biết thêm)
- Property Search Console: dạng URL `https://duyweb.info.vn/` (cùng tài khoản Google còn có property hungthinhfoods.vn, đừng chọn nhầm). Duy đăng nhập sẵn trong trình duyệt của app.
- Sitemap `sitemap.xml` đã khai báo, trạng thái Thành công (gửi lại 09/11/2026 sau khi đăng bài đầu tiên).
- Bài đã đăng qua skill: `/cafe-so/ten-mien-vn-hay-com` (08/11/2026, đã yêu cầu lập chỉ mục 09/11/2026, IndexNow 200).
- 09/11/2026 sau khi dựng sẵn HTML cho 21 trang chính: đã yêu cầu lập chỉ mục `/`, `/services`, `/bao-gia`, `/about`, `/kien-thuc`, `/blog`, `/cafe-so`, `/resources`, `/case-study`, `/solutions`. Còn chờ gửi (mỗi ngày ~10 link): 5 trang `/case-study/*`, 5 trang `/solutions/*`, `/videos`, `/projects`, `/connect`, 2 cẩm nang `/kien-thuc/*`, 17 bài Blog và Cafe Số cũ (ưu tiên bài có lượt hiển thị).
- Mẹo thao tác Search Console: vào trang Tổng quan, đợi 5 giây rồi mới bấm kính lúp (bấm sớm ô tìm không mở). Sau khi kiểm tra URL, tìm nút theo chữ "Yêu cầu lại" và bấm ref của nút (bấm theo toạ độ hay trượt). Google chạy kiểm tra trực tiếp khoảng 30–60 giây rồi mới hiện khung "Đã yêu cầu lập chỉ mục".
