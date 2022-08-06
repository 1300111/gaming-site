const container = document.getElementById("container");
const header = document.getElementById("header");
const userBtn = document.getElementById("userBtn");
const comBtn = document.getElementById("comBtn");

/*Replay Elements*/
const replayUserGameBtn = document.createElement("button");
replayUserGameBtn.className = "choiceBtn";
replayUserGameBtn.textContent = "Replay";

const replayComGameBtn = document.createElement("button");
replayComGameBtn.className = "choiceBtn";
replayComGameBtn.textContent = "Replay";

const replayText = document.createElement("h2");
replayText.textContent = "Wanna replay? Or try the other mode?";

/*User Game Elements*/
const headerUser1 = document.createElement("h2");
const headerUser2 = document.createElement("h2");
const labelUser = document.createElement("h2");
const numDisplay = document.createElement("h3");
const lowerBtn = document.createElement("button");
const higherBtn = document.createElement("button");
const correctBtn = document.createElement("button");

labelUser.id = "labelUser";
numDisplay.id = "num";

lowerBtn.textContent = "Lower";
correctBtn.textContent = "Correct!!!";
higherBtn.textContent = "Higher"; 

lowerBtn.className = "choiceBtn";
higherBtn.className = "choiceBtn";
correctBtn.className = "choiceBtn";

/*Com Game Elements*/
const headerCom1 = document.createElement("h2");
const headerCom2 = document.createElement("h2");
const labelCom = document.createElement("h3");
const numInput = document.createElement("input");
const submit = document.createElement("button");
const compareText = document.createElement("h2");

labelCom.setAttribute("for", "guessNum");
labelCom.id = "labelCom";
numInput.id = "guessNum";
numInput.setAttribute("type", "number");
submit.id = "submit";
compareText.id = "compare";
submit.textContent = "SUBMIT";

/*guesses count*/
let tUser;
userBtn.addEventListener("click", () => tUser = 1);
replayUserGameBtn.addEventListener("click", () => tUser = 1);
lowerBtn.addEventListener("click", () => tUser += 1);
higherBtn.addEventListener("click", () => tUser += 1);

let tCom;
comBtn.addEventListener("click", () => tCom = 0);
replayComGameBtn.addEventListener("click", () => tCom = 0);
submit.addEventListener("click", () => tCom += 1);

userBtn.addEventListener("click", userGame);
replayUserGameBtn.addEventListener("click", userGame);

/*games*/
let num;
comBtn.addEventListener("click", comGame);
replayComGameBtn.addEventListener("click", comGame);

function userGame(){
    userBtn.style.display = "none";
    comBtn.style.display = "none";
    header.style.display = "none";

    labelCom.style.display = "none";
    compareText.style.display = "none";

    replayComGameBtn.style.display = "none";
    replayUserGameBtn.style.display = "none";
    replayText.style.display = "none";

    container.append(headerUser1);
    container.append(headerUser2);

    headerUser1.style.display = "block";
    headerUser1.textContent = "OK!";
    setTimeout(() => {
        headerUser2.style.display = "block";
        headerUser2.textContent = "Think of a number between 1-99!";
    }, 1000);
    
    labelUser.style.display = "none"; 

    setTimeout(() => {
        container.append(labelUser);
        container.append(numDisplay);
        container.append(lowerBtn);
        container.append(correctBtn);
        container.append(higherBtn);

        let x = 50;
        let y = 25;

        labelUser.style.display = "block";
        numDisplay.textContent = `${Math.floor(x)}?`;
        numDisplay.style.display = "block";
        lowerBtn.style.display = "inline";
        higherBtn.style.display = "inline";
        correctBtn.style.display = "inline";

        labelUser.textContent = "Is it"; 

        lowerBtn.addEventListener("click", () => {
            x -= y;
            y /= 2;
            numDisplay.textContent = `${Math.floor(x)}?`;
        });
        higherBtn.addEventListener("click", () => {
            x += y;
            y /= 2;
            numDisplay.textContent = `${Math.floor(x)}?`;
        });
        correctBtn.addEventListener("click", () => {
            headerUser1.style.display = "none";
            headerUser2.style.display = "none";
            numDisplay.style.display = "none";
            lowerBtn.style.display = "none";
            higherBtn.style.display = "none";
            correctBtn.style.display = "none";
            labelUser.style.textAlign = "center";

            if(tUser == 1){
                labelUser.innerHTML = "＼(◎o◎)／ <br> I made it first try!!!"
            }
            else{
                labelUser.innerHTML = `Yay!!! <br> I made it in ${tUser} tries!`
            }

            setTimeout(() => {
                replayUserGameBtn.style.display = "inline";
                replayText.style.display = "block";
                container.append(replayText);
                container.append(replayUserGameBtn);

                comBtn.style.display = "inline";
                comBtn.textContent = "Your Turn!"
                container.append(comBtn);
            }, 2000);
        });
    }, 3000);
}

function comGame(){
    userBtn.style.display = "none";
    comBtn.style.display = "none";
    header.style.display = "none";

    labelUser.style.display = "none";

    replayComGameBtn.style.display = "none";
    replayUserGameBtn.style.display = "none";
    replayText.style.display = "none";

    container.append(headerCom1);
    container.append(headerCom2);

    headerCom1.style.display = "block";
    headerCom1.textContent = "OK!";
    setTimeout(() => {
        headerCom2.style.display = "block";
        headerCom2.textContent = "I'll think of a number between 1-99!"}
    , 1000);

    labelCom.style.display = "none";

    setTimeout(() => {
        container.append(labelCom);
        container.append(numInput);
        container.append(submit);
        container.append(compareText);

        num = Math.floor(Math.random()*99 + 1);
        console.log(num);
        numInput.value = "";

        labelCom.style.display = "block";
        numInput.style.display = "inline";
        submit.style.display = "inline";

        labelCom.textContent = "Enter your guess number:";

        submit.addEventListener("click", () => {
            numInput.style.display = "none";
            submit.style.display = "none";
            compareText.style.display = "block";
            if(numInput.value < num){
                labelCom.style.display = "none";

                compareText.textContent = "Too Low!!!";

                setTimeout(() => {
                    labelCom.style.display = "block";
                    numInput.style.display = "inline";
                    submit.style.display = "inline";
                    compareText.style.display = "none";
                }, 2000);
            }
            else if(numInput.value > num){
                labelCom.style.display = "none";

                compareText.textContent = "Too High!!!";

                setTimeout(() => {
                    labelCom.style.display = "block";
                    numInput.style.display = "inline";
                    submit.style.display = "inline";
                    compareText.style.display = "none";
                }, 2000);
            }
            else{
                headerCom1.style.display = "none";
                headerCom2.style.display = "none";
                numInput.style.display = "none";
                submit.style.display = "none";
                compareText.style.display = "none";

                labelCom.style.fontSize = "26px";

                if(tCom == 1){
                    labelCom.innerHTML = "Yes! That's my number!!! <br> You got it first try!!!";
                }
                else{
                    labelCom.innerHTML = `Yes! That's my number!!! <br> You got it in ${tCom} tries!`;
                }

                setTimeout(() => {
                    container.append(replayText);
                    container.append(replayComGameBtn);
                    replayComGameBtn.style.display = "inline";
                    replayText.style.display = "block";

                    userBtn.style.display = "inline";
                    userBtn.textContent = "My Turn!"
                    container.append(userBtn);
                }, 2000);
            };
        });
    }, 3000);
}



