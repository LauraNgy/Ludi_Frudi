const Pawn = require('../models/pawn.js');
const Player = require('../models.player.js');
const Game = require('../models/game.js');

const red1 = new Pawn();
const red2 = new Pawn();
const red3 = new Pawn();
const red4 = new Pawn();
const redPawns = [red1, red2, red3, red4];

const blue1 = new Pawn();
const blue2 = new Pawn();
const blue3 = new Pawn();
const blue4 = new Pawn();
const bluePawns = [blue1, blue2, blue3, blue4];

const green1 = new Pawn();
const green2 = new Pawn();
const green3 = new Pawn();
const green4 = new Pawn();
const greenPawns = [green1, green2, green3, green4];

const yellow1 = new Pawn();
const yellow2 = new Pawn();
const yellow3 = new Pawn();
const yellow4 = new Pawn();
const yellowPawns = [yellow1, yellow2, yellow3, yellow4];

const red = new Player('red', redPawns);
const blue = new Player('blue', bluePawns);
const green = new Player('green', greenPawns);
const yellow = new Player('yellow', yellowPawns);
const players = [red, blue, green, yellow];

const game = new Game(players);

module.exports = game;
