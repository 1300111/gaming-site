const container = document.getElementById("container");
const gameContainer = document.getElementById("gameContainer");
const resultContainer = document.getElementById("resultContainer");

const easyChoice = document.getElementById("easy");
const mediumChoice = document.getElementById("medium");
const hardChoice = document.getElementById("hard");
const randChoice = document.getElementById("rand");
const easyText = document.getElementById("easyText");
const mediumText = document.getElementById("mediumText");
const hardText = document.getElementById("hardText");
const randText = document.getElementById("randText");

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
    }
    else{easyText.style.color = "black"}
    if(mediumChoice.checked){
        mediumText.style.color = "#d4d406";
    }
    else{mediumText.style.color = "black"}
    if(hardChoice.checked){
        hardText.style.color = "red";
    }
    else{hardText.style.color = "black"}
    if(randChoice.checked){
        randText.style.color = "purple";
    }
    else{randText.style.color = "black"}
}, 1);

let timer;
let targetNum;
let num;
let randomSpeed = false;
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

    switch(true){
        case easyChoice.checked:
            t = 900; 
            randomSpeed = false;
            break;
        case mediumChoice.checked:
            t = 600; 
            randomSpeed = false;
            break;
        case hardChoice.checked:
            t = 300; 
            randomSpeed = false;
            break; 
        case randChoice.checked:
            t = 1; //will be random when running
            randomSpeed = true;
            break;       
    }

    updateNum();

    function startTimer(){
        timer = setTimeout(updateNum, t);
    }  
    
    function updateNum(){
        if(randomSpeed){
            t = Math.floor(Math.random()*800) + 200;
        }    

        playground.textContent = createRandomNum();
        function createRandomNum(){
            num = Math.floor(Math.random()*11);

            if(Number(playground.textContent) == num){
                return createRandomNum(num)
            }
            else{
                return num;
            }
        }

        startTimer();
    }
});


catchBtn.addEventListener("click", () => {
    clearTimeout(timer);

    resultContainer.append(congratText);
    resultContainer.append(replayText);

    congratText.style.display = "block";
    replayText.style.display = "block";
    
    if(num == targetNum){congratText.textContent = "You Win!!!"}
    else{congratText.textContent = "You Lose!"}

    catchBtn.style.display = "none";
    startBtn.style.display = "inline";
});
