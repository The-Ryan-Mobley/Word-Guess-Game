var guessword = document.getElementById("guessspot");
var underline = document.getElementById("underlines");
var winloss = document.getElementById("winstate");
var guesscounter = document.getElementById("guesscounter");
var canvas = document.getElementById("canvas");
var my_context = canvas.getContext('2d');

class word {
    constructor(n) {
        this.name = n;
        this.guesses = 5;
        this.rightpicks = 0;
        this.dummysentence = [];
        this.audio = new Audio();
        this.gamepic = new Image();

    }
    clear(){

    }
    draw() {
        this.dummysentence = [];
        for (let i = 0; i < this.name.length; i++) {
            this.dummysentence[i] = "_ ";
        }
        guessword.textContent = this.dummysentence;
    }
    rightguess(letter) { //if player presses a correct key it will redraw the word
        if (x.name.indexOf(letter) !== -1) {
            this.dummysentence[this.name.indexOf(letter)] = letter;
            this.dummysentence[this.name.lastIndexOf(letter)] = letter;
            guessword.textContent = this.dummysentence;

        }
        for(let i = 0; i < x.name.length; i++){
            if(letter === x.name[i]){
                this.rightpicks++;
            }
        }
    }
    playmusic() {

        if (this.name.toLowerCase() === "doom") {
            this.audio.src = "assets/sound/level1.mp3";
            this.gamepic.src = "assets/images/doom_box.jpg"
        }
        if (this.name.toLowerCase() === "skyrim") {
            this.audio.src = "assets/sound/The_Elder_Scrolls_V_Skyrim_Dragonborn_Theme.mp3";
            this.gamepic.src = "assets/images/220px-The_Elder_Scrolls_V_Skyrim_cover.jpg";
        }
        if (this.name.toLowerCase() === "mario") {
            this.audio.src = "assets/sound/Mario-Sheet-Music-Overworld-Main-Theme.mp3";
            this.gamepic.src = "assets/images/220px-Super_Mario_Bros._box.jpg";
        }
        if (this.name.toLowerCase() === "punchout") {
            this.audio.src = "assets/sound/18 - Training Theme.mp3";
            this.gamepic.src = "assets/images/mike-tysons-punch-out-nes-featured.jpg";

        }
        if (this.name.toLowerCase() === "zelda") {
            this.audio.src = "assets/sound/z1theme.mp3";
            this.gamepic.src = "assets/images/zelda.jpg";
        }
        if (this.name.toLowerCase() === "halflife") {
            this.audio.src = "assets/sound/01. Hazardous Environments.mp3";
            this.gamepic.src = "assets/images/ZrV8mkWSiCSpuXtEXyJCdT-320-80.jpg";

        }
        if (this.name.toLowerCase() === "teamfortress") {
            this.audio.src = "assets/sound/32169_Team-Fortress-2-Theme.mp3";
            this.gamepic.src = "assets/images/400px-Team_Fortress_2_Group_Photo.jpg";

        }

        this.audio.play();
        this.audio.loop = true;
    }
    guessdisplay() {
        guesscounter.textContent = this.guesses;

    }
}
var usedwords =[];
var wordlist = ["doom", "skyrim", "mario", "punchout", "zelda", "halflife", "teamfortress"];
var keyes = [];
var rand = Math.floor(Math.random() * wordlist.length);
var x = new word(wordlist[rand]);
x.draw();
x.playmusic();
x.guessdisplay();


function reroll() {
    x.rightpicks =0;
    rand = Math.floor(Math.random() * wordlist.length);
    x.name = wordlist[rand];
    x.draw();
    x.playmusic();
    x.guesses = 5;
    x.guessdisplay();
    winloss.textContent = "";
    keyes= [];
}

function youwin() {
   
    if(wordlist.length > 1){
         wordlist.splice(wordlist.indexOf(x.name), 1);

    }
    else{
        wordlist = ["doom", "skyrim", "mario", "punchout", "zelda", "halflife", "teamfortress"];
    }
    winloss.textContent = "YOU WIN!";
    my_context.fillStyle = "black";
    my_context.fillRect(0, 0, canvas.width, canvas.height);
    my_context.drawImage(x.gamepic, canvas.width / 2 - x.gamepic.width / 2, canvas.height / 2 - x.gamepic.height / 2);


    setInterval(function () {        
    }, 1000);
    winloss.textContent = x.name;
    reroll();

}

document.onkeyup = function (event) {
    let press = event.key.toLowerCase();
    if (x.guesses >= 1) {
        if (keyes.indexOf(press) === -1) {
            keyes.push(press);
            if (x.name.indexOf(press) !== -1) {
                x.rightguess(press);
                if (x.rightpicks === x.name.length) {
                    youwin();
                }
            } else {
                x.guesses--;
                x.guessdisplay();
            }

        }
    }
    if (x.guesses === 0) {
        winloss.textContent = "YOU LOSE";
        reroll();

    }


}