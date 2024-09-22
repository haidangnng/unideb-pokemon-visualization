<script lang="ts">
	import * as Accordion from '@/components/ui/accordion/index.js';
	import Spider from '@/components/ui/custom-chart/spider.svelte';

	export let el;
	export let data;
	const { types, sprites, name, stats } = data;
	console.log('data', data);
</script>

<div bind:this={el} class="chart"></div>

<div class="flex flex-col justify-center items-center">
	<h1 class="text-3xl uppercase">{name}</h1>
	<img src={sprites} alt={name} height="300" width="300" />
	<div class="flex justify-center items-center gap-2">
		{#each types as type}
			<img alt={type.name} src={type.url} class="" width="100" />
		{/each}
	</div>

	<Accordion.Root>
		<Accordion.Item value="item-1">
			<Accordion.Trigger>Is it accessible?</Accordion.Trigger>
			<Accordion.Content>Yes. It adheres to the WAI-ARIA design pattern.</Accordion.Content>
		</Accordion.Item>
	</Accordion.Root>

	<Spider data={[stats]} features={Object.keys(stats)} />
</div>
