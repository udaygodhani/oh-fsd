import React, { useContext, useEffect } from 'react'
import { UserContext } from '../context/data/UserDataProvider';
import { Navigate, useNavigate } from 'react-router-dom';

function UserSecure(props) {
    const {user} = useContext(UserContext)
    
  if(!user){
    return (
      <>
        {props.children}
      </>
    )
  }else{
    <Navigate to={'/'}/>
  }
}

export default UserSecure