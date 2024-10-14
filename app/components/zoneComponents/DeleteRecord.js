import { deleteDnsRecord } from "@/app/api/DeleteDnsRecord";
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
export default function DeleteRecord({
  record,
  zoneID,
  toggleDrawer,
  setChanges,
  zoneName,
}) {
  const { toast } = useToast();

  const deleteRecord = () => {
    console.log(record, "eee");
    const changeResourceRequest = { ...record };
    if (changeResourceRequest.id) delete changeResourceRequest.id;
    deleteDnsRecord(changeResourceRequest, zoneID)
      .then((res) => {
        console.log(res);
        (res.data.message =
          "Record type " +
          changeResourceRequest.Type +
          " for " +
          changeResourceRequest.Name +
          "  deletion " +
          res.data.ChangeInfo.Status),
          (res.data.title = zoneName + " record deletion request");

        toast({
          title: res.data.title,
          description: res.data.message,
        });
        setChanges([res]);
        toggleDrawer(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="bg-red-800 text-white hover:bg-red-900 hover:text-white">
          Delete
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
          <AlertDialogAction onClick={deleteRecord}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
