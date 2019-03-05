const { run } = require('./game');
const { showConsole } = require('../views');
const fs = require('fs');

class Controller {
  static play () {
    run()
    .then(data => {
          let position = {
            X: data.X,
            Y: data.Y,
            F: data.F,
            report: data.report
          };
          if (Number(position.X) > 4 || Number(position.X) < 0 || Number(position.Y) > 4 || Number(position.Y) < 0) {
            showConsole('Robot fall out of the board!');
          } 
          else {
            fs.writeFile('position.json', JSON.stringify(position), (err) => {
              if (err) console.log(err);
              else showConsole(position.report);
            })
          }
    })
    .catch(err => {
      showConsole(err);
    })
  }
};


module.exports = Controller;