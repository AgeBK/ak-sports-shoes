import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AK Shoe Store - Best shoes, Best Prices",
  description:
    "AK Shoe Store is Australia's preferred retailer of biggest sports brands at the best prices",
};

// TODO: semantics
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
