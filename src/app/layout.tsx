import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { SITE_URL } from "@/content/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

// ~60 characters, primary keyword first.
const seoTitle = "Ailegr: AI Accounting & Bookkeeping Software for Small Business";
// ~155 characters, written for the search result snippet.
const seoDescription =
  "AI accounting software that does your bookkeeping and waits for your approval. Invoices, bills, bank reconciliation and reports from $19.99/month.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: seoTitle,
    template: "%s | Ailegr",
  },
  description: seoDescription,
  applicationName: "Ailegr",
  keywords: [
    "AI accounting software",
    "AI bookkeeping",
    "small business accounting software",
    "bookkeeping software",
    "double-entry accounting",
    "invoicing software",
    "bank reconciliation",
    "receipt scanning",
    "accounting software for accountants",
  ],
  category: "business",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Ailegr",
    locale: "en_US",
    title: "Ailegr — Your books, done by AI. Approved by you.",
    description:
      "Accounting software with an AI accountant built in. Every AI feature in every plan, from $19.99/month.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ailegr — Your books, done by AI. Approved by you.",
    description:
      "Accounting software with an AI accountant built in. Every AI feature in every plan, from $19.99/month.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#059669",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
