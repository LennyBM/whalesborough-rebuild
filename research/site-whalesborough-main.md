# Whalesborough Main Brand Site — Content Map

**Source:** https://www.whalesborough.co.uk/
**Crawled:** 2026-05-14 (Firecrawl, 102 pages scraped + sitemap-derived URL list)
**Purpose:** Audit existing brand site so the new £500k app replaces it cleanly

---

## 1. Tech stack indicators

Confirmed from HTTP responses + HTML:

- **CMS:** WordPress 6.9.4
- **E-commerce:** WooCommerce 9.3.6 (has `/shop`, `/cart`, `/checkout`, `/my-account`, `/product-category/uncategorized`, `/product/firework-display`)
- **Page builder:** Elementor 3.19.2 Pro (with Elementor Pro nav-menu, e-optimized-assets-loading, font-display:auto)
- **Theme:** Custom child theme `whalesborough` (page-template-elementor_header_footer)
- **HTTPS / SSL:** Really Simple SSL (`data-rsssl="1"`)
- **Site-icon / PWA:** Favicon RealFaviconGenerator (`/wp-content/uploads/fbrfg/`)
- **Tracking:** Facebook domain verification token (`son12rc3gcx72a60tgswbzcml6l43g`)
- **Hosting / Build credit:** "© Copyright 2023 Whalesborough | web design hosted by Peake Management"
- **Locale:** en-US (note: not en-GB despite being a UK site)
- **Theme colour:** `#ffffff`; tile colour `#da532c` (orange)
- **Robots:** `index, follow, max-image-preview:large` (fully indexable)

**Bottom line:** Legacy WordPress + Elementor build, currently maintained by Peake Management (the user). This is exactly what the new app needs to replace.

---

## 2. Complete sitemap (URLs discovered)

### 2a. Top-level pages (from `/page-sitemap.xml` and crawl)

```
/                                       Home
/our-cottages                           Cottage index
/our-cottages-nettlecoombe              (legacy stub)
/availability                           Availability check (redirects to Landal)
/all-facilities                         Facilities hub
/spa-and-treatments                     Spa overview
/swimming-pool                          Pool info
/weir-restaurant                        Restaurant landing
/outdoor-activities                     Activities (circuits)
/facilities-for-kids                    Family facilities
/whalesborough-map                      Resort map
/exploring-whalesborough                Local guide hub
/exploring-cornwall                     Wider Cornwall guide
/family-days-out                        Day out guide
/days-with-your-dog                     Dog day out guide
/dog-walks-at-whalesborough             Onsite walks map
/dog-friendly-features                  Dog facilities
/dog-friendly-breaks                    Dog package
/dog-rules                              Pet rules
/hitting-the-coast                      Coast guide
/family-breaks                          Family package
/couples-breaks                         Couples package
/short-breaks                           Short breaks hub
/short-breaks/baby-breaks-cornwall      Baby moon
/short-breaks/toddler-breaks-cornwall   Toddler breaks
/short-breaks/dog-friendly-breaks-cornwall  Dog short breaks
/short-breaks/weekend-breaks-cornwall   Weekend breaks
/stay-as-a-group                        Group bookings
/cottages-large-groups                  Group cottages
/last-minute                            Last-minute deals
/new-years                              NYE breaks
/wellness-breaks                        Wellness package
/shooting-breaks                        Clay shooting
/special-offers                         Offers hub
/holiday-treats                         Treats add-ons
/arvor-suite-packages                   Arvor curated packages (NEW Apr 2026)
/arvor-hotel                            Arvor hotel page (NEW Apr 2026)
/villas                                 Villas page (referenced)
/cottages-for-sale                      Sales redirect intro
/why-buy-a-holiday-home                 Sales pitch page (Mar 2026)
/guaranteed-rental-income               Sales pitch page (Jul 2025)
/book-a-viewing                         Sales viewing CTA
/our-awards                             Awards & VisitEngland
/blog                                   Blog index
/news                                   News (legacy stub)
/gallery                                Photo gallery
/finding-us                             Directions
/contact-us                             Contact form
/signup                                 Newsletter signup
/welcome-back                           Returning guest landing
/whats-new                              "What's new" feed
/jubilee-friday                         Old event page (2022)
/farmer-dan-heard                       Farmer Dan bio (referenced)
/reviews                                Reviews aggregator
/test                                   Dev/test page (should not be live)
/thank-you                              Form submission landing
/damage-deposit                         Damage deposit policy (Jan 2026)
/holiday-cottage-terms-conditions       Cottage T&Cs (Feb 2026)
```

