import CreateRecord from "@/app/components/zoneComponents/CreateRecord";
import { Button } from "@/components/ui/button";

export default function ZoneRecords({ metaData, zoneDetails }) {
  return (
    <>
      <div className="px-20 mb-16">
        <header className="tracking-wide text-gray-700 text-2xl font-bold">
          Records
          <span className=" text-gray-600 text-xl font-medium">
            {"(" + zoneDetails?.HostedZone?.ResourceRecordSetCount + ")"}
          </span>
        </header>
        <CreateRecord metaData={metaData} zoneDetails={zoneDetails} />
      </div>
    </>
  );
}
