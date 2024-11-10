/* eslint-disable @typescript-eslint/no-explicit-any */
import * as d3 from 'd3';

enum AxisPosition {
	TOP = 'top',
	BOTTOM = 'bottom',
	LEFT = 'left',
	RIGHT = 'right'
}

type Attributes = Array<[string, string | number]>;

type AddAxisProps = {
	target: d3.Selection<SVGElement, unknown, HTMLElement, any>;
	pos: AxisPosition;
	scale: d3.ScaleBand<string>;
	attributes?: Attributes;
};

export { AxisPosition };
export type { AddAxisProps, Attributes };
