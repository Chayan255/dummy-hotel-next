import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Next_Restaurant",
  description: "food hotel restaurant",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
     <body>
        <Navbar />            {/* ✅ Show Navbar on all pages */}
        <main>{children}</main>
        <Footer />            {/* ✅ Show Footer on all pages */}
      </body>
    </html>
  );
}
