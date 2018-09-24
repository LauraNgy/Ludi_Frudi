const BoardView = require('./views/board_view.js');
const DiceView = require('./views/dice_view.js');

document.addEventListener('DOMContentLoaded', () => {
  const gameDiv = document.querySelector('#wrapper');
  const boardView = new BoardView(gameDiv);
  boardView.bindEvents();

  const diceView = new DiceView(gameDiv);
  diceView.bindEvents();
});
