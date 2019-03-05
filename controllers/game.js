const fs = require('fs');
let inputPath = process.argv.slice(2)[0];
const directions = ['NORTH', 'EAST', 'SOUTH', 'WEST'];


class Game {
  static run () {
    //FOR TESTING PURPOSES
    if (inputPath == '--exit') {
      inputPath = 'exampleA.txt'
    }
    return new Promise(function (resolve, reject) {
      fs.readFile(inputPath, 'utf8', (err, data) => {
        if (err) {
          reject(err);
        } else {
          const input = Game.setInput(data); 
          let position = {};
          let result = '';
          Game.move(input, position, result);
          resolve(position);
        }
      });
    })
  }
  static setInput (data) {
    const input = [];
    const newData = data.split('\n');
    newData.forEach(val => {
      let line = val.split(' ');
      let name = line[0];
      let coord = line[1];
      if (coord) coord = line[1].split(',');
      input.push({name, coord});
    })
    return input;
  }
  static move (input, position, result) {
    input.forEach(val => {
      if (val.name == 'PLACE') {
        position.X = val.coord[0];
        position.Y = val.coord[1];
        position.F = val.coord[2];
      } 
      else if (val.name == 'MOVE') {
        if (position.F == 'NORTH') {
          position.Y++;
        } else if (position.F == 'EAST') {
          position.X++;
        } else if (position.F == 'WEST') {
          position.X--;
        } else {
          position.Y--;
        }
      } 
      else if (val.name == 'LEFT') {
        let index = directions.indexOf(position.F) - 1;
        if (index < 0) index = directions.length -1;
        position.F = directions[index];
      } 
      else if (val.name == 'RIGHT') {
        let index = directions.indexOf(position.F) + 1;
        if (index >= directions.length) index = 0;
        position.F = directions[index];
      }
      else if (val.name == 'REPORT') {
        result = `${position.X}, ${position.Y}, ${position.F}`;
        position.report = result;
      }
    })
  }
};


module.exports = Game;