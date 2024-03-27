import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSignInModal } from "../layouts/signInModal";
import UserDropdown from "../layouts/userDropdown";
import { SpeedInsights } from "@vercel/speed-insights/react";

export function Navbar() {
  const { data: session, status } = useSession();
  const { SignInModal, setShowSignInModal } = useSignInModal();
  const router = useRouter();
  const currentPath = router.pathname;

  return (
    <div
      className={`fixed md:px-10 top-0 w-full z-30 transition-all bg-black border-gray-900 border-b-2`}
    >
      <div className="mx-5 flex h-16 max-w-screen-xl items-center md:justify-end xs:justify-end xl:mx-auto">
        <ul className="flex flex-row font-semibold w-full justify-between">
          <li className="font-extrabold hover:underline text-xl">
            <a href="/">
              zoro.
              <span className="text-green-400">cut</span>
            </a>
          </li>
          <div className="flex flex-row">
            <li className="mx-5 flex items-center text-sm hover:underline justify-end">
              {currentPath === "/" ? (
                <Link href={"/dashboard"}>Dashboard</Link>
              ) : (
                <Link href={"/"}>Home</Link>
              )}
            </li>

            {!session && status !== "loading" ? (
              <>
                <li>
                  <button
                    className="rounded-full border border-black bg-black p-1.5 px-4 text-sm text-white transition-all hover:bg-white hover:text-black"
                    onClick={() => setShowSignInModal(true)}
                  >
                    Sign In
                  </button>
                </li>
              </>
            ) : (
              <UserDropdown />
            )}
          </div>
        </ul>
        <SignInModal />
      </div>
      <SpeedInsights route={router.pathname} />
    </div>
  );
}
