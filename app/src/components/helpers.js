import sections from './sections'

const helpers = {
	splitHash(hash) {
		return hash.split('#')[1]
	},
	toggleLoader() {
		document.querySelector('.loader').classList.toggle('hidden')
	},
	pageError() {
		sections.init()
	}
}

export default helpers