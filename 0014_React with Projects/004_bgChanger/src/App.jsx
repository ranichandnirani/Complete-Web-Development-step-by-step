import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
import './App.css'

function App() {
  // const [count, setCount] = useState(0)
  const [color, setColor] = useState('olive')
  // function changeColor(color) {
  //   setColor(color)
  // }

  return (
    <div className='w-full h-screen duration-200' style={{ backgroundColor: color}}>

      <div className="py-12 text-center">
        <h1 className="text-4xl font-bold text-white drop-shadow-md">
           Background Changer
        </h1>
        <p className="text-white/80 mt-5 text-lg drop-shadow">
          Click a color to change the background
        </p>
      </div>

      <div className='fixed flex flex-wrap justify-center bottom-12 inset-x-0 px-2'>
        <div className='flex flex-wrap justify-center gap-3 shadow-lg bg-white px-3 py-2 rounded-3xl'>
          <button onClick={()=> setColor('plum')} className='outline-none px-4 py-1 rounded-full text-white shadow-lg' style={{backgroundColor: 'plum'}}>Plum</button>
          <button onClick={() => setColor('powderblue')} className='outline-none px-4 py-1 rounded-full text-white shadow-lg' style={{backgroundColor: 'powderblue'}}>Powderblue</button>
          <button onClick={() => setColor('palegreen')} className='outline-none px-4 py-1 rounded-full text-white shadow-lg' style={{backgroundColor: 'palegreen'}}>Palegreen</button>
          <button onClick={() => setColor('lightpink')} className='outline-none px-4 py-1 rounded-full text-white shadow-lg' style={{backgroundColor: 'lightpink'}}>Lightpink</button>
          <button onClick={() => setColor('lightskyblue')} className='outline-none px-4 py-1 rounded-full text-white shadow-lg' style={{backgroundColor: 'lightskyblue'}}>Lightskyblue</button>
          <button onClick={() => setColor('aquamarine')} className='outline-none px-4 py-1 rounded-full text-white shadow-lg' style={{backgroundColor: 'aquamarine'}}>Aquamarine</button>
          <button onClick={() => setColor('palegoldenrod')} className='outline-none px-4 py-1 rounded-full text-white shadow-lg' style={{backgroundColor: 'palegoldenrod'}}>Palegoldenrod</button>
          
        </div>
      </div>
    </div>
  )
}

export default App
