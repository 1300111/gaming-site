const gameBoard = document.querySelector("#game-board");
const enemyText = document.querySelector("#enemy-text");
const lifeText = document.querySelector("#life-text");
const startBtn = document.querySelector("#start-btn");
const continueBtn = document.querySelector("#continue-btn");
const replayBtn = document.querySelector("#replay-btn");
const pauseBtn = document.querySelector("#pause-btn");
const tutorialBtn = document.querySelector("#tutorial-btn");

const ctx = gameBoard.getContext("2d");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackgroundColor = "#080029";
const tickInterval = 10;

const shipInvincibilityTime = 3000;
const shipInvincibilityInterval = 250;
const shipColor = "#ebedeb";
const invincibilityColor = "rgba(0, 0, 0, 0)";

let tickIntervalID;
let running = false;
let lastSpace = null;
let lastShipTouch = null;
let lastPause = Date.now();
let lastContinue = Date.now();
let pauseTime;

let bullets = [];
const bulletCreateTime = 350;

let enemyIntervalID;
let enemies1 = []; 
let enemies2 = [];
let enemies3 = [];
let enemiesList = [
    enemies1,
    enemies2,
    enemies3,
];
let enemySpawnTime = 5000;

let bombs1 = [];
const bomb1SpawnTime = 1000;
let bombs2 = [];
const bomb2SpawnTime = 1500;
let bombs3 = [];
const bomb3SpawnTime = 2000;
let bombsList = [
    bombs1,
    bombs2,
    bombs3,
];

let ship = {
    life: 3,
    color: shipColor,
    width: 20,
    height: 20,
    x: (gameWidth - 20) / 2,
    y: gameHeight - 20,
    speed: 20,
}

class Bullet{
    color = "#fff582";
    width = 5;
    height = 10;
    x = ship.x + (ship.width - 5) / 2;
    y = ship.y;
    speed = 7.5;
}

class Enemy1{
    class = "enemy1";

    color = "#ffa500";
    width = 80;
    height = 15;
    x = randomNum(0, gameWidth - this.width, 1);
    y = randomNum(0, gameHeight / 2 - this.height, 1);

    direction = Math.round(Math.random());   // 0 = left, 1 = right
    speed = 5;

    move(){
        if(this.x <= 0){
            this.direction = 1;
        }
        if(this.x >= gameWidth - this.width){
            this.direction = 0;
        }

        if(this.direction == 0){
            this.x -= this.speed;
        }
        else{
            this.x += this.speed;
        }

        drawEnemy(this);
    };

    lastBomb = Date.now()
    createBomb = setInterval(() => {
        if(running && Date.now() - this.lastBomb >= bomb1SpawnTime){
            bombs1.push(new Bomb1(this.x, this.y, this.width, this.height))
            this.lastBomb = Date.now();
        }
    }, tickInterval);

    stopBomb(){clearInterval(this.createBomb)};
}

class Enemy2{
    class = "enemy2";

    color = "#0000ff"
    width = 40;
    height = 40;
    x = randomNum(0, gameWidth - this.width, 2);
    y = randomNum(0, gameHeight/4 - this.height, 2);

    direction = Math.round(Math.random());  // 0 = counter-clockwise, 1 = clockwise
    xDistance = randomNum(100, 500, 2);
    yDistance = randomNum(50, 250, 2);
    xRoot = this.x;
    yRoot = this.y;
    xMove = 0;
    yMove = 0;
    speed = 2;

