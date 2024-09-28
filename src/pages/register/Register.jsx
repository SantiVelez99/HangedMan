import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useUser } from "../../context/UserContext"
import axios from "axios"
import './register.css'
import Modal from "../../layout/modal/Modal"
import Swal from "sweetalert2"

export default function Register() {

    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm()
    const { URL, assetsURL, getAvatars, avatars } = useUser()
    const password = watch('password')
    const [avatar, setAvatar] = useState("default.png")
    const [isOpen, setIsOpen] = useState(false)


    useEffect(() => {
        getAvatars()
    }, [])

    const onSubmit = data => {
        const formData = new FormData
        formData.append('name', data.name)
        formData.append('email', data.email)
        formData.append('password', data.password)
        formData.append('avatar', avatar)
        createUser(formData)
    }
    function handleModal() {
        if (isOpen) setIsOpen(false)
        if (!isOpen) setIsOpen(true)
    }
    function selectAvatar(image) {
        setAvatar(image)
        handleModal()
    }
    async function createUser(formData) {
        try {
            const response = await axios.post(`${URL}/users`, formData)
            if(response.status === 202){
                Swal.fire({
                    icon: 'success',
                    title: response.data.message,
                    showConfirmButton: true,
                    timer: 2000,
                    willClose: () => {
                        reset()
                        location.replace('/logIn')
                    }
                }).then(res => {
                    if(res.isConfirmed) {
                        reset()
                        location.replace('/logIn')
                    }
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: response.data.message,
                    timer: 2000
                })
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: error.response.data.message
            })
        }
    }
    return (
        <>
            <main className="main-container">
                <div className="register-form-container">
                    <form onSubmit={handleSubmit(onSubmit)} className="register-form">
                        <h1>Register</h1>
                        <div className="register-form-input">
                            <label htmlFor="name">Username:</label>
                            <input type="text" {...register("name", {
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
                        </div>
                        <div className="register-form-input">
                            <label htmlFor="email">Email:</label>
                            <input type="text" {...register("email", {
                                required: "Mandatory field", minLength: {
                                    value: 8,
                                    message: "The email must be at least 8 characters long."
                                }, maxLength: {
                                    value: 60,
                                    message: "The email must be a maximum of 60 characters long."
                                }, pattern: {
                                    value: /.+@.+\..+/,
                                    message: "Use a valid email format."
                                }
                            })} />
                            {errors.email && <p className="input-error">{errors.email.message}</p>}
                        </div>
                        <div className="register-form-input">
                            <label htmlFor="password">Password:</label>
                            <input type="password" {...register("password", {
                                required: "Mandatory field", minLength: {
                                    value: 8,
                                    message: "The password must be at least 8 characters long."
                                }, maxLength: {
                                    value: 60,
                                    message: "The password must be a maximum of 60 characters long."
                                }, pattern: {
                                    value: /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
                                    message: "The password must have at least one mayus, one number and one special symbol (! $ / & etc)."
                                }
                            })} />
                            {errors.password && <p className="input-error">{errors.password.message}</p>}
                        </div>
                        <div className="register-form-input">
                            <label htmlFor="rPassword">Repeat password:</label>
                            <input type="password" {...register("rPassword", {
                                required: "Mandatory field", minLength: {
                                    value: 8,
                                    message: "The password must be at least 8 characters long."
                                }, maxLength: {
                                    value: 60,
                                    message: "The password must be a maximum of 60 characters long."
                                }, pattern: {
                                    value: /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
                                    message: "The password must have at least one mayus, one number and one special symbol (! $ / & etc)."
                                }, validate: value => value === password || 'Passwords do not match'
                            })} />
                            {errors.rPassword && <p className="input-error">{errors.rPassword.message}</p>}
                        </div>
                        <div className="avatar-selector">
                            <div className="modal-button" onClick={() => handleModal()}>Select an avatar: </div>
                            <div className="avatar" onClick={() => handleModal()}>
                                <img src={avatar ? `${assetsURL}/assets/profile-icon/icons/${avatar}` : ""} alt="" />
                            </div>
                        </div>
                        <Modal isOpen={isOpen} handleModalClose={handleModal}>
                            <div className="avatar-gallery">
                                {
                                    avatars.map((avatar, i) =>
                                        <div key={i} className="avatar-container" title={avatar.name} onClick={() => selectAvatar(avatar.image)}>
                                            <img src={`${assetsURL}/assets/profile-icon/icons/${avatar.image}`} alt={avatar.name} />
                                        </div>
                                    )
                                }
                            </div>
                        </Modal>
                        <button className="register-button" type="submit">Register</button>
                    </form>
                </div>
            </main>
        </>
    )
}