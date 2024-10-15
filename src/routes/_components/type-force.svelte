<script lang="ts">
	import * as d3 from 'd3';
	import {onMount} from 'svelte';
	import data from '$lib/mock/types-force.json';

	const pokemonTypeColors = {
		fire: '#FF4500',
		water: '#1E90FF',
		bug: '#6B8E23',
		normal: '#D3D3D3',
		poison: '#A020F0',
		electric: '#FFFF00',
		ground: '#8B4513',
		fairy: '#FFC0CB',
		fighting: '#FF8C00',
		psychic: '#FF00FF',
		grass: '#00FF00',
		dragon: '#00008B',
		rock: '#696969',
		dark: '#000000',
		ghost: '#4B0082',
		ice: '#ADD8E6',
		steel: '#C0C0C0',
		flying: '#87CEEB'
	};

	const draw = () => {
		// Specify the dimensions of the chart.
		const width = 928;
		const height = 600;

		// Specify the color scale.
		const color = d3.scaleOrdinal(d3.schemeCategory10);

		// The force simulation mutates links and nodes, so create a copy
		// so that re-evaluating this cell produces the same result.
		const links = data.links.map((d) => ({...d}));
		const nodes = data.nodes.map((d) => ({...d}));

		// Create a simulation with several forces.
		const simulation = d3
			.forceSimulation(nodes)
			.force(
				'link',
				d3.forceLink(links).id((d) => d.id)
			)
			.force('charge', d3.forceManyBody())
			.force('center', d3.forceCenter(width / 2, height / 2))
			.on('tick', ticked);

		// Create the SVG container.
		const svg = d3
			.select(container)
			.append('svg')
			.attr('width', width)
			.attr('height', height)
			.attr('viewBox', [0, 0, width, height])
			.attr('style', 'max-width: 100%; height: auto;');

		// Add a line for each link, and a circle for each node.
		const link = svg
			.append('g')
			.attr('stroke', '#999')
			.attr('stroke-opacity', 0.4)
			.selectAll()
			.data(links)
			.join('line')
			.attr('stroke-width', 1.5)
			.attr('stroke', (d) => pokemonTypeColors[d.target.id]);

		const node = svg
			.append('g')
			.attr('stroke-width', 2.5)
			.selectAll()
			.data(nodes)
			.join('circle')
			.attr('r', (d) => Math.sqrt(d.value) * 4)
			.attr('fill', '#fff')
			.attr('class', 'first')
			.attr('stroke', (d) => {
				const split = d.id.split('.');
				if (split.length === 1) {
					return pokemonTypeColors[d.id];
				} else {
					return pokemonTypeColors[split[1]];
				}
			});

		node
			.join('circle')
			.attr('stroke', '#fff')
			.attr('stroke-width', 2.5)
			.attr('r', (d) => Math.sqrt(d.value) * 4)
			.attr('fill', '#fff')
			.attr('class', 'second')
			.attr('stroke', (d) => {
				const split = d.id.split('.');
				if (split.length === 1) {
					return pokemonTypeColors[d.id];
				} else {
					return pokemonTypeColors[split[1]];
				}
			})
			.attr('stroke-dasharray', '20,10');

		node.append('title').text((d) => d.id);

		// Add a drag behavior.
		node.call(d3.drag().on('start', dragstarted).on('drag', dragged).on('end', dragended));

		// Set the position attributes of links and nodes each time the simulation ticks.
		function ticked() {
			link
				.attr('x1', (d) => d.source.x)
				.attr('y1', (d) => d.source.y)
				.attr('x2', (d) => d.target.x)
				.attr('y2', (d) => d.target.y);

			node.attr('cx', (d) => d.x).attr('cy', (d) => d.y);
		}

		// Reheat the simulation when drag starts, and fix the subject position.
		function dragstarted(event) {
			if (!event.active) simulation.alphaTarget(0.3).restart();
			event.subject.fx = event.subject.x;
			event.subject.fy = event.subject.y;
		}

		// Update the subject (dragged node) position during drag.
		function dragged(event) {
			event.subject.fx = event.x;
			event.subject.fy = event.y;
		}

		// Restore the target alpha so the simulation cools after dragging ends.
		// Unfix the subject position now that it’s no longer being dragged.
		function dragended(event) {
			if (!event.active) simulation.alphaTarget(0);
			event.subject.fx = null;
			event.subject.fy = null;
		}

		// When this cell is re-run, stop the previous simulation. (This doesn’t
		// really matter since the target alpha is zero and the simulation will
		// stop naturally, but it’s a good practice.)
		invalidation.then(() => simulation.stop());
	};

	let container: HTMLDivElement;

	onMount(() => {
		draw();
		window.addEventListener('resize', draw);
		return () => {
			window.removeEventListener('resize', draw);
		};
	});
</script>

<div id="container" bind:this={container}></div>
