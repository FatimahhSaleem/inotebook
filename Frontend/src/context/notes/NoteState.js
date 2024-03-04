import React, { useState }  from 'react'
import NoteContext from './noteContext'

const NoteState = (props) => {
   const notesInitial=[
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
        "_id": "65e5d87aa6276475799ad593",
        "user": "65e2424fb68842d8acff52a6",
        "title": "hi i am title",
        "description": "this is a description",
        "tag": "general",
        "date": "2024-03-04T14:19:38.457Z",
        "__v": 0
    },
]
    const [notes,setNotes]=useState(notesInitial)
    return(
    <NoteContext.Provider value={{notes,setNotes}}>
        {props.children}
    </NoteContext.Provider>
    )
}

export default NoteState;
