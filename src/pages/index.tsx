import React, { useRef, useState } from "react";
import BaseLayout from "@/components/layouts/baseLayout";
import { Tooltip } from "@mantine/core";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import { RecentUrlsTable } from "@/components/shared/recentUrlsTable";
import { Plus } from "lucide-react";
import { SignInButton } from "@/components/shared/signIn";
import { getAllUrls } from "lib/db";
import { useClipboard } from "@mantine/hooks";
import { BASE_URL_PRODUCTION } from "@/utils/constants";
import { Toaster, toast } from "react-hot-toast";
import { INVALID_URL_TOAST, LINK_DELETED_TOAST } from "../notifications";
import { createShortLink, deleteLink } from "@/api";
import { X } from "lucide-react";
import Image from "next/image";

interface HomeProps {
  initialLinks: LinkData[];
  userSession: UserSession;
}

export default function Home({ initialLinks, userSession }: HomeProps) {
  const [url, setUrl] = useState<string>("");
  const [linkData, setLinkData] = useState<LinkData[]>(initialLinks);
  const [labelNewURL, setLabelNewURL] = useState<string | undefined>(undefined);
  const temporaryLink = useRef("second");

  const clipboard = useClipboard();

  const handleCopiedURL = () => {
    const shorter = BASE_URL_PRODUCTION + temporaryLink.current;
    clipboard.copy(shorter);
    setLabelNewURL("Link Copied!");

    setUrl("");
    setTimeout(() => {
      setLabelNewURL(undefined);
    }, 2000);
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUrl(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!url || !/^https?:\/\/.+/.test(url)) {
      INVALID_URL_TOAST();
      return;
    }
    try {
      await toast.promise(createShortLink(url), {
        loading: "Creating short link...",
        success: (data) => {
          temporaryLink.current = data.shortUrl;
          setLinkData([data, ...linkData]);
          handleCopiedURL();
          return "Short link created!";
        },
        error: (err) => {
          return `${err}`;
        },
      });
    } catch (err) {
      console.log(err);
      return;
    }
  };

  async function handleDeleteLink(linkId: number) {
    const success = await deleteLink(linkId);
    if (success) {
      setLinkData(linkData.filter((link) => link.id !== linkId));
      LINK_DELETED_TOAST();
    }
  }

  return (
    <>
      <BaseLayout>
        <div className="flex flex-col justify-center items-center font-bold text-2xl">
          <Image width={400} height={100} src="/bg/zoro.avif" alt="zoro" />
          <h1 className="md:text-9xl xs:text-7xl">
            zoro.<span className="text text-green-400">cut</span>
          </h1>
          <p className="mb-10">URL Shortener</p>
          <form onSubmit={handleSubmit}>
            <div className="flex md:flex-row sm:flex-col xs:flex-col md:items-center">
              <div className="w-72 relative">
                <textarea
                  rows={3}
                  cols={400}
                  aria-label="Url"
                  value={url}
                  onChange={handleUrlChange}
                  placeholder="Enter a URL"
                  className="relative z-0 focus:ring-green-500 focus:outline-none w-full text-sm leading-6 text-white-900 placeholder-slate-400 rounded-md py-2 pl-5 ring-1 ring-slate-200 shadow-sm pr-10"
                />
                {url.length > 0 && (
                  <button
                    type="button"
                    className="absolute top-0 right-0 h-full px-2 hover:text-white text-gray-500 focus:outline-none"
                    onClick={() => setUrl("")}
                  >
                    <X />
                  </button>
                )}
              </div>
              {labelNewURL ? (
                <Tooltip label={labelNewURL} position="bottom">
                  <button
                    type="submit"
                    className="h-fit xs:mt-5 xs:ml-0 justify-evenly md:mt-0 md:ml-5 hover:bg-green-00 group flex items-center rounded-md bg-green-500 text-white text-sm font-medium pl-2 pr-3 py-2 shadow-sm"
                  >
                    <Plus />
                    New URL
                  </button>
                </Tooltip>
              ) : (
                <button
                  type="submit"
                  className="w-32 h-fit xs:mt-5 xs:ml-0 justify-evenly md:mt-0 md:ml-5 hover:bg-green-00 group flex items-center rounded-md bg-green-500 text-white text-sm font-medium pl-2 pr-3 py-2 shadow-sm"
                >
                  <Plus />
                  New URL
                </button>
              )}
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
      <Toaster position="top-center" reverseOrder={false} gutter={8} />
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
