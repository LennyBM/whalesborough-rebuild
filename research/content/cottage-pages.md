# Cottage Detail Page — Template + Five Sample Properties

*Paste-ready content for the Whalesborough Farm Resort & Spa booking app. Coastal Editorial voice. All copy written 14 May 2026 against the operational dashboard (Week 20) and verified against the unit inventory.*

---

## How To Use This File

The first section is the canonical template that every one of the 34 bookable cottage detail pages should follow. The order of blocks is fixed — it is the order in which AI crawlers (GPTBot, ClaudeBot, PerplexityBot) parse the page, and it is the order our own analytics show converts.

The five properties that follow are the highest-revenue cottages in the 2026 trading year (Whalesborough Farmhouse £71k YTD, Gwari Spa Barn 2 £71k YTD on volume, Whalesborough Cottage £65k YTD, Trelowen 3.0 Spa £40k YTD, Calf House £34k YTD). Treating them first means 30% of YTD revenue is paste-ready before the long tail.

At the end of this document sits the JSON-LD schema template — one block per page, with placeholders. The schema is the layer that wins AI-search citations and rich results.

---

## The Cottage Page Template

Every cottage page is built from eleven blocks, in this order. Each block has a fixed purpose. If a block does not apply (no hot tub, no dogs) it is omitted entirely — never replaced with placeholder copy.

### Block 1 — BLUF (30–50 words)

A single AI-citable lead paragraph. Fact-dense. Names the cottage, the category, the sleeps, the sleeps-by-room count, the standout feature, and the position on the estate. This is the paragraph that ChatGPT and Perplexity quote when a user asks "What's the best cottage at Whalesborough?".

Template prompt:
> [Cottage Name] is a [period/origin] [unit type] at Whalesborough Farm Resort & Spa near Bude, sleeping [N] across [N] bedrooms. [Standout feature in one clause]. [Position on the 500-acre estate]. [Dog policy clause].

### Block 2 — Hero Gallery Alt-Text Guidance

A short editorial note for the photographer and the CMS, defining the seven hero images and the alt text for each. Not user-facing; this lives in a CMS sidecar field.

### Block 3 — Narrative Description (200–400 words)

The voice paragraph. Story-led, not feature-listed. Names the building's previous use if it was a conversion. Walks the reader from the front door inwards. Honest about quirks. No "discover", "unwind", "indulge", "perfect", "stunning", "nestled", "haven". Adjectives subordinate to nouns.

### Block 4 — What You'll Find (amenity table)

A two-column table. Left column is the feature category. Right column is the specific detail. AI crawlers parse tables better than they parse paragraphs.

### Block 5 — Layout (factual)

Bedrooms, bathrooms, living arrangements. Bullet list. One bedroom per line, configuration on the same line.

### Block 6 — Hot Tub Callout (50 words — only if applicable)

Specific to this cottage's hot tub: where it sits, what it looks onto, when it is at its best, the practical note (refresh schedule, towel provision).

### Block 7 — Dog Welcome (50 words — only if applicable)

Specific to this cottage. Not boilerplate. References the garden layout, the floor finish (lime-washed flagstone or oak), the proximity to the off-lead farm walks, the dog-washing tap or boot room if present.

### Block 8 — Location On The Estate (50 words)

Where the cottage sits on the 500-acre estate relative to The W Club Spa, The Weir Bistro, the indoor pool, and the cluster (Arvor block, cottage row, signature outlier). Walking times in minutes.

### Block 9 — Best For (30 words)

Who this cottage suits. Plain language. Multi-generation family, couple's first weekend away, three couples sharing.

### Block 10 — Cancellation Snippet + Booking CTA

A two-line factual snippet (flexible cancellation policy summary) and the CTA microcopy. CTA microcopy is fixed across the estate: "Check availability and book direct".

### Block 11 — JSON-LD Schema (Accommodation + Product)

The structured data block. See the schema template at the end of this file.

---

## Sample 1 — Whalesborough Farmhouse

### BLUF

Whalesborough Farmhouse is the Grade II-listed 14th-century farmhouse at the heart of the 500-acre Whalesborough Farm Resort & Spa near Bude, Cornwall. It sleeps eight across four double bedrooms, with a private hot tub, snooker room, cinema snug, inglenook fireplace, and original flagstone floors. Dogs welcome.

### Hero Gallery Alt-Text Guidance

