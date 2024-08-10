"use client";

import HostedZone from "./HostedZone";
import HostedZonesList from "./HostedZonesList";

export default function AWSRoute53Conifg(props) {
  const { hostedZonelist, changes, setChanges } = props;

  return (
    <>
      <div className="px-10">
        <HostedZone changes={changes} setChanges={setChanges} />
        <HostedZonesList
          hostedZonelist={hostedZonelist}
          setChanges={setChanges}
        />
      </div>
    </>
  );
}
