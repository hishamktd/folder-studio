export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Folder Studio",
    "description": "Create beautiful custom folder icons with neon-styled designs. Upload images, customize colors, fonts, and export high-quality folder icons in ICO and PNG formats.",
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
      "name": "Folder Studio Team"
    },
    "featureList": [
      "Custom folder icon generation",
      "ICO and PNG export formats",
      "Multiple folder styles (Modern, Neon, Glass, Gradient)",
      "Color customization",
      "Font weight selection",
      "Image upload and clipboard paste",
      "Live preview",
      "Multiple export sizes (128x128 to 1024x1024)"
    ],
    "screenshot": "https://folder-studio.vercel.app/screenshot.png",
    "softwareVersion": "1.0.2",
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
