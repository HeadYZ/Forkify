import 'core-js/actual'
import 'regenerator-runtime/runtime'
import * as model from './model'
import recipeView from './views/recipeView'
import searchView from './views/searchView'
import resultsView from './views/resultsView'
import paginationView from './views/paginationView'

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

		resultsView.render(model.getSearchResultsPage())

		paginationView.render(model.state.search)
	} catch (err) {}
}

const controlPagination = goToPage => {
	// 1) Render NEW Results
	resultsView.render(model.getSearchResultsPage(goToPage))

	// 2) Render NEW pagination buttons
	paginationView.render(model.state.search)
}

const controlServings = newServings => {
	// Update the recipe servings (in state)
	model.updateServings(newServings)
	// Update the recipe view
	recipeView.render(model.state.recipe)
}

const init = () => {
	recipeView.addHandlerRender(controlRecipes)
	searchView.addHandlerSearch(controlSearchResults)
	paginationView.addHandlerClick(controlPagination)
	recipeView.addHandlerUpdateServings(controlServings)
}
init()
