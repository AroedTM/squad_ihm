class Balle{

    posX;
    posY;

    constructor(posX,posY){
        this.posX = posX;
        this.posY = posY;
    }

    getPosX(){
        return this.posX;
    }

    getPosY(){
        return this.posY;
    }

    setPosX(positionX){
        this.posX = positionX;
    }

    setPosY(positionY){
        this.posY = positionY;
    }
}

module.exports = Balle