{
	'use strict'
	const settings = {
		sections: document.querySelectorAll('section')
	}
	const app = {
		init() {
			sections.init()
			router.init()
			router.checkHash()
		}
	}
	const router = {
		init() {
			onhashchange = () => {
				sections.toggle(helpers.splitHash(location.hash))
			}
		},
		checkHash() {
			location.hash ? sections.toggle(helpers.splitHash(location.hash)) : document.querySelector('#home').classList.remove('hidden')
		}
	}
	const sections = {
		init() {
			settings.sections.forEach((el) => {
				el.classList.add('hidden')
			})
		},
		toggle(route) {
			settings.sections.forEach((el) => {
				el.id === route ? el.classList.remove('hidden') : el.classList.add('hidden')
			})
		}
	}

	const helpers = {
		splitHash(hash) {
			return hash.split('#')[1]
		}
	}
	app.init()
}