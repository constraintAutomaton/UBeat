exports.getHome = function(req, res) {
  res.set('Content-Type', 'text/html');
  res.status(200).send('<h1>Welcome to the UBeat custom API.</h1><p>Provided by team 9</p>');
}

exports.getStatus = function(req, res) {
  res.status(200).send({
    status: 'online'
  })
}
