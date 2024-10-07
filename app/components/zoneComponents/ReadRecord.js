import { Label } from "@/components/ui/label";

export default function ReadRecord({ record, values }) {
  return (
    <>
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
    </>
  );
}
