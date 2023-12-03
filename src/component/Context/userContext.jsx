import React, { useEffect, useState } from 'react'
import { createContext } from 'react'

export let UserContext=createContext();

export default function UserTokenProvider(props) {
   
    const [Token, setToken] = useState(localStorage.getItem('userToken'))
    useEffect(()=>{
        setToken(localStorage.getItem('userToken'));
        console.log(Token);
    },[])

    return (
       <>
      <UserContext.Provider value={{setToken,Token}}>
      {props.children}
      </UserContext.Provider>
       </>
    )
}
