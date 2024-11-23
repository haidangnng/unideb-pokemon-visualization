// TODO: weight, height
import * as d3 from "d3";
import physicalStats from "@/lib/data/pokemonPhysic.json";
import { AxisLeft } from "../AxisLeft";
import { AxisBottom } from "../AxisBottom";
import { useCallback, useMemo, useRef, useState } from "react";
const MARGIN = { top: 60, right: 60, bottom: 60, left: 60 };

type ReceivedProps = {
  dimensions: {
    width: number;
    height: number;
  };
};

export const PhysicalStats = ({
  dimensions: { width, height },
}: ReceivedProps) => {
  const ref = useRef(null);
  const [zoomTransform, setZoomTransform] = useState<d3.ZoomTransform>(
    d3.zoomIdentity,
  );
  // Layout. The div size is set by the given props.
  // The bounds (=area inside the axis) is calculated by substracting the margins
  const boundsWidth = width - MARGIN.right - MARGIN.left;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  // Scales
  const yScale = d3.scaleLinear().domain([0, 10]).range([boundsHeight, 0]);
  const xScale = d3.scaleLinear().domain([0, 10]).range([0, boundsWidth]);

  const xZoomScale = useMemo(
    () => zoomTransform.rescaleX(xScale),
    [xScale, zoomTransform],
  );
  const yZoomScale = useMemo(
    () => zoomTransform.rescaleX(yScale),
    [yScale, zoomTransform],
  );

  // Build the shapes
  const allShapes = physicalStats.map((d, i) => {
    return (
      <circle
        key={i}
        r={5}
        cx={xScale(d.height / 100)}
        cy={yScale(d.weight / 1000)}
        opacity={1}
        stroke="#cb1dd1"
        fill="#cb1dd1"
        fillOpacity={0.2}
        strokeWidth={1}
      />
    );
  });

  return (
    <svg width={width} height={height} ref={ref}>
      <g
        width={boundsWidth}
        height={boundsHeight}
        transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
      >
        {/* Y axis */}
        <AxisLeft yScale={yZoomScale} pixelsPerTick={40} width={boundsWidth} />

        {/* X axis, use an additional translation to appear at the bottom */}
        <g transform={`translate(0, ${boundsHeight})`}>
          <AxisBottom
            xScale={xZoomScale}
            pixelsPerTick={40}
            height={boundsHeight}
          />
        </g>

        {allShapes}
      </g>
    </svg>
  );
};

export default PhysicalStats;
