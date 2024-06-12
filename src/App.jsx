import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import Card from './components/Card/Card'
import Dashboard from './pages/Dashboard'
import User from './pages/User'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Case from './components/Case'

function App() {
  const [count, setCount] = useState(0)

  

  return (
    <Case>
      <div className='bg-gray-900 flex items-center justify-center min-h-screen'>
        <div className="bg-gray-800 border-t border-gray-600 shadow rounded-lg max-w-lg w-full p-6">
          <h4 className='text-white text-2xl'>Hello Rafly</h4>
            <p className='text-lg text-gray-400 leading-relaxed'>A JavaScript library for building user interfaces</p>
        </div>
      </div>
    </Case>
  )
}
      

      {/* <BrowserRouter>
        <Routes>
          <Route path='/' element={<Dashboard />}/>
          <Route path='/user' element={<User />}/>
        </Routes>
      </BrowserRouter> */}

      {/* <Dashboard />
      <br />
      <User /> */}
      {/* self closing tag */}
      {/* <Card /> */}

      {/* tag buka dan tutupnya */}
      {/* mennggunakan props children */}
      {/* <Card>
        <ul>
          <li>list 1</li> 
        </ul>
      </Card>

      <Card>
        <i>Ini adalah Card 1</i>
      </Card> */}

      {/* <Card nama="Muhamad" rombel="PPLG XI-5" rayon="Cibedug 1"/>
      <Card nama="Rafly" rombel="PPLG XI-5" rayon="Cibedug 2"/>
      <Card nama="Julian" rombel="PPLG XI-5" rayon="Cibedug 3"/> */}



      {/* <div>
        <h1><i>Rafly</i></h1>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Rafly Julian</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    
//   )
// }

export default App 
