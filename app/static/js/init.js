import sections from './sections'
import router from './router'

const app = {
	init() {
		sections.init()
		router.init()
		router.checkHash()
	}
}

export default app