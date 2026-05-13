/**
 * Whalesborough Cookie Consent — PECR / UK GDPR / ICO compliant
 * Equal prominence Reject all / Accept all per ICO 2023 enforcement guidance.
 * Granular category management with Manage Preferences panel.
 * Preference stored in localStorage under wb_consent_v2 (no cookies set by this script).
 *
 * ⚠️ CLIENT ACTION REQUIRED: Replace GA_ID ('G-XXXXXXXXXX') with the real
 *    Google Analytics 4 Measurement ID before going live. Search for GA_ID below.
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'wb_consent_v2';
  var CONSENT_VERSION = '2026-05';

  function getStored() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)); } catch (e) { return null; }
  }

  function wireReopenLinks() {
    document.querySelectorAll('[data-cookie-settings]').forEach(function (el) {
      el.addEventListener('click', function (e) {
        e.preventDefault();
        localStorage.removeItem(STORAGE_KEY);
        if (!document.getElementById('wb-consent')) {
          show();
        } else {
          document.getElementById('wb-consent').classList.add('wb-visible');
        }
      });
    });
  }

  window.wb = window.wb || {};
  window.wb.hasGrantedConsent = hasGrantedConsent;

  var stored = getStored();
  if (stored) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', wireReopenLinks);
    } else {
      wireReopenLinks();
    }
    if (stored.categories && stored.categories.analytics) loadGA4();
    return;
  }

  var banner = document.createElement('div');
  banner.id = 'wb-consent';
  banner.setAttribute('role', 'dialog');
  banner.setAttribute('aria-modal', 'true');
  banner.setAttribute('aria-label', 'Cookie consent');
  banner.setAttribute('aria-describedby', 'wb-consent-desc');
  banner.setAttribute('data-nosnippet', '');
  banner.innerHTML =
    '<div class="wb-consent-inner">' +
      '<div class="wb-consent-text">' +
        '<strong>Cookies &amp; Privacy</strong>' +
        '<p id="wb-consent-desc">We use Google Analytics to understand how visitors use this site. ' +
        'No tracking starts until you choose. ' +
        '<a href="/cookie-policy/" class="wb-consent-link">Cookie Policy</a></p>' +
      '</div>' +
      '<div class="wb-consent-actions">' +
        '<button id="wb-manage" class="wb-btn wb-btn-manage" type="button">Manage preferences</button>' +
        '<button id="wb-reject" class="wb-btn wb-btn-reject" type="button">Reject all</button>' +
        '<button id="wb-accept" class="wb-btn wb-btn-accept" type="button">Accept all</button>' +
      '</div>' +
    '</div>' +
    '<div id="wb-prefs" class="wb-prefs" hidden>' +
      '<div class="wb-prefs-inner">' +
        '<div class="wb-pref-row">' +
          '<div class="wb-pref-info">' +
            '<span class="wb-pref-name">Strictly necessary</span>' +
            '<span class="wb-pref-desc">Required for the site to work. Cannot be disabled.</span>' +
          '</div>' +
          '<span class="wb-pref-always">Always on</span>' +
        '</div>' +
        '<div class="wb-pref-row">' +
          '<div class="wb-pref-info">' +
            '<span class="wb-pref-name">Analytics</span>' +
            '<span class="wb-pref-desc">Google Analytics 4 — helps us understand which pages are most useful. No personal data is shared. Cookies: <em>_ga, _ga_*</em> (2 years).</span>' +
          '</div>' +
          '<label class="wb-toggle" aria-label="Analytics cookies">' +
            '<input type="checkbox" id="wb-analytics-toggle" />' +
            '<span class="wb-toggle-track"></span>' +
          '</label>' +
        '</div>' +
        '<div class="wb-prefs-actions">' +
          '<button id="wb-save-prefs" class="wb-btn wb-btn-accept" type="button">Save preferences</button>' +
        '</div>' +
      '</div>' +
    '</div>';

  var style = document.createElement('style');
  style.textContent =
    '#wb-consent{' +
      'position:fixed;bottom:0;left:0;right:0;z-index:9999;' +
      'background:#1e1c18;border-top:1px solid rgba(251,249,246,0.12);' +
      'font-family:"Plus Jakarta Sans",system-ui,sans-serif;' +
      'transform:translateY(100%);opacity:0;transition:transform 0.35s ease,opacity 0.35s ease;' +
    '}' +
    '#wb-consent.wb-visible{transform:translateY(0);opacity:1;}' +
    '.wb-consent-inner{' +
      'max-width:1400px;margin:0 auto;display:flex;gap:2rem;' +
      'align-items:center;flex-wrap:wrap;justify-content:space-between;' +
      'padding:1.25rem 2rem;' +
    '}' +
    '.wb-consent-text strong{' +
      'display:block;font-size:0.8125rem;font-weight:700;' +
      'letter-spacing:0.06em;text-transform:uppercase;' +
      'color:#fbf9f6;margin-bottom:0.3rem;' +
    '}' +
    '.wb-consent-text p{font-size:0.8125rem;color:rgba(251,249,246,0.65);margin:0;line-height:1.5;}' +
    '.wb-consent-link{color:rgba(251,249,246,0.65);text-underline-offset:2px;}' +
    '.wb-consent-link:hover{color:#fbf9f6;}' +
    '.wb-consent-actions{display:flex;gap:0.75rem;flex-shrink:0;flex-wrap:wrap;}' +
    '.wb-btn{' +
      'font-family:inherit;font-size:0.75rem;font-weight:700;' +
      'letter-spacing:0.1em;text-transform:uppercase;' +
      'padding:0.6rem 1.5rem;border:1px solid;cursor:pointer;' +
      'transition:background 0.2s,color 0.2s;white-space:nowrap;' +
    '}' +
    /* Manage: ghost — clearly tertiary */
    '.wb-btn-manage{background:transparent;color:rgba(251,249,246,0.5);border-color:rgba(251,249,246,0.2);}' +
    '.wb-btn-manage:hover{color:rgba(251,249,246,0.8);border-color:rgba(251,249,246,0.4);}' +
    /* Reject all: equal filled weight — dark neutral so neither button is deprioritised */
    '.wb-btn-reject{background:rgba(251,249,246,0.12);color:#fbf9f6;border-color:rgba(251,249,246,0.25);}' +
    '.wb-btn-reject:hover{background:rgba(251,249,246,0.2);}' +
    /* Accept all: cognac fill */
    '.wb-btn-accept{background:#703a1d;color:#fbf9f6;border-color:#703a1d;}' +
    '.wb-btn-accept:hover{background:#5c2f16;}' +
    /* Manage preferences panel */
    '.wb-prefs{background:#161410;border-top:1px solid rgba(251,249,246,0.08);padding:1.25rem 2rem;}' +
    '.wb-prefs[hidden]{display:none;}' +
    '.wb-prefs-inner{max-width:1400px;margin:0 auto;}' +
    '.wb-pref-row{display:flex;align-items:center;justify-content:space-between;gap:2rem;' +
      'padding:0.875rem 0;border-bottom:1px solid rgba(251,249,246,0.07);}' +
    '.wb-pref-info{flex:1;}' +
    '.wb-pref-name{display:block;font-size:0.8125rem;font-weight:700;color:#fbf9f6;margin-bottom:0.25rem;}' +
    '.wb-pref-desc{font-size:0.75rem;color:rgba(251,249,246,0.5);line-height:1.5;}' +
    '.wb-pref-always{font-size:0.75rem;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;' +
      'color:rgba(251,249,246,0.35);flex-shrink:0;}' +
    /* Toggle switch */
    '.wb-toggle{position:relative;display:inline-block;width:44px;height:24px;flex-shrink:0;}' +
    '.wb-toggle input{opacity:0;width:0;height:0;position:absolute;}' +
    '.wb-toggle-track{' +
      'position:absolute;inset:0;background:rgba(251,249,246,0.15);' +
      'border-radius:12px;cursor:pointer;transition:background 0.2s;' +
    '}' +
    '.wb-toggle-track::before{' +
      'content:"";position:absolute;width:18px;height:18px;' +
      'background:#fbf9f6;border-radius:50%;top:3px;left:3px;transition:transform 0.2s;' +
    '}' +
    '.wb-toggle input:checked + .wb-toggle-track{background:#703a1d;}' +
    '.wb-toggle input:checked + .wb-toggle-track::before{transform:translateX(20px);}' +
    '.wb-toggle input:focus-visible + .wb-toggle-track{outline:2px solid #703a1d;outline-offset:2px;}' +
    '.wb-prefs-actions{padding-top:1rem;display:flex;justify-content:flex-end;}' +
    '@media(max-width:600px){' +
      '.wb-consent-inner{flex-direction:column;align-items:flex-start;gap:1rem;}' +
      '.wb-consent-actions{width:100%;}' +
      '.wb-btn{flex:1;text-align:center;}' +
      '.wb-prefs{padding:1rem;}' +
      '.wb-pref-row{flex-direction:column;align-items:flex-start;gap:0.75rem;}' +
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
    var rec = getStored();
    return !!(rec && rec.categories && rec.categories.analytics);
  }

  function saveAndClose(categories) {
    var record = JSON.stringify({
      categories: categories,
      timestamp: new Date().toISOString(),
      version: CONSENT_VERSION
    });
    localStorage.setItem(STORAGE_KEY, record);
    var el = document.getElementById('wb-consent');
    if (el) el.classList.remove('wb-visible');
    document.removeEventListener('keydown', trapFocus);
    setTimeout(function () {
      if (el && el.parentNode) el.parentNode.removeChild(el);
    }, 400);
    if (categories.analytics) loadGA4();
    try {
      document.dispatchEvent(new CustomEvent('wb:consent-changed', { detail: { categories: categories } }));
    } catch (e) {}
  }

  function trapFocus(e) {
    if (e.key !== 'Tab') return;
    var focusable = Array.prototype.slice.call(
      document.querySelectorAll('#wb-consent button:not([disabled]), #wb-consent input')
    );
    if (!focusable.length) return;
    var first = focusable[0], last = focusable[focusable.length - 1];
    if (e.shiftKey) {
      if (document.activeElement === first) { e.preventDefault(); last.focus(); }
    } else {
      if (document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  }

  function show() {
    document.head.appendChild(style);
    document.body.appendChild(banner);
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        banner.classList.add('wb-visible');
        var rejectBtn = document.getElementById('wb-reject');
        if (rejectBtn) rejectBtn.focus();
        document.addEventListener('keydown', trapFocus);
      });
    });

    document.getElementById('wb-accept').addEventListener('click', function () {
      saveAndClose({ analytics: true });
    });
    document.getElementById('wb-reject').addEventListener('click', function () {
      saveAndClose({ analytics: false });
    });
    document.getElementById('wb-manage').addEventListener('click', function () {
      var prefs = document.getElementById('wb-prefs');
      var isHidden = prefs.hasAttribute('hidden');
      if (isHidden) {
        prefs.removeAttribute('hidden');
        this.setAttribute('aria-expanded', 'true');
      } else {
        prefs.setAttribute('hidden', '');
        this.setAttribute('aria-expanded', 'false');
      }
    });
    document.getElementById('wb-save-prefs').addEventListener('click', function () {
      var analyticsOn = document.getElementById('wb-analytics-toggle').checked;
      saveAndClose({ analytics: analyticsOn });
    });

    wireReopenLinks();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', show);
  } else {
    setTimeout(show, 200);
  }
}());
