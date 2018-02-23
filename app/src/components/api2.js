// another way of doing api calls.

var api = {
	call: function (apiURL) {
		var promise = new Promise(function (resolve, reject) {
			var request = new XMLHttpRequest();
			request.open('GET', apiURL, true);
			console.log(apiURL)
			
			request.onload = function() {
			  if (request.status >= 200 && request.status < 400) {
			   // Success!
				var data = JSON.parse(request.responseText);
				resolve(data)
			  } else {
			   // We reached our target server, but it returned an error
				reject('derp')
			  }
			};
			
			request.onerror = function() {
			 // There was a connection error of some sort
			};
			
			request.send();
		})
		return promise
	}
}

export default api