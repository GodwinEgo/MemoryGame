//global variables
let cards = document.querySelectorAll(".card");
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let score = 0;
let timer = 0;
let timeInterval;

//shuffle the cards and add event listeners
(function shuffleCards() {
  cards.forEach((card) => {
    let randomPos = Math.floor(Math.random() * cards.length);
    card.style.order = randomPos;
    card.addEventListener("click", flipCard);
  });
})();

//function to flip a card
function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flip");
  if (!hasFlippedCard) {
    //first card flipped
    hasFlippedCard = true;
    firstCard = this;
  } else {
    //second card flipped
    hasFlippedCard = false;
    secondCard = this;

    checkForMatch();
  }
}

//function to check for a match
function checkForMatch() {
  let isMatch = (firstCard.dataset.card = secondCard.dataset.card);
  isMatch ? disableCards() : unflipCards();

  updateScore(isMatch);
}

//function to disable matched cards
function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  resetBoard();
}

//function to unflip non matching cards
function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetBoard();
  }, 1000);
}

//function to reset board after each turn
function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

//fy=unction to update score
function updateScore(isMatch) {
  if (isMatch) {
    score += 10;
    document.getElementById("score").textContent = score;
  } else {
    score -= 5;
    if (score < 0) score = 0;
    document.getElementById("score").textContent = score;
  }
}

//function to start the timer
function startTimer() {
  timerInterval = setInterval(() => {
    timer++;
    document.getElementById("timer").textContent = timer;
  }, 1000);
}

//function to stop the timer
function stopTimer() {
  clearInterval(timerInterval);
}

//function to reset the game
function resetGame() {
  cards.forEach((card) => {
    card.classList.remove("flip");
    card.addEventListener("click", flipCard);
  });
  resetBoard();
  score = 0;
  timer = 0;
  document.getElementById("score").textContent = score;
  document.getElementById("timer").textContent = timer;
}

//event listener for starting the game
document.addEventListener("DOMContentLoaded", () => {
  startTimer();
});

//event listener for restting the game
document.getElementById("reset-button").addEventListener("click", () => {
  stopTimer();
  resetGame();
  startTimer();
});
