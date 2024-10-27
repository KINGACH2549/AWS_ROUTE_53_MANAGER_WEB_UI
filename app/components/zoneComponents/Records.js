import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { createDnsRecord } from "@/app/api/CreateDnsRecord";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

export default function Record(props) {
  const {
    metaData,
    zoneDetails,
    handleRecordDialogVisibilty,
    formParams,
    changes,
    setChanges,
  } = props;
  const { control, handleSubmit } = formParams;

  const toast = useToast();
  const onSubmit = (data) => {
    // call create record api
    data.Name =
      data.Name + "." + zoneDetails.HostedZone.Name.replace("com.", "com");
    createDnsRecord(
      data,
      zoneDetails?.HostedZone?.Id.replace("/hostedzone/", "")
    )
      .then((res) => {
        // notification event triggers

        setChanges([res]);
      })
      .catch((e) => {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      });
    handleRecordDialogVisibilty(false);
  };

  return (
    <DialogContent className="w-[70vw] h-[70vh] max-w-none p-6">
      <DialogHeader>
        <DialogTitle>Create Record</DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-12 p-2 pr-4">
          <Controller
            name="Name"
            control={control}
            render={({ field }) => (
              <>
                <div className="flex flex-col gap-4">
                  <Label>Record Name</Label>
                  <Input placeholder="Subdomain" {...field} />
                  <span>
                    {field.value.length > 0 ? field.value + "." : ""}
                    {zoneDetails?.HostedZone?.Name.replace("com.", "com")}
                  </span>
                </div>
              </>
            )}
          />
          <Controller
            name="Type"
            control={control}
            render={({ field }) => (
              <div className="flex flex-col gap-4">
                <Label>Record Type</Label>{" "}
                <Select
                  value={field.value} // Bind the value from the form control
                  onValueChange={(value) => field.onChange(value)} // Handle value change
                >
                  <SelectTrigger>
                    <SelectValue placeholder="DNS Record Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {metaData?.RecordTypes.map((recordType) => (
                      <SelectItem key={index} value={recordType.type}>
                        {recordType.type + " - " + recordType.info}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          />
          <Controller
            name="ResourceRecords"
            control={control}
            render={({ field }) => (
              <Textarea
                placeholder="Record values"
                {...field}
                className="col-span-2"
              />
            )}
          />
          <Controller
            name="TTL"
            control={control}
            render={({ field }) => <Input placeholder="TTL" {...field} place />}
          />
          <Controller
            name="RoutingPolicy"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value} // Bind the value from the form control
                onValueChange={(value) => field.onChange(value)} // Handle value change
              >
                <SelectTrigger>
                  <SelectValue placeholder="Routing Policy" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={"Simple Routing"}>
                    Simple Routing
                  </SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>
        <DialogFooter className="p-4">
          <Button type="submit">Submit</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
