(function () {
    'use strict';
    let settings = {
        sections: document.querySelectorAll('section')
    }

    const app = {
        init() {
            sections.toggle()
            routes.init()
        }
    }

    const routes = {
        init() {
            window.addEventListener("hashchange", function (event) {
                console.log(event)
                sections.toggle()
            });
        }
    }

    const sections = {
        toggle() {
            let newHash = window.location.hash
            let newRoute = newHash.split('#')

            settings.sections.forEach(function (el) {
                if (el.id === newRoute[1]) {
                    el.classList.remove('hidden')
                } else {
                    el.classList.add('hidden')
                }
            })
        }
    }

    app.init()
})()