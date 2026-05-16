import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/account/', '/auth/'],
      },
    ],
    sitemap: 'https://www.whalesborough.co.uk/sitemap.xml',
  }
}
