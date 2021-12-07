var express = require('express');
var serve_static = require('serve-static');
var http = require('http');
var fs = require('fs');

var app = express();
app.use(serve_static(__dirname+"/public"));

var serveur = http.Server(app);
serveur.listen(8080, function(){});

app.get('/scoreboard', function (req, res) {
    let data = {parties: [], victoires: 0, defaites: 0};
    data.parties = [
        {id: 4, result: "Defaite", pointsPlayer1: 1, pointsPlayer2: 2, duree: 200, date: "02/12/2021"},
        {id: 3, result: "Victoire", pointsPlayer1: 5, pointsPlayer2: 2, duree: 500, date: "07/12/2021"},
        {id: 2, result: "Defaite", pointsPlayer1: 1, pointsPlayer2: 2, duree: 200, date: "02/12/2021"},
        {id: 1, result: "Victoire", pointsPlayer1: 3, pointsPlayer2: 0, duree: 100, date: "02/12/2021"},
        {id: 0, result: "Victoire", pointsPlayer1: 90, pointsPlayer2: 2, duree: 3000, date: "01/12/2021"},
    ];
    for(let i=0; i<data.parties.length; i++)
    {
        if(data.parties[i].result == "Victoire")
            data.victoires++;
        else
            data.defaites++;
    }
    res.send(data);
});