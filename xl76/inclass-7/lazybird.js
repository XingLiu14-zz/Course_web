'use strict'

var createApp = function(canvas) { 
	var c = canvas.getContext("2d");
	var blgWidthSet =  [], blgHeightSet = []
	var blgColorSet = [], x0Set = []
	var birdAltitude = [], birdPosition = []
	var nestedAltitude = [], nestedPosition = []

	// Create the ground
	var floor = drawGround(canvas)

	// common size for windows
	var windowSpacing = 2, floorSpacing = 3
	var windowHeight = 5, windowWidth = 3

	// colors of buildings
	var blgColors = [ 'red', 'blue', 'gray', 'orange']

	//build a building
	var build = function() { 
		var x0 = Math.random()*canvas.width
		var blgWidth = (windowWidth+windowSpacing) * Math.floor(Math.random()*10)
		var blgHeight = Math.random()*canvas.height/2
		drawBuilding(x0, blgWidth, blgHeight)

		blgWidthSet.push(blgWidth)
		blgHeightSet.push(blgHeight)
		x0Set.push(x0)
	}

	var newBird = function() {
		var altitude = Math.random()*floor
		birdAltitude.push(altitude)
		birdPosition.push(0)
	}

	var birdFly = function() {
		for(var i = 0; i < birdAltitude.length; i++) {
			for(var j = 0; j < x0Set.length; j++) {
				if(birdPosition[i] >= x0Set[j] && birdPosition[i] <= x0Set[j] + blgWidthSet[j])
					if(birdAltitude[i] >= floor - blgHeightSet[j] && birdAltitude[i] <= floor) {
						nestedPosition.push(birdPosition[i])
						birdPosition.splice(i, 1)
						nestedAltitude.push(birdAltitude[i])
						birdAltitude.splice(i, 1)
					}
			}
			drawBird(birdPosition[i], birdAltitude[i])
			if(birdPosition[i] >= 800){
				birdPosition[i]  = 0
			}
			birdPosition[i] += 10
		}
	}

	var drawBird = function(position, altitude) {
		c.fillStyle="red"
		c.beginPath()
		c.rect(position,altitude,20,10)
		c.closePath()
		c.fill()
		c.fillStyle="green"
		c.beginPath()
		c.arc(position+25, altitude+5, 5, 2*Math.PI, false)
		c.closePath()
		c.fill()
	}

	var drawNestedBird = function(position, altitude) {
		c.fillStyle="green"
		c.beginPath()
		c.rect(position,altitude,10,20)
		c.closePath()
		c.fill()
		c.fillStyle="red"
		c.beginPath()
		c.arc(position+5, altitude-5, 5, 2*Math.PI, false)
		c.closePath()
		c.fill()
	}

	var sun = function(position) {
		c.fillStyle="yellow"
		c.beginPath()
		c.arc(position, 50, 40, 0, 2 * Math.PI, false)
		c.closePath()
		c.fill()
	}


	var car = function(position) {
		c.fillStyle="blue"
		c.beginPath()
		c.rect(position,360,40,20)
		c.closePath()
		c.fill()
		c.fillStyle="red"
		c.beginPath()
		c.arc(position + 10, 390, 10, 0, 2 * Math.PI, false)
		c.arc(position + 30, 390, 10, 0, 2 * Math.PI, false)
		c.closePath()
		c.fill()
	}

	var redraw = function() {
		c.clearRect(0, 0, canvas.width, canvas.height);
		drawGround(canvas)
		for(var i=0; i < blgWidthSet.length; i++) {
			drawBuilding(x0Set[i], blgWidthSet[i], blgHeightSet[i], blgColorSet[i])
		}
		for(var i = 0; i < nestedAltitude.length; i++) {
			drawNestedBird(nestedPosition[i], nestedAltitude[i])
		}
	}

	function drawBuilding(x0, blgWidth, blgHeight, blgColor) {
		if(blgColor !== undefined) {
			c.fillStyle = blgColor
		}
		else {
			c.fillStyle= blgColors[Math.floor(Math.random()*blgColors.length)]
			blgColorSet.push(c.fillStyle)
		}
		c.fillRect(x0, floor - blgHeight, blgWidth, blgHeight)

		const dx = floorSpacing + windowHeight
		const dy = windowSpacing + windowWidth
		const floors = Math.floor(blgHeight/dx)
		const rows = Math.floor(blgWidth/dy) - 1
		const range = (n, delta, x0) => Array(n).fill(1).map((_, i) => x0 + i * delta)
		range(floors, dx, floor - blgHeight + dx).forEach(y => {
		    range(rows, dy, windowSpacing).forEach(x => {
			c.fillRect(x0 + x, y - windowHeight, windowWidth, windowHeight)
			if(Math.random() < 0.5) {
				c.fillStyle="yellow"
			}
			else {
				c.fillStyle="black"
			}
		    })
		})
	}

	var blgGrow = function(event) {
		var x = event.clientX
		var y = event.clientY
		var offset = canvas.getBoundingClientRect().top
		for(var i = 0; i < x0Set.length; i++) {
			if(x >= x0Set[i] && x <= x0Set[i] + blgWidthSet[i]) {
				if(y >= floor - blgHeightSet[i] + offset && y <= floor + offset) {
					blgHeightSet[i] += floorSpacing + windowHeight
					break
				}
			}
		}
	}

	return {
		build: build,
		sun: sun,
		car: car,
		redraw: redraw,
		blgGrow: blgGrow,
		newBird: newBird,
		birdFly: birdFly,
		drawBird: drawBird,
	}

}

function drawGround(canvas) {
	var c = canvas.getContext("2d");
	var floor = canvas.height/2
	var grad = c.createLinearGradient(0,floor,0,canvas.height)
	grad.addColorStop(0, "green")
	grad.addColorStop(1, "black")
	c.fillStyle=grad
	c.fillRect(0, floor, canvas.width, canvas.height)
	return floor
}


window.onload = function() {
	var app = createApp(document.querySelector("canvas"))
	document.getElementById("build").onclick = app.build
	document.getElementById("bird").onclick = app.newBird
	document.getElementById("background").onclick = app.blgGrow
	var position = 0;
	setInterval(function() {
		app.redraw()
		if(position>=800) {
			position = 0;
		}
		app.birdFly()
		app.sun(position)
		app.car(position)
		position += 15
	}, 50)
}


