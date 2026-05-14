# Arvor Suites — Complete Copy

*Coastal Editorial voice. Paste-ready. Whalesborough Farm Resort & Spa, North Cornwall.*

---

## 1. /stay/arvor-suites — Hub Page

### Hero / Editorial Intro

**The Ecotel at the Edge of the Coast**

Arvor — the Cornish word for *coast* — is twenty-two single-storey apartments built within the spa complex itself, on the clifftop above Bude. It is the resort's most considered accommodation: an ecotel framed around restoration rather than spectacle. Materials are honest. Lighting is warm. The countryside reads through the windows in full.

Each suite is purpose-built, not converted. The thermal envelope is high-spec, the air systems are quiet, the kitchens are modest but properly equipped. There are no woodburners, no hot tubs in the gardens, no farm-yard whimsy. What there is, instead, is direct access — through a short internal corridor — to the indoor pool, the steam room, the sauna and the spa treatment rooms. Stay in an Arvor suite and the wet facilities are part of your stay, included, walked-to in slippers.

The Arvor block sits apart from the cottage estate. It is for guests who want hotel ease with self-catered freedom: a couple recovering after a long week, a walker stripping back after the South West Coast Path, a parent taking the first night away in months. Stays start from £175 per person, per night.

**[Browse the five suite types →]**
**[See Arvor packages →]**

---

### What's Included With Every Arvor Stay

| What | Detail |
|------|--------|
| **Pool & wet rooms** | Unrestricted access to the indoor pool, sauna and steam room throughout your stay |
| **Self-catering kitchen** | Induction hob, full-size fridge, dishwasher, Nespresso, starter pantry |
| **Bedding & linens** | Four-poster or box-spring; full linen change; robes & slippers in spa packages |
| **Connectivity** | Smart TV, full-fibre WiFi, USB-C bedside charging |
| **Heat & air** | Air-source heating, MVHR ventilation, individually-controlled thermostats |
| **Welcome** | Cornish dairy milk, single-origin coffee, local biscuit |
| **On-site dining** | Weir Bistro and The Plough open to suite guests without prior booking |

---

### Why Guests Choose Arvor Over a Cottage

There is a clear divide on the estate. Cottages give you privacy, a private garden, often a hot tub of your own. Arvor gives you proximity — to the spa, to the pool, to a meal — and the lower friction of a hotel-style block. If you are travelling without children, without dogs (most suite types) and without a need for outdoor entertaining, Arvor is the lighter, more contained choice. The rate reflects this: £77–£185 per night for the suite, with the spa wet facilities folded in.

---

### Package Teaser

Seven packages are built around the suites — wellness, baby moon, fourth trimester, anniversary, long weekend, summer stay and midweek escape. Each layers a small set of additions into the room rate: a treatment, a hamper, a guided walk. They are designed to make a short stay feel like more than a short stay.

**[See all seven packages →]**

---

### In-Resort Context

Arvor sits five minutes' walk from the working farm, fifteen from Widemouth Bay, and a short drive from the harbour at Bude. The South West Coast Path runs at the cliff edge. The spa, the bistro, the village pub (The Plough), the wellness studio and the indoor pool are all reachable on foot from the suite door — most of them in under three minutes, several without stepping outside.

---

### Schema Template (LodgingBusiness)

```json
{
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  "name": "Arvor Suites at Whalesborough",
  "description": "Twenty-two single-storey ecotel apartments within the spa complex at Whalesborough Farm Resort & Spa, North Cornwall. Self-catering with full pool, sauna and steam access included.",
  "image": "https://www.whalesborough.com/images/arvor/hero.jpg",
  "priceRange": "££££",
  "starRating": { "@type": "Rating", "ratingValue": "5" },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Whalesborough Farm",
    "addressLocality": "Marhamchurch",
    "addressRegion": "Cornwall",
    "postalCode": "EX23 0HG",
    "addressCountry": "GB"
  },
  "amenityFeature": [
    { "@type": "LocationFeatureSpecification", "name": "Indoor pool", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Sauna", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Steam room", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Spa treatments on-site", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Self-catering kitchen", "value": true }
  ]
}
```

---

## 2. Suite Type Pages

### 2a. Arvor Studio 1.0

**A compact studio, a four-poster, a clifftop**

