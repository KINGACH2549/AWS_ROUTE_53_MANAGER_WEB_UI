import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { ChevronsUp } from "lucide-react";
import ViewRecord from "./ViewRecord";

export default function RecordTable(props) {
  //   const recordCards = data.map((card) => <>card</>);
  const { records, zoneName, zoneID, setChanges, metaData } = props;
  const recordCards = records.map((record) => {
    return (
      <>
        <Card className="shadow-md shadow-green-100 hover:shadow-green-200">
          <CardHeader>
            <CardDescription>{zoneName} Zone Record</CardDescription>
          </CardHeader>
          <CardContent className="text-sm">
            <p>Record Type : {record.Type}</p>
            <p className="truncate">Record Name : {record.Name}</p>
          </CardContent>
          <CardFooter className="flex justify-center">
            {/* <PanelBottomOpen className="hover:cursor" /> */}
            {/* <ChevronsUp className="hover:cursor-pointer" /> */}
            <ViewRecord
              record={record}
              zoneName={zoneName}
              zoneID={zoneID}
              setChanges={setChanges}
              metaData={metaData}
            />
          </CardFooter>
        </Card>
      </>
    );
  });
  return (
    <>
      <div className="border-2 p-8 rounded-md">
        <div className="grid grid-cols-3 gap-10">
          {recordCards.length > 0 ? recordCards : "No Records Found"}
        </div>
      </div>
    </>
  );
}
