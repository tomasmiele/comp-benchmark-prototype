import type { Metadata } from "next";
import { Fraunces, Space_Grotesk } from "next/font/google";
import "./globals.css";

const brandHeading = Fraunces({
  variable: "--font-brand-heading",
  subsets: ["latin"],
});

const brandBody = Space_Grotesk({
  variable: "--font-brand-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Compass Labs | Frontend Prototype",
  description: "Landing page prototype for a modern company frontend built with Next.js.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${brandHeading.variable} ${brandBody.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
