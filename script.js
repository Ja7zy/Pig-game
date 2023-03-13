"use strict";

// elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
const currentScore0El = document.getElementById("current--0");
const currentScore1El = document.getElementById("current--1");
const diceEl = document.querySelector(".dice");
const playerOneNameEl = document.querySelector(".player-one");
const playerTwoNameEl = document.querySelector(".player-two");
const modalEl = document.querySelector(".modal");
const player1DefaultEl = document.getElementById("name--0");
const player2DefaultEl = document.getElementById("name--1");
const overlayEl = document.querySelector(".overlay");
const rulesEl = document.querySelector(".rules");

// btns
const newGameBtn = document.querySelector(".btn--new");
const rollDiceBtn = document.querySelector(".btn--roll");
const holdBtn = document.querySelector(".btn--hold");
const enterBtn = document.querySelector(".btn--enter");
const rulesBtn = document.querySelector(".btn--rules");

// initialization
let scores, currentScore, playing, activePlayer;

const init = () => {
  scores = [0, 0]; // to stores both players scores.
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  // updating initial scores
  score0El.textContent = 0;
  score1El.textContent = 0;

  diceEl.classList.add("hidden");

  // setting default player
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");

  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");

  // default player name and empty text field
  player1DefaultEl.textContent = "Player 1";
  player2DefaultEl.textContent = "Player 2";
  playerOneNameEl.value = "";
  playerTwoNameEl.value = "";

  // modal, overlay and rules
  modalEl.classList.remove("hide-modal-overlay");
  overlayEl.classList.remove("hide-modal-overlay");
  rulesEl.classList.add(".hidden-modal");
};
init();

// Entering player names
enterBtn.addEventListener("click", () => {
  const playerOne = playerOneNameEl.value;
  const playerTwo = playerTwoNameEl.value;
  player1DefaultEl.textContent = playerOne;
  player2DefaultEl.textContent = playerTwo;
  modalEl.classList.add("hide-modal-overlay");
  overlayEl.classList.add("hide-modal-overlay");
});

// switching players and uresetting current score to 0
const switchPlayer = () => {
  // setting current score to 0 before switching player
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;

  // switching players
  // if the current active player is player 1 switch to player 2 and vice versa
  activePlayer = activePlayer === 0 ? 1 : 0;

  // setting active player color scheme
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

// roll dice functionality
rollDiceBtn.addEventListener("click", () => {
  if (playing) {
    // create a dice roll
    let dice = Math.ceil(Math.random() * 6);

    // display dice and updating dice images corrsponding to dice roll
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;

    // if dice is not equal to 1 update current score
    if (dice !== 1) {
      // add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;

      // else switch player
    } else {
      switchPlayer();
    }
  }
});

// hold button functionality
holdBtn.addEventListener("click", () => {
  if (playing) {
    // update currentscore of active player to score and reset currentscore to 0
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    document.getElementById(`current--${activePlayer}`).textContent = 0;
  }
  // if score of current active player is >= 100 declare him the winner and set playing = false to terminate dice roll and hold button functionality.
  if (scores[activePlayer] >= 100) {
    playing = false;
    diceEl.classList.add("hidden");
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add("player--winner");
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove("player--active");
  } else {
    switchPlayer();
  }
});

// New game button
newGameBtn.addEventListener("click", init);

// RULES btn
rulesBtn.addEventListener("click", () => {
  rulesEl.classList.remove("hide-modal-overlay");
  overlayEl.classList.remove("hide-modal-overlay");
});

overlayEl.addEventListener("click", () => {
  rulesEl.classList.add("hide-modal-overlay");
  overlayEl.classList.add("hide-modal-overlay");
});
