import React from "react";
import Link from "next/link";
import styles from "./navbar.module.css";
import Cookies from "js-cookie";
import { useGlobalContext } from "@/context/Session";
import UserOptions from "./UserOptions";
import { useRouter } from "next/navigation";

function OptsNav() {
  const { user } = useGlobalContext();
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("userData");
    window.location.reload();
    router.push("/");
  };
  return (
    <>
      {!user?.role ? (
        <Link href="/developers" className={styles.login}>
          Working with us
        </Link>
      ) : null}
      {!user?.role ? (
        <Link href="/dashboard" className={styles.login}>
          Dashboard
        </Link>
      ) : (
        <Link href="/developers/panel" className={styles.login}>
          Panel
        </Link>
      )}
      <UserOptions />
      {/* <div onClick={handleLogout} className={styles.login}>
        Logout
      </div> */}
    </>
  );
}

export default OptsNav;
