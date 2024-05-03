import React from "react";
import PerformanceTestCard from "@/components/PerformanceTestCard";
import { getPerfTests } from "@/services/blog";

export default async function PerfTest() {
  const pTests = await getPerfTests();

  return (
    <>
      <div className="w-full mt-12 grid grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 max-sm:px-12 gap-12 mb-6">
        {pTests.map((b, index) => (
          <PerformanceTestCard
            key={index + Math.random() * 1000}
            className={"h-full black-footer"}
            blog={b}
          />
        ))}
      </div>
    </>
  );
}