### 2b. Cottage detail pages (29 cottages from `/our_cottages-sitemap.xml`)

| Slug | Sleeps (from category) | Source |
|------|------------------------|--------|
| `/our-cottages/arundell` | 6 | crawled |
| `/our-cottages/barley-park` | — | sitemap |
| `/our-cottages/beachcombers` | — | sitemap |
| `/our-cottages/calf-house` | — | sitemap |
| `/our-cottages/chapel-park` | — | sitemap |
| `/our-cottages/eagles-nest` | — | crawled |
| `/our-cottages/gwari-spa-barn-2-0` | — | sitemap |
| `/our-cottages/gwari-spa-barn-3-0` | — | crawled |
| `/our-cottages/jacks-house` | — | crawled |
| `/our-cottages/little-main` | — | sitemap |
| `/our-cottages/long-down` | — | sitemap |
| `/our-cottages/medlands` | — | crawled |
| `/our-cottages/middle-hill` | — | sitemap |
| `/our-cottages/moleyns` | — | crawled |
| `/our-cottages/nans-house` | — | crawled |
| `/our-cottages/nettlecoombe` | — | crawled |
| `/our-cottages/sand-parks` | — | sitemap |
| `/our-cottages/sheeps-house` | — | crawled |
| `/our-cottages/the-farmhouse` | — | crawled |
| `/our-cottages/trelowen` | — | sitemap (newest, Sept 2025) |
| `/our-cottages/trevelyan` | — | crawled |
| `/our-cottages/venners` | — | crawled |
| `/our-cottages/warrens` | — | sitemap |
| `/our-cottages/westcotts` | — | crawled |
| `/our-cottages/whalesborough-cottage` | — | crawled |
| `/our-cottages/windy-hills` | 6 | crawled |
| `/our-cottages/woodyplatt` | — | sitemap |

Plus taxonomy archives:
- `/cottage_sleeps/sleeps-2`, `/sleeps-4`, `/sleeps-5`, `/sleeps-6`, `/sleeps-8`, `/sleeps-10`
- `/cottage_features/new`, `/late-availability`, `/private-hot-tub`, `/single-story-cottages`, `/5-star-accommodation`
- `/changeover_day/monday`, `/friday`, `/saturday`

### 2c. Spa treatment pages (18 from `/spa_treatments-sitemap.xml`)

```
/spa-treatments/gaia-raindrop-therapy
/spa-treatments/gaia-total-holistic-ritual
/spa-treatments/gaia-crystal-therapy
/spa-treatments/gaia-jade-facial-45
/spa-treatments/gaia-jade-facial-60-minutes
/spa-treatments/gaia-lifting-yoga-facial
/spa-treatments/mother-gaia-60-minutes
/spa-treatments/mother-gaia-90-minute
/spa-treatments/serenity-at-the-w
/spa-treatments/the-w-bespoke-massage-45-minutes
/spa-treatments/the-w-bespoke-massage-60-minutes
/spa-treatments/the-w-bespoke-massage-90-minutes
/spa-treatments/the-w-hot-stone-massage-60-minutes
/spa-treatments/the-w-hot-stone-massage-90-minutes
/spa-treatments/the-w-indian-head-massage
/spa-treatments/the-w-manicure
/spa-treatments/the-w-pedicure
/spa-treatments/the-w-salt-and-oil-scrub
```

