import { API_URL } from './config'
import { getJSON } from './helpers'
import { RES_PER_PAGE } from './config'
export const state = {
	recipe: {},
	search: {
		query: '',
		results: [],
		resultsPerPage: RES_PER_PAGE,
	},
}

export const loadRecipe = async id => {
	try {
		const data = await getJSON(`${API_URL}${id}`)
		const { recipe } = data.data

		state.recipe = {
			id: recipe.id,
			publisher: recipe.publisher,
			ingredients: recipe.ingredients,
			image: recipe.image_url,
			sourceUrl: recipe.source_url,
			title: recipe.title,
			servings: recipe.servings,
			cookingTime: recipe.cooking_time,
		}
	} catch (error) {
		throw error
	}
}

export const loadSearchResults = async query => {
	try {
		state.search.query = query
		const data = await getJSON(`${API_URL}?search=${query}`)

		state.search.results = data.data.recipes.map(rec => {
			return { id: rec.id, publisher: rec.publisher, image: rec.image_url, title: rec.title }
		})
	} catch (error) {
		throw error
	}
}

export const getSearchResultsPage = page => {
	const start = (page - 1) * state.search.resultsPerPage //0
	const end = page * state.search.resultsPerPage // 9
	return state.search.results.slice(start, end)
}
