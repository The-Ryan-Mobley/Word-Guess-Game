var guessword = document.getElementById("guessspot");
var underline = document.getElementById("underlines");
var winloss = document.getElementById("winstate");


class word{
    constructor(n){
        this.name = n;
        this.guesses=5;
        this.dummysentence =[];
        

    }
    draw(){
        
        for(let i=0; i<this.name.length; i++){
            this.dummysentence[i]="_ ";
            
        }
        guessword.textContent = this.dummysentence;
    }
    rightguess(letter){ //if player presses a correct key it will redraw the word
        if(x.name.indexOf(letter) !==-1){
            this.dummysentence[this.name.indexOf(letter)] = letter;
            guessword.textContent= this.dummysentence;
    
        }
    }
    playmusic(){
        var audio = new Audio();
        if(this.name.toLowerCase() === "doom"){
            audio.src = "../sound/level1.mid";
            
        }
        if(this.name.toLowerCase() === "skyrim"){
            audio.src = "../sound/The_Elder_Scrolls_V_Skyrim_Dragonborn_Theme.mid";
        }
        if(this.name.toLowerCase() === "mario"){
            audio.src = "../sound/Mario-Sheet-Music-Overworld-Main-Theme.mid";
        }
        audio.play();
    }
}

var wordlist = ["doom", "skyrim", "mario"];
var keyes =[];
rand = Math.floor(Math.random() * wordlist.length);
var x = new word(wordlist[rand]);
x.draw();
x.playmusic();
//creates new class from wordlist and corrisponding media file
// function createwords(){

// }


document.onkeyup = function(event) {
    let press = event.key.toLowerCase();
    if(keyes.indexOf(press) === -1){
        keyes.push(press);
        if(x.name.indexOf(press) !== -1){
            x.rightguess(press);
        }
        else{
            
        }
    
    }
    
    
}