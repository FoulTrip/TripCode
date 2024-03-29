"use client"

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Project } from "@prisma/client";
import { useRouter } from "next/navigation";
import ProjectList from "./ProjectList";
import { ScalarClient } from "@/types/Schema";
import { useBarOptsContext } from "@/context/DashBoardDev";
import { useGlobalContext } from "@/context/Session";

interface ClientInfo {
  avatar: string;
  firstName: string;
  lastName: string;
}

function CurrentDev() {
  const router = useRouter();
  const { user } = useGlobalContext();
  const { eventState } = useBarOptsContext();
  const [projects, setProjects] = useState<Project[]>([]);
  const [clients, setClients] = useState<{ [key: string]: any }>({});
  const [developers, setDevelopers] = useState<{ [key: string]: any }>({});
  const [projectManagers, setProjectManagers] = useState<{
    [key: string]: any;
  }>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;

        if (
          user?.role === "backendEngineer" ||
          user?.role === "frontendEngineer" ||
          user?.role === "notDefined"
        ) {
          response = await axios.post("/api/proyects/dev/projectsbydev", {
            softwareEngineerId: user?.id,
          });
        } else if (user?.role === "projectManager") {
          response = await axios.get("/api/proyects/proyect/all");
        } else if (!user?.role) {
          response = await axios.post("/api/proyects/client/proyectbyclient", {
            id: user?.id,
          });
        }

        const data = response?.data?.data || [];
        setProjects(data);

        const clientIds: string[] = data.map(
          (project: Project) => project.clientId
        );

        const clientDataPromises = clientIds.map((clientId: string) =>
          getClient(clientId)
        );

        const clientsData = await Promise.all(clientDataPromises);

        const clientsObj = clientsData.reduce((obj, clientData, index) => {
          const clientInfo = clientData as ClientInfo;
          if (clientInfo) {
            obj[clientIds[index]] = clientInfo;
          }
          return obj;
        }, {} as Record<string, ClientInfo>);

        setClients(clientsObj);

        const developerIds = data.reduce(
          (acc: string[], project: Project) => [...acc, ...project.engineers],
          []
        );

        const developerDataPromises = developerIds.map((developerId: string) =>
          getDeveloper(developerId)
        );

        const developersData = await Promise.all(developerDataPromises);

        const developersObj = developersData.reduce(
          (obj, developerData, index) => {
            obj[developerIds[index]] = developerData;
            return obj;
          },
          {}
        );

        setDevelopers(developersObj);

        const projectManagerIds = data.map(
          (project: Project) => project.ProjectManagerId
        );

        const projectManagerDataPromises = projectManagerIds.map(
          (projectManagerId: string) => getProjectManager(projectManagerId)
        );

        const projectManagersData = await Promise.all(
          projectManagerDataPromises
        );

        const projectManagersObj = projectManagersData.reduce(
          (obj, projectManagerData, index) => {
            obj[projectManagerIds[index]] = projectManagerData;
            return obj;
          },
          {}
        );

        setProjectManagers(projectManagersObj);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchData();
  }, [user?.id, eventState]);

  const getClient = async (
    clientId: string
  ): Promise<ClientInfo | undefined> => {
    try {
      const response = await axios.post("/api/client/id", {
        id: clientId,
      });
      const clientData: ScalarClient = response?.data?.data;

      if (clientData) {
        const avatar = clientData.avatar || "";
        const firstName = clientData.firstname || "";
        const lastName = clientData.lastname || "";

        return { avatar, firstName, lastName };
      } else {
        return undefined;
      }
    } catch (error) {
      console.error("Error fetching client data:", error);
      return undefined;
    }
  };

  const getDeveloper = async (developerId: string) => {
    try {
      const response = await axios.post("/api/developer/id", {
        id: developerId,
      });
      const developerData: any = response?.data?.data;
      return {
        avatar: developerData.avatar,
        firstName: developerData.firstname,
        lastName: developerData.lastname,
      };
    } catch (error) {
      console.error("Error fetching developer data:", error);
    }
  };

  const getProjectManager = async (projectManagerId: string) => {
    try {
      const response = await axios.post("/api/manager/id", {
        id: projectManagerId,
      });
      const projectManagerData: any = response?.data?.data;
      return {
        avatar: projectManagerData.avatar,
        firstName: projectManagerData.firstname,
        lastName: projectManagerData.lastname,
      };
    } catch (error) {
      console.error("Error fetching project manager data:", error);
    }
  };

  return (
    <>
      <ProjectList
        projects={projects}
        clients={clients}
        projectManagers={projectManagers}
        developers={developers}
        userRole={user?.role}
        router={router}
      />
    </>
  );
}

export default CurrentDev;
