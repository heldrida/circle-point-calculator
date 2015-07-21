(function () {


	function PointAngleFinder() {

		this.init();

	}


	PointAngleFinder.prototype = {

		init: function () {

			this.element = {
				'wheel': document.querySelector('#wheel')
			};

			this.center = {
				x: this.element.wheel.offsetWidth / 2,
				y: this.element.wheel.offsetHeight / 2
			};

			// add listeners
			this.listeners();

		},

		setup: function () {

		},

		listeners: function () {

			this.element.wheel.addEventListener("click", this.mousePosition.bind(this));

		},

		mousePosition: function (e) {

			var cursorX = e.clientX,
				cursorY = e.clientY,
				o = {
					x: this.getXCoordinate(cursorX),
					y: this.getYCoordinate(cursorY)
				};

			console.log(o);

			return o;

		},

		getXCoordinate: function (x) {

			var c = this.center.x,
				x = x - this.element.wheel.offsetLeft,
				x1 = 0;

				// map [0, max] to [-1, 1]
				x1 = (x / c) - 1;

			return x1;

		},

		getYCoordinate: function (y) {

			var c = this.center.y,
				y = y - this.element.wheel.offsetTop,
				y1 = 0;

				// map [0, max] to [-1, 1]
				y1 = (y / c) - 1;

			return y1;

		}


	};

	// create instance
	var pointAngleFinder = new PointAngleFinder();

	window.pointAngleFinder = pointAngleFinder;

})();