    move(){
        if(this.direction == 0){
            if((this.xRoot - this.xDistance) < 0){ 
                this.xDistance = this.xRoot;
            }

            if(
                this.x <= this.xRoot &&
                this.x > (this.xRoot - this.xDistance) && 
                this.y == this.yRoot
            ){
                this.xMove = -1;
                this.yMove = 0;
            }
            else if(
                this.x >= (this.xRoot - this.xDistance) && 
                this.x < this.xRoot &&
                this.y == (this.yRoot + this.yDistance)
            ){
                this.xMove = 1;
                this.yMove = 0;
            }
            else if(
                this.y >= this.yRoot &&
                this.y < (this.yRoot + this.yDistance) &&
                this.x == (this.xRoot - this.xDistance)
            ){
                this.xMove = 0;
                this.yMove = 1;
            }
            else if(
                this.y <= (this.yRoot + this.yDistance) &&
                this.y > this.yRoot &&
                this.x == this.xRoot
            ){
                this.xMove = 0;
                this.yMove = -1;
            }
        }
        else{
            if((this.xRoot + this.xDistance + this.width) > gameWidth){ 
                this.xDistance = gameWidth - this.xRoot - this.width;
            }

            if(
                this.x >= this.xRoot &&
                this.x < (this.xRoot + this.xDistance) && 
                this.y == this.yRoot
            ){
                this.xMove = 1;
                this.yMove = 0;
            }
            else if(
                this.x <= (this.xRoot + this.xDistance) && 
                this.x > this.xRoot &&
                this.y == (this.yRoot + this.yDistance)
            ){
                this.xMove = -1;
                this.yMove = 0;
            }
            else if(
                this.y >= this.yRoot &&
                this.y < (this.yRoot + this.yDistance) &&
                this.x == (this.xRoot + this.xDistance)
            ){
                this.xMove = 0;
                this.yMove = 1;
            }
            else if(
                this.y <= (this.yRoot + this.yDistance) &&
                this.y > this.yRoot &&
                this.x == this.xRoot
            ){
                this.xMove = 0;
                this.yMove = -1;
            }
        }

        this.x += (this.speed * this.xMove);
        this.y += (this.speed * this.yMove);

        drawEnemy(this);
    };

    lastBomb = Date.now()
    createBomb = setInterval(() => {
        if(running && Date.now() - this.lastBomb >= bomb2SpawnTime){
            bombs2.push(new Bomb2(this.x, this.y, this.width, this.height))
            this.lastBomb = Date.now();
        }
    }, tickInterval);

    stopBomb(){clearInterval(this.createBomb)};
}

class Enemy3{
    class = "enemy3";
    life = 2;

    color = "#00ff00";
    width = 50;
    height = 20;
    x = randomNum(0, gameWidth - this.width, 1);
    y = randomNum(0, gameHeight / 2 - this.height, 1);

    direction = Math.round(Math.random());   // 0 = left, 1 = right
    xDistance = randomNum(50, 450, 1);
    xRoot = this.x;
    speed = 1;

    move(){
        if(this.direction == 0){
            this.x -= this.speed;

            if(
                this.x <= (this.xRoot - this.xDistance) ||
                this.x <= 0
            ){
                this.direction = 1;
            }
        }
        else{
            this.x += this.speed;

            if(
                this.x >= (this.xRoot + this.xDistance) ||
                this.x >= (gameWidth - this.width)
            ){
                this.direction = 0;
            }
        }

        drawEnemy(this);
    }

    lastBomb = Date.now()
    createBomb = setInterval(() => {
        if(running && Date.now() - this.lastBomb >= bomb3SpawnTime){
            bombs3.push(new Bomb3(this.x, this.y, this.width, this.height))
            this.lastBomb = Date.now();
        }
    }, tickInterval);

    stopBomb(){clearInterval(this.createBomb)};
}

class Bomb1{
    color = "#ff0000";
    width = 4;
    height = 12;
    speed = 6;

    constructor(enemy1X, enemy1Y, enemy1Width, enemy1Height){
        this.x = enemy1X + (enemy1Width - this.width) / 2;
        this.y = enemy1Y + (enemy1Height - this.height); 
    }
}

class Bomb2{
    color = "#ff0000";
    width = 10;
    height = 12;
    speed = 3;

    constructor(enemy2X, enemy2Y, enemy2Width, enemy2Height){
        this.x = enemy2X + (enemy2Width - this.width) / 2;
        this.y = enemy2Y + (enemy2Height - this.height); 
    }

}

class Bomb3{
    color = "#ff0000";
    width = 15;
    height = 15;
    speed = 1;

    constructor(enemy3X, enemy3Y, enemy3Width, enemy3Height){
        this.x = enemy3X + (enemy3Width - this.width) / 2;
        this.y = enemy3Y + (enemy3Height - this.height); 
    }

}

clearBoard();

startBtn.addEventListener("click", () => {
    startBtn.style.display = "none";
    // tutorialBtn.style.display = "none";
    pauseBtn.style.display = "block";

    startGame();
});

continueBtn.addEventListener("click", () => {
    continueBtn.style.display = "none";
    // tutorialBtn.style.display = "none";
    pauseBtn.style.display = "block";

    pauseTime = Date.now() - lastPause;
    console.log(pauseTime);
    lastSpace += pauseTime;
    lastShipTouch += pauseTime;
    for(let i = 0; i < enemiesList.length; i++){
        for(let j = 0; j < enemiesList[i].length; j++){
            enemiesList[i][j].lastBomb += pauseTime;
        }
    }

    running = true;
    nextTick();
});