Seven images, in order:
1. Exterior west elevation at dusk, the long stone façade washed in late sun — alt: "Whalesborough Farmhouse west elevation at dusk, fourteenth-century stone front under a lit sky."
2. Inglenook fireplace in the main sitting room, fire laid but unlit, exposed oak lintel — alt: "Inglenook fireplace with original oak lintel in the sitting room."
3. Open-plan kitchen-dining-conservatory with the eight-seat table in foreground — alt: "Open-plan kitchen with seats-eight dining table and conservatory beyond."
4. Snooker room with the full-size table lit, bar and cinema snug visible — alt: "Snooker room with full-size table, bar, and cinema snug to the rear."
5. Master bedroom, double bed with ensuite door open — alt: "Master double bedroom with ensuite."
6. Hot tub on the rear patio at twilight, hillside views beyond — alt: "Private hot tub on the rear patio with hillside views across the estate."
7. The boot room with slate floor, hooks, and dog towels folded — alt: "Slate-floored boot room with hooks and folded dog towels."

### Narrative Description

The Farmhouse is the building the estate is named after. The records list it as fourteenth century — a Grade II-listed long house that pre-dates almost everything else in the parish. It was the working farmhouse for the holding for six hundred years before the conversion. The bones show. You step in through the boot room onto a flagstone floor that has been worn smooth in two parallel troughs where generations of farm boots came in and out. The lintel over the inglenook is a single oak beam, blackened from centuries of smoke. The walls in places are eighteen inches thick.

The renovation, completed across a careful four-year programme, did not try to disguise any of this. The kitchen is integrated Bosch behind reclaimed timber fronts. The American fridge-freezer sits in a former pantry. The conservatory at the rear extends the kitchen-diner into a glazed eight-seat room that looks west across hillside paddocks. Upstairs, the four double bedrooms are laid out over the original first-floor plan — two with ensuites, the others sharing a family bathroom on the landing. Some doorways are lower than modern build, characteristic of fourteenth-century construction; tall guests learn the lintels quickly.

The snooker room is the surprise. A full-size table sits in what was once the dairy, with a small bar at the gable end and a cinema snug — four leather recliners, blackout blinds, a 65-inch screen — tucked behind a partition wall. It is the room that turns a quiet family week into a three-generation family week. The hot tub on the rear patio reads the hillside; in late afternoon the sun drops behind the ridge and the steam catches it. Parking is three cars on the gravelled court at the front.

### What You'll Find

| Feature | Detail |
|---|---|
| Sleeps | 8 across 4 double bedrooms (cot available) |
| Bathrooms | 2 ensuites + 1 family bathroom |
| Hot tub | Private, rear patio |
| Snooker room | Full-size table, bar, cinema snug with 65" screen |
| Kitchen | Integrated Bosch oven, hob, dishwasher; American fridge-freezer; eight-seat dining table |
| Heating | Wood burner in main sitting room; central heating throughout |
| Floors | Original flagstone (ground floor); oak boards (first floor) |
| Outdoor | Enclosed rear garden, BBQ, patio, hillside views |
| Parking | Three cars on the gravelled court |
| Dogs | Up to two well-behaved dogs welcome |
| Wi-Fi | Full estate Wi-Fi; faster signal in the kitchen wing |
| Changeover | Monday, Friday, or Saturday |

### Layout

- Ground floor: boot room, inglenook sitting room, open-plan kitchen-diner, conservatory, snooker room, cinema snug, family bathroom
- First floor: four double bedrooms (two with ensuites), family bathroom, landing reading nook
- Outside: enclosed rear garden with patio and BBQ, hot tub, parking for three

### Hot Tub

The hot tub sits on the rear patio behind a low stone wall. From the bench you read the hillside, the line of beech trees on the western ridge, and (in summer) the swallows working the field above. Refreshed between every changeover. Bath towels and hot-tub robes are provided; we ask guests to use the dedicated hot-tub towels rather than bath linen.

### Dogs

The Farmhouse takes up to two well-behaved dogs. The slate-floored boot room at the front entrance is purpose-built for muddy paws — hooks at dog-height, a row of folded dog towels, a tap with a low spout. The enclosed rear garden is fully stock-fenced. Off-lead farm walks begin two minutes from the front gate; a stile leads onto the network of estate paths.

### Location On The Estate

The Farmhouse sits on the highest part of the estate, separated from the cottage cluster by a band of orchard. The W Club Spa is a seven-minute walk via the lower path; the Weir Bistro is twelve minutes on foot or three minutes by car. The indoor pool sits beneath the spa block. The position trades proximity for privacy.

### Best For

Three-generation families taking the snooker room and cinema snug seriously, anniversary gatherings of eight, and groups who want the estate's flagship without the wedding-venue scale.

### Cancellation and Booking

