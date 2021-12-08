var express = require('express');
var serve_static = require('serve-static');
var http = require('http');
var fs = require('fs');
var path = require('path');
const axios = require('axios');
var app = express();
app.use(serve_static(__dirname+"/public"));

var serveur = http.Server(app);
serveur.listen(8080, function(){});
app.get('/game', function(req, res){
    res.sendFile(path.join(__dirname, '/public/jeu_ia.html'));
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
        
    axios.get('https://svc-pong-esiea.azurewebsites.net/battle/leaderboard').then(resp => {

        for(let i=0; i<Object.keys(resp.data).length; i++){
            var obj = Object.keys(resp.data)[i];
            data.parties.push(resp.data[obj]);
        }

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
    
});