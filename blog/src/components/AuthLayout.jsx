import React, {useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Protected({children, authentication = true}) {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector((state) => state.auth?.status)
    console.log(authStatus)

    useEffect(() => {
        if(authStatus === undefined) return;

        if(authentication !== authStatus){
            navigate("/login")
        } else if(!authentication !== authStatus){
            navigate("/")
        }
        
        setLoader(false)
    }, [authStatus, navigate, authentication])
  return loader ? <h1>Loading...</h1> : <>{children}</>
}

export default Protected