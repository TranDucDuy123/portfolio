# Lịch hoạt động Trái Cây 350: trang nội bộ có tài khoản

Địa chỉ: `https://duyweb.info.vn/noi-bo/trai-cay-350`

## Các file

| File | Commit? | Dùng để |
|---|---|---|
| `noi-dung/lich.mjs` | Không | **Sửa lịch ở đây**: việc từng thứ, giờ live, ca + checklist, story, dịp lễ, việc riêng theo ngày |
| `noi-dung/so-tay.html` | Không | Sổ tay nhân viên (phần chữ) |
| `noi-dung/so-tay-chu.html` | Không | Phần chỉ chủ tiệm thấy |
| `tai-khoan.json` | Không | Tài khoản + mật khẩu |
| `khung.html`, `app.js` | Có | Giao diện và bộ máy lịch (không chứa nội dung) |
| `public/noi-bo/trai-cay-350.html` | Có | Bản đã mã hóa, đưa lên web |

Repo đang để công khai, nên `noi-dung/` và `tai-khoan.json` nằm trong `.gitignore`. **Nhớ tự sao lưu hai thứ này**: mất máy là mất bản gốc. (Đăng nhập bằng tài khoản quản trị vẫn đọc lại được toàn bộ nội dung.)

## Cập nhật lịch

1. Sửa `noi-dung/lich.mjs`. Ví dụ:
   - Dời live: thêm `{ ngay: "2026-11-25", gio: "19:30" }` vào `liveDoi`. Hủy live: `{ ngay: "2026-11-25", huy: true, ghiChu: "Chị Hương bận" }`
   - Việc phát sinh: thêm `{ ngay: "2026-12-01", viec: "Khai trương chi nhánh 2", ai: "Cả tiệm" }` vào `viecRieng`
   - Thêm dịp lễ: thêm vào `dipLe`, dùng `duong: "MM-DD"` hoặc `am: "tháng-ngày"`
2. Chạy `node scripts/noi-bo.mjs trai-cay-350`
3. Commit file `public/noi-bo/trai-cay-350.html` rồi deploy như bình thường (Vercel tự build, hoặc build rồi upload lên DirectAdmin)

Mỗi lần build lại thì toàn bộ khóa được tạo mới, nên mọi người phải đăng nhập lại một lần.

## Tài khoản và quyền

| Vai | Thấy được |
|---|---|
| `nhan-vien` | Hôm nay, Tuần, Tháng, Video 3 ngày, Sổ tay |
| `chu-tiem` | Thêm tab Chủ tiệm (chấm điểm tuần, việc cần chốt, ghi chú quản lý) |
| `quan-tri` | Thêm tab Tài khoản |

- Thêm người: thêm một dòng vào `tai-khoan.json`, để `"mat_khau": ""` thì script tự tạo và in mật khẩu ra màn hình. Gửi riêng cho từng người.
- Đổi mật khẩu: xóa mật khẩu cũ (để trống) rồi build lại.
- Khóa người nghỉ việc: xóa dòng đó rồi build lại. Bản mới dùng khóa mới nên mật khẩu cũ không mở được.
- Có hạn dùng: `"het_han": "2027-06-30"`.

Quyền được giữ bằng **mã hóa**, không phải bằng cách ẩn giao diện: nội dung phần chủ tiệm được khóa bằng khóa riêng, tài khoản nhân viên không có khóa đó nên không giải mã được, kể cả khi mở mã nguồn trang.

## Giới hạn cần biết

- Dấu tick checklist, bảng video 3 ngày và điểm tuần chỉ lưu **trên máy đang dùng** (localStorage). Muốn chuyển bảng video sang máy khác thì dùng nút Xuất file / Nhập file.
- Người đã đăng nhập vẫn có thể chụp màn hình, nên chỉ cấp tài khoản cho người tin được.
- Thử xem ngày giờ khác: thêm `?ngay=2026-11-18&gio=19:40` vào cuối địa chỉ.
