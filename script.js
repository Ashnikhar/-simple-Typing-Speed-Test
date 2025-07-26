const quotes = [
  "The quick brown fox jumps over the lazy dog.",
  "Typing is a fundamental skill for programmers.",
  "Practice makes perfect when learning to code.",
  "JavaScript enables dynamic web applications.",
  "Focus on accuracy before speed in typing."
];

const quoteEl = document.getElementById("quote");
const inputEl = document.getElementById("input");
const timerEl = document.getElementById("timer");
const wpmEl = document.getElementById("wpm");
const accuracyEl = document.getElementById("accuracy");
const restartBtn = document.getElementById("restart");

let currentQuote = "";
let timer = 0;
let interval = null;
let started = false;

function getRandomQuote() {
  return quotes[Math.floor(Math.random() * quotes.length)];
}

function startTest() {
  currentQuote = getRandomQuote();
  quoteEl.textContent = currentQuote;
  inputEl.value = "";
  timer = 0;
  timerEl.textContent = "0";
  wpmEl.textContent = "0";
  accuracyEl.textContent = "0";
  clearInterval(interval);
  started = false;
}

function calculateWPM(text, timeInSeconds) {
  const words = text.trim().split(/\s+/).length;
  return Math.round((words / timeInSeconds) * 60);
}

function calculateAccuracy(input, target) {
  let correct = 0;
  for (let i = 0; i < input.length; i++) {
    if (input[i] === target[i]) correct++;
  }
  return input.length === 0 ? 0 : Math.round((correct / input.length) * 100);
}

inputEl.addEventListener("input", () => {
  if (!started) {
    started = true;
    interval = setInterval(() => {
      timer++;
      timerEl.textContent = timer;
    }, 1000);
  }

  const inputText = inputEl.value;
  const accuracy = calculateAccuracy(inputText, currentQuote);
  const wpm = calculateWPM(inputText, Math.max(timer, 1));

  accuracyEl.textContent = accuracy;
  wpmEl.textContent = wpm;

  if (inputText === currentQuote) {
    clearInterval(interval);
  }
});

restartBtn.addEventListener("click", startTest);

startTest();
