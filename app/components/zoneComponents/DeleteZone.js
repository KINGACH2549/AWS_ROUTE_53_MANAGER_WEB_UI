import { deleteHostedZoneById } from "@/app/api/DeleteHostedZone";
import { useRouter } from "next/navigation";

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
import { useErrorNotification } from "@/app/custom-hooks";

export default function DeleteZone({ zoneID }) {
  const router = useRouter();
  const { toast } = useToast();
  const { setErrorMessage } = useErrorNotification();
  const deleteZone = (zoneId) => {
    // call Delete API
    deleteHostedZoneById(zoneId)
      .then((res) => {
        router.replace("/");
      })
      .catch((e) => {
        setErrorMessage(e.response?.data?.message || "Something went wrong");
      });
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {/* <Button
          className="bg-red-800 text-white hover:bg-red-900 hover:text-white"
          variant="outline"
        >
          Delete Zone
        </Button> */}
        <span onClick={(e) => e.stopPropagation()}>Delete Zone</span>
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
              deleteZone(zoneID);
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
