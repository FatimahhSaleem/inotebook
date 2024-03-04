import React, { useState } from 'react'
import NoteContext from './noteContext'

const NoteState = (props) => {
   const stateInitial={
        "name":"harry",
        "class": "5b"
    }
    const [state,setState]=useState(stateInitial)
    const update=()=>{
        setTimeout(()=>{
            setState({
                "name":"larry",
                "class":"10b"
            })
        },1000)
    }
    
    return(
    <NoteContext.Provider value={{state,update}}>
        {props.children}
    </NoteContext.Provider>
    )
}

export default NoteState
