import {db,storage} from "../../../firebase"
import { useContext, useEffect, useState } from "react"
import {doc,setDoc,runTransaction, arrayUnion, collection, getDocs, onSnapshot, updateDoc, arrayRemove} from "firebase/firestore"
import { ref , uploadBytesResumable,getDownloadURL, deleteObject} from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import Image from "next/image"
import AuthButtonComponent from "@/components/AuthButtonComponent"
import UserContext from "@/context/UserContext"
import Link from "next/link";

export default function index() {

    const [data,setData] = useState()
    const {userId, setUserId} = useContext(UserContext)
    const USER_IMG_DOC = userId  ? doc(db, 'usersImages', userId) : null
    const insertData = async (imgUrl,imgName) => {
      try {
        await runTransaction(db, async (transaction) => {
          //emplacement collection
          const collectionRef = collection(db, "usersImages");
          //retournes les documents
          const querySnapshot = await getDocs(collectionRef);
          // si il sont vide, la collection n'existe pas (une collection a forcement un document a l'initialisation)
          if (!querySnapshot.empty) {
            await setDoc(USER_IMG_DOC, {
              images: arrayUnion({ 
                id: uuidv4(),
                imgName,
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
  
    const handleFile = async (e) => {
      //transforme en array  pour pouvoir upload plusier fichier
      let files = Array.from(e.target.files);
      files.forEach(file =>{
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
          //TODO faire avec await 
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          insertData(url,imgName)
        })
      })
    }
  
    const getImages = () => {
      return onSnapshot(USER_IMG_DOC, (doc) => {
        if (doc.data() !== undefined){
          setData(doc.data().images)
        }
      });  
    }
  
    const deleteImage = async (image) => {
      try{
        const imageRef = ref(storage,`${userId}/${image.imgName}`)
        await deleteObject(imageRef)
        await updateDoc(USER_IMG_DOC,{
          images: arrayRemove(image)
        })
      }catch(err){
        console.log(err)
      }
    } 

    useEffect(()=>{
      if(userId){
      // real time update de la bd c'est pas mal
        getImages()
      }
  },[db,userId])

  return (
    <div className='Home'>
      <h1>Hello</h1>
      <AuthButtonComponent buttonState={"logout"}/>
        <div>
          <input type="file" id="input" multiple onChange={handleFile}/>
          {data && (
            data.map(image =>(
              <div>
                <button onClick={()=>deleteImage(image)}>{image.id}</button>
                {console.log(image.imgUrl)}
                <Link href={`/${userId}/gallery/${image.id}`}>
                <Image
                key={image.id}
                src={image.imgUrl}
                alt="Picture"
                width={500}
                height={500}
              />
              </Link>
              </div>
            ))
          )}
        </div>
    </div>
  )
}
