"use client";

import { Button } from "@/components/ui/button";

import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import CreateHostedZone from "./CreateHostedZone";
import React from "react";

export default function HostedZone(props) {
  const { changes, setChanges } = props;
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const handleDialog = (showDialog) => {
    setDialogOpen(showDialog);
  };
  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => handleDialog(true)}
          className="bg-black text-white hover:bg-gray-900 hover:text-white"
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
  );
}
