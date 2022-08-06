const gameBoard = document.getElementById("gameBoard");
const scoreText = document.getElementById("scoreText");
const runBtn = document.getElementById("runBtn");
const countDownText = document.getElementById("countDownText");
const pauseBtn = document.getElementById("pauseBtn");
const restartBtn = document.getElementById("restartBtn");

const ctx = gameBoard.getContext("2d");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = "#006ebd";
const paddle1Color = "red";
const paddle2Color = "black";
const paddleBorderColor = "black";
const ballColor = "white";
const ballBorderColor = "black";
const ballRadius = 12.5;
const paddleMove = 50;

let intervalID;
let ballSpeed;
let ballX;
let ballY;
let ballXMove = 0;
let ballYMove = 0;
let p1Score = 0;
let p2Score = 0;

let paddle1 = {
    width: 25,
    height: 100,
    x: 0,
    y: 0
}
let paddle2 = {
    width: 25,
    height: 100,
    x: gameWidth - 25,
    y: gameHeight - 100
}

let running = false;

clearBoard();
drawPaddles();
createBall();

runBtn.addEventListener("click", () => {
    runBtn.textContent = "Continue";
    runBtn.style.display = "none";

    restartBtn.style.display = "none";

    let count = 3;
    countDownText.style.display = "block";
    countDown();
    let counting = setInterval(countDown, 1000);

    function countDown(){
        if(count > 0){
        countDownText.textContent = count;
        count -= 1;
        }
        else{
            clearInterval(counting);
            countDownText.style.display = "none";

            pauseBtn.style.display = "block";

            running = true;
            nextTick();
        }
    };
});

function nextTick(){
    intervalID = setTimeout(() => {
        clearBoard();
        drawPaddles();
        moveBall();
        drawBall(ballX, ballY);
        checkTouch();

        nextTick();
    }, 10)
}

function clearBoard(){
    ctx.fillStyle = boardBackground;
    ctx.fillRect(0, 0, gameWidth, gameHeight);
}

function drawPaddles(){
    ctx.strokeStyle = paddleBorderColor;

    ctx.fillStyle = paddle1Color;
    ctx.fillRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);
    ctx.strokeRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);

    ctx.fillStyle = paddle2Color;
    ctx.fillRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
    ctx.strokeRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
}

function createBall(){
    ballX = gameWidth / 2;
    ballY = gameHeight / 2;

    ballSpeed = 1.5;
    if(Math.round(Math.random()) == 1){
        ballXMove = 1;
    }
    else{
        ballXMove = -1;
    }
    if(Math.round(Math.random()) == 1){
        ballYMove = Math.random() * 1;    //more random directions
    }
    else{
        ballYMove = Math.random() * -1;    //more random directions
    }

    drawBall(ballX, ballY);
}

function moveBall(){
    ballX += (ballSpeed * ballXMove);
    ballY += (ballSpeed * ballYMove);
}

function drawBall(x, y){
    ctx.fillStyle = ballColor;
    ctx.strokeStyle = ballBorderColor;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
}

function checkTouch(){
    if(ballY <= 0 + ballRadius || ballY >= gameHeight - ballRadius){
        ballYMove *= -1;
    }
    if(ballX <= 0){
        p2Score += 1;
        updateScore();
        createBall();
        return;    //when touch end the function
    }

    if(ballX >= gameWidth){
        p1Score += 1;
        updateScore();
        createBall();
        return;   
    }

    if(ballX <= paddle1.x + paddle1.width + ballRadius){
        if(ballY > paddle1.y && ballY < paddle1.y + paddle1.height / 2){
            ballX = paddle1.x + paddle1.width + ballRadius; //prevent ball get stuck
            ballXMove *= -1;
            ballYMove = Math.random() * -1;
            ballSpeed += 0.25;
        }
        else if(ballY >= paddle1.y + paddle1.height / 2 && ballY < paddle1.y + paddle1.height){
            ballX = paddle1.x + paddle1.width + ballRadius; 
            ballXMove *= -1;
            ballYMove = Math.random() * 1;
            ballSpeed += 0.25;   
        }
    }
    if(ballX >= paddle2.x - ballRadius){
        if(ballY > paddle2.y && ballY < paddle2.y + paddle2.height / 2){
            ballX = paddle2.x - ballRadius; 
            ballXMove *= -1;
            ballYMove = Math.random() * -1;
            ballSpeed += 0.25;
        }
        else if(ballY >= paddle2.y + paddle2.height / 2 && ballY < paddle2.y + paddle2.height){
            ballX = paddle2.x - ballRadius; 
            ballXMove *= -1;
            ballYMove = Math.random() * 1;
            ballSpeed += 0.25;   
        }
    } 
}

window.addEventListener("keydown", event => {
    if(running){
        let keyPressed = event.keyCode;
        const paddle1Up = 87;
        const paddle1Down = 83;
        const paddle2Up = 38;
        const paddle2Down = 40;

        switch(keyPressed){
            case paddle1Up:
                if(paddle1.y > 0){
                    paddle1.y -= paddleMove;
                }
                break;
            case paddle1Down:
                if(paddle1.y < gameHeight - paddle1.height){
                    paddle1.y += paddleMove;
                }
                break;
            case paddle2Up:
                if(paddle2.y > 0){
                    paddle2.y -= paddleMove;
                }
                break;
            case paddle2Down:
                if(paddle2.y < gameHeight - paddle2.height){
                    paddle2.y += paddleMove;
                }
                break;
        }
    }
});

function updateScore(){
    scoreText.textContent = `${p1Score} : ${p2Score}`
}

pauseBtn.addEventListener("click", () => {
    running = false;

    pauseBtn.style.display = "none";
    runBtn.style.display = "block";
    restartBtn.style.display = "block";

    clearTimeout(intervalID);
});

restartBtn.addEventListener("click", () => {    
    p1Score = 0;
    p2Score = 0;
    paddle1 = {
        width: 25,
        height: 100,
        x: 0,
        y: 0
    }
    paddle2 = {
        width: 25,
        height: 100,
        x: gameWidth - 25,
        y: gameHeight - 100
    }
    ballSpeed = 1;
    ballX = gameWidth / 2;
    ballY = gameHeight / 2;

    running = false;
    
    updateScore();
    clearTimeout(intervalID);
    clearBoard();
    drawPaddles();
    createBall();

    runBtn.textContent = "Start";
    runBtn.style.display = "block";
    restartBtn.style.display = "none";
});
