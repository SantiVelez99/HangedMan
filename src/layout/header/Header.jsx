import './header.css'
import { NavLink } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAward, faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { useUser } from '../../context/UserContext'
export default function Header() {

    const { assetsURL, user, logOut } = useUser()

    function displayList() {
        const list = document.getElementById('userOptionsList')
        list.classList == "user-options unactive" ? list.classList = "user-options" : list.classList = "user-options unactive"
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
                                    <div id="userOptionsList" className="user-options unactive">
                                        <ul className='user-options-list'>
                                            <NavLink className="link">
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
                                    <div className='login-button'
                                    ><NavLink className='link' to={'/logIn'}>Log In</NavLink>
                                    </div>
                                    <div className="register-button">
                                        <NavLink className='link' to={'/register'}>Register</NavLink>
                                    </div>
                                </div>
                        }

                    </div>
                </div>
            </header>
        </>
    )
}