import { Inter } from "next/font/google";
import "./globals.css";
import CommonHeader from "./CommonHeader";
import SiteNotSupported from "./SiteNotSupported";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Route 53 Manager",
  description: "AWS Route 53 Manager",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SiteNotSupported />
        <div className="condition1">
          <CommonHeader>{children}</CommonHeader>
        </div>
      </body>
    </html>
  );
}
