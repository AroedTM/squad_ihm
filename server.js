var express = require('express');
var serve_static = require('serve-static');
var http = require('http');
var fs = require('fs');
require('dotenv').config({path: './.env'});
var path = require('path');
var app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server) ;


app.use(serve_static(__dirname + "/public"));

app.engine('html', require('ejs').renderFile);

server.listen(8080, function(){});
app.get('/game_ia', function(req, res){
    res.sendFile(path.join(__dirname, '/public/jeu_ia.html'));
});
app.get('/game', function(req, res){
    res.sendFile(path.join(__dirname, '/public/jeu_duo.html'));
});
app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, '/public/auth.html'));
});
app.get('/auth', function(req, res){
    res.render(path.join(__dirname, '/public', 'auth.html'), { url: process.env.API_URL });
});
app.get('/accueil', function(req, res){
    res.sendFile(path.join(__dirname, '/public/Accueil.html'));
});
app.get('/leaderboard', function(req, res){
    res.sendFile(path.join(__dirname, '/public/scoreboard.html'));
});
app.get('/scoreboard', function (req, res) {
    let data = {parties: [], victoires: 0, defaites: 0, ratioEvolution: []};
    data.parties = [
        {id: 5, result: "Victoire", pointsPlayer1: 10, pointsPlayer2: 2, duree: 200, date: "08/12/2021"},
        {id: 4, result: "Defaite", pointsPlayer1: 7, pointsPlayer2: 10, duree: 900, date: "08/12/2021"},
        {id: 3, result: "Victoire", pointsPlayer1: 10, pointsPlayer2: 4, duree: 500, date: "07/12/2021"},
        {id: 2, result: "Victoire", pointsPlayer1: 10, pointsPlayer2: 0, duree: 200, date: "04/12/2021"},
        {id: 1, result: "Defaite", pointsPlayer1: 1, pointsPlayer2: 10, duree: 200, date: "02/12/2021"},
        
    ];
    for (let i = 0; i < data.parties.length; i++) {
        if (data.parties[i].result == "Victoire")
            data.victoires++;
        else
            data.defaites++;
    }

    for(let i=0; i<data.parties.length; i++)
    {
        if(data.parties[i].pointsPlayer2 == 0)
            data.ratioEvolution.push(data.parties[i].pointsPlayer1);
        else
            data.ratioEvolution.push(data.parties[i].pointsPlayer1 / data.parties[i].pointsPlayer2);
    }
    
    res.send(data);
});

const games = {};

io.on('connection', (socket) => {
    console.log(socket.handshake.address)

  socket.on('button', function(page){
    io.emit("button", page);
  });
	socket.on('create', () => {
		let newGameId = guid();
		games[newGameId] = {
			"gameId": newGameId,
			"clients": [],
		}
		socket.emit('create', {"gameId": newGameId});
	});
	socket.on('join', (data) => {
		let gameId = data.gameId;
		if ( (! games[gameId]) || games[gameId].clients.length >= 2 ) {
			return;
		}
		socket.join(gameId);
		games[gameId].clients[games[gameId].clients.length] = socket;
		let movingBat = "right-bat";
		if ( socket.id === games[data.gameId].clients[0].id ) {
			movingBat = "left-bat";
		}
		socket.emit('side', movingBat)
		if(games[gameId].clients.length >= 2){
			
		socket.to(data.gameId).emit('full');  
		socket.emit('full')  
		}
	});
	socket.on('move', (data) => {
		socket.to(data.gameId).emit('move', {"movingBat": data.movingBat, "position": data.position});
	});
	socket.on('ball', (data) => {
		socket.to(data.gameId).emit('ball', {"posx": data.posx, "posy": data.posy, "speedx": data.speedx, "speedy": data.speedy, });
	});
  socket.on('disconnect', function () {
    //console.log('client disconnected');
  });
});

function S4() {
  return (((1+Math.random())*0x10000)|0).toString(16).substring(1); 
}

// then to call it, plus stitch in '4' in the third group
const guid = () => (S4() + S4() + "-" + S4() + "-4" + S4().substr(0,3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
