import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Veronie Halpin | VEA Creative Studios",
  description: "Selected websites I've worked on.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
