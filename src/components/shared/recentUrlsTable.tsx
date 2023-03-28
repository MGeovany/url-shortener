import { BASE_URL_PRODUCTION } from "@/utils/constants";
import getDomainNameFromUrl from "@/utils/mainNameFromUrl";
import { CopyButton } from "./copyButton";
import { X, MoreHorizontal } from "lucide-react";

interface Link {
  id: number;
  userId: number;
  url: string;
  shortUrl: string;
  createdAt: string;
}

interface Props {
  linkData: Link[];
  handleDeleteLink: (linkId: number) => Promise<void>;
}

export function RecentUrlsTable({ linkData, handleDeleteLink }: Props) {
  const visibleLinks = linkData.slice(0, 5); // get first 5 links
  const lastVisibleLink = visibleLinks[visibleLinks.length - 1];
  const blurredLastLink = { ...lastVisibleLink, blur: true }; // create a new object with blur property
  visibleLinks[visibleLinks.length - 1] = blurredLastLink; // replace the last visible link with the blurred one

  return (
    <div className="mt-10 text-center md:w-6/12 xs:px-5 xs:w-full flex flex-col justify-center items-center">
      {linkData.length === 0 ? (
        <p>No short links yet ⭐️</p>
      ) : (
        <table className="table-auto mt-5 text-sm text-left md:w-full xs:w-fit">
          <thead className="text-xs uppercase text-white">
            <tr className="text-md md:p-4 xs:p-10">
              <th className="px-6 py-3">domain</th>
              <th className="px-6 py-3">url</th>
              <th className="px-6 py-3">actions</th>
            </tr>
          </thead>
          <tbody className="xs:px-5">
            {visibleLinks.map((link, index) => (
              <tr
                key={index}
                className={`${
                  index === 4 ? "opacity-50 blur-sm" : ""
                } border-b border-gray-700 bg-white-800 hover:bg-white hover:text-black`}
              >
                <td className="text-left p-4 py-5">
                  {getDomainNameFromUrl(link.url)}
                </td>
                <td>
                  <div className="flex flex-row">
                    <a
                      className="text-green-500 mx-3 justify-center items-center"
                      href={link?.shortUrl}
                      target="_blank"
                      aria-disabled
                    >
                      {BASE_URL_PRODUCTION}
                      {link.shortUrl}
                    </a>
                  </div>
                </td>
                <td className="flex flex-row justify-between h-full mt-4">
                  <CopyButton
                    textToCopy={`${BASE_URL_PRODUCTION}${link.shortUrl}`}
                  />
                  <X
                    className="mr-5 cursor-pointer"
                    onClick={() => handleDeleteLink(link.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {linkData.length >= 5 && (
        <div className="mt-10 flex flex-col items-center justify-center">
          <span>See More Links</span>
          <MoreHorizontal className="mb-5" />
          <a
            href="/dashboard"
            className="xs:mt-5 xs:ml-0 justify-evenly md:mt-0 w-48 hover:bg-green-500 group flex items-center rounded-md bg-green-600 text-white text-sm font-medium pl-2 pr-3 py-2 shadow-sm"
          >
            Go to my Dashboard
          </a>
        </div>
      )}
    </div>
  );
}
