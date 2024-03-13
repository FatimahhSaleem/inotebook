import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext';

const AddNote = (props) => {
    const context=useContext(noteContext);
    const{addNote}=context;
    const [note,setNote] =useState({title:"",description:"",tag:""})

    const handleClick=(e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag)
        setNote({title:"",description:"",tag:""})
        props.showAlert("Note added successfully","success")
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
              value={note.title}
              onChange={handleChange}
              className="form-control"
              id="title"
              aria-describedby="emailHelp"
              minLength={5} required
            />
            
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
             name="description"
              type="text"
              value={note.description}
              onChange={handleChange}
              className="form-control"
              id="description"
              minLength={5} required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              Tag
            </label>
            <input
             name="tag"
              type="text"
              value={note.tag}
              onChange={handleChange}
              className="form-control"
              id="tag"
              minLength={5} required
            />
          </div>
          
         
          <button disabled={note.title.length<5 ||note.description.length<5} type="submit" onClick={handleClick} className="btn btn-primary">
            Add Note
          </button>
        </form>
      </div>
</>

  );
};



export default AddNote
