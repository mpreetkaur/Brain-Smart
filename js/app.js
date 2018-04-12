const open = document.querySelectorAll(".open");
const show = document.querySelectorAll(".show");
const match = document.querySelectorAll(".match");
const deck = document.querySelector(".deck");
let card = document.querySelectorAll(".card");
const movesCounter = document.querySelector(".moves");
const reset = document.querySelector(".restart");
let matchingCards = document.querySelectorAll(".card.match");


let openCards = [];
matchedCards = [];
moves = 0;


for (let i = 0; i < card.length; i++) {

    card[i].addEventListener('click', showCard); //opens the card when it is clicked and then check for match

}


reset.addEventListener("click", restartGame); //resets the game to initial level


//resets number of moves equals to zero
function resetMoves() {
    moves = 0;
    movesCounter.textContent = moves;
}

//open card and then execute checkMatch()
function showCard(e) {

    if ((openCards.length < 2) && !(e.target.classList.contains("open")) && !(e.target.classList.contains("match")) && !(e.target.tagName == "I")) {
        e.target.classList.add("open", "show");


        openCards.push(e.target); //adds clicked cards in "openCards" array

        checkMatch();
    }


}





//checks for the same pair of cards
function checkMatch() {

    if (openCards.length == 2 && openCards[0] != openCards[1]) {
        setTimeout(function () {
            if (openCards[0].innerHTML == openCards[1].innerHTML) {

                openCards[0].classList.remove("open", "show");
                openCards[1].classList.remove("open", "show");
                openCards[0].classList.add("match");
                openCards[1].classList.add("match");
                openCards = [];
                increaseMoves();

            } else {
                openCards[0].classList.add("nomatch");
                openCards[1].classList.add("nomatch");

                setTimeout(function () {
                    openCards[0].classList.remove("open", "show", "nomatch");
                    openCards[1].classList.remove("open", "show", "nomatch");
                    openCards = [];

                }, 500)
                increaseMoves();
            }

            finishGame();
        }, 600);

    }

}



//increases the number of moves when pair of cards is clicked
function increaseMoves() {
    const movesCounter = document.querySelector(".moves");
    moves++;
    movesCounter.textContent = moves;
}

//restart game 
function restartGame() {

    resetMoves();
    newCards();
    for (let j = 0; j < card.length; j++) {

        card[j].className = "card";

    }

}

//finish the game when all cards are matched wth an alert
function finishGame() {
    setTimeout(function () {

        const matchingCards = document.querySelectorAll(".card.match");

        if (matchingCards.length == 16) {
            swal({
                title: "Good job!",
                text: "You WON!",
                icon: "success",
            });
        }

    }, 800);
}




// Shuffles all the cards when restart button is clicked
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
}


//creates a new array of shuffled cards
function newCards() {

    let shuffledArray = shuffle(Array.from(card));
    deck.innerHTML = "";

    for (let x = 0; x < shuffledArray.length; x++) {

        deck.appendChild(shuffledArray[x]);

    }
}