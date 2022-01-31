const choices=document.querySelectorAll('.choice');
// const rock=document.getElementById('rock');
// const paper=document.getElementById('paper');
// const scissors=document.getElementById('scissors');
const score=document.getElementById('score');
const result=document.getElementById('result');
const restart=document.getElementById('restart');
const modal=document.querySelector('.modal');
const scoreboard={
    player:0,
    computer:0
};

//play
function play(e){
    restart.style.display='inline-block';
    const playerChoice=e.target.id;
    const computerChoice=getComputerChoice();
    const winner=getWinner(playerChoice,computerChoice);
    showWinner(winner,computerChoice);//need to know computer choice regardless of win for aftermath info
}

//computer choice
function getComputerChoice(){
    const rand=Math.random();
    if(rand<0.34){
        return 'rock';
    }else if(rand<=0.67){
        return 'paper';
    }else{
        return 'scissors';
    }
}

function getWinner(pC,cC){//playerchoice,computerchoice
    if(pC===cC){
        return 'draw';
    }else if(
        (pC === "rock" && cC === "paper") ||
        (pC === "paper" && cC === "scissors") ||
        (pC === "scissors" && cC === "rock")
    ){
        return 'computer';
    }else{
        return 'player';
    }
}

function showWinner(winner,computerChoice){
    if(winner==='player'){
        //increase score
        scoreboard.player++;
        //result of the modal
        result.innerHTML=`<h1 class="win">Player Win</h1>
                            <i class="choice fas fa-hand-${computerChoice} fa-10x"></i>
                            <p>Computer Chose <strong>${computerChoice.charAt(0).toUpperCase()+computerChoice.slice(1)}</strong></p>
                            `;
    }else if(winner==='computer'){
        scoreboard.computer++;
        result.innerHTML=`<h1 class="win">Computer Win</h1>
                            <i class="choice fas fa-hand-${computerChoice} fa-10x"></i>
                            <p>Computer Chose <strong>${computerChoice.charAt(0).toUpperCase()+computerChoice.slice(1)}</strong></p>
                            `;
    }else{
        result.innerHTML=`<h1 class="win">Draw</h1>
                            <p>Computer Chose <strong>${computerChoice.charAt(0).toUpperCase()+computerChoice.slice(1)}</strong></p>
                            `;
    }
    //show score
    score.innerHTML=
    `<p>Player: ${scoreboard.player}</p>
    <p>Computer: ${scoreboard.computer}</p>
    `;

    modal.style.display='block';
}

function resetModal(e){//take event parameter
    if(e.target==modal){
        modal.style.display='none';
    }
}

function restartGame(){
    scoreboard.player=0;
    scoreboard.computer=0;
    score.innerHTML=
    `
    <p>Player: 0</p>
    <p>Computer: 0</p>
    `
}

//event listeners
choices.forEach(choice=>choice.addEventListener('click',play));
window.addEventListener('click',resetModal);
restart.addEventListener('click',restartGame);

{/* <h1 class="win">win!</h1>
<i class="choice fas fa-hand-rock fa-10x"></i>
<p>computer: rock</p> */}
