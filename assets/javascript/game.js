class word{
    constructor(n){
        this.name = n;
        //this.media=document.getElementById("myAudio"); ;
        this.guesses=5;
    }
    draw(){
        let cha = Array.from(this.name);
        for(let i=0; i<cha.length; i++){
            document.write(cha[i] + " ");
        }

    }
    fail(){
        this.guesses--;
    }
    // playmusic(){
    //     this.media.play();
    // }

}

var wordlist = ["test", "x", "y","hello","world"];
rand = Math.floor(Math.random() * wordlist.length);
var x = new word(wordlist[rand]);
x.draw();