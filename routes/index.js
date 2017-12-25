const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const commentRoutes = require('./commentRoutes');


module.exports = function(app) {
  userRoutes();
  postRoutes(app, db);
  commentRoutes(app, db);
  // Other route groups could go here, in the future
};