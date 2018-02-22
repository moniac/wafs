import routie from './routie'
import transparency from './transparency'
import sections from './sections'
import helpers from './helpers'
import api from './api'
import paths from './paths'

const router = {
	init() {
		routie({
			'home': function() {
				sections.toggle("home")
			},
			'pokemon': function() {
				paths.pokemonList()
			},
			'pokemon/?:name': function(name) {
				paths.pokemonDetail(name)
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

export default router