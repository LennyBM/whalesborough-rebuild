#!/usr/bin/env python
"""Whalesborough build script.

Run with:  python build.py

Does three things:
  1. Minifies assets/css/whalesborough.css and assets/css/fonts.css.
  2. Refreshes <lastmod> entries in sitemap.xml to today's date.
  3. Stamps a short git commit hash into HTML pages as ?v=<hash> on the
     CSS/JS references, for cache-busting after deploys.
"""
from __future__ import annotations
import re, glob, os, subprocess
from datetime import date

ROOT = os.path.dirname(os.path.abspath(__file__))

# ---------- 1. Minify CSS ----------
def minify_css(css: str) -> str:
    css = re.sub(r'/\*[\s\S]*?\*/', '', css)
    css = re.sub(r'\s+', ' ', css)
    css = re.sub(r'\s*([{}:;,>+~])\s*', r'\1', css)
    css = re.sub(r';}', '}', css)
    return css.strip()

def build_css() -> None:
    for name in ('whalesborough.css', 'fonts.css'):
        src = os.path.join(ROOT, 'assets', 'css', name)
        if not os.path.exists(src):
            continue
        with open(src, 'r', encoding='utf-8') as f:
            raw = f.read()
        minified = minify_css(raw)
        dst = src.replace('.css', '.min.css')
        with open(dst, 'w', encoding='utf-8') as f:
            f.write(minified)
        pct = 100 * (1 - len(minified) / max(len(raw), 1))
        print(f'  css  {name}: {len(raw):>6} -> {len(minified):>6} bytes  ({pct:4.1f}% smaller)')

# ---------- 2. Refresh sitemap lastmod ----------
def build_sitemap() -> None:
    path = os.path.join(ROOT, 'sitemap.xml')
    if not os.path.exists(path):
        return
    today = date.today().isoformat()
    with open(path, 'r', encoding='utf-8') as f:
        xml = f.read()
    new_xml = re.sub(
        r'<lastmod>\d{4}-\d{2}-\d{2}</lastmod>',
        f'<lastmod>{today}</lastmod>',
        xml,
    )
    n = len(re.findall(r'<lastmod>', xml))
    with open(path, 'w', encoding='utf-8') as f:
        f.write(new_xml)
    print(f'  xml  sitemap.xml: refreshed {n} <lastmod> entries to {today}')

# ---------- 3. Cache-bust CSS/JS references with git short hash ----------
def git_short_hash() -> str:
    try:
        out = subprocess.check_output(
            ['git', 'rev-parse', '--short', 'HEAD'],
            cwd=ROOT, stderr=subprocess.DEVNULL,
        )
        return out.decode().strip() or date.today().strftime('%Y%m%d')
    except Exception:
        return date.today().strftime('%Y%m%d')

CACHE_BUSTABLE = (
    'whalesborough.min.css',
    'fonts.min.css',
    'main.js',
    'consent.js',
)

def cache_bust_html(version: str) -> None:
    pages = sorted(set(glob.glob('*/index.html') + ['index.html', '404.html', 'offline.html']))
    touched = 0
    for p in pages:
        full = os.path.join(ROOT, p)
        if not os.path.exists(full):
            continue
        with open(full, 'r', encoding='utf-8') as f:
            html = f.read()
        orig = html
        for asset in CACHE_BUSTABLE:
            # Replace any existing ?v=... or plain path with the new version
            html = re.sub(
                rf'({re.escape(asset)})(\?v=[^"\s]+)?',
                rf'\1?v={version}',
                html,
            )
        if html != orig:
            with open(full, 'w', encoding='utf-8') as f:
                f.write(html)
            touched += 1
    print(f'  bust html:  stamped ?v={version} on {touched} page(s)')

# ---------- Entry point ----------
if __name__ == '__main__':
    print('Whalesborough build')
    print('-' * 40)
    build_css()
    build_sitemap()
    version = git_short_hash()
    cache_bust_html(version)
    print('-' * 40)
    print('Build complete.')
