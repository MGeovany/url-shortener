import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSignInModal } from "../layouts/signInModal";
import UserDropdown from "../layouts/userDropdown";

export function Navbar() {
  const { data: session, status } = useSession();
  const { SignInModal, setShowSignInModal } = useSignInModal();
  const router = useRouter();
  const currentPath = router.pathname;

  return (
    <div className="w-full">
      <div className={`fixed md:px-10 top-0 w-full z-30 transition-all`}>
        <div className="mx-5 flex h-16 max-w-screen-xl items-center md:justify-end xs:justify-end xl:mx-auto">
          <ul className="flex flex-row font-semibold">
            <li className="mx-5 flex items-center text-sm hover:underline">
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
          </ul>
          <SignInModal />
        </div>
      </div>
    </div>
  );
}
