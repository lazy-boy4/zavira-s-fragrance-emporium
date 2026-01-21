import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { FacebookPixel } from "@/components/FacebookPixel";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Zavira | Exquisite Fragrances",
  description: "Discover the essence of luxury with Zavira's curated collection of premium fragrances.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${playfair.variable} antialiased font-body bg-background text-foreground`}
      >
        <FacebookPixel />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
