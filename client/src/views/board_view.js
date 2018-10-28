const CreateAppend = require('../helpers/create_append.js');
const boardPath = require('../models/board_path.js');
const colours = require('../models/colours.js');
const PubSub = require('../helpers/pub_sub.js');
const starts = require('../models/starts.js');
const Pawn = require('../models/pawn.js');
const Game = require('../models/game.js');
const PawnView = require('./pawn_view.js');


const BoardView = function (element) {
  this.element = element;
  this.board = null;
  // this.players = null;

};

BoardView.prototype.renderBoard = function () {
  if (this.board === null) {
    this.board = new CreateAppend('div', "", this.element);
    this.board.classList.add('mainBoard');
  };
  for (let colID = 1; colID <= 13; colID++) {
    const colDiv = new CreateAppend('div', "", this.board);
    colDiv.id = colID;
    for (let rowID = 1; rowID <= 13; rowID++) {
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
      else if (starts.red.includes(rowDiv.id) || starts.blue.includes(rowDiv.id) || starts.yellow.includes(rowDiv.id) || starts.yellow.includes(rowDiv.id)) {
        rowDiv.classList.add('start');
      }
      else if (["7,7", "6,7", "7,6", "8,7", "7,8"].includes(rowDiv.id)) {
        rowDiv.classList.add('home');
        if (rowDiv.id == "7,7") {
        rowDiv.textContent = "⌂";
        }
      }
    };
  };
};

BoardView.prototype.populatePawns = function (players, gameInfo) {
  for (let colID = 1; colID <= 13; colID++) {
    for (let rowID = 1; rowID <= 13; rowID++) {
      const id = `${colID},${rowID}`;
      const positionDiv = document.getElementById(id);
      if (positionDiv.firstChild) {
        positionDiv.removeChild(positionDiv.firstChild);
        positionDiv.classList.remove('availablePawn');
      }
      if (positionDiv.className.includes('path')) {
        positionDiv.innerHTML = "";
      }
      players.forEach( (player) => {
        player.pawns.forEach((pawn, index) => {
          if (positionDiv.id === pawn.position) {
            const pawnView = new PawnView(positionDiv);
            const pawnId = `${player.colour}${index+1}`;
            pawnView.createPawn(player.colour, pawnId, gameInfo, pawn.status);
          };
        });
      });
    };
  };
};

module.exports = BoardView;
