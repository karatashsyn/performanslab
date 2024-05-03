"use client";
import React from "react";
import ReactPlayer from "react-player";

export default function Player({ url }) {
  return <ReactPlayer url={url} controls />;
}