Note: individual treatment pages render almost no body content; they are essentially stub pages — booking happens via `https://thewclub.try.be/` (Try.be SaaS).

Plus taxonomy archives:
- `/spa_treatment_duration/45-minutes`, `/60-minutes`, `/90-minutes`, `/120-minutes`
- `/body_part-sitemap.xml`, `/type_of_treatment-sitemap.xml`, `/treatment_cost-sitemap.xml` (taxonomies exist but no public landing)

### 2d. Blog posts (27 from `/post-sitemap.xml`)

```
/10-things-to-do-during-easter-near-whalesborough         2022-04
/2023-a-year-to-remember                                  2024-01
/7-fantastic-things-to-do-this-may-around-whalesborough   2022-05
/activities-for-you-to-enjoy-during-your-may-holiday      2022-04
/best-things-to-do-with-the-family-during-february-half-term  2023-12
/bude-this-autumn                                         2023-09
/clovelly-calling                                         2023-09
/discover-the-devonshire-countryside-with-your-dog        2022-04
/easter-holidays-at-whalesborough                         2024-03
/explore-and-embrace-the-local-area-with-all-the-family   2024-05
/exploring-whalesborough-with-your-dog                    2022-07
/find-your-zen                                            2023-08
/five-reasons-to-stay-at-whalesborough-this-september     2022-07
/five-spa-treatments-you-have-to-try-during-your-stay-at-whalesborough  2022-07
/holidaying-with-us-in-the-current-climate                2022-04
/make-memories-with-our-kid-friendly-facilities           2022-04
/our-favourite-dog-friendly-days-out                      2022-09
/restaurants-to-visit-for-valentines-day-in-bude          2022-04
/six-fantastic-reasons-to-discover-the-delights-of-cornwall-in-2024  2024-02
/st-pirans-day-in-bude                                    2022-04
/summer-delights-why-you-should-visit-north-cornwall-this-summer  2024-05
/top-things-to-do-places-to-visit-near-bude               2024-02
/visit-whalesborough-this-autumn-with-your-dog            2022-09
/welcome-to-the-weir-restaurant-at-whalesborough          2022-07
/whalesborough-and-the-life-altering-box-of-meat-by-monty-halls  2023-11
/whys-naturalist-and-tv-celebrity-monty-halls-so-excited-about-whalesborough  2023-11
/win-a-luxury-weekend-at-landal-whalesborough             2024-03
```

**Blog cadence has stalled:** newest post is May 2024 — over 2 years old. Blog index `/blog` still linked but content is stale.

### 2e. Special offer detail pages (sample)

```
/special-offers
/special-offers/12357-2
/special-offers/gwari-spa-barn-3-0
/october-half-term/20-off
/october-half-term/35-off
```

### 2f. Legal / utility / WooCommerce

```
/privacy-policy
/cookie-policy
/terms-conditions
/terms-of-use
/accessibility
/dog-rules
/green-sustainability-credentials
/shop
/cart
/checkout
/my-account
/product-category/uncategorized
/product/firework-display      (one WooCommerce product)
```

### 2g. Tag archives (active SEO surfaces)

```
/tag/devon
/tag/bude
/tag/cornwall
/tag/discover
/tag/explore
/tag/day-out
/tag/things-to-go
```

### 2h. XML sitemaps live (Yoast-style)

```
/sitemap_index.xml
/page-sitemap.xml
/post-sitemap.xml
/our_cottages-sitemap.xml
/spa_treatments-sitemap.xml
/cottage_sleeps-sitemap.xml
/cottage_features-sitemap.xml
/changeover_day-sitemap.xml
/dog_friendly-sitemap.xml
/special_offers-sitemap.xml
/spa_treatment_duration-sitemap.xml
/treatment_cost-sitemap.xml
/body_part-sitemap.xml
/type_of_treatment-sitemap.xml
/product-sitemap.xml
/product_cat-sitemap.xml
/category-sitemap.xml
/post_tag-sitemap.xml
```

---

## 3. Navigation structure

