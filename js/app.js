/*
 * Create a list that holds all of your cards
 */
const icons = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-anchor", "fa fa-bolt", "fa fa-bolt", "fa fa-cube", "fa fa-cube", "fa fa-leaf", "fa fa-leaf", "fa fa-bicycle", "fa fa-bicycle", "fa fa-bomb", "fa fa-bomb"];

/* const list */
const cardsContainer = document.querySelector(".deck");
const modal = document.querySelector(".modal");
const rateContainer = document.querySelector("#total-rate");
const repeatBtn = document.querySelector(".play-again");
const repeatBtnModal = document.querySelector(".modal .play-again");
const cardList = document.querySelector(".cards");
const timerContainer = document.querySelector(".timer");
const movesContainer = document.querySelector(".moves");
const starsContainer = document.querySelector(".stars");
const star = `<li><i class="fa fa-star"></i></li>`;  /* star(icon) */
const restartBtn = document.querySelector(".restart");
const minutes = document.querySelector("#totalMin");
const seconds = document.querySelector("#totalSeconds");
const gameRate = document.querySelector("#total-rate");
const totalMoves = document.querySelector("#total-moves");
/* let list */
let openedCards = [];
let moves = 0;
let firstClick = true;
let matchedCards = [];
let rateHTML = "";
//let livetimer = setInterval;

/* var list 3 */
var totalSeconds = 0;
var totalMin = 0;
var clearTime = -1;
var liveTimer = 0;

/* function shuffle from Udacity (Shuffle function from http://stackoverflow.com/a/2450976)*/
function shuffle(array) {
    var currentIndex = array.length,
    temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
};

function myTimer() {
    if (totalSeconds === 59) {
        totalMin++;
        totalSeconds = 0;
    } else {
       totalSeconds++;
    }
    timerContainer.innerHTML = totalMin + ' min' + ':' + totalSeconds + ' sec';
}

function startTimer() {
    liveTimer = setInterval(myTimer, 1000);
}

function stopTimer() {
    myTimer();
    timerContainer.innerHTML = '0' + ' min' + ':' + '0' + ' sec';
    clearInterval(liveTimer);
}
/*
* Initialize the game
*/
function init() {
    const shuffledcard = shuffle(icons) /* it mixed card */
    let cards = ""
    for (let i = 0; i < icons.length; i++) {
        const card = document.createElement("li");
        card.classList.add("card");
        card.innerHTML = `<i class="${icons[i]}"></i>`;
        cardsContainer.appendChild(card);
        /* + click Event to  card */
        click(card);
    }
}
/* click event */
function click(card) {
    /* Card click Event */
    card.addEventListener("click", function() {
        if (firstClick) {
            /* start timer */
            startTimer();
            firstClick = false;
        }
        const currentCard = this;
        const previousCard = openedCards[0];
        /* here we have an existing OPENED card */
        if (openedCards.length === 1) {
        card.classList.add('open', 'show', 'disabled');
        openedCards.push(this);
        /* compare 2 opened card. */
         compare(currentCard, previousCard);
        } else {
            // we dont have opended cards
           currentCard.classList.add('open','show', 'disabled');
           openedCards.push(this);   
        }	
    });
}
/*
* compare 2 cards
*/
function compare(currentCard, previousCard) {
    /* Matcher */
    if (currentCard.innerHTML === previousCard.innerHTML) {
        /* matched */
        currentCard.classList.add("match");
        previousCard.classList.add("match");
        matchedCards.push(currentCard, previousCard);
        openedCards = [];
        /* Check if the game is over! */
        isOver();
    } else {
        /* After 500ms, do this! */
        setTimeout(function() {
			currentCard.classList.remove("open","show","disabled");
			previousCard.classList.remove("open","show","disabled");
        }, 500);
        openedCards = [];
    }
    /* + new move */
    addMove();
}

movesContainer.innerHTML = 0;
function addMove() {
    moves++;
    movesContainer.innerHTML = moves;
    /*Set Rating */
    rating();
}

starsContainer.innerHTML = star + star + star;
/* describes how to give stars(rating) */
function rating() {
    if (moves < 10) {
        starsContainer.innerHTML = star + star + star;
    } else if (moves < 15) {
        starsContainer.innerHTML = star + star;
    } else {
        starsContainer.innerHTML = star;
    }
}
timerContainer.innerHTML = totalMin + ' min' + ':' + totalSeconds + ' sec';
/*
 * check if the game is over
 */
function isOver() {
    if (matchedCards.length == 16) {
        /* stop timer */
        stopTimer();
        gameOverMessage();
    }
}
/** Game Over modal **/
function gameOverMessage() {
    /* display modal */
    modal.style.top = "0";
    /* add moves to modal */
    totalMoves.innerHTML = moves + 1; 
    /* add rate */
    /* now add time to modal */
    minutes.innerHTML = totalMin;
    seconds.innerHTML = totalSeconds;
    if (moves < 10) {
        gameRate.innerHTML = star + star + star;
        starNum = 3;
    } else if (moves < 15) {
        gameRate.innerHTML = star + star;
        starNum = 2;
    } else {
        gameRate.innerHTML = star;
        starNum = 1;
    }
}

repeatBtn.addEventListener("click", function() {
    replay();
});
/* hide modal */
repeatBtnModal.addEventListener("click", function() {
    modal.style.top = "-150";
    /* start game again */
    replay()
});

function replay() {
	/* Del All cards */
    cardsContainer.innerHTML = "";
	/* Call `init` to create new cards */
    init();

    /* Reset game */
    reset();
	/* Disappear Modal */
	modal.style.display = "none";
}

restartBtn.addEventListener("click", function() {
    /* Del All cards */
    cardsContainer.innerHTML = "";
    /* Call `init` to create new cards */
    init();
    /* Reset game */
    reset();
});

/* reset game variables */
function reset() {
    /* take out matched card array */
    matchedCards = [];
    /* reset moves */
    moves = 0;
    movesContainer.innerHTML = moves;
    starsContainer.innerHTML = star + star + star;
    stopTimer();
    firstClick = true;
    totalSeconds = 0;
    totalMin = 0;
    timerContainer.innerHTML = totalMin + ' min' + ':' + totalSeconds + ' sec';
}

/* Start the game for the first time */
init();

