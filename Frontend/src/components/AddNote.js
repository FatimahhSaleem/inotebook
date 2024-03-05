import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext';

const AddNote = () => {
    const context=useContext(noteContext);
    const{addNote}=context;
    const [note,setNote] =useState({title:"",description:"",tag:"General"})

    const handleClick=(e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag)
    }
    const handleChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }
  return (
    <>
      <div className="container my-3">
        
        <h2>Add Note</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              name="title"
              onChange={handleChange}
              className="form-control"
              id="title"
              aria-describedby="emailHelp"
            />
            
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
             name="description"
              type="text"
              onChange={handleChange}
              className="form-control"
              id="description"
            />
          </div>
          
         
          <button type="submit" onClick={handleClick} className="btn btn-primary">
            Add Note
          </button>
        </form>
      </div>
</>

  );
};



export default AddNote