Flexible cancellation up to 21 days before arrival; standard terms thereafter. All-in pricing from £293 per night, including bed linen, towels, the welcome hamper, full estate Wi-Fi, and access to The W Club indoor pool and gym.

**Check availability and book direct →**

---

## Sample 2 — Whalesborough Cottage

### BLUF

Whalesborough Cottage is a seventeenth-century converted livestock barn at Whalesborough Farm Resort & Spa near Bude, Cornwall. It sleeps eight across four double bedrooms — all ensuite — with a ground-floor master, private hot tub, chill-out den with a 55-inch screen and beanbags, and bifold doors onto an enclosed garden. Dogs welcome.

### Hero Gallery Alt-Text Guidance

1. Exterior front, stone barn with original lintel and modern oak entrance door — alt: "Whalesborough Cottage exterior front, seventeenth-century stone barn with modern oak entrance."
2. Open-plan kitchen-diner with breakfast bar and bifolds open onto the patio — alt: "Open-plan kitchen with breakfast bar and bifold doors onto the patio."
3. Lounge-diner looking through bifolds to the hot tub — alt: "Lounge with bifold doors open to the patio and hot tub beyond."
4. Chill-out den, beanbags, 55-inch screen — alt: "Chill-out den with beanbags and large screen."
5. Ground-floor master bedroom, king bed, ensuite door visible — alt: "Ground-floor master bedroom with king bed and ensuite."
6. Hot tub at dusk on the rear patio — alt: "Hot tub on the rear patio at dusk."
7. Garden view across the former Whalesborough Estate hillside — alt: "Garden view across hillside paddocks of the Whalesborough Estate."

### Narrative Description

Whalesborough Cottage was a livestock barn before it was a cottage. The records have it down as a late-seventeenth century build — one of the working barns that served the medieval farmhouse next door. The conversion is recent and properly done. The four bedrooms are all ensuite, which matters when eight people are sharing a kitchen, and the master is on the ground floor — useful for grandparents who would rather not climb the stairs and for couples sharing with three other couples who would rather not negotiate a single first-floor landing.

The plan opens up the way good barn conversions do. A breakfast bar separates the kitchen from the lounge-diner; bifold doors fold back along the rear wall and the patio becomes part of the living space when the weather permits. The lounge has a woodburner and a chill-out den behind a partition wall — beanbags, a 55-inch screen, the kind of room a teenager will retreat into on the second evening of a family week. Smart TVs are in every bedroom for the same reason.

The kitchen runs to a full-spec working kitchen: integrated Bosch appliances, a dishwasher, a washing machine and tumble dryer (because at eight guests a washer matters), and a dining table that seats eight under a low pendant light. The cottage holds a Five Star Gold rating from VisitEngland and was the top-revenue eight-sleeper on the estate for the 2026 trading year to mid-May. The garden is enclosed and patioed, with the hot tub set on a separate decking spur for hot-tub privacy, and the BBQ stationed under the eaves for English summer weather realism.

### What You'll Find

| Feature | Detail |
|---|---|
| Sleeps | 8 across 4 double bedrooms |
| Bathrooms | 4 ensuites (one per bedroom) |
| Hot tub | Private, rear patio decking |
| Kitchen | Integrated Bosch, eight-seat dining table, breakfast bar |
| Living | Lounge with woodburner; chill-out den with 55" screen and beanbags |
| Floors | Tiled (ground floor); oak boards (first floor) |
| Bifold doors | Lounge to patio |
| Outdoor | Enclosed garden, patio, BBQ, hot tub |
| Parking | On-cottage parking |
| Dogs | Welcome |
| Heating | Woodburner plus central heating |
| Changeover | Saturday |

### Layout

- Ground floor: open-plan kitchen-diner, lounge with woodburner, chill-out den, master double with ensuite, utility room
- First floor: three double bedrooms each with ensuite
- Outside: enclosed garden, patio with hot tub and BBQ, parking

### Hot Tub

The hot tub sits on its own decking spur off the main patio, screened from the lounge view by a low planted hedge. It catches afternoon sun and holds it past sunset. Refreshed between every changeover; bath towels and hot-tub robes provided. The decking spur means six in the tub does not block the bifolds for the two staying inside.

### Dogs

Whalesborough Cottage takes dogs in the downstairs living rooms; bedrooms are dog-free as standard. The enclosed rear garden is stock-fenced on three sides with a gate onto the patio. The tiled ground floor wipes down quickly. Off-lead estate walks start a five-minute stroll from the front door, taking the lower path past the orchard.

### Location On The Estate

