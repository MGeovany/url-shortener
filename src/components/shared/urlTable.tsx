import { BASE_URL_PRODUCTION, PAGINATION_SIZE } from "@/utils/constants";
import getDomainNameFromUrl from "@/utils/mainNameFromUrl";
import { CopyButton } from "./copyButton";
import { X, MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { Pagination, Tooltip } from "@mantine/core";
import { LINKS_PER_PAGE } from "@/utils/tableConfig";

interface UrlTableProps {
  links: LinkData[];
  handleDeleteLink: (linkId: number) => Promise<void>;
}

export function UrlTable({ links, handleDeleteLink }: UrlTableProps) {
  const [activePage, setActivePage] = useState<number>(1);

  const totalPages = Math.ceil(links.length / PAGINATION_SIZE);
  const linksToShow = LINKS_PER_PAGE(links, activePage);

  return (
    <div className="mt-10 text-center w-full flex flex-col justify-center items-center">
      {links.length === 0 ? (
        <p>No short links yet ⭐️</p>
      ) : (
        <table className="table-auto mt-5 text-sm text-left w-full">
          <thead className="text-xs uppercase text-white">
            <tr className="text-md p-4">
              <th className="px-6 py-3">domain</th>
              <th className="px-6 py-3">url</th>
              <th className="px-6 py-3 text-center">actions</th>
            </tr>
          </thead>
          <tbody>
            {linksToShow.map((link, index) => (
              <tr
                key={index}
                className={
                  "border-b border-gray-700 bg-white-800  hover:bg-white hover:text-black"
                }
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
                <td>
                  <div className="flex flex-row justify-between px-4">
                    <div className="w-1/3 h-full cursor-pointer">
                      <CopyButton
                        textToCopy={`${BASE_URL_PRODUCTION}${link.shortUrl}`}
                      />
                    </div>
                    <div className="w-1/3 h-full flex justify-center cursor-pointer">
                      <Tooltip label="Delete" withArrow position="right">
                        <X
                          className="w-full"
                          size={"20px"}
                          onClick={() => handleDeleteLink(link.id || 0)}
                        />
                      </Tooltip>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {links.length > 4 && (
        <div className="mt-10 flex flex-col items-center justify-center">
          <MoreHorizontal className="mb-5" />
          <Pagination
            total={totalPages}
            onChange={setActivePage}
            color="teal"
            styles={(theme) => ({
              control: {
                color: "white",
                "&:hover": {
                  backgroundColor: "white",
                  color: theme.colors.dark,
                },
                "&[data-active]": {
                  backgroundColor: theme.colors.teal[7],
                  color: "white",
                },
              },
            })}
          />
        </div>
      )}
      <a
        href="/"
        className="xs:mt-5 xs:ml-0 justify-evenly md:mt-5 w-48 hover:bg-green-500 group flex items-center rounded-md bg-green-600 text-white text-sm font-medium pl-2 pr-3 py-2 shadow-sm"
      >
        Go to cut URLs
      </a>
    </div>
  );
}
