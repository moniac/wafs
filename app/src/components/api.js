const api = {
	call: async function (api) {
		return await (await fetch(api)).json()
	}
}

export default api