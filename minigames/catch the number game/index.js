const container = document.getElementById("container");
const gameContainer = document.getElementById("gameContainer");
const resultContainer = document.getElementById("resultContainer");

const easyChoice = document.getElementById("easy");
const mediumChoice = document.getElementById("medium");
const hardChoice = document.getElementById("hard");
const easyText = document.getElementById("easyText");
const mediumText = document.getElementById("mediumText");
const hardText = document.getElementById("hardText");

const startBtn = document.getElementById("startBtn");
const targetText = document.createElement("label");
const targetTextNum = document.createElement("label");
const playground = document.createElement("h1");
const catchBtn = document.createElement("button");
const congratText = document.createElement("h2");
const replayText = document.createElement("h2");

targetText.id = "targetText";
targetTextNum.id = "targetTextNum";
playground.id = "playground";
catchBtn.textContent = "STOP";
catchBtn.id = "catchBtn";
replayText.textContent = "You can reselect the difficulty and replay!"

let t;
setInterval(() => {
    if(easyChoice.checked){
        easyText.style.color = "green";
        t = 350;
    }
    else{easyText.style.color = "black"}
    if(mediumChoice.checked){
        mediumText.style.color = "#d4d406";
        t = 250;
    }
    else{mediumText.style.color = "black"}
    if(hardChoice.checked){
        hardText.style.color = "red";
        t = 150;
    }
    else{hardText.style.color = "black"}
}, 1);

let timer;
let targetNum
let num = 0;
let k = -0.5;
startBtn.addEventListener("click", () => {
    startBtn.style.display = "none";
    catchBtn.style.display = "inline";
    congratText.style.display = "none";
    replayText.style.display = "none";

    gameContainer.append(targetText);
    gameContainer.append(targetTextNum);
    gameContainer.append(playground);
    gameContainer.append(catchBtn);

    targetNum = Math.floor(Math.random()*11);
    targetText.textContent = "Try to catch a ";
    targetTextNum.textContent = targetNum;
    playground.textContent = num;

    timer = setInterval(() => {
        if(num == 10){k -= 1}
        else if(num == 0){k += 1};
        if(k > 0){
            num += 1;
            playground.textContent = num;
        }
        else{
            num -= 1;
            playground.textContent = num;
        }
    }, t);   
});


catchBtn.addEventListener("click", () => {
    clearInterval(timer);

    resultContainer.append(congratText);
    resultContainer.append(replayText);

    congratText.style.display = "block";
    replayText.style.display = "block";
    
    if(num == targetNum){congratText.textContent = "You Win!!!"}
    else{congratText.textContent = "You Lose!"}

    catchBtn.style.display = "none";
    startBtn.style.display = "inline";
});
