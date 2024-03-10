import React, { useContext, useRef, useEffect,useState } from "react";
import noteContext from "../context/notes/noteContext";
import NotesItem from "./NotesItem";
import AddNote from "./AddNote";

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getNote ,editNote} = context;
  useEffect(() => {
    getNote();
  }, []);
  
  const ref = useRef(null);
  const refClose = useRef(null);
  const [note,setNote] =useState({id:"",etitle:"",edescription:"",etag:""})

 
  const handleClick=(e)=>{
    e.preventDefault();
    editNote(note.id,note.etitle,note.edescription,note.etag)
    refClose.current.click()
  }
  const handleChange=(e)=>{
    
    e.preventDefault();
    setNote({...note,[e.target.name]:e.target.value})
  }

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id: currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag})
  };

  return (
    <>
      <AddNote />
      {/* modal */}
      {/* <!-- Button trigger modal --> */}
      <button
        type="button"
        ref={ref}
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
               Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
            <div className="container my-3">
        
        <h2>Add Note</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="etitle" className="form-label">
              Title
            </label>
            <input
              type="text"
              name="etitle"
              onChange={handleChange}
              className="form-control"
              id="etitle"
              value={note.etitle}
              aria-describedby="emailHelp" minLength={5} required
            />
            
          </div>
          <div className="mb-3">
            <label htmlFor="edescription" className="form-label">
              Description
            </label>
            <input
             name="edescription"
             value={note.edescription}
              type="text"
              onChange={handleChange}
              className="form-control"
              id="edescription"
              minLength={5} required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="etag" className="form-label">
              Tag
            </label>
            <input
             name="etag"
             value={note.etag}
              type="text"
              onChange={handleChange}
              className="form-control"
              id="etag"
              minLength={5} required
            />
          </div>
        </form>
      </div>              
      </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button  disabled={note.etitle.length<5 ||note.edescription.length<5}  type="button" onClick={handleClick} className="btn btn-primary">
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-3">
        <h2>Your Notes</h2>
        <div className="container mx-2">
          {notes.length===0 && 'No notes to display' }
        </div>
        {notes.map((note) => {
          return <NotesItem key={note._id} updateNote={updateNote} note={note} />
          
        })}
      </div>
    </>
  );
};

export default Notes;
