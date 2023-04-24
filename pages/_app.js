import UserContext from '@/context/UserContext';
import { useState } from 'react';
import '@/styles/globals.css';

export default function App({ Component, pageProps }) {
  const [userId, setUserId] = useState("");

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}