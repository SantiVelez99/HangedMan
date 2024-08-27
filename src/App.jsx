import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './layout/header/Header'
import Home from './pages/home/Home'

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </>
  )
}

export default App
