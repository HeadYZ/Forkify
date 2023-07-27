import icons from '../../img/icons.svg'
import View from './View'

class ResultsView extends View {
	_parentEl = document.querySelector('.results')
	_errorMessage = 'We could not find that recipe. Please try another one!'

	_generateMarkup() {
		console.log(this._data)
		return this._data.map(this._generateMarkupPreview).join('')
	}
	_generateMarkupPreview(results) {
		return `  
        <li class="preview">
            <a class="preview__link" href="#${results.id}">
               <figure class="preview__fig">
                <img src="${results.image}" alt="${results.title}" />
                </figure>
                <div class="preview__data">
                <h4 class="preview__title">${results.title}</h4>
                <p class="preview__publisher">${results.publisher}</p>
            </div>
            </a>
      </li>`
	}
}

export default new ResultsView()
