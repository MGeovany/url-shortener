import React, { useState } from "react";
import BaseLayout from "@/components/layouts/baseLayout";

import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import { RecentUrlsTable } from "@/components/shared/recentUrlsTable";
import { Plus } from "lucide-react";
import { SignInButton } from "@/components/shared/signIn";
import { getAllUrls } from "lib/db";

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
  initialLinks: Link[];
  userSession: UserSession;
}

export default function Home({ initialLinks, userSession }: HomeProps) {
  const [url, setUrl] = useState<string>("");
  const [linkData, setLinkData] = useState<Link[]>(initialLinks);

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!url || !/^https?:\/\/.+/.test(url)) {
      console.log("Please enter a valid URL");
      return;
    }

    const response = await fetch("/api/shortUrl", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(url),
    });

    if (!response.ok) {
      console.log("Failed to create short link:", response.statusText);
      return;
    }

    const newLink = await response.json();
    setLinkData([newLink, ...linkData]);
    setUrl("");
  };

  async function handleDeleteLink(linkId: number) {
    const response = await fetch(`/api/deleteLink?linkId=${linkId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      console.log("Failed to delete short link:", response.statusText);
      return;
    }
    setLinkData(linkData.filter((link) => link.id !== linkId));
  }

  return (
    <>
      <BaseLayout>
        <div className="md:h-screen flex flex-col justify-center items-center font-bold text-2xl">
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
          <p className="mb-10">URL Shortener 🔗</p>
          <form onSubmit={handleSubmit}>
            <div className="flex md:flex-row sm:flex-col xs:flex-col">
              <div className="w-72">
                <input
                  type="text"
                  aria-label="Url"
                  value={url}
                  onChange={handleUrlChange}
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
            <RecentUrlsTable
              linkData={linkData}
              handleDeleteLink={handleDeleteLink}
            />
          ) : (
            <SignInButton />
          )}
        </div>
      </BaseLayout>
    </>
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getSession(context);

  const email = session?.user?.email;
  let response: any;
  if (email) response = await getAllUrls(email);
  return {
    props: {
      initialLinks: response ? JSON.parse(JSON.stringify(response.links)) : [],
      userSession: session,
    },
  };
};
