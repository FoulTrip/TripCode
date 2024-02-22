"use client";

import { ScalarProject } from "@/types/Schema";
import axios from "axios";
import { useEffect, useState } from "react";
import CreateRepository from "@/components/project/repository/CreateRepository";
import styles from "./page.module.css";

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

    getProyect();
  }, [params.id]);

  return (
    <>
      <p>Resources by {params.id}</p>

      <div className={styles.ContainerSettings}>
        <div className={styles.boxSetting}></div>
        <h1>{proyectDates?.name}</h1>
        <p>{proyectDates?.description}</p>

        <CreateRepository projectId={params.id} />
      </div>
    </>
  );
}

export default SettingProject;
