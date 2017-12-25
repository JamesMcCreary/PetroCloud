module.exports = function(app, db) {
  app.post('/comments', (req, res) => {
    // You'll create your note here.
    res.send('Hello')
  });
};