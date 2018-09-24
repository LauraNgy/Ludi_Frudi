const assert = require('assert');
const Pawn = require('../models/pawn.js');

describe('Pawn', function() {

  let pawn;

  beforeEach(function () {
    pawn = new Pawn(1, '2,10')
  });

 it('should be able to go on starting position', function () {
   pawn.start('yellow');
   const actual = pawn.position;
   const expected = "6,13";
   assert.strictEqual(actual, expected);
 });

 it('should increase the number of steps on move', function () {
   pawn.start('yellow');
   pawn.move(3);
   const actual = pawn.stepcount;
   const expected = 3;
   assert.strictEqual(actual, expected);
 });

 it('should change position on move', function (){
   pawn.start('yellow');
   pawn.move(4);
   const actual = pawn.position;
   const expected = "6,9";
   assert.strictEqual(actual, expected);
 });

 it('should loop movement', function () {
   pawn.start('yellow');
   pawn.move(25);
   const actual = pawn.position;
   const expected = "8,2";
   assert.strictEqual(actual, expected);
 });

  it('should go home', function () {
    pawn.start('yellow');
    pawn.move(49);
    const actual = pawn.position;
    const expected = "7,9";
    assert.strictEqual(actual, expected);
  });

  it('should change status when finish', function () {
    pawn.start('yellow');
    pawn.move(49);
    const actual = pawn.status;
    const expected = "finish";
    assert.strictEqual(actual, expected);
  });

});
