'use strict';
//Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');
const btnNewEl = document.querySelector('.btn--new');
const btnHoldEl = document.querySelector('.btn--hold');
const btnRollEl = document.querySelector('.btn--roll');
const currentScore0El = document.querySelector('#current--0');
const currentScore1El = document.querySelector('#current--1');
const btnNew = document.querySelector('.btn--new');

let scores, currentScore, playing, activePlayer;
//Starting conditions
const init = function () {
    currentScore = 0;
    playing = true;
    scores = [0, 0];
    score0El.textContent = 0;
    score1El.textContent = 0;
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
    document.querySelector(`.p--0`).textContent = '';
    document.querySelector(`.p--1`).textContent = '';
    activePlayer = 0;
    diceEl.classList.add('hidden')
}
init()
//switch player
const switchPlayer = function () {
    currentScore = 0
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active')
    player1El.classList.toggle('player--active')
}

//Rolling dice functionality
btnRollEl.addEventListener('click', () => {
    if (playing) {
        //1.Genarating  random dice roll
        let dice = Math.trunc(Math.random() * 6) + 1;
        //2. Display dice
        diceEl.classList.remove('hidden');
        diceEl.src = `./img/dice-${dice}.png`;
        //3. Check for rolled 1: 

        if (dice !== 1) {
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            switchPlayer()
        }
    }

})


btnHoldEl.addEventListener('click', () => {
    if (playing) {
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        if (scores[activePlayer] >= 100) {
            playing = false
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            currentScore = 0;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
            document.querySelector(`.p--${activePlayer}`).textContent = 'is win🎉🎉🎉';
        } else {
            switchPlayer()
        }
    }
})


btnNew.addEventListener('click',init)




const btnOpenModal = document.querySelectorAll('.show-modal');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');

function showModal() {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden')
}

function closeModal() {
    modal.classList.add('hidden');
    overlay.classList.add('hidden')
}

btnOpenModal.forEach(item => {
    item.addEventListener('click', showModal)
})

btnCloseModal.addEventListener('click', closeModal)
document.addEventListener('keydown', (evt) => {
    if (evt.key == 'Escape') {
        closeModal()
    }
})
overlay.addEventListener('click', closeModal)