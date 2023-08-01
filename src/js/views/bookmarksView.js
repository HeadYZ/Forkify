import View from './View'

class BookmarksView extends View {
	_parentEl = document.querySelector('.bookmarks__list')
	_errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it :)'

	addHandlerRender(handler) {
		window.addEventListener('load', handler)
	}
	_generateMarkup() {
		return this._data.map(this._generateMarkupPreview).join('')
	}
	_generateMarkupPreview(results) {
		const id = window.location.hash.slice(1)

		return `  
        <li class="preview">
            <a class="preview__link ${results.id === id ? 'preview__link--active' : ''}" href="#${results.id}">
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

export default new BookmarksView()
