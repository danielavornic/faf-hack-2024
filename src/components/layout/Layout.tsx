import React from "react";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import Head from "next/head";

interface LayoutProps {
  title: string;
  className?: string;
}

export const Layout = ({ title, children, className }: React.PropsWithChildren<LayoutProps>) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Navbar />
      <main className={className}>{children}</main>
      <Footer />
    </>
  );
};
