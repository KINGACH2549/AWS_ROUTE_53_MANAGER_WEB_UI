import React, { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer } from "recharts";
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

const data = [
  { goal: 400 },
  { goal: 300 },
  { goal: 200 },
  { goal: 300 },
  { goal: 200 },
  { goal: 278 },
  { goal: 189 },
  { goal: 239 },
  { goal: 300 },
  { goal: 200 },
  { goal: 278 },
  { goal: 189 },
  { goal: 349 },
];

export default function ViewRecord({ record, zoneName }) {
  const [goal, setGoal] = useState(350);

  function onClick(adjustment) {
    setGoal(Math.max(200, Math.min(400, goal + adjustment)));
  }

  const values = record.ResourceRecords.map((resource, index) => {
    return (
      <>
        
        <RecordValuesToolTip  value={resource.Value}/>
      
      </>
    );
  });

  return (
    <Drawer>
      <DrawerTrigger asChild>
        {/* <Button variant="outline">Open Drawer</Button> */}
        <ChevronsUp className="hover:cursor-pointer" />
      </DrawerTrigger>
      <DrawerContent>
        <div className=" w-full p-4">
          <DrawerHeader>
            <DrawerTitle className="text-center">{record.Name}</DrawerTitle>
            <DrawerDescription className="text-center">
              This record is under zone {zoneName}
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="grid grid-cols-2 text-center text-base col-gap-2 gap-y-4">
              <div>
                <Label>Name</Label>
                <p>{record.Name}</p>
              </div>
              <div>
                <Label>Type</Label>
                <p>{record.Type}</p>
              </div>
              <div className="col-span-2 flex flex-col gap-2">
                <Label>Values</Label>
                <div className="flex gap-6 justify-center">
                  {values.length > 0 ? values : "No Values Present"}
                </div>
              </div>
              <div>
                <Label>TTL</Label>
                <p>{record.TTL}</p>
              </div>
              <div>
                <Label>Routing Policy</Label>
                <p>
                  {record.Type === "NS" || record.Type === "SOA"
                    ? "None"
                    : "Simple Routing"}
                </p>
              </div>
            </div>
            {/* <div className="flex items-center justify-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 shrink-0 rounded-full"
                onClick={() => onClick(-10)}
                disabled={goal <= 200}
              >
                <Minus className="h-4 w-4" />
                <span className="sr-only">Decrease</span>
              </Button>
              <div className="flex-1 text-center">
                <div className="text-7xl font-bold tracking-tighter">
                  {goal}
                </div>
                <div className="text-[0.70rem] uppercase text-muted-foreground">
                  Calories/day
                </div>
              </div>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 shrink-0 rounded-full"
                onClick={() => onClick(10)}
                disabled={goal >= 400}
              >
                <Plus className="h-4 w-4" />
                <span className="sr-only">Increase</span>
              </Button>
            </div>
            <div className="mt-3 h-[120px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <Bar
                    dataKey="goal"
                    style={{
                      fill: "hsl(var(--foreground))",
                      opacity: 0.9,
                    }}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div> */}
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
