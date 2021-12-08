var partie = require("./partie")

module.exports = {
  getRaquettePos: function (req, res) {
    let game = partie.getGame()
    let idJoueur = req.params.idJoueur
    
    let result
    if (idJoueur == 1) {
      positionRaquette = game.raquette1.getPosY()
      result = {"id": idJoueur, "pos": positionRaquette}
    }
    else if (idJoueur == 2) {
      positionRaquette = game.raquette2.getPosY()
      result = {"id": idJoueur, "pos": positionRaquette}
    }
    else {
      result = "idJoueur incorrect"
    }

    res.send(result)
  },
  postRaquettePos: function (req, res) {
    let game = partie.getGame()
    let idJoueur = req.params.idJoueur
    let raquette = undefined
    if (idJoueur == 1) {
      raquette = game.raquette1
    }
    else if (idJoueur == 2) {
      raquette = game.raquette2
    }

    let result
    if (raquette != undefined) {
      let positionRaquette = raquette.setPosY(req.params.pos)
      result = {"id": idJoueur, "pos": positionRaquette}
    }
    else {
      result = "idJoueur incorrect"
    }

    res.send(result)
  },
}