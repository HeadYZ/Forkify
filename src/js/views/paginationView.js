import View from './View'
import icons from '../../img/icons.svg'

class PaginationView extends View {
	_parentEl = document.querySelector('.pagination')

	addHandlerClick(handler) {
		this._parentEl.addEventListener('click', e => {
			const btn = e.target.closest('.btn--inline')
			if (!btn) return

			const goToPage = btn.dataset.goto

			handler(Number(goToPage))
		})
	}

	_generateMarkup() {
		const curPage = this._data.page
		const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage)

		if (curPage === 1 && numPages > 1) {
			return this._generateMarkupNextButton(curPage)
		}
		if (curPage === numPages && numPages > 1) {
			return this._generateMarkupPrevButton(curPage)
		}
		if (curPage < numPages) {
			return `
            	${this._generateMarkupPrevButton(curPage)}
				${this._generateMarkupNextButton(curPage)}
                `
		}
		return ''
	}
	_generateMarkupNextButton(curPage) {
		return `
            <button data-goto="${curPage + 1}" class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
            </button>
            `
	}
	_generateMarkupPrevButton(curPage) {
		return `      
        <button data-goto="${curPage - 1}" class="btn--inline pagination__btn--prev">
           <svg class="search__icon">
             <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
       </button>`
	}
}

export default new PaginationView()