### Header / top nav (Elementor)
Only two persistent top-of-page links across every page:
1. **Lodges for sale** → `https://whalesboroughliving.co.uk/` (external sales site)
2. **Book with landal** → `https://www.landal.com/parks/whalesborough-resort?...` (external booking with UTM tracking)

No internal nav menu in the hero header on the crawled markdown — main nav appears to live elsewhere (likely a burger menu / Elementor mobile pattern).

### Footer (consistent across every page)

**Our Cottages**
- Perfect for Families → `/family-breaks`
- Dog friendly Cottages → `/dog-friendly-breaks`
- Ideal For Couples → `/couples-breaks`
- Short Breaks → `/short-breaks`
- Group Stays → `/stay-as-a-group`

**Onsite Facilities**
- Spa & Treatments → `/spa-and-treatments`
- Facilities for Kids → `/facilities-for-kids`
- Swimming Pools → `/swimming-pool`
- Dog Friendly Features → `/dog-friendly-breaks`
- Weir Restaurant → `/weir-restaurant`
- Whalesborough Map → `/whalesborough-map`

**Explore the area**
- Exploring Whalesbourgh → `/exploring-whalesborough` *(typo "Whalesbourgh" left in nav)*
- Days with your dog → `/days-with-your-dog`
- Family Days Out → `/family-days-out`
- Hitting the coast → `/hitting-the-coast`
- Exploring Cornwall → `/exploring-cornwall`
- Dog walks at whalesborough → `/dog-walks-at-whalesborough`

**Key Information**
- Sustainability Statement → `/green-sustainability-credentials`
- Website Terms of Use → `/terms-of-use`
- Accessibility Statement → `/accessibility`
- Holiday Cottage T's & C's → `landal.co.uk/about-landal/general-conditions` (external — defers to Landal)
- Dog Rules → `/dog-rules`

**Sub-footer**
- Terms & Conditions → `/terms-conditions`
- Privacy → `/privacy-policy`
- Cookies → `/cookie-policy`

**Social**
- Facebook: `facebook.com/Whalesborough-Cottages-1559973127567416`
- Instagram: `instagram.com/whalesborough/`
- Twitter/X: `twitter.com/whalesborough`

**Newsletter signup** — single name + email form rendered in footer of every page (likely Mailchimp or similar).

---

## 4. Key pages and their purpose

| Page | Purpose | Key content |
|------|---------|-------------|
| **Home** (`/`) | Hero with video (`/wp-content/uploads/2026/04/Whalesborough-1.mp4`), Arvor Suite Experiences promo, 4 service tiles (Accommodation / Weir / W Club / hampers?), Farm story, testimonials slider | Brand pitch, social proof |
| **All facilities** (`/all-facilities`) | Hub linking to spa, restaurant, gym, play areas, animals, walks, EV, outdoor pool, dog facilities, family | "500-acre estate in North Cornwall" |
| **Our cottages** (`/our-cottages`) | Index of 29 properties | Filterable by sleeps / features / changeover day |
| **Spa & Treatments** (`/spa-and-treatments`) | The W Club overview — indoor infinity pool (29-30°C), Gaia Natural Skincare brand, Spa Days, gym (Technogym), Swedish sauna, Aroma steam room | All bookings out via `thewclub.try.be` |
| **Swimming pool** (`/swimming-pool`) | Indoor (29-30°C) + outdoor (26°C, 17m × 8m, summer only) | Children's pool, rainbow lighting, UV-treated |
| **Weir Restaurant** (`/weir-restaurant`) | Restaurant landing — but content lives on `weir-restaurant-bude.co.uk` (separate site) | Brand-only |
| **Facilities for Kids** (`/facilities-for-kids`) | Two pools, Little Farmers feeding, Under 6's Playroom | Weather-flexible activities |
| **Outdoor activities** (`/outdoor-activities`) | Wednesday 7am circuits, £5 per person | Single activity listed |
| **Dog Friendly Features** (`/dog-friendly-features`) | 500 acres, Pooch Welcome Packs, Dog Showers | Premium positioning |
| **Whalesborough Map** (`/whalesborough-map`) | Two map images of the site | No interactive map |
| **Arvor Suite Packages** (`/arvor-suite-packages`) | NEW (Apr 2026) — Cornish Health Kick, Baby Moon, Paws & Paths curated 1-2 night packages | Headline feature on home |
| **Arvor Hotel** (`/arvor-hotel`) | NEW (Apr 2026) hotel concept page | |
| **Why buy a holiday home** (`/why-buy-a-holiday-home`) | Sales lead-gen — Mar 2026 | Funnels to Whalesborough Living |
| **Guaranteed rental income** (`/guaranteed-rental-income`) | Sales lead-gen for ownership | Spa Barn imagery |
| **Damage deposit** (`/damage-deposit`) | Jan 2026 policy doc | |
| **Holiday cottage T&Cs** (`/holiday-cottage-terms-conditions`) | Feb 2026 — replaces previous Landal-only T&Cs in footer | |
| **Our awards** (`/our-awards`) | VisitEngland gold, Wildlife Trust, EU, DEFRA accreditations | Trust signals |

