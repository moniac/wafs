const helpers = {
	splitHash(hash) {
		return hash.split('#')[1]
	},
	toggleLoader() {
		document.querySelector('.loader').classList.toggle('hidden')
	}
}

export default helpers