"use client";

import { Button } from "@/components/ui/button";

import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import CreateHostedZone from "./CreateHostedZone";
import React from "react";

export default function HostedZone(props) {
  const { changes, setChanges, accessKeys, secretKeys } = props;
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const handleDialog = (showDialog) => {
    setDialogOpen(showDialog);
  };

  return (
    <>
      <Dialog
        open={dialogOpen}
        onOpenChange={(open) => {
          if (accessKeys.length > 0 && secretKeys.length > 0)
            setDialogOpen(open);
        }}
      >
        <DialogTrigger asChild>
          <Button
            className={`${
              accessKeys?.length > 0 && secretKeys?.length > 0
                ? "bg-gray-900 text-white hover:bg-gray-800 hover:text-white"
                : "bg-gray-700  text-white hover:bg-gray-600 hover:text-white cursor-not-allowed"
            }`}
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
