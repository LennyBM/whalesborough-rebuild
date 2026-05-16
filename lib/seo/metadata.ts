import type { Metadata } from 'next'

const SITE_URL = 'https://www.whalesborough.co.uk'
const SITE_NAME = 'Whalesborough Farm Resort & Spa'
const DEFAULT_OG_IMAGE = '/images/og-default.jpg'

interface PageMetadataOptions {
  title: string
  description: string
  path: string
  image?: string
  noIndex?: boolean
}

export function createPageMetadata({
  title,
  description,
  path,
  image,
  noIndex = false,
}: PageMetadataOptions): Metadata {
  const canonicalUrl = `${SITE_URL}${path}`
  const ogImage = image || DEFAULT_OG_IMAGE
  const fullImageUrl = ogImage.startsWith('http') ? ogImage : `${SITE_URL}${ogImage}`

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      locale: 'en_GB',
      type: 'website',
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [fullImageUrl],
    },
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  }
}
