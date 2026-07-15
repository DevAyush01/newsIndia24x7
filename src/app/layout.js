import LayoutContent from "@/components/LayoutContent";
import "./globals.css";
import { getHeaderCategories } from "../lib/wordpress";


export default async function RootLayout({ children }) {
  const categories = await getHeaderCategories();

  return (
    <html lang="hi">
      <body className="min-h-full flex flex-col">
        <LayoutContent categories={categories}>
          {children}
        </LayoutContent>
      </body>
    </html>
  );
}