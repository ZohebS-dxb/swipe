// Player times in seconds
let player1Time = 0;
let player2Time = 0;

let player1Interval, player2Interval;
let currentPlayer = 1;  // 1 for Player 1, 2 for Player 2
let gameRunning = false;

const player1TimerElement = document.getElementById('player1-timer');
const player2TimerElement = document.getElementById('player2-timer');
const startBtn = document.querySelector('.start-btn');
const yesBtn = document.querySelector('.yes-btn');
const noBtn = document.querySelector('.no-btn');

// Function to update Player 1's timer
function updatePlayer1Time() {
    player1Time++;
    player1TimerElement.textContent = `Player 1: ${player1Time}s`;
}

// Function to update Player 2's timer
function updatePlayer2Time() {
    player2Time++;
    player2TimerElement.textContent = `Player 2: ${player2Time}s`;
}

// Start/Stop Game
startBtn.addEventListener('click', function() {
    if (!gameRunning && startBtn.textContent === 'START') {
        startGame();
    } else if (gameRunning) {
        stopGame();
    } else if (startBtn.textContent === 'RESET') {
        resetGame();
    }
});

function startGame() {
    gameRunning = true;
    startBtn.textContent = 'STOP';
    currentPlayer = 1;
    player1Interval = setInterval(updatePlayer1Time, 1000);  // Start Player 1's timer
}

function stopGame() {
    gameRunning = false;
    clearInterval(player1Interval);  // Stop Player 1's timer
    clearInterval(player2Interval);  // Stop Player 2's timer
    startBtn.textContent = 'RESET';  // Change STOP to RESET

    // Determine the winner
    const winner = player1Time < player2Time ? 'Player 1' : 'Player 2';
    alert(`${winner} wins!`);
}

function resetGame() {
    player1Time = 0;
    player2Time = 0;
    player1TimerElement.textContent = `Player 1: 0s`;
    player2TimerElement.textContent = `Player 2: 0s`;
    startBtn.textContent = 'START';  // Change RESET back to START
}

// YES button event
yesBtn.addEventListener('click', function() {
    if (gameRunning) {
        if (currentPlayer === 1) {
            clearInterval(player1Interval);  // Pause Player 1's timer
            player2Interval = setInterval(updatePlayer2Time, 1000);  // Start Player 2's timer
            currentPlayer = 2;
        } else {
            clearInterval(player2Interval);  // Pause Player 2's timer
            player1Interval = setInterval(updatePlayer1Time, 1000);  // Start Player 1's timer
            currentPlayer = 1;
        }
    }
});

// NO button event
noBtn.addEventListener('click', function() {
    if (gameRunning) {
        if (currentPlayer === 1) {
            player1Time += 5;  // Add 5 seconds to Player 1's timer
            player1TimerElement.textContent = `Player 1: ${player1Time}s`;
            clearInterval(player1Interval);  // Pause Player 1's timer
            player2Interval = setInterval(updatePlayer2Time, 1000);  // Start Player 2's timer
            currentPlayer = 2;
        } else {
            player2Time += 5;  // Add 5 seconds to Player 2's timer
            player2TimerElement.textContent = `Player 2: ${player2Time}s`;
            clearInterval(player2Interval);  // Pause Player 2's timer
            player1Interval = setInterval(updatePlayer1Time, 1000);  // Start Player 1's timer
            currentPlayer = 1;
        }
    }
});

