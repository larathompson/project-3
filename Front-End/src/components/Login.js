import React, { useState, useContext } from 'react'
import axios from 'axios'
import { login } from '../lib/auth'
import { UserContext } from '../UserContext'


const Login = (props) => {
  
  const { user, setUser } = useState()
  const [formData, updateFormData] = useState({
    email: '',
    password: ''
  })
  const { setUserInfo } = useContext(UserContext)
  
  function handleChange(event) {
    const name = event.target.name
    const data = {
      ...formData,
      [name]: event.target.value
    }
    updateFormData(data)
  }

  function handleSubmit(event) {
    event.preventDefault()
    axios.post('/api/login', formData)
      .then(resp => {
        // localStorage.setItem saves a key and value
        // to the browser
        login(resp.data.token)
        console.log(resp.data.user)
        setUserInfo(resp.data.user)
        props.history.push('/')
      })
      .catch(err => console.log(err.response) )
  }

  return <form className="form" onSubmit={handleSubmit}>
    <div className="container">
      <div className="field">
        <label className="label">Email</label>
        <div className="control">
          <input
            name="email"
            className="input"
            onChange={handleChange}
            type="text"
            placeholder="Text input"
            value={formData.email}
          />
        </div>
      </div>
    </div>
    <div className="container">
      <div className="field">
        <label className="label">Password</label>
        <div className="control">
          <input
            name="password"
            className="input"
            onChange={handleChange}
            type="text"
            placeholder="Text input"
            value={formData.password}
          />
        </div>
      </div>
    </div>
    <div className="container">
      <button className="button is-primary">Submit</button>
    </div>
  </form>

}

export default Login