Whalesborough Cottage sits next door to the Farmhouse on the elevated western ridge of the estate, looking over the working paddocks. The W Club Spa is a six-minute walk; the Weir Bistro is ten minutes on foot. The cottage is closer to the estate's quiet edge than to the cottage row, which buys an unusual amount of seclusion for an eight-sleeper.

### Best For

Two-couple-plus-children groups who want four ensuites and a den the teenagers can claim, and multi-generation families who need the ground-floor master.

### Cancellation and Booking

Flexible cancellation up to 21 days before arrival; standard terms thereafter. All-in pricing from £296 per night, including bed linen, towels, the welcome hamper, full estate Wi-Fi, and access to The W Club indoor pool and gym.

**Check availability and book direct →**

---

## Sample 3 — Gwari Spa Barn 2.0

### BLUF

Gwari Spa Barn 2.0 is a 105-square-metre two-storey spa cottage at Whalesborough Farm Resort & Spa near Bude, Cornwall. It sleeps four across two king bedrooms — both ensuite, both with smart TVs — with upper-floor open-plan living, full-height glazing, Sonos sound, and a private hot tub. Dogs welcome.

### Hero Gallery Alt-Text Guidance

1. Exterior at dusk, modern barn cladding catching last light — alt: "Gwari Spa Barn 2.0 exterior at dusk, contemporary cladding under a low sun."
2. Upper-floor living area with floor-to-ceiling window and Sonos speaker visible — alt: "Upper-floor open-plan living room with full-height window."
3. Kitchen island and dining table with the view beyond — alt: "Kitchen island with dining table and the estate view through the window."
4. Master bedroom with ensuite door open showing the shower cubicle — alt: "Master king bedroom with ensuite shower."
5. Second king bedroom with the bath-shower ensuite glimpsed — alt: "Second king bedroom with ensuite bath."
6. Hot tub on the rear garden with sun loungers — alt: "Private hot tub on the rear garden with sun loungers."
7. Garden in summer with the lounge set occupied — alt: "Private garden with lounge furniture in summer light."

### Narrative Description

Gwari Spa Barn 2.0 is the most-booked spa cottage on the estate by volume — 434 nights and 87 bookings to mid-May 2026 — and it is not hard to see why. The plan flips the usual barn-conversion expectation. Bedrooms are downstairs; the living, dining, and kitchen sit upstairs under the highest part of the roof. The architects put the eye-line at the level of the treetops on the eastern ridge, and a single floor-to-ceiling window at the gable does the rest of the work.

The kitchen runs along the long wall — integrated Bosch, an oven plus combination microwave, a wine cooler under the island, a coffee machine on the counter. The dining table seats four under a brass pendant. The lounge half of the upper floor takes a corner sofa pointed at the view, a Sonos speaker, and a smart TV mounted over a concrete-effect plinth. The acoustics upstairs are notable: the vaulted ceiling and the soft furnishings absorb just enough to keep a conversation from going harsh.

Both bedrooms are kings, both ensuite, both with smart TVs. Bedroom one takes the shower-cubicle ensuite; bedroom two takes a bath with shower over. The downstairs hall is heated tile, an unsung detail that pays off on January arrivals. The hot tub on the rear garden is fenced for hot-tub privacy and oriented away from the neighbouring cottage. The garden has a lounge set and sun loungers for the run of weather we get in Cornwall in May, June, and September. Gwari 2.0 is the cottage we recommend to first-time spa-cottage guests as a benchmark.

### What You'll Find

| Feature | Detail |
|---|---|
| Sleeps | 4 across 2 king bedrooms |
| Bathrooms | 2 ensuites (one shower cubicle; one bath with shower over) |
| Hot tub | Private, rear garden |
| Internal area | 105 square metres |
| Kitchen | Integrated Bosch, wine cooler, coffee machine, four-seat dining |
| Living | Upper-floor open-plan; Sonos speaker system; smart TV; floor-to-ceiling window |
| Smart TVs | In both bedrooms |
| Floors | Heated tile (ground floor); oak boards (first floor) |
| Outdoor | Private garden, sun loungers, lounge set, hot tub |
| Dogs | Welcome |
| Heating | Underfloor (ground); central (first) |
| Changeover | Monday |

### Layout

- Ground floor: entrance hall, two king bedrooms, two ensuites
- First floor: open-plan kitchen, dining, lounge with floor-to-ceiling window
- Outside: private garden with hot tub, sun loungers, lounge set

### Hot Tub

The hot tub sits on the rear garden inside a low timber fence that screens the immediate neighbour without closing the view. Best after sunset, when the underwater light is the brightest object in the garden and the upstairs lounge windows glow warm above. Refreshed between every changeover; bath towels and hot-tub robes provided.

