import { API_URL } from './config'
import { getJSON } from './helpers'

export const state = {
	recipe: {},
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