---

## 5. Brand voice / tone — copy samples

**Tagline (home):** "Arvor Suite Experiences: Curated Stays at Whalesborough Farm — Discover a new standard of coastal restoration."

**Voice characteristics observed:**
- Warm, informal, narrative ("We get it.")
- Country/coastal sensory vocabulary: *blustery, hunker down, stomp, restore, recharge, switch off*
- Heavy emphasis on the **450-500 acre** estate (numbers vary between pages — sometimes 450, sometimes 500)
- Family-friendly + dog-friendly tone present in every page
- Sustainability framing as a brand pillar (Cleaner Seas microplastic filters, net-zero by 2025, "first holiday-resort in the UK to install Cleaner-Seas filters")
- "We're pretty blessed", "we're pretty spoilt" — chatty, slightly self-deprecating
- Repeating boilerplate ending on most pages: "Your Sustainable Stay" + "Making our seas cleaner" + 4 bullet points (700,000 micro-fibres / wash; Ocean Saver products)

**Distinctive lines:**
- "So much more than a holiday home!"
- "Whether you're a family with young children, friends meeting for lunch, or surfers in need of some energy…"
- "Curated stays" / "coastal restoration" (new Apr 2026 Arvor positioning is more upmarket — moving toward boutique)
- Farm narrative: "Home to alpacas, goats, pigs, chickens, and donkeys, it's a haven for animal lovers."

**Celebrity endorsement angle:** Monty Halls (BBC2 Great Escapes / The Fisherman's Apprentice / Channel 4 WWII's Great Escapes) is the brand-name ambassador. Two long-form posts. Used heavily for sustainability story.

**Typos / inconsistencies to fix in rebuild:**
- "Whalesbourgh" (footer link to /exploring-whalesborough)
- "whoel load" instead of "whole load" (sustainability boilerplate)
- Acreage inconsistency: 450 vs 500
- Mixed "en-US" locale on a UK site

---

## 6. Contact details, opening hours, location

**Reception phone:** `01288 361940` (primary booking enquiries phone, appears on every cottage page)
**Sales email:** `sales@whalesborough.co.uk` (only email found in crawl)

**Other phone numbers in content (likely local business mentions, not Whalesborough):**
01288 255855, 01288 352005, 01288 352070, 01288 355222, 01288 361676, 01288 389800, 01288 350300, 01409 211224

**Address:** Whalesborough, Bude, Stratton, Cornwall (full postal address not found in head meta — likely EX23 area)

**Opening hours mentioned:**
- **The Weir Restaurant:** Breakfast 9am-12pm daily; lunch + afternoon tea from 12pm daily; dinner until 8pm Thursday/Friday/Saturday only
- **Outdoor pool:** Summer months only
- **Wednesday circuits:** 7am, £5/person
- **Little Farmers feeding:** Twice weekly (Tuesday + Thursday mornings)
- Otter feeding (referenced): 12pm

