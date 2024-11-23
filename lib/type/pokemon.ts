type PokemonPreview = NamedAPIResource;

type PhysicalStat = {
  height: number;
  weight: number;
  name: string;
};

type NamedAPIResource = {
  name: string;
  url: string;
};

type PokemonAbility = {
  is_hidden: boolean;
  slot: number;
  ability: NamedAPIResource;
};

type PokemonType = {
  slot: number;
  type: NamedAPIResource;
};

type PokemonTypePast = {
  types: PokemonType[];
  generation: NamedAPIResource;
};

type PokemonMoveVersion = {
  move_learn_method: NamedAPIResource;
  version_group: NamedAPIResource;
  level_learned_at: number;
};

type PokemonHeldItem = {
  item: NamedAPIResource;
  version_details: PokemonHeldItemVersion[];
};

type PokemonHeldItemVersion = {
  version: NamedAPIResource;
  rarity: number;
};

type PokemonMove = {
  move: NamedAPIResource;
  version_group_details: PokemonMoveVersion[];
};

type PokemonStat = {
  stat: NamedAPIResource;
  effort: number;
  base_stat: number;
};
type PokemonSprites = {
  front_default: string;
  front_shiny: string;
  front_female: string;
  front_shiny_female: string;
  back_default: string;
  back_shiny: string;
  back_female: string;
  back_shiny_female: string;
};

type VersionGameIndex = {
  game_index: number;
  version: NamedAPIResource;
};

type PokemonCries = {
  latest: string;
  legacy: string;
};

type PokemonDetail = {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;
  abilities: PokemonAbility[];
  forms: NamedAPIResource;
  game_indicies: VersionGameIndex;
  held_items: PokemonHeldItem;
  location_area_encounters: string;
  moves: PokemonMove[];
  past_types: PokemonTypePast;
  sprites: PokemonSprites;
  cries: PokemonCries;
  species: NamedAPIResource;
  stats: PokemonStat;
  types: PokemonType[];
};

export type {
  PokemonPreview,
  PokemonCries,
  PokemonStat,
  PokemonMove,
  PokemonHeldItemVersion,
  PokemonType,
  PokemonAbility,
  PokemonDetail,
  PhysicalStat,
};
