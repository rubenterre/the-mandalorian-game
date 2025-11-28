// script.js

const cartas = [
    {name: "mandalorianPoster", src: "./assets/cards/the_mandalorian_poster_card.png"},
    {name: "sheriff", src: "./assets/cards/cobb_vanth_card.png"},
    {name: "rana", src: "./assets/cards/rana_card.png"},
    {name: "moff", src: "./assets/cards/moff_gideon_card.png"},
    {name: "mandalorian", src: "./assets/cards/mandalorian_card.png"},
    {name: "grogu", src: "./assets/cards/grogu_card.png"},
    {name: "greff", src: "./assets/cards/greff_karga_card.png"},
    {name: "fennec", src: "./assets/cards/fennec_card.png"},
    {name: "cara", src: "./assets/cards/cara_dune_card.png"},
    {name: "boba", src: "./assets/cards/boba_fett_card.png"},
    {name: "bokatan", src: "./assets/cards/bo_katan_card.png"},
    {name: "ashoka", src: "./assets/cards/ashoka_card.png"}
];

const gameBoard = document.getElementById("gameBoard");
const restartBtn = document.getElementById("restart");

let firstCard = null;
let secondCard = null;
let lockBoard = false;

// Duplicar y barajar símbolos (Fisher–Yates)
function createShuffledDeck() {
  const deck = [...cartas, ...cartas];

  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }

  return deck;
}


function setupBoard() {
  gameBoard.innerHTML = "";
  firstCard = null;
  secondCard = null;
  lockBoard = false;

  const deck = createShuffledDeck();

  deck.forEach(carta => {
    const card = document.createElement("div");
    card.classList.add("card");

    const inner = document.createElement("div");
    inner.classList.add("card-inner");

    const front = document.createElement("div");
    front.classList.add("card-face", "card-front");
    front.innerHTML = `<img class="carta__img" src="${carta.src}" alt="carta de la serie The Mandalorian">` ;

    const back = document.createElement("div");
    back.classList.add("card-face", "card-back");
    back.innerHTML = `<img class="carta__img" src="./assets/cards/card_reverso_card.png">`;

    inner.appendChild(front);
    inner.appendChild(back);
    card.appendChild(inner);

card.dataset.carta = JSON.stringify(carta);

    card.addEventListener("click", () => handleCardClick(card));

    gameBoard.appendChild(card);
  });
}

function handleCardClick(card) {
  if (lockBoard) return;
  if (card === firstCard) return;
  if (card.classList.contains("matched")) return;

  card.classList.add("flipped");

  if (!firstCard) {
    firstCard = card;
    return;
  }

  secondCard = card;
  checkForMatch();
}

function checkForMatch() {
  lockBoard = true;  // Bloquea el tablero AQUÍ
  
const firstCardData = JSON.parse(firstCard.dataset.carta);
const secondCardData = JSON.parse(secondCard.dataset.carta);
const isMatch = firstCardData.name === secondCardData.name;
  
  console.log("Primera carta:", firstCardData.name);
  console.log("Segunda carta:", secondCardData.name);
  console.log("¿Es match?", isMatch);

  if (isMatch) {
    disableCards();
  } else {
    unflipCards();
  }
}

function disableCards() {
  firstCard.classList.add("matched");
  secondCard.classList.add("matched");

  resetTurn();

  checkWin();
}

function unflipCards() {
  console.log("Volteando cartas...");
  setTimeout(() => {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
    resetTurn();
    console.log("Cartas volteadas");
  }, 800);
}

function resetTurn() {
  lockBoard = false;
  firstCard = null;
  secondCard = null;
}

/* function resetTurn() {
  [firstCard, secondCard, lockBoard] = [null, null, false];
} */

function checkWin() {
  const unmatched = document.querySelectorAll(".card:not(.matched)");
  if (unmatched.length === 0) {
    setTimeout(() => {
      /* alert("¡Has encontrado todas las parejas! 🎉"); */
      document.getElementById("modal").innerHTML = `
            <div class="modal__container">
        <h3 class="modal__h3">¡Enhorabuena! Has acertado todas las parejas</h3>
        <img
          class="modal__img"
          src="./assets/img/grogu_happy.png"
          alt="Grogu celebra que ganaste"
        />
        <button onclick="cerrarModal()" class="modal__button">ACEPTAR</button>
      </div>
        `
    }, 300);
  }
}

function cerrarModal() {
    document.getElementById("modal").innerHTML = "";
}

restartBtn.addEventListener("click", setupBoard);

// Inicializar
setupBoard();
