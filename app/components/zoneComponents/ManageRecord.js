import { useForm } from "react-hook-form";
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
import { DrawerFooter } from "@/components/ui/drawer";
import { manageDnsRecords } from "@/app/api/CreateDnsRecord";
import { useToast } from "@/components/ui/use-toast";

export default function ManageRecord(props) {
  const {
    setChanges,
    zoneID,
    metaData,
    toggleDrawer,
    record,
    zoneName,
    changeMode,
  } = props;
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      Name: record?.Name || "",
      Type: record?.Type || "",
      ResourceRecords: record?.ResourceRecords[0].Value || "",
      TTL: record?.TTL || "",
      RoutingPolicy: "Simple Routing",
    },
  });

  const { toast } = useToast();

  const onSubmit = (data) => {
    console.log(data);
    if (zoneName && !data.Name.includes(zoneName))
      data.Name = data.Name + "." + zoneName;
    manageDnsRecords(data, zoneID, "UPSERT")
      .then((res) => {
        if (changeMode) changeMode(false);
        else toggleDrawer(false);
        res.data.message =
          "Record type " +
          data.Type +
          "  updates for " +
          data.Name +
          " " +
          res.data.ChangeInfo.Status;
        res.data.title = zoneName + " record update activity";

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
          description: e.response?.data?.message || "Something went wrong",
          // action: <ToastAction altText="Try again">Try again</ToastAction>,
          duration: Infinity,
        });
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 text-center text-base col-gap-2 gap-y-4 gap-12">
          <Controller
            name="Name"
            control={control}
            render={({ field }) => (
              <>
                <div>
                  <Label>Name</Label>
                  <Input placeholder="Subdomain" {...field} />
                  {zoneName && <span>{zoneName}</span>}
                </div>
              </>
            )}
          />
          <Controller
            name="Type"
            control={control}
            render={({ field }) => (
              <div>
                <Label>Type</Label>
                <Select
                  value={field.value} // Bind the value from the form control
                  onValueChange={(value) => field.onChange(value)} // Handle value change
                >
                  <SelectTrigger>
                    <SelectValue placeholder="DNS Record Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {metaData?.RecordTypes.map((recordType) => (
                      <SelectItem value={recordType.type}>
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
              <div className="col-span-2 flex flex-col gap-2">
                <Label>Values</Label>
                <Textarea
                  placeholder="Record values"
                  {...field}
                  className="col-span-2"
                />
              </div>
            )}
          />
          <Controller
            name="TTL"
            control={control}
            render={({ field }) => (
              <div>
                <Label>TTL</Label>
                <Input placeholder="TTL" {...field} place />
              </div>
            )}
          />
          <Controller
            name="RoutingPolicy"
            control={control}
            render={({ field }) => (
              <div>
                <Label>Routing Policy</Label>{" "}
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
              </div>
            )}
          />
        </div>
        <DrawerFooter>
          <div className="flex gap-2 justify-end">
            <Button type="submit">Save</Button>
            {changeMode && (
              <Button onClick={() => changeMode(false)}>Cancel</Button>
            )}
          </div>
        </DrawerFooter>
      </form>
    </>
  );
}
