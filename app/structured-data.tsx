import { APP_METADATA } from "@/constants/defaults";

export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": APP_METADATA.NAME,
    "description": APP_METADATA.DESCRIPTION,
    "url": "https://folder-studio.vercel.app",
    "applicationCategory": "DesignApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "creator": {
      "@type": "Organization",
      "name": APP_METADATA.AUTHOR
    },
    "featureList": [
      "Custom folder icon generation",
      "ICO and PNG export formats",
      "20+ folder styles (Modern, Neon, Anime, Film, Glass, Gradient)",
      "Anime-themed styles (Sakura, Blue, Gold, Violet, Crimson, Emerald)",
      "Film-themed styles (Noir, Sepia, Hollywood, Retro, Purple, Gold)",
      "Color customization",
      "Font weight selection",
      "Image upload and clipboard paste",
      "Live preview",
      "Multiple export sizes (128x128 to 1024x1024)"
    ],
    "screenshot": "https://folder-studio.vercel.app/screenshot.png",
    "softwareVersion": APP_METADATA.VERSION,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "150"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
