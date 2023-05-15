import React from 'react'
import {db,storage} from "../firebase"
import { useContext, useEffect, useState } from "react"
import {doc,setDoc,runTransaction, arrayUnion, collection, getDocs,getDoc,updateDoc} from "firebase/firestore"
import { ref , uploadBytesResumable,getDownloadURL} from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import UserContext from "@/context/UserContext"
import styles from "../styles/uploadButton.module.css"
import logo from '../public/cloud.png'
import Image from 'next/image';

export default function UploadComponent({setProgress}) {

    const {userId,setUserId} = useContext(UserContext)

    const getFileExtension = (file) => {
      let ext = file.name.split('.');
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
     * main function to upload the file in Firebase Storage and insert the url in firebase firestore
     * @param {Event} 
     */
    const handleFile = async (e) => {
      //transforme en array  pour pouvoir upload plusier fichier
      let files = Array.from(e.target.files);
      if(files.length){
        files.forEach(file =>{
          const acceptedExtensions = ["png", "jpg", "jpeg","svg","gif"];
          const imgExtension = getFileExtension(file)

          if(acceptedExtensions.includes(imgExtension)){
            const imgName = file.name + uuidv4()
            const imgRef = ref(storage,`${userId}/${imgName}`);
            const uploadTask = uploadBytesResumable(imgRef,file);
            uploadTask.on("state-changed",(snapshot)=>{
              setProgress(Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100))
              e.target.value = ""
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
        <div className={styles.file}>
          <label htmlFor='input-file'>
            <Image src={logo} width={30} height={30} alt='logo'/>
            Select a file
          </label>
          <input type="file" id="input-file" accept=".jpg,.jpeg,.png,.webp,.svg,.gif" multiple onChange={handleFile}/>
        </div>
    </div>
  )
}
