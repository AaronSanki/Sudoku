import React from 'react'
import { Outlet } from 'react-router-dom'
import Theme from './Components/Elements/Theme'
import { useGame  } from './Store/gameStore';
function App() {
  const { darkMode } = useGame()
  return (
    <div className={`h-screen w-screen flex justify-center items-center mx-3 transition-colors duration-300 ${darkMode ? 'bg-zinc-800 text-white' : 'bg-white text-black'}`}>
    <Theme/>
      <div className='h-screen flex flex-col justify-center gap-10 items-center relative'>
        <Outlet/>
      </div>
    </div>
  )
}

export default App
