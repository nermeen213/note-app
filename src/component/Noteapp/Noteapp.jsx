import { useContext } from "react";
import style from "./Noteapp.module.css";

import { NoteContext } from "../Context/NoteContext.jsx";
import { UserContext } from "../Context/userContext.jsx";

import getUserNote, { showDeleteModul, showUpdateModul } from '../../utils/Note.js'


export default function Noteapp({ noteobj  }) {
  const { Token } = useContext(UserContext);
  const { setNote } = useContext(NoteContext);

  return (
    <>
   
    <div className={`${style.note}   shadow my-3`}>
        <div className="note-body p-3 my-3">
          <h2 className="h4 fw-semibold m-0 font-Montserrat " >
          <i className="fa-solid fa-thumbtack icon mx-2"></i>{noteobj.title}
          </h2>
          <p className={`mb-0 mt-2`}>{noteobj.content}</p>
        </div>

        <div className="note-footer">
          <i
            className="fa-solid fa-pen-to-square pointer icon me-3"
            onClick={()=>
              showUpdateModul({ 
                prevTitle:noteobj.title ,
                 prevContent:noteobj.content ,
                  noteId:noteobj._id ,
                  Token ,
                  updater:setNote
                })
            }
            
          ></i>

          <i
            className="fa-solid fa-trash icon "
            onClick={()=>
              showDeleteModul({noteId:noteobj._id ,Token ,updater:setNote})
            }

           
          ></i>
        </div>
      </div>
   
     
    </>
  );
}
