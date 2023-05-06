import {db,storage} from "../../../firebase"
import { useContext, useEffect, useState } from "react"
import {doc, onSnapshot} from "firebase/firestore"
import Image from "next/image"
import AuthButtonComponent from "@/components/AuthButtonComponent"
import UploadComponent from "@/components/UploadComponent";
import UserContext from "@/context/UserContext"
import Link from "next/link";
import DeleteButtonComponent from "@/components/DeleteButtonComponent";
import { collection } from "firebase/firestore"

export default function index() {

    const [data,setData] = useState()
    const {userId, setUserId} = useContext(UserContext)
    const USER_IMG_DOC = userId  ? doc(db, 'usersImages', userId) : null

  
    // const getImages = () => {
    //   return onSnapshot(USER_IMG_DOC, (doc) => {
    //     if (doc.data() !== undefined){
    //       // setData(Object.values(doc.data().images))
    //       const images = doc.data();
    //       setData(Object.values(images))
    //     }
    //   });  
    // }
    const getImages = () => {
      //pointeur vers la subcollection
      const imagesCollectionRef = collection(db, 'usersImages', userId, 'images');
      //reatime update
      return onSnapshot(imagesCollectionRef, (querySnapshot) => {
        console.log(querySnapshot)
        const imagesData = [];
        querySnapshot.forEach((doc) => {
          imagesData.push(doc.data());
        });
        setData(imagesData);
      });
    };
  

    useEffect(()=>{
      if(userId){
      // real time update de la bd c'est pas mal
        getImages()
      }
  },[userId])

  return (
    <div className='Home'>
      <h1>Hello</h1>
      <AuthButtonComponent buttonState={"logout"}/>
        <div>
          <UploadComponent/>
          {data && (
            data.map(image =>(
              <div>
                <Link href={`/${userId}/gallery/${image.id}`}>
                <Image
                  key={image.id}
                  src={image.imgUrl}
                  alt="Picture"
                  width={500}
                  height={500}
              />
              </Link>
              <DeleteButtonComponent image={image}/>
              </div>
            ))
          )}
        </div>
    </div>
  )
}
