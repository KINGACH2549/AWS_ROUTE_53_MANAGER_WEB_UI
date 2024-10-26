"use client";

import { Button } from "@/components/ui/button";

import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import CreateHostedZone from "./CreateHostedZone";
import React from "react";

export default function HostedZone(props) {
  const { changes, setChanges } = props;
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [isApiKeyPresent, setIsApiKeyPresent] = React.useState(false);

  // React.useEffect(() => {
  //   setIsApiKeyPresent(Boolean(localStorage.getItem("API_KEYS")));
  // }, []);
  const handleDialog = (showDialog) => {
    setDialogOpen(showDialog);
  };

  return (
    <>
      <Dialog
        open={dialogOpen}
        onOpenChange={(open) => {
          // if (isApiKeyPresent) setDialogOpen(open);

          if (localStorage.getItem("API_KEYS")) setDialogOpen(open);
        }}
      >
        <DialogTrigger asChild>
          <Button
            className={`${
              localStorage.getItem("API_KEYS")
                ? "bg-gray-900 text-white hover:bg-gray-800 hover:text-white"
                : "bg-gray-700  text-white hover:bg-gray-600 hover:text-white cursor-not-allowed"
            }`}
            // className="bg-gray-900 text-white hover:bg-gray-800 hover:text-white"
            variant="outline"
          >
            Create Zone
          </Button>
        </DialogTrigger>
        <CreateHostedZone
          handleDialog={handleDialog}
          setChanges={setChanges}
          changes={changes}
        />
      </Dialog>
    </>
  );
}
