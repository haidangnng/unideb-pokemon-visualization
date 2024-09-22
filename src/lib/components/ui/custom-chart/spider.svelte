<script lang="ts">
	import { onMount } from 'svelte';
	import * as d3 from 'd3';
	import { capitalize } from '@/utils';
	export let features: Array<string>;
	export let data: Array<Record<string, number>>;

	let vis: HTMLElement;
	let width = 600;
	let height = 600;
	let radialScale = d3.scaleLinear().domain([0, 10]).range([0, 250]);
	let ticks = [2, 4, 6, 8, 10];
	//generate the data

	onMount(() => {
		redraw();
		window.addEventListener('resize', redraw);
	});

	const angleToCoordinate = (angle: number, value: number): { x: number; y: number } => {
		let x = Math.cos(angle) * radialScale(value);
		let y = Math.sin(angle) * radialScale(value);
		return { x: width / 2 + x, y: height / 2 - y };
	};

	const getPathCoordinates = (data_point) => {
		let coordinates = [];
		for (let i = 0; i < features.length; i++) {
			let ft_name = features[i];
			let angle = Math.PI / 2 + (2 * Math.PI * i) / features.length;
			coordinates.push(angleToCoordinate(angle, data_point[ft_name]));
		}
		return coordinates;
	};

	const redraw = (): void => {
		d3.select(vis).html(null);

		let svg = d3.select(vis).append('svg').attr('width', width).attr('height', height);

		let featureData = features.map((f, i) => {
			let angle = Math.PI / 2 + (2 * Math.PI * i) / features.length;
			return {
				name: f,
				angle: angle,
				line_coord: angleToCoordinate(angle, 10),
				label_coord: angleToCoordinate(angle, 10.5)
			};
		});

		svg
			.selectAll('circle')
			.data(ticks)
			.join((enter) =>
				enter
					.append('circle')
					.attr('cx', width / 2)
					.attr('cy', height / 2)
					.attr('fill', 'none')
					.attr('stroke', 'gray')
					.attr('r', (d) => radialScale(d))
			);

		// draw axis line
		svg
			.selectAll('line')
			.data(featureData)
			.join((enter) =>
				enter
					.append('line')
					.attr('x1', width / 2)
					.attr('y1', height / 2)
					.attr('x2', (d) => d.line_coord.x)
					.attr('y2', (d) => d.line_coord.y)
					.attr('stroke', 'black')
			);

		// draw axis label
		svg
			.selectAll('.axislabel')
			.data(featureData)
			.join((enter) =>
				enter
					.append('text')
					.attr('x', (d) => d.label_coord.x)
					.attr('y', (d) => d.label_coord.y)
					.text((d) =>
						d.name
							.split('-')
							.map((i) => capitalize(i))
							.join(' ')
					)
			);

		let line = d3
			.line()
			.x((d) => d.x)
			.y((d) => d.y);
		let colors = ['darkorange', 'gray', 'navy'];

		// draw the path element
		svg
			.selectAll('path')
			.data(data)
			.join((enter) =>
				enter
					.append('path')
					.datum((d) => getPathCoordinates(d))
					.attr('d', line)
					.attr('stroke-width', 3)
					.attr('stroke', (_, i) => colors[i])
					.attr('fill', (_, i) => colors[i])
					.attr('stroke-opacity', 1)
					.attr('opacity', 0.5)
			);
	};
</script>

<div id="vis" bind:this={vis}></div>

<style>
	#vis {
		width: 600px;
		height: 600px;
	}
</style>
