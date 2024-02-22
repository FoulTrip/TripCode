import { NextResponse } from "next/server";
import { Octokit } from "octokit";

export interface requestGit {
  org: string;
  name: string;
  description: string;
  isPrivate: boolean;
  branches: string[];
}

export async function POST(req: Request) {
  try {
    const { org, name, description, isPrivate, branches }: requestGit =
      await req.json();

    const octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN,
    });

    const response = await octokit.request("POST /orgs/{org}/repos", {
      org: org,
      name: name,
      description: description,
      private: isPrivate,
      branches: branches,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });

    const cloneCommands = {
      clone: `git clone https://github.com/${response.data.owner.login}/${response.data.name}.git`,
      add: "git add .",
      commit: 'git commit -m "your commit message"',
      push: "git push origin master",
    };

    return NextResponse.json({
      repository: response.data,
      commands: cloneCommands,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      error: "Error al crear el repositorio",
    });
  }
}
