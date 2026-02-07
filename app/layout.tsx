import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { WebsiteProtection } from "@/components/WebsiteProtection";
import "./globals.css";

// Premium Typography Configuration
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

// SEO & OpenGraph Metadata - Enterprise Grade
export const metadata: Metadata = {
  title: "عقارات فاخرة في دبي | عرض التحول الرقمي Next.js",
  description:
    "اختبر مستقبل الاستثمار العقاري. منصة Next.js عالية الأداء تعرض أفخم العقارات في دبي مع سرعة وتحسين محركات البحث على مستوى المؤسسات.",
  keywords: [
    "عقارات دبي",
    "عقارات فاخرة",
    "Next.js",
    "التحول الرقمي",
    "أصحاب الثروات العالية",
    "عقارات استثمارية",
  ],
  authors: [{ name: "محمد قدماني" }],
  creator: "محمد قدماني للعقارات",
  publisher: "محمد قدماني",

  // OpenGraph for Social Sharing
  openGraph: {
    type: "website",
    locale: "ar_AE",
    url: "https://luxury-real-estate-demo.vercel.app",
    siteName: "عقارات فاخرة في دبي",
    title: "اختبر مستقبل الاستثمار العقاري",
    description:
      "حيث تلتقي الفخامة بالسرعة. مدعوم بهندسة Next.js. اكتشف أفخم العقارات في دبي.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "عقارات فاخرة في دبي - التحول الرقمي",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "عقارات فاخرة في دبي | منصة Next.js",
    description: "اختبر مستقبل الاستثمار العقاري في دبي",
    images: ["/og-image.jpg"],
  },

  // Technical SEO
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Verification
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // JSON-LD Schema for Real Estate Agent (Google Rich Results)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "محمد قدماني للعقارات",
    description:
      "وكالة عقارات فاخرة متخصصة في خدمات العملاء من أصحاب الثروات العالية في دبي",
    url: "https://luxury-real-estate-demo.vercel.app",
    telephone: "+971-56-666-5560",
    address: {
      "@type": "PostalAddress",
      addressLocality: "دبي",
      addressCountry: "AE",
    },
    areaServed: {
      "@type": "City",
      name: "دبي",
    },
    priceRange: "$$$",
    knowsAbout: [
      "العقارات الفاخرة",
      "العقارات الاستثمارية",
      "التطويرات العالية",
      "العقارات على الواجهة البحرية",
    ],
  };

  return (
    <html lang="ar" dir="rtl" className="dark">
      <head>
        {/* JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${playfair.variable} ${inter.variable} antialiased font-inter`}
      >
        <WebsiteProtection />
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
