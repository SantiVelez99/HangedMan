import { useForm } from "react-hook-form"


export default function Register() {

    const { register, handleSubmit, watch, formState: { errors } } = useForm()

    const password = watch('password')

    const onSubmit = data => console.log(data)

    return (
        <>
            <main className="main-container">
                <div className="register-form-container">
                    <form onSubmit={handleSubmit(onSubmit)}>
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
                            {errors.name && <p>{errors.name.message}</p>}
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
                            {errors.email && <p>{errors.email.message}</p>}
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
                            {errors.password && <p>{errors.password.message}</p>}
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
                            {errors.rPassword && <p>{errors.rPassword.message}</p>}
                        </div>
                        <button type="submit">Register</button>
                    </form>
                </div>
            </main>
        </>
    )
}