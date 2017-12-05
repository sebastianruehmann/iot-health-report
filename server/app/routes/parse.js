const restify = require('restify');
const errors = require('restify-errors');
const csv = require('./../services/csv');
const file = require('./../services/file');

module.exports = {
  post: async (req, res, next) => {
    const db = req.db;
    let status = [];
    let types = [];
    let parsedCSV = [];
    let csvString = "";
    
    try {
      // Could be skipped if CSV data get inserted through HTTP parameter
      csvString = await file.read('data/report.csv');
    } catch(e) {

    }
    try {
      parsedCSV = await csv.parse(csvString);
    } catch(e) {
    }

    parsedCSV.forEach(e => {
      // Add unique status and types to db
      if(!status.includes(e.status)) {
        status.push(e.status);
      }
      if(!types.includes(e.type)) {
        types.push(e.type);
      }
    });

    db.set('status', status).write();
    db.set('types', types).write();
    db.set('events', output).write();

    res.send('Successfully parsed CSV file');
    return next();
  },
}
