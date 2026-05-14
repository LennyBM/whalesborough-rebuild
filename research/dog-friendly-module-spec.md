# Dog-Friendly Experience Module — Specification

**Whalesborough Farm Resort & Spa Booking App**
*Module owner: Guest Experience & Product*
*Status: v1.0 spec — May 2026*
*Position: The most sophisticated dog hospitality product in UK luxury hospitality*

---

## 0. Strategic positioning

Dog-friendliness drives 23-46% of Whalesborough bookings. Every cottage accepts dogs. Enclosed gardens, dog showers, indoor crates, soft furnishings, branded welcome packs, 450 acres of private off-lead countryside, dogs at indoor seating at The Weir, year-round dog beaches at Black Rock and Sandymouth a 15-minute drive away. The competitive set (Cliveden £35/night, The Ned £150/night, The Pig — dogs not allowed in restaurants) treats dogs as an accommodation surcharge. We treat them as a second guest with their own profile, journey, preferences and merchandise relationship.

**Brand voice north star:** "Your dog is a guest of Whalesborough, not a permitted item." Sophisticated, never twee. No "pawfect", "fur baby", "barking" puns in primary copy. Reserve the lightness for the dog menu and Instagram captions only.

---

## 1. Dog profile system

### 1.1 Capture

Pet profile is its own first-class entity in the guest account, sibling to "Travellers" (the human party). A household can have unlimited dogs.

**Identity (required at first booking):**
- Name (free text, 32 chars)
- Breed (typeahead linked to Kennel Club breed list + "Crossbreed" + "Other")
- Age (DOB picker → auto-calc years/months; supports "puppy" / "adult" / "senior" derived flag)
- Weight (kg, slider — used for harness clip sizing in travel pack)
- Gender + neutered (toggle)
- Photo (required for return-visit recognition; soft-prompt)

