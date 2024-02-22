import React, { useEffect, useState } from "react";
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Use Promise.all to wait for all promises to resolve
    Promise.all(Object.values(clients))
      .then(() => Promise.all(Object.values(developers)))
      .then(() => Promise.all(Object.values(projectManagers)))
      .then(() => setLoading(false))
      .catch((error) => console.error("Error updating state:", error));
  }, [clients, developers, projectManagers]);

  if (loading) {
    return <p>Loading...</p>;
  }

  const isSingleProject = projects.length === 1;

  return (
    <div
      className={`${styles.ComponentCurrent} ${
        isSingleProject ? styles.singleProject : ""
      }`}
    >
      {projects?.length === 0 ? (
        <p>No hay proyectos disponibles para este ingeniero de software.</p>
      ) : projects ? (
        <React.Fragment>
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
        </React.Fragment>
      ) : (
        "Sin proyectos"
      )}
    </div>
  );
};

export default ProjectList;
