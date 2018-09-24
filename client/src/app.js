const BoardView = require('./views/board_view.js');

document.addEventListener('DOMContentLoaded', () => {
  const gameDiv = document.querySelector('#wrapper');
  const boardView = new BoardView(gameDiv);
  boardView.bindEvents();

  
});
