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
  const { zoneId, setChanges, setRowSelection, showDeleteButton } = props;

  const { toast } = useToast();

  const deleteZone = (zoneId) => {
    // call Delete API
    console.log(zoneId, "xx");
    deleteHostedZoneById(zoneId).then((res) => {
      console.log(res);
      toast({
        title: "Hosted Zone Deletion Request",
        description:
          "Zone " + zoneId + " Status - " + res.data.ChangeInfo.Status,
      });
      setChanges([res]);
    });
    setRowSelection({});
    showDeleteButton(false);
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className="bg-black text-white hover:bg-gray-900 hover:text-white"
          variant="outline"
        >
          Delete Zone
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
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
