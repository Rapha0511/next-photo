import React, { useContext, useEffect, useState } from 'react'
import { db } from '@/firebase';
import { collection, query, where,getDoc,doc,getDocs,onSnapshot } from "firebase/firestore";
import UserContext from "@/context/UserContext"
import {useRouter} from 'next/router';
import Link from 'next/link';
import Image from 'next/image';

export default  function Photo() {
    const router = useRouter()
    const [url,setUrl] = useState("")
    const {userId,setUserId} = useContext(UserContext);

    const getImages = async () => {
      if (userId && router.query) {
      //   //pointeur vers la subCollection
        const imageDocSnap = await doc(db, 'usersImages', userId, 'images', router.query.photo);
        
        return onSnapshot(imageDocSnap, (doc) => {
          if(doc.exists()){
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
    <div className='Photo'>
        <div className='container'>
          <Link className='back-link' href={`/${userId}/gallery`}>Close</Link>  
          <br></br>
          <br></br>
          {
            url && (
              <div className='image-wrapper'> 
                <Image
                  src={url}
                  alt="Picture"
                  width={700}
                  height={700}
              />
              </div>
            )      
          }    
        </div>        
    </div>
  )
}