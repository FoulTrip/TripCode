"use client";

import Navbar from "@/components/navbar/NavBar";
import CurrentDev from "@/components/panel/current/Current";
import { BarOptsProvider } from "@/context/DashBoardDev";
import React, { useEffect } from "react";
import styles from "./page.module.css";
import { useNotifications } from "@/context/notifications";
import { Toaster, toast } from "sonner";
import { useWebSocket } from "next-ws/client";
import { useGlobalContext } from "@/context/Session";
import { useRouter } from "next/navigation";

function Dashboard() {
  const { notifications, addNotification } = useNotifications();
  const ws = useWebSocket();
  const { user } = useGlobalContext();
  const router = useRouter();

  useEffect(() => {
    if (ws) {
      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);

        if (data.clientId === user?.id) {
          addNotification({
            userId: data.userId,
            message: `El Project Manager ${data.projectManagerId} ha aceptado el proyecto ${data.projectId}`,
          });
        }
      };
    } else {
      console.log("ws no existe");
    }
  }, [ws, addNotification, user?.id]);

  useEffect(() => {
    notifications.forEach((notification) => {
      toast(notification.message);
    });
  }, [notifications]);

  if (!user?.role) {
    return (
      <>
        <Toaster richColors />
        <BarOptsProvider>
          <Navbar />
          <div className={styles.boxCurrent}>
            <CurrentDev />
          </div>
          <footer />
        </BarOptsProvider>
      </>
    );
  } else if (
    user.role == "notDefined" ||
    user.role == "backendEngineer" ||
    user.role == "frontendEngineer" ||
    user.role == "projectManager"
  ) {
    router.push("/developers/panel");
  }
}

export default Dashboard;
