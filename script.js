document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     TOAST NOTIFICATION SYSTEM
     ========================================================================== */
  const toastContainer = document.getElementById('toast-container');

  const showToast = (message, iconClass = 'fa-solid fa-circle-check') => {
    if (!toastContainer) return;
    
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="${iconClass}"></i> <span>${message}</span>`;
    
    toastContainer.appendChild(toast);
    
    // Trigger animation frame for transition
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    // Remove after 3 seconds
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        toast.remove();
      }, 350);
    }, 3000);
  };

  /* ==========================================================================
     THEME TOGGLE (DARK / LIGHT MODE)
     ========================================================================== */
  const themeToggleBtn = document.getElementById('theme-toggle');
  
  if (themeToggleBtn) {
    const themeIcon = themeToggleBtn.querySelector('i');
    
    const updateThemeIcon = (theme) => {
      if (theme === 'dark') {
        themeIcon.className = 'fa-solid fa-sun';
      } else {
        themeIcon.className = 'fa-solid fa-moon';
      }
    };

    let currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    updateThemeIcon(currentTheme);

    themeToggleBtn.addEventListener('click', () => {
      currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', currentTheme);
      localStorage.setItem('theme', currentTheme);
      updateThemeIcon(currentTheme);
      showToast(`Đã chuyển sang giao diện ${currentTheme === 'dark' ? 'Tối (Dark Mode)' : 'Sáng (Light Mode)'}`, 'fa-solid fa-palette');
    });
  }

  /* ==========================================================================
     MOBILE NAVIGATION DRAWER
     ========================================================================== */
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  /* ==========================================================================
     STICKY HEADER & SCROLLSPY
     ========================================================================== */
  const header = document.getElementById('header');
  const sections = document.querySelectorAll('section[id], footer');

  const handleScroll = () => {
    // Header shadow state
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Scrollspy active link
    const scrollPosition = window.scrollY + 140;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPosition >= top && scrollPosition < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Initial call

  /* ==========================================================================
     TERMINAL CODE COPY FUNCTIONALITY
     ========================================================================== */
  const copyCodeBtn = document.getElementById('copy-code-btn');
  const terminalCode = document.getElementById('terminal-code');

  if (copyCodeBtn && terminalCode) {
    copyCodeBtn.addEventListener('click', () => {
      const codeText = terminalCode.innerText;
      navigator.clipboard.writeText(codeText).then(() => {
        showToast('Đã sao chép mã nguồn vào bộ nhớ tạm!', 'fa-solid fa-code');
        copyCodeBtn.innerHTML = '<i class="fa-solid fa-check text-gradient-emerald"></i>';
        setTimeout(() => {
          copyCodeBtn.innerHTML = '<i class="fa-regular fa-copy"></i>';
        }, 2000);
      });
    });
  }

  /* ==========================================================================
     GENERIC COPY-TO-CLIPBOARD BUTTONS
     ========================================================================== */
  const copyButtons = document.querySelectorAll('.copy-btn[data-copy]');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const textToCopy = btn.getAttribute('data-copy');
      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast(`Đã sao chép ${textToCopy}`, 'fa-solid fa-copy');
      });
    });
  });

  /* ==========================================================================
     PROJECT CATEGORY FILTERS
     ========================================================================== */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category') || '';
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.style.display = 'flex';
          requestAnimationFrame(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          });
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  /* ==========================================================================
     REVEAL ANIMATION & SKILL BARS
     ========================================================================== */
  const reveals = document.querySelectorAll('.reveal');

  const animateSkills = () => {
    const progressBars = document.querySelectorAll('.skill-progress');
    progressBars.forEach(bar => {
      const targetWidth = bar.getAttribute('data-progress');
      bar.style.width = targetWidth;
    });
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        
        // Trigger skill bars animation when skills section comes into view
        if (entry.target.getAttribute('id') === 'skills' || entry.target.closest('#skills')) {
          animateSkills();
        }
        
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  reveals.forEach(reveal => {
    revealObserver.observe(reveal);
  });

  /* ==========================================================================
     CONTACT FORM SUBMISSION
     ========================================================================== */
  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.innerHTML = 'Đang gửi tin nhắn... <i class="fa-solid fa-circle-notch fa-spin"></i>';
      submitBtn.disabled = true;

      // Simulate network dispatch
      setTimeout(() => {
        submitBtn.innerHTML = 'Đã gửi thành công! <i class="fa-solid fa-check"></i>';
        submitBtn.style.background = 'var(--gradient-emerald-teal)';

        showToast('Cảm ơn bạn! Tin nhắn của bạn đã được gửi thành công.', 'fa-solid fa-paper-plane');
        contactForm.reset();

        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
          submitBtn.style.background = '';
        }, 3000);
      }, 1200);
    });
  }

  /* ==========================================================================
     BACK TO TOP BUTTON
     ========================================================================== */
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

});
