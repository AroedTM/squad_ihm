var Game = require("../Modele/Game")

var game
module.exports = {
  getEtatPartie: function (req, res) {
    let result = {"partieTerminee": game.termine}
    res.send(result)
  },
  createNewGame: function (req, res) {
    game = new Game(req.params.idGame,1,2)
    res.send(game)
  },
  getGame: function(req, res) {
    return game;
  },
  endGame: function(req, res) {
    console.log(game)
    game.postState(true);
    res.send(game)
  }
}