"use client";

import { ScalarProject } from "@/types/Schema";
import axios from "axios";
import { useEffect, useState } from "react";
import CreateRepository from "@/components/project/repository/CreateRepository";
import styles from "./page.module.css";
import PayProjectSetting from "@/components/project/pay/page";

function SettingProject({ params }: { params: { id: string } }) {
  const [proyectDates, setProyectDates] = useState<ScalarProject | null>(null);

  useEffect(() => {
    const getProyect = async () => {
      const response = await axios.post("/api/proyects/proyect/id", {
        id: params.id,
      });
      const data: ScalarProject = response.data.data;
      setProyectDates(data);
    };

    const getPayProject = async () => {
      const response = await axios.post("/api/");
    };

    getProyect();
    getPayProject();
  }, [params.id]);

  return (
    <>
      {/* <p>Resources by {params.id}</p> */}

      <div className={styles.ContainerSettings}>
        <div className={styles.boxSetting}>
          <h1>{proyectDates?.name}</h1>
          <p>{proyectDates?.description}</p>
        </div>
        <div className={styles.boxSubConf}>
          <CreateRepository projectId={params.id} />
          <PayProjectSetting projectId={params.id} />
        </div>
      </div>
    </>
  );
}

export default SettingProject;
