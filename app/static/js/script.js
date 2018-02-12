(function () {
    'use strict';
    const app = {
        init() {
            sections.toggle()
            routes.init()
        }
    }

    const routes = {
        init() {
            API.getData()
            window.addEventListener("hashchange", function (event) {
                sections.toggle()

            })
        }
    }

    const sections = {
        selector: document.querySelectorAll('section'),
        toggle() {
            let newHash = window.location.hash
            let newRoute = newHash.split('#')

            this.selector.forEach(function (el) {
                if (el.id === newRoute[1]) {
                    el.classList.remove('hidden')
                } else {
                    el.classList.add('hidden')
                }
            })
        }
    }

    const API = {
        getData() {
            let request = new XMLHttpRequest();
            request.open('GET', 'http://behance.net/v2/users/rooaahsab16?api_key=rWYfki0K9PioDYZZcrvKGa64xBzcAeaX', true);
            request.onload = function() {
                if (request.status >= 200 && request.status < 400) {
                    // Success!
                    let data = JSON.parse(request.responseText);
                    console.log(data)
                } else {
                    // We reached our target server, but it returned an error

                }
            };

            request.onerror = function() {
                // There was a connection error of some sort
            };

            request.send();
        }
    }

    app.init()
})()