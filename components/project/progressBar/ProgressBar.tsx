import { responseCommit } from "@/app/api/work/commits/route";
import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./progress.module.css";
import Image from "next/image";
import Avatar from "react-avatar";
import FormatDate from "../tiempo/time";

function ProgressBar({ nameRepo }: { nameRepo: string }) {
  const [commits, setCommits] = useState<responseCommit[]>([]);
  const [avatarUrls, setAvatarUrls] = useState<string[]>([]);

  const handleSrc = async ({ username }: { username: string }) => {
    const response = await axios.post("/api/work/find/avatar_user", {
      username: username,
    });

    const src = response.data.src;

    return src;
  };

  console.log(nameRepo)

  useEffect(() => {
    const getCommits = async () => {
      try {
        const response = await axios.post("/api/work/commits", {
          org: "CodeTripCode",
          repo: `${nameRepo}`,
        });

        const responseData = response.data;
        console.log(responseData);

        setCommits(responseData);

        const avatarPromise = responseData.map(
          async (details: responseCommit) => {
            const avatar = await handleSrc({
              username: details.commit.author.name,
            });
            return String(avatar);
          }
        );
        const avatarUrls = await Promise.all(avatarPromise);
        setAvatarUrls(avatarUrls);
      } catch (error) {
        console.log(error);
        // if (error instanceof Error) {}
      }
    };

    getCommits();
  }, [nameRepo]);

  // console.log(commits);
  return (
    <div className={styles.cardChange}>
      <h1>Cambios</h1>
      {Array.isArray(commits) && commits.length > 0 ? (
        commits.map((details: responseCommit, index) => (
          <>
            {/* <div className={styles.barBack}></div> */}
            <div className={styles.supContainerCommit} key={details.sha}>
              <div className={styles.containerCommit}>
                <div className={styles.commitBox}>
                  <div className={styles.boxTitle}>
                    <h5 className={styles.title}>Descripcion del cambio</h5>
                  </div>

                  <p className={styles.descriptionCommit}>
                    {details.commit.message}
                  </p>

                  <div className={styles.boxTitle}>
                    <h5 className={styles.title}>Author</h5>
                  </div>

                  <div className={styles.authorCommit}>
                    <div className={styles.avatarGit}>
                      <Avatar
                        className={styles.avatarGit}
                        src={avatarUrls[index]}
                        round={true}
                        size={"20px"}
                        alt="avatar"
                      />
                    </div>
                    <p className={styles.nameAuthor}>
                      {details.commit.author.name}
                    </p>
                  </div>

                  <div className={styles.centerDate}>
                    <FormatDate dateString={details.commit.author.date} />
                  </div>
                </div>
              </div>
            </div>
          </>
        ))
      ) : (
        <p>No hay commits disponibles.</p>
      )}
    </div>
  );
}

export default ProgressBar;
