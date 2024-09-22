import type { PageServerLoad } from './$types';
import { API_POKEMON_SPRITES_URL, API_POKEMON_URL } from '$env/static/private';
import type { NameAPIResource } from '@/type/common';
import type { PokemonDetail } from '@/type/pokemon';

export const load: PageServerLoad = async ({ params }) => {
	try {
		const response = await fetch(`${API_POKEMON_URL}/pokemon`);
		const { results } = await response.json();
		const pokemonList: Array<PokemonDetail> = await Promise.all(
			results.map((item: NameAPIResource) => fetch(item.url))
		)
			.then(async (values) => {
				const parsedValue: Array<PokemonDetail> = await Promise.all(
					values.map((val) => val.json())
				).catch(() => {
					console.log('error parsing');
					return [];
				});

				return parsedValue.map((item) => ({
					...item,
					sprites: `${API_POKEMON_SPRITES_URL}/${item.id}.png`
				}));
			})
			.catch((e) => {
				console.log('e', e);
				return [];
			});

		return {
			pokemonList
		};
	} catch (e) {
		console.log('e', e);
		return {
			pokemonList: []
		};
	}
};
