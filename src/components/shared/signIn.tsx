import { useSignInModal } from "../layouts/signInModal";

export function SignInButton() {
  const { SignInModal, setShowSignInModal } = useSignInModal();

  return (
    <>
      <p className="text-sm font-medium mt-10 px-12">
        The links created without an account will be deleted within 10 days !
      </p>
      <p className="mt-1 text-md font-bold text-center">
        <a
          className="text-green-500 hover:underline hover:cursor-pointer"
          onClick={() => setShowSignInModal(true)}
        >
          Sign In
        </a>{" "}
        to see all your URLs!
      </p>
      <SignInModal />
    </>
  );
}
