import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { siteUrl } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    default: "PaivaTech Solutions · Suite NexShape",
    template: "%s · NexShape",
  },
  description:
    "PaivaTech Solutions apresenta a suite NexShape: Saúde & Performance, OralByte, Chat e Credit.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark" style={{ colorScheme: 'dark' }}>
      <body className={`${geistSans.variable} font-sans antialiased`}>
        <SiteHeader />
        <main className="mx-auto max-w-5xl px-4 py-16 sm:py-24">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
