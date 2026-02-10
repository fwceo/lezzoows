import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lezzoo — Bringing Your Time Back",
  description:
    "Kurdistan & Iraq's leading super app. Food, groceries, pharmacy, games, social, payments & more. The first Iraqi Y Combinator startup.",
  keywords: [
    "Lezzoo",
    "delivery",
    "Kurdistan",
    "Iraq",
    "Erbil",
    "super app",
    "YC",
    "food delivery",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Lezzoo",
    title: "Lezzoo — Bringing Your Time Back",
    description:
      "Kurdistan & Iraq's leading super app. 1M+ customers. Backed by Y Combinator.",
  },
  twitter: {
    card: "summary_large_image",
    site: "@lezzooeats",
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
