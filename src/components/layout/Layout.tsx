import React from "react";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import Head from "next/head";
import clsx from "clsx";

interface LayoutProps {
  title: string;
  className?: string;
  hideFooter?: boolean;
}

export const Layout = ({
  title,
  children,
  className,
  hideFooter
}: React.PropsWithChildren<LayoutProps>) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Navbar />
      <main className={clsx("min-h-[calc(100vh-73px)]", className)}>{children}</main>
      {!hideFooter && <Footer />}
    </>
  );
};
