import BaseLayout from "@/components/layouts/baseLayout";
import CopyButton from "@/components/shared/copyButton";
import Navbar from "@/components/shared/navbar";
import { BASE_URL, BASE_URL_PRODUCTION } from "@/utils/constants";
import React, { useRef, useState } from "react";

interface Shortener {
  shortUrl: string;
  url: string;
}
export default function Home() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [shortUrl, setShortUrl] = useState<Shortener>({
    shortUrl: "",
    url: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const url = inputRef.current?.value;
    fetch("/api/shortUrl", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(url),
    })
      .then((res) => res.json())
      .then((res) => {
        setShortUrl({ shortUrl: res.data.shortUrl, url: res.data.data });
        if (inputRef.current) inputRef.current.value = "";
      });
  };
  return (
    <>
      <Navbar />
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
          <p className="mb-10">URL Shortener 🔗</p>
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
                className="w-32 xs:mt-5 xs:ml-0 justify-evenly md:mt-0 md:ml-5 hover:bg-green-600 group flex items-center rounded-md bg-green-500 text-white text-sm font-medium pl-2 pr-3 py-2 shadow-sm"
              >
                <svg
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="mr-2"
                  aria-hidden="true"
                >
                  <path d="M10 5a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H6a1 1 0 1 1 0-2h3V6a1 1 0 0 1 1-1Z" />
                </svg>
                New URL
              </button>
            </div>
          </form>
          <div className="mt-10 text-center">
            <span>Your recent URLs</span>
            <p className="flex flex-row mt-5">
              <a
                className="text-blue-600 mx-3 justify-center items-center"
                href={shortUrl?.shortUrl}
                target="_blank"
              >
                {BASE_URL_PRODUCTION}
                {shortUrl?.shortUrl}
              </a>
              <CopyButton textToCopy={`${BASE_URL}${shortUrl?.shortUrl}`} />
            </p>
          </div>
        </div>
      </BaseLayout>
    </>
  );
}
