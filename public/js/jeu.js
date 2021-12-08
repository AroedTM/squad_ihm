var socket = io();

const socket = io();

let movingBatId = null;
let movingBat = null;

function findGetParameter(parameterName) {
	var result = null,
		tmp = [];
	var items = location.search.substr(1).split("&");
	for (var index = 0; index < items.length; index++) {
		tmp = items[index].split("=");
		if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
	}
	return result;
}
var gameId = findGetParameter("gameId");

if ( gameId != null) {
	socket.emit('join', {"gameId": gameId});
	document.getElementById("id_game").innerHTML = gameId;
}

socket.on('full', ()=> {
	document.getElementById("id_game").style.display = "none"
})

socket.on('side', (givenBat) => {
	movingBatId = givenBat;
	movingBat = document.getElementById(movingBatId);
});

document.addEventListener('keydown', (event) => {
	const pressedKey = event.key;
	const currentPosition = movingBat.offsetTop;
	switch (event.key) {
		case "ArrowDown":
			var newPos = currentPosition + 5 + "px"
			movingBat.style.top = newPos;
			socket.emit('move', {"gameId":gameId, "position":newPos, "movingBat": movingBatId});
			break;
		case "ArrowUp":
			var newPos = currentPosition - 5 + "px"
			movingBat.style.top = newPos;
			socket.emit('move', {"gameId":gameId, "position":newPos, "movingBat": movingBatId});
			break;
	}
	console.log(pressedKey);
});

socket.on('move', function(data) {
	var movedBat = document.getElementById(data.movingBat);
	movedBat.style.top = data.position;
});