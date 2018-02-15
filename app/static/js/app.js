(function() {
	'use strict'
	const app = {
		init() {
			sections.init()
			router.init()
			router.checkHash()
		}
	}
	const router = {
		init() {
			routie({
				'home': function() {
					sections.toggle("home")
				},
				'pokemon': function() {
					sections.toggle("pokemon")

					const fetchPokeList = async () =>
						await (await fetch('https://pokeapi.co/api/v2/pokemon/?limit=151')).json()

					fetchPokeList()
						.then((data) => {

							const directives = {
								name: {
									href() {
										return `#pokemon/${this.name}`
									}
								}
							}

							let dataPokemon = data.results.map((i) => {
								return {
									name: i.name,
									url: i.url
								}
							})

							Transparency.render(document.querySelector('#pokemon-list'), dataPokemon, directives)
						})
						.catch(reason => console.log(reason.message))
				},
				'pokemon/?:name': function(name) {
					const fetchPokeList = async () =>
						await (await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)).json()

					fetchPokeList().then((data) => {
						const directives = {
							sprite: {
								src() {
									return `${this.sprite}`
								},
								alt() {
									return `A sprite image of the pokemon ${this.name}`
								}
							}
						}

						const pokeDetails = {
							name: data.name,
							id: data.id,
							sprite: data.sprites.front_default
						}

						sections.toggle(name)

						document.querySelector('#pokemon-detail').classList.remove('hidden')
						Transparency.render(document.querySelector('#pokemon-detail'), pokeDetails, directives)
					})
				}
			})
		},
		checkHash() {
			if (window.location.hash) {
				sections.toggle(helpers.splitHash(location.hash))
			} else {
				document.querySelector('#home').classList.remove('hidden')
			}
		}
	}
	const sections = {
        sectionsAll: document.querySelectorAll('section'),
        init() {
			this.sectionsAll.forEach((el) => {
				el.classList.add('hidden')
			})
		},
		toggle(route) {
			this.sectionsAll.forEach((el) => {
				if (el.id === route) {
					el.classList.remove('hidden')
				} else {
					el.classList.add('hidden')
				}
			})
		}
	}

	const helpers = {
		splitHash(hash) {
			return hash.split('#')[1]
		},
		splitSlash(slash) {
			return slash.split('/')[1]
		}
	}
	app.init()
})()
