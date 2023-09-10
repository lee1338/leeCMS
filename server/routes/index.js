const path = require('path');
const newsHandler = require('./news');
const staffHandler = require('./staff');
const userHandler = require('./user');
const versionHandler = require('./version');

const routes = (app) => {
  app.use('/api/news', newsHandler);
  app.use('/api/staff', staffHandler);
  app.use('/api/user', userHandler);
  app.use('/api/version', versionHandler);

  //fallback routes
  app.get('/client', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'index.html'));
  });
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
  });
}


module.exports = routes;
