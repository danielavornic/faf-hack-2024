import React from "react";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import Head from "next/head";
import clsx from "clsx";
import { useRouter } from "next/router";
import { useComparison } from "@/lib/hooks";
import Link from "next/link";

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
  const router = useRouter();
  const isHome = router.pathname === "/";
  const isSurvey = router.pathname === "/survey";
  const { phones } = useComparison();

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Navbar />
      <main className={clsx("min-h-[calc(100vh-73px)]", className)}>{children}</main>
      {!!phones.length && !isSurvey && !isHome && (
        <Link
          href="/comparison"
          className="bg-brand-400 fixed bottom-4 right-20 rounded-l-[100px] rounded-tr-[100px] px-8 py-2 font-medium text-white shadow-md"
        >
          View comparison ({phones.length})
        </Link>
      )}
    </>
  );
};
