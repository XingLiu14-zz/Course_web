'use strict'

//The game object
var initGame = function(canvas) {

	var c = canvas.getContext("2d")
	var columnWidth = canvas.width / 5
	var beatWidth = canvas.width / 6
	var beatHeight = canvas.height / 10
	drawBoard(canvas, columnWidth, beatWidth, beatHeight)
	var beatNums = [], beatHeights = []
	var beatColors = ['blue', 'orange', 'green', 'yellow', 'pink']
	var score = 0, combo = 0, currHighestCombo = 0
	var currNum, currStatus
	var countDown = 64
	var extra = false
	var missShot = true


	var newBeat = function() {
		var num = Math.floor(Math.random() * 5)
		beatNums.push(num)
		beatHeights.push(0)
	}


	//draw the whole board to realize dynamic vision
	var redraw = function() {
		c.clearRect(0, 0, canvas.width, canvas.height)
		drawBoard(canvas, columnWidth, beatWidth, beatHeight)
		for(let i = 0; i < beatNums.length; i++) {
			c.fillStyle = beatColors[beatNums[i]]
			c.beginPath()
			c.rect((0.5 + beatNums[i]) * columnWidth - beatWidth / 2, beatHeights[i], beatWidth, beatHeight)
			c.closePath()
			c.fill()
		}
		c.fillStyle = 'white'
		c.font = "30px Arial"
		c.fillText(currStatus, currNum * columnWidth, canvas.height / 2)
		if(extra) {
			c.font = "30px Arial"
			c.fillText("extra +1!", currNum * columnWidth, canvas.height / 2 + 40)
		}
	}


	//Make the squares (beats) drop
	var beatDrop = function(dfc) {
		for(let i = 0; i < beatHeights.length; i++) {
			beatHeights[i] += 5 + 5 * dfc
			if(beatHeights[i] >= canvas.height) {
				currNum = beatNums[i]
				beatHeights.splice(i, 1)
				beatNums.splice(i, 1)
				combo = 0
				currStatus = "beat escaped!"
				extra = false
				document.getElementById('combo').innerHTML = combo
			}
		}
	}


	//When user click, detect the location
	var clickBeat = function(event) {
		//console.log(score)
		var x = event.clientX
		var y = event.clientY
		var offset = canvas.getBoundingClientRect().top
		if(y >= offset && y <= canvas.height + offset) {
			var num = Math.floor(x / columnWidth)
            currNum = num
			for(let i = 0; i < beatNums.length; i++) {
				if(beatNums[i] == num) {
					combo += 1
					var clicked = calScore(beatHeights[i], y, offset)
					score += clicked.score
					extra = clicked.extra
					if(extra) score += 1
					currHighestCombo = currHighestCombo < combo ? combo : currHighestCombo
					beatHeights.splice(i, 1)
					beatNums.splice(i, 1)
					currStatus = clicked.status
					document.getElementById('currHighestCombo').innerHTML = currHighestCombo
					missShot = false
					break
				}
			}
			if(missShot) {
				combo = 0
				currStatus = "MISS"
			}
            document.getElementById('score').innerHTML = score
            document.getElementById('combo').innerHTML = combo
            missShot = true
		}
	}


	//Calculate the score and combo when user click
	function calScore(currHeight, y, offset) {
		var deviation = (canvas.height - beatHeight) - currHeight
		var extraPoint = (y >= canvas.height - beatHeight + offset)
		if(deviation >= beatHeight) {
			combo = 0
			return {score: 0, status: 'Too early!'}
		}
		else if(deviation >= beatHeight * 0.5)
			return {score: 2, status: "It's ok +2", extra: extraPoint,}
		else if(deviation >= beatHeight * 0.1)
			return {score: 3, status: "I'm good +3", extra: extraPoint,}
		else if(deviation >= beatHeight * -0.2)
			return {score: 5, status: 'CRITICAL!! +5', extra: extraPoint,}
		else
			return {score: 1, status: "you're late +1", extra: extraPoint,}
	}

	var getScore = function() {
		return score
	}

	var getCombo = function() {
		return currHighestCombo
	}

	return {
		newBeat: newBeat,
		redraw: redraw,
		beatDrop: beatDrop,
		clickBeat: clickBeat,
		countDown: countDown,
		getScore: getScore,
		getCombo: getCombo
	}

}


