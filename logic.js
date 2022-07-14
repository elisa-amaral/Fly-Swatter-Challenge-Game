var width = 0
var height = 0
var lives = 1
var remainingTime = 30

function adjustGameWidthAndHeight() 
{
	height = window.innerHeight
	width = window.innerWidth
}

adjustGameWidthAndHeight()

function randomSize() 
{
	var sizeClass = Math.floor(Math.random() * 3) 

	switch(sizeClass) 
	{
		case 0:
			return 'fly_1'
		case 1:
			return 'fly_2'
		case 2:
			return 'fly_3'
	}
}


function randomDirection() // fly element will be "looking" at right OR left
{

	var directionClass = Math.floor(Math.random() * 2) 

	switch(directionClass) 
	{
		case 0:
			return 'right'
		case 1:
			return 'left'
	}
}

function randomCoordinates() 
{
 	
	if(document.getElementById('fly')) 
	{	
		document.getElementById('fly').remove() 

		if (lives > 5) 
		{ 
			window.location.href = 'game-over.html'
		} 
		else 
		{
			document.getElementById('life_' + lives).src = "images/empty-heart.png"
		}
		
		lives++ 
	}
	
	var X_coordinate = Math.floor(Math.random() * width) - 90 
	var Y_coordinate = Math.floor(Math.random() * height) - 90 
	
	X_coordinate = X_coordinate  < 0 ? 0 : X_coordinate 
	Y_coordinate = Y_coordinate  < 0 ? 0 : Y_coordinate 
 
	var fly = document.createElement('img')
	fly.src = 'images/fly.png' 
	fly.className = randomSize() + ' ' + randomDirection() 
	fly.style.left = X_coordinate + 'px' 
	fly.style.top = Y_coordinate + 'px'
	fly.style.position = 'absolute' 
	fly.id = 'fly'

	fly.onclick = function() 
	{
		this.remove()
	}

	document.body.appendChild(fly) 
}

var timer = setInterval(function() 
{
	
	remainingTime -= 1

	if(remainingTime < 0)
	{
		clearInterval(timer) 
		clearInterval(displayFly) 
		
        /* 
		If the 'fly' element is clicked before it is automatically removed 
		(deleted from the screen) and there still is time remaining and 
		there still are lives remaining, then the user continues to play. 
		If the 'fly' element is not clicked before its automatic removal, 
		the life points are affected. If var 'remainingTime' < 0 here at 
		this point, 	it was before the lives ran out, so the user won 
		the game -> redirect to victory.html. The purpose of the game is 
		that the user to stays "alive" until the timer runs out. */
		window.location.href = 'victory.html'
		
	}
	else 
	{ 
		document.getElementById('timer').innerHTML = remainingTime 
	}
}, 1000) 



var level = window.location.search

level = level.replace('?', '')

var remainingTimeBeforeDisplayingNewFly = 0 


if (level === 'easy')
{	
	remainingTimeBeforeDisplayingNewFly = 1500  
}
else if (level === 'medium')
{	
	remainingTimeBeforeDisplayingNewFly = 1000
}
else if (level === 'hard')
{	
	remainingTimeBeforeDisplayingNewFly = 750
}

