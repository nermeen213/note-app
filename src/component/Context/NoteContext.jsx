import axios from "axios";
import { createContext, useState } from "react";


export let NoteContext =createContext();


export default function NoteContextProvider(props){
    const [Note, setNote] = useState(null)
    return <NoteContext.Provider value={{Note, setNote}}>
        {props.children}
    </NoteContext.Provider>

}