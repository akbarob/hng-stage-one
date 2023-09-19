"use client";
import Image from "next/image";
import React from "react";

export default function ImageCard() {
  return (
    <div className="relative w-[300px] h-[300px]">
      <Image src="/images/1.jpg" fill alt="" objectFit="" />
    </div>
  );
}
