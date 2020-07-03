import React, { useState } from 'react'
import axios from 'axios'


const Register = (props) => {

  const [formData, updateFormData] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  })

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

    axios.post('/api/register', formData)
      .then(data => {
        props.history.push('/login')
      })
  }

  return <form className="form" onSubmit={handleSubmit}>
    <label className="label">Username</label>
    <input
      name="username"
      onChange={handleChange}
      className="input"
      type="text"
      placeholder="Text input"
      value={formData.username}
    />
    <label className="label">Email</label>
    <input
      name="email"
      className="input"
      onChange={handleChange}
      type="text"
      placeholder="Text input"
      value={formData.email}
    />

    <label className="label">Password</label>
    <input
      name="password"
      className="input"
      onChange={handleChange}
      type="text"
      placeholder="Text input"
      value={formData.password}
    />

    <label className="label">Confirm password</label>
    <input
      name="passwordConfirmation"
      className="input"
      onChange={handleChange}
      type="text"
      placeholder="Text input"
      value={formData.passwordConfirmation}
    />
    <button className="button is-primary">Submit</button>
  </form>


}

export default Register