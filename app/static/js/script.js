(function () {
    'use strict';
    const app = {
        init() {
            API.getData()
            sections.toggle('home')
            routes.init()
        }
    }

    const API = {
        getData() {
            let request = new XMLHttpRequest();
            request.open('GET', 'http://behance.net/v2/users/rooaahsab16?api_key=rWYfki0K9PioDYZZcrvKGa64xBzcAeaX', true);
            request.onload = function () {
                if (request.status >= 200 && request.status < 400) {
                    // Success!
                    let data = JSON.parse(request.responseText)
                } else {
                    // We reached our target server, but it returned an error
                }
            }

            request.onerror = function () {
                // There was a connection error of some sort
            }

            request.send();
        }
    }

    const routes = {
        init() {
            routie({
                '': function () {
                    sections.toggle('home')
                },
                'about-me': function () {
                    sections.toggle('about-me')
                },
                'work': function () {
                    sections.toggle('work')
                }
            })
        }
    }

    const sections = {
        selector: document.querySelectorAll('section'),
        toggle(hash) {
            this.selector.forEach(function (el) {
                el.classList.add('hidden')
                if (el.id === hash) {
                    el.classList.remove('hidden')
                }
            })
        }
    }

    app.init()
})()