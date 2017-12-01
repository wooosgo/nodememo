var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {

  app.get('/notes/:id', (req, res) => {
  const id = req.params.id;
  const details = { '_id': new ObjectID(id) };
  db.collection('notes').findOne(details, (err, item) => {
    if (err) {
      res.send({'error':'An error has occurred'});
    } else {
      res.send(item);
    }
  });
});

  app.delete('/notes/:id', (req, res) => {
  const id = req.params.id;
  const details = { '_id': new ObjectID(id) };
  db.collection('notes').remove(details, (err, item) => {
    if (err) {
      res.send({'error':'An error has occurred'});
    } else {
      res.send('The object' + item + 'was deleted');
    }
  });
});


  app.put('/notes/:id', (req, res) => {
  const id = req.params.id;
  const details = { '_id': new ObjectID(id) };
  const newmsg = { title: req.body.name, message: req.body.age };

  db.collection('notes').update(details, newmsg, (err, item) => {
    if (err) {
      res.send({'error':'An error has occurred'});
    } else {
      res.send('The object' + item + 'was updated');
    }
  });
});


  app.post('/notes', (req, res) => {
    const note = { title: req.body.name, message: req.body.age };
    db.collection('notes').insert(note, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send(result.ops[0]);
      }
    });
  });
};
