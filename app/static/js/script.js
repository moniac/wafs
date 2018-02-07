/*

  Javascript Init

*/
(function() {
  'use strict'


  const app = {
    init: function() {
      routes.init()
    }
  }

  const routes = {
    init: function() {
      var route = window.location.hash;
      route != '' ? sections.toggle(route) :  window.location.hash = '#start-scherm'

      window.addEventListener('hashchange', (event) => {
        route =  window.location.hash;
        sections.toggle(route)
      })
    }
  }

  const sections = {
    toggle: function(route) {
      //2 show active route
      const sections = document.querySelectorAll('section')

      sections.forEach(function(el){
        '#' + el.id === route ? el.classList.add('active') : el.classList.remove('active')
      })
      console.log(route)
    }
  }

  app.init()
})()
