#!/usr/bin/env python3
"""
Whalesborough SEO batch processor.
Adds: og:site_name, og:locale, og:image:alt, Twitter/X Card tags to all pages.
Fixes couples-breaks OG. Adds BreadcrumbList schema to all inner pages.
"""
import re
from pathlib import Path

BASE = Path(r"c:\Users\User\Desktop\Whalesborough Rebuild")
SITE = "https://www.whalesborough.co.uk"
SITE_NAME = "Whalesborough Farm Resort &amp; Spa"

SKIP = {"design-system", "logo-preview.html", "_seo_batch.py"}

PAGE_NAMES = {
    "our-cottages": "Our Cottages",
    "spa-and-treatments": "The W Club Spa",
    "weir-restaurant": "The Weir Restaurant",
    "arvor-suites": "Arvor Suites",
    "dog-friendly-breaks": "Dog-Friendly Breaks in Cornwall",
    "couples-breaks": "Couples Breaks in Cornwall",
    "family-holidays": "Family Holidays in Cornwall",
    "short-breaks": "Short Breaks in Cornwall",
    "groups": "Group Holidays in Cornwall",
    "exploring-cornwall": "Exploring Cornwall",
    "green-sustainability-credentials": "Sustainability Credentials",
    "local-area": "Local Area Guide",
    "outdoor-activities": "Outdoor Activities",
    "facilities-for-kids": "Facilities for Kids",
    "contact-us": "Contact Us",
    "finding-us": "Finding Us",
    "our-awards": "Awards & Accreditations",
    "holiday-home-investment": "Holiday Home Investment",
    "sustainable-luxury": "Sustainable Luxury",
    "cornish-farm-holidays": "Cornish Farm Holidays",
    "wellness-breaks": "Wellness Breaks",
    "privacy-policy": "Privacy Policy",
    "cookie-policy": "Cookie Policy",
    "accessibility": "Accessibility",
    "terms-and-conditions": "Terms & Conditions",
    "holiday-cottage-terms-conditions": "Cottage Terms & Conditions",
    "terms-of-use": "Terms of Use",
    "hitting-the-coast": "Hitting the Coast",
    "days-with-dog": "Days Out with Your Dog",
    "dog-walks": "Dog Walks Near Bude",
    "family-days-out": "Family Days Out",
    "gallery": "Gallery",
    "blog": "Blog",
    "about": "About Whalesborough",
    "booking": "Book Your Stay",
    "dog-rules": "Dog Policy",
    "holiday-treats": "Holiday Treats & Extras",
    "arundell": "Arundell",
    "barley-park": "Barley Park",
    "beachcombers": "Beachcombers",
    "calf-house": "Calf House",
    "chapel-park": "Chapel Park",
    "eagles-nest": "Eagles Nest",
    "gwari-spa-barn-2-0": "Gwari Spa Barn 2.0",
    "gwari-spa-barn-3-0": "Gwari Spa Barn 3.0",
    "jacks-house": "Jack's House",
    "little-main": "Little Main",
    "long-down": "Long Down",
    "medlands": "Medlands",
    "middle-hill": "Middle Hill",
    "moleyns": "Moleyns",
    "nettlecoombe": "Nettlecoombe",
    "sand-parks": "Sand Parks",
    "sheeps-house": "Sheep's House",
    "the-farmhouse": "The Farmhouse",
    "trelowen": "Trelowen",
    "trevelyan": "Trevelyan",
    "venners": "Venners",
    "warrens": "Warrens",
    "westcotts": "Westcotts",
    "whalesborough-cottage": "Whalesborough Cottage",
    "windy-hills": "Windy Hills",
    "woodyplatt": "Woody Platt",
}


def should_skip(path):
    return any(s in str(path) for s in SKIP)


def get_breadcrumb_items(rel):
    parts = rel.parts
    crumbs = [("Home", SITE + "/")]
    if len(parts) == 1:
        return None
    elif len(parts) == 2:
        slug = parts[0]
        name = PAGE_NAMES.get(slug, slug.replace("-", " ").title())
        crumbs.append((name, f"{SITE}/{slug}/"))
    elif len(parts) == 3:
        p_slug = parts[0]
        c_slug = parts[1]
        p_name = PAGE_NAMES.get(p_slug, p_slug.replace("-", " ").title())
        c_name = PAGE_NAMES.get(c_slug, c_slug.replace("-", " ").title())
        crumbs.append((p_name, f"{SITE}/{p_slug}/"))
        crumbs.append((c_name, f"{SITE}/{p_slug}/{c_slug}/"))
    return crumbs


