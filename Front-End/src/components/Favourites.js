import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../UserContext'
import axios from 'axios'
import Auth from '../lib/auth'


const Favourites = () => {
  const [movieData, setMovieData] = useState([])
  // const [info, setInfo] = useState({})
  const { userInfo, setUserInfo } = useContext(UserContext)

  // { console.log(userInfo) }

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

  //! Checking the value of the button matches the filmId

  const deleteFavourite = (event) => {
    const filmId = event.target.value
    // console.log(filmId)
    axios.delete(`/api/favourites/${filmId}`, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => {
        setUserInfo(res.data)
      })
      .catch(error => console.log(error))
  }

  return <>
    <h1>Hello</h1>
    {/* //! first time page loads, user info undefined - so need to make sure it exists. */}
    <div>{userInfo && userInfo.favouriteMovies.map((movie, index) => {
      // console.log(userInfo)
      return <div key={index}>
        <h1>{movie.title}</h1>
        <Link to={`/movie/${movie.title}/${movie.filmId}`}> <img src={movie.poster} />
        </Link>
        <div className="btn-delete">
          <button className="deleteButton" value={movie.filmId} onClick={deleteFavourite}>Delete</button>
        </div>

      </div>
    })}
    </div>
  </>


}

export default Favourites