const restify = require('restify');
const errors = require('restify-errors');
const restifyPromise = require('restify-await-promise');
const low = require('lowdb');
const FileAsync = require('lowdb/adapters/FileAsync');
const corsMiddleware = require('restify-cors-middleware')
const adapter = new FileAsync('data/db.json');

const events = require('./routes/events');
const devices = require('./routes/devices');
const status = require('./routes/status');
const types = require('./routes/types');
const parse = require('./routes/parse');

const server = restify.createServer({
  name: 'iot-health-report'
});

low(adapter)
  .then(db => {
    // Makes DB accessible in routes
    const lowDb = function(req, resp, next){
      req.db = db;
      next();
    };

    const basePath = '/api';

    // Enables CORS for frontend
    const cors = corsMiddleware({
      origins: [
        // 'http://localhost:3000', # Should be used in production
        '*'
      ]
    });

    server.pre(cors.preflight);
    server.use(cors.actual);
    server.use(restify.plugins.queryParser());
    server.use(lowDb);

    restifyPromise.install(server, {
      errorTransformer: {
        transform: function(exceptionThrownByRoute) {
          console.error(exceptionThrownByRoute);
          return exceptionThrownByRoute;
        }
      }
    });

    // Routes
    server.get(basePath + '/devices', devices.get);
    server.get(basePath + '/events', events.get);
    server.get(basePath + '/status', status.get);
    server.get(basePath + '/types', types.get);
    server.post(basePath + '/parse', parse.post);

    // default DB data
    return db.defaults({ status: [], types: [], events: [] }).write();
  })
  .then(() => {
    server.listen(5000, () => console.log('listening on port' + 5000));
  }).catch((error) => {
    // DB connection could not be established
    console.log(error);
  });
