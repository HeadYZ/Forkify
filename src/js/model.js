import { API_URL, RES_PER_PAGE, KEY } from './config'
import { getJSON, sendJSON } from './helpers'

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
const createRecipeObject = data => {
	const { recipe } = data.data
	return {
		id: recipe.id,
		publisher: recipe.publisher,
		ingredients: recipe.ingredients,
		image: recipe.image_url,
		sourceUrl: recipe.source_url,
		title: recipe.title,
		servings: recipe.servings,
		cookingTime: recipe.cooking_time,
		...(recipe.key && { key: recipe.key }),
	}
}
export const loadRecipe = async id => {
	try {
		const data = await getJSON(`${API_URL}${id}`)

		state.recipe = createRecipeObject(data)

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

export const uploadRecipe = async newRecipe => {
	try {
		const ingredients = Object.entries(newRecipe)
			.filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
			.map(ing => {
				const ingArr = ing[1].replaceAll(' ', '').split(',')
				if (ingArr.length !== 3) throw new Error('Wrong ingredient format! Please use the correct format :)')

				const [quantity, unit, description] = ingArr
				return { quantity: quantity ? +quantity : null, unit, description }
			})
		const recipe = {
			publisher: newRecipe.publisher,
			image_url: newRecipe.image,
			source_url: newRecipe.sourceUrl,
			title: newRecipe.title,
			servings: +newRecipe.servings,
			cooking_time: +newRecipe.cookingTime,
			ingredients,
		}
		const data = await sendJSON(`${API_URL}?key=${KEY}`, recipe)
		state.recipe = createRecipeObject(data)
		addBookmark(state.recipe)
	} catch (err) {
		throw err
	}
}
