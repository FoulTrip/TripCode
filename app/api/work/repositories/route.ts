import { NextResponse } from "next/server";
import { Octokit } from "octokit";

interface requestGit {
  org: string;
}

interface Repository {
  id: number;
  name: string;
  private: boolean;
  owner: {
    login: string;
    id: number;
  };
  html_url: string;
  description: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
}

export async function POST(req: Request) {
  try {
    const { org }: requestGit = await req.json();

    const octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN,
    });

    const response = await octokit.request("GET /orgs/{org}/repos", {
      org: org,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });

    const repositories: Repository[] = response.data.map((repo) => ({
      id: repo.id,
      name: repo.name,
      private: repo.private,
      owner: {
        login: repo.owner.login,
        id: repo.owner.id,
      },
      html_url: repo.html_url,
      description: repo.description || "",
      language: repo.language || "Unknown",
      stargazers_count: repo.stargazers_count || 0,
      forks_count: repo.forks_count || 0,
    }));

    return NextResponse.json({ data: repositories });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      error: "Error al obtener la información de los repositorios",
    });
  }
}
