const grid = document.getElementById("grid");
const message = document.getElementById("message");
const input = document.getElementById("guessInput");

let treasure;
let attempts;
let cards = [];

// initialize game
function startGame() {
  grid.innerHTML = "";
  message.innerText = "";
  input.value = "";

  attempts = 7;
  treasure = Math.floor(Math.random() * 100) + 1;

  console.log("Treasure is at:", treasure);

  for (let i = 1; i <= 100; i++) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerText = i;
    grid.appendChild(card);
  }

  cards = document.querySelectorAll(".card");
}

startGame();

function checkTreasure() {
  if (attempts <= 0) {
    message.innerText = "❌ No attempts left! Click Try Again.";
    return;
  }

  const guess = Number(input.value);

  if (!guess || guess < 1 || guess > 100) {
    message.innerText = "Enter a valid number between 1 and 100!";
    return;
  }

  attempts--;

  cards.forEach(card => {
    if (Number(card.innerText) === guess) {
      card.classList.add("revealed");

      if (guess === treasure) {
        message.innerText = "🎉 Treasure Found!";
        card.style.background = "gold";
        attempts = 0;
      } 
      else if (guess > treasure) {
        message.innerText = `📉 Too Far Ahead! Attempts left: ${attempts}`;
      } 
      else {
        message.innerText = `📈 Too Far Behind! Attempts left: ${attempts}`;
      }
    }
  });

  if (attempts === 0 && guess !== treasure) {
    message.innerText = `💀 Game Over! Treasure was at ${treasure}`;
  }

  input.value = "";
}

// 🔁 RESET GAME
function resetGame() {
  startGame();
}