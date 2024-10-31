import "./globals.css";
import type { Metadata } from "next";
import { Outfit } from "next/font/google";

import Navbar from "@/components/modules/Navbar";

import Providers from "../../redux/Providers";
import Layout from "@/components/layout/Layout";

export const metadata: Metadata = {
  title: "Avo Burger",
  description: "Avo Burger is burger shop",
  icons: { icon: "./favicon/favicon.ico"}
};

const outfit = Outfit({
  weight: ["200", "300", "400", "500"],
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({children}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <div className="grid grid-cols-12">
          <div className="bg-white h-full fixed left-0 w-1/6 text-center">
            <Navbar />
          </div>

          <div className="min-h-dvh col-start-3 col-end-13 bg-neutral-100">
            <Providers>
              <Layout>
                {children}
              </Layout>
            </Providers>
          </div>
        </div>
      </body>
    </html>
  );
}
