import BaseLayout from "@/components/layouts/baseLayout";
import { SignInButton } from "@/components/shared/signIn";
import { UrlTable } from "@/components/shared/urlTable";
import { getSession, useSession } from "next-auth/react";
import { GetServerSidePropsContext } from "next";
import { getAllUrls } from "lib/db";
import { useState } from "react";
import { LINK_DELETED_TOAST } from "@/notifications";
import { Toaster } from "react-hot-toast";
import { deleteLink } from "@/api";

interface DashboardProps {
  links: LinkData[];
  userSession: UserSession;
}
export default function Dashboard({ links, userSession }: DashboardProps) {
  const { data: session, status } = useSession();
  const [linkData, setLinkData] = useState<LinkData[]>(links);

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
        <div className="h-screen flex flex-col font-bold text-xl md:p-10 w-full items-center">
          <div className="md:w-3/5 xs:w-full">
            {!session && status !== "loading" ? (
              <SignInButton />
            ) : (
              <>
                <div className="flex justify-start pl-4">
                  <span className="text-gray-500">Dashboard /</span>
                  Analytics
                </div>
                <div className="flex">
                  {userSession ? (
                    <UrlTable
                      links={linkData}
                      handleDeleteLink={handleDeleteLink}
                    />
                  ) : (
                    <SignInButton />
                  )}
                </div>
              </>
            )}
          </div>
        </div>
        <Toaster position="top-center" reverseOrder={false} gutter={8} />
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
      links: response ? JSON.parse(JSON.stringify(response.links)) : [],
      userSession: session,
    },
  };
};
