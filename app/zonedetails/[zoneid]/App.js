"use client";
import { getHostedZoneById } from "@/app/api/GetHostedZone";
import SearchDomain from "@/app/components/header/SearchDomain";
import React from "react";
import { SiAmazonroute53, SiClojure } from "react-icons/si";
import { ZoneHeader } from "./ZoneHeader";
import ZoneRecords from "./ZoneRecords";
import { getAllRecordTypes } from "@/app/api/MetaData";
import DisplayZoneRecords from "./DisplayZoneRecords";

export default function App({ zoneID }) {
  const [zonedetails, setZoneDetails] = React.useState({});
  const [metaData, setMetaData] = React.useState({});
  React.useEffect(() => {
    getHostedZoneById(zoneID).then((data) => {
      console.log(data.data);
      setZoneDetails(data.data);
    });

    getAllRecordTypes().then((data) => {
      setMetaData(data);
    });
  }, []);
  return (
    <>
      <div className=" shadow flex items-center justify-center mb-20 py-4 gap-64">
        {/* <PopoverDemo /> */}
        <SiAmazonroute53 className="w-32 h-[2.2rem]" />
        <SearchDomain />
        {/* <NotifcationManager /> */}
      </div>
      {Object.keys(zonedetails).length > 0 ? (
        <>
          <ZoneHeader zoneDetails={zonedetails} />
          <ZoneRecords metaData={metaData} zoneDetails={zonedetails} />
          <DisplayZoneRecords
            zoneID={zoneID}
            zoneName={zonedetails.HostedZone.Name.replace("com.", "com")}
          />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}
