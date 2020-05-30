const hands = ["Rock", "Paper", "Scissors"];
const maxScore = 5;
let computerScore = 0;
let playerScore = 0;
let computerScoreBoard = document.querySelector('#computerScoreBoard');
let playerScoreBoard = document.querySelector('#playerScoreBoard');

function computerPlay() {
  return hands[Math.floor(Math.random() * 3)];
}

function playRound(playerSelection, computerSelection) {
  if (playerSelection == computerSelection) {
    result.textContent = 'It\s a draw! \n \nYou both played ' + playerSelection + '.';
  } else if (
    (playerSelection === hands[0] && computerSelection !== hands[1]) ||
    (playerSelection === hands[1] && computerSelection !== hands[2]) ||
    (playerSelection === hands[2] && computerSelection !== hands[0])
  ) {
    playerScore++;
    playerScoreBoard.textContent = playerScore;

    result.textContent = 'You won this round! \n \n' + playerSelection + ' beats ' + computerSelection + '.';
  } else {
    computerScore++;
    computerScoreBoard.textContent = computerScore;

    result.textContent = 'You lost this round! \n \n' + computerSelection + ' beats ' + playerSelection + '.';
  }
}

function game(playerSelection, computerSelection) {
  if (playerScore < maxScore && computerScore < maxScore) {
    playRound(playerSelection, computerSelection); 
  }
  if (playerScore == maxScore) {
      result.textContent = 'You Win! \n \nYou beat the computer by ' + (playerScore - computerScore);
      if ((playerScore - computerScore) > 1) {
        result.textContent += ' rounds.';
      } else {
        result.textContent += ' round.'
      }
      return console.log("You Win!");
    } else if (computerScore == maxScore) {
      result.textContent = 'You Lose! \n \nThe computer beat you by ' + (computerScore - playerScore);
      if ((computerScore - playerScore) > 1) {
        result.textContent += ' rounds.';
      } else {
        result.textContent += ' round.';
      }
      return console.log("You Lose!");
  }
}

const result = document.querySelector('#result');
const main = document.querySelector("main");
const buttons = document.createElement("div");
buttons.setAttribute("id", "buttons");
main.appendChild(buttons);

let docFrag = document.createDocumentFragment();

for (let i = 0; i < hands.length; i++) {
  let button = document.createElement("button");
  button.setAttribute("id", hands[i]);
  button.setAttribute("class", "button");
  button.textContent = hands[i];
  docFrag.appendChild(button);
}
buttons.appendChild(docFrag);


const resetButton = document.createElement('button');
resetButton.setAttribute('id', 'resetButton');
resetButton.textContent = 'Reset';
resetButton.addEventListener('click', (e) => {
  playerScore = 0;
  computerScore = 0;
  if (result.textContent != '') {
    result.textContent = 'Game Restarted \n\nGood Luck!'
  }
  playerScoreBoard.textContent = playerScore;
  computerScoreBoard.textContent = computerScore;
})
main.appendChild(resetButton)


const buttonsAll = document.querySelectorAll(".button");
buttonsAll.forEach((button) => {
  button.addEventListener("click", (e) => {
    let playerSelection = button.id;
    let computerSelection = computerPlay();
    game(playerSelection, computerSelection);
  });
});
