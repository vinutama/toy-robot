const { expect } = require('chai');
const fs = require('fs');
const { setInput, run, move } = require('../controllers/game');
const { play } = require('../controllers');
const { showConsole } = require('../views');
const inputTest = fs.readFileSync('exampleA.txt', 'utf8');
let manipulated = [];
let position = {};
let result = '';

describe('TESTING FOR RUNNING FUNCTIONS', function () {
  it('should return running game', function (done) {
    let test = [ { name: 'PLACE', coord: [ '0', '0', 'SOUTH' ] },
    { name: 'MOVE', coord: undefined },
    { name: 'MOVE', coord: undefined },
    { name: 'MOVE', coord: undefined },
    { name: 'RIGHT', coord: undefined },
    { name: 'REPORT', coord: undefined } ];
    move(test, position, result)
    play()
    done()
  })
})
describe('TESTING MANIPULATING INPUT', function () {
  it('should return an array of object of the input', function (done) {
    const result = setInput(inputTest);
    expect(result).to.be.an('array');
    expect(result[0]).to.have.property('name');
    expect(result[0]).to.have.property('coord');
    expect(result[0].name).to.equal('PLACE');
    expect(result[0].coord).to.be.an('array');
    manipulated = result;
    done();
  })
})

describe('TESTING FOR MOVING ROBOT', function () {
  it('should return a new position when name is "PLACE" AND FACING NORTH', function (done) {
    move(manipulated, position, result);
    expect(position).to.be.an('object')
    expect(position.X).to.equal('0');
    expect(position.Y).to.equal(1);
    expect(position.F).to.equal('NORTH')
    done();
  })
  it('should change facing to WEST directions', function (done) {
    let test = [ { name: 'PLACE', coord: [ '0', '0', 'NORTH' ] },
    { name: 'LEFT', coord: undefined },
    { name: 'REPORT', coord: undefined } ];
    move(test, position, result);
    expect(position.X).to.equal('0');
    expect(position.Y).to.equal('0');
    expect(position.F).to.equal('WEST')
    done()
  })
  it('should change facing to EAST directions', function(done) {
    let test = [ { name: 'PLACE', coord: [ '0', '0', 'NORTH' ] },
    { name: 'RIGHT', coord: undefined },
    { name: 'REPORT', coord: undefined } ];
    move(test, position, result);
    done();
  })
  it('should change position X Axis to the left when moving and direction to WEST', function(done) {
    let test = [ { name: 'PLACE', coord: [ '1', '2', 'WEST' ] },
    { name: 'MOVE', coord: undefined },
    { name: 'REPORT', coord: undefined } ];
    move(test, position, result);
    expect(position).to.be.an('object');
    expect(position.X).to.equal(0);
    expect(position.Y).to.equal('2');
    expect(position.F).to.equal('WEST');
    done();
  })
  it('should change position X Axis to the right when moving and direction to EAST', function(done) {
    let test = [ { name: 'PLACE', coord: [ '1', '2', 'EAST' ] },
    { name: 'MOVE', coord: undefined },
    { name: 'REPORT', coord: undefined } ];
    move(test, position, result);
    expect(position).to.be.an('object');
    expect(position.X).to.equal(2);
    expect(position.Y).to.equal('2');
    expect(position.F).to.equal('EAST');
    done();
  })
  it('should change position Y Axis to the bottom when moving and direction to SOUTH', function(done) {
    let test = [ { name: 'PLACE', coord: [ '1', '2', 'SOUTH' ] },
    { name: 'MOVE', coord: undefined },
    { name: 'REPORT', coord: undefined } ];
    move(test, position, result);
    expect(position).to.be.an('object');
    expect(position.X).to.equal('1');
    expect(position.Y).to.equal(1);
    expect(position.F).to.equal('SOUTH');
    done();
  })
})

