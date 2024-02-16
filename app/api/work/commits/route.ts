import { NextResponse } from "next/server";
import { Octokit } from "octokit";

interface requestGit {
  org: string;
  repo: string;
}

interface responseCommit {
  sha: string;
  commit: {
    author: {
      name: string;
    };
    message: string;
  };
  message: string;
}

export async function POST(req: Request) {
  try {
    const { org, repo }: requestGit = await req.json();

    const octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN,
    });

    const response = await octokit.request("GET /repos/{org}/{repo}/commits", {
      org: org,
      repo: repo,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });

    const detailCommit = response.data.map((commit: responseCommit) => ({
      sha: commit.sha,
      author: commit.commit.author,
      message: commit.commit.message,
    }));

    return NextResponse.json(detailCommit);
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      error: "Error al obtener los commits del repositorio",
    });
  }
}
