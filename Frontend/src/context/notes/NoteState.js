import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  //fetch all notes
  const getNote = async () => {
    // API call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVlMjQyNGZiNjg4NDJkOGFjZmY1MmE2In0sImlhdCI6MTcwOTMyNzMyNn0.AK54TJxmX59yy2AC3ikB1vVtmbZOdYTjUWuMk-dxi4g",
      },
    });
    const json = await response.json();
    setNotes(json);
  };

  //add a note
  const addNote = async (title, description, tag) => {
    // API call
    const response = await fetch(`${host}/api/notes/addNotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVlMjQyNGZiNjg4NDJkOGFjZmY1MmE2In0sImlhdCI6MTcwOTMyNzMyNn0.AK54TJxmX59yy2AC3ikB1vVtmbZOdYTjUWuMk-dxi4g",
      },

      body: JSON.stringify({ title, description, tag }),
    });

    const note=await response.json()
    setNotes(notes.concat(note));
  };

  //delete a note
  const deleteNote = async (id) => {
    // To Do API call
    const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVlMjQyNGZiNjg4NDJkOGFjZmY1MmE2In0sImlhdCI6MTcwOTMyNzMyNn0.AK54TJxmX59yy2AC3ikB1vVtmbZOdYTjUWuMk-dxi4g",
      },
    });
    const json=await response.json()

    const delNote = notes.filter((note) => {

        return note._id !== id;
    });
    setNotes(delNote);
  };
  //edit a note
  const editNote = async (id, title, description, tag) => {
    // API call
    const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVlMjQyNGZiNjg4NDJkOGFjZmY1MmE2In0sImlhdCI6MTcwOTMyNzMyNn0.AK54TJxmX59yy2AC3ikB1vVtmbZOdYTjUWuMk-dxi4g",
      },
    });
    const json=await response.json()
    
    let newNotes=JSON.parse(JSON.stringify(notes))

    //Logic to edit in client
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if(element._id===id){
      newNotes[index].title = title;
      newNotes[index].description = description;
      newNotes[index].tag = tag;
      break;
      }
    }
    setNotes(newNotes)
  };

  return (
    <NoteContext.Provider
      value={{ notes, setNotes, addNote, editNote, deleteNote, getNote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
