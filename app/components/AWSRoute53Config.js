"use client";

import { PopoverDemo } from "./ApiKeysManager";
import HostedZone from "./HostedZone";
import HostedZonesList from "./HostedZonesList";

export default function AWSRoute53Conifg(props) {
  const { hostedZonelist, changes, setChanges } = props;

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
        />
      </div>
    </>
  );
}
