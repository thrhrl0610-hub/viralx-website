import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ViralX — Auckland Marketing Agency",
  description: "Under-25 creatives based in Parnell, Auckland. Video production, social media, paid ads, photography and more for hospitality and real estate brands.",
  keywords: "marketing agency auckland, video production auckland, social media agency nz, hospitality marketing, real estate content auckland, viralx",
  openGraph: {
    title: "ViralX — Auckland Marketing Agency",
    description: "Under-25 creatives based in Parnell, Auckland. Content that goes viral.",
    url: "https://viralx.co.nz",
    siteName: "ViralX",
    locale: "en_NZ",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}