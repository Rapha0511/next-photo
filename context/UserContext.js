import { createContext, useContext } from 'react';

export default createContext({
    userId:"",
    setUserId:(userid)=>{}
})