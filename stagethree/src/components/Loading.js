import React from "react";
import { Vortex } from "react-loader-spinner";
export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center w-full h-screen">
      <Vortex
        visible={true}
        height="80"
        width="80"
        ariaLabel="vortex-loading"
        wrapperStyle={{}}
        wrapperClass="vortex-wrapper"
        colors={["red", "green", "blue", "yellow", "orange", "purple"]}
      />
    </div>
  );
}
