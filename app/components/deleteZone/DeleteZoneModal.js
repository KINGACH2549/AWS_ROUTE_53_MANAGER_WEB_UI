import { NOTIFY_HOSTED_ZONE_DELETION } from "@/app/Constant";
import { deleteHostedZoneById } from "../../api/DeleteHostedZone";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export function DeleteZoneModal(props) {
  const { zoneId, setChanges, setRowSelection, showDeleteButton, zoneName } =
    props;

  const { toast } = useToast();

  const deleteZone = (zoneId) => {
    // call Delete API
    console.log(zoneId, "xx");
    deleteHostedZoneById(zoneId)
      .then((res) => {
        console.log(res);
        (res.data.message =
          "Zone " + zoneName + " Deletion " + res.data.ChangeInfo.Status),
          (res.data.title = "Hosted Zone Deletion Request");

        toast({
          title: res.data.title,
          description: res.data.message,
        });

        setChanges([res]);
      })
      .catch((e) => {
        console.log(e);
        toast({
          variant: "destructive",
          title: "Uh oh! It doesn't look alright",
          description: e.response?.data?.message,
          // action: <ToastAction altText="Try again">Try again</ToastAction>,
          duration: Infinity,
        });
      });
    setRowSelection({});
    showDeleteButton(false);
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className="bg-red-800 text-white hover:bg-red-900 hover:text-white"
          variant="outline"
        >
          Delete Zone
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your your
            hosted Zone
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              console.log(zoneId, "ww");
              deleteZone(zoneId);
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
