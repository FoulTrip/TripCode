"use client";

import { ScalarProject } from "@/types/Schema";
import axios from "axios";
import React, { useEffect, useState } from "react";

function ProjectPage({ params }: { params: { id: string } }) {
  const [projectDetails, setProjectDetails] = useState<ScalarProject | null>(
    null
  );

  const engeenerIndex = projectDetails?.engineers.length
  useEffect(() => {
    const getProject = async () => {
      const response = await axios.post("/api/proyects/proyect/id", {
        id: params.id,
      });
      const data: ScalarProject = response.data;
      setProjectDetails(data);
    };

    getProject();
  }, [params.id]);

  return (
    <>
      <div>
        <h3>Project Details</h3>
        <p>Status: {projectDetails?.status}</p>
        <p>id: {projectDetails?.id}</p>
        <p>Name: {projectDetails?.name}</p>
        <p>Description: {projectDetails?.description}</p>
        <p>Dockerizado: {projectDetails?.dockerized == "true" ? "Si" : "No"}</p>
        <p>ClienteId: {projectDetails?.clientId}</p>
        <p>
          Engeeners:
          {projectDetails?.engineers.map((developer) => (
            <p>Engeener: {developer}</p>
          ))}
        </p>
      </div>
    </>
  );
}

export default ProjectPage;
