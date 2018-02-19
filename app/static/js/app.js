(function() {
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

							let dataPokemon = data.results.map(function(i) {
								return {
									name: i.name,
									url: i.url,
									count: (0+i)
								}
							}).sort((a, b) => a.name.localeCompare(b.name))

							const pokemonInput = document.querySelector('#pokemon > input')

							pokemonInput.addEventListener('keyup', (e) => {
								const filteredPokemon = dataPokemon.filter((x, i) => {
									return x.name.startsWith(e.target.value)
								})

								Transparency.render(document.querySelector('#pokemon-list'), filteredPokemon, directives)
								document.querySelector('#pokemon > p').innerHTML = filteredPokemon.length
							})

							Transparency.render(document.querySelector('#pokemon-list'), dataPokemon, directives)
							document.querySelector('#pokemon > p').innerHTML = dataPokemon.length
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
									// still providing a dynamic alt
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
						// dit kan netter: DRY
						document.querySelector('#pokemon-detail').classList.remove('hidden')
						document.querySelector('#pokemon > input').value = ''
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

	const helpers = {
		splitHash(hash) {
			return hash.split('#')[1]
		},
	}
	app.init()
})()
