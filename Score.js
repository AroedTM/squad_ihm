class Score{
    score_left;
    score_right;

    constructor() {
        this.score_left = 0;
        this.score_right = 0;
    }

    update_score(which){
        //which is a number, 0 means left wins, 1 means right wins
        if (which == 0){
            this.score_left = this.score_left + 1;
        }
        else{
            this.score_right = this.score_right + 1;
        }

    }


}
