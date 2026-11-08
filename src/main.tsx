import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

// Gỡ màn chào (#boot trong index.html) khi trang đã vẽ và font đã tải,
// giữ tối thiểu ~0,7 giây tính từ lúc mở trang để hiệu ứng quét chữ Đ chạy trọn
function hideBoot() {
  const boot = document.getElementById('boot');
  if (!boot) return;
  const fontsReady = document.fonts?.ready ?? Promise.resolve();
  const minWait = new Promise((r) => setTimeout(r, Math.max(0, 700 - performance.now())));
  Promise.all([fontsReady, minWait]).then(() => {
    requestAnimationFrame(() => {
      boot.classList.add('boot-out');
      setTimeout(() => boot.remove(), 500);
    });
  });
}
requestAnimationFrame(hideBoot);
