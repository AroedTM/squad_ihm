var socket = io();

document.getElementById("join").onclick = function() {joinRandom()};
document.getElementById("create").onclick = function() {createGame('create')};
document.getElementById("submitBtn").onclick = function() {joinGame()};

function joinRandom() {
    console.log("joinRandom clicked");
};

function createGame(value) {
    socket.emit(value);
}

function joinGame() {
    window.location.href = window.location.protocol + "//" + window.location.host + "/game" + "?gameId=" + document.getElementById("token").value;
}

socket.on('create', function(response) {
    window.location = window.location.protocol + "//" + window.location.host + "/game" + "?gameId=" + response.gameId;
})