import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

// Báo cho màn chào (#boot, script trong index.html) biết trang đã vẽ và font đã tải.
// Màn chào tự quyết lúc tắt: chạy trọn chu kỳ đang dở rồi mới mờ đi.
declare global {
  interface Window { __bootReady?: () => void }
}
const fontsReady = document.fonts?.ready ?? Promise.resolve();
fontsReady.then(() => requestAnimationFrame(() => window.__bootReady?.()));
