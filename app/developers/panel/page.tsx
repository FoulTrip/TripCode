"use client";

import Navbar from "@/components/navbar/NavBar";
import { useGlobalContext } from "@/context/Session";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import styles from "./page.module.css";
import BarOpts from "@/components/panel/BarOpts";
import { BarOptsProvider } from "@/context/DashBoardDev";
import DisplayOpts from "@/components/panel/DisplayOpts";

function PanelDevelopers() {
  const { user, isLoading } = useGlobalContext();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && (!user || !user.role)) {
      router.push("/");
    }
  }, [user, router, isLoading]);

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (user?.role) {
    return (
      <>
        <Navbar />
        <BarOptsProvider>
          <BarOpts />
          <DisplayOpts />
        </BarOptsProvider>
      </>
    );
  }

  return null;
}

export default PanelDevelopers;
