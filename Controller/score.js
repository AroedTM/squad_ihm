var partie = require("./partie")

module.exports = {
  getScore: function (req, res) {
    let game = partie.getGame()
    let idJoueur = req.params.idJoueur
    let result
    if (idJoueur == 1)
      result = {"idJoueur": idJoueur, "score": game.score_p1}
    else if (idJoueur == 2)
      result = {"idJoueur": idJoueur, "score": game.score_p2}
    else
      result = "idJoueur incorrect"
    res.send(result)
  }
}