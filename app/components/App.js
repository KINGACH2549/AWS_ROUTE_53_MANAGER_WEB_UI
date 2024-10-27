"use client";

import AWSRoute53Conifg from "./AWSRoute53Config";
import { getHostedZoneList } from "../api/GetHostedZone";
import { useEffect, useState, useRef } from "react";
import { useErrorNotification, useNotificationQueue } from "../custom-hooks";

export default function App() {
  const [hostedZonelist, setHostedZoneList] = useState([]); // I can optimize this
  const [changes, setChanges] = useState([]);
  const notificationsQueue = useNotificationQueue();
  const [marker, setMarker] = useState([]);
  const [pagination, setPagination] = useState(null);
  const { setErrorMessage } = useErrorNotification();
  useEffect(() => {
    getHostedZoneList({
      MaxItems: 8,
      Marker: pagination,
    })
      .then((res) => {
        setHostedZoneList(res.data.HostedZones);
        if (res.data.IsTruncated) {
          setMarker([...marker, res.data.NextMarker]);
        } else {
          setMarker([...marker, "/"]);
        }
      })
      .catch((e) => {
        setErrorMessage(e.response?.data?.message || "Something went wrong");
      });
  }, [pagination]);

  useEffect(() => {
    getHostedZoneList({
      MaxItems: 8,
    })
      .then((res) => {
        setHostedZoneList(res.data.HostedZones);
        if (res.data.IsTruncated) {
          setMarker([res.data.NextMarker]);
        } else {
          setMarker(["/"]);
        }
      })
      .catch((e) => {
        setErrorMessage(e.response?.data?.message || "Something went wrong");
      });

    if (changes.length > 0) notificationsQueue.current.push(changes[0]);
  }, [changes]);

  const handlePagination = (paginationValue) => {
    setPagination(paginationValue);
  };

  const handleMarker = (markers) => {
    setMarker([...markers]);
  };

  return (
    <>
      <AWSRoute53Conifg
        hostedZonelist={hostedZonelist}
        changes={changes}
        setChanges={setChanges}
        marker={marker}
        handleMarker={handleMarker}
        handlePagination={handlePagination}
      />
    </>
  );
}
