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

