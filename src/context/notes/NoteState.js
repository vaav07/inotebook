
import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
 const notesInitial = [
{ "_id": "sdbabdsad5s45ad4",
    "title":"My Title",
"description": "Wake up early"},
{"_id": "sdbsadabdsad5s45ad4",
    "title":"My Title 2",
"description": "Wake up early 2"}
 ]

 const [notes, setNotes] = useState(notesInitial)

  return (
    <NoteContext.Provider value={{notes, setNotes}}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
