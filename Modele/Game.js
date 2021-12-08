var raquette = require('./raquette')
var balle = require('./balle')
class Game{
    id;
    player1;
    player2;
    raquette1;
    raquette2;
    balle;
    score_p1;
    score_p2; 

    constructor(id,player1,player2){
        this.id = id;//id de la partie
        this.player1 = player1;
        this.player2 = player2;
        this.raquette1 = new raquette(1,1,this.player1);
        this.raquette2 = new raquette(1,1,this.player2);
        this.balle = new balle(1,1);
        this.termine = false;//false tant que la partie est en cours
        this.score_p1 = 0;
        this.score_p2 = 0;
    }
    game(){//boucle de jeu
        temp_score_p1 = 0;
        temp_score_p2 = 0;
        gagnant = null; //futur gagnant de la partie
        while(!this.termine){
            this.getPosR(this.player1.getId());//récupérer la position de la raquette du joueur 1
            this.getPosR(this.player2.getId());//récupérer la position de la raquette du joueur 2
            if(temp_score_p1 != this.score_p1 || temp_score_p2!=this.score_p2){//si le score a été modifié
                this.getPosB();//récupérer la position de la balle
                temp_score_p2 = this.score_p2;
                temp_score_p1 = this.score_p1;
                if(this.score_p1 == 3){//si la partie est terminée car il y a un gagnant
                    this.termine = true;
                    gagnant = this.player1;
                    this.postState();
                }else if(this.score_p2 == 3){
                    this.termine = true;
                    gagnant = this.player2;
                    this.postState();
                }
            }

        }
        return gagnant;
    }
    
    setPosR(joueur_id,x,y){//récupérer la position d'un raquette
        if(joueur_id == this.player1.getId()){
            this.raquette1.setPosX(x);
            this.raquette1.setPosY(y)
        }else if(joueur_id == this.player2.getId()){
            this.raquette2.setPosX(x);
            this.raquette2.setPosY(y);
        }
    }
    getPosR(joueur_id){//récupérer la position d'un raquette

    }
    updateScore(joueur_id){//Récupérer le score de la partie

        this.score_p1 = score.score_left;
        this.score_p2 = score.score_right;
    }
    getPosB(x,y){//récupérer la position d'un raquette
        this.balle.setPosX(x);
        this.balle.setPosY(y);
    }
    postState(etat){//envoyer l'etat de la partie
        this.termine = etat
    }
    setPlayer(num, player){
        switch(num){
            case 1:
                this.player1 = player;
                break;
            case 2:
                this.player2 = player;
                break;
        }
    }
    
}

module.exports = Game