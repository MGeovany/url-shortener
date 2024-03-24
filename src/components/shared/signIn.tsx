import { useSignInModal } from "../layouts/signInModal";

export function SignInButton() {
  const { SignInModal, setShowSignInModal } = useSignInModal();

  return (
    <>
      <p className="mt-10 text-md font-bold text-center">
        <a
          className="text-green-500 hover:underline hover:cursor-pointer w-full"
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
