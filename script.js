document.addEventListener('DOMContentLoaded', () => {
    const gameOverElement = document.getElementById('game-over');
    let gameOverMessage = '';

    let numPlayers = parseInt(prompt('Enter number of players (2-6):'));
    while (isNaN(numPlayers) || numPlayers < 2 || numPlayers > 6) {
        numPlayers = parseInt(prompt('Please enter a number between 2 and 6:'));
    }

    const timers = [];
    const countdownElements = [];
    const letterButtons = document.querySelectorAll('.letter-button');

    // Initialize timers for each player
    for (let i = 1; i <= numPlayers; i++) {
        timers[i] = 9;
    }

    let timerIntervals = [];
    let activePlayer = 1;
    let gameInProgress = true;

    const gameOverSound = document.getElementById('gamesound');

    // Function to start timer for a player
    function startTimer(player) {
        for (let i = 1; i <= numPlayers; i++) {
            if (i !== player) {
                clearInterval(timerIntervals[i]);
            }
        }
        displayActiveTimer(player);
        timerIntervals[player] = setInterval(() => {
            timers[player]--;
            displayActiveTimer(player);
            if (timers[player] === 0) {
                clearInterval(timerIntervals[player]);
                timers[player] = null; // Mark player as out
                checkGameOver();
            }
        }, 1000);
    }

    // Function to display the active player's timer
    function displayActiveTimer(player) {
        const timerElement = document.querySelector('.timer');
        if (timerElement) {
            timerElement.textContent = `Player ${player} - ${timers[player]}`;
        } else {
            const newTimerElement = document.createElement('div');
            newTimerElement.className = 'timer';
            newTimerElement.textContent = `Player ${player} - ${timers[player]}`;
            document.body.insertBefore(newTimerElement, gameOverElement);
        }
    }

    // Function to check if the game is over
    function checkGameOver() {
        const activePlayers = timers.filter(timer => timer !== null);
        if (activePlayers.length === 1) {
            gameOverMessage = `Player ${timers.indexOf(activePlayers[0])} wins!`;
            displayGameOver();
        }
    }

    // Function to display "Game Over" message
    function displayGameOver() {
        gameInProgress = false;
        gameOverElement.style.display = 'block';
        gameOverElement.textContent = gameOverMessage;
        console.log('Game over:', gameOverMessage); // Debugging message
        gameOverSound.play().then(() => {
            console.log('Sound played successfully'); // Debugging message
        }).catch(error => {
            console.log('Failed to play the sound:', error);
        });
    }

    // Function to toggle letter color
    function toggleLetterColor(button) {
        if (button.classList.contains('red')) {
            button.classList.remove('red');
        } else {
            button.classList.add('red');
        }
    }

    // Event listener for letter buttons
    letterButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (gameInProgress && !button.classList.contains('red')) {
                toggleLetterColor(button);
                startTimer(activePlayer);
                activePlayer = (activePlayer % numPlayers) + 1;
                while (timers[activePlayer] === null) {
                    activePlayer = (activePlayer % numPlayers) + 1;
                }
            }
        });
    });
});
