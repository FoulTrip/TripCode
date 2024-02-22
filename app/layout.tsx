"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { GlobalProvider } from "@/context/Session";
import { WebSocketProvider } from "next-ws/client";
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
        <WebSocketProvider url="ws://localhost:3000/api/ws">
          <GlobalProvider>
            <NotificationProvider>
              <body className={inter.className}>{children}</body>
            </NotificationProvider>
          </GlobalProvider>
        </WebSocketProvider>
      </ProvidersLoading>
    </html>
  );
}
