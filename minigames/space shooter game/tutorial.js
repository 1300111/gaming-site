const tutorialText = document.querySelector("#tutorial-text");
const dataTutorial = document.querySelector("#data-tutorial-container");
const skipTutorialBtn = document.querySelector("#skip-tutorial-btn");
const endTutorialBtn = document.querySelector("#end-tutorial-btn");
const linebreak = document.createElement("br");

const script = "tutorial script.txt";
let scriptContent = [];
fetch(script)
.then(x => x.text())
.then(y => {
    scriptContent = y.split(/\r?\n/);
});
let contentLine = 0;

let actShipCount = 0;

tutorialBtn.addEventListener("click", playTutorial);

endTutorialBtn.addEventListener("click",endTutorial);
skipTutorialBtn.addEventListener("click",endTutorial);

function playTutorial(){
    startBtn.style.display = "none";
    replayBtn.style.display = "none";
    tutorialBtn.style.display = "none";
    skipTutorialBtn.style.display = "block";
    tutorialText.style.display = "block";
    
    lastSpace = null;
    lastShipTouch = null;
    ship.color = shipColor;
    ship.life = 3;
    ship.x = (gameWidth - 20) / 2;
    ship.y = gameHeight - 20;

    updateEnemyText(0);
    lifeText.textContent = ship.life;

    runningT = true;
    nextTick();
    showMoveTutorial();
}

function nextContent(){
    return(scriptContent[contentLine++]);
}


function showMoveTutorial(){
    tutorialText.innerHTML = nextContent();
    tutorialText.appendChild(linebreak);
    tutorialText.innerHTML += nextContent();    
}

function checkMoveTutorial(){
    if(++actShipCount == 10){
        tutorialText.innerHTML = "";
        showOrangeTutorial();
    }
}

function checkEnemyTutorial(enemy){
    switch(enemy.class){
        case "enemy1":
            showBlueTutorial();
            break;
        case "enemy2":
            showGreenTutorial();
            break;
        case "enemy3":
            showDataTutorial();
            break;
    }
}


function showOrangeTutorial(){
    tutorialText.textContent = nextContent();
    enemies.push(new Enemy1);
}

function showBlueTutorial(){
    tutorialText.textContent = nextContent();
    enemies.push(new Enemy2);
}

function showGreenTutorial(){
    tutorialText.textContent = nextContent();
    enemies.push(new Enemy3);
}

function showDataTutorial(){
    tutorialText.textContent = scriptContent[scriptContent.length - 1];
    dataTutorial.style.display = "block";
    endTutorialBtn.style.display = "block";
}

function endTutorial(){
    runningT = false;

    if(!startBtn.hasAttribute("clicked")){
        startBtn.style.display = "block";
    }
    else{
        replayBtn.style.display = "block";
    }
    tutorialBtn.style.display = "block";
    endTutorialBtn.style.display = "none";
    skipTutorialBtn.style.display = "none";
    tutorialText.style.display = "none";
    dataTutorial.style.display = "none";

    contentLine = 0;
    actShipCount = 0;
    updateEnemyText(0);

    for(let i = 0; i < enemies.length; i++){
        enemies[i].stopBomb(); 
    }
    enemies.splice(0, enemies.length);
    bombs = [];
    bullets = [];
}
