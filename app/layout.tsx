import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const brandBody = DM_Sans({
  variable: "--font-brand-body",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Comp Prototype",
  description: "Landing page prototype for a modern company frontend built with Next.js.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${brandBody.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
