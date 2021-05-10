let gameMax = 2;
let playerScore = 0;
let computerScore = 0;
let playerPlay = '';
const resultMessage = document.querySelector('#result');

const OPTIONS = [
    {
        name: 'rock',
        beats: 'scissors'
    },
    {
        name: 'paper',
        beats: 'rock'
    },
    {
        name: 'scissors',
        beats: 'paper'
    }
];

function computerPlay() {
    return OPTIONS[(Math.floor(Math.random()*OPTIONS.length))].name;
}

function playRound(playerSelection, computerSelection) {
    playerSelection = playerSelection.toLowerCase();
    computerSelection = computerSelection.toLowerCase();
    
    if (playerSelection === computerSelection) {
        return {
                statement: `Tie! You both played ${playerSelection}`,
                result: 'Tie'
        };
        
    } else if (computerSelection === OPTIONS[OPTIONS.findIndex(hand => hand.name === playerSelection)].beats) {
        return {
                statement: `Winner! ${playerSelection} beats ${computerSelection}`, 
                result: 'Win'
            };
    } else {
        return {
                statement: `You Lose! ${computerSelection} beats ${playerSelection}`,
                result: 'Lose'
            };
    }
}

function game(playerSelection, computerSelection) {
    let result = {};
    if (playerScore < gameMax && computerScore < gameMax) {
        result = playRound(playerSelection, computerSelection);
        if (result.result === 'Win') {
            playerScore += 1;
        } else if (result.result === 'Lose') {
            computerScore += 1;
        }
        resultMessage.textContent = result.statement;
    }

    if (playerScore === gameMax) {
        resultMessage.textContent = 'You Win! Press Restart to Play Again';
    } else if (computerScore === gameMax) {
        resultMessage.textContent = 'You Lose. Press Restart to Play Again';
    }
}

const buttons = document.createElement('div');
buttons.setAttribute("id", "buttons");

OPTIONS.forEach(e => {
    let button = document.createElement('button');
    button.setAttribute('id', e.name);
    button.classList.add('button');
    button.textContent = e.name[0].toUpperCase()+e.name.slice(1);
    button.addEventListener('click', (e) => game(button.id, computerPlay()));
    buttons.append(button);
});

const main = document.querySelector('main');
const resetButton = document.createElement('button');
resetButton.classList.add('button');
resetButton.textContent = 'reset';
resetButton.addEventListener('click', (e) => {
    playerScore = 0;
    computerScore = 0;
    document.querySelectorAll('button').forEach(btn => {btn.removeAttribute('disabled')});
    resultMessage.textContent = 'New Game! Select your weapon.';
});

main.append(buttons);
main.append(resetButton);