def make_breadcrumb_json(crumbs):
    items = []
    for i, (name, url) in enumerate(crumbs, 1):
        safe_name = name.replace('"', "&quot;")
        items.append(
            f'      {{"@type":"ListItem","position":{i},"name":"{safe_name}","item":"{url}"}}'
        )
    return (
        "  <script type=\"application/ld+json\">\n"
        "  {\n"
        '    "@context": "https://schema.org",\n'
        '    "@type": "BreadcrumbList",\n'
        '    "itemListElement": [\n'
        + ",\n".join(items)
        + "\n"
        "    ]\n"
        "  }\n"
        "  </script>"
    )


updated = 0
skipped = 0

for path in sorted(BASE.rglob("*.html")):
    if should_skip(path):
        skipped += 1
        continue

    rel = path.relative_to(BASE)
    text = path.read_text(encoding="utf-8")
    orig = text

    # ── Fix couples-breaks: add missing og:url and og:image ──────────────
    if "couples-breaks" in str(path) and "og:url" not in text and "og:image" not in text:
        text = text.replace(
            '  <meta property="og:type" content="website" />\n',
            (
                '  <meta property="og:type" content="website" />\n'
                '  <meta property="og:url" content="https://www.whalesborough.co.uk/couples-breaks/" />\n'
                '  <meta property="og:image" content="https://www.whalesborough.co.uk/assets/images/general/cottages-exterior.jpg" />\n'
                '  <meta property="og:image:width" content="1800" />\n'
                '  <meta property="og:image:height" content="1200" />\n'
            ),
            1,
        )

    # ── Add og:site_name / og:locale / og:image:alt / Twitter Card ────────
    og_pat = re.compile(r'^[ \t]*<meta\s+property="og:[^"]*"[^\n]*\n', re.MULTILINE)
    og_matches = list(og_pat.finditer(text))

    if og_matches:
        last_pos = og_matches[-1].end()
        additions = []

        if "og:site_name" not in text:
            additions.append(f'  <meta property="og:site_name" content="{SITE_NAME}" />')

        if "og:locale" not in text:
            additions.append('  <meta property="og:locale" content="en_GB" />')

        if 'og:image"' in text and "og:image:alt" not in text:
            m = re.search(r'<meta\s+property="og:title"\s+content="([^"]+)"', text)
            if m:
                additions.append(
                    f'  <meta property="og:image:alt" content="{m.group(1)}" />'
                )

        if "twitter:card" not in text:
            t_m = re.search(r'<meta\s+property="og:title"\s+content="([^"]+)"', text)
            d_m = re.search(r'<meta\s+property="og:description"\s+content="([^"]+)"', text)
            i_m = re.search(r'<meta\s+property="og:image"\s+content="([^"]+)"', text)

            additions.append("")
            additions.append("  <!-- Twitter / X Card -->")
            additions.append('  <meta name="twitter:card" content="summary_large_image" />')
            if t_m:
                additions.append(
                    f'  <meta name="twitter:title" content="{t_m.group(1)}" />'
                )
            if d_m:
                additions.append(
                    f'  <meta name="twitter:description" content="{d_m.group(1)}" />'
                )
            if i_m:
                additions.append(
                    f'  <meta name="twitter:image" content="{i_m.group(1)}" />'
                )

        if additions:
            block = "\n".join(additions) + "\n"
            text = text[:last_pos] + block + text[last_pos:]

    # ── BreadcrumbList for inner pages ────────────────────────────────────
    parts = rel.parts
    if len(parts) > 1 and "BreadcrumbList" not in text:
        crumbs = get_breadcrumb_items(rel)
        if crumbs and len(crumbs) > 1:
            schema_block = "\n" + make_breadcrumb_json(crumbs) + "\n"
            text = text.replace("</head>", schema_block + "</head>", 1)

    if text != orig:
        path.write_text(text, encoding="utf-8")
        updated += 1
        print(f"  UPDATED  {rel}")
    else:
        print(f"  -        {rel}")

print(f"\nDone: {updated} files updated, {skipped} skipped.")
