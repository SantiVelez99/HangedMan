import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useUser } from "../../context/UserContext"
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"
import Modal from "../../layout/modal/Modal"
import useApi from "../../services/interceptor/interceptor"
import Swal from "sweetalert2"
import './user-profile.css'
import { useForm } from "react-hook-form"
export default function UserProfile() {

    const { assetsURL, URL, user, avatars, getAvatars } = useUser()
    const { handleSubmit, register, formState: { errors } } = useForm()
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
            if (response.status === 200) {
                localStorage.setItem('user', JSON.stringify(newUser))
                Swal.fire({
                    title: 'Avatar updated successfully',
                    toast: true,
                    timer: 1000,
                    showConfirmButton: false,
                    background: "#2B4141",
                    color: "#F4F9E9",
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
                title: error.response.message,
                toast: true,
                timer: 1000,
                showConfirmButton: false
            })
        }
    }
    function handleEdit(id) {
        const input = document.getElementById(id)
        input.disabled = false
        input.focus()
        console.log('edit')
    }

    const onSubmit = data => {
        console.log(data)
        editUser(data)
    }
    async function editUser(data) {
        try {
            const newUser = user
            const value = Object.values(data)
            newUser.name = value[0]
            console.log(newUser)
            const response = await api.put(`${URL}/users/${user._id}`, newUser)
            if (response.status === 200) {
                localStorage.setItem('user', JSON.stringify(newUser))
                Swal.fire({
                    title: 'Name updated successfully',
                    toast: true,
                    timer: 1000,
                    showConfirmButton: false,
                    background: "#2B4141",
                    color: "#F4F9E9",
                    customClass: {
                        popup: 'swal-container'
                    }
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
                title: error.response.message,
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
                    <div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="input-container">
                                <input type="text" id="nameInput" defaultValue={user.name} disabled autoFocus {...register("name", {
                                    required: "Mandatory field", minLength: {
                                        value: 3,
                                        message: "The name must be at least 3 characters long."
                                    }, maxLength: {
                                        value: 60,
                                        message: "The email must be a maximum of 60 characters long."
                                    }, pattern: {
                                        value: /^[a-zA-Z0-9]+$/,
                                        message: "Only letters and numbers are allowed."
                                    }
                                })} />
                                {errors.name && <p className="input-error">{errors.name.message}</p>}
                                <FontAwesomeIcon icon={faPenToSquare} onClick={() => handleEdit('nameInput')} />
                            </div>
                            <button type="submit">Enviar</button>
                        </form>
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