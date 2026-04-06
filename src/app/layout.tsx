import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Beast Philanthropy | Making Kindness Viral",
  description: "Beast Philanthropy is a 501(c)3 organization that exists to leverage the power of social media to raise funds and help charitable causes around the world. Founded by MrBeast.",
  keywords: "Beast Philanthropy, MrBeast, charity, donation, philanthropy, food bank, humanitarian",
  openGraph: {
    title: "Beast Philanthropy | Making Kindness Viral",
    description: "Beast Philanthropy is a 501(c)3 organization leveraging social media to raise funds and help charitable causes worldwide.",
    url: "https://www.beastphilanthropy.org",
    siteName: "Beast Philanthropy",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Patrick+Hand&family=Montserrat:wght@400;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
