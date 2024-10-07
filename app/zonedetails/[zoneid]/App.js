"use client";
import { getHostedZoneById } from "@/app/api/GetHostedZone";
import SearchDomain from "@/app/components/header/SearchDomain";
import { useEffect, useState } from "react";
import { SiAmazonroute53, SiClojure } from "react-icons/si";
import { ZoneHeader } from "./ZoneHeader";
import ZoneRecords from "./ZoneRecords";
import { getAllRecordTypes } from "@/app/api/MetaData";
import DisplayZoneRecords from "./DisplayZoneRecords";

export default function App({ zoneID }) {
  const [zonedetails, setZoneDetails] = useState({});
  const [metaData, setMetaData] = useState({});
  const [changes, setChanges] = useState([]);

  useEffect(() => {
    getHostedZoneById(zoneID).then((data) => {
      console.log(data.data);
      setZoneDetails(data.data);
    });

    getAllRecordTypes().then((data) => {
      setMetaData(data);
    });
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
        <p>Loading...</p>
      )}
    </>
  );
}
