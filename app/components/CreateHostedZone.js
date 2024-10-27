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
import { useErrorNotification } from "../custom-hooks";

export default function CreateHostedZone(props) {
  const [domainName, setDomainName] = React.useState(null);
  const [callerReferenceId, setCallerReferenceId] = React.useState(null);
  const { changes, setChanges, handleDialog } = props;

  const { toast } = useToast();
  const { setErrorMessage } = useErrorNotification();
  const handleSubmit = (e) => {
    e.preventDefault();
    createHostedZone({
      Name: domainName,
      CallerReference: callerReferenceId,
    })
      .then((res) => {
        (res.data.message =
          "Zone " +
          domainName +
          " Status " +
          res.data.ChangeInfo.Status +
          " with all Name Servers"),
          (res.data.title = "Hosted Zone Creation Request");

        toast({
          title: res.data.title,
          description: res.data.message,
        });
        setChanges([res]);
        handleDialog(false);
      })
      .catch((e) => {
        setErrorMessage(e.response?.data?.message || "Something went wrong");
      });
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
