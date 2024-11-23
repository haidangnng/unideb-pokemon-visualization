"use client";
import { useDimensions } from "@/lib/hooks/useDimensions";
import PhysicalStats from "./physical";
import { useRef } from "react";

const StatsStatistics: React.FC = () => {
  const ref = useRef(null);
  const dimensions = useDimensions(ref);

  return (
    <div className="w-full h-full pt-10 flex flex-col">
      <div
        className=" w-full flex gap-2 justify-center items-start flex-1"
        ref={ref}
      >
        <h1 className="mt-10 text-4xl">How big is your Pokemon?</h1>
        <PhysicalStats dimensions={dimensions} />
      </div>
      <div
        className="h-full w-full flex gap-2 justify-center items-start flex-1"
        ref={ref}
      >
        <h1 className="mt-10 text-4xl">How strong is your Pokemon?</h1>
        <PhysicalStats dimensions={dimensions} />
      </div>
    </div>
  );
};

export default StatsStatistics;
