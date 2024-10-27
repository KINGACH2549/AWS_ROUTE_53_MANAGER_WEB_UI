"use client";

import { Player } from "@lottiefiles/react-lottie-player";

export default function SiteNotSupported() {
  return (
    <>
      <div className="condition2 max-w-[850px] p-8 flex flex-col items-center justify-center">
        <Player
          src="https://lottie.host/a9313aa3-7acc-4caf-afb3-9c4613783f2a/JTwwtOMliH.json"
          autoplay
          loop
        />
        <p className="text-md" style={{ fontSize: "1.4rem" }}>
          Currently this site does not support this device type. You can view
          our site in Desktop mode for now
        </p>
      </div>
    </>
  );
}
