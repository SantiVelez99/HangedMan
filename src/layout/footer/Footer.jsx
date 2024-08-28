import { faLinkedin, faSquareGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import './footer.css'
export default function Footer() {
    return (
        <footer className="main-footer">
            <div className="page-info">
                <div className="footer-logo">
                    <img src="/src/assets/icon/file.png" alt="hanged-icon" className='title-icon' />
                </div>
                <div className="footer-title">HangMan</div>
            </div>
            <div className="dev-socials">
                <NavLink to={"https://www.linkedin.com/in/santiago-velez-173b64180/"} target="_blank">
                    <FontAwesomeIcon icon={faLinkedin} />
                </NavLink>
                <NavLink to={"https://github.com/SantiVelez99"} target="_blank">
                    <FontAwesomeIcon icon={faSquareGithub} />
                </NavLink>
            </div>
        </footer>
    )
}