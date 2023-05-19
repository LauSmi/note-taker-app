//dependencies
const fs = require('fs');
const express = require('express');
const path = require('path');

// Sets up the Express App
const app = express();

// Sets port for listening
const PORT = process.env.PORT || 3001;

//public directory
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//route to notes.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

//route to index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

//route to read the `db.json` file and return all saved notes as JSON.
app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/db/db.json'));
});

//POST
app.post('/api/notes', (req, res) => {
    let newNote = req.body;
    let noteList = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    let notelength = noteList.length.toString();

    newNote.id = notelength;

    noteList.push(newNote);

    //write the updated data to db.json
    fs.writeFileSync('./db/db.json', JSON.stringify(noteList));
    res.json(noteList);
});

//DELETE
app.delete('/api/notes/:id', (req, res) => {
    let noteList = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    let noteId = req.params.id.toString();

    noteList = noteList.filter((selected) => {
        return selected.id != noteId;
    });

    //write the updated data to db.json and display the updated note
    fs.writeFileSync('./db/db.json', JSON.stringify(noteList));
    res.json(noteList);
});

//port listener
app.listen(PORT, () => console.log('Server listening on port ' + PORT));