The Arvor Studio is the smallest suite in the block — a single-storey, single-room apartment built around a hand-made four-poster bed. The footprint is honest about its size: a bed, a sitting area, a galley kitchen, a tiled shower room. Nothing more, and nothing missing.

The materials are quietly considered. Oak veneer joinery, a stone-effect floor, brushed brass fittings, linen-toned curtains that let in the morning. There is no extra room to clean, no second bedroom to heat, no garden to maintain — which is exactly the point. You came to use the spa, walk the coast path and read a book between the two.

Dogs are welcome in this suite type (one only). The kitchen is induction and dishwasher-equipped. The bed is a four-poster, dressed in white cotton percale.

**Best for:** A couple on a short break; a solo retreat with use of the spa; a walker who wants somewhere to fall into after a long day on the South West Coast Path.

| Spec | Detail |
|------|--------|
| Sleeps | 2 |
| Bed | One four-poster |
| Floors | Single-storey |
| Bathroom | Walk-in shower |
| Dogs | Yes (1 dog, £30/night) |
| Hot tub | No (full use of pool, sauna, steam included) |
| Kitchen | Induction hob, fridge, dishwasher, Nespresso |
| Tech | Smart TV, full-fibre WiFi, USB-C charging |
| Indicative rate | From £97/night |
| Landal code | 2L1 |

**Schema (LodgingBusiness > Accommodation):**
```json
{
  "@context": "https://schema.org",
  "@type": "Accommodation",
  "name": "Arvor Studio 1.0",
  "description": "Compact single-storey studio with four-poster bed and induction kitchen, within the Arvor ecotel block at Whalesborough Farm Resort & Spa.",
  "occupancy": { "@type": "QuantitativeValue", "maxValue": 2 },
  "numberOfRooms": 1,
  "petsAllowed": "1 dog by arrangement",
  "amenityFeature": [
    { "@type": "LocationFeatureSpecification", "name": "Four-poster bed", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Induction kitchen", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Single-storey access", "value": true }
  ]
}
```

---

### 2b. Arvor Wetroom Studio 1.0

**Accessible by design, not by retrofit**

The Wetroom Studio is the same footprint as the Studio 1.0, designed from the ground up around a level-access wetroom rather than adapted later. The shower area is flush with the floor, with a fixed and a hand-held head, a fold-down bench and grab rails set at the heights specified by the Building Regulations Part M.

The doorways are widened, the bed-to-bathroom path is clear, the kitchen is at a height that is comfortable seated. The four-poster bed remains — accessibility need not look clinical. The materials match the rest of Arvor: oak veneer, linen tones, brushed brass.

Two dogs are welcome here. The pool and wet facilities are reached via a step-free corridor; the spa team are briefed on accessible treatment options.

**Best for:** Guests with mobility needs who want a four-poster, a sea-air walk and a proper soak — without the indignity of a bolt-on adaptation.

| Spec | Detail |
|------|--------|
| Sleeps | 2 |
| Bed | One four-poster |
| Floors | Single-storey, level-access throughout |
| Bathroom | Level-access wetroom with seat & grab rails |
| Dogs | Yes (up to 2) |
| Hot tub | No (full use of pool, sauna, steam included) |
| Kitchen | Induction, accessible counter height, dishwasher |
| Tech | Smart TV, full-fibre WiFi, audio-induction loop available |
| Indicative rate | From £77/night |
| Landal code | 2L2 |

**Schema:**
```json
{
  "@context": "https://schema.org",
  "@type": "Accommodation",
  "name": "Arvor Wetroom Studio 1.0",
  "description": "Accessible four-poster studio with level-access wetroom, built — not adapted — for guests with mobility needs.",
  "occupancy": { "@type": "QuantitativeValue", "maxValue": 2 },
  "accessibilityFeature": [
    "wheelchairAccessibleEntrance",
    "wheelchairAccessibleRoom",
    "rollInShower",
    "grabBars"
  ]
}
```

---

### 2c. Arvor Suite 1.0

**The one most guests book — and the reason most rebook**

The Arvor Suite is the highest-volume seller in the block, and it is easy to see why. The footprint is slightly larger than the Studio, the layout is more generous, the bed is a wide box-spring rather than a four-poster, and the sitting area is genuinely a sitting area — two chairs, a side table, a sash window onto the countryside.

