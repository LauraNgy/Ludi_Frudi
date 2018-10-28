const BoardView = require('./views/board_view.js');
const DiceView = require('./views/dice_view.js');
const GameView = require('./views/game_view.js');
const Game = require('./models/game.js');

document.addEventListener('DOMContentLoaded', () => {

 const gameDiv = document.querySelector('#wrapper');

 const gameView = new GameView(gameDiv);
 gameView.bindEvents();

 const game = new Game();
 game.bindEvents();
});
