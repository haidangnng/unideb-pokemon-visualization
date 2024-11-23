import PokemonTable from "@/components/poke-table";

const POKE_API_URL = process.env.PUBLIC_POKE_API_URL || "";
const POKE_SPRITE = process.env.POKE_SPRITE || "";

export default async function Home() {
  const data = await fetch(`${POKE_API_URL}/pokemon?offset=0&limit=-1`);
  const response = await data.json();

  const { results, count } = response;

  return (
    <div className="h-full w-full">
      <PokemonTable spriteURL={POKE_SPRITE} pokemons={results} count={count} />
    </div>
  );
}
