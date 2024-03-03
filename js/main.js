const COLORS = ['green', 'red', 'blue', 'yellow'];
const AUDIO = {
  green: new Audio('./sounds/green.mp3'),
  red: new Audio('./sounds/red.mp3'),
  blue: new Audio('./sounds/blue.mp3'),
  yellow: new Audio('./sounds/yellow.mp3')
};

let gamePattern = [];
let userPattern = [];
let level = 0;
let highScore = 0;

document.getElementById('play').addEventListener('click', startGame);


document.querySelectorAll('.tile').forEach(tile => {
  tile.addEventListener('click', handleTileClick);
});

function startGame() {
  level = 0;
  gamePattern = [];
  userPattern = [];
 

  nextSequence();
}



function nextSequence() {
  if (level >= 12) {
    win()
  }
  level++;
  document.getElementById('level').textContent = level;
  userPattern = [];
  const nextColor = COLORS[Math.floor(Math.random() * 4)];
  gamePattern.push(nextColor);

  playSequence();
}

function playSequence() {
  let i = 0;
  const interval = setInterval(() => {
    highlightTile(gamePattern[i]);
    i++;
    if (i >= gamePattern.length) {
      document.querySelector('.board').classList.remove('unclickable'); // Remove 'unclickable' class during user's turn
      clearInterval(interval);
    }
  }, 1000);
}

function highlightTile(color) {
  document.querySelector(`[data-tile="${color}"]`).classList.remove("inactive");
  AUDIO[color].play();
  setTimeout(() => {
    document.querySelector(`[data-tile="${color}"]`).classList.add("inactive");
  }, 500);
}

function handleTileClick(event) {
  const selectedColor = event.target.dataset.tile;
  userPattern.push(selectedColor);
  highlightTile(selectedColor);
  if (!checkUserPattern()) {
    wrong=new Audio("./sounds/wrong.mp3")
    wrong.play()
    gameOver();
    return;
  }

  if (userPattern.length === gamePattern.length) {
    setTimeout(() => {
       document.querySelector('.board').classList.add('unclickable'); 
      nextSequence();
    }, 1000);
  }
}

function checkUserPattern() {
  for (let i = 0; i < userPattern.length; i++) {
    if (userPattern[i] !== gamePattern[i]) {
      return false;
    }
  }
  return true;
}

function gameOver() {
  gameover=new Audio("./sounds/game-over.wav")
  gameover.play()
  if (level > highScore) {
    highScore = level;
    document.getElementById('high-score').textContent = highScore;
  }
  document.getElementById('info').textContent = `Game Over! Your score: ${level}. Click play to try again!`;
  document.querySelector('.board').classList.add('unclickable');

}
function win(){
   win=new Audio("./sounds/game-win.wav")
   win.play()
  if (level > highScore) {
    highScore = level;
    document.getElementById('high-score').textContent = highScore;
  }
  document.getElementById('info').textContent = `You Win! Your score: ${level}. Click play to play again!`;
  document.querySelector('.board').classList.add('unclickable'); 
  return;
}
