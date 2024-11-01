import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogFooter,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { DialogContent } from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";

export default function ({ children, trigger, isDialogOpen }) {
  // const { trigger, isDialogOpen } = props;
  const [dialogOpen, setDialogOpen] = useState(false);
  useEffect(() => {
    setDialogOpen(isDialogOpen);
  }, []);
  return (
    <>
      <Dialog
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open);
        }}
      >
        <DialogTrigger asChild>
          {trigger && <Button>{trigger}</Button>}
        </DialogTrigger>
        <DialogContent className="p-8">{children}</DialogContent>
      </Dialog>
    </>
  );
}
