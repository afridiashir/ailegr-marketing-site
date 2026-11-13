import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const description =
  "Ailegr is AI-powered accounting software for small and growing businesses: real double-entry bookkeeping with an AI assistant that answers questions about your finances and drafts the bookkeeping for you. Nothing posts without your approval.";

export const metadata: Metadata = {
  metadataBase: new URL("https://ailegr.com"),
  title: "Ailegr — Your books, done by AI. Approved by you.",
  description,
  openGraph: {
    title: "Ailegr — Your books, done by AI. Approved by you.",
    description,
    url: "https://ailegr.com",
    siteName: "Ailegr",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
