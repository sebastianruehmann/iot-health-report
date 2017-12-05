const parse = require('csv-parse');
const fs = require('fs');

module.exports = {
  /**
   * parse CSV string
   * @param {String} data - formatted in CSV
   * @returns {Promise} A promise that returns an Array with keyed properties in objects for each line in CSV if resolved
   * and parse error if rejected.
  */
  parse: (data) => {
    return new Promise((resolve, reject) => {
      if(!data) {
        reject("No parameter data given")
      }
      parse(data, (err, output) => {
        if(err) {
          reject(err);
        }
        const titles = [];

        titles = output[0];
        output.splice(0,1);
        output = output.map(event => {
          let newOutput = {};
          event.forEach((prop, i) => {
            newOutput[titles[i]] = prop;
          });
          return newOutput;
        });

        resolve(output);
      });
    });
  }
}
