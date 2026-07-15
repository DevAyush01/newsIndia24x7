"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

export default function LayoutContent({
  children,
  categories,
}) {
  const pathname = usePathname();

  const isSuperfast = pathname === "/superfast";

  return (
    <>
      {!isSuperfast && <Header categories={categories} />}

      <main className="flex-1">
        {children}
        {!isSuperfast && <BackToTop />}
      </main>

      {!isSuperfast && <Footer />}
    </>
  );
}