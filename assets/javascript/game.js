class word{
    constructor(n, m){
        this.name=n;
        this.media=document.getElementById("myAudio"); ;
        this.guesses=5;
    }
    draw(){

    }
    fail(){
        this.guesses--;
    }

}
