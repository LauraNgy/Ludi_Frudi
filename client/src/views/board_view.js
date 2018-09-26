const CreateAppend = require('../helpers/create_append.js');
const boardPath = require('../models/board_path.js');
const colours = require('../models/colours.js');
const PubSub = require('../helpers/pub_sub.js');
const homes = require('../models/homes.js');
const Pawn = require('../models/pawn.js');
const path = require('path');
const Game = require('../models/game.js');
const PawnView = require('./pawn_view.js');


const BoardView = function (element) {
  this.element = element;
  this.board = null;
  this.colour = null;
  this.player = null;

};

BoardView.prototype.bindEvents = function () {
  const board = new CreateAppend('div', "", this.element);
  board.classList.add('mainBoard');
  this.board = board;
  PubSub.subscribe('Game:game-state', (event) => {
    this.board.innerHTML = "";
    this.player = event.detail;
    this.colour = event.detail.colour;
    this.renderBoard(13, board);
  });
};

BoardView.prototype.renderBoard = function (dimensions, board) {
  for (let colID = 1; colID <= dimensions; colID++) {
    const colDiv = new CreateAppend('div', "", board);
    colDiv.id = colID;
    colDiv.classList.add('board');
    for (let rowID = 1; rowID <= dimensions; rowID++) {
      const rowDiv = new CreateAppend('div', ``, colDiv);
      rowDiv.id = `${colID},${rowID}`;
      rowDiv.classList.add('board');
      if (boardPath.includes(rowDiv.id)) {
        rowDiv.classList.add('path');
      };
      if (colours.red.includes(rowDiv.id)) {
        rowDiv.classList.add('red');
      }
      else if (colours.green.includes(rowDiv.id)) {
        rowDiv.classList.add('green');
      }
      else if (colours.blue.includes(rowDiv.id)) {
        rowDiv.classList.add('blue');
      }
      else if (colours.yellow.includes(rowDiv.id)) {
        rowDiv.classList.add('yellow');
      }
      else if (["7,7", "6,7", "7,6", "8,7", "7,8"].includes(rowDiv.id)) {
        rowDiv.classList.add('home');
        if (rowDiv.id == "7,7") {
        rowDiv.textContent = "⌂";
        }
      }
      // for (let i = 1; i <= 4; i++) {
      //   if (homes[this.colour][i-1] === rowDiv.id){
      this.player.pawns.forEach((pawn, index) => {
        if (rowDiv.id === pawn.position) {
          const pawnView = new PawnView(rowDiv);
          const pawnId = `${this.colour}${index+1}`;
          pawnView.createPawn(rowDiv, this.colour, pawnId, this.player);
        };
      });
    }
  };
  console.log('this is the board loaded');
};


module.exports = BoardView;

// if (rowDiv.id === '2,2') {
//   console.log(rowDiv.id);
//   PubSub.subscribe('Pawn:position-calculated', (event) => {
//     const pawnID = event.detail.id;
//     // console.log(pawnID);
//     const newDiv = document.getElementById(event.detail.position)
//     // console.log(event.detail.position);
//     // newDiv.appendChild(pawnView);
//     const pawnView = new PawnView(rowDiv);
//     pawnView.createPawn(newDiv, this.colour, pawnID, this.player);
//
//   });
// }
