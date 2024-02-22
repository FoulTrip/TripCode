import { useBarOptsContext } from "@/context/DashBoardDev";
import React from "react";
import CurrentDev from "./current/Current";
import styles from "./display.module.css";

function DisplayOpts() {
  const { optSelect } = useBarOptsContext();

  return (
    <>
      <div className={styles.displayComponent}>
        {optSelect == "current" ? <CurrentDev /> : null}
      </div>
    </>
  );
}

export default DisplayOpts;
