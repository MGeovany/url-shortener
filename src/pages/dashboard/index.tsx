import { Fragment, useState } from "react";
import { useSession } from "next-auth/react";
import { Toaster } from "react-hot-toast";

import BaseLayout from "@/components/layouts/baseLayout";
import { SignInButton } from "@/components/shared/signIn";
import { UrlTable } from "@/components/shared/urlTable";
import { GENERAL_ERROR_TOAST, LINK_DELETED_TOAST } from "@/notifications";
import { deleteLink } from "@/api";
import { LoadingCircle } from "@/components/shared/icons";
import { getServerSidePropsUtil } from "@/utils/serverSideProps";

interface DashboardProps {
  initialLinks: LinkData[];
  userSession: UserSession;
}
export default function Dashboard({
  initialLinks,
  userSession,
}: DashboardProps) {
  const { data: session, status } = useSession();
  const [linkData, setLinkData] = useState<LinkData[]>(initialLinks);

  async function handleDeleteLink(linkId: number) {
    try {
      const success = await deleteLink(linkId);
      if (success) {
        setLinkData((prevLinkData) =>
          prevLinkData.filter((link) => link.id !== linkId)
        );
        LINK_DELETED_TOAST();
      }
    } catch (error) {
      GENERAL_ERROR_TOAST(error);
      console.error("Error deleting link:", error);
    }
  }

  return (
    <BaseLayout>
      <div className="flex flex-col font-bold text-xl md:p-10 w-full items-center">
        <div className="md:w-3/5 xs:w-full flex flex-col items-center">
          {userSession && status === "loading" && <LoadingCircle />}
          {session && status === "authenticated" && (
            <Fragment>
              <div className="flex flex-row justify-start pl-4 w-full">
                <span className="text-gray-500">Dashboard /</span> Analytics
              </div>
              {userSession ? (
                <UrlTable
                  links={linkData}
                  handleDeleteLink={handleDeleteLink}
                />
              ) : (
                <SignInButton />
              )}
            </Fragment>
          )}
          {!session && <SignInButton />}
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} gutter={8} />
    </BaseLayout>
  );
}

export const getServerSideProps = getServerSidePropsUtil;
