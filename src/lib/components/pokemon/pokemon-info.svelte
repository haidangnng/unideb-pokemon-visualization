<script lang="ts">
  import type {Pokemon} from '$lib/types/pokemon';

  type PropsType = {
    selectedPokemon: Pokemon;
  };

  const {selectedPokemon}: PropsType = $props();

  let {
    name: {english: name},
    image: {hires},
    type: types
  } = $derived(selectedPokemon);

  $effect(() => {
    console.log('types', types);
  });
</script>

<div class="flex h-full flex-1 flex-col items-center justify-between gap-4">
  <div class="flex w-full items-center justify-center bg-white p-4">
    {name}
  </div>

  <div class=" w-full flex-1 border-4 border-white p-4">
    <!-- <img alt={name} src={hires} class="aspect-square" /> -->
  </div>

  <div class="flex w-full items-center justify-center bg-white p-4">
    {types.map((type) => type)}
  </div>
</div>
