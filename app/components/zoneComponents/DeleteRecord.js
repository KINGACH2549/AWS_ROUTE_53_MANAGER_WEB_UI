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
export default function DeleteRecord({ record, zoneID, toggleDrawer }) {
  const deleteRecord = () => {
    console.log(record, "eee");
    const changeResourceRequest = { ...record };
    if (changeResourceRequest.id) delete changeResourceRequest.id;
    deleteDnsRecord(changeResourceRequest, zoneID).then((res) => {
      console.log(res);
      toggleDrawer(false);
    });
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="bg-red-800 text-white hover:bg-red-900 hover:text-white">
          Delete
        </Button>
        {/* <span onClick={(e) => e.stopPropagation()}>Delete Zone</span> */}
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
