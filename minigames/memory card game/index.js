const cards = document.querySelectorAll(".card");
const cardsList = document.getElementById("cards");
const pairFoundNum = document.getElementById("pair-found-num");
const pairLeftNum = document.getElementById("pair-left-num");
const winDisplayText = document.getElementById("win-display-text");
const replayBtn = document.getElementById("replay-btn");

let timeouts = [];

let flipTime = 600;
let shakeTime = 300;
let cardOne, cardTwo;


replay();

cards.forEach( card => {
    card.children[0].style.display = "none";
    card.children[1].style.display = "block";
    card.addEventListener("click", flipCardCheck)
}); 

replayBtn.addEventListener("click", replay);

function flipCardCheck(event){
    let card = event.target;

    if(!card.hasAttribute("unflipable")){
        flipCard(card);

        switch(true){
            case cardOne == undefined:
                cardOne = card;
                break;
            case cardOne == card:
                cardOne = undefined;
                break;
            case cardTwo == undefined:
                cardTwo = card;
                break;
        }

        if(cardOne != undefined && cardTwo != undefined){
            checkMatch(cardOne, cardTwo);
            cardOne = undefined;
            cardTwo = undefined;
        }
    }
}

function flipCard(card){
    card.classList.add("flip");
    card.setAttribute("unflipable", "");
    timeouts.push(setTimeout(() => {
        if(card.children[0].style.display == "block"){
            card.children[0].style.display = "none";
            card.children[1].style.display = "block"
        }
        else{
            card.children[0].style.display = "block";
            card.children[1].style.display = "none";
        }

        card.children[0].style.transform = "rotateY(180deg)";
        card.children[1].style.transform = "rotateY(180deg)";

        timeouts.push(setTimeout(() => {
            card.children[0].style.transform = "rotateY(0)";
            card.children[1].style.transform = "rotateY(0)";

            card.classList.remove("flip");
            card.removeAttribute("unflipable");
        }, (flipTime/2)))
    }, (flipTime/2)))
}

function shakeCard(card){
    card.classList.add("shake");
    card.setAttribute("unflipable", "");

    timeouts.push(setTimeout(() => {
        card.classList.remove("shake");
        card.removeAttribute("unflipable");
    }, shakeTime));
}

function checkMatch(cardOne, cardTwo){
    let imgOne = cardOne.children[0].src;
    let imgTwo = cardTwo.children[0].src;

    if(imgOne == imgTwo){
        cardOne.removeEventListener("click", flipCardCheck);
        cardTwo.removeEventListener("click", flipCardCheck);

        updateScore();
    }
    else{
        timeouts.push(setTimeout(() => {
            shakeCard(cardOne);
            shakeCard(cardTwo);
                
            timeouts.push(setTimeout(() => {
                flipCard(cardOne);
                flipCard(cardTwo);
            }, shakeTime));
        }, (flipTime + 1)));  //delay the time to ensure adding/removing attribute unflipable
    }
}

function updateScore(){
    pairFoundNum.textContent = Number(pairFoundNum.textContent) + 1;
    pairLeftNum.textContent = Number(pairLeftNum.textContent) - 1;

    if(pairFoundNum.textContent == 8){
        winDisplayText.style.display = "block";
    }
}

function shuffleCard(){
    for (let i = cardsList.children.length; i >= 0; i--) {
        cardsList.appendChild(cardsList.children[Math.random() * i | 0]);
    }
}

function replay(){
    shuffleCard();

    for(var i=0; i < timeouts.length; i++){
        clearTimeout(timeouts[i]);
    }

    cards.forEach( card => {
        card.classList.remove("flip");
        card.classList.remove("shake");

        card.children[0].style.display = "none";
        card.children[1].style.display = "block";
        card.children[1].style.transform = "rotateY(0)";

        card.removeAttribute("unflipable");

        cardOne = undefined;
        cardTwo = undefined;

        card.addEventListener("click", flipCardCheck)
    }); 

    winDisplayText.style.display = "none";

    pairFoundNum.textContent = 0;
    pairLeftNum.textContent = 8;
}