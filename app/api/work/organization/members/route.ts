import { name } from "@cloudinary/url-gen/actions/namedTransformation";
import { NextResponse } from "next/server";
import { Octokit } from "octokit";

interface requestGit {
  org: string;
}

interface User {
  login: string;
  id: number;
}

interface ApiResponse {
  status: Number;
  url: string;
  headers: Record<string, string>;
  data: {
    login: string;
    id: number;
  }[];
}

export async function POST(req: Request) {
  try {
    const { org }: requestGit = await req.json();

    const octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN,
    });

    const response = await octokit.request("GET /orgs/{org}/members", {
      org: org,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });

    const members = response.data.map((details: User) => ({
      login: details.login,
      id: details.id,
    }));

    return NextResponse.json(members);
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      error: "Error al obtener los miembros de la organización",
    });
  }
}