**Welfare (optional but heavily prompted):**
- Allergies (chips: chicken, beef, grain, dairy, peanut, custom)
- Medical / on medication (free text, encrypted at rest)
- Behaviour notes (chips: anxious, dog-reactive, sound-sensitive, escape artist, loves water, doesn't like X — plus free text)
- Diet (kibble / wet / raw / mixed / homemade)
- Treats — yes/no/limited (drives the welcome pack)
- Favourite activities (multi-select: long walks, water, fetch, sniffing, snoozing, meeting dogs, meeting people)
- Mobility (chips: puppy, full mobility, slowing down, senior — joint support, registered assistance dog, wheelchair / cart)

**Practical (optional, encrypted):**
- Microchip number
- Insurance provider + policy number
- Vet name + practice + phone
- Emergency contact (human, not the booker — for the rare case the booker is incapacitated)

**Consent flags:**
- Allow "Dogs of Whalesborough" gallery use (opt-in, default OFF)
- Share with on-site groomer / vet partner if needed during stay (opt-in, default OFF)
- Marketing — dog-relevant offers (opt-in, default OFF, granular vs human marketing)

### 1.2 Return-visit recognition

On second booking, profile auto-attaches. Welcome screen at check-in: *"Welcome back, Bella. Your pack is waiting at Honeysuckle Cottage."* Reception display shows the dog photo on the day-of-arrival list — concierge can greet by name. NPS gold.

### 1.3 Database schema additions

```sql
-- Sibling to guests table
CREATE TABLE dogs (
  id              UUID PRIMARY KEY,
  household_id    UUID NOT NULL REFERENCES households(id) ON DELETE CASCADE,
  name            VARCHAR(32) NOT NULL,
  breed_id        INT REFERENCES breeds(id),
  breed_other     VARCHAR(64),
  dob             DATE,
  weight_kg       DECIMAL(4,1),
  sex             CHAR(1) CHECK (sex IN ('M','F')),
  neutered        BOOLEAN,
  photo_url       TEXT,
  diet            VARCHAR(16),
  treats_pref     VARCHAR(16),
  mobility        VARCHAR(24),
  behaviour_tags  JSONB,          -- ['anxious','escape_artist']
  activity_tags   JSONB,
  allergies       JSONB,
  medical_notes   TEXT,           -- encrypted column
  microchip       VARCHAR(15),    -- encrypted column
  insurance_json  JSONB,          -- encrypted column
  vet_json        JSONB,          -- encrypted column
  emergency_json  JSONB,
  consent_gallery BOOLEAN DEFAULT FALSE,
  consent_partner BOOLEAN DEFAULT FALSE,
  consent_market  BOOLEAN DEFAULT FALSE,
  visit_count     INT DEFAULT 0,
  created_at      TIMESTAMPTZ DEFAULT now(),
  updated_at      TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE booking_dogs (
  booking_id      UUID REFERENCES bookings(id) ON DELETE CASCADE,
  dog_id          UUID REFERENCES dogs(id),
  welcome_pack    VARCHAR(24),    -- standard|premium|allergy|senior|puppy|travel
  PRIMARY KEY (booking_id, dog_id)
);

CREATE TABLE breeds (
  id INT PRIMARY KEY,
  name VARCHAR(64),
  size_band VARCHAR(8),           -- toy|small|medium|large|giant
  coat_type VARCHAR(16),
  default_pack_hint VARCHAR(24)
);
```

Encrypted columns: `medical_notes`, `microchip`, `insurance_json`, `vet_json` — AES-256 column-level encryption, keys in KMS. **Pet health data is not GDPR "special category" data (Article 9 applies to human health only) but owner data attached to it is — minimisation discipline still applies.**

---

## 2. Pre-stay questionnaire + welcome pack flow

### 2.1 When it fires

- **Booking confirmation page:** Soft prompt — "Tell us about Bella so her pack is ready."
- **T-14 days email:** "Bella's stay is coming up — anything we should know?" Magic-link to pre-filled questionnaire (already-saved dogs prefilled; just add a current photo and confirm pack choice).
- **T-3 days SMS/push:** "Bella's pack is being prepared. Final chance to swap pack tier."
- **Check-in:** Concierge confirms verbally — "We have the senior pack in the cottage for Bella, with the elevated bowl."

### 2.2 Flow

**Screen 1 — Dogs travelling.** Multi-select from saved dogs + "Add another". For returning dogs: *"Anything changed for Bella since last time? She's 9 now — would you like our senior pack?"* (auto-detected from DOB).

**Screen 2 — Welcome pack tier.** Visual cards, per-dog selection. Editorial photography of the actual pack contents on a fbf9f6 backdrop. Pricing transparent.

**Screen 3 — Add-ons.** Birthday cake (£18), branded blanket take-home (£32), pawcasso photo session (£85, see §5).

**Screen 4 — Final notes.** Free text — "Anything else?" Goes to housekeeping iPad on cottage prep.

### 2.3 Welcome pack tiers

| Pack | Price | Contents | When suggested |
|------|-------|---------|----------------|
| **Standard** | Included | Ceramic Whalesborough bowl, beach towel, 3 treats (chicken / liver / sweet potato), poo bags in dispenser, walking map, branded bandana | Default for all dogs |
| **Premium** | £28 | Standard + waxed-canvas branded blanket, plaited rope toy made on-farm, longer-lasting venison chew, jar of farm honey-glazed bone, gourmet meal voucher at The Weir | Couples, second-visit dogs, gifting flag |
| **Allergy-conscious** | £24 | Grain-free, single-protein treats (salmon, duck, white fish), hypoallergenic shampoo sample, ingredient cards for everything | Auto-suggested if `allergies` populated |
| **Senior** | £26 | Joint-friendly venison + turmeric chews, raised silicon bowl mat, memory-foam travel pad, soft-bristle brush | Auto-suggested if `age_years >= 8` or `mobility = 'slowing down'` |
| **Puppy** | £22 | Soft puppy treats, training clicker, chewable rope, "first holiday" milestone card and Polaroid for the dog journal, recall whistle | Auto-suggested if `age_months <= 12` |
| **Travel** | £19 add-on | Waxed-canvas car blanket, harness seat-belt clip (sized from weight), collapsible water bowl, calming pheromone wipe | Suggested if booking shows >2hr drive distance (postcode lookup) |

All packs available at check-in too — gift purchase for guests who didn't book a dog but bring one anyway. Standard pack is always free even for unannounced dogs (operational discipline: never penalise a dog at arrival).

---

## 3. Dog map specification

### 3.1 On-site (450-acre estate map layer)

Layer toggle in the existing Estate Navigator (see brief §3.3) labelled **"Dog mode"**. When enabled:

**Markers:**
- Off-lead zones — sage green wash, no marker needed (negative space)
- On-lead zones (near livestock, lambing fields seasonal, lake margin Mar-Jul for nesting birds) — soft amber wash with paw-on-lead glyph
- Dog water bowls (Estate has eight, plotted) — small water-drop glyph
- Dog washing stations (Main reception, Cottage cluster A, Spa entry) — shower glyph
- Waste bins — small bin glyph
- Recommended routes — three coloured polylines (15-min loop, 45-min loop, 90-min lake-and-woods loop)
- "Quiet dog zone" near the spa lawn — for anxious dogs
- Cottage's own enclosed garden — highlighted when a cottage is selected

**Filters:** "Show only off-lead", "Show only flat / mobility-friendly", "Show with shade" (summer), "Show with water" (summer).

**Live data:** Lambing season auto-converts certain fields to on-lead with a banner. Mud-status pin on muddy routes after rain (manually toggled by ground staff via admin).

### 3.2 Local area (Cornwall layer)

Curated POI dataset, 60-100 entries, refreshed quarterly. Categories:

- **Year-round dog beaches** (no restrictions): Black Rock (Widemouth south end), Sandymouth, Duckpool, Millook
- **Seasonal dog beaches** (Oct–Easter access only): Crooklets, Summerleaze, Widemouth main, Crackington Haven
- **Dog-friendly pubs:** filtered for "dogs inside" not just "dogs in beer garden"
- **Dog-friendly cafés:** Bude (The Beach, Olive & Co, Rustic Bakehouse), Marhamchurch, Stratton
- **Dog-friendly attractions:** Bude Castle, Tamar Lakes, Cardinham Woods, Boscastle harbour walk
- **Vets** (24/7 emergency): St Mary's Vets Bude, Penbode Bude
- **Groomers:** local partner list (see §6.4)
- **Dog showers off-site:** which beaches have one (Summerleaze yes)

Each POI: photo, distance/drive time from estate, dog-specific notes ("dogs allowed everywhere except snug"), parking info, on-lead/off-lead, water bowls, our editorial micro-review.

**Booking integration:** Pub & café POIs that take bookings link out via deep link. Vets are click-to-call.

### 3.3 Walking routes module

- 12 curated routes — 4 on-estate, 8 within 20-minute drive
- Each: distance (km + mi), elevation, estimated time, surface (grass/path/sand/cliff/road sections), difficulty (Easy/Moderate/Challenging), mobility-friendly flag, parking, tide-dependence (beach routes), seasonal lock-out
- Downloadable GPX for in-resort offline use (PWA cache)
- Photo carousel per route
- "Why we love this for dogs" editorial paragraph

---

## 4. Dog activities & experiences (product list)

Bookable from the in-stay itinerary panel. All can be added at pre-stay booking flow or live during stay.

| # | Product | Format | Price | Capacity | Frequency |
|---|---------|--------|-------|----------|-----------|
| D1 | **Pawcasso** — guided photography session with on-site photographer in the wildflower meadow / lake / woods, 25 retouched digitals delivered via gallery link | 45 min | £85 single dog, £110 family-and-dog | 1 booking per slot | Wed + Sat AM in season |
| D2 | **Sunday Morning Hound Walk** — guided group walk on estate, finish at The Weir terrace for coffee and dog ice-cream | 60 min | £12 per dog (coffee + dog gelato included) | 8 dogs max | Sunday 09:00 |
| D3 | **Doga & Hounds** — yoga in the lakeside studio, dogs welcome, mat-side, gentle dog massage segment | 60 min | £24 (1 human + 1 dog), £18 add'l dog | 10 humans | Saturday 09:30 (May–Sep) |
| D4 | **The Long Sniff** — slow scent-led walk for senior / less-mobile dogs, ground staff led, ends at the kitchen garden | 45 min | £8 | 6 dogs | Tue + Fri 10:30 |
| D5 | **Puppy Picnic** — supervised socialisation in the dog meadow, ideal first-holiday experience for under-1s, includes puppy pack of toys to take home | 45 min | £18 | 5 puppies | Tue + Sun in season |
| D6 | **Dog Birthday Cake** — chef-made carob and peanut-butter cake delivered to cottage with candle, branded plate, complimentary Polaroid | n/a | £18 | n/a | On request, 48h lead time |
| D7 | **The Lake Swim** — supervised off-lead swim in the safe lake margin (water tested, lifejacket loaner included for non-swimmers) | 30 min | £6 | 4 dogs/slot | Daily in season, weather permitting |
| D8 | **Pampered Pooch package** — dog spa: bath, blueberry facial, pawdicure, blow-dry, scent finish (in partnership with local groomer, on-site mobile van) | 90 min | £58 small, £72 medium, £88 large | 1 per slot | Tue + Thu + Sat |
| D9 | **Dog Day Out** — dog stays under supervision while owners go to W Club Spa or a long lunch. Includes walk, lunch, two play sessions, photo report | 4-6 hours | £45 half-day, £75 full-day | 4 dogs | Daily — kennel partnership |

**Activity bundle:** "The Dog's Stay" — D1 + D2 + D8 + birthday cake (£165, saves £24). Sold as a gift for dog birthdays / "she deserved a holiday too" market.

---

## 5. Restaurant flag + dog menu

### 5.1 Booking flow

The Weir restaurant booking screen (NET NEW per brief §3.1.C) includes a *"Joined by a dog?"* checkbox.

When ticked:
- Auto-filters to indoor seating zones flagged dog-friendly (the bar, the snug, terrace in fair weather). Tighter tables in the formal dining zone don't show.
- Adds a "Dog water bowl on arrival" pre-set note to kitchen
- Surfaces the dog menu inline
- Confirms a dog blanket and bowl on the floor by the chair

### 5.2 Dog menu (on the human menu under "For the Dog")

Three items only — don't over-engineer. Plate them with the same care as the human food. **No pun-heavy names.**

| Item | Description | Price |
|------|-------------|-------|
| **The Weir Bowl** | Slow-cooked chicken, plain rice, steamed carrot, finished with a drizzle of bone broth, served warm in a ceramic bowl | £6 |
| **Hound Ice Cream** | Whalesborough yoghurt, peanut butter, fresh raspberry, served in a paper cup with a biscuit bone | £4 |
| **The Big Treat** | Hand-rolled liver biscuit on a small slate (also available as a takeaway sleeve from reception, £3.50) | £2.50 |

**Birthday cake** is order-ahead via the dog profile, not menu. 48h lead time.

---

## 6. Dog wellness proposal

### 6.1 Dog spa (D8 in activity list)

Partnership with **a Cornwall-based mobile groomer** (commercial term: per-treatment commission, exclusive on-site rights). Mobile van parks on the spa lawn Tue/Thu/Sat. Single dedicated dog-spa slot booking interface in the spa module (treats dog spa as a "Ritual" parallel to human treatments).

Service menu mirrors human spa structure:
- *The Quick Spruce* (bath + blow-dry, 45 min)
- *The Full Day at the Spa* (bath + blueberry facial + pawdicure + de-shed + scent finish, 90 min)
- *The Spa Top-Up* (nail trim + paw balm + ear clean, 30 min — walk-in slot)

### 6.2 Boarding during human spa days

Kennel partnership with a vetted local boarder, on-call drop-off model. App flow: when human spa day exceeds 3hrs and a dog is on the booking, suggest "Bella can stay at the Day Den while you're at the spa — £45". Single screen, one-click add.

### 6.3 Vet partnership

Designated partner vet (St Mary's Bude). Profile shows their phone number and emergency hours on every dog page. App has a single **"Emergency — Vet"** button that calls them directly with the dog's name and microchip number ready to read out (via tel: link with body in clipboard). If the guest has logged insurance, that's surfaced too.

### 6.4 Grooming on-call

If the mobile groomer slots are full, the directory lists 3 vetted Bude/Stratton-based groomers with one-tap call. We don't book on their behalf to keep the partnership commercial-clean.

---

## 7. Community / content specification

### 7.1 Dogs of Whalesborough

Instagram-style gallery on the app and the public website (`/dogs`). Guest-submitted, **opt-in only** (dog profile consent flag). Editorial moderation — every photo reviewed before going live (within 24hrs).

Layout: full-bleed Newsreader Italic dog name, breed, age, cottage they stayed in. One photo per dog per visit, monograph treatment. Counter at top: *"1,247 dogs have stayed at Whalesborough."* Visits captured automatically — counter is real, not vanity.

Submission: in-stay push at T-2 days into stay, "*Share Bella's photo for our gallery?*" Camera roll picker, no upload friction.

### 7.2 Pet-friendly journal (long-form content)

Editorial pieces, 4-6 per year, written in the Coastal Editorial voice. Suggested first six:

1. "What 450 acres looks like to a beagle" — guest essay
2. "The wet dog dilemma: a defence of the dog shower" — head of housekeeping
3. "Five Cornwall coast paths that won't break a senior dog"
4. "Why we let dogs into the dining room" — manifesto piece
5. "How to do a long drive with a dog who hates the car" — practical
6. "The case for a holiday for your dog" — soft-sell of D-series products

### 7.3 Vet & boarding directory

Static curated directory, refresh quarterly, no listings fees taken — keeps it editorial. Each entry: photo, address, distance, phone, opening hours, our 30-word reason for the listing.

### 7.4 Dog-friendly Cornwall guide

Long-form pillar page that integrates the POI map data. Aimed at AI citation (see §8) — written in direct-answer paragraphs, FAQ schema, last-updated visible. Updates quarterly. Drives SEO for "dog friendly Bude", "dog friendly Cornwall", "dog beaches Cornwall year round" — all high-intent queries from the booking-driver demographic.

---

## 8. Marketing & partnerships

### 8.1 Badges

"Welcomes dogs" badge visible on every cottage card. **Not** the lazy paw-print clichรฉ — set in Plus Jakarta Sans uppercase, sage on warm-white background. On the spa, restaurant, and activity pages too where dogs are welcome.

### 8.2 Dogs Trust

Existing affiliate relationship (per brief). Operational pull-throughs:

- **10% of welcome pack revenue donated** — communicate on the pack confirmation screen and email receipt
- Dedicated Dogs Trust page on website with co-branded copy, link from /dog-friendly
- Annual donation total published in November (precedent: Welcome Cottages partnership reached £200k in 7 years — Whalesborough should target £5-10k year one)
- Co-marketed campaign November (Christmas) and May (Dogs Trust supporter mailing window)

### 8.3 Blue Light Card

Existing scheme awareness — dog-owning demographic overlaps heavily with NHS, Forces, Teachers. Add a Blue Light Card field at checkout for 10% off dog packs (not accommodation). Simple verification API integration.

### 8.4 Directory listings

Free / low-cost: DogFriendly.co.uk premium listing, BringFido premium listing, Dog Furiendly featured property, PetsPyjamas property listing, DogTales feature pitch, Apple Pet Travel guide. Editorial pitches: *Country Life, Country & Town House, Cornwall Living, Telegraph Travel pet-friendly roundup, Conde Nast Traveller pet edition*.

### 8.5 Partnership pipeline (12-month)

- **Cornish dog food maker** (Honest, Sturdi) — co-branded gourmet pack item
- **Cornwall-based dog photographer** — commission for D1
- **Pets Pyjamas** — editorial feature deal
- **Vet practice** — exclusive resort vet partner
- **Mobile groomer** — exclusive on-site service partner

---

## 9. Photography brief

Commission a dog-specific shoot (half-day, on estate, mixed weather window). Shot list:

1. Hero — single dog mid-run in the wildflower meadow, late golden hour, motion blur in fur, sharp eye. Drone behind, low angle catching ear-flap. 16:9 and 4:5 crops.
2. Welcome pack flat-lay — premium pack on a fbf9f6 linen, top-down, Newsreader-style label cards.
3. Dog shower in use — wet labrador, light steam, no humans in frame.
4. Indoor crate — golden retriever napping, cottage interior, late afternoon light.
5. Dog at The Weir — dog on a sheepskin under the table, ceramic water bowl in foreground, blurred dining scene behind.
6. Off-lead group — three dogs of different sizes mid-air after a stick, coastal field backdrop.
7. Quiet portrait — close-up of a senior dog's face, sage blanket, available light.
8. Lake swim — dog mid-shake on the lake margin, water droplets, low sun.
9. Pawcasso behind-the-scenes — photographer crouched, dog looking past camera.
10. Black Rock beach — sandy paws, paws-only crop, footprints leading out of frame.
11. Cottage garden — enclosed garden with a dog rolling on the lawn, cottage door open.
12. Diversity shot — a guide dog at the spa entrance, owner present, dignified.

**Style notes:** Newsreader-style cinematic stills, never animation. Real Whalesborough dogs (guest-volunteer programme — comp them a stay). No staged "happy dog smile" stock-photo aesthetic. Available light preferred. Sage and cognac in the colour palette of the framings (sage blankets, cognac collars).

---

## 10. Copy direction

**Three principles:**

1. **The dog is a guest, not an amenity.** Write *"Bella is staying with us"*, not *"pets welcome"*. Booking confirmation: *"Two adults, two children, and Bella will be staying at Honeysuckle Cottage."*

2. **Sophisticated, not twee.** Banned in copy: pawfect, pawsome, furbaby, woof, barking-good, doggo, pupper, fur-friend, paw-some. Allowed sparingly and only in playful contexts (dog menu names, Instagram, the *Pawcasso* product name which is borderline but earns its place): *hound, pooch, dog, the dog, your dog, [dog's name]*. Default to the dog's actual name wherever known.

3. **Dignity scales with the human voice.** The site already uses Newsreader Italic for romance. The dog copy lives in the same register — *"a slow walk and a long sniff"*, not *"zoomies time!"*. The dog menu is the only place we permit lightness — *"The Big Treat"*, *"Hound Ice Cream"*. Everywhere else: register-matched to the parent property voice.

**Sample copy fragments:**

- Hero: *"Every cottage, every garden, every walk — Bella is staying with us."*
- Welcome pack page: *"Your dog will find a bowl, a blanket and a few thoughtful things on arrival, with their name on a card. We chose every item ourselves."*
- Map opener: *"Four hundred and fifty acres. Eight water bowls. Two dog showers. One enclosed garden waiting for you."*
- Dog menu intro: *"A short menu, properly cooked, served in a ceramic bowl."*
- Dogs of Whalesborough: *"One thousand two hundred and forty-seven dogs have stayed here. These are some of them."*

**What we never say:** *"pet-friendly", "dogs are allowed", "no charge for pets"*. We say *"dogs are welcome"*, *"every cottage accepts dogs"*, *"the standard welcome pack is included with every dog's stay"*.

---

## 11. Privacy summary (cross-references §7 of project brief)

- Pet data is owner data and falls under UK GDPR; treat as personal data
- Medical, microchip, insurance, vet fields encrypted at column level (AES-256, KMS-managed keys)
- Photo consent for Dogs of Whalesborough is explicit opt-in, default OFF, withdrawable
- Vet info shared only on guest-initiated emergency call, never broadcast
- Dog marketing consent is separate granular flag from human marketing consent
- Retention: profile retained while household account active + 24 months post-last-booking, then purged or anonymised on request

---

## 12. Build sequence

**MVP (launch):** Dog profile system, pre-stay questionnaire, standard + premium pack, on-site map layer, restaurant dog flag + 3-item dog menu, "Welcomes dogs" badges, marketing copy update.

**Phase 2 (T+3 months):** All six pack tiers, full activity suite D1-D9, local POI map, Dogs of Whalesborough gallery, mobile groomer partnership live.

**Phase 3 (T+6 months):** Doga, Pawcasso, vet/insurance encrypted profile, Dogs Trust co-branded campaign, journal content live, AI-citation pillar page.

---

*This module differentiates Whalesborough not by adding a "pets welcome" badge but by giving the dog its own profile, its own pre-stay journey, its own merchandise relationship, its own restaurant experience and its own community. Nobody in UK luxury hospitality does this properly. We will.*
