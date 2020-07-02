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




  // function handleChange(event) {
  //   console.log(event.target.value)
  //   setQuery(event.target.value)
  // }

  // function handleSubmit(event) {
  //   setQuery(event.target.value)
  //   console.log('this is the query ' + query)
  //   getArtists(query)
  //   setQuery('')
  // }

  // return <div>hi</div>

  // return <main className="trackList">

  // <section className='search'>
  //   <h1> Songify </h1>
  //   <div>
  //     <form onSubmit={handleSubmit} className='form'>
  //       <input type="text" value={query} placeholder="Search" onChange={handleChange} className='input'>
  //       </input>
  //       <button type="submit" className='button'>Search 🔍</button>
  //     </form>
  //   </div>

  //     {artistData.map((album, index) => {

  //       return <div key={index}>
  //         {/* 1) We create a link that has the cheese ID in it for each cheese */}
  //         <Link to={`/search/${album.id}`}>
  //                 <img src={album.cover} alt={album.title} />
  //         </Link>
  //       </div>
  //     })}

  // </main>

  // }

}

export default SingleMovie