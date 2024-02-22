import React, { useState } from "react";
import Image from "next/image";
import styles from "./tecnologies.module.css";

import iconDocker from "@/assets/ilustrations/docker.png";
import iconNextjs from "@/assets/ilustrations/nextjs.png";
import iconREST from "@/assets/ilustrations/rest-api.webp";
import iconMongo from "@/assets/ilustrations/mongodb.png";
import procces_dev_img from "@/assets/ilustrations/proccess_dev.png";
import BtnGetStart from "@/components/buttons/Get Start/getstart";

function TecnologiesLanding() {
  return (
    <>
      <main className={styles.tecnologies}>
        <h3 className={styles.titleServices}>
          Utilizando las mejores tecnologias del mercado
        </h3>
        <div className={styles.containerLengs}>
          <div className={styles.centerLengs}>
            <div className={styles.explainLeg}>
              <div className={styles.header}>
                <div className={styles.boxHeaderImg}>
                  <Image
                    className={styles.imgLogo}
                    src={iconDocker}
                    alt="iconDocker"
                  />
                </div>
                <p className={styles.nameLeng}>Docker</p>
              </div>
              <div className={styles.contentLeng}>
                <p>
                  Docker es una herramienta que permite a las empresas ejecutar
                  aplicaciones de manera eficiente y segura en cualquier
                  sistema, ahorrando tiempo y recursos.
                </p>
              </div>
            </div>

            <div className={styles.explainLeg}>
              <div className={styles.header}>
                <div className={styles.boxHeaderImg}>
                  <Image
                    className={styles.imgLogo}
                    src={iconNextjs}
                    alt="iconDocker"
                  />
                </div>
                <p className={styles.nameLeng}>Next</p>
              </div>
              <div className={styles.contentLeng}>
                <p>
                  Next.js es una herramienta que ayuda a su negocio a crear
                  sitios web rápidos y eficientes, mejorando la experiencia de
                  sus clientes en línea.
                </p>
              </div>
            </div>

            <div className={styles.explainLeg}>
              <div className={styles.header}>
                <div className={styles.boxHeaderImg}>
                  <Image
                    className={styles.imgLogo}
                    src={iconREST}
                    alt="iconDocker"
                  />
                </div>
                <p className={styles.nameLeng}>REST API</p>
              </div>
              <div className={styles.contentLeng}>
                <p>
                  GraphQL es una herramienta que permite a las empresas obtener
                  exactamente los datos que necesitan de sus sistemas, mejorando
                  la eficiencia y el rendimiento de sus aplicaciones web.
                </p>
              </div>
            </div>

            <div className={styles.explainLeg}>
              <div className={styles.header}>
                <div className={styles.boxHeaderImgDb}>
                  <Image
                    className={styles.imgLogodb}
                    src={iconMongo}
                    alt="iconDocker"
                  />
                </div>
                <p className={styles.nameLeng}>Base de datos</p>
              </div>
              <div className={styles.contentLeng}>
                <p>
                  Docker es una herramienta que permite a las empresas ejecutar
                  aplicaciones de manera eficiente y segura en cualquier
                  sistema, ahorrando tiempo y recursos.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.proyectsContainer}>
          <div className={styles.boxImageProyect}>
            <Image
              className={styles.imgProyect}
              src={procces_dev_img}
              alt="nav"
            />
          </div>
          <div className={styles.boxInfoPage}>
            <div className={styles.tileLiveProcess}>
              <p className={styles.titlerealTime}>
                Proceso de creacion en tiempo real
              </p>
            </div>
            <h4>
              Una vez requerida tu orden, ingresa a tu panel de control y
              observa cada proceso de creacion, desde la aceptacion hasta la
              culminacion
            </h4>
            <BtnGetStart text={"Comenzar"} />
          </div>
        </div>
      </main>
    </>
  );
}

export default TecnologiesLanding;
