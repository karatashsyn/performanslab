import React from "react";

export default function PaddedContainer({ children, className }) {
  return (
    <div
      className={`${className} max-w-[100vw] flex justify-center overflow-x-hidden`}
    >
      <div className="px-8 max-lg:px-6 w-full max-w-[1440px]">{children}</div>
    </div>
  );
}
