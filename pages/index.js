import AuthButtonComponent from "@/components/AuthButtonComponent";
import { useEffect, useState } from "react";


export default function Home() {
  const [time,setTime] = useState("")

  function getTime(){
    var today = new Date();
    var current = today.toLocaleTimeString()
    setTime(current)
  }

  useEffect(()=>{
    setTimeout(()=>{
      getTime()
    },1000)
  },[time])

  return (
    <div className="home">
      <div className="content">
        <div className="center">
          <h2 className="title">NextGallery</h2>
          <AuthButtonComponent buttonState="login" />
        </div>
        <p className="time">{time}</p>
      </div>
    </div>
  );
}
