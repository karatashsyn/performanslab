/* eslint-disable @next/next/no-img-element */
import React from "react";

export default function NotFound() {
  return (
    <>
      <div className="w-full mt-12 grid grid-cols-4 max-sm:grid-cols-1 max-md:grid-cols-2 max-lg:grid-cols-3 gap-12">
        <h1 className="text-center text-black">
          Aradığınız sayfa bulunamadı..
        </h1>
      </div>
    </>
  );
}
