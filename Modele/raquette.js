class Raquette{

    #id_joueur;
    pos_X;
    pos_Y;

    constructor(pos_Y, pos_X, id_joueur){
        this.id_joueur = id_joueur;
        this.pos_Y = pos_Y;
        this.pos_X = pos_X;
    }

    getID_joueur(){
        return this.id_joueur;
    }

    getPosY(){
        return this.pos_Y;
    }

    setPosY(pos){
        this.pos_Y = pos;
    }

    getPosX(){
        return this.pos_X;
    }
}

module.exports = Raquette