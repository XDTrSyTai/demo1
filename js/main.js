/**
 * CV & PORTFOLIO - MAIN JAVASCRIPT
 * Tương tác giao diện: Dark/Light Mode, Mobile Menu, Typing Effect,
 * Copy Email, Active ScrollSpy & Form Feedback.
 */

document.addEventListener('DOMContentLoaded', () => {
  // -------------------------------------------------------------------------
  // 1. THEME SWITCHER (DARK / LIGHT MODE)
  // -------------------------------------------------------------------------
  const themeToggleBtn = document.getElementById('theme-toggle');
  const root = document.documentElement;

  function getCurrentTheme() {
    return root.getAttribute('data-theme') || 'dark';
  }

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const current = getCurrentTheme();
      const nextTheme = current === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme);
    });
  }

  // Tự động lắng nghe nếu người dùng đổi theme trên hệ điều hành
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });

  // -------------------------------------------------------------------------
  // 2. MOBILE HAMBURGER MENU
  // -------------------------------------------------------------------------
  const mobileToggleBtn = document.getElementById('mobile-menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggleBtn && navMenu) {
    mobileToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navMenu.classList.toggle('open');
      mobileToggleBtn.classList.toggle('active', isOpen);
      mobileToggleBtn.setAttribute('aria-expanded', isOpen);
    });

    // Tự động đóng menu khi nhấp vào bất kỳ link nào
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileToggleBtn.classList.remove('active');
        mobileToggleBtn.setAttribute('aria-expanded', 'false');
      });
    });

    // Đóng menu khi click ra ngoài màn hình
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !mobileToggleBtn.contains(e.target)) {
        navMenu.classList.remove('open');
        mobileToggleBtn.classList.remove('active');
      }
    });
  }

  // -------------------------------------------------------------------------
  // 3. NAVBAR SCROLL EFFECT & BACK TO TOP BUTTON
  // -------------------------------------------------------------------------
  const navbar = document.getElementById('navbar');
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;

    if (scrollPos > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    if (backToTopBtn) {
      if (scrollPos > 400) {
        backToTopBtn.style.opacity = '1';
        backToTopBtn.style.pointerEvents = 'auto';
      } else {
        backToTopBtn.style.opacity = '0.7';
      }
    }
  });

  // -------------------------------------------------------------------------
  // 4. SCROLLSPY (HIGHLIGHT ACTIVE NAV LINK KHI CUỘN)
  // -------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');

  function updateActiveNavOnScroll() {
    const scrollY = window.pageYOffset;

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavOnScroll);

  // -------------------------------------------------------------------------
  // 5. HIỆU ỨNG GÕ CHỮ (TYPING EFFECT) TẠI HERO ROLE
  // -------------------------------------------------------------------------
  const roleTextEl = document.getElementById('role-text');
  if (roleTextEl) {
    const roles = [
      'Full Stack Developer',
      'Frontend Specialist',
      'Backend & API Architect',
      'UI/UX Enthusiast',
      'Problem Solver'
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
      const currentRole = roles[roleIndex];

      if (isDeleting) {
        roleTextEl.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
      } else {
        roleTextEl.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 110;
      }

      if (!isDeleting && charIndex === currentRole.length) {
        // Dừng lại một lúc khi gõ xong từ
        isDeleting = true;
        typingSpeed = 1800;
      } else if (isDeleting && charIndex === 0) {
        // Chuyển sang từ kế tiếp
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 400;
      }

      setTimeout(typeEffect, typingSpeed);
    }

    typeEffect();
  }

  // -------------------------------------------------------------------------
  // 6. TOAST NOTIFICATION UTILITY
  // -------------------------------------------------------------------------
  const toastEl = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-message');
  let toastTimer = null;

  function showToast(message, duration = 3000) {
    if (!toastEl || !toastMsg) return;
    toastMsg.textContent = message;
    toastEl.classList.add('show');

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastEl.classList.remove('show');
    }, duration);
  }

  // -------------------------------------------------------------------------
  // 7. COPY EMAIL CLICK HANDLER
  // -------------------------------------------------------------------------
  const copyBtn = document.getElementById('btn-copy-email');
  const emailTextEl = document.getElementById('copy-email-text');

  if (copyBtn && emailTextEl) {
    copyBtn.addEventListener('click', async () => {
      const email = emailTextEl.textContent.trim();
      try {
        await navigator.clipboard.writeText(email);
        showToast(`Đã sao chép: ${email}`);
      } catch (err) {
        // Fallback copy
        const tempInput = document.createElement('input');
        tempInput.value = email;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        showToast(`Đã sao chép: ${email}`);
      }
    });
  }

  // -------------------------------------------------------------------------
  // 8. TẢI CV FEEDBACK
  // -------------------------------------------------------------------------
  const cvBtn = document.getElementById('cv-download-btn');
  if (cvBtn) {
    cvBtn.addEventListener('click', (e) => {
      const href = cvBtn.getAttribute('href');
      if (href === '#download-cv' || href === '#') {
        e.preventDefault();
        showToast('Bạn có thể đặt file CV của mình vào thư mục dự án và liên kết trong href nhé!');
      }
    });
  }

  // -------------------------------------------------------------------------
  // 9. FORM LIÊN HỆ (FEEDBACK MOCK)
  // -------------------------------------------------------------------------
  const contactForm = document.getElementById('contact-form');
  const formSubmitBtn = document.getElementById('form-submit-btn');
  const formStatus = document.getElementById('form-status');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const originalBtnText = formSubmitBtn.innerHTML;
      formSubmitBtn.disabled = true;
      formSubmitBtn.innerHTML = `<span>Đang gửi...</span>`;

      // Giả lập gửi tin nhắn trong 1s
      setTimeout(() => {
        formSubmitBtn.disabled = false;
        formSubmitBtn.innerHTML = originalBtnText;

        if (formStatus) {
          formStatus.textContent = 'Cảm ơn bạn! Tin nhắn của bạn đã được tiếp nhận.';
          formStatus.classList.add('success');
        }

        showToast('Tin nhắn đã được gửi thành công! Cảm ơn bạn.');
        contactForm.reset();

        setTimeout(() => {
          if (formStatus) {
            formStatus.textContent = '';
            formStatus.classList.remove('success');
          }
        }, 5000);
      }, 900);
    });
  }

  // -------------------------------------------------------------------------
  // 10. PHÓNG TO / THU NHỎ ẢNH ĐẠI DIỆN TẠI CHỖ KHI NHẤP CHUỘT
  // -------------------------------------------------------------------------
  const avatarContainer = document.getElementById('avatar-container');
  if (avatarContainer) {
    avatarContainer.addEventListener('click', (e) => {
      e.stopPropagation();
      const isZoomed = avatarContainer.classList.toggle('zoomed');
      avatarContainer.setAttribute('aria-expanded', isZoomed ? 'true' : 'false');
    });

    // Cho phép dùng phím Enter hoặc Space để phóng to
    avatarContainer.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        avatarContainer.click();
      }
    });

    // Thu nhỏ lại khi nhấp chuột ra ngoài ảnh
    document.addEventListener('click', (e) => {
      if (!avatarContainer.contains(e.target)) {
        avatarContainer.classList.remove('zoomed');
        avatarContainer.setAttribute('aria-expanded', 'false');
      }
    });

    // Thu nhỏ khi nhấn phím Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        avatarContainer.classList.remove('zoomed');
        avatarContainer.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Cập nhật năm hiện tại ở footer
  const currentYearEl = document.getElementById('current-year');
  if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
  }
});

