"use client";

import { PokemonPreview } from "@/lib/type/pokemon";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useMemo, useState } from "react";
import PokePagination from "./pagination";
import Image from "next/image";
import Link from "next/link";

const LIMIT = 20 as const;

type ReceiveProps = {
  pokemons: PokemonPreview[];
  spriteURL: string;
  count: number;
};

const PokemonTable: React.FC<ReceiveProps> = ({
  pokemons,
  spriteURL,
  count,
}) => {
  const [offset, setOffset] = useState<number>(0);

  const numPages = useMemo(() => Math.ceil(count / LIMIT), [count]);

  const getPokemonId = (url: string) => {
    const split = url.split("/");
    const id = split[split.length - 2];
    return id;
  };

  const pokemonDisplay = useMemo(() => {
    const start = offset * LIMIT,
      end = (offset + 1) * LIMIT;

    return pokemons.slice(start, end);
  }, [offset, pokemons]);

  return (
    <div className="flex flex-col justify-center items-center w-full h-full gap-4">
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4">
        {pokemonDisplay.map((pokemon: PokemonPreview) => (
          <Link
            href={`/pokemons/${getPokemonId(pokemon.url)}`}
            key={pokemon.name}
          >
            <Card key={pokemon.name}>
              <CardHeader>
                <CardTitle className="text-lg font-semibold capitalize tracking-wide">
                  {pokemon.name}
                </CardTitle>
                <CardDescription>#{getPokemonId(pokemon.url)}</CardDescription>
              </CardHeader>
              <CardContent>
                <Image
                  src={`${spriteURL}${getPokemonId(pokemon.url)}.png`}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      <PokePagination numPages={numPages} currentPage={offset / LIMIT} />
    </div>
  );
};

export default PokemonTable;