pauseBtn.addEventListener("click", () => {
    continueBtn.style.display = "block";
    // tutorialBtn.style.display = "block";
    pauseBtn.style.display = "none";

    running = false;
    lastPause = Date.now();
});

replayBtn.addEventListener("click", () => {
    replayBtn.style.display = "none";
    // tutorialBtn.style.display = "none";
    pauseBtn.style.display = "block";

    enemySpawnTime = 5000;

    lastSpace = null;
    lastShipTouch = null;
    lastPause = Date.now();
    lastContinue = Date.now();

    ship.color = shipColor;
    ship.life = 3;
    ship.x = (gameWidth - 20) / 2;
    ship.y = gameHeight - 20;

    updateEnemyText(0);
    lifeText.textContent = ship.life;

    startGame();
});

window.addEventListener("keydown", actShip);

function startGame(){
    running = true;

    clearBoard();
    drawShip();
    
    enemies1.push(new Enemy1);
    enemies2.push(new Enemy2);
    enemies3.push(new Enemy3);
    createEnemy();

    nextTick();
}

function nextTick(){
    if(running){
        tickIntervalID = setTimeout(() => {
            clearBoard();

            shootBullet();
            dropBomb();
            moveEnemy();
            drawShip();
            checkBulletTouchEnemy();
            checkBombTouchShip();
            checkEnemyTouchShip();

            nextTick();
        }, tickInterval)
    }
}

function clearBoard(){
    ctx.fillStyle = boardBackgroundColor;
    ctx.fillRect(0, 0, gameWidth, gameHeight);
}

function randomNum(min, max, dis){
    return Math.floor((Math.random() * (max - min + 1) + min) / dis) * dis;
}


function actShip(event){
    let keyPressed = event.code;
    const left = "KeyA";
    const right = "KeyD";
    const up = "KeyW";
    const down = "KeyS";
    const shoot = "Space";
    if(running){
        switch(keyPressed){
            case left:
                if(ship.x > 0){
                    ship.x -= ship.speed;
                }
                break;
            case right:
                if(ship.x < gameWidth - ship.width){
                    ship.x += ship.speed;
                }
            break;
            case up:
                if(ship.y > 0){
                    ship.y -= ship.speed;
                }
                break;
            case down:
                if(ship.y < gameHeight - ship.height){
                ship.y += ship.speed;
                }
                break;
            case shoot:
                createBullet();  
                break;
        }
    }
}

function drawShip(){
    ctx.fillStyle = ship.color;
    ctx.fillRect(ship.x, ship.y, ship.width, ship.height);
}


function createBullet(){
    if(!lastSpace || Date.now() - lastSpace >= bulletCreateTime){
        lastSpace = Date.now();

        bullets.push(new Bullet);
    }
}

function shootBullet(){
    for(let i = 0; i < bullets.length; i++){
        if(bullets[i].y > -bullets[i].height){
            bullets[i].y -= bullets[i].speed;

            drawBullet(bullets[i]);
        }
        else{bullets.splice(i, 1);}
    }
}

function drawBullet(bullet){
    ctx.fillStyle = bullet.color;
    ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
}


function createEnemy(){
    let enemy;
    let rand;
    enemyIntervalID = setTimeout(() => {
        if(running){
            rand = randomNum(1, 3, 1);

            switch(rand){
                case 1:
                    enemy = new Enemy1;
                    enemies1.push(enemy);
                    break;
                case 2:
                    enemy = new Enemy2;
                    enemies2.push(enemy);
                    break;
                case 3:
                    enemy = new Enemy3;
                    enemies3.push(enemy);
                    break;
            }
        }

        createEnemy();
    }, enemySpawnTime)

}

function moveEnemy(){
    for(let i = 0; i < enemiesList.length; i++){
        for(let j = 0; j < enemiesList[i].length; j++){
            enemiesList[i][j].move();
        }
    }
}

function drawEnemy(enemy){
    ctx.fillStyle = enemy.color;
    ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
}

function clearEnemy(enemyList, index){
    enemyList[index].stopBomb(); 
    enemyList.splice(index, 1);
    updateEnemyText(1);
}


function dropBomb(){
    for(let i = 0; i < bombsList.length; i++){
        for(let j = 0; j < bombsList[i].length; j++){
            if(bombsList[i][j].y < gameHeight){
                bombsList[i][j].y += bombsList[i][j].speed;

                drawBomb(bombsList[i][j]);
            }
            else{bombsList[i].splice(j, 1);}
        }
    }
}

