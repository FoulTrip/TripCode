"use client";

import React from "react";
import { Project } from "@prisma/client";
import Avatar from "react-avatar";
import { TbEyeCode, TbPhotoCode, TbDoorExit } from "react-icons/tb";
import { MdOutlineCheck, MdOutlineClose, MdSettings } from "react-icons/md";
import styles from "./current.module.css";
import { useGlobalContext } from "@/context/Session";
import axios from "axios";
import { Toaster, toast } from "sonner";
import { useBarOptsContext } from "@/context/DashBoardDev";

interface ProjectCardProps {
  project: Project;
  clients: Record<string, any>;
  projectManagers: Record<string, any>;
  developers: Record<string, any>;
  userRole: string | undefined;
  router: any;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  clients,
  projectManagers,
  developers,
  userRole,
  router,
}) => {
  const clientData = clients[project.clientId];
  const projectManagerData =
    projectManagers[project.ProjectManagerId as string];
  const { user } = useGlobalContext();
  const { setEventState } = useBarOptsContext();

  const handleExitProject = async ({
    proyectId,
    softwareEngeenerId,
  }: {
    proyectId: string;
    softwareEngeenerId: string;
  }) => {
    const response = await axios.delete("/api/proyects/proyect/exit/dev");
  };

  const changeStateProject = async ({
    state,
    projectId,
  }: {
    state: "accept" | "decline";
    projectId: string;
  }) => {
    try {
      if (state) {
        if (state == "accept") {
          const response = await axios.put("/api/proyects/proyect/status", {
            id: projectId,
            status: "development",
          });

          const newProjectManager = await axios.post("/api/proyects/manager", {
            projectId: projectId,
            productManagerId: user?.id,
          });

          console.log(newProjectManager.data);

          let success: boolean | undefined;

          if (
            response.data.success &&
            newProjectManager.data.success === true
          ) {
            success = true;
          } else {
            success == false;
          }

          if (success == true) {
            toast.success("Proyecto Aceptado");
            setEventState(true);
          } else if (success == false) {
            throw new Error("Error al aceptar proyecto");
          }
        } else if (state == "decline") {
          const response = await axios.put("/api/proyects/proyect/status", {
            id: projectId,
            status: "decline",
          });

          const success = response.data.success;

          if (success == true) {
            toast.success("Proyecto Rechazado");
            setEventState(true);
          } else if (success == false) {
            throw new Error("Error al rechazar proyecto");
          }
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <>
      <Toaster richColors />
      <div key={project.id} className={styles.boxProject}>
        <div className={styles.managerAcceptProject}>
          <p className={styles.statusText}>Status: {project.status}</p>
          {user?.role == "projectManager" && project.status == "planning" ? (
            <div className={styles.StatusAccept}>
              <div
                className={styles.boxBtnAccept}
                onClick={() =>
                  changeStateProject({
                    state: "accept",
                    projectId: `${project.id}`,
                  })
                }
              >
                <p>Accept</p>
                <div className={styles.boxIconAccept}>
                  <MdOutlineCheck size={15} />
                </div>
              </div>

              <div
                className={styles.boxBtnDecline}
                onClick={() =>
                  changeStateProject({
                    state: "decline",
                    projectId: `${project.id}`,
                  })
                }
              >
                <p>Decline</p>
                <div className={styles.boxIconDecline}>
                  <MdOutlineClose size={15} />
                </div>
              </div>
            </div>
          ) : null}
        </div>
        <h1 className={styles.nameProject}>{project.name}</h1>
        <h3 className={styles.titleDescription}>Description:</h3>
        <p className={styles.textDescription}>{project.description}</p>
        <div className={styles.personalWork}>
          <div className={styles.blockPersonal}>
            <div className={styles.centerPers}>
              <h5>Client</h5>
              {clientData ? (
                <div className={styles.btnsContolls}>
                  <div className={styles.avatarClient}>
                    <Avatar src={clientData.avatar} round={true} size="20" />
                  </div>

                  <p className={styles.nameClient}>
                    {clientData.firstName} {clientData.lastName}
                  </p>
                </div>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </div>

          <div className={styles.blockPersonal}>
            <div className={styles.centerPers}>
              <h5>Project Manager</h5>
              {projectManagerData ? (
                <div className={styles.btnsContolls}>
                  <div className={styles.avatarClient}>
                    <Avatar
                      src={projectManagerData.avatar}
                      round={true}
                      size="20"
                    />
                  </div>

                  <p className={styles.nameClient}>
                    {projectManagerData.firstName} {projectManagerData.lastName}
                  </p>
                </div>
              ) : (
                <p>En Espera</p>
              )}
            </div>
          </div>
        </div>
        <div className={styles.blockPersonal}>
          <div className={styles.centerPers}>
            <h5>Developers</h5>
            <div className={styles.listDevs}>
              {project.engineers.map((developer) => (
                <div key={developer} className={styles.boxDeveloper}>
                  {developers[developer] ? (
                    <>
                      <div className={styles.avatarDeveloper}>
                        <Avatar
                          src={developers[developer].avatar}
                          round={true}
                          size="20"
                        />
                      </div>
                      <p className={styles.nameDeveloper}>
                        {developer == user?.id
                          ? "Tu"
                          : `${developers[developer].firstName} ${""} ${
                              developers[developer].lastName
                            }`}
                      </p>
                    </>
                  ) : (
                    <p>Loading...</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.supInteraction}>
          <div className={styles.btnsInteraction}>
            <div className={styles.btnProgress}>
              <div
                className={styles.centerBtnProgress}
                onClick={() => router.push(`/project/${project.id}`)}
              >
                <div className={styles.boxIconProgress}>
                  <TbEyeCode size={20} />
                </div>
                <p className={styles.textBtn}>Progreso</p>
              </div>
            </div>

            <div className={styles.btnProgress}>
              <div className={styles.centerBtnProgress}>
                <div className={styles.boxIconProgress}>
                  <TbPhotoCode size={20} />
                </div>
                <p className={styles.textBtn}>Recursos</p>
              </div>
            </div>

            {user?.role == "frontendEngineer" ||
            user?.role == "backendEngineer" ? (
              <div className={styles.btnExit}>
                <div
                  className={styles.centerBtnExit}
                  onClick={() =>
                    handleExitProject({
                      proyectId: `${project.id}`,
                      softwareEngeenerId: `${user?.id}`,
                    })
                  }
                >
                  <div className={styles.boxIconExit}>
                    <TbDoorExit size={18} />
                  </div>
                  <p className={styles.textBtn}>Abandonar</p>
                </div>
              </div>
            ) : null}

            {user?.role && project.status == "development" ? (
              <div className={styles.btnExit}>
                <div
                  className={styles.centerBtnExit}
                  onClick={() => router.push(`/project/${project.id}/settings`)}
                >
                  <div className={styles.boxIconExit}>
                    <MdSettings size={18} />
                  </div>
                  <p className={styles.textBtn}>Configurar</p>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectCard;
