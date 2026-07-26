import React, { useState, useContext } from 'react'
import UserContext from '../context/UserContext'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
    
  const {setUser} = useContext(UserContext)

  const handleSubmit = (e) => {
    e.preventDefault()
    setUsername({username, password}) 
      
  }

  return (
    <div>
      <h2>Login</h2>
      <input type="text" value={username} onClick={(e) => setUsername(e.target.value)} placeholder='Username' />
      {" "}
      <input type="password" value={password} onClick={(e) => setPassword(e.target.value)} placeholder='Password'  />
      
      <button onClick={handleSubmit}>Submit</button>  
    </div>

  )
}

export default Login
