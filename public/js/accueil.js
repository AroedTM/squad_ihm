var socket = io();
function create_game() {
	socket.emit('create');
}
socket.on('create', function(response) {
	window.location = window.location.protocol + "//" + window.location.host + "/jeu.html" + "?gameId=" + response.gameId;
})
document.getElementById("create").addEventListener("click", () => {
	create_game();
})