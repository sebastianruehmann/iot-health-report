const Moment = require('moment');
const { extendMoment } = require('moment-range');
const moment = extendMoment(Moment);

module.exports = {
  /**
   * checks if the date is between start_date and end_date
   * @param {Date} start_date
   * @param {Date} end_date
   * @returns {Boolean}
  */
  filterTimeRange: (event, start_date, end_date) => {
    if(moment(start_date).isSame(moment(end_date))) {
      return moment(event.timestamp).isSame(moment(start_date), 'day');
    } else {
      const range = moment.range(moment(start_date), moment(end_date));

      return range.contains(moment(event.timestamp));
    }
  },
  /**
   * checks if filter is available and build object for query
   * @param {Object} filters
   * @returns {Object}
  */
  filterProperty: filters => {
    filters = JSON.parse(filters);
    const availableFilters = ['type', 'status'];
    let dbFilter = {};
    Object.keys(filters).forEach(filter => {
      let value = filters[filter];
      if(availableFilters.includes(filter) && value) {
        dbFilter[filter] = value;
      }
    });
    return dbFilter;
  },
  /**
   * unifies dates on day precisely
   * @param {Object} event
   * @returns {Date}
  */
  groupByDay: event => {
    return moment(event.timestamp).startOf('day');
  },
  /**
   * load required mixins
   * @param {Object} _ - lodash instance
  */
  loadMixins: _ => {
    _.mixin({
      sortByKeys: object => {
        const keys = Object.keys(object)
        const sortedKeys = _.orderBy(keys, o => { return new moment(o).format('YYYYMMDD'); }, 'desc');

        return _.fromPairs(
          _.map(sortedKeys, key => [key, object[key]])
        )
      }
    });
  }
}
