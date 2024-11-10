import * as d3 from 'd3';
import { AxisPosition, type AddAxisProps } from './types/d3-type';

const callAxis = (pos: AxisPosition, scale: d3.ScaleBand<string>) => {
	switch (pos) {
		case AxisPosition.TOP:
			return d3.axisTop(scale);
		case AxisPosition.BOTTOM:
			return d3.axisBottom(scale);
		case AxisPosition.LEFT:
			return d3.axisLeft(scale);
		case AxisPosition.RIGHT:
			return d3.axisRight(scale);
	}
};

const addAxis = ({ pos, target, scale, attributes }: AddAxisProps): void => {
	const axis = target.append('g');

	for (const i of attributes) {
		axis.attr(i[0], i[1]);
	}

	axis.call(() => callAxis(pos, scale));
};

export { addAxis };
