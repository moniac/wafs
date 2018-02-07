// Variable declaration
//
// const SANDBOX = "SANDBOX";
// const LINEAIR = "LINEAIR";
// const GPS_AVAILABLE = 'GPS_AVAILABLE';
// const GPS_UNAVAILABLE = 'GPS_UNAVAILABLE';
// const POSITION_UPDATED = 'POSITION_UPDATED';
// const REFRESH_RATE = 1000;
// const currentPosition = currentPositionMarker = customDebugging = debugId = map = interval = intervalCounter = updateMap = false;
// const locatieRij = markerRij = [];

// app init
(function() {
  const setting:{

  }
  const app = {
    init: function() {},
    set:function(){}
  }

  // POSITION
  const position = {
    set: function() {
      helper.isnumber('1')
      this.check()
    },
    check: function() {
      const el = document.body;
      this.set()

      el.addListener('touchstart', () =>{
        this.update()
      })
    },
    update: function() {},
    set: function() {},
  }

  // MAP
  const gMap = {
    generate:  function() {},
    update: function() {},
  }


  // HELPER
  const helper = {
    isNumber: function() {},
    getElement: function() {
      return document.querySelector('element')
    },
    getElements: function() {
      return document.querySelectorAll('element')
    },
  }

  const $ = helper.getElement()
  // DEBUG

})()

app.init()
