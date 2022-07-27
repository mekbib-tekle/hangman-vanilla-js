const words = [
  {word: "Pikachu", categry: "pokemon"},
  {word: "Eevee", categry: "pokemon"},
  {word: "Charizard", categry: "pokemon"},
  {word: "Mewtwo", categry: "pokemon"},
  {word: "Bulbasaur", categry: "pokemon"},
  {word: "Charmander", categry: "pokemon"},
  {word: "Gengar", categry: "pokemon"},
  {word: "Squirtle", categry: "pokemon"},
  {word: "Lucario", categry: "pokemon"},
  {word: "Gardevoir", categry: "pokemon"},
  {word: "Snorlax", categry: "pokemon"},
  {word: "Blastoise", categry: "pokemon"},
  {word: "Umbreon", categry: "pokemon"},
  {word: "Garchomp", categry: "pokemon"},
  {word: "Dragonite", categry: "pokemon"},
  {word: "Gyarados", categry: "pokemon"},
  {word: "Absol", categry: "pokemon"},
  {word: "Jigglypuff", categry: "pokemon"}
];

const rand = Math.floor(Math.random() * words.length);
const word = words[rand].word.toUpperCase();
console.log(word);

let wrongGuessCount = 0;
const maxGuess = 7;

const checkGameOver = () => {
  if (wrongGuessCount >= maxGuess-1) {
    document.querySelectorAll(".game-over").classList.remove("hide");
  }
}

const checkGameWin = () => {
  const letterEls = document.querySelectorAll('.letter-box');
  let allAnswered = true;
  letterEls.forEach(el => {
    if (el.innerHTML === "&nbsp;") {
      allAnswered = false;
    }
  });

  if (allAnswered) {
    document.querySelector(".game-won").classList.remove("hide");
  }
}

const guessLetter = (e) => {
  const clickedLetter = e.target.textContent;
  e.target.removeEventListener("click", guessLetter)

  // if correct guess..
  if (word.indexOf(clickedLetter) >= 0) {
    const letterEl = document.querySelectorAll(`.letter-box.letter-${clickedLetter}`);
    letterEl.forEach(el => { el.innerHTML = clickedLetter; });
    e.target.classList.add("right-guess");
    checkGameWin();
    return false;
  }

  // wrong guess: show the parts of the hangman that were hidden
  const hiddenEls = document.querySelectorAll(".hide");
  hiddenEls[0].classList.remove("hide");
  wrongGuessCount += 1;

  e.target.classList.add("wrong-guess");

  checkGameOver();
}

// A - Z
const letters = document.querySelectorAll(".letter");

letters.forEach(el => {
  el.addEventListener("click", guessLetter);
});

// the empty boxes which are the placeholders for the word being guessed
const buildWordBoxes = () => {
  [...word].forEach((letter) => {
    const letterEl = `<div class="letter-box letter-${letter}">&nbsp;</div>`;
    document.querySelector(".word-box").insertAdjacentHTML("beforeend", letterEl);
  });
}

buildWordBoxes();

const addReplayEvent = () => {
  const replayBtn = document.querySelector(".replay");
  replayBtn.addEventListener("click", () => {
    location.reload();
  }); 
}

addReplayEvent();