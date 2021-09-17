const wordInput = document.querySelector("#word-input");
const currentWord = document.querySelector("#current-word");
const scoreDisplay = document.querySelector("#score");
const timeDisplay = document.querySelector("#time");
const messageDisplay = document.querySelector("#message");
const WORDS = [];
const GAME_TIME = 5;
let score = 0;
let time;
let timeInterval;
let isPlaying = false;
let isGameReady = false;
let words = [];

const API_URL = "https://random-word-api.herokuapp.com/word?number=100";

init();

function init() {
  const res = fetch(API_URL)
    .then((res) => res.json())
    .then((data) => (words = data));
}

wordInput.addEventListener("input", function (e) {
  const typedText = e.target.value;
  const currentText = currentWord.innerText;
  if (typedText.toUpperCase() === currentText.toUpperCase()) {
    addScore();
    setNewWord();
  }
});

function addScore(val) {
  score = score + 1;
  scoreDisplay.innerText = score;
}

function setNewWord() {
  time = GAME_TIME;
  message.innerText = "NOW PLAYING!!";
  wordInput.value = "";
  const randomIndex = Math.floor(Math.random() * words.length);
  currentWord.innerText = words[randomIndex];

  if (!isPlaying) {
    timeInterval = setInterval(countDown, 1000);
    isPlaying = true;
  }
}

function countDown() {
  console.log(time);
  time = time - 1;
  timeDisplay.innerText = time;
  if (time === 0) {
    gameover();
  }
}

function gameover() {
  clearInterval(timeInterval);
  isPlaying = false;
  time = 5;
  timeInterval = null;
  message.innerText = "GAME OVER!!";
  score = 0;
  wordInput.blur();
}
