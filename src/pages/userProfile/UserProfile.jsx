import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useUser } from "../../context/UserContext"
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"
import Modal from "../../layout/modal/Modal"
import useApi from "../../services/interceptor/interceptor"
import Swal from "sweetalert2"
import './user-profile.css'
export default function UserProfile() {

    const { assetsURL, URL, user, avatars, getAvatars } = useUser()
    const [isOpen, setIsOpen] = useState(false)
    const api = useApi()
    function handleModal() {
        if (isOpen) setIsOpen(false)
        if (!isOpen) setIsOpen(true)
    }
    useEffect(() => {
        getAvatars()
    }, [])

    async function editAvatar(image) {
        try {
            const newUser = user
            newUser.avatar = image
            const response = await api.put(`${URL}/users/${user._id}`, newUser)
            localStorage.setItem('user', JSON.stringify(newUser))
            if (response.status === 200) {
                Swal.fire({
                    title: 'Avatar updated successfully',
                    toast: true,
                    timer: 1000,
                    showConfirmButton: false,
                    background: "#2B4141",
                    color:"#F4F9E9",
                    customClass: {
                        popup: 'swal-container'
                    },
                    willClose: () => handleModal()
                })
            } else {
                Swal.fire({
                    title: 'Failed to update avatar',
                    toast: true,
                    timer: 1000,
                    showConfirmButton: false
                })
            }
        } catch (error) {
            Swal.fire({
                title: 'Failed to update avatar',
                toast: true,
                timer: 1000,
                showConfirmButton: false
            })
        }
    }

    return (
        <>
            <main className="main-container">
                <div className="user-profile">
                    <div className="profile-avatar">
                        <div className="title-container">
                            <p>Avatar</p>
                            <FontAwesomeIcon className="edit-icon" icon={faPenToSquare} onClick={() => handleModal()} />
                        </div>
                        <img src={`${assetsURL}/assets/profile-icon/icons/${user.avatar}`} alt="profile-avatar" />
                    </div>
                    <Modal isOpen={isOpen} handleModalClose={handleModal}>
                        <div className="avatar-gallery">
                            <h2 className="title">Select one avatar</h2>
                            {
                                avatars.map((avatar, i) =>
                                    <div key={i} className="avatar-container" title={avatar.name} onClick={() => editAvatar(avatar.image)}>
                                        <img src={`${assetsURL}/assets/profile-icon/icons/${avatar.image}`} alt={avatar.name} />
                                    </div>
                                )
                            }
                        </div>
                    </Modal>
                </div>
            </main>
        </>
    )
}