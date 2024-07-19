document.addEventListener('DOMContentLoaded', () => {
    
    
    const timer_id=[];
    const player_id=[];
    let timerInterval=[];
    let final_ranking = "Ranking: ";
    const timerCountdownElement=[];
    const timer=[];
    const timer_countdown_id=[];
    const timerElement = [];
    const playerRank = [];
    const gameOverElement = document.getElementById('game-over');
    const ranking = document.getElementById('ranking');
    const gameOverSound = document.getElementById('gamesound');
    const container = document.getElementById('timer-container');

    //Get number of players from the query string
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    var player_size = urlParams.get('p');
    if(player_size == null){player_size=2;} //If p is not in the URl, set player size to 2


    //Change game duration here
    const max_time = 9;

    var iDiv;
    var timer_seq;
    let gameOverMessage = '';
    let gameInProgress = true;
    let letters_pressed = 0;
    let active_player=-1;

    for (p=1 ; p<=player_size ; p++){
        timer_seq = "timer"+p;
        //create DIVs in the index file for each player:

        iDiv = document.createElement('div');
        iDiv.id = timer_seq;
        if(p==1){
            iDiv.className = 'timer player';
        }else{
            iDiv.className = 'timer nonplayer';
        }
        
        iDiv.innerHTML = "P"+p + ": <span id='timer"+p+"-countdown'>"+max_time+"</span>"; 

        container.appendChild (iDiv);

        timer_id.push(timer_seq);
        player_id.push("P"+p);
        timer_countdown_id.push("timer"+p+"-countdown");
        timerElement.push(document.getElementById(timer_seq));
        timer.push(max_time)
        timerCountdownElement.push(document.getElementById(timer_seq+"-countdown"));
    }


    function timer_switch() {  
        clearInterval(timerInterval); // Pause active timer
        if(active_player!=-1){
            timerElement[active_player].classList.remove("player");
            timerElement[active_player].classList.add("nonplayer");
        }

        active_player++; //Next player becomes active
        if (active_player==player_size) {active_player=0;}

        while (playerRank.includes(active_player)){
            active_player++;
        }

        timerElement[active_player].classList.remove("nonplayer");
        timerElement[active_player].classList.add("player");
      
        timerCountdownElement[active_player].textContent = timer[active_player];

        timerInterval = setInterval(() => {
            timer[active_player]= timer[active_player] - 1 ; //reduce one second for the active player
            timerCountdownElement[active_player].textContent = timer[active_player];
            if (timer[active_player] === 0) {
                playerRank.push(active_player);
                
                if (playerRank.length==player_size-1){ //if there is only one player left, end the game
                    //Add the final player to the ranking list    
                    for (let i = 0; i<player_size ; i++){
                        if (!playerRank.includes(i)){
                            playerRank.push(i)
                        }
                    }    
                    displayGameOver();
                }else{ //if more than one player left, continue game
                    timer_switch();
                }
                
            }
        }, 1000);
    }

    //Calculate highest score in player array
    function indexOfMax(arr) { 
        let maxIndex = 0; 
        for (let i = 1; i < arr.length; i++) { 
            if (arr[i] > arr[maxIndex]) { 
                maxIndex = i; 
            } 
        } 
        return maxIndex; 
    } 


     function displayGameOver() {
        gameInProgress = false;
        clearInterval(timerInterval);
        console.log ();

        gameOverElement.style.display = 'block';
        gameOverElement.textContent = `${player_id[indexOfMax(timer)]} Wins!`;

        playerRank.reverse();
        for (let i = 0; i<player_size ; i++){
            final_ranking = final_ranking + player_id[playerRank[i]] + " > ";
            console.log();
        }
        ranking.style.display = 'block';
        ranking.textContent = final_ranking;
        
        
        gameOverSound.play().then(() => {
            console.log('Sound played successfully'); // Debugging message
        }).catch(error => {
            console.log('Failed to play the sound:', error);
        });
    }

    // Function to toggle letter color
    function toggleLetterColor(button) {
        if (button.style.backgroundColor === 'green') {
            letters_pressed++;
            button.classList.add("red");
            
        } else {
            button.style.backgroundColor = 'green';
        }
        
    }

    function gameplay(){
        //come back to this
        if(letters_pressed==26){
            displayGameOver();
        }
        else{
            //have to start the timer
            timer_switch();
        }
    }

    // Event listener for letter buttons
    document.querySelectorAll('.letter-button').forEach(button => {
        button.style.backgroundColor = 'green';
        button.addEventListener('click', () => {
            if (gameInProgress) {
                toggleLetterColor(button);
                gameplay();
                
            }
        }, { once: true });
    });






    


});
