import React, { useContext, useEffect, useState } from 'react'
import { db } from '@/firebase';
import { collection, query, where,getDoc,doc,getDocs,onSnapshot } from "firebase/firestore";
import UserContext from "@/context/UserContext"
import {useRouter} from 'next/router';
import Link from 'next/link';
import Image from 'next/image';

export default  function photo() {
    const router = useRouter()
    const [url,setUrl] = useState("")
    const {userId,setUserId} = useContext(UserContext);

    // const getImages = async () =>{
    //   if(userId && router.query){  
    //       console.log(router.query)
    //       const docRef = doc(db, 'usersImages', userId);
    //       const docSnap = await getDoc(docRef);
    
    //       if (docSnap.exists()) {
    //         const image = await docSnap.data().images.find(image => image.id === router.query.photo)
    //         console.log(image.imgUrl)
    //         setUrl(image.imgUrl)
    //       } else {
    //         // docSnap.data() will be undefined in this case
    //         console.log("No such document!");
    //       } 
        
    //   }
    // }

    const getImages = async () => {
      if (userId && router.query) {
      //   //pointeur vers la subCollection
        const imageDocSnap = await doc(db, 'usersImages', userId, 'images', router.query.photo);
      //   if (imageDocSnap.exists()) {
      //     const data = imageDocSnap.data()
      //     setUrl(data.imgUrl);
      //   } else {
      //     console.log("No such document!");
      //   }
      return onSnapshot(imageDocSnap, (doc) => {
        if(doc.data() !== undefined){
          setUrl(doc.data().imgUrl);
          console.log(doc.data())
        }
      });
      }
    };

    useEffect(() => {
      getImages();
    }, [userId]);

  return (
    <div>
      <Link href={`/${userId}/gallery`}>ICI</Link>  
      <br></br>
      <br></br>
      {
        url && (
          <Image
            src={url}
            alt="Picture"
            width={800}
            height={800}
        />
        )      
      }            
    </div>
  )
}