import React from "react";

export default function GradientPage({
  topEnabled = true,
  bottomEnabled = true,
  children,
  bg,
}) {
  return (
    <div style={{ background: bg }} className="relative ww">
      <div
        className={`${
          !topEnabled ? "hidden" : ""
        } absolute left-0 right-0 top-0 h-[100vh]  z-[5]`}
        style={{
          background:
            "linear-gradient(180deg, rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%)",
        }}
      ></div>
      <div
        className={`${
          !bottomEnabled ? "hidden" : ""
        } absolute left-0 right-0 bottom-0 h-[100vh]  z-[5]`}
        style={{
          background:
            "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 100%)",
        }}
      ></div>
      <div className=" relative z-10 left-0 right-0 top-0 h-auto">
        {children}
      </div>
    </div>
  );
}
