import settings from './settings'

const sections = {
	init() {
		settings.sections.forEach((el) => {
			el.classList.add('hidden')
		})
	},
	toggle(route) {
		settings.sections.forEach((el) => {
			if (el.id === route) {
				el.classList.remove('hidden')
			} else {
				el.classList.add('hidden')
			}
		})
	}
}

export default sections