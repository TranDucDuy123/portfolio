document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Logic cho Mobile Menu (Hamburger)
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    menuBtn.addEventListener('click', () => {
        // Chuyển đổi trạng thái đóng/mở
        mobileMenu.classList.toggle('active');
        
        // Thay đổi icon từ Hamburger sang nút X (tùy chọn UI)
        if(mobileMenu.classList.contains('active')) {
            menuBtn.innerHTML = '<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
            document.body.style.overflow = 'hidden'; // Khóa cuộn trang khi mở menu
        } else {
            menuBtn.innerHTML = '<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>';
            document.body.style.overflow = 'auto';
        }
    });

    // Đóng menu khi click vào link trên mobile
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
            menuBtn.innerHTML = '<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>';
        });
    });

    // 2. Logic cho Carousel Dots (Mobile Services)
    // Code này dùng để làm sáng Dot tương ứng khi người dùng vuốt trên điện thoại
    const track = document.getElementById('services-track');
    const cards = document.querySelectorAll('.service-card');
    const dots = document.querySelectorAll('.carousel-dots .dot');

    if(track && dots.length > 0) {
        // Dùng IntersectionObserver để kiểm tra card nào đang hiển thị rõ nhất trên màn hình
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Lấy index của card đang hiển thị
                    const cardIndex = Array.from(cards).indexOf(entry.target);
                    
                    // Cập nhật class active cho dots
                    dots.forEach(dot => dot.classList.remove('active'));
                    if(dots[cardIndex]) {
                        dots[cardIndex].classList.add('active');
                    }
                }
            });
        }, {
            root: track,
            threshold: 0.6 // Kích hoạt khi 60% card nằm trong khung nhìn
        });

        cards.forEach(card => observer.observe(card));
    }
});