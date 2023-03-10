import React, { useRef, useState } from "react";
import { Navbar, CopyButton } from "@/components/shared";
import { BASE_URL, BASE_URL_PRODUCTION } from "@/utils/constants";
import BaseLayout from "@/components/layouts/baseLayout";
import { getRecentUrls, getUserByEmail } from "lib/db";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";

import getDomainNameFromUrl from "@/utils/mainNameFromUrl";
import { RecentUrlsTable } from "@/components/shared/recentUrlsTable";
import { Session } from "next-auth";
import { useSignInModal } from "../components/layouts/signInModal";
import { Footer } from "@/components/layouts/footer";
import { Plus } from "lucide-react";

interface Shortener {
  shortUrl: string;
  url: string;
}
interface Link {
  id: number;
  userId: number;
  url: string;
  shortUrl: string;
  createdAt: string;
}

interface User {
  email: string;
  image: string;
  name: string;
}
interface UserSession {
  expires: string;
  user: User;
}
interface HomeProps {
  links: Link[];
  userSession: UserSession;
}

export default function Home({ links, userSession }: HomeProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [shortUrl, setShortUrl] = useState<Shortener>({
    shortUrl: "",
    url: "",
  });

  const { SignInModal, setShowSignInModal } = useSignInModal();

  const router = useRouter();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const url = inputRef.current?.value;
    // Check if the URL is valid and not empty
    if (!url || !/^https?:\/\/.+/.test(url)) {
      console.log("Please enter a valid URL");
      return;
    }
    fetch("/api/shortUrl", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(url),
    })
      .then((res) => res.json())
      .then((res) => {
        // setShortUrl({ shortUrl: res.data.shortUrl, url: res.data.data });
        if (inputRef.current) inputRef.current.value = "";
        router.push("/");
      });
  };
  return (
    <>
      <BaseLayout>
        <div className="h-screen flex flex-col justify-center items-center font-bold text-2xl">
          <picture>
            <img
              className="m-0 h-48 rounded-2xl object-cover w-full"
              src="/zoro/zoroP.png"
              alt={"zoro"}
            />
          </picture>
          <h1 className="md:text-9xl xs:text-7xl">
            zoro.<span className="text text-green-400">cut</span>
          </h1>
          <p className="mb-10">URL Shortener ????</p>
          <form onSubmit={handleSubmit}>
            <div className="flex md:flex-row sm:flex-col xs:flex-col">
              <div className="w-72">
                <input
                  type="text"
                  aria-label="Url"
                  ref={inputRef}
                  placeholder="Enter an URL"
                  className="z-0 focus:ring-green-500 focus:outline-none w-full text-sm leading-6 text-white-900 placeholder-slate-400 rounded-md py-2 pl-5 ring-1 ring-slate-200 shadow-sm"
                />
              </div>
              <button
                type="submit"
                className="w-32 xs:mt-5 xs:ml-0 justify-evenly md:mt-0 md:ml-5 hover:bg-green-00 group flex items-center rounded-md bg-green-500 text-white text-sm font-medium pl-2 pr-3 py-2 shadow-sm"
              >
                <Plus />
                New URL
              </button>
            </div>
          </form>
          {userSession ? (
            <RecentUrlsTable links={links} email={userSession.user.email} />
          ) : (
            <p className="mt-12 text-md">
              <a
                className="text-green-500 hover:underline hover:cursor-pointer"
                onClick={() => setShowSignInModal(true)}
              >
                Sign In
              </a>{" "}
              to see all your URLs!
            </p>
          )}
        </div>
      </BaseLayout>
      <SignInModal />
    </>
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getSession(context);

  const email = session?.user?.email;
  let response: any;
  if (email) response = await getRecentUrls(email);
  return {
    props: {
      links: response ? JSON.parse(JSON.stringify(response.links)) : [],
      userSession: session,
    },
  };
};
