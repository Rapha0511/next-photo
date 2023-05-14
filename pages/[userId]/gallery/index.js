import {db} from "../../../firebase"
import { useContext, useEffect, useState } from "react"
import {onSnapshot} from "firebase/firestore"
import Image from "next/image"
import AuthButtonComponent from "@/components/AuthButtonComponent"
import UploadComponent from "@/components/UploadComponent";
import UserContext from "@/context/UserContext"
import Link from "next/link";
import DeleteButtonComponent from "@/components/DeleteButtonComponent";
import { collection } from "firebase/firestore"

export default function Gallery() {
    const [data,setData] = useState()
    const {userId, setUserId} = useContext(UserContext)
  
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
    <div className="Gallery">
      <AuthButtonComponent buttonState={'logout'} />
        <UploadComponent />
        {data && (
          <div className="gallerygrid">
            {data.map((image) => (
              <div key={image.id} className="imagewrapper">
                <Link href={`/${userId}/gallery/${image.id}`}>
                  <Image
                    src={image.imgUrl}
                    alt='Picture'
                    width={500}
                    height={500}
                    className="Image" 
                  />
                </Link>
                <DeleteButtonComponent image={image}/>
              </div>
            ))}
          </div>
        )}
    </div>
  );
}
