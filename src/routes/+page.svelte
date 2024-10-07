<script lang="ts">
	import TypeChord from './_components/type-chord.svelte';

	import ColorPie from './_components/color-pie.svelte';
</script>

<div class="flex justify-center items-center">
	<div class="flex justify-center items-center flex-col">
		<h1>Type Chord</h1>
		<TypeChord />
	</div>

	<div class="flex justify-center items-center flex-col">
		<h1>Colors</h1>
		<ColorPie />
	</div>
</div>
