import UserContext from '@/context/UserContext';
import { useEffect, useState } from 'react';
import { auth } from '@/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function App({ Component, pageProps }) {
  const [userId, setUserId] = useState(null);
  const [user] = useAuthState(auth);

  useEffect(()=>{
    if (user) {
      // set userId context value if user is authenticated
      setUserId(user.uid);
    }
  },[user])


  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}