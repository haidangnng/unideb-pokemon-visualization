import TypeTag from "@/components/poke-detail/type-tag";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { PokemonDetail } from "@/lib/type/pokemon";
import Image from "next/image";
import SpeciesTab from "@/components/poke-detail/species";
import Stats from "@/components/poke-detail/stats";

const POKE_API_URL = process.env.PUBLIC_POKE_API_URL || "";

const PokemonDetailPage: React.FC = async ({ params }) => {
  const id = (await params).id;

  const dataDetail = await fetch(`${POKE_API_URL}/pokemon/${id}`);
  const dataSpecies = await fetch(`${POKE_API_URL}/pokemon-species/${id}`);
  const pokemonDetail: PokemonDetail = await dataDetail.json();
  const pokemonSpecies: PokemonDetail = await dataSpecies.json();
  const { name, abilities, height, weight, moves, sprites, types } =
    pokemonDetail;

  return (
    <div className="w-full">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/pokemons">Pokemons</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="capitalize">{name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="my-4 flex w-full gap-2 items-start">
        <div className="p-2 flex justify-center items-center flex-col gap-2 w-1/4">
          <div className="p-2 border rounded-md flex justify-center items-center flex-col">
            <div className="flex justify-center items-center">
              <Image
                src={sprites.front_default}
                priority
                alt={name}
                height={200}
                width={200}
              />
            </div>
            <h1 className="text-2xl">{name}</h1>
          </div>

          <div className="flex justify-between w-full items-center gap-2">
            {types.map(({ type }) => (
              <TypeTag key={type.name} type={type.name} />
            ))}
          </div>
        </div>

        <Separator orientation="vertical" />

        <div className="w-full space-y-4">
          <SpeciesTab species={pokemonSpecies} />
          <Stats species={pokemonSpecies} />
        </div>
      </div>
    </div>
  );
};

export default PokemonDetailPage;