**No explicit hours of operation found for:** spa, reception, indoor pool, gym

---

## 7. Forms, CTAs, booking widgets

**Forms on site:**
- Footer newsletter signup (Name + Email + Send) — appears on every page
- `/contact-us` page (form not crawled in detail)
- `/signup` (newsletter dedicated)
- `/thank-you` (form submission landing)
- `/book-a-viewing` (sales lead form for Whalesborough Living)

**Primary CTAs (across site):**
- "Book with landal" (header — primary)
- "Lodges for sale" (header — secondary, sales funnel)
- "Book online" → `/availability` (which itself routes to Landal)
- "Book Spa Treatments" → `https://thewclub.try.be/`
- "View spa Days" → `https://www.wclubwhalesborough.co.uk/spa-day-packages`
- "Find your cottage" → `/our-cottages`
- "Check Availability" → `/availability`
- "View menus" → `/weir-restaurant` (which goes to weir-restaurant-bude.co.uk)
- "View our packages here" → `/arvor-suite-packages` (Arvor hero)

**No native booking widget on whalesborough.co.uk** — every accommodation booking is offloaded to Landal. Every spa booking is offloaded to Try.be. Every restaurant booking is offloaded to weir-restaurant-bude.co.uk. The main site is essentially a brand brochure that hands off to four other systems.

**WooCommerce surfaces:**
- `/shop`, `/cart`, `/checkout`, `/my-account` are live
- One product exists: `/product/firework-display` — likely event ticketing (NYE/Bonfire)
- Likely used for occasional add-ons (hampers, event tickets) rather than core booking

---

## 8. Image URLs (sample — 178 unique total)

Full unique image URL count from markdown: **178**. They live under `https://www.whalesborough.co.uk/wp-content/uploads/<YYYY>/<MM>/...` and `https://www.whalesborough.co.uk/wp-content/uploads/elementor/thumbs/...` (Elementor-generated derivatives).

**Heavily used image categories:**
- Cottage hero images: `/wp-content/uploads/2022/03/ARUNDELL2.1.jpg`, `EAGLESNEST2.2.jpg`, `MOLEYNS7.1.jpg`, `TREVELYAN4.1.jpg`, `BEACHCOMBERS5.1.jpg`, `CALFHOUSE.jpeg`, `LITTLEMAIN6.3.jpg`, `MIDDLEHILL11.1.jpg`, `LONGDOWN3.2.jpg`, `NETTLECOOMB4.jpg`, `SHEEPSHOUSEEXT2.jpg`, `VENNERS1.1.jpg`, `Westcotts.jpg`, `Nanshouselounge2.1.jpeg` (one per cottage)
- Spa imagery: `Whalesborough_Holiday_Cottages-1.jpeg`, `pool.png`, `X2A6222-Edit.jpeg`, `POOLSHOOT9.1-scaled-1.jpeg`, `iStock-1284313768.jpeg`, `6a0c2b66-4947-4ed4-9e87-3fcf4abe490e.jpeg`
- Animal / farm: `345192796_607782704710353...n.jpeg`, `339115791_2446382438853541...n.jpeg` (Facebook-sourced filenames)
- Awards: `/wp-content/uploads/2022/04/visitengland_*.jpg` (multiple gold / silver / bronze badges)
- Map: `/wp-content/uploads/2025/10/a57296e7-7f92-40f6-8f20-707e5b33a0fd-1086x1536.jpeg`, `/wp-content/uploads/2025/10/3e820491-e498-48be-92ef-b9770013766b-724x1024.jpeg`
- Dog walks map: `/wp-content/uploads/2024/06/dog-walking-map-2048x1449.jpg`
- Sustainability poster: `/wp-content/uploads/2024/06/Sustainabilty-poster-2.jpg`
- Damage deposit doc: `/wp-content/uploads/2026/01/Guest-Damage-Deposit-Policy-Checklist-724x1024.png`

