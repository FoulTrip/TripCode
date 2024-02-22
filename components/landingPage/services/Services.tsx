import React, { useState } from "react";
import styles from "./services.module.css";

import {
  FaPaintBrush,
  FaServer,
  FaHtml5,
  FaShoppingCart,
  FaRobot,
  FaBuilding,
  FaCloud,
  FaPlaneDeparture,
} from "react-icons/fa";

interface Service {
  icon: React.FC<{
    size: number;
    className: string;
    style?: React.CSSProperties;
  }>;
  title: string;
  content: string;
  color: string;
}

const iconColors = [
  "--color-icon-8",
  "--color-icon-2",
  "--color-icon-3",
  "--color-icon-4",
  "--color-icon-5",
  "--color-icon-6",
  "--color-icon-7",
  "--color-icon-1",
];

const serviceData: Service[] = [
  {
    icon: FaPaintBrush,
    title: "Desarrollo Frontend",
    content:
      "Permítanos llevar su negocio al siguiente nivel con nuestro servicio de desarrollo de marca...",
    color: iconColors[0],
  },
  {
    icon: FaServer,
    title: "Desarrollo Backend",
    content:
      "Nuestro equipo de desarrolladores altamente calificados está listo para crear soluciones de software y aplicaciones web personalizadas para su negocio...",
    color: iconColors[1],
  },
  {
    icon: FaHtml5,
    title: "Paginas web estaticas",
    content:
      "Nuestro equipo de desarrolladores altamente calificados está listo para crear soluciones de software y aplicaciones web personalizadas para su negocio. Utilizamos las últimas tecnologías y metodologías de desarrollo para garantizar que su aplicación sea escalable, fácil de usar y cumpla con sus necesidades comerciales específicas.",
    color: iconColors[2],
  },
  {
    icon: FaShoppingCart,
    title: "Comercio electronico",
    content:
      "Nuestro equipo de desarrolladores altamente calificados está listo para crear soluciones de software y aplicaciones web personalizadas para su negocio. Utilizamos las últimas tecnologías y metodologías de desarrollo para garantizar que su aplicación sea escalable, fácil de usar y cumpla con sus necesidades comerciales específicas.",
    color: iconColors[3],
  },
  {
    icon: FaRobot,
    title: "Automatizaciones",
    content:
      "Nuestro equipo de desarrolladores altamente calificados está listo para crear soluciones de software y aplicaciones web personalizadas para su negocio. Utilizamos las últimas tecnologías y metodologías de desarrollo para garantizar que su aplicación sea escalable, fácil de usar y cumpla con sus necesidades comerciales específicas.",
    color: iconColors[4],
  },
  {
    icon: FaBuilding,
    title: "Portales empresariales",
    content:
      "Nuestro equipo de desarrolladores altamente calificados está listo para crear soluciones de software y aplicaciones web personalizadas para su negocio. Utilizamos las últimas tecnologías y metodologías de desarrollo para garantizar que su aplicación sea escalable, fácil de usar y cumpla con sus necesidades comerciales específicas.",
    color: iconColors[5],
  },
  {
    icon: FaPlaneDeparture,
    title: "Landing Pages",
    content:
      "Nuestro equipo de desarrolladores altamente calificados está listo para crear soluciones de software y aplicaciones web personalizadas para su negocio. Utilizamos las últimas tecnologías y metodologías de desarrollo para garantizar que su aplicación sea escalable, fácil de usar y cumpla con sus necesidades comerciales específicas.",
    color: iconColors[6],
  },
  {
    icon: FaCloud,
    title: "Hospedaje de Aplicaciones web",
    content:
      "Nuestro equipo de desarrolladores altamente calificados está listo para crear soluciones de software y aplicaciones web personalizadas para su negocio. Utilizamos las últimas tecnologías y metodologías de desarrollo para garantizar que su aplicación sea escalable, fácil de usar y cumpla con sus necesidades comerciales específicas.",
    color: iconColors[7],
  },
];

function ServicesLanding() {
  const [selectedService, setSelectedService] = useState<number | null>(null);

  const handleChangeRead = (index: number) => {
    setSelectedService((prev) => (prev === index ? null : index));
  };
  return (
    <>
      <main className={styles.mainInfoServices}>
        <div className={styles.titleBox}>
          <h1 className={styles.titleServices}>
            Desarrollo robusto y escalable para tu empresa
          </h1>
        </div>
        <div className={styles.pasarellServices}>
          {serviceData.map((service, index) => (
            <div className={styles.boxservice} key={index}>
              <div className={styles.centerBoxServices}>
                <div className={styles.boxImageServ}>
                  {selectedService === index ? (
                    <p className={styles.explainService}>{service.content}</p>
                  ) : (
                    React.createElement(service.icon, {
                      size: 50,
                      className: styles.iconService,
                      style: { color: `var(${service.color})` },
                    })
                  )}
                </div>
                <p className={styles.titleServiceBox}>{service.title}</p>
                <div className={styles.contReadMore}>
                  <div
                    className={styles.btnReadMore}
                    onClick={() => handleChangeRead(index)}
                  >
                    {selectedService === index ? "Ocultar" : "Leer mas"}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

export default ServicesLanding;
