import React, { useContext, useEffect } from 'react'
import { auth,db,storage} from "../firebase"
import {signInWithRedirect, GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
import {useAuthState} from 'react-firebase-hooks/auth'
import Router from 'next/router'
import UserContext from '@/context/UserContext'

export default function AuthButtonComponent({buttonState}) {
    const {userId,setUserId} = useContext(UserContext)
    const [user,setUser] = useAuthState(auth)
    const googleAuth = new GoogleAuthProvider()
    googleAuth.setCustomParameters({ prompt: 'select_account' })

    const login = async() => {
      try{
        const result = await signInWithPopup(auth,googleAuth)
      }catch(err){
        console.error(err)
      }
    }
  
    const signOut = async() => {
      auth.signOut()
    }

    useEffect(()=>{
        if(user){
            setUserId(user.uid)
            Router.push(`/${user.uid}/gallery`)
        } else {
            Router.push("/")
        }
    },[user])
  return (
    <div className='AuthButtonComponent'>
        <button onClick={buttonState == "login" ? login : signOut }>{buttonState == "login" ? "Login With Google" : "Logout" }</button>
    </div>
  )
}