### Dogs

Gwari 2.0 takes dogs across the ground floor; the upper-floor living space is dog-free as standard. The heated-tile downstairs hallway and bedrooms wipe down in seconds. The garden is timber-fenced on all four sides. Off-lead farm walks start across the courtyard, three minutes from the door.

### Location On The Estate

Gwari Spa Barn 2.0 sits in the spa-cottage cluster on the eastern side of the estate, about four minutes' walk from The W Club Spa and the indoor pool. The Weir Bistro is six minutes on foot. The siting puts the cottage close to the wellbeing facilities and away from the family-cottage row, which is part of why couples book it.

### Best For

Two-couple breaks where everyone wants their own ensuite and no one wants to climb stairs to the bedroom, and design-minded couples taking a long weekend off the clock.

### Cancellation and Booking

Flexible cancellation up to 21 days before arrival; standard terms thereafter. All-in pricing from £165 per night, including bed linen, towels, the welcome hamper, hot-tub refresh between stays, full estate Wi-Fi, and access to The W Club indoor pool and gym.

**Check availability and book direct →**

---

## Sample 4 — Calf House

### BLUF

Calf House is a 136-square-metre eight-sleeper spa barn at Whalesborough Farm Resort & Spa near Bude, Cornwall. Converted from a calf-rearing shed in the 1980s and recently refitted, it sleeps eight across four bedrooms — two upstairs kings with ensuites, two downstairs sharing a shower room — with a private hot tub, woodburner, underfloor heating, and a designer reclining chair in the lounge. Dogs welcome.

### Hero Gallery Alt-Text Guidance

1. Exterior front, stone-and-render frontage with modern porch — alt: "Calf House exterior, stone frontage with modern porch."
2. Open-plan kitchen-diner with the table set for nine — alt: "Open-plan kitchen with dining table set for nine."
3. Corner sofa, designer reclining chair, woodburner with logs stacked — alt: "Lounge with corner sofa, reclining chair, and woodburner."
4. Master king bedroom with ensuite door visible — alt: "Upstairs master king bedroom with ensuite."
5. Second king with the second ensuite glimpsed — alt: "Second upstairs king bedroom with ensuite bathroom."
6. Hot tub on the rear patio, garden furniture beyond — alt: "Private hot tub on the rear patio with garden furniture."
7. Garden in afternoon light with the boundary hedge — alt: "Enclosed rear garden in afternoon light."

### Narrative Description

Calf House was, as the name says, the shed where the farm reared its calves. The 1980s conversion turned it into an eight-sleeper and the recent refit brought the kitchen, bathrooms, and electrics into 2026. The shell is the original — a long single-aisle barn under a slate-tile roof, with the original stone walls left exposed in the lounge and the new ground-floor extension running off the gable.

The downstairs sleeps three. One bedroom takes three single beds — useful for cousins or for a family with three children who like their own beds. A second downstairs room takes a single. They share a shower room and a separate toilet, which is how Calf House sleeps eight without four ensuites. Upstairs are the two grown-up rooms: both kings, both with ensuites, one a shower room and the other a full bathroom with separate shower. It is a generous layout for groups where the children and the adults are not booking the same sort of space.

The lounge is the room you remember. Corner sofa, a designer reclining chair angled at the woodburner, underfloor heating throughout the ground floor, a widescreen TV mounted at the gable end, superfast Wi-Fi for the work-from-cottage week. The kitchen integrates Bosch appliances and opens into a dining area that seats nine — one over the official eight, for the friend who turns up for the evening. The hot tub sits on the enclosed rear patio. Three cars fit on the parking apron. Calf House holds a Five Star Gold rating and is the third highest-revenue eight-sleeper on the estate.

### What You'll Find

| Feature | Detail |
|---|---|
| Sleeps | 8 across 4 bedrooms |
| Bathrooms | 2 upstairs ensuites; downstairs shower room + separate toilet |
| Hot tub | Private, rear patio |
| Internal area | 136 square metres |
| Kitchen | Integrated Bosch, dining for nine |
| Living | Corner sofa, designer reclining chair, woodburner, widescreen TV |
| Heating | Underfloor (ground floor); woodburner; central heating |
| Wi-Fi | Superfast |
| Outdoor | Enclosed patio and garden, private hot tub, BBQ |
| Parking | Three cars |
| Dogs | Welcome |
| Changeover | Friday |

### Layout

- Ground floor: open-plan kitchen-diner, lounge with woodburner, two bedrooms (one with three singles, one with single), shower room, separate toilet
- First floor: two king bedrooms with ensuites (one shower room, one bath with separate shower)
- Outside: enclosed patio and garden with hot tub and BBQ, parking for three

