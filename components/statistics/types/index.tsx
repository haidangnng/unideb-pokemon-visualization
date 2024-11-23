"use client";
import { useDimensions } from "@/lib/hooks/useDimensions";

import { useRef, useState } from "react";
import TypeHeatmap from "./type-map";
import TypeStats from "./type-stats";
import { StatDropdown } from "./stats-dropdown";

const TypeStatistic: React.FC = () => {
  const ref = useRef(null);
  const dimensions = useDimensions(ref);
  const [selected, setSelected] = useState<string>("hp");

  return (
    <div className="w-full h-full pt-10 flex flex-col">
      <div
        className=" w-full flex-col gap-2 justify-center items-start flex-1 h-full"
        ref={ref}
      >
        <h1 className="mt-10 text-4xl">How big is your Pokemon?</h1>
        <TypeHeatmap dimensions={dimensions} />
      </div>
      <div
        className=" w-full flex-col gap-2 justify-center items-start flex-1 h-full"
        ref={ref}
      >
        <h1 className="mt-10 text-4xl">How big is your Pokemon?</h1>
        <TypeStats dimensions={dimensions} stat={selected} />
        <StatDropdown selected={selected} setSelectedAction={setSelected} />
      </div>
    </div>
  );
};

export default TypeStatistic;
