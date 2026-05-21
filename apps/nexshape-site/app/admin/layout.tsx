import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Painel Administrativo · PaivaTech",
  description: "Painel interno de marketing e leads da PaivaTech Solutions.",
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
