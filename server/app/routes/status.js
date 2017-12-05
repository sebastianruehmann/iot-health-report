const restify = require('restify');
const errors = require('restify-errors');

module.exports = {
  get: (req, res, next) => {
    const status = req.db.get('status').value();
    res.json(status);
    return next();
  },
}
