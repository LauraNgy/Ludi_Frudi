const CreateAppend = require('../helpers/create_append.js');
const boardPath = require('../models/board_path.js');
const colours = require('../models/colours.js');
const PubSub = require('../helpers/pub_sub.js');


const BoardView = function (element) {
  this.element = element;
};

BoardView.prototype.bindEvents = function () {
  const board = new CreateAppend('div', "", this.element);
  board.classList.add('mainBoard');
  this.renderBoard(13, board);
};

BoardView.prototype.renderBoard = function (dimensions, board) {
  for (let colID = 1; colID <= dimensions; colID++) {
    const colDiv = new CreateAppend('div', "", board);
    colDiv.id = colID;
    colDiv.classList.add('board');
    for (let rowID = 1; rowID <= dimensions; rowID++) {
      const rowDiv = new CreateAppend('div', `${colID},${rowID}`, colDiv);
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
      PubSub.subscribe('Player:active-colour', (event) => {
        const colour = event.detail;
        for (let i = 1; i <= 4; i++) {
          const pawn = new CreateAppend('p', colour, homes[i-1]);
          pawn.id = `${colour}${i}`;
          const pawnObj = {
            "id": `${colour}${i}`,
            "position": homes[i-1]
          }
          PubSub.publish('BoardView:pawn-created', pawnObj);
        }
      });
    }
  }
};

module.exports = BoardView;
