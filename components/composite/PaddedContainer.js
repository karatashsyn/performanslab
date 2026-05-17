import React from "react";

export default function PaddedContainer({ children, className }) {
  return (
    <div
      className={`${className} w-full max-w-full flex justify-center overflow-x-clip`}
    >
      <div className="px-8 max-lg:px-6 w-full max-w-[1440px]">{children}</div>
    </div>
  );
}
