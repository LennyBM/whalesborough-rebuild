// ─── Types ───────────────────────────────────────────────────────────────────

export interface AccommodationProperty {
  name: string
  description: string
  url: string
  image?: string
  bedCount?: number
  occupancy?: number
  petsAllowed?: boolean
  amenities?: string[]
  priceRange?: string
}

export interface BreadcrumbItem {
  name: string
  url: string
}

export interface FaqItem {
  question: string
  answer: string
}

export interface EventInput {
  name: string
  description: string
  startDate: string
  endDate?: string
  url?: string
  image?: string
  location?: string
  offers?: {
    price: number
    currency?: string
    availability?: string
    url?: string
  }
}

// ─── Constants ───────────────────────────────────────────────────────────────

const SITE_URL = 'https://www.whalesborough.co.uk'

const ORG_ADDRESS = {
  '@type': 'PostalAddress' as const,
  streetAddress: 'Whalesborough Farm',
  addressLocality: 'Marhamchurch',
  addressRegion: 'Cornwall',
  postalCode: 'EX23 0JD',
  addressCountry: 'GB',
}

const ORG_GEO = {
  '@type': 'GeoCoordinates' as const,
  latitude: 50.8312,
  longitude: -4.5421,
}

// ─── Schema Generators ───────────────────────────────────────────────────────

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#organization`,
    name: 'Whalesborough Farm Resort & Spa',
    description:
      'A luxury 500-acre estate in North Cornwall offering self-catering lodges, spa, farm-to-table restaurant, and countryside activities.',
    url: SITE_URL,
    telephone: '+441288361940',
    email: 'hello@whalesborough.co.uk',
    address: ORG_ADDRESS,
    geo: ORG_GEO,
    image: `${SITE_URL}/images/og-default.jpg`,
    logo: `${SITE_URL}/images/logo.svg`,
    priceRange: '£££',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '08:00',
        closes: '22:00',
      },
    ],
    sameAs: [
      'https://www.instagram.com/whalesboroughfarm',
      'https://www.facebook.com/whalesboroughfarm',
      'https://www.youtube.com/@whalesboroughfarm',
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.5',
      bestRating: '5',
      worstRating: '1',
      ratingCount: '312',
    },
  }
}

export function accommodationSchema(property: AccommodationProperty) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    '@id': `${SITE_URL}/#lodging`,
    name: 'Whalesborough Farm Resort & Spa',
    url: SITE_URL,
    telephone: '+441288361940',
    address: ORG_ADDRESS,
    geo: ORG_GEO,
    makesOffer: {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Accommodation',
        name: property.name,
        description: property.description,
        url: `${SITE_URL}${property.url}`,
        ...(property.image && { image: property.image }),
        ...(property.bedCount && {
          bed: {
            '@type': 'BedDetails',
            numberOfBeds: property.bedCount,
          },
        }),
        ...(property.occupancy && {
          occupancy: {
            '@type': 'QuantitativeValue',
            value: property.occupancy,
          },
        }),
        ...(property.petsAllowed !== undefined && {
          petsAllowed: property.petsAllowed,
        }),
        ...(property.amenities && {
          amenityFeature: property.amenities.map((amenity) => ({
            '@type': 'LocationFeatureSpecification',
            name: amenity,
            value: true,
          })),
        }),
      },
      ...(property.priceRange && { priceSpecification: { '@type': 'PriceSpecification', priceCurrency: 'GBP' } }),
    },
  }
}

export function restaurantSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    '@id': `${SITE_URL}/dine/#restaurant`,
    name: 'The Weir',
    description:
      'Farm-to-table dining at Whalesborough, showcasing seasonal Cornish produce in a lakeside setting.',
    url: `${SITE_URL}/dine`,
    telephone: '+441288361940',
    address: ORG_ADDRESS,
    geo: ORG_GEO,
    servesCuisine: ['British', 'Farm-to-table'],
    priceRange: '££',
    menu: `${SITE_URL}/dine/menus`,
    acceptsReservations: true,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '08:00',
        closes: '21:00',
      },
    ],
    image: `${SITE_URL}/images/restaurant-og.jpg`,
    parentOrganization: {
      '@id': `${SITE_URL}/#organization`,
    },
  }
}

export function spaSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'HealthAndBeautyBusiness',
    '@id': `${SITE_URL}/spa/#spa`,
    name: 'The W Club',
    description:
      'Luxury spa at Whalesborough Farm offering treatments, spa days, memberships, and wellness experiences in the Cornish countryside.',
    url: `${SITE_URL}/spa`,
    telephone: '+441288361940',
    address: ORG_ADDRESS,
    geo: ORG_GEO,
    priceRange: '£££',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '09:00',
        closes: '20:00',
      },
    ],
    image: `${SITE_URL}/images/spa-og.jpg`,
    parentOrganization: {
      '@id': `${SITE_URL}/#organization`,
    },
  }
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`,
    })),
  }
}

export function faqSchema(items: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}

export function eventSchema(event: EventInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.name,
    description: event.description,
    startDate: event.startDate,
    ...(event.endDate && { endDate: event.endDate }),
    ...(event.url && { url: event.url }),
    ...(event.image && { image: event.image }),
    location: {
      '@type': 'Place',
      name: event.location || 'Whalesborough Farm Resort & Spa',
      address: ORG_ADDRESS,
      geo: ORG_GEO,
    },
    organizer: {
      '@type': 'Organization',
      name: 'Whalesborough Farm Resort & Spa',
      url: SITE_URL,
    },
    ...(event.offers && {
      offers: {
        '@type': 'Offer',
        price: event.offers.price,
        priceCurrency: event.offers.currency || 'GBP',
        availability: event.offers.availability || 'https://schema.org/InStock',
        ...(event.offers.url && { url: event.offers.url }),
      },
    }),
  }
}
