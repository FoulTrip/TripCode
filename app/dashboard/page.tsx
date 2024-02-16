"use client";

import Navbar from "@/components/navbar/NavBar";
import CurrentDev from "@/components/panel/current/Current";
import React from "react";

function Dashboard() {
  return (
    <>
      <Navbar />
      <CurrentDev />
      <footer />
    </>
  );
}

export default Dashboard;