//how to draw the game board
function drawBoard(canvas, columnWidth, beatWidth, beatHeight) {
	var c = canvas.getContext("2d")
	for(let i = 1; i < 5; i++) {
		c.beginPath()
		c.moveTo(i * columnWidth, 0)
		c.lineTo(i * columnWidth, canvas.height)
        c.strokeStyle = 'white'
		c.stroke()
	}
	for(let i = 0; i < 5; i++) {
		c.fillStyle = "red"
		c.beginPath()
		c.rect((0.5 + i) * columnWidth - beatWidth / 2, canvas.height - beatHeight, beatWidth, beatHeight)
		c.closePath()
		c.fill()
	}
}

//BGM
var audio = new Audio("http://music.baidutt.com/up/kwcswpky/cdwdu.mp3")

function gogogo(dfc) {

	//Different BGM for different level
	audio.pause()
	if(dfc == 1) {
		audio = new Audio("http://mp3.flash127.com/music/11509.mp3")
	}
	else {
		audio = new Audio("http://mp3.flash127.com/music/17644.mp3")
	}
	audio.play()

	document.getElementById("difficulty").style.display = "none"
    document.getElementById("level").style.display = "none"
	var quit = document.getElementById("stopGame").style.display = "block"

	var game = initGame(document.querySelector("canvas"))
	document.getElementById("background").onclick = game.clickBeat

	setInterval(function() {
		game.redraw()
		game.beatDrop(dfc)
	}, 25)

	setInterval(function() {
		game.countDown--
		if(game.countDown == -1) {
			if(dfc == 0) {
				gameover("Easy", game)
			}
			else {
				gameover("Hard", game)
			}
        }
        document.getElementById("countDown").innerHTML = game.countDown
	}, 1000)

	setInterval(function() {
		game.newBeat()
	}, 2000 - dfc * 1500)

}

//Let user quit when they don't want finish the game
function quit() {
	location.reload()
}

//When time reachs 0, inform user their results and update records if needed
function gameover(dfc, game) {
    var noti = "GAMEOVER! Your score is " + game.getScore() + ", your highest combo is " + game.getCombo() + "."
    var breakScore = false, breakCombo = false
    if(parseInt(localStorage["highestScore" + dfc]) < game.getScore()) {
        localStorage["highestScore" + dfc] = game.getScore()
        breakScore = true
        noti += "\n Congratulation! You broke the score records!!"
    }
    if(parseInt(localStorage["highestCombo" + dfc]) < game.getCombo()) {
        localStorage["highestCombo" + dfc] = game.getCombo()
        breakCombo = true
        noti += "\n Congratulation! You broke the combo records!!"
    }
    var name = prompt(noti, "Input your name")
    if(breakScore) {
        localStorage["scorePlayer" + dfc] = name
    }
    if(breakCombo) {
        localStorage["comboPlayer" + dfc] = name
    }
    location.reload()
}

//initialized the local storage and score board
window.onload = function() {
    if(!localStorage.highestScoreEasy) {
        localStorage.highestScoreEasy = 0
    }
    if(!localStorage.highestComboEasy) {
        localStorage.highestComboEasy = 0
    }
    if(!localStorage.highestScoreHard) {
        localStorage.highestScoreHard = 0
    }
    if(!localStorage.highestComboHard) {
        localStorage.highestComboHard = 0
    }
    if(!localStorage.scorePlayerEasy) {
        localStorage.scorePlayerEasy = 'N/A'
    }
    if(!localStorage.comboPlayerEasy) {
        localStorage.comboPlayerEasy = 'N/A'
    }
    if(!localStorage.scorePlayerHard) {
        localStorage.scorePlayerHard = 'N/A'
    }
    if(!localStorage.comboPlayerHard) {
        localStorage.comboPlayerHard = 'N/A'
    }
    document.getElementById("highestScoreEasy").innerHTML = localStorage.highestScoreEasy
    document.getElementById("highestComboEasy").innerHTML = localStorage.highestComboEasy
    document.getElementById("highestScoreHard").innerHTML = localStorage.highestScoreHard
    document.getElementById("highestComboHard").innerHTML = localStorage.highestComboHard
    document.getElementById("scorePlayerEasy").innerHTML = localStorage.scorePlayerEasy
    document.getElementById("comboPlayerEasy").innerHTML = localStorage.comboPlayerEasy
    document.getElementById("scorePlayerHard").innerHTML = localStorage.scorePlayerHard
    document.getElementById("comboPlayerHard").innerHTML = localStorage.comboPlayerHard

	audio.play()
}
