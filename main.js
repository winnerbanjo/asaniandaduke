document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // STICKY HEADER & ACTIVE LINK ON SCROLL
  // ==========================================
  const header = document.querySelector('.header');
  
  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Run once in case page starts scrolled

  // Set active link in navigation
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-links a, .mobile-links a');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // ==========================================
  // MOBILE NAVIGATION DRAWER
  // ==========================================
  const menuBtn = document.querySelector('.menu-btn');
  const mobileNav = document.querySelector('.mobile-nav');
  const body = document.body;

  if (menuBtn && mobileNav) {
    menuBtn.addEventListener('click', () => {
      menuBtn.classList.toggle('open');
      mobileNav.classList.toggle('open');
      
      // Prevent body scrolling when mobile nav is open
      if (mobileNav.classList.contains('open')) {
        body.style.overflow = 'hidden';
      } else {
        body.style.overflow = '';
      }
    });

    // Close menu when clicking a link
    const mobileLinks = document.querySelectorAll('.mobile-links a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuBtn.classList.remove('open');
        mobileNav.classList.remove('open');
        body.style.overflow = '';
      });
    });
  }

  // ==========================================
  // HERO IMAGE AUTOMATIC CAROUSEL
  // ==========================================
  const slides = document.querySelectorAll('.hero-slider .slide');
  let currentSlide = 0;
  const slideInterval = 5000; // 5 seconds

  if (slides.length > 1) {
    setInterval(() => {
      slides[currentSlide].classList.remove('active');
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add('active');
    }, slideInterval);
  }

  // ==========================================
  // DYNAMIC PHOTO GALLERY LIGHTBOX
  // ==========================================
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.querySelector('.lightbox');
  const lightboxImg = document.querySelector('.lightbox-content img');
  const lightboxCaption = document.querySelector('.lightbox-caption');
  const lightboxClose = document.querySelector('.lightbox-close');

  if (galleryItems.length > 0 && lightbox && lightboxImg) {
    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const title = item.querySelector('.gallery-title');
        const tag = item.querySelector('.gallery-tag');
        
        if (img) {
          lightboxImg.src = img.src;
          lightboxImg.alt = img.alt;
          
          let captionText = '';
          if (title) captionText += title.textContent;
          if (tag) captionText += ` (${tag.textContent})`;
          
          lightboxCaption.textContent = captionText;
          lightbox.classList.add('open');
          body.style.overflow = 'hidden'; // lock scroll
        }
      });
    });

    const closeLightbox = () => {
      lightbox.classList.remove('open');
      body.style.overflow = ''; // restore scroll
    };

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
        closeLightbox();
      }
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('open')) {
        closeLightbox();
      }
    });
  }

  // ==========================================
  // CLIPBOARD COPIER & TOAST FEEDBACK
  // ==========================================
  const copyBtn = document.getElementById('copy-bank-details');
  
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const accNumber = "0125797731";
      const accName = "Asani and Aduke Foundation";
      const bank = "Wema Bank";
      
      const textToCopy = `Bank: ${bank}\nAccount Name: ${accName}\nAccount Number: ${accNumber}`;
      
      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast("Bank details copied to clipboard!");
      }).catch(err => {
        // Fallback copy for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = textToCopy;
        document.body.appendChild(textarea);
        textarea.select();
        try {
          document.execCommand('copy');
          showToast("Bank details copied!");
        } catch (e) {
          console.error("Failed to copy details", e);
        }
        document.body.removeChild(textarea);
      });
    });
  }

  // Helper function to show toast notifications
  const showToast = (message) => {
    let toast = document.querySelector('.toast-msg');
    
    // Create toast if it doesn't exist
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast-msg';
      document.body.appendChild(toast);
    }
    
    toast.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  };

  // ==========================================
  // FORM INTERACTIVE VALIDATION & SUBMISSION
  // ==========================================
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Perform simple verification
      let isValid = true;
      const requiredInputs = form.querySelectorAll('[required]');
      
      requiredInputs.forEach(input => {
        if (!input.value.trim()) {
          isValid = false;
          input.style.borderColor = 'red';
        } else {
          input.style.borderColor = '';
        }
      });

      if (isValid) {
        // Check if newsletter, volunteer, or contact form
        if (form.classList.contains('newsletter-form')) {
          showToast("Thank you for subscribing to our newsletter!");
          form.reset();
        } else if (form.id === 'volunteer-form') {
          showToast("Application submitted! Thank you for volunteering.");
          form.reset();
        } else {
          showToast("Message sent successfully! We'll get back to you shortly.");
          form.reset();
        }
      } else {
        showToast("Please fill in all required fields.");
      }
    });
  });

});
