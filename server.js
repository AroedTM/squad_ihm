var express = require('express');
var serve_static = require('serve-static');
var http = require('http');
var fs = require('fs');
var path = require('path');
var app = express();
app.use(serve_static(__dirname+"/public"));

var serveur = http.Server(app);
serveur.listen(8080, function(){});
app.get('/game', function(req, res){
    res.sendFile(path.join(__dirname, '/public/jeu.html'));
});
app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, '/public/auth.html'));
});
app.get('/auth', function(req, res){
    res.sendFile(path.join(__dirname, '/public/auth.html'));
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
    for(let i=0; i<data.parties.length; i++)
    {
        if(data.parties[i].result == "Victoire")
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