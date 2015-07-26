(function () {


	function PointAngleFinder() {

		this.offsetAngle = 4.7368;

		this.init();

	}


	PointAngleFinder.prototype = {

		init: function () {

			this.element = {
				'wheelContainer': document.querySelector('#wheel'),
				'wheel': document.querySelector('#wheel > img'),
				'nav': {
					'previous': document.querySelector('.previous'),
					'next': document.querySelector('.next')
				}
			};

			this.center = {
				x: this.element.wheelContainer.offsetWidth / 2,
				y: this.element.wheelContainer.offsetHeight / 2
			};

			this.currentIndex = 0;

			this.currentRotation = 0;

			// total number of colours
			this.coloursTotal = 38;

			// add listeners
			this.listeners();

		},

		listeners: function () {

			this.element.wheel.addEventListener("click", this.mousePosition.bind(this));

			for (var btn in this.element.nav) {
				this.element.nav[btn].addEventListener('click', this.navHandler.bind(this));
			}

		},

		mousePosition: function (e) {

			var cursorX = e.clientX,
				cursorY = e.clientY,
				o = {
					x: this.getXCoordinate(cursorX),
					y: this.getYCoordinate(cursorY)
				},
				angle = null,
				index = 0;

			// ignore clicks outside colour wheel
			// Pythagorean's Theorem
			// x2 + y2 ≤ r2
			if (!this.isInsideWheel(o)) {
				console.log('outside wheel');
				return false;
			}

			angle = this.getAngle(o);

			// get index
			index = this.getIndexByAnglePosition(angle);

			this.rotateToIndex(index);

			return o;

		},

		getIndexByAnglePosition: function (angle) {

			var i = Math.floor( (angle + this.offsetAngle) / (360 / 38) );

			i = this.coloursTotal - i;

			return i;

		},

		isInsideWheel: function (o) {

			var x1 = Math.abs(o.x),
				y1 = Math.abs(o.y),
				sqrt = 0;

			x1 = Math.pow(x1, 2);
			y1 = Math.pow(y1, 2);

			sqrt = Math.sqrt(x1 + y1);

			return sqrt <= 1 ? true : false;

		},

		getXCoordinate: function (x) {

			var c = this.center.x,
				x = x - this.element.wheelContainer.offsetLeft,
				x1 = 0;

				// map [0, max] to [-1, 1]
				x1 = (x / c) - 1;

			return x1;

		},

		getYCoordinate: function (y) {

			var c = this.center.y,
				y = y - this.element.wheelContainer.offsetTop,
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

			return deg;

		},

		navHandler: function (el) {
			
			if (el.target.className.indexOf('next') > -1) {

				this.rotateCounterClockWise();

			} else {

				this.rotateClockWise();

			}

		},

		rotateClockWise: function(){

			var targetIndex = this.currentIndex + 1 < this.coloursTotal ? this.currentIndex + 1 : 0;
			
			this.rotateToIndex(targetIndex);

		},

		rotateCounterClockWise: function(){

			var targetIndex = this.currentIndex - 1 >= 0 ? this.currentIndex  - 1 : this.coloursTotal - 1;
			
			this.rotateToIndex(targetIndex);

		},


		rotateToIndex: function(targetIndex){

			console.log('rotateToIndex',targetIndex);

			var distance = targetIndex - this.currentIndex,
				rotation = distance * 360 / this.coloursTotal;

			if(rotation > 180){

				rotation = -(360 - rotation);

			}

			if(rotation < -180){

				rotation = (360 + rotation);

			}

			this.currentIndex = targetIndex;
			this.currentRotation += rotation;

			console.log('this.currentRotation', this.currentRotation);

			// rotate animation
			TweenLite.to(this.element.wheel, 0.3, {
				rotation: this.currentRotation,
				transformOrigin:"50% 50%",
				ease: Back.easeOut
			});

		},


	};

	// create instance
	var pointAngleFinder = new PointAngleFinder();

	window.pointAngleFinder = pointAngleFinder;

})();