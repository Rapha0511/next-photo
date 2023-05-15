import React, { useContext } from 'react'
import {storage,db} from "../firebase"
import {doc, deleteDoc} from "firebase/firestore"
import { ref ,deleteObject} from "firebase/storage";
import UserContext from '@/context/UserContext';

export default function DeleteButtonComponent({image}) {

    const {userId,setUserId} = useContext(UserContext)
    const deleteImage = async (image) => {
        try{
          const imageRef = ref(storage,`${userId}/${image.imgName}`)
          await deleteObject(imageRef)
          await deleteDoc(doc(db, 'usersImages', userId, "images", image.id))
        }catch(err){
          console.log(err)
        }
      } 

  return (
    <div className='DeleteButtonComponent'>
        <button onClick={()=>deleteImage(image)}>X</button>
    </div>
  )
}
