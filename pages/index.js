'use client'
import { auth,db,storage} from "./firebase"
import {signInWithRedirect, GoogleAuthProvider} from 'firebase/auth'
import {useAuthState} from 'react-firebase-hooks/auth'
import { useEffect, useState } from "react"
import {doc,setDoc,runTransaction, arrayUnion, collection, getDocs, onSnapshot} from "firebase/firestore"
import { ref , uploadBytesResumable,getDownloadURL} from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import Image from "next/image"

export default function Home() {

  const [data,setData] = useState()
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

  const insertData = async (imgUrl) => {
    try {
      await runTransaction(db, async (transaction) => {
        //emplacement collection
        const collectionRef = collection(db, "usersImages");
        //retournes les documents
        const querySnapshot = await getDocs(collectionRef);
        // si il sont vide, la collection n'existe pas (une collection a forcement un document a l'initialisation)
        if (!querySnapshot.empty) {
          const docRef = doc(db, 'usersImages', user.uid);
          await setDoc(docRef, {
            images: arrayUnion({ 
              id: uuidv4(),
              imgUrl,
            })
          }, { merge: true });
        } else {
          console.log("Collection does not exist.");
        }
      });
    } catch (err) {
      console.log(err);
    }
  }

  //TODO prendre en charge la séléction multiple de fichier
  const handleFile = async (e) => {
    //transforme en array  pour pouvoir upload plusier fichier
    let files = Array.from(e.target.files);

    files.forEach(file =>{
      console.log(file)
      const imgRef = ref(storage,`${user.uid}/${file.name}`);
      const uploadTask = uploadBytesResumable(imgRef,file);
      uploadTask.on("state-changed",(snapshot)=>{
        console.log("upload", snapshot)
      },

      (error)=>{
        console.log("not uploaded", error)
      },
      ()=>{
        //TODO faire avec await 
        getDownloadURL(uploadTask.snapshot.ref).then((url)=>{
           insertData(url)
        })
      })
    })
  }



  useEffect(()=>{
    console.log(user)
    console.log(uuidv4());
    if(user){
      // real time update de la bd c'est pas mal
      onSnapshot(doc(db, 'usersImages', user.uid), (doc) => {
        setData(doc.data().images)
      });      
    }

  },[user])

  return (
    <div className='Home'>
      <h1>Hello</h1>
      { user ? (
        <div>
          <button onClick={signOut}>HEY NTPMLDKZKFEZODFKZEOFJEZPFJEZ</button>
          <input type="file" id="input" multiple onChange={handleFile}/>

          {data && (
            data.map(image =>(
              <Image
              key={image.id}
              src={image.imgUrl}
              alt="Picture"
              width={500}
              height={500}
            />
            ))
          )}
        </div>
      ) :
        <button onClick={login}>Login</button>
      }
    </div>
  )
}
