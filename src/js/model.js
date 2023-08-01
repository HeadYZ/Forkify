import { API_URL } from './config'
import { getJSON } from './helpers'
import { RES_PER_PAGE } from './config'
export const state = {
	recipe: {},
	search: {
		query: '',
		results: [],
		page: 1,
		resultsPerPage: RES_PER_PAGE,
	},
	bookmarks: [],
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

		if (state.bookmarks.some(bookmark => bookmark.id === id)) state.recipe.bookmarked = true
		else state.recipe.bookmarked = false
	} catch (error) {
		throw error
	}
}

export const loadSearchResults = async query => {
	try {
		state.search.query = query
		state.search.page = 1
		const data = await getJSON(`${API_URL}?search=${query}`)

		state.search.results = data.data.recipes.map(rec => {
			return { id: rec.id, publisher: rec.publisher, image: rec.image_url, title: rec.title }
		})
		state.search.page = 1
	} catch (error) {
		throw error
	}
}

export const getSearchResultsPage = (page = state.search.page) => {
	state.search.page = page
	const start = (page - 1) * state.search.resultsPerPage //0
	const end = page * state.search.resultsPerPage // 9
	return state.search.results.slice(start, end)
}

export const updateServings = newServings => {
	state.recipe.ingredients.forEach(ing => {
		ing.quantity = (ing.quantity * newServings) / state.recipe.servings

		state.recipe.servings = newServings
	})
}

const persistBookmarks = () => {
	localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks))
}

export const addBookmark = recipe => {
	// Add bookmark
	state.bookmarks.push(recipe)
	// Mark current recipe as bookmark

	state.recipe.bookmarked = true

	persistBookmarks()
}

export const deleteBookmark = id => {
	const index = state.bookmarks.findIndex(el => el.id === id)
	state.bookmarks.splice(index, 1)
	state.recipe.bookmarked = false

	persistBookmarks()
}

const init = () => {
	const storage = localStorage.getItem('bookmarks')

	if (storage) state.bookmarks = JSON.parse(storage)
}

init()
