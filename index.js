

// const is telling me that the display will remain the same (constant) through out the game//
const statusDisplay = document.querySelector('.game--status');



// the game state array will serve as the game board 
var gameActive = true;
var currentPlayer = "X";
var gameState = ["", "", "",
                 "", "", "", 
                 "", "", ""
                ];

// this will create an alert 
const winningMessage = () => {
    const alertGame = `<div class="alert-info" role="alert"> Player <a href="#">${currentPlayer}</a> has won!</div>` 
    document.getElementById("alert-winner").innerHTML = alertGame;
    setTimeout(
        function() {
            document.getElementById("alert-winner").innerHTML = "";
        }, 2000)
 } // this function will show what player has won. I change the color of the player from the rest of the message by putting it inside an anchor. 
    // also the alert will fade away after 2 seconds so that you can click on restart and start a new game
const drawMessage = () => {
    const alertGame = `<div class="alert-info" role="alert">It's a draw. Play again!!</div>`
    document.getElementById("alert-winner").innerHTML = alertGame;
    setTimeout(
        function() {
            document.getElementById("alert-winner").innerHTML = "";
        }, 2000) // same thing as abobe but for the draw message
    } 
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;  // this function is how I will keep track of whos turn it is

statusDisplay.innerHTML = currentPlayerTurn(); // will print the current player on the webpage


const winningConditions = [  // I created this set of 8 arrays to set up the wining conditions
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];


//

function handleCellPlayed(clickedCell, clickedCellIndex) {  // with the two parameters that this functions takes it will loop 
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X"; //If currentPlayer = X than it will become O and if it equals O than it will become X
                                    // "x" is your condition , "O" is statement 1 , "X" is statement 2 
    statusDisplay.innerHTML = currentPlayerTurn();
}

function handleResultValidation() {
    let roundWon = false; 
    for (let i = 0; i <= 7; i++) {  
        const winCondition = winningConditions[i]; // here I am looping through all the winning conditions in the winningconditions array
        let a = gameState[winCondition[0]];     // a will be position 0 from each array
        let b = gameState[winCondition[1]];     // b will be position 1 from each array
        let c = gameState[winCondition[2]];     // c will be position 2 from each array
        if (a === '' || b === '' || c === '') { // if any of the positions is empty the game will continue
            continue;
        }
        if (a === b && b === c) { // if all the the strings are equal x,x,x or o,o,o you will have won the game
            roundWon = true;
            break
        }
    }

    if (roundWon) {
        winningMessage(); // display the the winning message if gameactive = false
        gameActive = false;
        return;
    }

    let roundDraw = !gameState.includes("");  // if there are any empty string in gameState the game will come to a draw because no one has won
    if (roundDraw) {
        drawMessage();
        gameActive = false;
        return;
    }

    handlePlayerChange(); 
}

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target; 
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index')); // pareInt will parses a string and return the first integer

    if (gameState[clickedCellIndex] !== "" || !gameActive) { // if gameState is not and empty string and not active 
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex); 
    handleResultValidation(); // once it is click it will run through the handleresultvalidation function explain adobe. 
}

function handleRestartGame() { // this will serve to restart the game
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "",
                 "", "", "", 
                 "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = ""); // this will select all the class cells and for each will give it an empty string
}


document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick)); // when clicking each cell it will run though the handlecellclick function for each cell clicked
document.querySelector('.game--restart').addEventListener('click', handleRestartGame); // when click on the restart buttom it will run the handlerestartgame function 
 