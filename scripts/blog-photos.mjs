// Nén ảnh bạn gửi để chèn vào bài: rộng tối đa 1600px, JPG chất lượng 80, xoay đúng chiều theo EXIF.
//
//   node scripts/blog-photos.mjs <slug> <ảnh-1> [ảnh-2 ...] [--name ten-goi-y]
//       → public/blog-images/<slug>/<ten-goi-y>-1.jpg, -2.jpg …
//
// Dùng thư viện vẽ ảnh có sẵn của Windows (System.Drawing qua PowerShell), không cài thêm gì.
// In ra đường dẫn công khai, kích thước, dung lượng của từng ảnh để dán vào bài.
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const ni = args.indexOf("--name");
const base = ni >= 0 ? args.splice(ni, 2)[1] : "anh";
const [slug, ...inputs] = args;

if (!slug || !/^[a-z0-9-]+$/.test(slug) || !inputs.length || !/^[a-z0-9-]+$/.test(base)) {
  console.error("Cách dùng: node scripts/blog-photos.mjs <slug> <ảnh-1> [ảnh-2 ...] [--name ten-goi-y]");
  process.exit(1);
}
const missing = inputs.filter((f) => !fs.existsSync(f));
if (missing.length) {
  console.error("Không thấy file: " + missing.join(", "));
  process.exit(1);
}

const outDir = path.join(root, "public/blog-images", slug);
fs.mkdirSync(outDir, { recursive: true });
const jobs = inputs.map((src, i) => ({ src: path.resolve(src), out: path.join(outDir, `${base}-${i + 1}.jpg`) }));

const ps = `
Add-Type -AssemblyName System.Drawing
$enc = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
$ep = New-Object System.Drawing.Imaging.EncoderParameters 1
$ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality), 80L
$jobs = $env:BLOG_PHOTO_JOBS | ConvertFrom-Json
foreach ($j in $jobs) {
  $img = [System.Drawing.Image]::FromFile($j.src)
  if ($img.PropertyIdList -contains 0x0112) {
    switch ([int]$img.GetPropertyItem(0x0112).Value[0]) {
      3 { $img.RotateFlip([System.Drawing.RotateFlipType]::Rotate180FlipNone) }
      6 { $img.RotateFlip([System.Drawing.RotateFlipType]::Rotate90FlipNone) }
      8 { $img.RotateFlip([System.Drawing.RotateFlipType]::Rotate270FlipNone) }
    }
  }
  [double]$s = [math]::Min([double]1, [double]1600 / [double]$img.Width)
  [int]$w = [math]::Round($img.Width * $s); [int]$h = [math]::Round($img.Height * $s)
  $bmp = New-Object System.Drawing.Bitmap -ArgumentList $w, $h
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.Clear([System.Drawing.Color]::White)
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.DrawImage($img, 0, 0, $w, $h)
  $bmp.Save($j.out, $enc, $ep)
  $g.Dispose(); $bmp.Dispose(); $img.Dispose()
  Write-Output ("{0}|{1}x{2}" -f $j.out, $w, $h)
}
`;

const r = spawnSync("powershell.exe", ["-NoProfile", "-NonInteractive", "-Command", ps], {
  env: { ...process.env, BLOG_PHOTO_JOBS: JSON.stringify(jobs) },
  encoding: "utf8",
});
if (r.status !== 0) {
  console.error("Nén ảnh lỗi:\n" + (r.stderr || r.stdout));
  process.exit(1);
}
for (const line of r.stdout.trim().split(/\r?\n/)) {
  const [file, size] = line.split("|");
  const kb = Math.round(fs.statSync(file).size / 1024);
  console.log(`/blog-images/${slug}/${path.basename(file)}  ${size}  ${kb} KB`);
}
