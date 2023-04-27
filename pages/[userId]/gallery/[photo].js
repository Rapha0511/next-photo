import React, { useContext, useState } from 'react'
import { db } from '@/firebase';
import { collection, query, where,getDoc,doc,getDocs } from "firebase/firestore";
import UserContext from "@/context/UserContext"
import {useRouter} from 'next/router';
import Link from 'next/link';
import Image from 'next/image';

export default  function photo() {
    const router = useRouter()
    const [url,setUrl] = useState("")
    const {userId,setUserId} = useContext(UserContext);

    const getImages = async () =>{
      if(userId && router.query){  
          console.log(router.query)
          const docRef = doc(db, 'usersImages', userId);
          const docSnap = await getDoc(docRef);
    
          if (docSnap.exists()) {
            const image = await docSnap.data().images.find(image => image.id === router.query.photo)
            console.log(image.imgUrl)
            setUrl(image.imgUrl)
          } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
          } 
        
      }
    }

    useState(()=>{
      getImages()
    },[getImages()])
  return (
    <div>
      <Link href={`/${userId}/gallery`}>ICI</Link>  
      <br></br>
      <br></br>
      <Image
        src={url}
        alt="Picture"
        width={800}
        height={800}
      />      
      hello
      
    </div>
  )
}