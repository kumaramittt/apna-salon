/**
 * APNA SALON & BEAUTY PARLOUR - JAVASCRIPT ENGINE
 * Handles:
 * 1. Mobile Navigation & Backdrop
 * 2. Sticky Navbar & Active Section Tracking
 * 3. Services Filter
 * 4. Photo Gallery Lightbox
 * 5. Real-Time Opening Hours & Status Calculator
 * 6. Interactive WhatsApp Appointment Booking Form
 * 7. Scroll Reveal Animations & Back to Top
 */

document.addEventListener('DOMContentLoaded', () => {
  // Salon WhatsApp & Contact Configuration
  const SALON_PHONE_NUMBER = '919876543210'; // WhatsApp international format (e.g. India +91)
  const SALON_NAME = 'Apna Salon & Beauty Parlour';

  // --- 1. Mobile Navigation Drawer ---
  const menuToggle = document.getElementById('menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileBackdrop = document.getElementById('mobile-backdrop');
  const mobileCloseBtn = document.getElementById('mobile-close-btn');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function openMobileMenu() {
    if (mobileNav && mobileBackdrop) {
      mobileNav.classList.add('open');
      mobileBackdrop.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
  }

  function closeMobileMenu() {
    if (mobileNav && mobileBackdrop) {
      mobileNav.classList.remove('open');
      mobileBackdrop.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (menuToggle) {
    menuToggle.addEventListener('click', openMobileMenu);
  }
  if (mobileCloseBtn) {
    mobileCloseBtn.addEventListener('click', closeMobileMenu);
  }
  if (mobileBackdrop) {
    mobileBackdrop.addEventListener('click', closeMobileMenu);
  }
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // --- 2. Sticky Navbar & Scroll Effects ---
  const header = document.getElementById('main-header');
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;

    // Header sticky shadow / blur
    if (header) {
      if (scrollPos > 30) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // Back to top visibility
    if (backToTopBtn) {
      if (scrollPos > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // --- 3. Active Link Highlighting (Scroll Spy) ---
  const sections = document.querySelectorAll('section[id]');
  const desktopNavLinks = document.querySelectorAll('.nav-link');

  function updateActiveNavLink() {
    const scrollY = window.pageYOffset + 120;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        desktopNavLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavLink);

  // --- 4. Services Filter Tabs ---
  const filterButtons = document.querySelectorAll('.filter-btn');
  const serviceCards = document.querySelectorAll('.service-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      serviceCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          card.style.animation = 'fadeInUp 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // --- 5. Gallery Lightbox Modal ---
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImage = document.getElementById('lightbox-image');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxCloseBtn = document.getElementById('lightbox-close-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('.gallery-image');
      const title = item.querySelector('.gallery-caption-title')?.textContent || 'Apna Salon Masterpiece';
      const category = item.querySelector('.gallery-caption-category')?.textContent || '';

      if (lightboxModal && lightboxImage && img) {
        lightboxImage.src = img.src;
        lightboxImage.alt = title;
        if (lightboxCaption) {
          lightboxCaption.textContent = `${title} — ${category}`;
        }
        lightboxModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeLightbox() {
    if (lightboxModal) {
      lightboxModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (lightboxCloseBtn) {
    lightboxCloseBtn.addEventListener('click', closeLightbox);
  }

  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        closeLightbox();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightboxModal && lightboxModal.classList.contains('active')) {
      closeLightbox();
    }
  });

  // --- 6. Real-Time Opening Hours & Live Status Calculator ---
  function calculateOpeningStatus() {
    const statusBadge = document.getElementById('live-status-badge');
    const statusText = document.getElementById('live-status-text');
    if (!statusBadge || !statusText) return;

    const now = new Date();
    const day = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    const currentHour = now.getHours() + now.getMinutes() / 60;

    // Highlight current day in table
    const dayRows = document.querySelectorAll('.hours-table tr[data-day]');
    dayRows.forEach(row => {
      const rowDay = parseInt(row.getAttribute('data-day'), 10);
      if (rowDay === day) {
        row.classList.add('today');
        const dayCell = row.querySelector('.day');
        if (dayCell && !dayCell.querySelector('.today-indicator')) {
          const badge = document.createElement('span');
          badge.className = 'today-indicator';
          badge.style.cssText = 'background: #c5a880; color: #0d0c0b; font-size: 0.68rem; font-weight: 700; padding: 2px 7px; border-radius: 4px; margin-left: 6px; text-transform: uppercase;';
          badge.textContent = 'Today';
          dayCell.appendChild(badge);
        }
      }
    });

    let isOpen = false;
    let closingTime = '';
    let opensNext = '';

    if (day === 0) {
      // Sunday: 10:00 AM (10.0) to 08:00 PM (20.0)
      if (currentHour >= 10 && currentHour < 20) {
        isOpen = true;
        closingTime = '08:00 PM';
      } else if (currentHour < 10) {
        opensNext = 'today at 10:00 AM';
      } else {
        opensNext = 'tomorrow at 09:30 AM';
      }
    } else {
      // Monday - Saturday: 09:30 AM (9.5) to 08:30 PM (20.5)
      if (currentHour >= 9.5 && currentHour < 20.5) {
        isOpen = true;
        closingTime = '08:30 PM';
      } else if (currentHour < 9.5) {
        opensNext = 'today at 09:30 AM';
      } else {
        opensNext = day === 6 ? 'tomorrow at 10:00 AM' : 'tomorrow at 09:30 AM';
      }
    }

    if (isOpen) {
      statusBadge.classList.remove('closed');
      statusText.innerHTML = `<strong>Open Now</strong> — Closes today at ${closingTime}`;
    } else {
      statusBadge.classList.add('closed');
      statusText.innerHTML = `<strong>Closed Now</strong> — Opens ${opensNext}`;
    }
  }

  calculateOpeningStatus();

  // --- 7. WhatsApp Appointment Booking Form ---
  const bookingForm = document.getElementById('appointment-form');

  if (bookingForm) {
    // Set minimum date to today
    const dateInput = document.getElementById('booking-date');
    if (dateInput) {
      const today = new Date().toISOString().split('T')[0];
      dateInput.min = today;
    }

    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('booking-name')?.value.trim() || '';
      const phone = document.getElementById('booking-phone')?.value.trim() || '';
      const service = document.getElementById('booking-service')?.value || 'General Consultation';
      const date = document.getElementById('booking-date')?.value || 'Flexible';
      const time = document.getElementById('booking-time')?.value || 'Anytime';
      const message = document.getElementById('booking-message')?.value.trim() || 'No additional notes';

      if (!name || !phone) {
        alert('Please provide your name and phone number to proceed.');
        return;
      }

      // Construct clean WhatsApp message
      const formattedText = 
`Hello ${SALON_NAME}! ✨
I would like to book an appointment:

👤 *Name:* ${name}
📞 *Phone:* ${phone}
💇 *Service Requested:* ${service}
📅 *Preferred Date:* ${date}
⏰ *Preferred Time:* ${time}
📝 *Special Note:* ${message}

Please confirm my booking slot. Thank you!`;

      const encodedText = encodeURIComponent(formattedText);
      const whatsappUrl = `https://wa.me/${SALON_PHONE_NUMBER}?text=${encodedText}`;

      // Open WhatsApp in a new tab/window
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    });
  }

  // --- 8. Scroll Reveal Observer ---
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback if IntersectionObserver not supported
    revealElements.forEach(el => el.classList.add('active'));
  }
});
