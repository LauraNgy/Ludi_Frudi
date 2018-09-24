const assert = require('assert');
const Player = require('../models/player.js');
const Pawn = require('../models/pawn.js');

describe('Player', function() {

  let player;
  let pawn4;
  let pawn1;
  let pawn2;
  let pawn3;

  beforeEach(function () {

    pawn1 = new Pawn("red1", '2,2');
    pawn2 = new Pawn("red2", '2,4');
    pawn3 = new Pawn("red3", '4,2');
    pawn4 = new Pawn("red4", '4,4');
    player = new Player("red", 'red', 'playing', [pawn1, pawn2, pawn3, pawn4]);
  });

  it('should select a pawn', )

});
