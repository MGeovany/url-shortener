import Head from "next/head";
import { ReactNode } from "react";
import { Navbar } from "../shared";
import { Footer } from "./footer";

interface BaseLayoutProps {
  children: ReactNode;
  title?: string;
}
const BaseLayout = ({
  children,
  title = "zoro.cut | URL Shortener",
}: BaseLayoutProps) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width" />
        <link rel="icon" href="/favicon.ico" />
        <title>{title}</title>
        <meta name="title" content={title} />
      </Head>
      <Navbar />
      <main className="bg-[url('/bg/8.png')] md:bg-auto xs:bg-cover pb-20 h-screen">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default BaseLayout;
