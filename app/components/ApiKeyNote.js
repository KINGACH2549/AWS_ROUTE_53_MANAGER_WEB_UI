import {
  DialogFooter,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog";
import MessageDialog from "./MessageDialog";
import { useState } from "react";
import { useKeyManagementContext } from "../custom-hooks";
export default function ApiKeyNote() {
  const [isDialogOpen, setDialogOpen] = useState(true);
  const { showKeyPopOver, setShowKeyPopOver } = useKeyManagementContext();
  const handleDialog = (value) => {
    setDialogOpen(value);
  };
  return (
    <MessageDialog
      trigger={false}
      isDialogOpen={isDialogOpen}
      handleDialog={handleDialog}
    >
      <DialogHeader>
        <DialogTitle>Note on Using AWS Route 53 API Keys</DialogTitle>
      </DialogHeader>
      <div>
        <p className="text-sm leading-relaxed">
          We currently use your provided AWS Route 53 API keys to interact with
          your hosted zones. While we’re working on adding support for temporary
          access tokens to enhance security, we recommend setting up role-based
          access control through the AWS IAM console in the meantime. This setup
          will ensure our access remains limited to the permissions you define.
          For detailed guidance, please refer to the&nbsp;
          <a
            href="https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html"
            target="_blank"
            rel="noreferrer noopener"
            style={{ color: "blue" }}
          >
            AWS documentation
          </a>{" "}
          on creating role-based access and generating API keys.
        </p>
      </div>
      <DialogFooter>
        <span
          className=" underline text-sm cursor-pointer"
          style={{ color: "blue" }}
          onClick={() => {
            handleDialog(false);
            setShowKeyPopOver(true);
          }}
        >
          Start By Uploading your keys
        </span>
      </DialogFooter>
    </MessageDialog>
  );
}
