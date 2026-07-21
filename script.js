document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     MOBILE NAVIGATION MENU
     ========================================================================== */
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close mobile menu when a nav link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  /* ==========================================================================
     STICKY HEADER
     ========================================================================== */
  const header = document.getElementById('header');

  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Check initially

  /* ==========================================================================
     ACTIVE LINK TRACKING ON SCROLL
     ========================================================================== */
  const sections = document.querySelectorAll('section');

  const trackActiveLink = () => {
    const scrollPosition = window.scrollY + 120; // Offset

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

  window.addEventListener('scroll', trackActiveLink);

  /* ==========================================================================
     REVEAL ANIMATIONS (Intersection Observer)
     ========================================================================== */
  const reveals = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        
        // Trigger skill progress bars specifically
        if (entry.target.classList.contains('skills-wrapper') || entry.target.closest('#skills')) {
          animateSkills();
        }
        
        observer.unobserve(entry.target); // Animates once
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  reveals.forEach(reveal => {
    revealObserver.observe(reveal);
  });

  /* ==========================================================================
     ANIMATING SKILL BARS
     ========================================================================== */
  const animateSkills = () => {
    const progressBars = document.querySelectorAll('.skill-progress');
    progressBars.forEach(bar => {
      const targetWidth = bar.getAttribute('data-progress');
      bar.style.width = targetWidth;
    });
  };

  /* ==========================================================================
     CONTACT FORM HANDLING
     ========================================================================== */
  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Simple visual success feedback
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.innerHTML = 'Đang gửi... <i class="fa-solid fa-spinner fa-spin"></i>';
      submitBtn.disabled = true;

      // Simulate sending API request
      setTimeout(() => {
        submitBtn.innerHTML = 'Đã gửi thành công! <i class="fa-solid fa-check"></i>';
        submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
        submitBtn.style.boxShadow = '0 4px 20px rgba(16, 185, 129, 0.3)';

        // Show thank you alert
        alert('Cảm ơn bạn đã liên hệ! Tôi sẽ phản hồi lại bạn sớm nhất có thể.');

        // Reset form
        contactForm.reset();

        // Reset button state
        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
          submitBtn.style.background = '';
          submitBtn.style.boxShadow = '';
        }, 3000);
      }, 1500);
    });
  }

  /* ==========================================================================
     THEME TOGGLE (LIGHT / DARK MODE)
     ========================================================================== */
  const themeToggleBtn = document.getElementById('theme-toggle');
  
  if (themeToggleBtn) {
    const themeIcon = themeToggleBtn.querySelector('i');
    
    // Function to update toggle button icon
    const updateThemeIcon = (theme) => {
      if (theme === 'dark') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
      } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
      }
    };

    // Get current theme from documentElement (set by inline script in head)
    let currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    updateThemeIcon(currentTheme);

    // Event listener for click
    themeToggleBtn.addEventListener('click', () => {
      currentTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      
      // Update attribute on html element
      document.documentElement.setAttribute('data-theme', currentTheme);
      
      // Save choice to localStorage
      localStorage.setItem('theme', currentTheme);
      
      // Update toggle icon
      updateThemeIcon(currentTheme);
    });
  }

});
