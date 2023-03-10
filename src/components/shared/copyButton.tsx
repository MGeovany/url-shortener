import { useState } from "react";
import { Copy } from "lucide-react";

type CopyButtonProps = {
  textToCopy: string;
  buttonText?: string;
  successText?: string;
};

export function CopyButton({
  textToCopy,
  buttonText = "Copy",
  successText = "Copied!",
}: CopyButtonProps) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <button
      onClick={handleCopyClick}
      className={`flex mx-3 text-sm items-center justify-center hover:text-black w-full`}
      disabled={isCopied}
    >
      <Copy className="mx-2 h-5 w-5" />
      <div className=" flex px-5 w-full">
        {isCopied ? successText : buttonText}
      </div>
    </button>
  );
}
