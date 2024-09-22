import type { PageServerLoad } from './$types';
import {
	API_POKEMON_SPRITES_URL,
	API_POKEMON_TYPE_URL,
	API_POKEMON_URL
} from '$env/static/private';
import type { PokemonDetail, PokemonStat, PokemonType } from '@/type/pokemon';
import { error } from '@sveltejs/kit';

const mappedPokemonStats = (stats: PokemonStat[]): Record<string, number> => {
	return stats.reduce((acc: Record<string, number>, cur) => {
		return {
			...acc,
			[cur.stat.name]: cur.base_stat / 10
		};
	}, {});
};

const fetchPokemonTypes = async (
	types: PokemonType[]
): Promise<
	Array<{
		name: string;
		url: string;
	}>
> => {
	const detailTypeListResults = await Promise.all(types.map(({ type }) => fetch(type.url)));
	const detailTypeList = await Promise.all(
		detailTypeListResults.map((detailList) => detailList.json())
	);
	return detailTypeList.map((type) => ({
		name: type.name,
		url: `${API_POKEMON_TYPE_URL}/${type.id}.png`
	}));
};

export const load: PageServerLoad = async ({ params }) => {
	try {
		const { id } = params;
		const response = await fetch(`${API_POKEMON_URL}/pokemon/${id}`);
		const pokemonDetail: PokemonDetail = await response.json();
		const { stats } = pokemonDetail;

		const types = (await fetchPokemonTypes(pokemonDetail.types)) || [];

		return {
			...pokemonDetail,
			types,
			stats: mappedPokemonStats(stats),
			sprites: `${API_POKEMON_SPRITES_URL}/${pokemonDetail.id}.png`
		};
	} catch (e) {
		console.log(e);
		error(500, 'Something went wrong');
	}
};
