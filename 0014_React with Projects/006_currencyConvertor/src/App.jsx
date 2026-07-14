import { useState } from 'react'

import './App.css'

function App() {
  const [amount, setAmount] = useState(0)
  const [from, setFrom] = useState('usd')
  const [to, setTo] = useState('inr')
  const [convertedAmount, setConvertedAmount] = useState(0)

  return (
    <div className='w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat' style={{backgroundImage: `url(https://images.pexels.com/photos/7114280/pexels-photo-7114280.jpeg)`}}>
      <h1 className='bg-red-200'>Text For tailwind</h1>
    </div>
  )
}

export default App
