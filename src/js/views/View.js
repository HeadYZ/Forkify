import icons from '../../img/icons.svg'

export default class View {
	_data

	render(data) {
		if (!data || data.length === 0) return this._renderError()

		this._data = data
		const markup = this._generateMarkup()
		this._clear()
		this._parentEl.insertAdjacentHTML('afterbegin', markup)
	}

	_clear() {
		this._parentEl.innerHTML = ''
	}

	renderSpinner() {
		const markup = `
            <div class="spinner">
              <svg>
                <use href="${icons}#icon-loader"></use>
              </svg>
            </div>`

		this._clear()
		this._parentEl.insertAdjacentHTML('afterbegin', markup)
	}

	_renderError(message = this._errorMessage) {
		const markup = `
    <div class="error">
     <div>
      <svg>
        <use href="${icons}#icon-alert-triangle"></use>
      </svg>
     </div>
    <p>${message}</p>
  </div> `
		this._clear()
		this._parentEl.insertAdjacentHTML('afterbegin', markup)
	}
}
