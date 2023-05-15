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
import ProgressComponent from "@/components/ProgressComponent"

export default function Gallery() {
    const [progress,setProgress] = useState()
    const [data,setData] = useState()
    const {userId, setUserId} = useContext(UserContext)
  
    const getImages = () => {
      //pointeur vers la subcollection
      const imagesCollectionRef = collection(db, 'usersImages', userId, 'images');
      //reatime update
      return onSnapshot(imagesCollectionRef, (querySnapshot) => {
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
      <div className="buttons">
        <UploadComponent setProgress={setProgress}/>
        <h2>Bienvenue dans votre galerie d'images</h2>
        <AuthButtonComponent buttonState={'logout'} />
      </div>
      {data?.length === 0 &&(
        <div className="start">
          <h1>Commencez a Uploader vos images !</h1>
        </div>
      )}
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
        {progress && progress < 100 && (
          <ProgressComponent progress={progress}/>
        )}
    </div>
  );
}
