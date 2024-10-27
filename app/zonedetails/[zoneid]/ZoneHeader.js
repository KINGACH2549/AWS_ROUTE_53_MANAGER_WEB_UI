"use client";
import { SettingsMenu } from "@/app/components/zoneComponents/Settings";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Player } from "@lottiefiles/react-lottie-player";
import React from "react";

export function ZoneHeader({ zoneDetails }) {
  const playerRef = React.useRef(null);

  return (
    <div className="mb-32 flex gap-4 px-20">
      <header className="relative tracking-wider text-gray-800 text-3xl font-bold">
        {zoneDetails?.HostedZone?.Name.replace("com.", "com")}
        <Badge className="bg-green-700 text-white absolute" variant="outline">
          Public
        </Badge>
      </header>
      <Player
        ref={playerRef}
        autoplay
        loop={false}
        src="https://lottie.host/788d9555-dd0f-41ae-b90b-280b139c2e53/lMQXt1Hcv9.json"
        style={{ width: "25%" }}
        keepLastFrame
      />
      <SettingsMenu zoneDetails={zoneDetails} />
    </div>
  );
}
