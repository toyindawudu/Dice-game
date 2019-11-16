/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he wishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// Declare variables for the pig-game

var scores, roundScore, activePlayer, gamePlaying;
init();

document.querySelector('.btn-roll').addEventListener('click', function() {
  if(gamePlaying) {
    //Random
    var dice = Math.floor(Math.random() * 6) + 1;

    // 2. Display the result 
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';

    // 3. Update the round score if the rolled number was not a 1
    if (dice !== 1) {
    // add the score
    roundScore += dice;
    document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
    // Next player (Switching player)
    nextPlayer();
    }
  }

  //1. Random Number 
  // var dice = Math.floor(Math.random() * 6) + 1;

  // // 2. Display the result 
  // var diceDOM = document.querySelector('.dice');
  // diceDOM.style.display = 'block';
  // diceDOM.src = 'dice-' + dice + '.png';

  // // 3. Update the round score IF the rolled number was not a 1
  // if (dice !== 1) {
  //   // add the score
  //   roundScore += dice;
  //   document.querySelector('#current-' + activePlayer).textContent = roundScore;
  // } else {
  //   // Next player (Switching player)
  //   nextPlayer();
  // }
});

document.querySelector('.btn-hold').addEventListener('click', function () {
  if(gamePlaying) {
    // This helps us to add the current score to the GLOBAL score
    scores[activePlayer] += roundScore;
  
    // Update the UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    // Check if the player won the game
    if (scores[activePlayer] >= 100) {
     document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';
     document.querySelector('.dice').style.display = 'none';
     document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
     document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
     gamePlaying = false;
    } else {
     //Next Player
     nextPlayer();
    }

  }
  
});

// Using DRY Principle, I create this function to help the game switch players

function nextPlayer() {

  // Next player (Switching player)
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;

  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  // document.querySelector('.player-0-panel').classList.remove('active');
  // document.querySelector('.player-1-panel').classList.add('active');

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  document.querySelector('.dice').style.display='none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init(){
  scores = [0,0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;

  // Hide the dice
document.querySelector('.dice').style.display = 'none';

  // Reset the values in the game to 0
document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';
document.getElementById('name-0').textContent = 'Player 1';
document.getElementById('name-1').textContent = 'Player 2';

document.querySelector('.player-0-panel').classList.remove('winner');
document.querySelector('.player-1-panel').classList.remove('winner');
document.querySelector('.player-0-panel').classList.remove('active');
document.querySelector('.player-0-panel').classList.add('active');
document.querySelector('.player-1-panel').classList.remove('active');

}

 