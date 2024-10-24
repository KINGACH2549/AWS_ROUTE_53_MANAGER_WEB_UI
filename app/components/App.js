"use client";

import AWSRoute53Conifg from "./AWSRoute53Config";
import SearchDomain from "./header/SearchDomain";
import { SiAmazonroute53, SiClojure } from "react-icons/si";
import NotifcationManager from "./notifications/NotificationManager";
import { getHostedZoneList } from "../api/GetHostedZone";
import { useEffect, useState, useRef } from "react";
import { useNotificationQueue } from "../custom-hooks";
import LoadingComponent from "./LoadingComponent";

export default function App() {
  const [hostedZonelist, setHostedZoneList] = useState([]); // I can optimize this
  const [changes, setChanges] = useState([]);
  const notificationsQueue = useNotificationQueue();

  useEffect(() => {
    getHostedZoneList()
      .then((res) => {
        setHostedZoneList(res.data.HostedZones);
      })
      .catch((e) => {
        console.log(e);
      });

    if (changes.length > 0) notificationsQueue.current.push(changes[0]);
  }, [changes]);

  return (
    <>
      <AWSRoute53Conifg
        hostedZonelist={hostedZonelist}
        changes={changes}
        setChanges={setChanges}
      />
    </>
  );
}
