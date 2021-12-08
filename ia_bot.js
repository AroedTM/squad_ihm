class Ia_bot {
    posx;
    posy;

    constructor(posx, posy) {
        this.posx = posx;
        this.posy = posy;
    }

    deplacement(posy_ball){
        if (posy_ball > (this.posy - 50) && (this.posy - 2) > limit_down){
            this.posy = this.posy - 2;
        }

        else if (posy_ball < (this.posy - 50) && (this.posy + 2) < limit_up){
            this.posy = this.posy + 2;
        }
    }




}