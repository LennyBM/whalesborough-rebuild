/* ============================================
   WHALESBOROUGH FARM RESORT & SPA
   Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* --- Sticky nav shadow on scroll --- */
  const nav = document.querySelector('.site-nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  /* --- Mobile menu --- */
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileClose = document.querySelector('.mobile-close');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => mobileMenu.classList.add('open'));
    mobileClose?.addEventListener('click', () => mobileMenu.classList.remove('open'));
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => mobileMenu.classList.remove('open'));
    });
  }

  /* --- Animated stat counters --- */
  const counters = document.querySelectorAll('[data-count]');
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      const prefix = el.dataset.prefix || '';
      const duration = 1800;
      const start = performance.now();
      const isFloat = target % 1 !== 0;

      const step = (now) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        const current = target * ease;
        el.textContent = prefix + (isFloat ? current.toFixed(1) : Math.floor(current).toLocaleString()) + suffix;
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      countObserver.unobserve(el);
    });
  }, { threshold: 0.3 });
  counters.forEach(c => countObserver.observe(c));

  /* --- Testimonial carousel --- */
  const testimonials = document.querySelectorAll('.testimonial-slide');
  let current = 0;
  const showTestimonial = (idx) => {
    testimonials.forEach((t, i) => {
      t.style.opacity = i === idx ? '1' : '0';
      t.style.position = i === idx ? 'relative' : 'absolute';
    });
  };
  if (testimonials.length > 1) {
    showTestimonial(0);
    document.querySelector('.testimonial-prev')?.addEventListener('click', () => {
      current = (current - 1 + testimonials.length) % testimonials.length;
      showTestimonial(current);
    });
    document.querySelector('.testimonial-next')?.addEventListener('click', () => {
      current = (current + 1) % testimonials.length;
      showTestimonial(current);
    });
    setInterval(() => {
      current = (current + 1) % testimonials.length;
      showTestimonial(current);
    }, 7000);
  }

  /* --- Scroll-triggered fade-up for elements with .reveal --- */
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
  reveals.forEach(r => revealObserver.observe(r));

  /* --- Render nav logo as white marks on transparent background for dark nav --- */
  document.querySelectorAll('.nav-logo img').forEach(img => {
    const toWhiteLogo = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      ctx.drawImage(img, 0, 0);
      try {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const d = imageData.data;
        for (let i = 0; i < d.length; i += 4) {
          const minC = Math.min(d[i], d[i + 1], d[i + 2]);
          if (minC > 230) {
            d[i + 3] = 0; // near-white background → transparent
          } else {
            // Logo marks → white, with soft anti-aliased edge
            d[i] = d[i + 1] = d[i + 2] = 255;
            d[i + 3] = minC > 180 ? Math.round((230 - minC) / 50 * 255) : 255;
          }
        }
        ctx.putImageData(imageData, 0, 0);
        img.src = canvas.toDataURL('image/png');
      } catch (e) { /* cross-origin — leave as-is */ }
    };
    if (img.complete && img.naturalWidth) toWhiteLogo();
    else img.addEventListener('load', toWhiteLogo);
  });

  /* --- Availability form: set min date to today --- */
  const dateInputs = document.querySelectorAll('input[type="date"]');
  const today = new Date().toISOString().split('T')[0];
  dateInputs.forEach(input => { input.min = today; });

  /* --- Guests dropdown auto-link to Landal booking --- */
  const availabilityForm = document.getElementById('availability-form');
  if (availabilityForm) {
    availabilityForm.addEventListener('submit', (e) => {
      e.preventDefault();
      window.open('https://www.landal.co.uk/parks/whalesborough-resort/', '_blank');
    });
  }

});
