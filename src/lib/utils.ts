// Ghép className có điều kiện (thay cho cn của shadcn, không cần cài clsx/tailwind-merge).
// Lưu ý: không gộp class Tailwind trùng nhau như tailwind-merge; class đứng sau không tự đè class trước.
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
