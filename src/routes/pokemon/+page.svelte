<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import type { PokemonDetail } from '@/type/pokemon';

	export let data;
	const pokemonList: Array<PokemonDetail> = data.pokemonList;
</script>

<div class="flex justify-center items-center flex-wrap gap-4">
	{#each pokemonList as pokemon}
		<a
			href={`/pokemon/${pokemon.name}`}
			class="w-full sm:w-1/2 md:w-1/3 lg:w-1/6 flex justify-center items-center"
		>
			<Card.Root class="w-fit flex flex-col justify-center items-center">
				<Card.Header>
					<Card.Title>{pokemon.name}</Card.Title>
				</Card.Header>
				<Card.Content>
					<img src={pokemon.sprites} alt={pokemon.name} height="100" width="100" />
				</Card.Content>
			</Card.Root>
		</a>
	{/each}
</div>
