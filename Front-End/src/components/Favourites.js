import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../UserContext'
import axios from 'axios'
import Auth from '../lib/auth'


const Favourites = () => {
  const [movieData, setMovieData] = useState([])
  const [info, setInfo] = useState({})

  const { user, setUser } = useContext(UserContext)

  useEffect(() => {
    axios.get('/api/profile', {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => {
        const newData = res.data
        setMovieData(newData)
        if (user) {
          setInfo(userInfo)
        }
      })
      .catch(error => console.log(error))
  }, [user])


  return <>
    <h1>Hello</h1>
    {movieData.user && <h2>
      Welcome, {movieData.user.username}!
    </h2>}
  </>


}



export default Favourites