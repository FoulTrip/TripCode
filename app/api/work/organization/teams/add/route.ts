import { NextResponse } from "next/server";
import { Octokit } from "octokit";

interface requestGit {
  org: string;
  team_slug: string;
  username: string;
}

export async function POST(req: Request) {
  try {
    const { org, team_slug, username }: requestGit = await req.json();

    const octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN,
    });

    const response = await octokit.request(
      "PUT /orgs/{org}/teams/{team_slug}/memberships/{username}",
      {
        org: org,
        team_slug: team_slug,
        username: username,
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );

    return NextResponse.json(response);
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      error: "Error al agregar el miembro al equipo en la organización",
    });
  }
}
