import './header.css'
import { NavLink } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAward, faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { useUser } from '../../context/UserContext'
import { useState } from 'react'
export default function Header() {

    const { assetsURL, user, logOut } = useUser()
    const [list, setList] = useState(false)
    function displayList() {
        if (list) setList(false)
        if (!list) setList(true)
    }

    return (
        <>
            <header className="main-header">
                <div className="header-container">
                    <NavLink className='link' to={'/'}>
                        <div className='header-title-container'>
                            <div className="header-icon">
                                <img src="/src/assets/icon/file.png" alt="hanged-icon" className='title-icon' />
                            </div>
                            <div className="header-title">
                                HangMan
                            </div>
                        </div>
                    </NavLink>
                    <div className='leaderboard-icon' title='Leaderboard'>
                        <FontAwesomeIcon className='icon' icon={faAward} />
                    </div>
                    <div className="header-user">
                        {
                            user?.name ?
                                <>
                                    <div className="header-user-image">
                                        <img src={`${assetsURL}/assets/profile-icon/icons/${user.avatar}`} alt="user avatar" />
                                    </div>
                                    <div className="header-user-name" onClick={() => displayList()}>
                                        <NavLink className="link">
                                            <span className='header-user-list'>{user?.name}  <FontAwesomeIcon className='icon' icon={faCaretDown} /></span>
                                        </NavLink>
                                    </div>
                                    <div id="userOptionsList" className={list ? "user-options" : "user-options unactive"}>
                                        <ul className='user-options-list'>
                                            <NavLink className="link" to={'/my-profile'} onClick={() => setList(false)}>
                                                <li className='user-options-item'>My Profile</li>
                                            </NavLink>
                                            <NavLink className="link" onClick={() => logOut()}>
                                                <li className="user-options-item">Log Out</li>
                                            </NavLink>
                                        </ul>
                                    </div>
                                </>
                                :
                                <div className="login-container">
                                    <NavLink className='link' to={'/logIn'}>
                                        <div className='login-button'>Log In</div>
                                    </NavLink>
                                    <NavLink className='link' to={'/register'}>
                                        <div className="register-button">Register</div>
                                    </NavLink>
                                </div>
                        }

                    </div>
                </div>
            </header>
        </>
    )
}