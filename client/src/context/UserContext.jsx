import React, { createContext, useContext, useState } from 'react'

const UserCon = createContext();

function UserContext({children}) {
    const [userInfo, setUserInfo] = useState(null);
    
  return (
    <UserCon.Provider value={{userInfo, setUserInfo}}>
        {children}
    </UserCon.Provider>
  )
}

const useUserContext = () => {
    return useContext(UserCon);
}

export { UserContext, useUserContext};