import { createContext, useState } from "react";

const FirebaseContext = createContext(null)

export const authContext = createContext(null)

export function Context({children}){
  const [user,setUser] = useState(null)
  return(
    <authContext.Provider value={{user,setUser}}>
      {children}
    </authContext.Provider>
  )
}



export default FirebaseContext;