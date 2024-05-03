/* eslint-disable @next/next/no-img-element */
import React from "react";

export default function ContactInfo({
  info = "",
  icon = "",
  label = "",
  textClass,
  labelClass,
}) {
  return (
    <div className="flex items-center gap-3 ">
      <div className="min-w-[19px] max-w-[19px]">
        <img className="w-full" src={icon} alt="icon" />
      </div>
      <div className="h-min flex flex-col justify-center gap-2">
        <h1
          className={`${labelClass} text-secondary-white leading-[0.22] font-normal`}
        >
          {label}
        </h1>
        <span
          className={`${textClass} text-primary-white leading-[1.22] font-semibold`}
        >
          {info}
        </span>
      </div>
    </div>
  );
}