The kitchen is open-plan but distinct: a peninsula breakfast bar separates it from the living space. The bathroom is a tiled walk-in shower with rainfall head and a brushed-brass towel rail. The bed is dressed in heavy cotton percale, with a wool throw that does its job in February.

It is the suite to book if you want one room rather than a studio, a couple's stay rather than a solo one, and a slightly more grown-up footprint than the entry tier. Note: no dogs in this suite type.

**Best for:** Couples on a long weekend; spa-goers wanting hotel-style ease; guests on the Anniversary or Long Weekend package.

| Spec | Detail |
|------|--------|
| Sleeps | 2 |
| Bed | One box-spring (super-king) |
| Floors | Single-storey |
| Bathroom | Walk-in shower with rainfall head |
| Dogs | No |
| Hot tub | No (full use of pool, sauna, steam included) |
| Kitchen | Open-plan with peninsula, induction, dishwasher |
| Tech | Smart TV, full-fibre WiFi, Sonos-compatible bluetooth |
| Indicative rate | From £88/night |
| Landal code | 2LP |

**Schema:** as Accommodation, occupancy 2, no pets.

---

### 2d. Arvor Duplex 2.0

**Two bedrooms, two ensuites, room to be a family**

The Duplex 2.0 is the family Arvor: two bedrooms, two ensuites, a real living and dining space, and a small private terrace. The master takes a box-spring king bed; the second is a twin, easily configured as a super-king on request, with its own ensuite shower room.

Built across a single floor (the "duplex" refers to the two-bedroom layout, not two storeys), it sits at the end of the block with quieter neighbours. The kitchen is full-sized — oven, induction, dishwasher, full-height fridge — and the dining table seats four comfortably. The terrace is small but private, with morning sun and a view to the lower pasture.

Dogs are welcome here (up to 2). Travel cots and high chairs are stocked and laid out on arrival if requested.

**Best for:** A family of four with young children; two couples travelling together who want their own bathrooms; a multi-generation short break that still wants the spa on the doorstep.

| Spec | Detail |
|------|--------|
| Sleeps | 4 |
| Beds | One box-spring king + one twin (zip-and-link) |
| Bathrooms | 2 ensuite |
| Floors | Single-storey, two-bedroom |
| Dogs | Yes (up to 2) |
| Hot tub | No (full use of pool, sauna, steam included) |
| Kitchen | Full-sized: oven, induction, dishwasher, fridge |
| Outdoor | Small private terrace |
| Tech | Smart TV in living, second TV in master |
| Indicative rate | From £185/night |
| Landal code | 4LP |

**Schema:** as Accommodation, occupancy 4, pets allowed (2 dogs), 2 bedrooms, 2 bathrooms.

---

### 2e. Arvor Penthouse 2.0

**The top floor, the long view, the elevator at the door**

The Penthouse is the one Arvor unit with a long horizon — top-floor positioning across the block, with the upper sash windows catching the light most of the day and the western sky in the evening. Access is by elevator, which keeps the single-storey ease intact: no stairs, no luggage drag, no climb after dinner.

The layout matches the Duplex — a king plus a twin, two ensuites, full kitchen and a living space — but the materials step up a tier. Wider plank flooring, a Smeg range, a deeper sofa, a marble vanity in the master ensuite. It is the most expensive suite per night, and it is intended for guests who would otherwise have booked a junior suite at a small hotel.

No dogs in this suite — the only quiet exception within the Arvor block. Children are welcome.

**Best for:** A milestone stay — anniversary, big birthday, first weekend back after a long project. Couples who want a hotel-grade penthouse with a self-catering option.

| Spec | Detail |
|------|--------|
| Sleeps | 4 |
| Beds | One king + one twin |
| Bathrooms | 2 ensuite (master with marble vanity) |
| Floors | Top-floor, elevator access, single-storey within |
| Dogs | No |
| Hot tub | No (full use of pool, sauna, steam included) |
| Kitchen | Full-sized: Smeg range, induction, dishwasher |
| View | Long countryside view, west-facing |
| Tech | Smart TV, full-fibre WiFi, Sonos |
| Indicative rate | From £181/night |
| Landal code | 4EL |

**Schema:** as Accommodation, occupancy 4, no pets, includes "Elevator" amenity, premium feature.

---

## 3. /stay/arvor-suites/packages — Hub Page

### Editorial Intro

**Seven packages, each built around a reason to come**

