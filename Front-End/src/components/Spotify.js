import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


const Spotify = () => {

  // // const [query, setQuery] = useState('')
  // const [artistData, updateArtistData] = useState([])


  // function getArtists(query) {
  //   console.log('hello')
  //   fetch(`https://api.spotify.com/v1/search?q=${query}&type=playlist`)
  //     .then(resp => resp.json())
  //     .then((data) => {
  //       updateArtistData(data)
  //       console.log(data)
  //     })
  // }



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

  return <div>hi</div>

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

export default Spotify 