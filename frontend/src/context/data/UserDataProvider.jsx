import { createContext, useEffect, useState } from 'react'
export const UserContext = createContext()
function UserDataProvider(props) {
    const [user, setUser] = useState(null)
    useEffect(()=>{
      const defaultUser = sessionStorage.getItem("user");
      if(!defaultUser){
        return
      }
      setUser(JSON.parse(defaultUser))
    },[])
  return (
    <UserContext.Provider value={{user, setUser}}>
        {props.children}
    </UserContext.Provider>
  )
}

export default UserDataProvider