import BaseLayout from "@/components/layouts/baseLayout";
import { SignInButton } from "@/components/shared/signIn";
import { useSession } from "next-auth/react";

export default function Dashboard() {
  const { data: session, status } = useSession();

  return (
    <>
      <BaseLayout>
        <div className="h-screen flex flex-col justify-center items-center font-bold text-2xl">
          {!session && status !== "loading" ? (
            <SignInButton />
          ) : (
            <div>Dashboard</div>
          )}
        </div>
      </BaseLayout>
    </>
  );
}