function drawBomb(bomb){
    ctx.fillStyle = bomb.color;
    ctx.fillRect(bomb.x, bomb.y, bomb.width, bomb.height);
}


function checkBulletTouchEnemy(){
    let bullet, enemy;
    for(let i = 0; i < enemiesList.length; i++){
        for(let j = 0; j < enemiesList[i].length; j++){
            for(let k = 0; k < bullets.length; k++){
                bullet = bullets[k];
                enemy = enemiesList[i][j];
                
                if(
                    bullet.x >= enemy.x - bullet.width + 1 &&
                    bullet.x <= enemy.x + enemy.width - 1 &&
                    bullet.y >= enemy.y - bullet.height + 1 &&
                    bullet.y <= enemy.y + enemy.height - 1
                ){
                    bullets.splice(k, 1);

                    if(enemy.class == "enemy3" && enemy.life == 2){
                        enemy.life -= 1;
                    }
                    else{
                        clearEnemy(enemiesList[i], j)
                    }
                }
            }
        }
    }
}

function checkBombTouchShip(){
    let bomb;
    for(let i = 0; i < bombsList.length; i++){
        for(let j = 0; j < bombsList[i].length; j++){
            bomb = bombsList[i][j];

            if(
                bomb.x >= ship.x - bomb.width + 1 &&
                bomb.x <= ship.x + ship.width - 1 &&
                bomb.y >= ship.y - bomb.height + 1 &&
                bomb.y <= ship.y + ship.height - 1
            ){
                if(!invincibleShip()){
                    bombsList[i].splice(j, 1);
                    updateLife();

                    lastShipTouch = Date.now();

                    displayInvincibility();
                    ship.color = invincibilityColor;
                }
            }
        }
    }
}

function checkEnemyTouchShip(){
    let enemy;
    for(let i = 0; i < enemiesList.length; i++){
        for(let j = 0; j < enemiesList[i].length; j++){
            enemy = enemiesList[i][j];

            if(
                enemy.x >= ship.x - enemy.width + 1 &&
                enemy.x <= ship.x + ship.width - 1 &&
                enemy.y >= ship.y - enemy.height + 1 &&
                enemy.y <= ship.y + ship.height - 1
            ){
                if(!invincibleShip()){
                    clearEnemy(enemiesList[i], j);
                    updateLife();

                    lastShipTouch = Date.now();

                    displayInvincibility();
                    ship.color = invincibilityColor;
                }
            }
        }
    }
}


function invincibleShip(){
    if(!lastShipTouch || Date.now() - lastShipTouch >= shipInvincibilityTime){
        return false;
    }
    else{
        return true;
    }
}

function displayInvincibility(){
    let displayInvincibilityIntervalID = setInterval(() => {
        if(running){
            if(invincibleShip()){
                ship.color = ship.color == shipColor ? invincibilityColor : shipColor;
            }
            else{
                ship.color = shipColor;
                clearInterval(displayInvincibilityIntervalID);
            }
        }
    }, shipInvincibilityInterval)
}

function checkIncreaseDif(enemyDown){
    if(enemyDown % 5 == 0){
        switch(true){
            case enemySpawnTime > 3500:
                enemySpawnTime -= 500;
                break;
            case enemySpawnTime > 2000:
                enemySpawnTime -= 250;
                break;
            case enemySpawnTime > 1000:
                enemySpawnTime -= 200;
                break;
            default:
                return;
        }
    }
}


function updateLife(){
    lifeText.textContent = --ship.life;

    if(ship.life == 0){
        running = false;

        displayGameOver();
    }
}

function updateEnemyText(k){
    if(k == 1){
        enemyText.textContent = Number(enemyText.textContent) + 1;

        checkIncreaseDif(Number(enemyText.textContent));
    }
    else{
        enemyText.textContent = 0;
    }
}

function displayGameOver(){
    ctx.font = "50px Comic Sans MS";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER!!!", gameWidth / 2, gameHeight / 2 - 50);

    replayBtn.style.display = "block";
    // tutorialBtn.style.display = "block";
    pauseBtn.style.display = "none";

    for(let i = 0; i < enemiesList.length; i++){
        for(let j = 0; j < enemiesList[i].length; j++){
            enemiesList[i][j].stopBomb(); 
        }
        enemiesList[i].splice(0, enemiesList[i].length)
    }

    for(let i = 0; i < bombsList.length; i++){
        bombsList[i].splice(0, bombsList[i].length);
    }

    bullets = [];

    clearTimeout(tickIntervalID);
    clearTimeout(enemyIntervalID);
}
