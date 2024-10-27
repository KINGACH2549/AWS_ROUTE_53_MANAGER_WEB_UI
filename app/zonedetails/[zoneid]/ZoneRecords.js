import CreateRecord from "@/app/components/zoneComponents/CreateRecord";
import CreateRecordWithDrawer from "@/app/components/zoneComponents/CreateRecordWithDrawer";

export default function ZoneRecords({
  metaData,
  zoneDetails,
  changes,
  setChanges,
}) {
  return (
    <>
      <div className="px-20 mb-16">
        <header className="tracking-wide text-gray-700 text-2xl font-bold">
          Records
          <span className=" text-gray-600 text-xl font-medium">
            {"(" + zoneDetails?.HostedZone?.ResourceRecordSetCount + ")"}
          </span>
        </header>

        <CreateRecordWithDrawer
          metaData={metaData}
          setChanges={setChanges}
          zoneID={zoneDetails?.HostedZone?.Id.replace("/hostedzone/", "")}
          zoneName={zoneDetails?.HostedZone?.Name.replace("com.", "com")}
        />
      </div>
    </>
  );
}
