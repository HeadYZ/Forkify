import 'core-js/actual'
import 'regenerator-runtime/runtime'
import * as model from './model'
import recipeView from './views/recipeView'

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

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

const init = () => {
	recipeView.addHandlerRender(controlRecipes)
}
init()

// const div = document.querySelector('.search-results')

// div.innerHTML = `<a href='#5ed6604591c37cdc054bcd09'>link1</a><a href='#5ed6604591c37cdc054bcebczzzz'>link2</a>`
