"use client";

import React, { useState } from "react";
import Image from "next/image";
import styles from "./navbar.module.css";
import { useMediaQuery } from "@react-hook/media-query";

import { useGlobalContext } from "@/context/Session";

import iconLogo from "@/assets/logo-tripcode.png";
import { AiOutlineMenu } from "react-icons/ai";
import { HiChevronDown, HiChevronDoubleUp } from "react-icons/hi";
import Link from "next/link";
import OptsNav from "./optsNav";

// interface NavBarProps {
//   openModal: (content: React.ReactNode) => void;
// }

function Navbar() {
  const responsive = useMediaQuery("(min-width: 900px)");
  const [open, setOpen] = useState(false);
  const { user } = useGlobalContext();

  const handleOpenNav = () => {
    setOpen(!open);
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.logo}>
          <div className={styles.imageLogo}>
            <Image className={styles.iconLogo} src={iconLogo} alt="iconLogo" />
          </div>
          <Link href="/" className={styles.logoTitle}>
            TripCode
          </Link>
        </div>
        {responsive ? (
          <div className={styles.account}>
            <div className={styles.subAccount}>
              {user ? (
                <>{open == false ? <OptsNav /> : null}</>
              ) : (
                <>
                  <Link href="/account/signin" className={styles.login}>
                    Account
                  </Link>
                  <Link href="/account/signin" className={styles.login}>
                    Working with us
                  </Link>
                </>
              )}
            </div>
          </div>
        ) : (
          <div className={styles.menuIcon}>
            <div className={styles.menuImg}>
              <AiOutlineMenu
                onClick={handleOpenNav}
                className={styles.iconOpenNav}
              />
            </div>
          </div>
        )}
        {open ? (
          <>
            <div className={styles.boxNavResponsive}>
              {open == true ? <OptsNav /> : null}
            </div>
          </>
        ) : null}
      </header>
    </>
  );
}

export default Navbar;
