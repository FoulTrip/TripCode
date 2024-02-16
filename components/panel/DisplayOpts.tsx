import { useBarOptsContext } from "@/context/DashBoardDev";
import React from "react";
import CurrentDev from "./current/Current";

function DisplayOpts() {
  const { optSelect } = useBarOptsContext();
  
  return (
    <>
    {optSelect == "current" ? <CurrentDev /> : null} 
    </>
  );
}

export default DisplayOpts;
