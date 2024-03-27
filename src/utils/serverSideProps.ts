import { GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getAllUrls } from "lib/db";

export async function getServerSidePropsUtil(
  context: GetServerSidePropsContext
) {
  const session = await getServerSession(context.req, context.res, authOptions);

  const email = session?.user?.email;
  let response: any;
  if (email) response = await getAllUrls(email);

  return {
    props: {
      links: response ? JSON.parse(JSON.stringify(response.links)) : [],
      userSession: session,
    },
  };
}
