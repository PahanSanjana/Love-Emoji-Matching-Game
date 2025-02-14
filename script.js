const emojis = ["💖", "🌸", "🍫", "💌", "🎀", "🦄", "🍩", "🍓"];
const cards = [...emojis, ...emojis]; 
const loveNotes = [
  "You are my sunshine! 🌞",
  "I love you to the moon and back! 🌙",
  "You make my heart skip a beat! 💓",
  "You are my everything! 💕",
  "Forever and always! 💖",
  "You are my sweetest dream! 🍬",
  "My love for you is endless! 🌊",
  "You are my happily ever after! 🏰",
];
let flippedCards = [];
let matchedCards = [];
let timer;
let timeLeft = 60;
let score = 0;
let gameStarted = false;

const gameBoard = document.getElementById("game-board");
const timerDisplay = document.getElementById("timer");
const scoreDisplay = document.getElementById("score");
const startButton = document.getElementById("start-button");
const restartButton = document.getElementById("restart-button");
const messageContainer = document.getElementById("message-container");
const popup = document.getElementById("popup");
const popupMessage = document.getElementById("popup-message");
const closePopup = document.getElementById("close-popup");


function shuffleCards(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}


function createBoard() {
  const shuffledCards = shuffleCards(cards);
  gameBoard.innerHTML = "";
  shuffledCards.forEach((emoji, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.index = index;
    card.textContent = "❓"; 
    card.addEventListener("click", flipCard);
    gameBoard.appendChild(card);
  });
}


function flipCard() {
  if (!gameStarted || flippedCards.length === 2 || this.classList.contains("matched")) return;

  this.textContent = cards[this.dataset.index]; 
  this.classList.add("flipped");
  flippedCards.push(this);

  if (flippedCards.length === 2) {
    checkMatch();
  }
}


function checkMatch() {
  const [card1, card2] = flippedCards;
  if (card1.textContent === card2.textContent) {
    card1.classList.add("matched");
    card2.classList.add("matched");
    matchedCards.push(card1, card2);
    score += 10;
    scoreDisplay.textContent = score;
    displayMessage(loveNotes[Math.floor(Math.random() * loveNotes.length)]); 
    if (matchedCards.length === cards.length) {
      endGame(true);
    }
  } else {
    setTimeout(() => {
      card1.textContent = "❓"; 
      card2.textContent = "❓";
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
    }, 1000);
  }
  flippedCards = [];
}


function displayMessage(message) {
  messageContainer.textContent = message;
  setTimeout(() => {
    messageContainer.textContent = "";
  }, 2000);
}


function showPopup(message) {
  popupMessage.textContent = message;
  popup.style.display = "flex";
}


closePopup.addEventListener("click", () => {
  popup.style.display = "none";
});


function startGame() {
  gameStarted = true;
  timeLeft = 60;
  score = 0;
  matchedCards = [];
  createBoard();
  timer = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = timeLeft;
    if (timeLeft === 0) {
      endGame(false);
    }
  }, 1000);
  startButton.style.display = "none";
  restartButton.style.display = "inline-block";
}


function endGame(win) {
  clearInterval(timer);
  gameStarted = false;
  if (win) {
    showPopup("🎉 You won! Happy Valentine's Day! 💖\nYou are my forever love! 💌");
  } else {
    showPopup("😢 Time's up! But my love for you is eternal! 💕\nTry again, baby, I know you want my love, \nbut it's not easy to catch— win this game, and it's yours! 💪🎁");
  }
}


restartButton.addEventListener("click", () => {
  startGame();
});


startButton.addEventListener("click", startGame);