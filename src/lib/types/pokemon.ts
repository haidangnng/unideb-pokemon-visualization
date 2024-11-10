export type PokemonName = {
	english: string;
	japanese: string;
	chinese: string;
	french: string;
};

export type PokemonTypes = Array<string>;

export type PokemonBaseStat = {
	hp: number;
	attack: number;
	defense: number;
	sp_attack: number;
	sp_defense: number;
	speed: number;
};

export type PokemonEvo = {
	prev?: [string, string];
	next?: [string, string];
};

export type PokemonProfile = {
	height: string;
	weight: string;
	egg?: Array<string>;
	ability: Array<Array<string>>;
	gender: string;
};

export type PokemonImg = {
	sprite: string;
	thumbnail: string;
	hires: string;
};

export type Pokemon = {
	id: number;
	name: PokemonName;
	type: PokemonTypes;
	evolution: PokemonEvo;
	profile: PokemonProfile;
	base?: PokemonBaseStat;
	species: string;
	description: string;
	image: PokemonImg;
};