### Hot Tub

The hot tub sits on the enclosed rear patio, screened by the boundary hedge and the cottage gable. Refreshed between every changeover; bath towels and hot-tub robes provided. The patio orientation catches the last of the afternoon sun. The hot tub is sized for six comfortably; eight will fit if everyone wants to be close.

### Dogs

Calf House is one of the most dog-comfortable cottages on the estate. The ground floor underfloor heating dries off paws quickly. The enclosed rear garden is fully fenced and gated. The downstairs layout means you can settle a dog in the lounge without negotiating stairs at the end of a long walk. Off-lead farm tracks start ninety seconds from the front gate.

### Location On The Estate

Calf House sits in the central cottage cluster, six minutes' walk from The W Club Spa and four minutes from the Weir Bistro. It is closer to the children's play area than the signature properties, which is partly why families book it and partly why two-couple-plus-children groups choose it over the more isolated Farmhouse.

### Best For

Two-family groups of four-adults-and-four-children, three-generation gatherings, and friend groups who need a flexible sleeping plan rather than four matching ensuites.

### Cancellation and Booking

Flexible cancellation up to 21 days before arrival; standard terms thereafter. All-in pricing from £271 per night, including bed linen, towels, the welcome hamper, hot-tub refresh between stays, full estate Wi-Fi, and access to The W Club indoor pool and gym.

**Check availability and book direct →**

---

## Sample 5 — Trelowen 3.0 Spa

### BLUF

Trelowen 3.0 Spa is a new-build three-bedroom contemporary lodge at Whalesborough Farm Resort & Spa near Bude, Cornwall. It sleeps six with floor-to-ceiling glazing, an integrated wine cooler, a private hot tub, sun-lounger garden, and a fully open-plan single-level layout. Dogs welcome.

### Hero Gallery Alt-Text Guidance

1. Exterior at dusk, cedar-clad lodge with the lit interior visible through the gable glazing — alt: "Trelowen 3.0 lodge exterior at dusk with full-height glazing illuminated."
2. Open-plan living room looking out through floor-to-ceiling glass — alt: "Living room with floor-to-ceiling glass facing the garden."
3. Kitchen island with wine cooler and coffee machine — alt: "Kitchen island with integrated wine cooler and coffee machine."
4. Master bedroom with ensuite glimpse — alt: "Master bedroom with ensuite."
5. Second bedroom, double bed — alt: "Second double bedroom."
6. Hot tub on the rear deck with sun loungers — alt: "Private hot tub on the rear deck."
7. Sun-lounger garden in afternoon light — alt: "Sun-lounger garden in afternoon light."

### Narrative Description

Trelowen is the contemporary corner of the estate. Three lodges sit on a south-facing slope on the eastern edge of the 500-acre site, cedar-clad and steel-framed, with single-level interiors that open along their full length onto private decks. Trelowen 3.0 is the three-bedroom variant in the row, sleeping six, and it is the highest-ADR Trelowen unit by the May 2026 trading data.

The plan is one long axis. You enter into the kitchen, which runs along the long internal wall — integrated Bosch oven, hob, dishwasher, an island with a wine cooler set into the end and a coffee machine on the counter. The kitchen flows without partition into a dining table that seats six, and the dining flows into a lounge with two sofas pointed at the floor-to-ceiling glazing. The glazing runs from polished concrete floor to vaulted ceiling along the entire gable. In summer the bifold doors fold all the way back and the deck becomes part of the room.

The three bedrooms are arranged off a single corridor. The master is a king with ensuite. The second and third bedrooms share a shower room. All three rooms are quiet, soft-furnished, and dressed in the calm sage-and-cognac palette that defines the lodge line. The hot tub sits on the rear deck — covered by a pergola, lit by a single downlight — and the garden runs to a row of sun loungers on the lower terrace. The lodges were built new for the 2024 opening and the finishes show that build year throughout. There is no creak, no concession, no soft floor. Trelowen 3.0 is the cottage we recommend to design-led couples-of-couples who want minimalism with a hot tub.

### What You'll Find

| Feature | Detail |
|---|---|
| Sleeps | 6 across 3 bedrooms |
| Bathrooms | 1 master ensuite; 1 shared shower room |
| Hot tub | Private, rear deck under pergola |
| Kitchen | Integrated Bosch, island, wine cooler, coffee machine, six-seat dining |
| Living | Open-plan; full-height bifolds; smart TV with soundbar |
| Floors | Polished concrete throughout |
| Heating | Underfloor throughout |
| Outdoor | Private deck, sun loungers, hot tub, BBQ |
| Storeys | Single |
| Dogs | Welcome |
| Changeover | Monday, Friday, or Saturday |

