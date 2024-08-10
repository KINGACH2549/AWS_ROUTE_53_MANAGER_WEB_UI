"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { createHostedZone } from "../api/CreateHostedZone";

export default function CreateHostedZone(props) {
  const [domainName, setDomainName] = React.useState(null);
  const [callerReferenceId, setCallerReferenceId] = React.useState(null);
  const { changes, setChanges, handleDialog } = props;

  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    createHostedZone({
      Name: domainName,
      CallerReference: callerReferenceId,
    })
      .then((res) => {
        console.log(res, "ww");
        toast({
          title: "Hosted Zone Request Created",
          description:
            "Zone " +
            res.data.HostedZone.Name +
            " Status - " +
            res.data.ChangeInfo.Status,
        });
        setChanges([res]);
      })
      .catch((e) => {
        console.log(e);
      });
    handleDialog(false);
  };
  return (
    <>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create Hosted Zone</DialogTitle>
          <DialogDescription>
            Enter Hosted Zone root Domain Name
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Domain Name
            </Label>
            <Input
              id="name"
              placeholder="Enter your Domain"
              className="col-span-3"
              onChange={(event) => setDomainName(event.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Caller Id
            </Label>
            <Input
              id="username"
              placeholder="Enter Caller Reference Id"
              className="col-span-3"
              onChange={(event) => setCallerReferenceId(event.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </>
  );
}
