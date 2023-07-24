export const state = {
	recipe: {},
}

export const loadRecipe = async id => {
	try {
		const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`)
		const data = await res.json()
		if (!res.ok) throw new Error(data.message)

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
		console.error(error)
	}
}
