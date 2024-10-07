<script lang="ts">
	import * as d3 from 'd3';
	import typesData from '$lib/mock/types-chord.json';
	import {onMount} from 'svelte';

	let container: HTMLDivElement;
	const {names, value: data} = typesData;
	const colors = [
		'#A8A77A', // normal
		'#C22E28', // fighting
		'#A98FF3', // flying
		'#A33EA1', // poison
		'#E2BF65', // ground
		'#B6A136', // rock
		'#A6B91A', // bug
		'#735797', // ghost
		'#B7B7CE', // steel
		'#EE8130', // fire
		'#6390F0', // water
		'#7AC74C', // grass
		'#F7D02C', // electric
		'#F95587', // psychic
		'#96D9D6', // ice
		'#6F35FC', // dragon
		'#705746', // dark
		'#D685AD' // fairy
	];
	const width = 300,
		height = 300;

	const outerRadius = Math.min(width, height) * 0.5 - 60;
	const innerRadius = outerRadius - 10;

	const draw = () => {
		// empty vis div
		d3.select(container).html(null);

		// CHORD
		const chord = d3.chord().padAngle(0.05).sortSubgroups(d3.descending).sortChords(d3.descending);

		// ARC
		const arc = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);

		// RIBBON
		const ribbon = d3
			.ribbon()
			.radius(innerRadius - 1)
			.padAngle(0.005);

		// COLOR
		const color = d3.scaleOrdinal(names, colors);

		const svg = d3
			.select(container)
			.append('svg')
			.attr('width', width)
			.attr('height', height)
			.attr('viewBox', [-width / 2, -height / 2, width, height])
			.attr('style', 'width: 100%; height: auto; font: 10px sans-serif;');

		const chords = chord(data);

		const group = svg.append('g').selectAll().data(chords.groups).join('g');

		const onMouseOver = (selected) => {
			group
				.filter((d) => {
					return d.index !== selected.index;
				})
				.style('opacity', 0.3);

			svg
				.selectAll('.chord')
				.filter((d) => d.source.index !== selected.index)
				.style('opacity', 0.3);
		};

		const onMouseOut = () => {
			group.style('opacity', 1);
			svg.selectAll('.chord').style('opacity', 1);
		};

		console.log('chords', chords);

		// GROUP
		group
			.append('path')
			.attr('fill', (d) => color(names[d.index]))
			.attr('d', (d) =>
				arc({
					innerRadius,
					outerRadius,
					startAngle: d.startAngle,
					endAngle: d.endAngle
				})
			)
			.on('mouseover', onMouseOver)
			.on('mouseout', onMouseOut);

		const getTextAngle = ({startAngle, endAngle}: d3.ChordGroup): number =>
			(startAngle + endAngle) / 2;

		// GROUP NAME
		group
			.append('text')
			// .each((d) => {
			// 	console.log('text', d);
			// 	d.angle = (d.startAngle + d.endAngle) / 2;
			// })
			.attr('dy', '0.15em')
			.attr('font-size', '0.5em')
			.attr(
				'transform',
				(d) =>
					`
					rotate(${(getTextAngle(d) * 180) / Math.PI - 90})
					translate(${innerRadius + 26})
					${getTextAngle(d) > Math.PI ? 'rotate(180)' : ''}
					`
			)
			.attr('text-anchor', (d) => (getTextAngle(d) > Math.PI ? 'end' : null))
			.text((d) => names[d.index]);

		// RIBBON
		svg
			.append('g')
			.attr('fill-opacity', 0.67)
			.selectAll('path')
			.data(chords)
			.join('path')
			.attr('class', 'chord')
			.attr('fill', (d) => color(names[d.source.index]))
			.attr('d', ribbon);
		// .on('mouseover', (d) => {
		// 	console.log('MOUSSEEE', d.source);
		// 	return onMouseOver(d);
		// })
		// .on('mouseout', onMouseOut);
	};

	onMount(() => {
		draw();
		window.addEventListener('rezize', draw);
		return () => {
			window.removeEventListener('rezize', draw);
		};
	});
</script>

<div id="types-chord" bind:this={container} />
