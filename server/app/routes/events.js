const restify = require('restify');
const errors = require('restify-errors');
const queryBuilder = require('../helpers/queryBuilder');

module.exports = {
  get: (req, res, next) => {
    const query = req.query;
    let db = req.db.get('events');
    const _ = req.db._;
    queryBuilder.loadMixins(_);

    if(query.start_date && query.end_date) {
      db = db.filter(event => queryBuilder.filterTimeRange(event, query.start_date, query.end_date));
    }

    if(query.filter) {
      db = db.filter(queryBuilder.filterProperty(query.filter));
    }

    switch (query.group) {
      case "day":
        db = db.groupBy(event => queryBuilder.groupByDay(event));
        break;
    }

    db = db.mapValues(event => {
      return _.chain(event).groupBy('id')
        .map((items, itemsId) => {
          return { items, id: itemsId, count: items.length };
        });
    });

    switch (query.sort) {
      case "timestamp":
        db = db.sortByKeys().reverse();
        break;
    }

    res.json(db.value());
    return next();
  },

}
