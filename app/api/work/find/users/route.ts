import { NextResponse } from "next/server";
import { Octokit } from "octokit";

interface requestGit {
  username: string;
}

export async function POST(req: Request) {
  try {
    const { username }: requestGit = await req.json();

    const octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN,
    });

    const response = await octokit.request("GET /users/{username}", {
      username: username,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });

    return NextResponse.json(response );
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      error: "Error al obtener la información del usuario",
    });
  }
}
