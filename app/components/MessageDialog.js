import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";

export default function MessageDialog({
  children,
  trigger,
  isDialogOpen,
  handleDialog,
}) {
  return (
    <>
      <Dialog
        open={isDialogOpen}
        onOpenChange={(open) => {
          handleDialog(open);
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
