import 'normalize.css/normalize.css'
import './styles/styles.css'

import app from './components/init'
import api from './components/api'

(function() {
	app.init()
})()

// api.call('https://pokeapi.co/api/v2/pokemon/?limit=1').then((data) => {
// 	console.log(data)
// })