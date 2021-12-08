class Player{

    pseudo;
    state;
    #id;

    constructor(nom, etat, id){
        this.pseudo = nom;
        this.state = etat;
        this.id = id;
    }

    getId(){
        return this.id;
    }

    getPseudo(){
        return this.pseudo;
    }

    getState(){
        return this.state;
    }

    setState(etat){
        this.state = etat;
    }
}
module.exports = Player