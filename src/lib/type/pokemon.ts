import type { NameAPIResource } from './common';

export type PokemonAbilities = {
	is_hidden: boolean;
	slot: number;
	ability: NameAPIResource;
};

export type PokemonType = {
	slot: number;
	type: NameAPIResource;
};

export type PokemonTypePast = {
	item: NameAPIResource;
	types: PokemonType[];
};

export type PokemonHeldItem = {
	item: NameAPIResource;
	version_details: PokemonHeldItemVersion;
};

export type PokemonHeldItemVersion = {
	version: NameAPIResource;
	rarity: number;
};

export type PokemonMoveVersion = {
	move_learn_method: NameAPIResource;
	version_group: NameAPIResource;
	level_learned_at: number;
};

export type PokemonMove = {
	move: NameAPIResource;
	version_group_details: PokemonMoveVersion[];
};

export type PokemonStat = {
	stat: NameAPIResource;
	effort: number;
	base_stat: number;
};

export type PokemonSprites = {
	front_default: string;
	front_shiny: string;
	front_female: string;
	front_shiny_female: string;
	back_default: string;
	back_shiny: string;
	back_female: string;
	back_shiny_female: string;
};

export type PokemonDetail = {
	id: number;
	name: string;
	base_experience: number;
	height: number;
	is_default: boolean;
	order: number;
	weight: number;
	abilities: PokemonAbilities[];
	forms: NameAPIResource;
	held_items: PokemonHeldItem[];
	location_area_encounters: string;
	moves: PokemonMove[];
	past_types: PokemonTypePast[];
	species: NameAPIResource;
	stats: PokemonStat[];
	types: PokemonType[];
	sprites: string;
};
