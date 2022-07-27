const words = [
  {word: "Pikachu", category: "pokemon"},
  {word: "Eevee", category: "pokemon"},
  {word: "Charizard", category: "pokemon"},
  {word: "Mewtwo", category: "pokemon"},
  {word: "Bulbasaur", category: "pokemon"},
  {word: "Charmander", category: "pokemon"},
  {word: "Gengar", category: "pokemon"},
  {word: "Squirtle", category: "pokemon"},
  {word: "Lucario", category: "pokemon"},
  {word: "Gardevoir", category: "pokemon"},
  {word: "Snorlax", category: "pokemon"},
  {word: "Blastoise", category: "pokemon"},
  {word: "Umbreon", category: "pokemon"},
  {word: "Garchomp", category: "pokemon"},
  {word: "Dragonite", category: "pokemon"},
  {word: "Gyarados", category: "pokemon"},
  {word: "Absol", category: "pokemon"},
  {word: "Jigglypuff", category: "pokemon"},
  {word: "Mimikyu", category: "pokemon"},
  {word: "Barbaracle", category: "pokemon"},
  {word: "lycanroc", category: "pokemon"},
  {word: "zeraora", category: "pokemon"},
  {word: "Popplio", category: "pokemon"},
  {word: "Wishiwashi", category: "pokemon"},
  {word: "Diglett", category: "pokemon"},
  {word: "Rockruff", category: "pokemon"},
  {word: "Cutiefly", category: "pokemon"},
  {word: "Togedemaru", category: "pokemon"},
  {word: "Raichu", category: "pokemon"},
  {word: "Rowlet", category: "pokemon"},
  {word: "Ninetails", category: "pokemon"},
  {word: "Litten", category: "pokemon"},
  {word: "Primarina", category: "pokemon"},
  {word: "Toucannon", category: "pokemon"},
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