<script lang="ts">
  import type {Pokemon} from '$lib/types/pokemon';
  import {Button} from '../ui/button';

  type PropsType = {
    pokemonList: Pokemon[];
    onSelectPokemon: (id: number) => void;
  };

  const {pokemonList, onSelectPokemon}: PropsType = $props();
</script>

<!-- <div class="flex h-full flex-1 flex-col items-center justify-center overflow-y-scroll bg-white p-2"> -->
<div class="">
  {#each pokemonList as pokemon}
  <Button class="" onclick={()=> onSelectPokemon(pokemon.id)}>
    {pokemon.name.english}
  </Button>
  {/each}
</div>
