const rowSize = 20;
const columnSize = 20;
const bombTotal = 85;
const gameSize = rowSize * columnSize;
const flagNum = document.getElementById("flag-num");
const landList = document.getElementById("lands");
let lands;

const winText = document.getElementById("win-text");
const loseText = document.getElementById("lose-text");
const replayText = document.getElementById("replay-text");
const textBg = document.getElementById("text-bg");

document.getElementById("game-container").addEventListener("contextmenu", e => e.preventDefault());
document.getElementById("wrapper").style.width = `${rowSize * 25}px`;
landList.style.gridTemplateColumns = `repeat(${rowSize}, auto)`;


replay();

window.addEventListener("keydown", event => {
    if(event.code == "KeyR"){
        lands.forEach(land => land.remove());
        replayText.style.display = "none";
        textBg.style.display = "none";
        winText.style.display = "none";
        loseText.style.display = "none";

        replay();
    }
});

function replay(){
    setBoard();
    lands = document.querySelectorAll("#lands > li"); 
    lands.forEach(land => land.addEventListener("mousedown", setInit));
    flagNum.textContent = bombTotal;
}

function setBoard(){
    for(let i = 0; i < gameSize; i++){
        let land = document.createElement("li")
        land.classList.add(landClass());
        landList.appendChild(land);
    }

    function landClass(){
        if(landList.childElementCount == 0){
            return "odd";
        }
        else if(landList.childElementCount % rowSize == 0){
            let upperLandClass = landList.children[landList.childElementCount - rowSize].className;
            return upperLandClass == "odd" ? "even" : "odd";
        }
        else{
            let lastLandClass = landList.lastElementChild.className;
            return lastLandClass == "odd" ? "even" : "odd";
        }
    }
}

function setInit(event){
    let landInit = event.target;
    let button = event.button;
    let bombNum = bombTotal;
    
    switch(button){
        case 0: 
            setBomb(landInit);            
            digLand(landInit);
            break;
        case 2:
            setFlag(landInit);
            break;
    }

    function setBomb(landInit){    
        while(bombNum > 0){
            let randomIndex = Math.floor(Math.random() * gameSize);
            let landRan = landList.children[randomIndex];
            let noBombIndex = surroundingIndex(landInit).concat(Array.from(lands).indexOf(landInit));

            if(!(landRan.className.includes("bomb") || noBombIndex.includes(randomIndex))){
                landRan.classList.add("bomb");
                //landRan.textContent = "X";
                bombNum -= 1;
            }
        }

        lands.forEach(land => land.removeEventListener("mousedown", setInit));
        lands.forEach(land => land.addEventListener("mousedown", digLandCheck));
    }
}


function digLandCheck(event){
    let land = event.target; 
    let button = event.button;
    
    switch(button){
        case 0:
            if(!land.className.includes("flag")){
                if(land.className.includes("bomb")){
                    showBomb();
                    displayEnd(false);
                }
                else{
                    digLand(land);
                    checkWin();
                };
            }
            break;
        case 2:
            setFlag(land);
            break;
    }  
}

function digLand(land){
    if(!land.className.includes("digged")){
        land.removeEventListener("mousedown", digLandCheck);
        land.classList.add("digged");
        if(land.className.includes("flag")){
            land.classList.remove("flag");
            land.children[0].remove();
            flagNum.textContent = Number(flagNum.textContent) + 1;

        }
        land.style.backgroundColor = land.className.includes("odd") ? "#E5C29F" : "#D7B899";

        let bombCount = countBomb(surroundingIndex(land));
        land.textContent = bombCount == 0 ? "" : bombCount;

        if(bombCount == 0){
            for(let i = 0; i < surroundingIndex(land).length; i++){
                digLand(landList.children[surroundingIndex(land)[i]]);
            }
        }
    }
}

function setFlag(land){   
    if(!land.className.includes("flag")){
        let flag = document.createElement("img");
        flag.src = "flag.png";

        land.classList.add("flag");
        land.appendChild(flag);
        flagNum.textContent = Number(flagNum.textContent) - 1;
    }
    else{
        land.classList.remove("flag");
        land.children[0].remove();
        flagNum.textContent = Number(flagNum.textContent) + 1;
    }
}


function surroundingIndex(land){
    let landIndex = Array.from(lands).indexOf(land);
    let surroundingIndexList = [
        landIndex - rowSize - 1, 
        landIndex - rowSize, 
        landIndex - rowSize + 1, 
        landIndex - 1, 
        landIndex + 1, 
        landIndex + rowSize - 1, 
        landIndex + rowSize, 
        landIndex + rowSize + 1,
    ];   
    let checkedList = [];

    for(let i = 0; i < surroundingIndexList.length; i++){
        if(surroundingIndexList[i] < 0 || surroundingIndexList[i] > gameSize - 1){
            continue;
        }
        switch(true){
            case i <= 2: //check the 3 up lands
                if(Math.floor(landIndex / rowSize) - Math.floor(surroundingIndexList[i] / rowSize) == 1){
                    checkedList.push(surroundingIndexList[i]);
                }
                break;
            case i <= 4: //check the 2 side lands
                if(Math.floor(landIndex / rowSize) == Math.floor(surroundingIndexList[i] / rowSize)){
                    checkedList.push(surroundingIndexList[i]);
                }
                break;
            case i <= 7: //check the 3 down lands
                if(Math.floor(surroundingIndexList[i] / rowSize) - Math.floor(landIndex / rowSize) == 1){
                    checkedList.push(surroundingIndexList[i]);
                }
                break;
        }
    }

    return checkedList;
}

function countBomb(indexList){
    let count = 0;
    
    for(let i = 0; i < indexList.length; i++){
        if(landList.children[indexList[i]].className.includes("bomb")){
            count += 1;
        }
    }

    return count;
}


function showBomb(){
    lands.forEach(land => {
        if(land.className.includes("bomb") && !land.className.includes("flag")){
            let bomb = document.createElement("img");
            bomb.src = "bomb.png";
            land.appendChild(bomb);
        }
    })
}

function displayEnd(win){
    lands.forEach(land => land.removeEventListener("mousedown", digLandCheck));
    replayText.style.display = "block";
    textBg.style.display = "block";
    if(!win){
        loseText.style.display = "block";
    }
    else{
        winText.style.display = "block";
    } 
}

function checkWin(){
    let bool = true;
    
    for(let i = 0; i < gameSize; i++){
        if(!(landList.children[i].className.includes("digged") || landList.children[i].className.includes("bomb"))){
            bool = false;
            break;
        }
    }

    if(bool){
        displayEnd(true);
    }
}