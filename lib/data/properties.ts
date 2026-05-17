export const properties = [
  { slug: "the-farmhouse", name: "The Farmhouse", image: "/images/cottages/the-farmhouse.webp", sleeps: 12, bedrooms: 5, price: 320, features: ["Log fire", "Games room", "Garden"], type: "cottage" },
  { slug: "eagles-nest", name: "Eagles Nest", image: "/images/cottages/eagles-nest.webp", sleeps: 6, bedrooms: 3, price: 195, features: ["Sea views", "Hot tub"], type: "cottage" },
  { slug: "gwari-spa-barn", name: "Gwari Spa Barn", image: "/images/cottages/gwari-spa-barn.webp", sleeps: 4, bedrooms: 2, price: 285, features: ["Hot tub", "Spa access"], type: "spa-lodge" },
  { slug: "trelowen", name: "Trelowen", image: "/images/cottages/trelowen.webp", sleeps: 4, bedrooms: 2, price: 165, features: ["Open fire", "Dog friendly"], type: "cottage" },
  { slug: "nettlecoombe", name: "Nettlecoombe", image: "/images/cottages/nettlecoombe.webp", sleeps: 6, bedrooms: 3, price: 185, features: ["Hot tub", "Garden"], type: "cottage" },
  { slug: "medlands", name: "Medlands", image: "/images/cottages/medlands.webp", sleeps: 4, bedrooms: 2, price: 155, features: ["Wood burner", "Dog friendly"], type: "cottage" },
  { slug: "barley-park", name: "Barley Park", image: "/images/cottages/barley-park.webp", sleeps: 5, bedrooms: 2, price: 175, features: ["Garden", "Parking"], type: "cottage" },
  { slug: "sand-parks", name: "Sand Parks", image: "/images/cottages/sand-parks.webp", sleeps: 4, bedrooms: 2, price: 160, features: ["Sea views"], type: "cottage" },
  { slug: "trevelyan", name: "Trevelyan", image: "/images/cottages/trevelyan.webp", sleeps: 4, bedrooms: 2, price: 170, features: ["Courtyard", "Dog friendly"], type: "cottage" },
  { slug: "moleyns", name: "Moleyns", image: "/images/cottages/moleyns.webp", sleeps: 4, bedrooms: 2, price: 155, features: ["Cosy", "Dog friendly"], type: "cottage" },
  { slug: "beachcombers", name: "Beachcombers", image: "/images/cottages/beachcombers.webp", sleeps: 6, bedrooms: 3, price: 190, features: ["Open plan", "Garden"], type: "cottage" },
  { slug: "arvor-suite", name: "Arvor Suite", image: "/images/arvor/arvor-exterior.webp", sleeps: 2, bedrooms: 1, price: 150, features: ["Balcony", "Breakfast included"], type: "suite" },
] as const;

export type Property = typeof properties[number];
