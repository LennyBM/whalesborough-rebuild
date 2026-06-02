/* ============================================
   WHALESBOROUGH FARM RESORT & SPA
   Main JavaScript
   ============================================ */

// With type="module" the browser defers execution until the DOM is ready,
// so DOMContentLoaded may already have fired by the time this script runs.
// This pattern handles both cases safely.
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

function init() {
  'use strict';

  /* --- Unified scroll handler (nav shadow + scroll-to-top) --- */
  const nav = document.querySelector('.site-nav');

  /* --- Mobile menu --- */
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileClose = document.querySelector('.mobile-close');
  if (hamburger && mobileMenu) {
    const menuFocusable = () => mobileMenu.querySelectorAll('a[href], button:not([disabled])');
    const onMenuKeydown = (e) => {
      if (e.key === 'Escape') { closeMenu(); return; }
      if (e.key !== 'Tab') return;
      const items = menuFocusable();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      }
    };
    const openMenu = () => {
      mobileMenu.classList.add('open');
      hamburger.setAttribute('aria-expanded', 'true');
      document.addEventListener('keydown', onMenuKeydown);
      const items = menuFocusable();
      if (items.length) items[0].focus();
    };
    const closeMenu = () => {
      mobileMenu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.removeEventListener('keydown', onMenuKeydown);
      hamburger.focus();
    };
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.addEventListener('click', openMenu);
    mobileClose?.addEventListener('click', closeMenu);
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', closeMenu);
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
        // INP: skip frame when tab is hidden to avoid wasted rAF work
        if (document.visibilityState === 'hidden') {
          requestAnimationFrame(step);
          return;
        }
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
  const dots = document.querySelectorAll('.testimonial-dots button');
  let current = 0;
  const showTestimonial = (idx) => {
    testimonials.forEach((t, i) => {
      t.style.opacity = i === idx ? '1' : '0';
      t.style.position = i === idx ? 'relative' : 'absolute';
    });
    dots.forEach((d, i) => {
      d.classList.toggle('active', i === idx);
      d.setAttribute('aria-selected', i === idx ? 'true' : 'false');
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
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        current = i;
        showTestimonial(current);
      });
    });
    // Auto-advance — respects reduced-motion, pauses on hover/focus, tab-hidden & unload (WCAG 2.2.1)
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const carousel = document.querySelector('.testimonials-wrap');
    let autoAdvance = null;
    const advance = () => { current = (current + 1) % testimonials.length; showTestimonial(current); };
    const startAuto = () => {
      if (autoAdvance || reduceMotion.matches || document.visibilityState === 'hidden') return;
      autoAdvance = setInterval(advance, 7000);
    };
    const stopAuto = () => { clearInterval(autoAdvance); autoAdvance = null; };
    startAuto();

    // Pause when tab is hidden (INP / battery), resume when visible
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') stopAuto(); else startAuto();
    });
    // Pause while the visitor is reading (hover) or tabbing through the carousel
    if (carousel) {
      carousel.addEventListener('mouseenter', stopAuto);
      carousel.addEventListener('mouseleave', startAuto);
      carousel.addEventListener('focusin', stopAuto);
      carousel.addEventListener('focusout', startAuto);
    }
    // Stop immediately if the visitor turns on reduced-motion mid-session
    reduceMotion.addEventListener('change', () => { if (reduceMotion.matches) stopAuto(); else startAuto(); });
    // Clean up interval if page unloads
    window.addEventListener('pagehide', stopAuto);
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

  /* --- Connection-aware hero video: only skip on genuinely slow networks or explicit Data Saver --- */
  const heroVideo = document.querySelector('video.hero-bg');
  if (heroVideo) {
    const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const slow = conn && (conn.saveData || /^(slow-2g|2g)$/i.test(conn.effectiveType || ''));
    if (slow) {
      // Keep the poster, drop the video sources so nothing downloads
      heroVideo.removeAttribute('autoplay');
      heroVideo.preload = 'none';
      heroVideo.querySelectorAll('source').forEach(s => s.remove());
      try { heroVideo.load(); } catch (e) { /* noop */ }
    } else {
      // Nudge autoplay on mobile browsers that are strict about it
      heroVideo.muted = true;
      heroVideo.setAttribute('playsinline', '');
      const tryPlay = () => {
        const p = heroVideo.play();
        if (p && typeof p.catch === 'function') p.catch(() => { /* poster remains */ });
      };
      if (heroVideo.readyState >= 2) tryPlay();
      else heroVideo.addEventListener('loadeddata', tryPlay, { once: true });
      // If the user interacts at all, retry (covers Low Power Mode on iOS)
      document.addEventListener('touchstart', tryPlay, { once: true, passive: true });
    }
  }

  /* --- Map facade: click to load the real Google Maps iframe --- */
  document.querySelectorAll('.map-facade').forEach(wrap => {
    const btn = wrap.querySelector('.map-facade-btn');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const src = wrap.dataset.embedSrc;
      const title = wrap.dataset.embedTitle || 'Map';
      if (!src) return;
      const iframe = document.createElement('iframe');
      iframe.src = src;
      iframe.title = title;
      iframe.loading = 'lazy';
      iframe.referrerPolicy = 'no-referrer-when-downgrade';
      iframe.allowFullscreen = true;
      btn.remove();
      wrap.appendChild(iframe);
    }, { once: true });
  });

  /* --- Scroll-to-top button --- */
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const topBtn = document.createElement('button');
  topBtn.type = 'button';
  topBtn.className = 'scroll-top-btn';
  topBtn.setAttribute('aria-label', 'Scroll back to top');
  topBtn.innerHTML = '↑';
  document.body.appendChild(topBtn);
  topBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'instant' : 'smooth' });
  });

  /* --- Single scroll listener for nav shadow + scroll-to-top --- */
  // Use rAF ticking to avoid layout thrashing on every scroll event (INP)
  let scrollTicking = false;
  window.addEventListener('scroll', () => {
    if (!scrollTicking) {
      requestAnimationFrame(() => {
        const y = window.scrollY;
        if (nav) nav.classList.toggle('scrolled', y > 20);
        topBtn.classList.toggle('visible', y > 800);
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  }, { passive: true });

  /* --- Analytics utility (consent-safe — gtag only fires after consent.js loads it) --- */
  window.wbTrack = function(eventName, params) {
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, params || {});
    }
  };

  // Wire up any elements with data-track attributes
  document.querySelectorAll('[data-track]').forEach(function(el) {
    el.addEventListener('click', function() {
      window.wbTrack(el.dataset.track, { location: el.closest('section')?.id || 'unknown' });
    });
  });

  // Auto-track tel:, mailto:, and outbound links (consent-gated via wbTrack)
  document.querySelectorAll('a[href^="tel:"]').forEach(function(a) {
    a.addEventListener('click', function() {
      window.wbTrack('phone_click', { number: a.getAttribute('href').replace('tel:', '') });
    });
  });
  document.querySelectorAll('a[href^="mailto:"]').forEach(function(a) {
    a.addEventListener('click', function() {
      window.wbTrack('email_click', { address: a.getAttribute('href').replace('mailto:', '') });
    });
  });
  document.querySelectorAll('a[href^="http"]').forEach(function(a) {
    try {
      var url = new URL(a.href);
      if (url.host !== location.host) {
        a.addEventListener('click', function() {
          window.wbTrack('outbound_click', { host: url.host, path: url.pathname });
        });
      }
    } catch (e) { /* malformed href */ }
  });

  // Form submit + loading-state for any data-netlify form
  document.querySelectorAll('form[data-netlify="true"]').forEach(function(form) {
    var submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');
    var originalLabel = submitBtn ? submitBtn.textContent : '';
    form.addEventListener('submit', function() {
      window.wbTrack('form_submit', { form: form.getAttribute('name') || 'unknown' });
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.setAttribute('aria-busy', 'true');
        submitBtn.textContent = 'Sending…';
        // Reset after 8s in case of failure so user can retry
        setTimeout(function() {
          submitBtn.disabled = false;
          submitBtn.removeAttribute('aria-busy');
          submitBtn.textContent = originalLabel;
        }, 8000);
      }
    });
  });

  /* --- Exit-intent modal (desktop only, once per session) --- */
  const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
  const hasShown = sessionStorage.getItem('whalesborough-exit-shown');
  if (isDesktop && !hasShown && !document.querySelector('.exit-modal-backdrop')) {
    const backdrop = document.createElement('div');
    backdrop.className = 'exit-modal-backdrop';
    backdrop.innerHTML = `
      <div class="exit-modal" role="dialog" aria-labelledby="exit-modal-title" aria-modal="true">
        <button type="button" class="exit-modal-close" aria-label="Close">&times;</button>
        <h2 id="exit-modal-title">Before you go…</h2>
        <p>Cottages book up fastest in spring. Call us now or view our 2026 availability — we're here if you need a hand.</p>
        <div class="exit-modal-actions">
          <a href="https://www.landal.co.uk/parks/whalesborough-resort/?utm_source=whalesborough&utm_medium=website&utm_campaign=book_direct&utm_content=exit_intent" target="_blank" rel="noopener noreferrer" class="btn-book" data-track="book-click">See 2026 Dates</a>
          <a href="tel:01288361940" class="btn-ghost">Call 01288 361940</a>
        </div>
      </div>
    `;
    document.body.appendChild(backdrop);

    const dialog = backdrop.querySelector('.exit-modal');
    const focusable = () => dialog.querySelectorAll('a[href], button:not([disabled])');
    let lastFocused = null;

    const onKeydown = (e) => {
      if (e.key === 'Escape') { closeModal(); return; }
      if (e.key !== 'Tab') return;
      // Focus trap — keep Tab inside the dialog (WCAG 2.1.2 / 2.4.3)
      const items = focusable();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      }
    };

    const openModal = () => {
      lastFocused = document.activeElement;
      backdrop.classList.add('open');
      sessionStorage.setItem('whalesborough-exit-shown', '1');
      document.addEventListener('keydown', onKeydown);
      const items = focusable();
      if (items.length) items[0].focus();
    };

    const closeModal = () => {
      backdrop.classList.remove('open');
      sessionStorage.setItem('whalesborough-exit-shown', '1');
      document.removeEventListener('keydown', onKeydown);
      // Restore focus to wherever the user was before the modal stole it
      if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
    };
    backdrop.querySelector('.exit-modal-close').addEventListener('click', closeModal);
    backdrop.addEventListener('click', (e) => { if (e.target === backdrop) closeModal(); });

    const onMouseLeave = (e) => {
      if (!e.toElement && !e.relatedTarget && e.clientY < 10) {
        if (sessionStorage.getItem('whalesborough-exit-shown')) return;
        openModal();
        document.removeEventListener('mouseout', onMouseLeave);
      }
    };
    document.addEventListener('mouseout', onMouseLeave);
  }

} // end init()
