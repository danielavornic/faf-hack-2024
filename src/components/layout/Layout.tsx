import React from "react";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import Head from "next/head";
import clsx from "clsx";
import { useRouter } from "next/router";
import { useAppDispatch, useComparison } from "@/lib/hooks";
import Link from "next/link";
import { Trash } from "lucide-react";
import toast from "react-hot-toast";
import { setComparison } from "@/lib/slices/comparisonSlice";

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
  const dispatch = useAppDispatch();

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Navbar />
      <main className={clsx("min-h-[calc(100vh-73px)]", className)}>{children}</main>
      {!!phones.length && !isSurvey && !isHome && (
        <button className="group fixed bottom-4 right-20 rounded-l-[100px] rounded-tr-[100px] bg-brand-400 px-8 py-2 font-medium text-white shadow-md">
          <span className="cursor-pointer" onClick={() => router.push("/comparison")}>
            View comparison ({phones.length})
          </span>
          <button
            className="absolute right-0 top-0 rounded-l-[100px] rounded-tr-[100px] bg-brand-400 px-8 py-2.5 font-medium text-white opacity-0 shadow-md group-hover:opacity-100"
            onClick={(e) => {
              e.preventDefault();
              dispatch(setComparison([]));
              toast.success("Phone removed from comparison");
            }}
          >
            <Trash size={20} />
          </button>
        </button>
      )}
    </>
  );
};
