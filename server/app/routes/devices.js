const restify = require('restify');
const errors = require('restify-errors');
const queryBuilder = require('../helpers/queryBuilder');

module.exports = {
  get: (req, res, next) => {
    const query = req.query;
    let db = req.db.get('events');

    if(query.start_date && query.end_date) {
      db = db.filter(event => queryBuilder.filterTimeRange(event, query.start_date, query.end_date));
    }

    if(query.filter) {
      db = db.filter(queryBuilder.filterProperty(query.filter));
    }

    db = db.groupBy('id')
      .map((items, itemsId) => {
        return { items, id: itemsId, count: items.length };
      });

    switch (query.sort) {
      case "popular":
        db = db.orderBy('count', 'desc');
        break;
    }

    if(query.limit) {
      db = db.take(query.limit);
    }

    res.json(db.value());
    return next();
  },

}
