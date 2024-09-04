import { useForm } from "react-hook-form"
import { useUser } from "../../context/UserContext"

export default function LogIn() {

    const { register, handleSubmit, formState: { errors } } = useForm()
    const { logIn } = useUser()
    const onSubmit = (data) => {
        console.log(data)
        logIn(data)
    }

    return (
        <>
            <main className="main-container">
                <div className="login-form-container">
                    <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
                        <h1>LogIn</h1>
                        <div className="login-form-input">
                            <label htmlFor="email">Email:</label>
                            <input type="text" {...register('email', {
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
                        <div className="login-form-input">
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
                        <button type="submit">Log In</button>
                    </form>
                </div>
            </main>
        </>
    )
}