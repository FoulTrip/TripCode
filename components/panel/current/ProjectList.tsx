import React from "react";
import { Project } from "@prisma/client";
import ProjectCard from "./ProjectCard";
import styles from "./current.module.css";

interface ProjectListProps {
  projects: Project[];
  clients: Record<string, any>;
  projectManagers: Record<string, any>;
  developers: Record<string, any>;
  userRole: string | undefined;
  router: any;
}

const ProjectList: React.FC<ProjectListProps> = ({
  projects,
  clients,
  projectManagers,
  developers,
  userRole,
  router,
}) => {
  return (
    <div className={styles.ComponentCurrent}>
      {projects?.length === 0 ? (
        <p>No hay proyectos disponibles para este ingeniero de software.</p>
      ) : projects ? (
        <>
          {projects?.map((project: Project) => (
            <ProjectCard
              key={project.id}
              project={project}
              clients={clients}
              projectManagers={projectManagers}
              developers={developers}
              userRole={userRole}
              router={router}
            />
          ))}
        </>
      ) : (
        "Sin proyectos"
      )}
    </div>
  );
};

export default ProjectList;
