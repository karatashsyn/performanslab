"use client";
import React from "react";
import dynamic from "next/dynamic";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

export default function Player({ url }) {
  if (!url) return null;
  return <ReactPlayer url={url} controls />;
}