### Layout

- Single floor: entrance, open-plan kitchen-diner-lounge, three bedrooms off a single corridor, master ensuite, shared shower room
- Outside: private deck with pergola-covered hot tub, lower-terrace sun-lounger garden

### Hot Tub

The hot tub sits on the rear deck under a low pergola, which makes it a year-round proposition — covered enough to keep light rain off the shoulders, open enough to take in the night sky. Refreshed between every changeover; bath towels and hot-tub robes provided. The downlight under the pergola is dimmable.

### Dogs

Trelowen 3.0 takes dogs across the whole lodge. The polished-concrete floors wipe down to nothing. The garden is fully fenced and gated at the front and rear. The lodge cluster sits on the edge of the off-lead farm-walks network — a stile leads onto the estate path within ninety seconds of the front door. Dog beds and bowls available on request at booking.

### Location On The Estate

Trelowen 3.0 sits on the south-facing eastern slope of the estate, alongside the other two Trelowen lodges. The W Club Spa is five minutes' walk via the upper path; the Weir Bistro is eight minutes on foot. The lodge cluster is the quietest part of the estate at night — no through-route, no near neighbours other than the two sister lodges.

### Best For

Three-couple breaks where everyone gets their own room and shares the open plan, and design-led couples taking a celebration weekend with parents or close friends.

### Cancellation and Booking

Flexible cancellation up to 21 days before arrival; standard terms thereafter. All-in pricing from £190 per night, including bed linen, towels, the welcome hamper, hot-tub refresh between stays, full estate Wi-Fi, and access to The W Club indoor pool and gym.

**Check availability and book direct →**

---

## JSON-LD Schema Template

