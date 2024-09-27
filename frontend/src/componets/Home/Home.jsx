import React, { useEffect } from 'react'
import {useAuth0} from "@auth0/auth0-react"

const Home = () => {
  const {user, isLoading, isAuthenticated} = useAuth0()
  useEffect(()=>{
    if(isAuthenticated){
      const userdetails = {username:user.name, email:user.email}; 
      fetch(`${import.meta.env.VITE_APIURL}/auth/second/signin`, {
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(userdetails),
        credentials:'include'
      }).then((response)=>response.json())
      .then((response)=>{
        if(response.status==200){
          console.log(response)
        }
      })
    }
  }, [isLoading])

  return (
    <div>Home</div>
  )
}

export default Home