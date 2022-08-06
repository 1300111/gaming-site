const gameBoard = document.getElementById("gameBoard");
const scoreText = document.getElementById("scoreText");
const runBtn = document.getElementById("runBtn");

const ctx = gameBoard.getContext("2d");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = "white";
const snakeColor = "green";
const snakeBorder = "black";
const foodColor = "red";
const unitSize = 25;       //unit the snake will travel per tick

let running = false;
let score;
let xMove;
let yMove;
let foodX;
let foodY;
let snake;

const easyChoice = document.getElementById("easy");
const mediumChoice = document.getElementById("medium");
const hardChoice = document.getElementById("hard");
const easyText = document.getElementById("easyText");
const mediumText = document.getElementById("mediumText");
const hardText = document.getElementById("hardText");

let t;
setInterval(() => {
    if(easyChoice.checked){
        easyText.style.color = "green";
        t = 140;
    }
    else{easyText.style.color = "black"}
    if(mediumChoice.checked){
        mediumText.style.color = "#d4d406";
        t = 90;
    }
    else{mediumText.style.color = "black"}
    if(hardChoice.checked){
        hardText.style.color = "red";
        t = 40;
    }
    else{hardText.style.color = "black"}
}, 1);

runBtn.addEventListener("click", () => {
    score = 0;
    xMove = unitSize;
    yMove = 0;
    snake = [        //an array of objects, each object is one body part
    {x:unitSize * 3, y:0},
    {x:unitSize * 2, y:0},
    {x:unitSize * 1, y:0},
    {x:0, y:0}
    ];

    runBtn.textContent = "Restart";
    runBtn.style.top = "50%";
    runBtn.style.display = "none";

    gameStart();
});

window.addEventListener("keydown", changeDirection);

function gameStart(){
    running = true;
    scoreText.textContent = score;

    createFood();
    nextTick();
}

function nextTick(){
    if(running){
        setTimeout(() => {
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkOver();

            nextTick();
        }, t);
    }
    else{
        displayOver();
    }
};

function clearBoard(){
    ctx.fillStyle = boardBackground;
    ctx.fillRect(0, 0, gameWidth, gameHeight);
}

function createFood(){
    function PositionRandom(min, max){
        return Math.floor((Math.random() * (max - min + 1) + min) / unitSize) * unitSize;  // create a random number between max and min and dividable by unitSize
    }

    foodX = PositionRandom(0, gameWidth - unitSize);
    foodY = PositionRandom(0, gameHeight - unitSize);

    for(let i = 0; i < snake.length; i++){
        if(snake[i].x == foodX && snake[i].y == foodY){
            createFood();
        }    
    }
}

function drawFood(){
    ctx.fillStyle = foodColor;
    ctx.fillRect(foodX, foodY, unitSize, unitSize);
}

function moveSnake(){
    let head = {
        x: snake[0].x + xMove,
        y: snake[0].y + yMove,
    }
    snake.unshift(head);

    if(snake[0].x == foodX && snake[0].y == foodY){
        score += 1;
        scoreText.textContent = score;
        createFood();
    }
    else{
        snake.pop();
    }
}

function drawSnake(){
    ctx.fillStyle = snakeColor;
    ctx.strokeStyle = snakeBorder;
    snake.forEach(snakePart => {
        ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
        ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
    })
}

function changeDirection(event){
    let keyPressed = event.keyCode;
    const up = 87;
    const left = 65;
    const down = 83;
    const right = 68;

    const goingUp = (yMove == -unitSize);
    const goingLeft = (xMove == -unitSize);
    const goingDown = (yMove == unitSize);
    const goingRight = (xMove == unitSize);

    switch(true){
        case(keyPressed == up && !goingDown):
            xMove = 0;
            yMove = -unitSize;
            break;
        case(keyPressed == left && !goingRight):
            xMove = -unitSize;
            yMove = 0;
            break;
        case(keyPressed == down && !goingUp):
            xMove = 0;
            yMove = unitSize;
            break;
        case(keyPressed == right && !goingLeft):
            xMove = unitSize;
            yMove = 0;
            break;
    }
}

function checkOver(){
    switch(true){
        case (snake[0].x < 0):
            running = false;
            break;
        case (snake[0].x >= gameWidth):
            running = false;
            break;
        case (snake[0].y < 0):
            running = false;
            break;
        case (snake[0].y >= gameHeight):
            running = false;
            break;
    }
    for(let i = 1; i < snake.length; i++){
        if(snake[i].x == snake[0].x && snake[i].y == snake[0].y){
            running = false;
        }
    }
}

function displayOver(){
    ctx.font = "50px Comic Sans MS";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER!!!", gameWidth / 2, gameHeight / 2 - 25);

    runBtn.style.display = "block";

    running = false;
}

