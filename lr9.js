document.addEventListener("DOMContentLoaded", () => {
  const CARD_POOL = [
    { name: "6", value: 6, img: "Frontend_LR/6.png" },
    { name: "7", value: 7, img: "Frontend_LR/7.png" },
    { name: "8", value: 8, img: "Frontend_LR/8.png" },
    { name: "9", value: 9, img: "Frontend_LR/9.png" },
    { name: "10", value: 10, img: "Frontend_LR/10.png" },
    { name: "Валет", value: 2, img: "Frontend_LR/valet.png" },
    { name: "Дама", value: 3, img: "Frontend_LR/koroleva.png" },
    { name: "Король", value: 4, img: "Frontend_LR/korol`.png" },
    { name: "Туз", value: 11, img: "Frontend_LR/tuz.png" }
  ];

  let playerTotal = 0;
  let computerTotal = 0;
  let round = 0;
  const MAX_ROUNDS = 3;

  const nameInput = document.getElementById("nameInput");
  const startBtn = document.getElementById("startBtn");
  const startBlock = document.getElementById("startBlock");
  const gameBlock = document.getElementById("game");

  const playerNameEl = document.getElementById("playerName");
  const playerCards = document.getElementById("playerCards");
  const computerCards = document.getElementById("computerCards");
  const playerTotalEl = document.getElementById("playerTotal");
  const computerTotalEl = document.getElementById("computerTotal");
  const roundEl = document.getElementById("round");
  const messageEl = document.getElementById("message");

  const dealBtn = document.getElementById("dealBtn");
  const resetBtn = document.getElementById("resetBtn");

  startBtn.onclick = () => {
    if (nameInput.value.trim() === "") {
      alert("Введіть ім'я");
      return;
    }
    playerNameEl.textContent = nameInput.value.trim();
    startBlock.classList.add("hidden");
    gameBlock.classList.remove("hidden");
    resetGame();
  };

  function randomCard() {
    const i = Math.floor(Math.random() * CARD_POOL.length);
    return CARD_POOL[i];
  }

  dealBtn.onclick = () => {
    if (round >= MAX_ROUNDS) {
      messageEl.textContent = "Гру завершено. Натисніть Скинути.";
      return;
    }

    round++;
    roundEl.textContent = round;

    const p = randomCard();
    const c = randomCard();

    addCard(playerCards, p);
    addCard(computerCards, c);

    playerTotal += p.value;
    computerTotal += c.value;

    playerTotalEl.textContent = playerTotal;
    computerTotalEl.textContent = computerTotal;

    if (playerTotal > 21 && computerTotal > 21) {
      messageEl.textContent = "Обидва перебрали. Нічия раунду.";
      disableRound();
      return;
    }

    if (playerTotal > 21) {
      messageEl.textContent = "Ви перебрали. Раунд програно.";
      disableRound();
      return;
    }

    if (computerTotal > 21) {
      messageEl.textContent = "Комп'ютер перебрав. Ви виграли раунд.";
      disableRound();
      return;
    }

    if (round === MAX_ROUNDS) {
      if (playerTotal > computerTotal) {
        messageEl.textContent = "Ви виграли гру!";
      } else if (playerTotal < computerTotal) {
        messageEl.textContent = "Ви програли гру.";
      } else {
        messageEl.textContent = "Нічия!";
      }
      disableRound();
    }
  };

  function addCard(container, card) {
    const div = document.createElement("div");
    div.className = "card";

    const img = document.createElement("img");
    img.src = card.img;

    img.onerror = () => {
      div.textContent = `${card.name} (${card.value})`;
    };

    div.appendChild(img);
    container.appendChild(div);
  }

  function disableRound() {
    dealBtn.disabled = true;
  }

  resetBtn.onclick = resetGame;

  function resetGame() {
    round = 0;
    playerTotal = 0;
    computerTotal = 0;

    roundEl.textContent = "0";
    playerTotalEl.textContent = "0";
    computerTotalEl.textContent = "0";
    messageEl.textContent = "";

    playerCards.innerHTML = "";
    computerCards.innerHTML = "";

    dealBtn.disabled = false;
  }
});
