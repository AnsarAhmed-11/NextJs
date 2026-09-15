"use client"
import axios from "axios"
import { useActionState, useState } from "react"

const Form = ({ formType, type1, type2, type3, password }) => {
    const [showPassword, setPassword] = useState(false)

    const formHandler = async (prevData, formData) => {
        const name = formData.get("name")
        const email = formData.get('email')
        const password = formData.get('password')
        console.log(name,email,password);
        try {
            const res = await axios.post("http://localhost:3000/api/users", {
                name, email, password
            })
            console.log(res.data.name);
            return { message: res.data.message || "request Back again" }
        } catch (err) {
            return { error: err.response?.data?.message || "server error", }
        }
    }
    const [data, action, pending] = useActionState(formHandler, undefined)
    return (
        <div>
            <form className="form" noValidate action={action}>
                <h2>{formType} Form</h2>
                <div className="form-fields">
                    <label htmlFor='name'>Name</label>
                    <input id="name" type={type1} placeholder="Enter Name" name='name' autoComplete="name" required />
                </div>
                <div className="form-fields">
                    <label htmlFor={type2}>{type2}</label>
                    <input id="email" type={type2} placeholder="Enter Email" name='email' autoComplete="email" required />
                </div>
                <div className="form-fields">
                    <label htmlFor={password}>{type3}</label>
                    <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter Password"
                        name="password"
                        autoComplete="new-password"
                        required
                    />

                    <input
                        type="checkbox"
                        name="show"
                        id="showPassword"
                        checked={showPassword}
                        onChange={(e) => setPassword(e.target.checked)}
                    />

                </div>
                <div className="form-fields">
                    <button >
                        submit
                    </button>
                </div>

                {
                    data?.error && <span style={{ color: "#d90429" }}>{data?.error}</span>
                }
                {
                    data?.message && <span style={{ color: "#52ff01" }}>{data?.message}</span>
                }

            </form>
        </div>
    )
}

export default Form