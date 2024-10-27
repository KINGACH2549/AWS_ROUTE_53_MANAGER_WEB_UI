"use client";
import { getHostedZoneById } from "@/app/api/GetHostedZone";
import { useEffect, useState } from "react";
import { ZoneHeader } from "./ZoneHeader";
import ZoneRecords from "./ZoneRecords";
import { getAllRecordTypes } from "@/app/api/MetaData";
import DisplayZoneRecords from "./DisplayZoneRecords";
import { useNotificationQueue } from "@/app/custom-hooks";
import LoadingComponent from "@/app/components/LoadingComponent";

export default function App({ zoneID }) {
  const [zonedetails, setZoneDetails] = useState({});
  const [metaData, setMetaData] = useState({});
  const [changes, setChanges] = useState([]);
  const notificationsQueue = useNotificationQueue();

  useEffect(() => {
    getHostedZoneById(zoneID).then((data) => {
      console.log(data.data);
      setZoneDetails(data.data);
    });

    getAllRecordTypes().then((data) => {
      setMetaData(data);
    });

    if (changes.length > 0) notificationsQueue.current.push(changes[0]);
  }, [changes]);
  return (
    <>
      {Object.keys(zonedetails).length > 0 ? (
        <>
          <ZoneHeader zoneDetails={zonedetails} />
          <ZoneRecords
            metaData={metaData}
            zoneDetails={zonedetails}
            changes={changes}
            setChanges={setChanges}
          />

          <DisplayZoneRecords
            zoneID={zoneID}
            zoneName={zonedetails.HostedZone.Name.replace("com.", "com")}
            metaData={metaData}
            changes={changes}
            setChanges={setChanges}
          />
        </>
      ) : (
        <LoadingComponent />
      )}
    </>
  );
}