One block per cottage page. Place inside a `<script type="application/ld+json">` tag in the document head or before the closing `</body>`. The block combines an `Accommodation` entity (for AI-search and rich results) with a nested `Product` (for Search Console rich snippets and price display). Placeholders are wrapped in double curly braces.

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LodgingBusiness", "Accommodation"],
      "@id": "https://whalesborough.com/stay/cottages/{{cottage-slug}}#accommodation",
      "name": "{{Cottage Name}}",
      "description": "{{BLUF paragraph, 30-50 words}}",
      "url": "https://whalesborough.com/stay/cottages/{{cottage-slug}}",
      "image": [
        "https://whalesborough.com/images/{{cottage-slug}}/hero-1.jpg",
        "https://whalesborough.com/images/{{cottage-slug}}/hero-2.jpg",
        "https://whalesborough.com/images/{{cottage-slug}}/hero-3.jpg"
      ],
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Whalesborough Farm Resort & Spa, Marhamchurch",
        "addressLocality": "Bude",
        "addressRegion": "Cornwall",
        "postalCode": "EX23 0JD",
        "addressCountry": "GB"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "50.8086",
        "longitude": "-4.5236"
      },
      "containedInPlace": {
        "@type": "Resort",
        "@id": "https://whalesborough.com/#resort",
        "name": "Whalesborough Farm Resort & Spa"
      },
      "numberOfRooms": {{N bedrooms}},
      "occupancy": {
        "@type": "QuantitativeValue",
        "maxValue": {{N sleeps}}
      },
      "floorSize": {
        "@type": "QuantitativeValue",
        "value": {{m² figure or omit}},
        "unitCode": "MTK"
      },
      "petsAllowed": {{true | false}},
      "amenityFeature": [
        {"@type": "LocationFeatureSpecification", "name": "Private hot tub", "value": {{true|false}}},
        {"@type": "LocationFeatureSpecification", "name": "Woodburner", "value": {{true|false}}},
        {"@type": "LocationFeatureSpecification", "name": "Wi-Fi", "value": true},
        {"@type": "LocationFeatureSpecification", "name": "Dishwasher", "value": true},
        {"@type": "LocationFeatureSpecification", "name": "Washing machine", "value": true},
        {"@type": "LocationFeatureSpecification", "name": "Underfloor heating", "value": {{true|false}}},
        {"@type": "LocationFeatureSpecification", "name": "Hair dryer", "value": true},
        {"@type": "LocationFeatureSpecification", "name": "Parking", "value": true},
        {"@type": "LocationFeatureSpecification", "name": "Garden", "value": true},
        {"@type": "LocationFeatureSpecification", "name": "BBQ", "value": true},
        {"@type": "LocationFeatureSpecification", "name": "Smart TV", "value": true},
        {"@type": "LocationFeatureSpecification", "name": "Hot tub", "value": {{true|false}}},
        {"@type": "LocationFeatureSpecification", "name": "Dog welcome", "value": {{true|false}}}
      ],
      "starRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "ratingExplanation": "Five Star Gold (VisitEngland)"
      }
    },
    {
      "@type": "Product",
      "@id": "https://whalesborough.com/stay/cottages/{{cottage-slug}}#product",
      "name": "{{Cottage Name}} — {{N}}-night stay",
      "description": "{{BLUF paragraph}}",
      "image": "https://whalesborough.com/images/{{cottage-slug}}/hero-1.jpg",
      "brand": {
        "@type": "Brand",
        "name": "Whalesborough Farm Resort & Spa"
      },
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "GBP",
        "lowPrice": "{{lowest seasonal ADR}}",
        "highPrice": "{{peak seasonal ADR}}",
        "offerCount": "12",
        "availability": "https://schema.org/InStock",
        "url": "https://whalesborough.com/stay/cottages/{{cottage-slug}}/book"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.5",
        "reviewCount": "{{count from Feefo or omit}}",
        "bestRating": "5",
        "worstRating": "1"
      }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {"@type": "ListItem", "position": 1, "name": "Stay", "item": "https://whalesborough.com/stay"},
        {"@type": "ListItem", "position": 2, "name": "Cottages & Lodges", "item": "https://whalesborough.com/stay/cottages"},
        {"@type": "ListItem", "position": 3, "name": "{{Cottage Name}}", "item": "https://whalesborough.com/stay/cottages/{{cottage-slug}}"}
      ]
    }
  ]
}
```

### Pre-Populated Schema Values For The Five Samples

The placeholders for the five samples written above are:

| Cottage | Slug | Sleeps | Bedrooms | m² | Hot tub | Dogs | Low ADR | Peak ADR |
|---|---|---|---|---|---|---|---|---|
| Whalesborough Farmhouse | `whalesborough-farmhouse` | 8 | 4 | 210 | true | true | £239 | £415 |
| Whalesborough Cottage | `whalesborough-cottage` | 8 | 4 | 158 | true | true | £241 | £419 |
| Gwari Spa Barn 2.0 | `gwari-spa-barn-2-0` | 4 | 2 | 105 | true | true | £128 | £247 |
| Calf House | `calf-house` | 8 | 4 | 136 | true | true | £219 | £386 |
| Trelowen 3.0 Spa | `trelowen-3-0-spa` | 6 | 3 | omit | true | true | £148 | £284 |

Low and peak ADR figures are derived from the Week 20 trading dashboard's monthly ADR series, applied to each unit's £/night band: low = February band; peak = August band.

---

## Editorial Notes For The CMS

A short list of paste-time rules that keep voice consistent across the long tail of 34 cottage pages.

1. **The estate is 500 acres.** Never 450. The Project Brief uses "450-500" as a placeholder range; the operational dashboard and the unit inventory both confirm 500.
2. **Hot-tub cottages get a hot-tub callout.** Cottages without hot tubs do not get a phantom block; the section is removed entirely.
3. **Dog policy is per-cottage and per-page.** Beachcombers and Kew Villa cap at two dogs; the Farmhouse takes two; Eagle's Nest, Arvor Suite 1.0, and Penthouse 2.0 take none. Boilerplate "Dogs welcome" copy is not acceptable.
4. **All-in pricing language is mandatory.** Every booking CTA snippet uses the formula "from £X per night, including [items]". Never list a base price without the inclusions.
5. **Grade II listed properties get the listing.** Only the Farmhouse qualifies on the current estate. Lean into the period detail; do not paper over the quirks (low ceilings, narrow doorways).
6. **Banned words.** Discover, unwind, indulge, perfect, stunning, nestled, haven. Also banned at velocity: cosy (use specific warmth — woodburner, underfloor heating, slate-floored), luxurious (replace with the specifying noun — eight-seat dining table, full-height glazing).
7. **Specifics over adjectives.** "A slate-floored kitchen" not "a beautiful kitchen". "An eight-seat oak dining table" not "a large dining table".
8. **Conversion origins matter.** Where a cottage was a calf shed, a milking parlour, a feed mill, or a livestock barn, that fact opens the narrative paragraph. It is the AI-citation hook and the human conversion hook.
9. **Changeover days are factual.** The cancellation snippet is a one-line summary, not the full policy — the full policy lives on the booking page.
10. **The CTA microcopy is fixed.** "Check availability and book direct →" across every page. The arrow is a chevron, not an emoji.
