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

			// ignore clicks outside colour wheel
			if (Math.abs(o.x) + Math.abs(o.y) > 1.375) {
				console.log('outside wheel!');
				return false;
			}

			this.getAngle(o);

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

			return y1 * -1;

		},

		getAngle: function (o) {

			var rad = Math.atan2(Math.abs(o.x), Math.abs(o.y)),
				deg = rad * (180 / Math.PI);

			if (o.x > 0 && o.y > 0) {

				// Q1 (res: 0 to 90)

			} else if (o.x > 0 && o.y < 0) {

				// Q2 (res: 90 to 0)
				deg = (90 - deg) + 90;

			} else if (o.x < 0 && o.y < 0) {

				// Q3 (res: 90 to 0)
				deg = deg + 180;

			} else if (o.x < 0 && o.y > 0) {

				// Q4 (res: 0 to 90)
				deg = (90 - deg) + 270;

			}

			console.log('deg: ', deg);

			return deg;

		}


	};

	// create instance
	var pointAngleFinder = new PointAngleFinder();

	window.pointAngleFinder = pointAngleFinder;

})();