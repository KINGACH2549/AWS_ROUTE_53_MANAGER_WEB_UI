import { useState } from "react";
import ManageRecord from "./ManageRecord";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

export default function CreateRecordWithDrawer(props) {
  const { metaData, zoneID, setChanges, zoneName } = props;
  const [isDrawerOpen, showDrawer] = useState(false);

  const toggleDrawer = (toggleValue) => {
    showDrawer(toggleValue);
  };

  return (
    <Drawer
      open={isDrawerOpen}
      onOpenChange={(data) => {
        toggleDrawer(data);
      }}
    >
      <DrawerTrigger asChild>
        <Button className="mt-4">Create Record</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className=" w-full p-4">
          <div className="p-4 pb-0">
            <ManageRecord
              metaData={metaData}
              zoneID={zoneID}
              setChanges={setChanges}
              toggleDrawer={toggleDrawer}
              zoneName={zoneName}
            />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
