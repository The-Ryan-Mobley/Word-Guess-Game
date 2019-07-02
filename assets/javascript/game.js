var guessword = document.getElementById("guessspot");                   //HTML Elements  where the user input is displayed
var winloss = document.getElementById("winstate");                      //shows the title of the game or displays that you lost
var guesscounter = document.getElementById("guesscounter");             //counts rmeaining guesses
var canvas = document.getElementById("canvas");                         //canvas that displays game images
var my_context = canvas.getContext('2d');

class word {
    constructor(n) {
        this.name = n;                                                  //the name that the player guesses essential for most of the program
        this.guesses = 5;                                               //how many guesses the player has
        this.rightpicks = 0;                                            //counts how many right characters have been pressed to determine completion
        this.dummysentence = [];                                        //prints blank underscores to hide correct name
        this.audio = document.getElementById("audio");                  //plays music
        this.gamepic = new Image();                                     //the picture of the game

    }
    clear(){                                                            //clears out the canvas before every image do avoid overlap
        my_context.fillStyle = "black";
        my_context.fillRect(0, 0, canvas.width, canvas.height);

    }
    draw() {                                                            //draws dummytext at the start of the level
        
        this.dummysentence = [];
        for (let i = 0; i < this.name.length; i++) {
            this.dummysentence[i] = "_ ";
        }
        guessword.textContent = this.dummysentence;
    }
    rightguess(letter) {                                                  //if player presses a correct key it will redraw the corresponding letter
        if (this.name.indexOf(letter) !== -1) {
            for(let i = 0; i < this.name.length; i++){
                if(letter === this.name[i]){
                    this.dummysentence[i] = letter + " ";
                    this.rightpicks++;
                }
            }
        }
        guessword.textContent = this.dummysentence;
        }
    playmusic() {                                                          //selects proper music and img corresponding to name
        switch(this.name.toLowerCase()){
            case "doom":{
                this.audio.src = "assets/sound/level1.mp3";
                this.gamepic.src = "assets/images/doom_box.jpg"
                break;
            }
            case "skyrim":{
                this.audio.src = "assets/sound/The_Elder_Scrolls_V_Skyrim_Dragonborn_Theme.mp3";
                this.gamepic.src = "assets/images/220px-The_Elder_Scrolls_V_Skyrim_cover.jpg";
                break;
            }
            case "mario":{
                this.audio.src = "assets/sound/Mario-Sheet-Music-Overworld-Main-Theme.mp3";
                this.gamepic.src = "assets/images/220px-Super_Mario_Bros._box.jpg";
                break;
            }
            case  "punchout":{
                this.audio.src = "assets/sound/18 - Training Theme.mp3";
                this.gamepic.src = "assets/images/mike-tysons-punch-out-nes-featured.jpg";
                break;
            }
            case "zelda":{
                this.audio.src = "assets/sound/z1theme.mp3";
                this.gamepic.src = "assets/images/zelda.jpg";
                break;
            }
            case "halflife":{
                this.audio.src = "assets/sound/01. Hazardous Environments.mp3";
                this.gamepic.src = "assets/images/ZrV8mkWSiCSpuXtEXyJCdT-320-80.jpg";
                break;
            }
            case "teamfortress":{
                this.audio.src = "assets/sound/32169_Team-Fortress-2-Theme.mp3";
                this.gamepic.src = "assets/images/400px-Team_Fortress_2_Group_Photo.jpg";
            }
            default:{
                console.log(this.name);
            }
        }
                                                                  
        //this.audio.loop = true;
        // const playPromise = this.audio.play();
        // if (playPromise !== null){
        // playPromise.catch(() => { this.aduio.play();})
        // }

    }
    guessdisplay() {                                                                    //displays how many guesses the player has
        guesscounter.textContent = "Guesses Left: " + this.guesses;

    }
    cleanslate(){                                                                       //initializes the first level
        winloss.textContent ="???";
        this.clear();
        this.draw();
        this.playmusic();
        this.guessdisplay();
    }
}

var wordlist = ["doom", "skyrim", "mario", "punchout", "zelda", "halflife", "teamfortress"];      //list of words used
var keyes = [];                                                                                   //logs pressed keyes
var rand = Math.floor(Math.random() * wordlist.length);                                           //rng
var x = new word(wordlist[rand]);                                                                 //initializes game object

x.cleanslate();                                                                                   //initializes first level

function reroll() {
    x.rightpicks =0;
    rand = Math.floor(Math.random() * wordlist.length);
    x.name = wordlist[rand];
    x.guesses = 5;
    keyes= [];
    x.draw();
    x.playmusic();
    x.guessdisplay();
}

function youwin() {                                                                                   //draws new image corresponding to game and removes previous level from
                                                                                                      //the array and resets it once it is empty. also resets parameters for
    if(wordlist.length > 1){                                                                          //the next level
         wordlist.splice(wordlist.indexOf(x.name), 1);

    }
    else{
        wordlist = ["doom", "skyrim", "mario", "punchout", "zelda", "Halflife", "teamfortress"];
    }
    x.clear();
    my_context.drawImage(x.gamepic, canvas.width / 2 - x.gamepic.width / 2, canvas.height / 2 - x.gamepic.height / 2);  
    winloss.textContent = x.name.toUpperCase();
    reroll();

}

document.onkeyup = function (event) {                                                                   //main controls based on keypress
    

    let press = event.key.toLowerCase();
    if (x.guesses >= 1) {                                                                       
        if (keyes.indexOf(press) === -1) {                                                              //checks if repeat press
            keyes.push(press);
            if (x.name.indexOf(press) !== -1) {                                                         //checks if a key matches part of name
                x.rightguess(press);
                if (x.rightpicks === x.name.length) {                                                   //checks if player has filled out name(possibly can just use dummytext)
                    youwin();
                }
            } else {                                                                                    //counts down guesses
                x.guesses--;
                x.guessdisplay();
            }

        }
    }
    if (x.guesses === 0) {                                                                      
        winloss.textContent = "YOU LOSE";
        alert("YOU LOSE");
        reroll();

    }


}