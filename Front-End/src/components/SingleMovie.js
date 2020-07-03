import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
import axios from 'axios'

const SingleMovie = (props) => {

  const [soundtrackData, updateSoundtrackData] = useState([])

  useEffect(() => {
    const movieName = props.match.params.name

    axios.get(`https://api.spotify.com/v1/search?q=${movieName}soundtrack&type=playlist`,
      {
        headers: { 'Authorization': 'Bearer BQBR0qhn6sHg9wNgAagQHgmcPoja20s6y5xV6SgGXQqtow9ifNI4A8i0eLRXcsfymqKFBjRkEE9W7kPmXr8' }
      })
      .then(axiosResp => {
        console.log(axiosResp.data.playlists.items[0].id)
        updateSoundtrackData(axiosResp.data.playlists.items[0].id)
      })
  }, [])

  return <section>
    <div>
      <iframe src={`https://open.spotify.com/embed/playlist/${soundtrackData}`} width="300" height="380" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
    </div>
  </section>





}

export default SingleMovie