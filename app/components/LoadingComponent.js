"use client";
import { LoaderCircle } from "lucide-react";

export default function LoadingComponent() {
  return (
    <>
      {/* <Player
        src="https://lottie.host/963c5b27-02b0-49ce-893a-1ce42524b408/6cAalHT2Ty.json"
        autoplay
        loop
        speed={0.5}
        style={{ width: "10%" }}
      /> */}
      <LoaderCircle height={100} width={100} className="loader" />
      {/* <p className="loader">Loading...</p> */}
    </>
  );
}
