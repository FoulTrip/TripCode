import React, { FormEvent, useEffect, useState } from "react";
import styles from "./page.module.css";

import { RiSecurePaymentFill } from "react-icons/ri";
import { DetailPaymentProject } from "@/types/Schema";
import axios from "axios";

function PayProjectSetting(projectId: { projectId: string }) {
  const [data, setData] = useState<DetailPaymentProject>({
    name: "",
    description: "",
    price: 0,
    payProjectId: "60e0ae69-a3b2-4ad7-80c8-0f54d5d27f6f",
  });
  const [detailIdComplete, setDetailIdComplete] = useState(false);

  useEffect(() => {
    const getPayId = async () => {
      const response = await axios.post("", projectId);
    };
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const dataReq = {
      ...data,
      price: Number(data.price),
    };

    const response = await axios.post("/api/proyects/pay/details/add", dataReq);
    const dataRes: DetailPaymentProject = response.data;
    console.log(dataReq);

    if (dataRes) {
      setDetailIdComplete(true);
    }

    setInterval(() => {
      setDetailIdComplete(false);
    }, 5000);
  };

  return (
    <>
      <div className={styles.supBoxMoreDetails}>
        <div className={styles.boxMoreDetails}>
          <div className={styles.headerMoreDet}>
            <h3>Detalles del pago</h3>
            <p>Agrega todos los detalles a cobrar</p>
          </div>
          <div className={styles.btnMoreDetails}>
            <RiSecurePaymentFill className={styles.iconMore} size={30} />
          </div>
        </div>
        <div
          style={{
            padding: "18px 10px",
            borderRadius: "8px",
            marginBottom: "1em",
          }}
        >
          {}
          <div className={styles.boxDetails}>
            <div className={styles.normalCard}>
              <h3>Name</h3>
              <input
                type="text"
                name="name"
                value={data.name}
                onChange={handleChange}
              />
            </div>

            <div className={styles.normalCard}>
              <h3>Description</h3>
              <input
                type="text"
                value={data.description}
                name="description"
                onChange={handleChange}
              />
            </div>

            <div className={styles.normalCard}>
              <h3>Price</h3>
              <input
                type="number"
                value={data.price}
                name="price"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className={styles.centerBtn}>
          <button onClick={handleSubmit}>Guardar</button>
        </div>
      </div>
    </>
  );
}

export default PayProjectSetting;
