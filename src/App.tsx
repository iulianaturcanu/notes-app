import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';

type ResponseType = {
  id: string;
  body: string;
}[];

const App = () => {
  const [noteInput, setNoteInput] = useState('');
  const [notes, setNotes] = useState<ResponseType>([]);

  const addNote = () => {
    // it will be actually better if this endpoint would return the updated list of notes in order 
    // to get rid of second GET request from frontend to get the updated list
    axios.post(`https://challenge.leadjet.io/"test1"/notes`, {
      body: noteInput,
    })
    getNotes();
  };

  const getNotes = () => {
    axios.get(`https://challenge.leadjet.io/"test1"/notes`).then((res) => {
      setNotes(res.data);
    });
  }

  useEffect(() => {
    getNotes();
  }
  , []);

  return (
    <div className="app">
      <h1>Notes app</h1>
      <form onSubmit={addNote} className="note-form">
        <textarea
          value={noteInput}
          onChange={(event) => setNoteInput(event.target.value)}
          placeholder="Take a note..."
          className="textarea"
        ></textarea>
        <button>Add</button>
        {notes.map((note) => (
          <div className="note-display" key={note.id}>
            {note.body}
          </div>
        ))}
      </form>
    </div>
  );
};

export default App;
