"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { GlobalProvider } from "@/context/Session";
import { NotificationProvider } from "@/context/notifications";
import ProvidersLoading from "@/context/ProviderLoading";

const inter = Inter({ subsets: ["latin"] });

const metadata: Metadata = {
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
      <ProvidersLoading>
        <GlobalProvider>
          <NotificationProvider>
            <body className={inter.className}>{children}</body>
          </NotificationProvider>
        </GlobalProvider>
      </ProvidersLoading>
    </html>
  );
}
