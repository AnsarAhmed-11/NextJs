"use client"

import { useState } from "react"

const Form = ({ formType }) => {
    const [showPassword, setPassword] = useState("password")
        function sendData(){
            
        }
        try{

        }catch(err){
            console.log(err);
        }
    return (
        <div>
            <form className="form" noValidate>
                <h2>{formType} Form</h2>
                <div className="form-fields">
                    <label htmlFor='name'>Name</label>
                    <input id="name" type="text" placeholder="Enter Name" name='name' autoComplete="name" required />
                </div>
                <div className="form-fields">
                    <label htmlFor='email'>Email</label>
                    <input id="email" type="email" placeholder="Enter Email" name='email' autoComplete="email" required />
                </div>
                <div className="form-fields">
                    <label htmlFor='password'>Password</label>
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
                    <button>Submit</button>
                </div>
                {/*
                {
                    data?.error && <span style={{ color: "#d90429" }}>{data?.error}</span>
                }
                {
                    data?.message && <span style={{ color: "#1f7a8c" }}>{data?.message}</span>
                }
                <div className="footer">
                    <Link to="/update">Update</Link>
                </div> */}
            </form>
        </div>
    )
}

export default Form