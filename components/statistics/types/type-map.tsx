import { useMemo, useRef, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import * as d3 from "d3";
import data from "@/lib/data/pokemonTypes.json";
import { cn } from "@/lib/utils";

const MARGIN = { top: 10, right: 10, bottom: 30, left: 30 };

type HeatmapProps = {
  dimensions: {
    width: number;
    height: number;
  };
};

const TypeHeatmap: React.FC<HeatmapProps> = ({
  dimensions: { width, height },
}) => {
  const [hoveredCell, setHoveredCell] = useState<{
    first_type: string;
    second_type: string;
    number: number;
  } | null>(null);

  const ref = useRef(null);
  // bounds = area inside the axis
  const boundsWidth = width - MARGIN.right - MARGIN.left;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  // groups
  const allGroups = useMemo(
    () => [...new Set(data.sort().map((d) => d.second_type))],
    [],
  );

  // x and y scales
  const xScale = useMemo(() => {
    return d3
      .scaleBand()
      .range([0, boundsWidth])
      .domain(allGroups)
      .padding(0.01);
  }, [allGroups, boundsWidth]);

  const yScale = useMemo(() => {
    return d3
      .scaleBand()
      .range([boundsHeight, 0])
      .domain(allGroups)
      .padding(0.01);
  }, [allGroups, boundsHeight]);

  const [min, max] = d3.extent(data.map((d) => d.number));

  if (!min || !max) {
    return null;
  }

  // Color scale
  const colorScale = d3
    .scaleSequential<string>()
    .interpolator(d3.interpolateInferno)
    .domain([min, max])
    .range(["#97f0f1", "#083e3f"]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const allRects = useMemo(() => {
    const rects = data.map((d, i) => {
      const isActive = hoveredCell === null || hoveredCell === d;

      const { first_type, second_type } = d;
      const isSame = first_type === second_type;
      return (
        <Tooltip key={i}>
          <TooltipTrigger asChild>
            <rect
              className={cn("cursor-pointer", {
                "opacity-50": !isActive,
                "opacity-100": isActive,
              })}
              r={4}
              x={xScale(d.first_type)}
              y={yScale(d.second_type)}
              width={xScale.bandwidth()}
              height={yScale.bandwidth()}
              opacity={1}
              fill={colorScale(d.number)}
              rx={5}
              onMouseEnter={() => {
                setHoveredCell(d);
              }}
              onMouseLeave={() => setHoveredCell(null)}
              stroke={"white"}
            />
          </TooltipTrigger>
          <TooltipContent>
            {isSame ? (
              <div className="flex flex-col gap-2 text-md">
                <p>Type: {d.first_type}</p>
                <p>Count: {d.number}</p>
              </div>
            ) : (
              <div className="flex flex-col gap-2 text-md">
                <p>First type: {d.first_type}</p>
                <p>Second type: {d.second_type}</p>
                <p>Count: {d.number}</p>
              </div>
            )}
          </TooltipContent>
        </Tooltip>
      );
    });
    return rects;
  }, [colorScale, xScale, yScale]);

  const xLabels = allGroups.map((name, i) => {
    const xPos = xScale(name) ?? 0;
    return (
      <text
        key={i}
        x={xPos + xScale.bandwidth() / 2}
        y={boundsHeight + 10}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={10}
      >
        {name}
      </text>
    );
  });

  const yLabels = allGroups.map((name, i) => {
    const yPos = yScale(name) ?? 0;
    return (
      <text
        key={i}
        x={-5}
        y={yPos + yScale.bandwidth() / 2}
        textAnchor="end"
        dominantBaseline="middle"
        fontSize={10}
      >
        {name}
      </text>
    );
  });

  return (
    <TooltipProvider>
      <div ref={ref}>
        <svg width={width} height={height}>
          <g
            width={boundsWidth}
            height={boundsHeight}
            transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
          >
            {xLabels}
            {yLabels}
            {allRects}
          </g>
        </svg>
      </div>
    </TooltipProvider>
  );
};

export default TypeHeatmap;
