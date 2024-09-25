import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './modal.css'
import { faX } from '@fortawesome/free-solid-svg-icons';

export default function Modal({ handleModalClose, isOpen, children }) {
    if (!isOpen) return;
    return (
        <div className="modal-overlay" onClick={handleModalClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close-btn" onClick={handleModalClose}><FontAwesomeIcon icon={faX} /></button>
                <div className="modal-body">
                    {children}
                </div>
            </div>
        </div>
    )
} 