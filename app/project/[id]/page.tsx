"use client";

import { RepositoryDetail, ScalarProject } from "@/types/Schema";
import axios from "axios";
import React, { use, useEffect, useState } from "react";
import styles from "./page.module.css";
import ProgressBar from "@/components/project/progressBar/ProgressBar";
import Navbar from "@/components/navbar/NavBar";
import CopyableText from "@/components/handlers/CopyText";
import TasksBar from "@/components/project/progressBar/TasksProgress";

import { IoCheckmarkCircle, IoCog } from "react-icons/io5";

import tasks from "@/components/json/Tasks.json";
import { useGlobalContext } from "@/context/Session";
import PayComponent from "@/components/project/pay/PayComponent";

function ProjectPage({ params }: { params: { id: string } }) {
  const [projectDetails, setProjectDetails] = useState<ScalarProject | null>(
    null
  );
  const [nameRepo, setNameRepo] = useState("");
  const { user } = useGlobalContext();
  const [openTask, setOpenTasks] = useState(false);

  useEffect(() => {
    const getProject = async () => {
      const response = await axios.post("/api/proyects/proyect/id", {
        id: params.id,
      });
      const data: ScalarProject = response.data.data;
      setProjectDetails(data);
    };

    const getRepositoryName = async () => {
      const response = await axios.post("/api/proyects/repository/proyect", {
        id: params.id,
      });

      console.log(response);

      const data: RepositoryDetail = response.data.data[0];
      console.log(data.name);
      const name = data.name as string;
      setNameRepo(name);
    };

    getProject();
    getRepositoryName();
  }, [params.id]);

  const handleOpenTasks = () => {
    setOpenTasks(!openTask);
  };

  return (
    <>
      <Navbar />
      <div className={styles.containerProgress}>
        <ProgressBar nameRepo={nameRepo} />
        <div className={styles.boxInfoProgress}>
          <h1 className={styles.title}>Detalles</h1>
          <CopyableText
            label={"Status"}
            text={projectDetails?.status as string}
            copy={true}
          />
          <CopyableText
            label={"Name"}
            text={projectDetails?.name as string}
            copy={false}
          />

          <CopyableText
            label={"Description"}
            text={projectDetails?.description as string}
            copy={false}
          />

          <CopyableText
            label={"Dockerizado"}
            text={projectDetails?.dockerized == "true" ? "Si" : "No"}
            copy={false}
          />

          <p>
            Engeeners:
            {projectDetails?.engineers &&
              projectDetails?.engineers.map((developer) => (
                <p>Engeener: {developer}</p>
              ))}
            {projectDetails?.engineers.length == 0 ? " No asignados" : null}
          </p>
          <h1 className={styles.titleProg}>Progreso</h1>
          <TasksBar tasks={tasks} />

          {user?.id == projectDetails?.clientId || user?.role ? (
            <div className={styles.cardProgressTask}>
              <div className={styles.boxExpand}>
                <p className={styles.expand} onClick={handleOpenTasks}>
                  {openTask ? "Ocultar" : "Observar"} Tareas
                </p>
              </div>
              {openTask ? (
                <>
                  {tasks.map((task) => (
                    <div key={task.id} className={styles.boxTask}>
                      <p className={styles.nameProgresscard}>{task.name}</p>
                      <p>
                        {task.completed == true ? "Completado" : "En progreso"}
                      </p>
                      <div className={styles.statusProgresscard}>
                        {task.completed == true ? (
                          <IoCheckmarkCircle
                            className={styles.iconCheck}
                            size={20}
                          />
                        ) : (
                          <IoCog className={styles.iconCog} size={20} />
                        )}
                      </div>
                    </div>
                  ))}
                </>
              ) : null}
            </div>
          ) : null}

          <PayComponent userId={user?.id} />
        </div>
      </div>
    </>
  );
}

export default ProjectPage;