A package, done properly, is not a discount with a different name. It is a curated few hours laid on either side of the night you've already booked: a treatment, a hamper, a guided walk, the kind of small thoughtful additions that turn a stay into something you tell people about.

Each Arvor package is built around a single intention. Wild & Refined is for guests who want to move and then be still. Baby Moon is for the last quiet weekend before the baby arrives; Fourth Trimester is for the first quiet weekend after. Anniversary is for the milestone, Long Weekend for the proper break, Summer Stay for the long evening, and Midweek Escape for the in-between when prices are softer and the resort is quieter.

All seven start at £175 per person, per night. All seven include full use of the indoor pool, sauna and steam room. All seven are bookable for one or two nights, and several flex to three.

**[Choose a package →]**

---

## 4. Individual Package Pages

### 4a. Wild & Refined

**Move first. Then be still.**

A package for the guest who wants both halves of the day to count. Morning is a guided half-day on the bike — coastal lanes, a stretch of bridleway, a stop at a working farm gate for water. Afternoon is a thirty-minute restorative massage in the spa and the rest of the day either in the pool or in the suite with a book.

The bike, the helmet, and the route notes are included. So are robes and slippers in the suite on arrival.

**Included**
- Guided half-day cycle ride with a Whalesborough route lead
- 30-minute restorative massage in the spa
- Premium e-bike & helmet hire for the duration of stay
- Robes and slippers in-suite
- Full use of pool, sauna and steam
- Welcome milk, coffee and biscuit

**Stay length:** 1 or 2 nights
**From:** £175 per person, per night
**Available:** Year-round (route adjusted for season)

**Book this package →** *Call 01288 361940 or use the booking widget*

---

### 4b. Baby Moon

**The last quiet weekend.**

Designed for the third trimester. One-to-one prenatal yoga with a midwife-trained instructor in the wellness studio, a sixty-minute mother-to-be massage with a side-lying treatment table, and a hamper of small Cornish things — biscuits, cordial, oat cakes, butter, the kind of foods that work for a tired evening in the suite.

Robes and slippers waiting on arrival, plus a printed list of the gentle walks on the estate that work for the third trimester.

**Included**
- 1-to-1 prenatal yoga session
- 60-minute mother-to-be massage (side-lying)
- Mini Cornish hamper (oat cakes, cordial, butter, biscuits)
- Robes and slippers in-suite
- Full use of pool (lap pool gentle hours), sauna and steam (steam only — sauna not advised in pregnancy)
- Walking-route notes for pregnancy

**Stay length:** 1 or 2 nights
**From:** £175 per person, per night
**Available:** Year-round
**Best in:** Suite 1.0, Penthouse 2.0

**Book this package →** *Call 01288 361940*

---

### 4c. Fourth Trimester

**The first quiet weekend after.**

For new parents in the first months post-birth. The package is built around the things that are hard to do at home with a tiny baby: a flat white made by someone else, a pram-friendly walk where you don't need to plan the route, an evening meal that arrives ready in the kitchen, and a sixty-minute massage while your partner takes the baby for an hour.

The hamper is a "night-in" hamper — a one-pan supper for two, a small dessert, a bottle of something gentle. The walking notes mark the routes that work for a pram, with cafe stops at the right spacing.

**Included**
- Daily welcome coffee at Weir Bistro
- Pram-friendly walking route notes (estate-only, no stiles)
- 60-minute parent recovery massage
- Robes and slippers in-suite
- "Night-in" food hamper for two
- Full use of pool, sauna and steam
- Travel cot and high chair stocked on arrival

**Stay length:** 1 or 2 nights
**From:** £175 per person, per night
**Available:** Year-round
**Best in:** Duplex 2.0, Penthouse 2.0

**Book this package →** *Call 01288 361940*

---

### 4d. Anniversary

**A marker, properly placed.**

For the year you want to mark. Arrival into a Suite 1.0 or Penthouse 2.0 with the bed turned and Cornish sparkling on ice. A booked table at The Plough that evening, with the kitchen briefed for the occasion. Couple's treatment the following morning — sixty minutes each, side-by-side in the spa's double room. The afternoon yours.

Robes, slippers, a Cornish dessert hamper for the return to the suite, and a flexible late check-out where the rota allows.

**Included**
- Welcome bottle of Camel Valley sparkling on ice
- Reserved evening table at The Plough or Weir Bistro
- 60-minute couple's treatment in the spa double room
- Cornish dessert hamper
- Robes and slippers in-suite
- Full use of pool, sauna and steam
- Late check-out (12pm, subject to availability)

