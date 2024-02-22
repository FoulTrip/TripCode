"use client";

import Navbar from "@/components/navbar/NavBar";
import Footer from "@/components/footer/footer";
import BannerLanding from "@/components/landingPage/Banner/Banner";
import ServicesLanding from "@/components/landingPage/services/Services";
import TecnologiesLanding from "@/components/landingPage/tecnologies/Tecnologies";

export default function Home() {
  return (
    <>
      <Navbar />
      <BannerLanding />
      <ServicesLanding />
      <TecnologiesLanding />
      <Footer />
    </>
  );
}
