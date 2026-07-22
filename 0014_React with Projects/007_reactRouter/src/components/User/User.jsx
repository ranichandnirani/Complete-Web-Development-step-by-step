import React from 'react'
import { useParams } from 'react-router-dom'

function User() {
  const {userid} = useParams()
    return (
    <div className='bg-orange-400 text-center text-3xl py-5'>User: {userid}</div>
  )
}

export default User
