import 'core-js/actual'
import 'regenerator-runtime/runtime'
import * as model from './model'
import recipeView from './views/recipeView'
import searchView from './views/searchView'
import resultsView from './views/resultsView'

const controlRecipes = async () => {
	try {
		const id = window.location.hash.slice(1)
		if (!id) return
		recipeView.renderSpinner()
		//1)) Loading recipe
		await model.loadRecipe(id)
		//2) Rendering recipe
		recipeView.render(model.state.recipe)
	} catch (err) {
		recipeView.renderError()
	}
}

const controlSearchResults = async () => {
	try {
		// 1) get search query
		const query = searchView.getQuery()
		if (!query) return

		// 2) load search results
		await model.loadSearchResults(query)
	
		resultsView.render(model.getSearchResultsPage(1))
	} catch (err) {}
}
const init = () => {
	recipeView.addHandlerRender(controlRecipes)
	searchView.addHandlerSearch(controlSearchResults)
}
init()
