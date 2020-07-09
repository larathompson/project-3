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

  return <section className="favouritesPage">
    <h1 className="favouritePageTitle">FAVOURITES</h1>
    {/* //! first time page loads, user info undefined - so need to make sure it exists. */}
    <div className="favouriteCardContainer">{userInfo && userInfo.favouriteMovies.map((movie, index) => {
      return <div key={index} className="flower_box">
        {/* <div className="flower_box"> */}
        <Link to={`/movie/${movie.title}/${movie.filmId}`}> <img className="favouriteImage" src={movie.poster} />
        </Link>
        <div className="text">
          <h1 className="favouriteMovieTitle">{movie.title}</h1>
          <p>{movie.reason}reason here</p>
          <button className="favouriteDeleteButton" value={movie.filmId} onClick={deleteFavourite}>Delete</button>
        </div>
      </div>
      // </div>
    })}
    </div>
  </section>


}

export default Favourites