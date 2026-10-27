import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FloatingContact from "./components/FloatingContact";
import ScrollToTop from "./components/ScrollToTop";
import Breadcrumbs from "./components/Breadcrumbs";

// Page imports
import Home from "./pages/Home";
import About from "./pages/About";
import CafeSo from "./pages/CafeSo";
import CaseStudies from "./pages/CaseStudies";
import Projects from "./pages/Projects";
import Solutions from "./pages/Solutions";
import Blog from "./pages/Blog";
import Resources from "./pages/Resources";
import Services from "./pages/Services";
import Connect from "./pages/Connect";
import Pricing from "./pages/Pricing";
import BaoGiaTranCong from "./pages/BaoGiaTranCong";
import TuVanHostingMKS from "./pages/TuVanHostingMKS";
import KeHoachDaKenh from "./pages/KeHoachDaKenh";
import KienThuc from "./pages/KienThuc";
import VideoFeed from "./pages/VideoFeed";
import Videos from "./pages/Videos";
import GuidePage from "./pages/GuidePage";

// Báo giá riêng từng khách: tách chunk, chỉ tải khi mở đúng link
const BaoGiaKhachHang = lazy(() => import("./pages/BaoGiaKhachHang"));

export default function App() {
  return (
    <Router>
      <AppShell />
    </Router>
  );
}

function AppShell() {
  const { pathname } = useLocation();

  // Báo giá gửi riêng khách hàng: hiển thị độc lập, không header/footer/menu
  if (pathname.startsWith("/bao-gia-kh")) {
    return (
      <>
        <ScrollToTop />
        <Suspense fallback={<div className="min-h-screen bg-[#F4EFE6]" />}>
          <Routes>
            <Route path="/bao-gia-kh/:slug" element={<BaoGiaKhachHang />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </>
    );
  }

  // Trang kế hoạch gửi riêng khách hàng: hiển thị độc lập, không header/footer/menu
  if (pathname.startsWith("/ke-hoach")) {
    return (
      <>
        <ScrollToTop />
        <Routes>
          <Route path="/ke-hoach/:slug" element={<KeHoachDaKenh />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </>
    );
  }

  // Feed video kiểu TikTok (thử nghiệm): toàn màn hình, không header/footer
  if (pathname === "/video") {
    return <VideoFeed />;
  }

  return (
      <div className="flex flex-col min-h-screen bg-white text-brand-dark">
        {/* Scroll helper */}
        <ScrollToTop />

        {/* Global Nav Bar */}
        <Header />

        {/* Dynamic SEO Breadcrumb navigation */}
        <Breadcrumbs />

        {/* Main site viewport */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            
            {/* Thư viện kiến thức gộp Cafe Số + Blog */}
            <Route path="/kien-thuc" element={<KienThuc />} />
            <Route path="/kien-thuc/:slug" element={<GuidePage />} />

            {/* Cafe Số routes */}
            <Route path="/cafe-so" element={<CafeSo />} />
            <Route path="/cafe-so/:slug" element={<CafeSo />} />

            {/* Case study routes */}
            <Route path="/case-study" element={<CaseStudies />} />
            <Route path="/case-study/:slug" element={<CaseStudies />} />

            {/* Project routes */}
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:slug" element={<Projects />} />

            {/* Solution routes */}
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/solutions/:slug" element={<Solutions />} />

            {/* Blog routes */}
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<Blog />} />

            {/* Mục video: clip YouTube + bài viết liên quan */}
            <Route path="/videos" element={<Videos />} />

            {/* Single landing assets */}
            <Route path="/resources" element={<Resources />} />
            <Route path="/services" element={<Services />} />
            <Route path="/connect" element={<Connect />} />
            <Route path="/bao-gia" element={<Pricing />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/bao-gia/coach-tran-cong" element={<BaoGiaTranCong />} />
            <Route path="/bao-gia-tran-cong" element={<BaoGiaTranCong />} />
            <Route path="/tu-van-mks" element={<TuVanHostingMKS />} />
            <Route path="/tu-van-hosting-mks" element={<TuVanHostingMKS />} />
            <Route path="/de-xuat-mks" element={<TuVanHostingMKS />} />
            <Route path="/van-tai-mks" element={<TuVanHostingMKS />} />

            {/* Fallback route back to Home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Floating communication triggers */}
        <FloatingContact />

        {/* Global Footer */}
        <Footer />
      </div>
  );
}
