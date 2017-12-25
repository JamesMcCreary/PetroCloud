module.exports = function(app, db) {
  app.post('/posts', (req, res) => {
    // You'll create your note here.
    res.send('Hello')
  });
};