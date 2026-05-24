import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/marketing/navbar";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Ü Drive PR — Drive Different",
  description:
    "Premium car rental in Puerto Rico. Skip the counter. Delivered to your door.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "https://udrivepr.com"
  ),
  openGraph: {
    title: "Ü Drive PR — Drive Different",
    description:
      "Premium car rental in Puerto Rico. Skip the counter. Delivered to your door.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}