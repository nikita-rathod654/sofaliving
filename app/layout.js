import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";



const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--serif",
});
const sans = Inter({ subsets: ["latin"], variable: "--sans" });

export const metadata = {
  title: "SOFALIVING — Bespoke Sofa Customiser",
  description: "Customise handcrafted sofas by model, colour, fabric and seating.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
