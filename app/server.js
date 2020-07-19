const express = require('express');
const app = express();
const path = require('path');
let db = require('./db/db.json');
const fs = require('fs');
var uniqid = require('uniqid');
const PORT = process.env.PORT || 3001;


// Sets up the Express app to handle data parsing
app.use('/static', express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/api/notes', (req, res) => {
  res.json(db);
});

app.post('/api/notes', (req, res) => {
  const newNote = {'title': req.body.title, 'text': req.body.text, 'id': uniqid()};

  db.push(newNote);

  fs.writeFile('./db/db.json', JSON.stringify(db),  () => {res.json(newNote)});
})

app.delete('/api/notes/:id', (req, res) => {
  let removeNote = req.param.id;
  
  function checkNote(id) {
    return removeNote == id.id
  }

  let foundIndex = db.findIndex(checkNote)

  db.splice(foundIndex, 1);

  fs.writeFile('./db/db.json', JSON.stringify(db),  () => {res.sendStatus(200)});


});

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});