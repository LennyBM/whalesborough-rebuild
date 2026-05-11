/**
 * Whalesborough Cookie Consent — GDPR compliant
 * Equal prominence Accept / Reject per CNIL/ICO guidance.
 * Preference stored in localStorage; no cookies set by this script.
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'wb_consent_v1';

  // If preference already stored, wire up the reopen link but don't show banner.
  // In future: if consent === 'granted', fire analytics init here.
  var stored = localStorage.getItem(STORAGE_KEY);

  // Wire up "Cookie Settings" footer links to reopen the banner
  function wireReopenLinks() {
    document.querySelectorAll('[data-cookie-settings]').forEach(function (el) {
      el.addEventListener('click', function (e) {
        e.preventDefault();
        localStorage.removeItem(STORAGE_KEY);
        if (!document.getElementById('wb-consent')) {
          show();
        } else {
          banner.classList.add('wb-visible');
        }
      });
    });
  }

  if (stored) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', wireReopenLinks);
    } else {
      wireReopenLinks();
    }
    return;
  }

  // Build banner HTML
  var banner = document.createElement('div');
  banner.id = 'wb-consent';
  banner.setAttribute('role', 'dialog');
  banner.setAttribute('aria-live', 'polite');
  banner.setAttribute('aria-label', 'Cookie consent');
  banner.innerHTML =
    '<div class="wb-consent-inner">' +
      '<div class="wb-consent-text">' +
        '<strong>Cookies &amp; Privacy</strong>' +
        '<p>We use Google Analytics to understand how people use our site, and Google Fonts to display it. ' +
        'Nothing personal is stored without your permission. ' +
        '<a href="/cookie-policy/" class="wb-consent-link">Cookie Policy</a>' +
        '</p>' +
      '</div>' +
      '<div class="wb-consent-actions">' +
        '<button id="wb-reject" class="wb-btn wb-btn-reject">Reject</button>' +
        '<button id="wb-accept" class="wb-btn wb-btn-accept">Accept</button>' +
      '</div>' +
    '</div>';

  // Styles — injected so they don't depend on whalesborough.css loading first
  var style = document.createElement('style');
  style.textContent =
    '#wb-consent{' +
      'position:fixed;bottom:0;left:0;right:0;z-index:9999;' +
      'background:#1e1c18;border-top:1px solid rgba(251,249,246,0.12);' +
      'padding:1.25rem 2rem;' +
      'font-family:"Plus Jakarta Sans",system-ui,sans-serif;' +
      'transform:translateY(100%);opacity:0;transition:transform 0.35s ease,opacity 0.35s ease;' +
    '}' +
    '#wb-consent.wb-visible{transform:translateY(0);opacity:1;}' +
    '.wb-consent-inner{' +
      'max-width:1400px;margin:0 auto;display:flex;gap:2rem;' +
      'align-items:center;flex-wrap:wrap;justify-content:space-between;' +
    '}' +
    '.wb-consent-text strong{' +
      'display:block;font-size:0.8125rem;font-weight:700;' +
      'letter-spacing:0.06em;text-transform:uppercase;' +
      'color:#fbf9f6;margin-bottom:0.3rem;' +
    '}' +
    '.wb-consent-text p{' +
      'font-size:0.8125rem;color:rgba(251,249,246,0.65);' +
      'margin:0;line-height:1.5;' +
    '}' +
    '.wb-consent-link{color:rgba(251,249,246,0.65);text-underline-offset:2px;}' +
    '.wb-consent-link:hover{color:#fbf9f6;}' +
    '.wb-consent-actions{display:flex;gap:0.75rem;flex-shrink:0;}' +
    '.wb-btn{' +
      'font-family:inherit;font-size:0.75rem;font-weight:700;' +
      'letter-spacing:0.1em;text-transform:uppercase;' +
      'padding:0.6rem 1.5rem;border:1px solid;cursor:pointer;' +
      'transition:background 0.2s,color 0.2s;white-space:nowrap;' +
    '}' +
    /* Reject: outline style — equal visual weight, not hidden */
    '.wb-btn-reject{' +
      'background:transparent;color:rgba(251,249,246,0.75);' +
      'border-color:rgba(251,249,246,0.3);' +
    '}' +
    '.wb-btn-reject:hover{background:rgba(251,249,246,0.08);color:#fbf9f6;}' +
    /* Accept: filled — cognac */
    '.wb-btn-accept{' +
      'background:#703a1d;color:#fbf9f6;border-color:#703a1d;' +
    '}' +
    '.wb-btn-accept:hover{background:#5c2f16;}' +
    '@media(max-width:600px){' +
      '.wb-consent-inner{flex-direction:column;align-items:flex-start;gap:1rem;}' +
      '.wb-consent-actions{width:100%;justify-content:stretch;}' +
      '.wb-btn{flex:1;text-align:center;}' +
    '}';

  // Google Analytics 4 measurement ID
  // REPLACE this with the client's real GA4 measurement ID before launch.
  var GA_ID = 'G-XXXXXXXXXX';

  function loadGA4() {
    if (!GA_ID || GA_ID === 'G-XXXXXXXXXX') return; // no-op until real ID provided
    if (window.__ga4_loaded) return;
    window.__ga4_loaded = true;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA_ID, { anonymize_ip: true });
  }

  function hasGrantedConsent() {
    try {
      var stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return false;
      var parsed = JSON.parse(stored);
      return parsed && parsed.consent === 'granted';
    } catch (e) {
      // Legacy plain-string format
      return localStorage.getItem(STORAGE_KEY) === 'granted';
    }
  }

  function dismiss(choice) {
    var record = JSON.stringify({
      consent: choice,
      timestamp: new Date().toISOString(),
      version: STORAGE_KEY
    });
    localStorage.setItem(STORAGE_KEY, record);
    banner.classList.remove('wb-visible');
    setTimeout(function () {
      if (banner.parentNode) banner.parentNode.removeChild(banner);
    }, 400);
    if (choice === 'granted') loadGA4();
  }

  // Fire GA4 on return visits if consent was previously granted
  if (hasGrantedConsent()) loadGA4();

  // Show banner after a brief delay so page renders first
  function show() {
    document.head.appendChild(style);
    document.body.appendChild(banner);
    // Force reflow before adding class for transition to work
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        banner.classList.add('wb-visible');
      });
    });
    document.getElementById('wb-accept').addEventListener('click', function () { dismiss('granted'); });
    document.getElementById('wb-reject').addEventListener('click', function () { dismiss('denied'); });
    wireReopenLinks();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', show);
  } else {
    setTimeout(show, 200);
  }
}());
