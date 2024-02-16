"use client";

import React, { FormEvent, useState } from "react";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation";
import styles from "./signin.module.css";
import axios from "axios";

import { useGlobalContext } from "@/context/Session";
import { AuthSession } from "@/types/Schema";

function Signin() {
  const { user, setUserData } = useGlobalContext();
  const route = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  console.log(formData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/auth/signin", formData);
      const success = response.data.success;
      const data: AuthSession = response.data.data;

      if (success) {
        setUserData(data);
        toast.success("Usuario encontrado");
        setTimeout(() => {
          route.push("/");
        }, 3000);
      } else {
        toast.error("Credenciales invalidas");
      }
    } catch (error) {
      toast.error("Failed signin");
    }
  };

  if (user) {
    route.push("/");
  } else {
    return (
      <>
        <Toaster richColors />
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            className={styles.input}
            type="text"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={formData.email}
          />
          <input
            className={styles.input}
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={formData.password}
          />

          <div className={styles.btnSubmit}>
            <button type="submit">Ingresar</button>
          </div>
        </form>
      </>
    );
  }
}

export default Signin;
