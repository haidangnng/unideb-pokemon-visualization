<script lang="ts">
	import PokemonInfo from '$lib/components/pokemon/pokemon-info.svelte';
	import PokemonList from '$lib/components/pokemon/pokemon-list.svelte';
	import _pokemonList from '$lib/data/pokedex.json' assert {type: 'json'};
	import type {Pokemon} from '$lib/types/pokemon';

	const pokemonList: Pokemon[] = _pokemonList as Pokemon[];
	let selectedId: number = $state(0);

	let selectedPokemon: Pokemon = $derived(
		pokemonList.find((i) => i.id === selectedId) || pokemonList[0]
	);

	const onSelectPokemon: (id: number) => void = (id) => {
		selectedId = id;
	};
</script>

<div class="flex h-3/4 w-3/4">
	<PokemonInfo {selectedPokemon} />
	<!-- <PokemonList {pokemonList} {onSelectPokemon} /> -->
</div>
