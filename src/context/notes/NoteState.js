import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const notesInitial = [
    {
      _id: "sdbabdsad5s45ad4",
      title: "My Title",
      description: "Wake up early",
    },
    {
      _id: "sdbsadabdsad5s45ad4",
      title: "My Title 2",
      description: "Wake up early 2",
    },
  ];

  const [notes, setNotes] = useState(notesInitial);

  //  Add a Note
  const addNote = (title, description, tag) => {
    // TODO: API call
    console.log("adding a new note");
    const note = {
      _id: "sdbsadabdsad5s45ad4",
      title: title,
      description: description,
      tag: tag,
    };
    setNotes(notes.concat(note));
  };

  // Delete a Note
  const deleteNote = (id) => {
       // TODO: API call
      console.log("deleting the note with id" + id)
      const newNotes = notes.filter((note)=>{return note._id!==id})
      setNotes(newNotes);
  };

  // Edit a Note
  const editNote = (id, title, description, tag) => {
      
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
