// app/layout.js
import { Geist, Geist_Mono } from "next/font/google";
import { Noto_Sans } from "next/font/google";
import "./globals.css";
import { getHeaderCategories } from "../lib/wordpress";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const notoSans = Noto_Sans({
  subsets: ["latin"],
  variable: "--font-noto-sans",
  display: "swap",
});


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export const metadata = {
  title: "News India 24x7 - Breaking News in Hindi, हिंदी न्यूज़ , ताज़ा खबरें",
  description: "Latest Hindi News",
};

export default async function RootLayout({ children }) {
  // Fetch categories from WordPress
  const categories = await getHeaderCategories();

  return (
    <html
      lang="hi"
      className={`${notoSans.variable} h-full antialiased`}>

      <body className="min-h-full flex flex-col">
        <Header categories={categories} />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}