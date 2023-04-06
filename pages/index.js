import { auth,db,storage } from "./firebase"
import {signInWithRedirect, GoogleAuthProvider} from 'firebase/auth'
import {useAuthState} from 'react-firebase-hooks/auth'
import { useEffect, useState } from "react"
import {doc,setDoc,addDoc,collection,runTransaction,arr, updateDoc, arrayUnion} from "firebase/firestore"
import { getStorage, ref , uploadBytes} from "firebase/storage";


export default function Home() {

  //auth
  const [user,setUser] = useAuthState(auth)
  const googleAuth = new GoogleAuthProvider()
  const login = async() => {
    const result = await signInWithRedirect(auth,googleAuth)
    console.log(result)
  }

  const signOut = async() => {
    auth.signOut()
  }
  

  const insertData = async () => {
    // await setDoc(doc(db,`usersImages/${user.uid}`),{
    //   userId : user.uid,
    //   userImage: "http://www.google.fr"
    // })
    try {
      await runTransaction(db, async (transaction) => {
        const docRef = doc(db, 'usersImages', user.uid);
        await setDoc(docRef, {
          images: arrayUnion({
            a: user.uid,
            e: "yo"
          })
        }, { merge: true });
      });
    } catch (err) {
      console.log(err);
    }
    // const imagesRef = doc(db, 'usersImages', user.uid);
    // setDoc(imagesRef, {images:[{e : user.uid, a : "http://mp.Fr"}]}),{merge:true};
  }

  function saveUrlInDb(){
    var document =  doc(db,"usersImages")
  }
  const handleFile = (e) => {
    // const reader = new FileReader();
    let files = e.target.files;
    // reader.readAsDataURL(files[0]);
    // const metaData ={
    //   contentType: files[0].type
    // }
    let fileToUpload = files[0]
    const storageRef = ref(storage,`${user.uid}/${fileToUpload.name}`);
    uploadBytes(storageRef,files[0]).then((snapshot)=>{
      console.log('uploaded',snapshot)
    })
  }



  useEffect(()=>{
    console.log(user)
  },[user])

  return (
    <div className='Home'>
      <h1>Hello</h1>
      <button onClick={login}>Login</button>
      { user && (
        <div>
          <button onClick={signOut}>HEY NTPMLDKZKFEZODFKZEOFJEZPFJEZ</button>
          <input type="file" id="input" multiple onChange={handleFile}/>
          <button onClick={insertData}>insert test</button>
        </div>
      )}
    </div>
  )
}
