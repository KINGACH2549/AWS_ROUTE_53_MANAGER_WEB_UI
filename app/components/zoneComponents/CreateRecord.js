import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import Record from "./Records";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function CreateRecord({ metaData, zoneDetails }) {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      Name: "",
      Type: "",
      ResourceRecords: "",
      TTL: "",
      RoutingPolicy: "",
    },
  });
  const [isRecordsModalVisible, setRecordsDialogVisible] = useState(false);

  const handleRecordDialogVisibilty = (isOpen) => {
    setRecordsDialogVisible(isOpen);
    if (!isOpen) reset();
  };

  return (
    <>
      <Dialog
        open={isRecordsModalVisible}
        onOpenChange={(open) => handleRecordDialogVisibilty(open)}
      >
        <DialogTrigger asChild>
          <Button className="mt-4">Create Record</Button>
        </DialogTrigger>

        <Record
          handleRecordDialogVisibilty={handleRecordDialogVisibilty}
          metaData={metaData}
          zoneDetails={zoneDetails}
          formParams={{ control, handleSubmit }}
        />
      </Dialog>
    </>
  );
}
