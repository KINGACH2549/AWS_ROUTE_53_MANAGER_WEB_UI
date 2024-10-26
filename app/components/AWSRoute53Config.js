"use client";

import { PopoverDemo } from "./ApiKeysManager";
// import HostedZone from "./HostedZone";
import dynamic from "next/dynamic";

import HostedZonesList from "./HostedZonesList";
const HostedZone = dynamic(() => import("./HostedZone"), { ssr: false });

export default function AWSRoute53Conifg(props) {
  const {
    hostedZonelist,
    changes,
    setChanges,
    marker,
    handleMarker,
    handlePagination,
  } = props;

  return (
    <>
      <div className="px-10">
        <div className="flex justify-between">
          <HostedZone changes={changes} setChanges={setChanges} />
          <PopoverDemo />
        </div>
        <HostedZonesList
          hostedZonelist={hostedZonelist}
          setChanges={setChanges}
          marker={marker}
          handleMarker={handleMarker}
          handlePagination={handlePagination}
        />
      </div>
    </>
  );
}
