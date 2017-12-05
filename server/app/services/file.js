const fs = require('fs');

module.exports = {
  /**
   * Read file
   * @param {String} filePath
   * @returns {Promise} A promise that returns file Data if resolved
   * and fs error if rejected.
  */
  read: (filePath) => {
    return new Promise((resolve, reject) => {
      if(!filePath) {
        reject('No parameter filePath given');
      }
      fs.readFile(filePath, 'utf8', function (err,data) {
        if (err) {
          reject(err);
        }
        resolve(data);
      });
    });
  }

}
