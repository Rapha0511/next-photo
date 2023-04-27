import React, { useContext, useEffect } from 'react'
import { auth,db,storage} from "../firebase"
import {signInWithRedirect, GoogleAuthProvider} from 'firebase/auth'
import {useAuthState} from 'react-firebase-hooks/auth'
import Router from 'next/router'
import UserContext from '@/context/UserContext'

export default function AuthButtonComponent({buttonState}) {
    const {userId,setUserId} = useContext(UserContext)
    const [user,setUser] = useAuthState(auth)
    const googleAuth = new GoogleAuthProvider()
    
    const login = async() => {
      const result = await signInWithRedirect(auth,googleAuth)
      console.log(result)
    }
  
    const signOut = async() => {
      auth.signOut()
    }

    useEffect(()=>{
        if(user){
            setUserId(user.uid)
            Router.push(`/${user.uid}/gallery`)
        } else {
            console.log("ntm")
            Router.push("/")
        }
    },[user])
  return (
    <div>
        <button onClick={buttonState == "login" ? login : signOut }>{buttonState == "login" ? "login" : "Logout" }</button>
    </div>
  )
}
