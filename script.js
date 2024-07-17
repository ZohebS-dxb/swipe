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

    // Initialize timers and countdown elements for each player
    for (let i = 1; i <= numPlayers; i++) {
        const timerElement = document.createElement('div');
        timerElement.className = 'timer';
        timerElement.textContent = `Player ${i} - `;
        const countdownElement = document.createElement('span');
        countdownElement.id = `timer${i}-countdown`;
        countdownElement.textContent = '90';
        timerElement.appendChild(countdownElement);
        document.body.insertBefore(timerElement, gameOverElement);

        timers[i] = 90;
        countdownElements[i] = countdownElement;
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
        countdownElements[player].textContent = timers[player];
        timerIntervals[player] = setInterval(() => {
            timers[player]--;
            countdownElements[player].textContent = timers[player];
            if (timers[player] === 0) {
                clearInterval(timerIntervals[player]);
                gameOverMessage = `Player ${player} wins!`;
                displayGameOver();
            }
        }, 1000);
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
                activePlayer = activePlayer % numPlayers + 1;
            }
        }, { once: true });
    });
});
