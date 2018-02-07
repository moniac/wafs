(function () {

    var settings = {
        SANDBOX: "SANDBOX",
        LINEAIR: "LINEAIR",
        GPS_AVAILABLE: 'GPS_AVAILABLE',
        GPS_UNAVAILABLE: 'GPS_UNAVAILABLE',
        POSITION_UPDATED: 'POSITION_UPDATED',
        REFRESH_RATE: 1000,
        currentPosition: currentPositionMarker = customDebugging = debugId = map = interval = intervalCounter = updateMap = false,
        locatieRij: markerRij = []
    }

    var app = {
        init: function () {
            position.set()
        }
    }

    var position = {
        set: function () {
            helper.isNumber('1')
            this.check()
        },
        check: function () {
            var el = document.body
            var self = this
            this.set()
            el.addEventListener('touchstart', function () {
                self.update();
            })
        },
        update: function () {
        },
        getDistance: function () {
        }
    }

    var gMap = {
        generate: function () {
        },
        update: function () {
        }
    }

    var helper = {
        isNumber: function () {
        },
        getElement: function (element) {
            return document.querySelector(element)
        },
        getElements: function (elements) {
            return document.querySelectorAll(elements)
        }
    }


    var $ = helper.getElement()

    // start the application
    app.init()

})()