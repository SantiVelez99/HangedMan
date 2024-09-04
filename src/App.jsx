import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './layout/header/Header'
import Home from './pages/home/Home'
import Footer from './layout/footer/Footer'
import Register from './pages/register/register'
import LogIn from './pages/login/LogIn'

function App() {

  return (
    <>
      <div className='page-container'>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/logIn' element={<LogIn />}/>
        </Routes>
        <Footer />
      </div>
    </>
  )
}

export default App
