import './header.css'
import { NavLink } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAward, faCaretDown } from '@fortawesome/free-solid-svg-icons'
export default function Header() {
    return (
        <>
            <header className="main-header">
                <div className="header-container">
                    <div className='header-title-container'>
                        <div className="header-icon">
                            <img src="/src/assets/icon/file.png" alt="hanged-icon" className='title-icon' />
                        </div>
                        <div className="header-title">
                            HangMan
                        </div>
                    </div>
                    <div className='leaderboard-icon' title='Leaderboard'>
                        <FontAwesomeIcon className='icon' icon={faAward} />
                    </div>
                    <div className="header-user">
                        <div className="header-user-image">
                            <NavLink className="link">
                                <img src="https://cdn-icons-png.flaticon.com/256/1077/1077114.png" alt="user avatar" />
                            </NavLink>
                        </div>
                        <div className="header-user-name">
                            <span className='header-user-list'>Juan <FontAwesomeIcon className='icon' icon={faCaretDown} /></span>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}