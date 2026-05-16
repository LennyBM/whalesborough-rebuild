import type { MetadataRoute } from 'next'

const SITE_URL = 'https://www.whalesborough.co.uk'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date('2026-05-17')

  const routes: {
    path: string
    changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
    priority: number
  }[] = [
    // Homepage
    { path: '/', changeFrequency: 'weekly', priority: 1.0 },

    // Stay
    { path: '/stay', changeFrequency: 'weekly', priority: 0.9 },
    { path: '/stay/spa-lodges', changeFrequency: 'weekly', priority: 0.8 },
    { path: '/stay/cottages', changeFrequency: 'weekly', priority: 0.8 },
    { path: '/stay/arvor-suites', changeFrequency: 'weekly', priority: 0.8 },
    { path: '/stay/gallery', changeFrequency: 'monthly', priority: 0.6 },
    { path: '/stay/availability', changeFrequency: 'daily', priority: 0.8 },
    { path: '/stay/holiday-treats', changeFrequency: 'monthly', priority: 0.6 },
    { path: '/stay/dog-rules', changeFrequency: 'yearly', priority: 0.4 },
    { path: '/stay/faqs', changeFrequency: 'monthly', priority: 0.5 },
    { path: '/stay/booking', changeFrequency: 'weekly', priority: 0.7 },
    { path: '/stay/booking/dates', changeFrequency: 'weekly', priority: 0.6 },
    { path: '/stay/booking/select', changeFrequency: 'weekly', priority: 0.6 },
    { path: '/stay/booking/add-ons', changeFrequency: 'weekly', priority: 0.5 },
    { path: '/stay/booking/guest-details', changeFrequency: 'weekly', priority: 0.5 },
    { path: '/stay/booking/payment', changeFrequency: 'weekly', priority: 0.5 },

    // Spa
    { path: '/spa', changeFrequency: 'weekly', priority: 0.9 },
    { path: '/spa/treatments', changeFrequency: 'weekly', priority: 0.8 },
    { path: '/spa/spa-days', changeFrequency: 'weekly', priority: 0.8 },
    { path: '/spa/memberships', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/spa/gift-vouchers', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/spa/products', changeFrequency: 'monthly', priority: 0.6 },
    { path: '/spa/booking', changeFrequency: 'weekly', priority: 0.7 },
    { path: '/spa/faqs', changeFrequency: 'monthly', priority: 0.5 },

    // Dine
    { path: '/dine', changeFrequency: 'weekly', priority: 0.9 },
    { path: '/dine/menus', changeFrequency: 'weekly', priority: 0.8 },
    { path: '/dine/menus/breakfast', changeFrequency: 'weekly', priority: 0.7 },
    { path: '/dine/menus/lunch', changeFrequency: 'weekly', priority: 0.7 },
    { path: '/dine/lakeside-locals', changeFrequency: 'monthly', priority: 0.6 },
    { path: '/dine/private-dining', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/dine/events', changeFrequency: 'weekly', priority: 0.7 },
    { path: '/dine/reserve', changeFrequency: 'weekly', priority: 0.7 },
    { path: '/dine/faqs', changeFrequency: 'monthly', priority: 0.5 },

    // Estate
    { path: '/estate', changeFrequency: 'weekly', priority: 0.8 },
    { path: '/estate/activities', changeFrequency: 'weekly', priority: 0.7 },
    { path: '/estate/farm', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/estate/dog-friendly', changeFrequency: 'monthly', priority: 0.6 },
    { path: '/estate/local-area', changeFrequency: 'monthly', priority: 0.6 },
    { path: '/estate/map', changeFrequency: 'monthly', priority: 0.5 },

    // Own
    { path: '/own', changeFrequency: 'weekly', priority: 0.8 },
    { path: '/own/lodges/tevi', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/own/lodges/gwelva', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/own/lodges/trelowen', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/own/lodges/bespoke', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/own/why-own', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/own/process', changeFrequency: 'monthly', priority: 0.6 },
    { path: '/own/rental-income', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/own/costs', changeFrequency: 'monthly', priority: 0.6 },
    { path: '/own/faqs', changeFrequency: 'monthly', priority: 0.5 },
    { path: '/own/brochure', changeFrequency: 'monthly', priority: 0.6 },
    { path: '/own/viewing/book', changeFrequency: 'monthly', priority: 0.6 },
    { path: '/own/waitlist', changeFrequency: 'monthly', priority: 0.5 },

    // About
    { path: '/about', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/about/sustainability', changeFrequency: 'monthly', priority: 0.6 },
    { path: '/about/awards', changeFrequency: 'monthly', priority: 0.6 },

    // Contact
    { path: '/contact', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/contact/finding-us', changeFrequency: 'yearly', priority: 0.6 },

    // Journal
    { path: '/journal', changeFrequency: 'weekly', priority: 0.7 },

    // Legal
    { path: '/legal/privacy', changeFrequency: 'yearly', priority: 0.3 },
    { path: '/legal/terms-of-use', changeFrequency: 'yearly', priority: 0.3 },
    { path: '/legal/cookies', changeFrequency: 'yearly', priority: 0.3 },
    { path: '/legal/accessibility', changeFrequency: 'yearly', priority: 0.3 },
    { path: '/legal/complaints', changeFrequency: 'yearly', priority: 0.3 },
  ]

  return routes.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))
}
