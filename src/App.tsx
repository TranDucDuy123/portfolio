import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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

export default function App() {
  return (
    <Router>
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
    </Router>
  );
}
