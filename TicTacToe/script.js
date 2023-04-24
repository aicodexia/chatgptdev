// initialize variables
var currentPlayer = 'X';
var board = ['', '', '', '', '', '', '', '', ''];

// get all the squares on the board
var squares = document.getElementsByClassName('square');

var restartButton = document.getElementById('restart-btn');
restartButton.addEventListener('click', resetGame);

// loop through all the squares and add a click event listener
for (var i = 0; i < squares.length; i++) {

    squares[i].addEventListener('click', function() {

        // get the index of the square that was clicked
        var index = parseInt(this.id);

        // if the square is empty
        if (board[index] === '') {
            
            // set the square to the current player's symbol
            board[index] = currentPlayer;
            this.innerHTML = currentPlayer;

            // check for a winner
            if (checkForWinner(currentPlayer)) {
                alert(currentPlayer + ' wins!');
                resetGame();

            } else {
                // switch to the other player
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
        }
    });
}

// function to check for a winner
function checkForWinner(player) {

    // check rows
    for (var i = 0; i < 9; i += 3) {
        if (board[i] === player && board[i+1] === player && board[i+2] === player) {
            return true;
        }
    }

    // check columns
    for (var i = 0; i < 3; i++) {
        if (board[i] === player && board[i+3] === player && board[i+6] === player) {
            return true;
        }
    }

    // check diagonals
    if (board[0] === player && board[4] === player && board[8] === player) {
        return true;
    }

    if (board[2] === player && board[4] === player && board[6] === player) {
        return true;
    }

    // check for a tie
    if (!board.includes('')) {
        alert('It\'s a tie!');
        resetGame();
    }

    return false;
}

// function to reset the game
function resetGame() {

    // reset the board array
    board = ['', '', '', '', '', '', '', '', ''];

    // clear the squares on the board
    for (var i = 0; i < squares.length; i++) {
        squares[i].innerHTML = '';
    }

    // set the current player back to X
    currentPlayer = 'X';
}
