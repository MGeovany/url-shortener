import Link from "next/link";
import React, { useRef } from "react";

const routes = [
  {
    name: "Dashboard",
    url: "/dashboard",
  },
];

/* const { data: session, status } = useSession();
const { SignInModal, setShowSignInModal } = useSignInModal(); */

let session: any,
  status = "";

const Navbar = () => {
  return (
    <div className="fixed w-full">
      <div className={`fixed md:px-10 top-0 w-full z-30 transition-all`}>
        <div className="mx-5 flex h-16 max-w-screen-xl items-center md:justify-end xs:justify-end xl:mx-auto">
          <ul className="flex flex-row font-semibold">
            {routes.map((page, index) => (
              <li key={index} className="mx-5 flex items-center text-sm">
                <Link href={page.url}>{page.name}</Link>
              </li>
            ))}
            {!session && status !== "loading" ? (
              <li>
                <button
                  className="rounded-full border border-black bg-black p-1.5 px-4 text-sm text-white transition-all hover:bg-white hover:text-black"
                  /*   onClick={() => setShowSignInModal(true)} */
                >
                  Sign In
                </button>
              </li>
            ) : (
              /*  <UserDropdown /> */
              <div>s</div>
            )}
          </ul>
          {/* <SignInModal /> */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
