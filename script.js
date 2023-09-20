'use strict';

const $ = document;

const score0El = $.querySelector('#score--0');
const score1El = $.querySelector('#score--1');

const current0El = $.querySelector('#current--0');
const current1El = $.querySelector('#current--1');

const player0El = $.querySelector('.player--0');
const player1El = $.querySelector('.player--1');

const diceEl = $.querySelector('.dice');

const btnRoll = $.querySelector('.btn--roll');
const btnNew = $.querySelector('.btn--new');
const btnHold = $.querySelector('.btn--hold');

let currentScore, activePlayer, scores, playing;

const init = () => {
    currentScore = 0;
    activePlayer = 0;
    scores = [0, 0];
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
};

init();

const switchPlayer = () => {
    currentScore = 0;
    $.getElementById(`current--${activePlayer}`).textContent = currentScore;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
};

btnRoll.addEventListener('click', () => {
    if (playing === true) {
        const dice = Math.floor(Math.random() * 6) + 1;
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;
        if (dice !== 1) {
            currentScore += dice;
            $.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            switchPlayer();
        }
    }
});

btnHold.addEventListener('click', () => {
    if (playing === true) {
        scores[activePlayer] += currentScore;
        $.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        if (scores[activePlayer] >= 100) {
            playing = false;
            diceEl.classList.add('hidden');
            $.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            $.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        } else {
            switchPlayer();
        }
    }
});

btnNew.addEventListener('click', init);
