"""Tạo bộ icon "Thêm vào màn hình chính" từ 1 ảnh, hoặc từ chữ khi chưa có ảnh.

  python scripts/make-icons.py <tiền-tố-đích> --src anh.png
  python scripts/make-icons.py <tiền-tố-đích> --text "ĐQ" --bg "#2A378D" --fg "#FFFFFF"

Ra 4 file: <tiền-tố>-32.png (tab trình duyệt), -180.png (iPhone),
-192.png và -512.png (Android). Ảnh nguồn được cắt vuông ở giữa; phần trong suốt
được lót màu --bg, vì iPhone tô đen chỗ trong suốt.
"""
import argparse
import os

from PIL import Image, ImageDraw, ImageFont

SIZES = (32, 180, 192, 512)
FONTS = [
    r"C:\Windows\Fonts\seguibl.ttf",
    r"C:\Windows\Fonts\segoeuib.ttf",
    r"C:\Windows\Fonts\arialbd.ttf",
    "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
    "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
]


def font(size):
    for f in FONTS:
        if os.path.exists(f):
            return ImageFont.truetype(f, size)
    return ImageFont.load_default(size)


def from_image(src, bg):
    im = Image.open(src).convert("RGBA")
    side = min(im.size)
    left, top = (im.width - side) // 2, (im.height - side) // 2
    im = im.crop((left, top, left + side, top + side))
    base = Image.new("RGBA", im.size, bg)
    base.alpha_composite(im)
    return base.convert("RGB").resize((512, 512), Image.LANCZOS)


def from_text(text, bg, fg):
    n = 1024
    im = Image.new("RGB", (n, n), bg)
    d = ImageDraw.Draw(im)
    # Chữ nằm trong vùng an toàn ~60% ở giữa, vì Android có thể cắt icon thành hình tròn
    size = int(n * (0.46 if len(text) <= 2 else 0.30))
    f = font(size)
    while d.textlength(text, font=f) > n * 0.6 and size > 40:
        size -= 8
        f = font(size)
    d.text((n / 2, n * 0.46), text, font=f, fill=fg, anchor="mm")
    bar_w = n * 0.16
    d.rounded_rectangle((n / 2 - bar_w / 2, n * 0.74, n / 2 + bar_w / 2, n * 0.765), radius=12, fill=fg)
    return im.resize((512, 512), Image.LANCZOS)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("prefix")
    ap.add_argument("--src")
    ap.add_argument("--text")
    ap.add_argument("--bg", default="#1E293B")
    ap.add_argument("--fg", default="#FFFFFF")
    a = ap.parse_args()
    if not a.src and not a.text:
        ap.error("cần --src hoặc --text")
    icon = from_image(a.src, a.bg) if a.src else from_text(a.text, a.bg, a.fg)
    os.makedirs(os.path.dirname(a.prefix) or ".", exist_ok=True)
    for s in SIZES:
        icon.resize((s, s), Image.LANCZOS).save(f"{a.prefix}-{s}.png", optimize=True)


if __name__ == "__main__":
    main()
