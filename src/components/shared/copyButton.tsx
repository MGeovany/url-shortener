import { Copy, CheckCheck } from "lucide-react";
import { CopyButton as CopyButtonMantine, Tooltip } from "@mantine/core";

type CopyButtonProps = {
  textToCopy: string;
};

export function CopyButton({ textToCopy }: CopyButtonProps) {
  return (
    <CopyButtonMantine value={textToCopy} timeout={2000}>
      {({ copied, copy }) => (
        <Tooltip label={copied ? "Copied" : "Copy"} withArrow position="right">
          <div className="w-full h-full flex justify-center" onClick={copy}>
            {copied ? <CheckCheck size={"20px"} /> : <Copy size={"20px"} />}
          </div>
        </Tooltip>
      )}
    </CopyButtonMantine>
  );
}
