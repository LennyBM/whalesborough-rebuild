# Landal Whalesborough Resort & Spa - Booking Platform Analysis

## Platform: landal.co.uk/parks/whalesborough-resort
## Rating: 4.5/5 (349 reviews)

## Accommodation Types on Landal
1. **2L2** - Arvor Wetroom Studio 1.0 (2-person apartment, Luxe)
2. **2LP** - Arvor Suite 1.0 (2-person apartment, Luxe)
3. Additional types available (cottages, spa lodges, etc.)

## Booking Widget Structure
- Date picker (Fixed date / Flexible date toggle)
- Travel group selector:
  - Adults (18+ years): 0-32
  - Children (3-17 years): 0-32
  - Babies (0-2 years): 0-32
  - Pets: Max 2
- "Show accommodations" CTA

## Key Selling Points (Landal listing)
- Rural idyll close to the beach
- Spa facility with pools
- Pet-friendly accommodation

## Image CDN
- Images served from: mss-p-014-delivery.stylelabs.cloud/api/public/content/
- Format: {contentId}-{ratio}?t=w{width}
- Example ratios: 3x1, 3x2
- Example widths: w350, w430, w1920

## Booking URL Structure
- /parks/whalesborough-resort/prices-and-availability
- /parks/whalesborough-resort/accommodation/{type-code}
- Filter params encoded in Base64 URL hash

## Landal Platform Features
- Multi-language (NL, BE, DE, AT, CH, GB)
- My bookings / My favourites / My details
- Login/Register
- Save/favourite functionality
- Park map
- Photo gallery

## Integration Considerations for New App
- Landal handles 80-91% of holiday bookings
- API integration or redirect needed
- New app should handle spa, restaurant, and sales bookings directly
- Holiday accommodation could link to Landal or run independently
