import { Inter, Bricolage_Grotesque, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["400", "500"],
});

export const metadata = {
  title: "Wonkie — Handmade Ice Cream in Penang",
  description:
    "Wonkie is a made-from-scratch ice cream shop in George Town, Penang. Specialising in boozy, bold scoops with a touch of whimsy. Weddings, events & walk-ins.",
  keywords: [
    "ice cream Penang",
    "alcoholic ice cream",
    "boozy ice cream George Town",
    "wedding ice cream catering Penang",
    "ice cream Penang delivery",
    "handmade ice cream Malaysia",
    "Wonkie ice cream",
    "event catering Penang",
    "ice cream cart wedding",
  ],
  openGraph: {
    title: "Wonkie — Handmade Ice Cream in Penang",
    description:
      "Bold, boozy, made-from-scratch ice cream in George Town, Penang. Weddings, events & walk-ins welcome.",
    images: ["/images/WONKIE_LOGO_1.png"],
    type: "website",
    locale: "en_MY",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wonkie — Handmade Ice Cream in Penang",
    description:
      "Bold, boozy, made-from-scratch ice cream in George Town, Penang.",
    images: ["/images/WONKIE_LOGO_1.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/favicon/genfavicon-32.png", sizes: "32x32" },
      { url: "/favicon/genfavicon-16.png", sizes: "16x16" },
    ],
    apple: [
      { url: "/favicon/apple-touch-icon-57x57.png", sizes: "57x57" },
      { url: "/favicon/apple-touch-icon-114x114.png", sizes: "114x114" },
      { url: "/favicon/apple-touch-icon-120x120.png", sizes: "120x120" },
      { url: "/favicon/apple-touch-icon-180x180.png", sizes: "180x180" },
    ],
  },
  manifest: "/favicon/site.webmanifest",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${bricolage.variable} ${jetbrains.variable}`}
    >
      <head>
        <meta name="theme-color" content="#ff7bb6" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "IceCreamShop",
              name: "Wonkie Ice Cream",
              description:
                "Handmade, boozy ice cream in George Town, Penang. Weddings, events & walk-ins.",
              telephone: "+60164897728",
              email: "Hello.wonkie@gmail.com",
              address: {
                "@type": "PostalAddress",
                streetAddress: "21D, Lebuh Pantai",
                addressLocality: "George Town",
                addressRegion: "Penang",
                postalCode: "10300",
                addressCountry: "MY",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 5.4164,
                longitude: 100.3381,
              },
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: [
                    "Sunday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                  ],
                  opens: "13:00",
                  closes: "22:00",
                },
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Friday", "Saturday"],
                  opens: "13:00",
                  closes: "23:00",
                },
              ],
              servesCuisine: "Ice Cream",
              priceRange: "$$",
              image: "/images/WONKIE_LOGO_1.png",
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
