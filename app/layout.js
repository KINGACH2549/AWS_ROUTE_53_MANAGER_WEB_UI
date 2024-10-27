import "./globals.css";
import CommonHeader from "./CommonHeader";
import dynamic from "next/dynamic";

const SiteNotSupported = dynamic(() => import("./SiteNotSupported"), {
  ssr: false,
});

export const metadata = {
  title: "Route 53 Manager",
  description: "AWS Route 53 Manager",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SiteNotSupported />
        <div className="condition1">
          <CommonHeader>{children}</CommonHeader>
        </div>
      </body>
    </html>
  );
}
