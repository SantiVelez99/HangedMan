import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './layout/header/Header'
import Home from './pages/home/Home'
import Footer from './layout/footer/Footer'
import Register from './pages/register/Register'
import LogIn from './pages/login/LogIn'
import UserProfile from './pages/userProfile/UserProfile'
import UserGuard from './services/guard/UserGuard'

function App() {

  return (
    <>
      <div className='page-container'>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/logIn' element={<LogIn />} />
          <Route path='/my-profile' element={
            <UserGuard>
              <UserProfile />
            </UserGuard>
          } />

        </Routes>
        <Footer />
      </div>
    </>
  )
}

export default App
