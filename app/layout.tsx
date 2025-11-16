import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StructuredData from "./structured-data";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://folder-studio.vercel.app'),
  title: {
    default: "Folder Studio - Custom Folder Icon Generator",
    template: "%s | Folder Studio"
  },
  description: "Create beautiful custom folder icons with neon-styled designs. Upload images, customize colors, fonts, and export high-quality folder icons in ICO and PNG formats. Free online tool for Windows, Mac, and Linux.",
  keywords: [
    "folder icon generator",
    "custom folder icons",
    "ico generator",
    "png folder icons",
    "folder customization",
    "icon maker",
    "neon folder icons",
    "folder design tool",
    "free icon generator",
    "windows folder icons",
    "mac folder icons",
    "linux folder icons",
    "folder icon creator",
    "icon design",
    "custom icons"
  ],
  authors: [{ name: "Folder Studio Team" }],
  creator: "Folder Studio Team",
  publisher: "Folder Studio",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://folder-studio.vercel.app",
    siteName: "Folder Studio",
    title: "Folder Studio - Custom Folder Icon Generator",
    description: "Create beautiful custom folder icons with neon-styled designs. Upload images, customize colors, and export in ICO/PNG formats.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Folder Studio - Custom Folder Icon Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Folder Studio - Custom Folder Icon Generator",
    description: "Create beautiful custom folder icons with neon-styled designs. Free online tool.",
    images: ["/og-image.png"],
    creator: "@folderstudio",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.json",
  category: "design",
  alternates: {
    canonical: "https://folder-studio.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <StructuredData />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
