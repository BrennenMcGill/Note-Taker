const express = require('express');
const app = express();
const path = require('path');
const db = require('./db/db');
const fs = require('fs');

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


app.listen(3001, () => {
  console.log(`API server now on port 3001!`);
});