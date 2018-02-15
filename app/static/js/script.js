(function () {
    'use strict';
    const app = {
        init() {
            sections.toggle('home')
            api.getData()
            routes.init()
        }
    }

    // API to request data from meme generator
    const api = {
        getData(name) {
            const request = new XMLHttpRequest();
            request.open('GET', 'http://version1.api.memegenerator.net//Generators_Select_ByPopular?pageIndex=0&pageSize=12&days=&apiKey=893dfe6c-e0e7-4693-8a9e-5df5de998357', true);
            request.onload = () => {
                if (request.status >= 200 && request.status < 400) {
                    // Succeses!
                    const data = JSON.parse(request.responseText)

                    const memeData = data.result.map((obj) => {
                        return {
                            displayName: obj.displayName,
                            imageUrl: obj.imageUrl,
                            href: obj.displayName.toLowerCase().replace(/ $/, "").split(' ').join('-')
                        }
                    })

                    /* if you are on a meme page, the name of the meme is passed as a parameter.
                    The if statement checks if you are on a meme page or on the overview page
                    */

                    if (name) {
                        const selectedMeme = memeData.filter((obj) => {
                            return obj.href === name;
                        })
                        const directives = {
                            image: {
                                src(params) {
                                    return this.imageUrl
                                }
                            }
                        }
                        Transparency.render(document.getElementById('details'), selectedMeme, directives);

                    }
                    else {
                        const directives = {
                            displayName: {
                                // Some names have an space at the end. The replace removes that space so the won't be an extra - at the end of the string when the spaces are replaced with -
                                href(params) {
                                    return "#populair/" + this.displayName.toLowerCase().replace(/ $/, "").split(' ').join('-');
                                }
                            }
                        }

                        Transparency.render(document.getElementById('memes'), memeData, directives);
                    }


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

// Checks the hash location of the website
    const routes = {
        init() {
            routie({
                '': function () {
                    sections.toggle('home')
                },
                'about-me': function () {
                    sections.toggle('about-me')
                },
                'populair': function () {
                    sections.toggle('populair')
                },
                'populair/:name': function (name) {
                    api.getData(name)
                    sections.toggle('details')
                }
            })
        }
    }

    const sections = {
        selector: document.querySelectorAll('section'),
        // Shows the section that matches with the route
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