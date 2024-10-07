import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import CommonHeader from "./CommonHeader";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Route 53 Manager",
  description: "AWS Route 53 Manager",
};

export default function RootLayout({ children }) {
  // const notificationQueue = useRef([]);
  return (
    <html lang="en">
      <body className={inter.className}>
        <CommonHeader>{children}</CommonHeader>
      </body>
    </html>
  );
}
