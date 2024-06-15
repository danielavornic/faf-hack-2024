import React from "react";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import Head from "next/head";

interface LayoutProps {
  title: string;
}

export const Layout = ({ title, children }: React.PropsWithChildren<LayoutProps>) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Navbar />

      {children}
      <Footer />
    </>
  );
};
