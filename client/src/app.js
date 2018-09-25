const BoardView = require('./views/board_view.js');
const DiceView = require('./views/dice_view.js');
const PlayerView = require('./views/player_view.js');
const Game = require('./models/game.js');

document.addEventListener('DOMContentLoaded', () => {

 const gameDiv = document.querySelector('#wrapper');
 const boardView = new BoardView(gameDiv);
 boardView.bindEvents();


 const diceView = new DiceView(gameDiv);
 diceView.bindEvents();

 const playerView = new PlayerView(gameDiv);
 playerView.bindEvents();

 const game = new Game();
 game.playGame();
});
