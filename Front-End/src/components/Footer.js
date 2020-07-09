import React from 'react'
import { withRouter } from 'react-router-dom'

const Footer = () => {

  return <>
    <footer>
      <small>All Rights Reserved <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer">TMDB</a> & <a href="https://www.spotify.com/uk/" target="_blank" rel="noopener noreferrer">Spotify</a></small>
      <div>
        <div>
          <small>Brought to you by
            <span className="by"> 🌜4kir4 x Lara x Shaikh x SilkenTofu🌛</span>
          </small>
        </div>
      </div>
    </footer>
  </>
}
export default withRouter(Footer)