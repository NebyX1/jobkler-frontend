import React from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import NavBar from "@/components/common/NavBar";
import Footer from "@/components/common/Footer";
import { HelmetProvider } from "react-helmet-async";
import styles from "@/styles/main.module.css";

const App = () => {

  return (
    <>
      <HelmetProvider>
        <NavBar />
        <main className={styles.mainContent}>
          <Outlet />
        </main>
        <Footer />
      </HelmetProvider>
      <Toaster />
    </>
  );
};

export default App;

