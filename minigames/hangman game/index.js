import wordList from "./wordlist.js";

const wordContainer = document.getElementById("word-container");
const inputContainer = document.getElementById("input-container")
const inputText = document.getElementById("input-text");
const submitBtn = document.getElementById("submit-btn");
const remindContainer = document.getElementById("remind-container");
const hintBtn = document.getElementById("hint-btn");
const hintText = document.getElementById("hint-text");
const wrongLetters = document.getElementById("wrong-letters");
const lifeDisplay = document.getElementById("life-display");
const endgameText = document.getElementById("endgame-text");
const replayBtn = document.getElementById("replay-btn");

let randNum = Math.floor(Math.random()*wordList.length);
let randWord = wordList[randNum].word;
for(let i = 0; i < randWord.length; i++){
    wordContainer.children[i].style.display = "block";
    if(randWord[i] == " " || randWord[i] == "-" || randWord[i] == "'"){
        wordContainer.children[i].textContent = randWord[i];
    }
    else{wordContainer.children[i].textContent = "_";}
}

let wrongLettersList = [];

let life = 10;

inputContainer.style.display = "block";

submitBtn.addEventListener("click", checkInput);
window.addEventListener("keydown", event => {
    if(event.key == "Enter"){
        event.preventDefault();
        if(inputContainer.style.display == "block"){
            checkInput();
        }
        else{
            replay();
        }
    };
});

hintBtn.addEventListener("click", revealHint);

replayBtn.addEventListener("click", replay);

function checkInput(){
    if(inputText.textContent.length == 0 || !isLettersAndSpaces(inputText.textContent)){
        revealRemind();
    }
    else if(inputText.textContent.length == 1){
        checkLetter();
        inputText.textContent = "";
    }
    else{
        checkWord();
        inputText.textContent = "";
    };
    
    function isLettersAndSpaces(n){
        return !(/^[\s]+$/.test(n)) && !(/[0-9]/.test(n))
    }
}

function revealRemind(){
    if(remindContainer.style.opacity == 0){
        remindContainer.style.opacity = 1;
        disappearAnimation();
    }
    else{remindContainer.style.opacity = 1;}

    function disappearAnimation(){
        setTimeout(() => {
            if(remindContainer.style.opacity > 0){
                remindContainer.style.opacity -= 0.01;
                disappearAnimation();
            }
        }, 20);
    }
}

function checkLetter(){
    let letter = inputText.textContent.toLowerCase();

    if(randWord.indexOf(letter) != -1){
        for(let i = 0; i < randWord.length; i++){
            if(letter == randWord[i]){
                wordContainer.children[i].textContent = letter;
            }
        }

        checkWinner();
    }
    else{
        updateWrongLetters(letter);
    }
}

function checkWord(){
    let word = inputText.textContent.toLowerCase();
    
    if(word == randWord){
        for(let i = 0; i < randWord.length; i++){
            wordContainer.children[i].textContent = randWord[i];
        }

        winDisplay();
    }
    else{
        updateLife();
    }
}

function updateWrongLetters(letter){
    if(wrongLettersList.indexOf(letter) == -1){
        wrongLettersList.push(letter);

        if(wrongLettersList.length == 1){
            wrongLetters.textContent += letter;
        }
        else{
            wrongLetters.textContent += `, ${letter}`;
        }

        updateLife();
    }
}

function updateLife(){
    lifeDisplay.children[10-life].style.visibility = "visible";
    life -= 1;

    if (life == 0){
        loseDisplay();
    }
}

function checkWinner(){
    for(let i = 0; i < randWord.length; i++){
        if(wordContainer.children[i].textContent != randWord[i]){
            return;
        }
    }

    winDisplay();
}

function loseDisplay(){
    endgameText.style.display = "block";
    replayBtn.style.display = "inline";

    inputContainer.style.display = "none";

    for(let i = 0; i < randWord.length; i++){
        wordContainer.children[i].textContent = randWord[i];
    }
    
    endgameText.textContent = "YOU LOSE!"; 

    revealHint();
}

function winDisplay(){
    endgameText.style.display = "block";
    replayBtn.style.display = "inline";

    inputContainer.style.display = "none";

    for(let i = 0; i < randWord.length; i++){
        wordContainer.children[i].textContent = randWord[i];
    }

    endgameText.textContent = "YOU WIN!"; 

    revealHint();
}

function revealHint(){
    hintBtn.style.display = "none";
    hintText.style.display = "inline-block";

    let hint = wordList[randNum].hint;
    hintText.textContent = hint;
}

function replay(){
    endgameText.style.display = "none";
    replayBtn.style.display = "none";

    inputContainer.style.display = "block";
    inputText.focus();

    hintBtn.style.display = "inline";
    hintText.style.display = "none";

    randNum = Math.floor(Math.random()*wordList.length);
    randWord = wordList[randNum].word;
    for(let i =0; i < wordContainer.childElementCount; i++){
        wordContainer.children[i].style.display = "none";
    }
    for(let i = 0; i < randWord.length; i++){
        wordContainer.children[i].style.display = "block";
        if(randWord[i] == " " || randWord[i] == "-" || randWord[i] == "'"){
            wordContainer.children[i].textContent = randWord[i];
        }
        else{wordContainer.children[i].textContent = "_";}
    }

    wrongLettersList = [];
    wrongLetters.textContent = "";

    life = 10;
    for(let i = 0; i < 10; i++){
        lifeDisplay.children[i].style.visibility = "hidden";
    };
}