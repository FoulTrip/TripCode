import { NextResponse } from "next/server";
import { Octokit } from "octokit";

interface requestGit {
  org: string;
  repo: string;
}

// export interface responseCommit {
//   sha: string;
//   commit: {
//     author: {
//       name: string;
//       date: string;
//     };
//     message: string;
//   };
//   date: string;
//   message: string;
// }

export interface responseCommit {
  sha: string;
  commit: {
    author: {
      name: string;
      email: string;
      date: string;
    };
    committer: {
      name: string;
      email: string;
      date: string;
    };
    message: string;
    tree: {
      sha: string;
      url: string;
    };
    url: string;
    comment_count: number;
    verification: {
      verified: boolean;
      reason: string;
      signature: string;
      payload: string;
    };
  };
  url: string;
  html_url: string;
  comments_url: string;
  author: {
    login: string;
    id: number;
    avatar_url: string;
    url: string;
    html_url: string;
  };
  committer: {
    login: string;
    id: number;
    avatar_url: string;
    url: string;
    html_url: string;
  };
  parents: any[];
}

export async function POST(req: Request) {
  try {
    const { org, repo }: requestGit = await req.json();

    console.log(org, repo);

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

    console.log(response);

    const detailCommit = response.data.map((commit: responseCommit) => ({
      sha: commit.sha,
      commit: {
        author: commit.commit.author,
        committer: commit.commit.committer,
        message: commit.commit.message,
        tree: commit.commit.tree,
        url: commit.commit.url,
        comment_count: commit.commit.comment_count,
        verification: commit.commit.verification,
      },
      url: commit.url,
      html_url: commit.html_url,
      comments_url: commit.comments_url,
      author: commit.author,
      committer: commit.committer,
      parents: commit.parents,
    }));

    return NextResponse.json(detailCommit);
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      error: "Error al obtener los commits del repositorio",
    });
  }
}
