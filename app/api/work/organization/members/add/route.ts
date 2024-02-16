import { NextResponse } from "next/server";
import { Octokit } from "octokit";

interface requestGit {
  org: string;
  username: string;
}

export async function POST(req: Request) {
  try {
    const { org, username }: requestGit = await req.json();

    const octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN,
    });

    // Primero, obtenemos el ID del usuario
    const user = await octokit.request("GET /users/{username}", {
      username: username,
    });

    // Luego, usamos ese ID para invitar al usuario a la organización
    const response = await octokit.request("POST /orgs/{org}/invitations", {
      org: org,
      invitee_id: user.data.id,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });

    return NextResponse.json(response);
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      error: "Error al enviar la invitación al usuario",
    });
  }
}
  