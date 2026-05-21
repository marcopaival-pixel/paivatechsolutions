import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { getProductsDynamic } from "@/lib/db";
import { siteUrl } from "@/lib/site";
import { SITE_DESCRIPTION } from "@/lib/site/branding";

import { headers } from "next/headers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    default: "PaivaTech Solutions",
    template: "%s · PaivaTech",
  },
  description: SITE_DESCRIPTION,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "";
  const isAdmin = pathname.startsWith("/admin");
  const products = isAdmin ? [] : await getProductsDynamic();

  return (
    <html lang="pt-BR" className="dark" style={{ colorScheme: 'dark' }}>
      <body className={`${geistSans.variable} font-sans antialiased`}>
        {isAdmin ? (
          children
        ) : (
          <>
            <SiteHeader products={products} />
            <main className="mx-auto max-w-7xl px-4 py-16 sm:py-24">{children}</main>
            <SiteFooter products={products} />
          </>
        )}
      </body>
    </html>
  );
}
