import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import React from "react";

const defaultRecords = [
  {
    name: "Subdomain",
    value: "",
    executable: function (recordChange, hostedZoneName) {
      return (
        <>
          <div className="flex flex-col gap-2">
            <Label>Record Name</Label>
            <Input
              value={this.value}
              onChange={(e) => recordChange(e.target.value, this.name)}
              placeholder="Subdomain"
            />
            <span className="text-center">
              {this.value + this.value.length > 0 ? "." : "" + hostedZoneName}
            </span>
          </div>
        </>
      );
    },
  },
  {
    name: "RecordType",
    value: [],
    executable: function (recordChange) {
      return (
        <>
          <div className="flex flex-col gap-2">
            <Label>Record Type</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="DNS Record Type" />
              </SelectTrigger>
              <SelectContent>
                {this.value.map((recordType) => (
                  <SelectItem value={recordType}>
                    {recordType.type + " - " + recordType.info}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </>
      );
    },
  },
];
export default function RecordModal(props) {
  const { metaData, zoneDetails } = props;
  const [records, setRecords] = React.useState(defaultRecords);
  const recordChange = (value, recordName) => {
    const newRecords = records.map((record) => {
      if (record.name === recordName) {
        return {
          ...record,
          value, // Update the value property with the new input
        };
      }
      return record; // Return the other records unchanged
    });
    setRecords(newRecords);
  };
  React.useEffect(() => {
    defaultRecords.map((record) => {
      if (record.name === "RecordType") {
        record.value = metaData.RecordTypes;
      }
    });
    setRecords(defaultRecords);
  });

  const recordInputs = records.map((record) => {
    switch (record.name) {
      case "Subdomain":
        return record.executable(
          recordChange,
          zoneDetails?.HostedZone?.Name.replace("com.", "com")
        );
      default:
        return record.executable(recordChange);
    }
  });

  return (
    <>
      <DialogContent className="w-[80vw] h-[75vh] max-w-none p-6">
        <DialogHeader>
          <DialogTitle>Create Record</DialogTitle>
        </DialogHeader>
        <ScrollArea className="w-full">
          <div className="grid grid-cols-2 gap-12 p-2 pr-4">{recordInputs}</div>
        </ScrollArea>

        <DialogFooter>
          <Button type="submit">Submit</Button>
        </DialogFooter>
      </DialogContent>
    </>
  );
}
