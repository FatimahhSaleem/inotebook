import React, { useState }  from 'react'
import NoteContext from './noteContext'

const NoteState = (props) => {
   const notesInitial=[
    {
        "_id": "65e5d876a6276475799add591",
        "user": "65e2424fb68842d8acff52a6",
        "title": "hi i am title",
        "description": "this is a description",
        "tag": "general",
        "date": "2024-03-04T14:19:34.201Z",
        "__v": 0
    },
    {
        "_id": "65e5d87aa6276475799ad593",
        "user": "65e2424fb68842d8acff52a6",
        "title": "hi i am title",
        "description": "this is a description",
        "tag": "general",
        "date": "2024-03-04T14:19:38.457Z",
        "__v": 0
    },
    {
        "_id": "65e5d876a6276475799ad591",
        "user": "65e2424fb68842d8acff52a6",
        "title": "hi i am title",
        "description": "this is a description",
        "tag": "general",
        "date": "2024-03-04T14:19:34.201Z",
        "__v": 0
    },
    {
        "_id": "65e5d87aaa6276475799ad593",
        "user": "65e2424fb68842d8acff52a6",
        "title": "hi i am title",
        "description": "this is a description",
        "tag": "general",
        "date": "2024-03-04T14:19:38.457Z",
        "__v": 0
    },
    {
        "_id": "65e5d876a62276475799ad591",
        "user": "65e2424fb68842d8acff52a6",
        "title": "hi i am title",
        "description": "this is a description",
        "tag": "general",
        "date": "2024-03-04T14:19:34.201Z",
        "__v": 0
    },
    {
        "_id": "65e5d87aa62764475799ad593",
        "user": "65e2424fb68842d8acff52a6",
        "title": "hi i am title",
        "description": "this is a description",
        "tag": "general",
        "date": "2024-03-04T14:19:38.457Z",
        "__v": 0
    },
    {
        "_id": "65e5d876a62766475799ad591",
        "user": "65e2424fb68842d8acff52a6",
        "title": "hi i am title",
        "description": "this is a description",
        "tag": "general",
        "date": "2024-03-04T14:19:34.201Z",
        "__v": 0
    },
    {
        "_id": "65e5d887aa6276475799ad593",
        "user": "65e2424fb68842d8acff52a6",
        "title": "hi i am title",
        "description": "this is a description",
        "tag": "general",
        "date": "2024-03-04T14:19:38.457Z",
        "__v": 0
    },
]
    const [notes,setNotes]=useState(notesInitial)
    //add a note
    const  addNote=(title,description,tag)=>{
        const note={
            "_id": "65e5d87aa6276475799ad593",
            "user": "65e2424fb68842d8acff52a6",
            "title": title,
            "description":description,
            "tag": tag,
            "date": "2024-03-04T14:19:38.457Z",
            "__v": 0
        }

        setNotes(notes.concat(note))
    }
    //delete a note
    const  deleteNote=()=>{

    }
    //edit a note
    const  editNote=()=>{

    }





    return(

    <NoteContext.Provider value={{notes,setNotes,addNote,editNote,deleteNote}}>
        {props.children}
    </NoteContext.Provider>
    )
}

export default NoteState;
