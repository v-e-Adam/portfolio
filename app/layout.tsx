import type { Metadata } from "next";
import RotateNotice from "@/components/RotateNotice";
import "./globals.css";

export const metadata: Metadata = {
  title: "Veronie Halpin | VEA Creative Studios",
  description: "Selected websites I've worked on.",
  openGraph: {
    title: "Veronie Halpin | VEA Creative Studios",
    description: "A webpage to display selected projects by VEA Creative Studios",
    type: "website",
    siteName: "Veronie Halpin | VEA Creative Studios",
    images: [
      {
        url: `https://vea-creative-studios.vercel.app/social-share.jpg`,
        width: 1200,
        height: 630,
        alt: "VEA Creative Studios"
      }
    ],
    locale: "en_GB"
  },
  twitter: {
    title: "Veronie Halpin | VEA Creative Studios",
    description: "A webpage to display selected projects by VEA Creative Studios.",
    card: "summary_large_image",
    images: [
      {
        url: `https://vea-creative-studios.vercel.app/social-share.jpg`,
        alt: "VEA Creative Studios"
      }
    ]
  }
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children} <RotateNotice />
      </body>
    </html>
  );
}
