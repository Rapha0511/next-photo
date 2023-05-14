import React from 'react'
import {db,storage} from "../firebase"
import { useContext, useEffect, useState } from "react"
import {doc,setDoc,runTransaction, arrayUnion, collection, getDocs,getDoc,updateDoc} from "firebase/firestore"
import { ref , uploadBytesResumable,getDownloadURL} from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import UserContext from "@/context/UserContext"
export default function UploadComponent() {

    const {userId,setUserId} = useContext(UserContext)
    const USER_IMG_DOC = userId  ? doc(db, 'usersImages', userId) : null

    const getFileExtension = (file) => {
      let ext = file.name.split('.');
      console.log(ext[ext.length - 1])
      return ext[ext.length - 1]
    }

    const insertData = async (imgUrl, imgName) => {
        try {
          const imgId = uuidv4();
          const imgDocRef = doc(db, 'usersImages', userId, 'images', imgId);
          await setDoc(imgDocRef, {
            id: imgId,
            imgName,
            imgUrl,
          });
        } catch (err) {
          console.log(err);
        }
      };
    /**
     * 
     * @param {event} 
     * main function to upload the file in Firebase Storage and insert the url in firebase firestore
     */
    const handleFile = async (e) => {
      //transforme en array  pour pouvoir upload plusier fichier
      let files = Array.from(e.target.files);
      if(files.length){
        files.forEach(file =>{
          const acceptedExtensions = ["png", "jpg", "jpeg"];
          const imgExtension = getFileExtension(file)

          if(acceptedExtensions.includes(imgExtension)){
            const imgName = file.name + uuidv4()
            const imgRef = ref(storage,`${userId}/${imgName}`);
            const uploadTask = uploadBytesResumable(imgRef,file);
            uploadTask.on("state-changed",(snapshot)=>{
              console.log("upload", snapshot)
            },
      
            (error)=>{
              console.log("not uploaded", error)
            },
            async ()=>{
              const url = await getDownloadURL(uploadTask.snapshot.ref);
              insertData(url,imgName)
            })
          }else{
            console.error("Format non supporté")
          }
        })
      }
    }
  
  return (
    <div className='UploadComponent'>
        <input type="file" id="input" accept=".jpg,.jpeg,.png" multiple onChange={handleFile}/>
    </div>
  )
}