**Hero video:** `https://www.whalesborough.co.uk/wp-content/uploads/2026/04/Whalesborough-1.mp4`

A full image inventory is already documented separately at `research/website-image-urls.md` (per existing project memory).

---

## 9. Differences vs the WordPress sales site (`whalesboroughliving.co.uk`)

| Dimension | **whalesborough.co.uk** (main brand) | **whalesboroughliving.co.uk** (sales) |
|-----------|--------------------------------------|---------------------------------------|
| **Purpose** | Brochure + funnel to **rentals/bookings** | Funnel to **lodge purchases (ownership)** |
| **Primary CTA** | "Book with Landal" (rentals) | "Lodges for sale" / "Book a viewing" (sales) |
| **Target audience** | Holidaymakers, families, couples, dog owners | Investors, second-home buyers, holiday-let owners |
| **Tone** | Warm, sensory, holiday-evocative | Investment-led ("Guaranteed rental income", "Why buy a holiday home") |
| **Booking handoff** | Landal.com + Try.be + Weir restaurant site | In-house sales / viewing form |
| **Content depth** | 100+ pages: cottages, spa, blog, guides | Brief sales-focused funnel |
| **Cross-links** | Header links out to whalesboroughliving.co.uk on every page | Likely links back to whalesborough.co.uk for brand story |
| **Overlapping pages on main site** | `/why-buy-a-holiday-home`, `/guaranteed-rental-income`, `/book-a-viewing`, `/cottages-for-sale` exist on the main site too — duplicate sales funnel content | Native to this site |

The main site **double-counts** the sales funnel by hosting `/why-buy-a-holiday-home` and `/guaranteed-rental-income` itself, while also linking out to `whalesboroughliving.co.uk` in every header. This is redundancy the new app can clean up.

---

## 10. External systems referenced (the booking ecosystem)

Confirms `reference_external_systems.md` from memory:

| System | URL | Function |
|--------|-----|----------|
| **Landal** | `landal.com/parks/whalesborough-resort?...` | All accommodation bookings (with extensive UTM/gclid tracking) |
| **Try.be** | `thewclub.try.be/` | All spa treatment + Little Farmers feeding-time bookings |
| **W Club site** | `wclubwhalesborough.co.uk/` and `/spa-day-packages` | Standalone spa marketing site |
| **The Weir Restaurant site** | `weir-restaurant-bude.co.uk/` | Standalone restaurant site (menus, table bookings) |
| **Whalesborough Living** | `whalesboroughliving.co.uk/` | Standalone lodge-sales WordPress site |
| **Landal T&Cs** | `landal.co.uk/about-landal/general-conditions` | Linked from footer (defers cottage T&Cs to Landal) |

The new £500k app sits in the middle and **needs to unify these handoffs into one experience** — or at minimum, intelligently route to them with shared identity and design.

---

## What to do with this

The crawl confirms the existing site is a sprawling Elementor/WordPress brochure built for SEO breadth (102 indexed URLs, 27 blog posts, 29 cottage detail pages, 18 spa treatment stubs, 7 tag archives, 18 XML sitemaps) but with **zero native booking functionality** — every transaction is punted to Landal, Try.be, the Weir site, or Whalesborough Living. The new app's content scope is now bounded: replace the 50–60 evergreen pages (excluding stale 2022-2024 blog, dev `/test`, legacy stubs like `/jubilee-friday`, `/news`), unify the four external booking systems into one design-coherent flow, fix the typos ("Whalesbourgh", "whoel load") and acreage inconsistency (450 vs 500), and lean into the new April-2026 "Arvor Suite" boutique positioning that the legacy nav doesn't yet surface. Brand voice is warm-coastal-sensory with sustainability + Monty Halls celebrity-endorsement as twin pillars — keep both. Tech-stack indicators (WP 6.9.4, WooCommerce 9.3.6, Elementor 3.19.2) and "hosted by Peake Management" footer mean the user has full migration control. Source data preserved at `research/_temp_crawl.json` and `_temp_crawl_p2.json` for any deeper extraction.
