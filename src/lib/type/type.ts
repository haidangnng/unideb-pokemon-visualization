import type { NameAPIResource } from './common';

export type TypeRelations = {
	no_damage_to: NameAPIResource;
	half_damage_to: NameAPIResource;
	double_damage_to: NameAPIResource;
	no_damage_from: NameAPIResource;
	half_damage_from: NameAPIResource;
	double_damage_from: NameAPIResource;
};

export type TypeRelationsPast = {
	generation: NameAPIResource;
	damage_relations: TypeRelations;
};

export type Pokemon = {
	slot: number;
	pokemon: NameAPIResource;
};

export type Type = {
	id: number;
	name: string;
	damage_relations: TypeRelations;
	past_damage_relations: TypeRelationsPast;
	generation: NameAPIResource;
	move_damge_class: NameAPIResource;
	pokemon: Pokemon;
	moves: NameAPIResource;
};
