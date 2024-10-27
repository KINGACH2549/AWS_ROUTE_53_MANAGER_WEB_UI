"use client";

import { PopoverDemo } from "./ApiKeysManager";

import HostedZonesList from "./HostedZonesList";
import HostedZone from "./HostedZone";
import { useEffect, useState } from "react";

export default function AWSRoute53Conifg(props) {
  const {
    hostedZonelist,
    changes,
    setChanges,
    marker,
    handleMarker,
    handlePagination,
  } = props;

  const [accessKeys, setAccessKeys] = useState("");
  const [secretKeys, setSecretKeys] = useState("");
  useEffect(() => {
    if (localStorage.getItem("API_KEYS")) {
      const parts = localStorage.getItem("API_KEYS").split("&&&");
      setAccessKeys(parts[0]);
      setSecretKeys(parts[1]);
    }
  }, []);

  return (
    <>
      <div className="px-10">
        <div className="flex justify-between">
          <HostedZone
            changes={changes}
            setChanges={setChanges}
            accessKeys={accessKeys}
            secretKeys={secretKeys}
          />
          <PopoverDemo
            accessKeys={accessKeys}
            setAccessKeys={setAccessKeys}
            secretKeys={secretKeys}
            setSecretKeys={setSecretKeys}
          />
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
