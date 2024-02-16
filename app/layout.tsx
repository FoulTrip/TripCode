import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { GlobalProvider } from "@/context/Session";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TripCode",
  description: "Customized Software",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <GlobalProvider>
        <body className={inter.className}>{children}</body>
      </GlobalProvider>
    </html>
  );
}
