import { useEffect, useMemo, useRef } from "react";
import * as d3 from "d3";
import typeStats from "@/lib/data/pokemonStatsTypes.json";

const MARGIN = { top: 90, right: 30, bottom: 60, left: 120 };
const X_LIMITS = [0, 200];
const X_SCALE_PADDING = 20;
const DENSITY_BAND_HEIGHT = 80;

type DataType = {
  key: string;
  values: number[];
};

type RidgelineProps = {
  dimensions: {
    width: number;
    height: number;
  };
  stat: string;
};

const TypeStats: React.FC<RidgelineProps> = ({
  dimensions: { width, height },
  stat,
}) => {
  const axesRef = useRef(null);
  const boundsWidth = width - MARGIN.right - MARGIN.left;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  const data = useMemo(() => {
    const typeStatData = typeStats as Record<string, Record<string, number[]>>;
    // data: { key: string; values: number[] }[];
    const res = Object.keys(typeStatData).reduce(
      (acc: DataType[], cur: string) => {
        return [
          ...acc,
          {
            key: cur,
            values: typeStatData[cur][stat],
          },
        ];
      },
      [],
    );
    return res;
  }, [stat]);

  const allGroups = useMemo(
    () => data.map((group: DataType) => group.key),
    [data],
  );

  const xScale = useMemo(() => {
    return d3.scaleLinear().domain(X_LIMITS).range([20, boundsWidth]).nice();
  }, [boundsWidth]);

  // Render the X axis using d3.js, not react
  useEffect(() => {
    const svgElement = d3.select(axesRef.current);
    svgElement.selectAll("*").remove();
    const xAxisGenerator = d3.axisBottom(xScale);
    svgElement
      .append("g")
      .attr(
        "transform",
        "translate(0," + (boundsHeight + X_SCALE_PADDING) + ")",
      )
      .call(xAxisGenerator);
  }, [xScale, boundsHeight]);

  // Compute kernel density estimation for each groups
  const densities = useMemo(() => {
    const kde = kernelDensityEstimator(
      kernelEpanechnikov(10),
      xScale.ticks(40),
    );
    return data.map((group) => {
      return {
        key: group.key,
        density: kde(group.values) as [number, number][],
      };
    });
  }, [xScale, data]);

  const densityMax = Math.max(
    ...densities.map((group) => Math.max(...group.density.map((y) => y[1]))),
  );

  // Create a Y scale for each density
  const yScale = d3
    .scaleLinear()
    .domain([0, densityMax])
    .range([DENSITY_BAND_HEIGHT, 0]);

  // Create the Y axis for groups
  const groupScale = d3
    .scaleBand()
    .domain(allGroups)
    .range([0, boundsHeight])
    .paddingInner(1);

  const paths = useMemo(() => {
    const lineGenerator = d3
      .line()
      .x((d) => xScale(d[0]))
      .y((d) => yScale(d[1]))
      .curve(d3.curveBasis);

    return densities.map((group, i) => {
      const path = lineGenerator(group.density) || undefined;
      return (
        <path
          key={i}
          d={path}
          transform={
            "translate(0," + (groupScale(group.key) - DENSITY_BAND_HEIGHT) + ")"
          }
          fill="purple"
          opacity={0.8}
          stroke="black"
          strokeWidth={0.3}
          strokeLinejoin="round"
        />
      );
    });
  }, [densities, groupScale, xScale, yScale]);

  const labels = useMemo(() => {
    return densities.map((group, i) => {
      return (
        <text
          key={i}
          x={-5}
          y={groupScale(group.key)}
          textAnchor="end"
          dominantBaseline="middle"
          fontSize={10}
        >
          {group.key}
        </text>
      );
    });
  }, [densities, groupScale]);

  return (
    <svg width={width} height={height}>
      <g
        width={boundsWidth}
        height={boundsHeight}
        transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
      >
        {paths}
        {labels}
      </g>
      <g
        width={boundsWidth}
        height={boundsHeight}
        ref={axesRef}
        transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
      />
    </svg>
  );
};

// Function to compute density
function kernelDensityEstimator(kernel: (v: number) => number, X: number[]) {
  return function (V: number[]) {
    return X.map((x) => [x, d3.mean(V, (v) => kernel(x - v))]);
  };
}

function kernelEpanechnikov(k: number) {
  return function (v: number) {
    return Math.abs((v /= k)) <= 1 ? (0.75 * (1 - v * v)) / k : 0;
  };
}

export default TypeStats;
