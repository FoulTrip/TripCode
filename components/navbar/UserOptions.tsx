import React from "react";
import styles from "./useropt.module.css";
import Avatar from "react-avatar";
import { useGlobalContext } from "@/context/Session";
import { useRouter } from "next/navigation";

import { IoChevronDown } from "react-icons/io5";

function UserOptions() {
  const { user } = useGlobalContext();
  const router = useRouter();

  return (
    <>
      <div
        className={styles.containerUser}
        onClick={() => router.push(`/${user?.id}`)}
      >
        <div className={styles.boxImageUser}>
          <Avatar src={user?.avatar as string} size="30" round="100px" />
        </div>
        <p className={styles.username}>
          <IoChevronDown />
        </p>
      </div>
    </>
  );
}

export default UserOptions;
