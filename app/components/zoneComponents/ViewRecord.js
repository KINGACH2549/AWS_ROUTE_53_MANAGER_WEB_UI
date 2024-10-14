import React, { useState } from "react";
import { ChevronsUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import RecordValuesToolTip from "./RecordValuesToolTip";
import DeleteRecord from "./DeleteRecord";
import ReadRecord from "./ReadRecord";
import UpdateRecord from "./UpdateRecord";
import ManageRecord from "./ManageRecord";

export default function ViewRecord({
  record,
  zoneName,
  zoneID,
  setChanges,
  metaData,
}) {
  const [isDrawerOpen, showDrawer] = useState(false);
  const [mode, setMode] = useState(false);
  const values = record.ResourceRecords.map((resource, index) => {
    return (
      <>
        <RecordValuesToolTip value={resource.Value} />
      </>
    );
  });

  const toggleDrawer = (toggleValue) => {
    if (!toggleValue) changeMode(false); // Better Handling
    showDrawer(toggleValue);
  };
  const changeMode = (mode) => {
    setMode(mode);
  };
  return (
    <Drawer
      open={isDrawerOpen}
      onOpenChange={(data) => {
        toggleDrawer(data);
      }}
    >
      <DrawerTrigger asChild>
        <ChevronsUp className="hover:cursor-pointer" />
      </DrawerTrigger>
      <DrawerContent>
        <div className=" w-full p-4">
          <DrawerHeader className="relative">
            {/* <div className="flex gap-2">
              <div> */}
            <DrawerTitle className="text-center">{record.Name}</DrawerTitle>
            <DrawerDescription className="text-center">
              This record is under zone {zoneName}
            </DrawerDescription>
            {!mode && record.Type !== "NS" && record.Type !== "SOA" && (
              <div className=" absolute right-0 top-4 flex gap-8 justify-center">
                <Button onClick={() => changeMode(true)}>Update</Button>
                <DeleteRecord
                  record={record}
                  zoneID={zoneID}
                  toggleDrawer={toggleDrawer}
                  setChanges={setChanges}
                  zoneName={zoneName}
                />
              </div>
            )}
          </DrawerHeader>
          <div className="p-4 pb-0">
            {!mode ? (
              <ReadRecord record={record} values={values} />
            ) : (
              // <UpdateRecord
              //   record={record}
              //   metaData={metaData}
              //   changeMode={changeMode}
              //   zoneID={zoneID}
              //   setChanges={setChanges}
              // />
              <ManageRecord
                record={record}
                metaData={metaData}
                changeMode={changeMode}
                zoneID={zoneID}
                setChanges={setChanges}
              />
            )}
          </div>
          {/* <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter> */}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
