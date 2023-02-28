import { BASE_URL_PRODUCTION } from "@/utils/constants";
import getDomainNameFromUrl from "@/utils/mainNameFromUrl";
import { CopyButton } from "./copyButton";

interface Link {
  id: number;
  userId: number;
  url: string;
  shortUrl: string;
  createdAt: string;
}

interface Props {
  links: Link[];
}

export function RecentUrlsTable({ links }: Props) {
  return (
    <div className="mt-10 text-center w-6/12 flex flex-col justify-center items-center">
      <span>Your recent URLs</span>
      <table className="table-auto mt-5 text-sm text-left w-full">
        <thead className="text-xs uppercase text-white">
          <tr className="text-md p-4">
            <th className="px-6 py-3">domain</th>
            <th className="px-6 py-3">url</th>
            <th className="px-6 py-3">actions</th>
          </tr>
        </thead>
        <tbody>
          {links.map((link, index) => (
            <tr
              key={index}
              className="border-b border-gray-700 bg-white-800  hover:bg-white hover:text-black"
            >
              <td className="text-left p-4">
                {getDomainNameFromUrl(link.url)}
              </td>
              <td>
                <div className="flex flex-row">
                  <a
                    className="text-green-500 mx-3 justify-center items-center"
                    href={link?.shortUrl}
                    target="_blank"
                  >
                    {BASE_URL_PRODUCTION}
                    {link.shortUrl}
                  </a>
                </div>
              </td>
              <td>
                <CopyButton
                  textToCopy={`${BASE_URL_PRODUCTION}${link.shortUrl}`}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
