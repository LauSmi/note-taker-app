// Dependencies
const fs = require('fs');
const path = require('path');

const express = require('express');
const app = express();

const entries = require('./db/db.json');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// GET requests
app.get('/api/notes', (req, res) => {
  res.json(entries.slice(3)); // Slice from index 2 to remove the first two notes
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

// Function to create a new note
function createNewNote(body, notesArray) {
  const newNote = body;
  if (!Array.isArray(notesArray)) notesArray = [];

  if (notesArray.length === 0) notesArray.push(0);

  body.id = notesArray[0];
  notesArray[0]++;

  notesArray.push(newNote);
  fs.writeFileSync(
    path.join(__dirname, './db/db.json'),
    JSON.stringify(notesArray, null, 2)
  );
  return newNote;
}

// POST request
app.post('/api/notes', (req, res) => {
  const newNote = createNewNote(req.body, entries);
  res.json(newNote);
});

// Delete function
function deleteNote(id, notesArray) {
  for (let i = 0; i < notesArray.length; i++) {
    let note = notesArray[i];

    if (note.id == id) {
      notesArray.splice(i, 1);
      fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(notesArray, null, 2)
      );
      break;
    }
  }
}

// DELETE request
app.delete('/api/notes/:id', (req, res) => {
  deleteNote(req.params.id, entries);
  res.json(true);
});

// Port listener
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}!`);
});

/* Sets port for listening
const PORT = process.env.PORT || 3001;

//Dependencies
const fs = require('fs');
const path = require('path');

const express = require('express');
const app = express();

const entries = require('./db/db.json');

//Middleware 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

//GET requests
app.get('/api/notes', (req, res) => {
    res.json(entries.slice(1));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

//Function to make new notes
function makeNewNote(body, notesArray) {
    const newNote = body;
    if (!Array.isArray(notesArray))
        notesArray = [];
    
    if (notesArray.length === 0)
        notesArray.push(0);

    body.id = notesArray[0];
    notesArray[0]++;

    notesArray.push(newNote);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(notesArray, null, 2)
    );
    return newNote;
}

//POST request
app.post('/api/notes', (req, res) => {
    const newNote = makeNewNote(req.body, entries);
    res.json(newNote);
});

//Delete function
function deleteNote(id, notesArray) {
    for (let i = 0; i < notesArray.length; i++) {
        let note = notesArray[i];

        if (note.id == id) {
            notesArray.splice(i, 1);
            fs.writeFileSync(
                path.join(__dirname, './db/db.json'),
                JSON.stringify(notesArray, null, 2)
            );

            break;
        }
    }
}

//DELETE request
app.delete('/api/notes/:id', (req, res) => {
    deleteNote(req.params.id, entries);
    res.json(true);
});


//Port listener
app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}!`);
});*/
