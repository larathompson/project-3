import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../UserContext'
import axios from 'axios'
import Auth from '../lib/auth'


const Favourites = () => {
  const [movieData, setMovieData] = useState([])
  // const [info, setInfo] = useState({})

  const { userInfo, setUserInfo } = useContext(UserContext)
  { console.log(userInfo) }

  useEffect(() => {
    axios.get('/api/profile', {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => {
        const newData = res.data
        setMovieData(newData)
      })
      .catch(error => console.log(error))
  }, [userInfo])


  return <>
    <h1>Hello</h1>
    {movieData.userInfo && <h2>
      Welcome, {movieData.userInfo.username}!
    </h2>}
    {/* //! first time load page user info undefined, so need to make sure it exists. */}
    <p>{userInfo && userInfo.favouriteMovies.map((movie, index) => {
      return <div key={index}>
        <h1>{movie.title}</h1>
      </div>
    })}
    </p>
  </>


}

export default Favourites