**Stay length:** 1, 2 or 3 nights
**From:** £175 per person, per night
**Available:** Year-round
**Best in:** Suite 1.0, Penthouse 2.0

**Book this package →** *Call 01288 361940*

---

### 4e. Long Weekend

**Friday to Monday. Three full days, two long evenings.**

The package that asks for nothing of you. Arrive Friday afternoon, leave Monday morning, do as much or as little as the weather and the mood ask for. Two treatments included in the rate — choose them on arrival from the spa menu. A meal at the Weir Bistro on the first night, breakfast hamper on Saturday morning, and a guided walk on the Sunday for those who want to stretch the legs before the drive home.

The pacing is deliberately slow. There is no schedule beyond the treatments you choose.

**Included**
- 3 nights, Friday–Monday
- Choice of two 60-minute spa treatments per guest
- First-night Weir Bistro dinner allowance (£40pp)
- Saturday breakfast hamper (continental + fresh bake)
- Sunday guided walk (3 hours, coastal or estate)
- Robes and slippers in-suite
- Full use of pool, sauna and steam

**Stay length:** 3 nights (Fri–Mon)
**From:** £175 per person, per night
**Available:** Year-round
**Best in:** Any Arvor suite

**Book this package →** *Call 01288 361940*

---

### 4f. Summer Stay

**The seven-night reset.**

A week in Arvor with the long evenings working for you. The package layers small additions into a week's stay rather than dropping a single big event in the middle: a treatment in the first half, another in the second, a guided walk on the day the weather looks best, an evening at The Plough mid-stay, a beach picnic hamper for an afternoon at Widemouth or Crackington Haven.

Aimed at guests who don't want a programme so much as a thread to follow.

**Included**
- 7 nights, Saturday–Saturday or flexible by arrangement
- Two 60-minute spa treatments per guest, spaced across the week
- One Plough dinner allowance (£50pp)
- One coastal walk (guide-led, half day)
- One beach picnic hamper for two
- Robes and slippers in-suite
- Full use of pool, sauna and steam
- Mid-week towel and linen refresh

**Stay length:** 7 nights
**From:** £175 per person, per night
**Available:** May to September
**Best in:** Suite 1.0, Duplex 2.0, Penthouse 2.0

**Book this package →** *Call 01288 361940*

---

### 4g. Midweek Escape

**Two nights, Monday to Wednesday, softer rate.**

The quietest two nights of the resort's week, at a softer rate, with a single treatment folded in. For the couple who can take a Tuesday off, the freelancer between projects, the retired guest who prefers the resort when the families have gone home. The bistro is calmer, the pool is empty in the morning, the beach is yours.

**Included**
- 2 nights, Monday–Wednesday
- 60-minute spa treatment per guest
- Welcome milk, coffee, biscuit
- Robes and slippers in-suite
- Full use of pool, sauna and steam
- Late check-out Wednesday (12pm)

**Stay length:** 2 nights (Mon–Wed)
**From:** £175 per person, per night
**Available:** Year-round, excluding school holidays
**Best in:** Studio 1.0, Wetroom Studio 1.0, Suite 1.0

**Book this package →** *Call 01288 361940*

---

## 5. Booking CTA Microcopy (reusable)

- **Primary:** *Check availability* (when widget loads)
- **Phone:** *Or call 01288 361940 — we'll find the right suite*
- **Package add:** *Add this package to your stay*
- **Last-minute:** *Less than 7 days away — call to confirm*
- **Off-season:** *Quieter dates, softer rate — see this week's availability*
- **Package contact-only:** *Bespoke package — call to plan the detail*

---

## 6. Trust & Reassurance Footer (Arvor pages)

- **Direct booking:** No third-party fees. Best rate guaranteed when you book on-site.
- **Cancellation:** Free up to 14 days before arrival. See full terms.
- **Arrival:** Check-in from 4pm, check-out by 10am (later by arrangement).
- **Sustainability:** Air-source heating, MVHR ventilation, low-flow fittings. Arvor was built to a BREEAM Very Good rating.
- **Accessibility:** Wetroom Studio 1.0 is built — not adapted. Detailed access statement on request.

---

*End of Arvor copy file. Word count: approximately 3,900 words.*
