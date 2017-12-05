const restify = require('restify');
const errors = require('restify-errors');

module.exports = {
  get: (req, res, next) => {
    const types = req.db.get('types').value();
    res.json(types);
    return next();
  },
}
