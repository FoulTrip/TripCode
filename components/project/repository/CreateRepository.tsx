"use client"

import { RepositoryDetail } from "@/types/Schema";
import axios from "axios";
import React, { useState, ChangeEvent } from "react";
import { Toaster, toast } from "sonner";
import { IoLogoGithub } from "react-icons/io";
import styles from "./repository.module.css";
import { IoIosInformationCircle } from "react-icons/io";

interface RepoData {
  org: string;
  name: string;
  description: string;
  isPrivate: boolean;
  branches: string[];
}

interface commandGit {
  clone: string;
  add: string;
  commit: string;
  push: string;
}

const extractData = (data: any) => {
  return {
    name: data.name,
    description: data.description,
    url: data.html_url,
    private: data.private,
    branches: data.branches,
    // Agrega más propiedades según tus necesidades
  };
};

function CreateRepository({ projectId }: { projectId: string }) {
  const [repoData, setRepoData] = useState<RepoData>({
    org: "CodeTripCode",
    name: "",
    description: "",
    branches: ["main", "develop"],
    isPrivate: false,
  });

  const [commands, setCommands] = useState<commandGit | null>(null);

  const handleCreateRepository = async () => {
    try {
      const response = await axios.post(
        "/api/work/repositories/create",
        repoData
      );
      const result = extractData(response.data.repository);
      const commands = response.data.commands;
      // console.log(commands);
      setCommands(commands);
      // console.log(result);

      const reqBody: RepositoryDetail = {
        projectId,
        repositoryUrl: result.url,
        branch: ["main", "develop"],
        name: result.name,
        description: result.description,
      };

      console.log(reqBody);

      const newRepo = await axios.post("/api/proyects/repository/new", reqBody);

      const repoDates = newRepo.data;
      // console.log(repoDates);

      // console.log(projectId, repoDates.data.id)

      const updateProject = await axios.put(
        "/api/proyects/proyect/git/details",
        {
          projectId: projectId,
          repositoryId: repoDates.data.id,
        }
      );

      // console.log(updateProject.data);

      toast.success("Repository created successfully");
      console.log("Repository created successfully:", result);
    } catch (error) {
      console.error("Error creating repository:", error);
    }
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRepoData({ ...repoData, name: e.target.value });
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRepoData({ ...repoData, description: e.target.value });
  };

  const handlePrivateChange = () => {
    setRepoData({ ...repoData, isPrivate: !repoData.isPrivate });
  };

  return (
    <>
      <Toaster />

      <div className={styles.supBoxRepo}>
        <div>
          <div className={styles.titleCard}>
            <h3 className={styles.titleCreate}>
              Create Repository by {repoData.org}
            </h3>
            <div className={styles.iconCard}>
              <IoLogoGithub size={30} className={styles.iconGithub} />
            </div>
          </div>
          <p>
            Un repositorio contiene todos los archivos de tu proyecto, el
            historial de revisiones y las discusiones de los colaboradores.
          </p>
        </div>
        <div className={styles.boxDetails}>
          <div className={styles.normalCard}>
            <h3>Name</h3>
            <input
              type="text"
              value={repoData.name}
              onChange={handleNameChange}
            />
          </div>

          <div className={styles.normalCard}>
            <h3>Description</h3>
            <input
              type="text"
              value={repoData.description}
              onChange={handleDescriptionChange}
            />
          </div>

          <div className={styles.boxPrivateRepo}>
            <div className={styles.centerPrivateRepo}>
              <h3>Private</h3>
              <div className={styles.checkbox}>
                <input
                  className={styles.checkboxInp}
                  type="checkbox"
                  checked={repoData.isPrivate}
                  onChange={handlePrivateChange}
                />
              </div>
              <div className={styles.infoBox}>
                <IoIosInformationCircle />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.centerBtn}>
          <button onClick={handleCreateRepository}>Create Repository</button>
        </div>
      </div>
    </>
  );
}

export default CreateRepository;
