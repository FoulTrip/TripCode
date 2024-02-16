// BarOpts.jsx
import React from "react";
import styles from "./barOpts.module.css";
import Avatar from "react-avatar";

import { FaGithub, FaCodeCommit } from "react-icons/fa6";
import {
  MdOutlineWorkOutline,
  MdWorkHistory,
  MdOutlineWork,
  MdOutlineGroups,
} from "react-icons/md";

import { useGlobalContext } from "@/context/Session";
import { useBarOptsContext } from "@/context/DashBoardDev";

function BarOpts() {
  const { user, isLoading } = useGlobalContext();
  const { optSelect, setOptSelect } = useBarOptsContext();

  const handleOptSelect = (opt: string) => {
    console.log(opt);
    setOptSelect(opt);
  };

  return (
    <div className={styles.BarInfoDev}>
      
      <div className={styles.infoDevBox}>
        <div
          className={
            optSelect == "current"
              ? styles.centerInfoDevActive
              : styles.centerInfoDev
          }
          onClick={() => handleOptSelect("current")}
        >
          <div className={styles.boxAvatar}>
            <MdOutlineWork size={20} />
          </div>
          <p className={styles.textRole}>Current</p>
        </div>
      </div>

      <div className={styles.infoDevBox}>
        <div
          className={
            optSelect == "history"
              ? styles.centerInfoDevActive
              : styles.centerInfoDev
          }
          onClick={() => handleOptSelect("history")}
        >
          <div className={styles.boxAvatar}>
            <MdWorkHistory size={20} />
          </div>
          <p className={styles.textRole}>History</p>
        </div>
      </div>

      <div className={styles.infoDevBox}>
        <div
          className={
            optSelect == "role"
              ? styles.centerInfoDevActive
              : styles.centerInfoDev
          }
          onClick={() => handleOptSelect("role")}
        >
          <div className={styles.boxAvatar}>
            <Avatar src={user?.avatar as string} round={true} size="25" />
          </div>
          <p className={styles.textRole}>
            {user?.role == "projectManager" ? "Project Manager" : null}
            {user?.role == "frontendEngineer" ? "Frontend Engineer" : null}
            {user?.role == "backendEngineer" ? "Backend Engineer" : null}
            {user?.role == "notDefined" ? "Sin Definir" : null}
          </p>
        </div>
      </div>

      <div className={styles.infoDevBox}>
        <div
          className={styles.centerInfoDev}
          onClick={() => handleOptSelect("github")}
        >
          <div className={styles.boxAvatar}>
            <FaGithub size={20} />
          </div>
          <p className={styles.textRole}>FoulTrip</p>
        </div>
      </div>

      <div className={styles.infoDevBox}>
        <div
          className={styles.centerInfoDev}
          onClick={() => handleOptSelect("commits")}
        >
          <div className={styles.boxAvatar}>
            <FaCodeCommit size={20} />
          </div>
          <p className={styles.textRole}>Commits: </p>
          <p>{0}</p>
        </div>
      </div>

      <div className={styles.infoDevBox}>
        <div
          className={styles.centerInfoDev}
          onClick={() => handleOptSelect("peers")}
        >
          <div className={styles.boxAvatar}>
            <MdOutlineGroups size={20} />
          </div>
          <p className={styles.textRole}>Peers</p>
        </div>
      </div>
    </div>
  );
}

export default BarOpts;
