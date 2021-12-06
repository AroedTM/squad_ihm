var express = require('express');
var serve_static = require('serve-static');
var http = require('http');
var fs = require('fs');

var app = express();
app.use(serve_static(__dirname+"/public"));

var serveur = http.Server(app);
serveur.listen(8080, function(){});

app.get('/scoreboard', function (req, res) {
    let data = {victoire: 0, defaite: 0, };
    data.victoire = 3;
    data.defaite = 1;
    res.send(data);
});