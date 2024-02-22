import { RepositoryDetail } from "@/types/Schema";
import axios from "axios";
import React, { useState, ChangeEvent } from "react";
import { Toaster, toast } from "sonner";
// import { requestGit } from "@/app/api/work/repositories/create/route";

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
      console.log(commands);
      setCommands(commands);
      console.log(result);

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
      console.log(repoDates);

      const updateProject = await axios.put(
        "/api/proyects/proyect/git/details",
        {
          projectId: projectId,
          repositoryId: repoDates.id,
        }
      );

      console.log(updateProject.data);

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
      <div>
        <h1>Create Repository</h1>
        <label>Organization: {repoData.org}</label>
        <label>
          Repository Name:
          <input
            type="text"
            value={repoData.name}
            onChange={handleNameChange}
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            value={repoData.description}
            onChange={handleDescriptionChange}
          />
        </label>
        <label>
          Private:
          <input
            type="checkbox"
            checked={repoData.isPrivate}
            onChange={handlePrivateChange}
          />
        </label>
        <button onClick={handleCreateRepository}>Create Repository</button>
      </div>
      <div>
        <p>Commands</p>
        {commands?.clone}
      </div>
    </>
  );
}

export default CreateRepository;
