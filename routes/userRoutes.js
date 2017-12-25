module.exports = function() {
  app.post('/users', (req, res) => {
    console.log(req.body);
    res.send('Hello')
  });
};