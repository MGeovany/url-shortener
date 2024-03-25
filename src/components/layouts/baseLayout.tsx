import Head from "next/head";
import { ReactNode } from "react";
import { Navbar } from "../shared";
import { Footer } from "./footer";
import { BASE_URL_PRODUCTION } from "@/utils/constants";

interface BaseLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
}
const BaseLayout = ({
  children,
  title = "zoro.cut | URL Shortener",
  description = "Welcome to zoro.cut, the ultimate URL shortener that helps you shorten long URLs easily and efficiently.",
}: BaseLayoutProps) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width" />
        <meta
          property="twitter:image"
          content={`${BASE_URL_PRODUCTION}twitter-preview.webp`}
        />
        <meta
          property="twitter:card"
          content={`${BASE_URL_PRODUCTION}twitter-preview.webp`}
        />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
        <meta name="title" content={title} />
        <meta property="description" content={description} />
        <meta
          property="og:image"
          content={`${BASE_URL_PRODUCTION}twitter-preview.webp`}
        />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={BASE_URL_PRODUCTION} />

        <link rel="icon" href="/favicon.ico" />
        <title>{title}</title>
      </Head>
      <Navbar />
      <main className="bg-[url('/bg/8.avif')] md:bg-auto xs:bg-cover min-h-[calc(100vh_-_8rem)] flex justify-center items-center py-20">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default BaseLayout;
