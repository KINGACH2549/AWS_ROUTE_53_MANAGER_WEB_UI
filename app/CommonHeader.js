"use client";

import { useRef } from "react";
import { SiAmazonroute53 } from "react-icons/si";
import SearchDomain from "./components/header/SearchDomain";
import NotifcationManager from "./components/notifications/NotificationManager";
import CommonQueue from "./CommonQueue";
import { Toaster } from "@/components/ui/toaster";

export default function CommonHeader({ children }) {
  const notificationQueue = useRef([]);

  return (
    <CommonQueue notificationQueue={notificationQueue}>
      <div className="shadow flex items-center justify-center mb-32 py-4 gap-64">
        <SiAmazonroute53 className="w-32 h-[2.2rem]" />
        <SearchDomain />
        <NotifcationManager />
      </div>
      {children}
      <Toaster />
    </CommonQueue>
  );
}
