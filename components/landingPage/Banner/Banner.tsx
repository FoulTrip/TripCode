import Image from "next/image";
import React, { useState } from "react";
import styles from "./banner.module.css";
import Link from "next/link";
import { BsArrowRightShort } from "react-icons/bs";
import whiteScreen from "@/assets/mountBanner.png";

function BannerLanding() {
  return (
    <>
      <main className={styles.banner}>
        <div className={styles.centerBanner}>
          <div className={styles.partText}>
            <div className={styles.subPartText}>
              <p className={styles.subSloganBanner}>
                Solucion y desarrollo escalable para tu Empresa
              </p>

              <p className={styles.slogan}>
                ¿Listo para llevar a su empresa o startup al siguiente nivel?
                Nuestra experiencia en desarrollo de software es su ventaja
                competitiva.
              </p>
              <div className={styles.boxBtn}>
                <Link className={styles.btnVisit} href="/dashboard">
                  <p>Comenzar</p>
                  <div className={styles.boxIcon}>
                    <BsArrowRightShort />
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <div className={styles.partImg}>
            <Image
              src={whiteScreen}
              className={styles.imgMount}
              alt="WhiteScreen"
            />
          </div>
        </div>
      </main>
    </>
  );
}

export default BannerLanding;
