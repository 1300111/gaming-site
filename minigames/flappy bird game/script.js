const gameBoard = document.querySelector("#game-board");
const startBtn = document.querySelector("#start-btn");
const continueBtn = document.querySelector("#continue-btn");
const replayBtn = document.querySelector("#replay-btn");
const pauseBtn = document.querySelector("#pause-btn");

const ctx = gameBoard.getContext("2d");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const skyColor = "#87CEEB";
const landColor = "#7CFC00";
const landY = gameHeight - 25;
const tickInterval = 10;
let lastPause = Date.now();

const gra_acc = 4; 
const flyDelay = 200;

const pillarGap = 100;
const pillarSpeed = 2;
let pillarCreateDistance = 500;
let pillarTotalCount = 0;

let birdY0 = 150; 
let birdV0 = 0;
let time0;
let lastSpace = null;
let tickIntervalID;
let running = false;

let pillars = [];
let score = 0;

let bird = {
    color: "#FFFF00",
    width: 30,
    height: 25,
    x: 100,
    y: birdY0,
    
    beakColor: "#964B00",
    beakWidth: 15,
    beakHeight: 6,
    eyeColor: "#00DB36",
    eyeWidth: 5,
    eyeHeight: 5,
}

class Pillar{
    color = "#02CC35";
    width = 70;
    height = randomNum(25, 350);
    x = gameWidth;
}

clearBoard();

startBtn.addEventListener("click", () => {
    startBtn.style.display = "none";
    pauseBtn.style.display = "block";

    startGame();
});

pauseBtn.addEventListener("click", () => {
    continueBtn.style.display = "block";
    pauseBtn.style.display = "none";

    running = false;
    lastPause = Date.now();
});

continueBtn.addEventListener("click", () => {
    continueBtn.style.display = "none";
    pauseBtn.style.display = "block";

    time0 += Date.now() - lastPause;

    running = true;
    nextTick();
});

replayBtn.addEventListener("click", () => {
    replayBtn.style.display = "none";
    pauseBtn.style.display = "block";

    lastPause = Date.now();
    pillarCreateDistance = 500;
    pillarTotalCount = 0;
    birdY0 = 150;
    bird.y = birdY0; 
    birdV0 = 0;
    lastSpace = null;
    pillars = [];
    score = 0;

    clearBoard();
    startGame();
});

window.addEventListener("keydown", flyBird);


function startGame(){
    running = true;

    time0 = Date.now();
    pillars.push(new Pillar);
    pillarTotalCount += 1;
    createPillar();

    nextTick();
}

function nextTick(){
    if(running){
        tickIntervalID = setTimeout(() => {       
            clearBoard();
            fallBird();
            movePillar();
            createPillar();   
            displayScore();

            checkTouchLand();
            checkTouchPillar();
            checkUpdateScore();

            nextTick();
        }, tickInterval)
    }
}

function clearBoard(){
    ctx.fillStyle = skyColor;
    ctx.fillRect(0, 0, gameWidth, gameHeight);

    ctx.fillStyle = landColor;
    ctx.fillRect(0, landY, gameWidth, 25);
    ctx.beginPath();
    ctx.moveTo(0, landY);
    ctx.lineTo(gameWidth, landY);
    ctx.stroke();
}

function randomNum(min, max, dis){
    if(!dis){dis = 1};
    return Math.floor((Math.random() * (max - min + 1) + min) / dis) * dis;
}


function drawBird(){
    ctx.fillStyle = bird.color;
    ctx.fillRect(bird.x, bird.y, bird.width, bird.height);
    ctx.strokeRect(bird.x, bird.y, bird.width, bird.height);

    ctx.fillStyle = bird.beakColor;
    ctx.fillRect(bird.x + 25, bird.y + 10, bird.beakWidth, bird.beakHeight);
    ctx.strokeRect(bird.x + 25, bird.y + 10, bird.beakWidth, bird.beakHeight);

    ctx.fillStyle = bird.eyeColor;
    ctx.fillRect(bird.x + 23, bird.y + 4, bird.eyeWidth, bird.eyeHeight);
}

function fallBird(){
    let time = (Date.now() - time0)/100;
    bird.y = (gra_acc * time**2)/2 - birdV0*time + birdY0;

    drawBird();

}

function flyBird(event){
    if(event.code == "Space"){
        if(Date.now() - lastSpace >= flyDelay){ 
            time0 = Date.now();
            lastSpace = Date.now();

            birdV0 = 20;
            birdY0 = bird.y;  
        }
    }; 
}


function drawPillar(pillar){
    ctx.fillStyle = pillar.color;

    ctx.fillRect(pillar.x, -10, pillar.width, pillar.height + 10);
    ctx.strokeRect(pillar.x, -10, pillar.width, pillar.height + 10);

    ctx.fillRect(pillar.x, pillar.height + pillarGap, pillar.width, gameHeight - (pillar.height + pillarGap + 25));
    ctx.strokeRect(pillar.x, pillar.height + pillarGap, pillar.width, gameHeight - (pillar.height + pillarGap + 25));
}

function movePillar(){
    for(let i = 0; i < pillars.length; i++){
        pillars[i].x -= pillarSpeed;
        drawPillar(pillars[i]);
    }

    //clear pillar
    if(pillars[0].x < -pillars[0].width){
        pillars.splice(0,1)
    }
}

function createPillar(){
    if(gameWidth - pillars[pillars.length - 1].x == pillarCreateDistance){
        pillars.push(new Pillar);
        pillarTotalCount += 1;
    }
}


function checkUpdateScore(){
    for(let i = 0; i < pillars.length; i++){
        if(pillars[i].x + pillars[i].width == bird.x){
            score += 1;
        }
    }

    switch(true){
        case pillarTotalCount >= 6 && pillarTotalCount < 16:
            pillarCreateDistance = 400;
            break;
        case pillarTotalCount >= 16:
            pillarCreateDistance = 300;
            break;
    }
}

function displayScore(){
    ctx.font = "50px Comic Sans MS";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText(score, gameWidth / 2, 75);
}


function checkTouchLand(){
    if(bird.y >= landY - bird.height){
        running = false;
        displayGameOver();
    }
}

function checkTouchPillar(){
    for(let i = 0; i < pillars.length; i++){
        let pillar = pillars[i];

        if(
            (bird.x >= pillar.x - bird.width &&
            bird.x <= pillar.x + pillar.width) &&
            !(bird.y > pillar.height &&
            bird.y < pillar.height + pillarGap - bird.height) 
        ){
            running = false;
            displayGameOver();
        }
    }
}

function displayGameOver(){
    ctx.font = "50px Comic Sans MS";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER!!!", gameWidth / 2, gameHeight / 2 - 50);

    replayBtn.style.display = "block";
    pauseBtn.style.display = "none";
}
