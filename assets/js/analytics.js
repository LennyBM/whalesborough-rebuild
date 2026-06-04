/**
 * Whalesborough — first-party, cookieless web analytics + client error monitoring.
 * ----------------------------------------------------------------------------
 * Privacy by design:
 *   • No cookies. No cross-site identifiers. No data sold or shared.
 *   • No IP address is stored (the database has no IP column).
 *   • Data lives in OUR OWN Supabase project (London / eu-west-2), not a third party.
 *   • The key below is a WRITE-ONLY publishable key: Row Level Security lets the
 *     browser INSERT events but never read, update or delete them. Safe to ship.
 *
 * Consent model (works with consent.js):
 *   • Page views, conversion events and Web Vitals  → only after ANALYTICS consent.
 *   • Client JS error capture                       → always on. No identifiers,
 *     no device storage; processed under legitimate interest for site stability.
 *
 * This file is injected once, site-wide, by consent.js.
 */
(function () {
  'use strict';

  var ENDPOINT = 'https://lrevgdqrwfppeetcfaom.supabase.co/rest/v1/events';
  // Publishable, write-only key (RLS: insert-only). Public by design.
  var KEY = 'sb_publishable_wwBv9FST2QzHhPMt1wKw-A_5tYqAa5y';

  var started = false;     // analytics (consent-gated) has started
  var sid = null;          // anonymous per-tab session id (set only after consent)

  /* ---- low-level beacon (fire-and-forget, survives page unload) ---- */
  function post(row) {
    try {
      fetch(ENDPOINT, {
        method: 'POST',
        headers: {
          'apikey': KEY,
          'Authorization': 'Bearer ' + KEY,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify(row),
        keepalive: true,
        mode: 'cors',
        credentials: 'omit'
      }).catch(function () { /* network errors are non-critical */ });
    } catch (e) { /* never let analytics break the page */ }
  }

  function cleanPath() {
    // path only — no query string, so nothing identifying leaks in
    return (location.pathname || '/').slice(0, 512);
  }

  function cleanReferrer() {
    try {
      if (!document.referrer) return null;
      var u = new URL(document.referrer);
      if (u.host === location.host) return null; // ignore in-site navigation
      return (u.origin + u.pathname).slice(0, 512);
    } catch (e) { return null; }
  }

  /* ===========================================================
     ERROR MONITORING — always on, no identifiers, no storage
     =========================================================== */
  var errCount = 0;
  function reportError(name, message, extra) {
    if (errCount >= 25) return;            // flood guard per page load
    errCount++;
    post({
      type: 'error',
      name: String(name || 'Error').slice(0, 120),
      path: cleanPath(),
      session_id: sid,                     // null until consent; correlates after
      meta: Object.assign({
        message: String(message || '').slice(0, 600),
        host: location.host
      }, extra || {})
    });
  }

  window.addEventListener('error', function (e) {
    if (e && e.error && e.error.stack) {
      reportError(e.error.name, e.message, {
        stack: String(e.error.stack).slice(0, 1200),
        source: e.filename, line: e.lineno, col: e.colno
      });
    } else if (e && e.message) {
      reportError('Error', e.message, { source: e.filename, line: e.lineno, col: e.colno });
    }
  });

  window.addEventListener('unhandledrejection', function (e) {
    var r = e && e.reason;
    reportError('UnhandledRejection',
      (r && (r.message || r)) || 'unhandled promise rejection',
      { stack: r && r.stack ? String(r.stack).slice(0, 1200) : undefined });
  });

  /* ===========================================================
     ANALYTICS — page views, conversions, Web Vitals (consented)
     =========================================================== */
  function newSid() {
    try {
      var v = sessionStorage.getItem('wb_sid');
      if (!v) {
        v = (window.crypto && crypto.randomUUID)
          ? crypto.randomUUID()
          : 'sid-' + Math.random().toString(36).slice(2) + Date.now().toString(36);
        sessionStorage.setItem('wb_sid', v);     // per-tab, cleared on close — not a cookie
      }
      return v;
    } catch (e) { return null; }
  }

  function sendPageview() {
    post({
      type: 'pageview',
      name: (document.title || '').slice(0, 120),
      path: cleanPath(),
      referrer: cleanReferrer(),
      session_id: sid,
      viewport: (window.innerWidth || 0) + 'x' + (window.innerHeight || 0),
      ua: (navigator.userAgent || '').slice(0, 400),
      meta: { host: location.host, lang: navigator.language }
    });
  }

  // Conversion events: main.js calls window.__wbBeacon(name, params) from wbTrack.
  window.__wbBeacon = function (name, params) {
    if (!started) return;
    post({
      type: 'event',
      name: String(name || 'event').slice(0, 120),
      path: cleanPath(),
      session_id: sid,
      meta: params || {}
    });
  };

  /* ---- Web Vitals (no library): TTFB, FCP, LCP, CLS, INP ---- */
  function rate(metric, v) {
    var t = { LCP: [2500, 4000], CLS: [0.1, 0.25], INP: [200, 500], FCP: [1800, 3000], TTFB: [800, 1800] }[metric];
    if (!t) return null;
    return v <= t[0] ? 'good' : (v <= t[1] ? 'needs-improvement' : 'poor');
  }
  function vital(name, value) {
    post({ type: 'web_vital', name: name, value: Math.round(value * 1000) / 1000, rating: rate(name, value), path: cleanPath(), session_id: sid });
  }

  function startVitals() {
    // TTFB + FCP from the navigation/paint timeline
    try {
      var nav = performance.getEntriesByType('navigation')[0];
      if (nav && nav.responseStart > 0) vital('TTFB', nav.responseStart);
    } catch (e) {}
    try {
      var fcp = performance.getEntriesByName('first-contentful-paint')[0];
      if (fcp) vital('FCP', fcp.startTime);
    } catch (e) {}

    var lcp = 0, cls = 0, inp = 0, sent = false;
    function obs(type, cb, opts) {
      try { var o = new PerformanceObserver(cb); o.observe(Object.assign({ type: type, buffered: true }, opts || {})); return o; }
      catch (e) { return null; }
    }
    obs('largest-contentful-paint', function (l) { l.getEntries().forEach(function (en) { lcp = en.startTime; }); });
    obs('layout-shift', function (l) { l.getEntries().forEach(function (en) { if (!en.hadRecentInput) cls += en.value; }); });
    obs('event', function (l) { l.getEntries().forEach(function (en) { if (en.duration > inp) inp = en.duration; }); }, { durationThreshold: 40 });

    function flush() {
      if (sent) return; sent = true;
      if (lcp) vital('LCP', lcp);
      vital('CLS', cls);
      if (inp) vital('INP', inp);
    }
    // Report once, when the user leaves / hides the tab (final values)
    document.addEventListener('visibilitychange', function () { if (document.visibilityState === 'hidden') flush(); });
    window.addEventListener('pagehide', flush);
  }

  function startAnalytics() {
    if (started) return;
    started = true;
    sid = newSid();
    sendPageview();
    startVitals();
  }

  /* ---- consent wiring ---- */
  function consentGranted() {
    try { return !!(window.wb && window.wb.hasGrantedConsent && window.wb.hasGrantedConsent()); }
    catch (e) { return false; }
  }
  if (consentGranted()) {
    startAnalytics();
  }
  document.addEventListener('wb:consent-changed', function (e) {
    if (e && e.detail && e.detail.categories && e.detail.categories.analytics) startAnalytics();
  });
}());
