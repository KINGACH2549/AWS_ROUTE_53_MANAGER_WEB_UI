import {
  Dialog,
  DialogTrigger,
  DialogFooter,
  DialogTitle,
  DialogClose,
  DialogHeader,
} from "@/components/ui/dialog";
import { useState } from "react";
import MessageDialog from "./MessageDialog";
import { DialogContent } from "@radix-ui/react-dialog";
export default function ApiKeyNote() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      {/* <MessageDialog trigger={false} isDialogOpen={true}>
        <DialogHeader>
          <DialogTitle>Note on Using AWS Route 53 API Keys</DialogTitle>
        </DialogHeader>
        <div className="p-2">
          <p className="text-sm">
            We are using your provided AWS Route 53 API keys services in order
            to interact with your hosted zones as of now we don't have
            functionality to generate temporary tokens to manage your services
            we will be definetly moving towards that but for now if you want us
            to manage your services please refer to this AWS docs on how to
            generate role based control to your services and get API Keys. This
            role based mechanism will make sure that we only have limited access
            to your services as governed by you
          </p>
        </div>
        <DialogFooter>
          <a href="" className="text-sm">
            Start By Uploading your keys
          </a>
        </DialogFooter>
      </MessageDialog> */}
      <div>
        {" "}
        <Dialog
          open={dialogOpen}
          onOpenChange={(open) => {
            setDialogOpen(open);
          }}
        >
          <DialogTrigger asChild>
            <span className="underline hover:cursor-pointer">click here</span>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Our Privacy Policy</DialogTitle>
            </DialogHeader>
            <div className="p-2 text-gray">
              <p className="text-sm pb-2 leading-relaxed">
                We are using your provided AWS Route 53 API keys to interact
                with your hosted zones. Please note:
              </p>
              <ul className="list-disc  text-sm space-y-2 leading-relaxed">
                <li>
                  Currently, we do not have functionality to generate temporary
                  tokens to manage your services, but we are planning to
                  implement this in the future.
                </li>
                <li>
                  For now, if you would like us to manage your services, refer
                  to the&nbsp;
                  <a
                    href="https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html"
                    target="_blank"
                    rel="noreferrer noopener"
                    style={{ color: "blue" }}
                  >
                    AWS documentation
                  </a>{" "}
                  on how to set up role-based access control and generate API
                  keys. This role-based mechanism will ensure that we have only
                  the limited access you grant.
                </li>
                <li>
                  We do not store any cookies on the client side except for your
                  AWS API keys, which are stored in an encoded form in your
                  local storage.
                </li>
                <li>
                  We do not store any information in databases. Instead, we
                  process each request with the API keys you provide on a
                  per-request basis.
                </li>
                <li>
                  Since the keys are stored locally on your browser, each
                  request requires the API keys. If they are not provided, the
                  request will fail.
                </li>
                <li>
                  We do not store or process these keys beyond passing them
                  directly to AWS servers.
                </li>
              </ul>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
